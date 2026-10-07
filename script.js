(() => {
  "use strict";

  const items = [
    ["Intranquilo", "TENSIÓN"],
    ["Enérgico", "VIGOR"],
    ["Desamparado", "DEPRESIÓN"],
    ["Furioso", "CÓLERA"],
    ["Sin fuerzas", "FATIGA"],
    ["Deprimido", "DEPRESIÓN"],
    ["Lleno de energía", "VIGOR"],
    ["Inquieto", "TENSIÓN"],
    ["Molesto", "CÓLERA"],
    ["Agotado", "FATIGA"],
    ["Agitado", "TENSIÓN"],
    ["Luchador", "VIGOR"],
    ["Desdichado", "DEPRESIÓN"],
    ["Irritable", "CÓLERA"],
    ["Cansado", "FATIGA"],
    ["Amargado", "CÓLERA"],
    ["Animado", "VIGOR"],
    ["Nervioso", "TENSIÓN"],
    ["Enfadado", "CÓLERA"],
    ["Exhausto", "FATIGA"],
    ["Tenso", "TENSIÓN"],
    ["Vigoroso", "VIGOR"],
    ["Triste", "DEPRESIÓN"],
    ["Enojado", "CÓLERA"],
    ["Fatigado", "FATIGA"],
    ["Infeliz", "DEPRESIÓN"],
    ["Activo", "VIGOR"],
    ["Relajado", "TENSIÓN"],
    ["De mal genio", "CÓLERA"]
  ];

  const scale = [
    [0, "Nada"],
    [1, "Un poco"],
    [2, "Moderadamente"],
    [3, "Bastante"],
    [4, "Muchísimo"]
  ];

  let lastResults = null;

const dimensions = ["TENSIÓN", "DEPRESIÓN", "CÓLERA", "VIGOR", "FATIGA"];

  const maxScores = {
    "TENSIÓN": 24,
    "DEPRESIÓN": 20,
    "CÓLERA": 32,
    "VIGOR": 20,
    "FATIGA": 20
  };

  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  const results = document.getElementById("results");

  const counter = document.getElementById("counter");
  const percent = document.getElementById("percent");
  const progress = document.getElementById("progress");
  const itemNumber = document.getElementById("itemNumber");
  const word = document.getElementById("word");
  const answers = document.getElementById("answers");
  const validation = document.getElementById("validation");

  const begin = document.getElementById("begin");
  const back = document.getElementById("back");
  const forward = document.getElementById("forward");
  const again = document.getElementById("again");

  let current = 0;
  let responses = Array(items.length).fill(null);

  function renderQuestion() {
    const [item] = items[current];
    const progressValue = Math.round(((current + 1) / items.length) * 100);

    itemNumber.textContent = current + 1;
    counter.textContent = `Pregunta ${current + 1} de ${items.length}`;
    percent.textContent = `${progressValue}%`;
    progress.style.width = `${progressValue}%`;
    word.textContent = item;
    validation.textContent = "";

    answers.innerHTML = "";

    scale.forEach(([value, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice";

      if (responses[current] === value) {
        button.classList.add("selected");
      }

      const number = document.createElement("span");
      number.className = "choice-number";
      number.textContent = value;

      const text = document.createElement("span");
      text.textContent = label;

      button.append(number, text);

      button.addEventListener("click", () => {
        responses[current] = value;
        renderQuestion();
      });

      answers.appendChild(button);
    });

    back.disabled = current === 0;
    back.style.opacity = current === 0 ? ".45" : "1";
    back.style.cursor = current === 0 ? "not-allowed" : "pointer";

    forward.textContent =
      current === items.length - 1 ? "Ver resultados" : "Siguiente";
  }

  function calculateScores() {
    const totals = Object.fromEntries(
      dimensions.map(dimension => [dimension, 0])
    );

    items.forEach(([, dimension], index) => {
      totals[dimension] += responses[index];
    });

    return Object.fromEntries(
      dimensions.map(dimension => [
        dimension,
        Math.round((totals[dimension] / maxScores[dimension]) * 1000) / 10
      ])
    );
  }

  function drawChart(scores) {
    const svg = document.getElementById("chart");
    svg.innerHTML = "";

    const width = 800;
    const height = 450;
    const left = 65;
    const right = 25;
    const top = 25;
    const bottom = 82;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;

    for (let value = 0; value <= 100; value += 25) {
      const y = top + plotHeight - (value / 100) * plotHeight;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", left);
      line.setAttribute("x2", width - right);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("opacity", ".13");
      svg.appendChild(line);

      const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      label.setAttribute("x", left - 10);
      label.setAttribute("y", y + 4);
      label.setAttribute("text-anchor", "end");
      label.setAttribute("font-size", "12");
      label.setAttribute("fill", "currentColor");
      label.textContent = `${value}%`;
      svg.appendChild(label);
    }

    const step = plotWidth / dimensions.length;
    const barWidth = Math.min(78, step * 0.56);

    dimensions.forEach((dimension, index) => {
      const value = scores[dimension];
      const barHeight = plotHeight * (value / 100);
      const x = left + index * step + (step - barWidth) / 2;
      const y = top + plotHeight - barHeight;

      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", barWidth);
      rect.setAttribute("height", barHeight);
      rect.setAttribute("rx", "9");
      rect.setAttribute("fill", "currentColor");
      rect.setAttribute("opacity", ".78");
      svg.appendChild(rect);

      const valueLabel = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      valueLabel.setAttribute("x", x + barWidth / 2);
      valueLabel.setAttribute("y", Math.max(y - 9, 15));
      valueLabel.setAttribute("text-anchor", "middle");
      valueLabel.setAttribute("font-size", "13");
      valueLabel.setAttribute("font-weight", "700");
      valueLabel.setAttribute("fill", "currentColor");
      valueLabel.textContent = `${value}%`;
      svg.appendChild(valueLabel);

      const nameLabel = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      nameLabel.setAttribute("x", x + barWidth / 2);
      nameLabel.setAttribute("y", height - 38);
      nameLabel.setAttribute("text-anchor", "middle");
      nameLabel.setAttribute("font-size", "12");
      nameLabel.setAttribute("fill", "currentColor");
      nameLabel.textContent = dimension;
      svg.appendChild(nameLabel);
    });
  }

  function renderScoreCards(scores) {
    const container = document.getElementById("scoreCards");
    container.innerHTML = "";

    dimensions.forEach(dimension => {
      const card = document.createElement("div");
      card.className = "score-card";

      card.innerHTML = `
        <div class="name">${dimension}</div>
        <div class="value">${scores[dimension]}%</div>
        <div class="max">Máx. ${maxScores[dimension]} puntos</div>
      `;

      container.appendChild(card);
    });
  }

  function showResults() {
    const scores = calculateScores();

    drawChart(scores);
    renderScoreCards(scores);

    quiz.classList.add("hidden");
    results.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  begin.addEventListener("click", () => {
    current = 0;
    responses = Array(items.length).fill(null);

    intro.classList.add("hidden");
    results.classList.add("hidden");
    quiz.classList.remove("hidden");

    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  back.addEventListener("click", () => {
    if (current > 0) {
      current--;
      renderQuestion();
    }
  });

  forward.addEventListener("click", () => {
    if (responses[current] === null) {
      validation.textContent = "Selecciona una respuesta para continuar.";
      return;
    }

    if (current < items.length - 1) {
      current++;
      renderQuestion();
    } else {
      showResults();
    }
  });

  again.addEventListener("click", () => {
    current = 0;
    responses = Array(items.length).fill(null);

    results.classList.add("hidden");
    intro.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();


function downloadPDF() {
  if (!lastResults || !window.jspdf) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  doc.setFontSize(20);
  doc.text("Resultados POMS", 20, 22);

  doc.setFontSize(10);
  doc.text("Versión española del POMS · Perfil de estado de ánimo", 20, 29);
  doc.text(new Date().toLocaleString("es-ES"), 20, 35);

  let y = 48;
  doc.setFontSize(13);
  doc.text("Puntuaciones", 20, y);
  y += 9;
  doc.setFontSize(11);

  dimensions.forEach(d => {
    const score = lastResults.totals[d.key];
    const max = maxScores[d.key];
    const pct = lastResults.percentages[d.key];
    doc.text(`${d.label}: ${score}/${max} — ${pct}%`, 25, y);
    y += 7;
  });

  y += 5;
  doc.setFontSize(13);
  doc.text("Perfil gráfico", 20, y);
  y += 6;

  const svg = document.querySelector("#chart");
  const svgString = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 650;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    doc.addImage(canvas.toDataURL("image/png"), "PNG", 20, y, 170, 92);
    y += 102;

    doc.setFontSize(9);
    doc.text("Puntuaciones ponderadas sobre 100 según los máximos de cada factor.", 20, y);
    doc.text("Uso educativo. Este resultado no constituye un diagnóstico clínico.", 20, y + 6);

    doc.save("resultados-POMS.pdf");
    URL.revokeObjectURL(url);
  };

  img.src = url;
}

const pdfBtn = document.getElementById("pdfBtn");

pdfBtn.addEventListener("click", downloadPDF);
