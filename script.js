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
    ["Luchador", "CÓLERA"],
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
    [2, "Regular"],
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
        Math.max(0, Math.min(100,
          Math.round((totals[dimension] / maxScores[dimension]) * 1000) / 10
        ))
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
      rect.setAttribute("fill", "#2563eb");
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
    window.pomsResponses = responses.slice();
    window.pomsScores = { ...scores };

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

const pomsCategories = {
  "TENSIÓN": [1, 8, 11, 18, 21, 28],
  "DEPRESIÓN": [3, 6, 13, 23, 26],
  "CÓLERA": [4, 9, 12, 14, 16, 19, 24, 29],
  "VIGOR": [2, 7, 17, 22, 27],
  "FATIGA": [5, 10, 15, 20, 25]
};

const pomsItemTexts = [
  "Intranquilo","Enérgico","Desamparado","Furioso","Sin fuerzas","Deprimido",
  "Lleno de energía","Inquieto","Molesto","Agotado","Agitado","Luchador",
  "Desdichado","Irritable","Cansado","Amargado","Animado","Nervioso",
  "Enfadado","Exhausto","Tenso","Vigoroso","Triste","Enojado","Fatigado",
  "Infeliz","Activo","Relajado","De mal genio"
];

const pomsScaleLabels = ["Nada","Un poco","Regular","Bastante","Muchísimo"];

function getAnswerValue(itemNumber) {
  const r = window.pomsResponses || [];
  return r[itemNumber - 1];
}

function getAnswerLabel(value) {
  return value === null || value === undefined ? "Sin respuesta" : pomsScaleLabels[value];
}

function showReview() {
  const panel = document.getElementById("reviewPanel");
  const content = document.getElementById("reviewContent");
  if (!panel || !content) return;

  content.innerHTML = Object.entries(pomsCategories).map(([category, itemNumbers]) => {
    const list = itemNumbers.map(n => {
      const value = getAnswerValue(n);
      return `<div class="review-item">
        <div class="review-question">${n}. ${pomsItemTexts[n-1]}</div>
        <div class="review-answer">${getAnswerLabel(value)} <span>(${value ?? "—"})</span></div>
      </div>`;
    }).join("");

    return `<div class="review-category"><h3>${category}</h3>${list}</div>`;
  }).join("");

  panel.classList.remove("hidden");
  panel.scrollIntoView({behavior:"smooth", block:"start"});
}

function downloadPDF() {
  const scores = window.pomsScores;
  if (!scores) {
    alert("Primero debes completar el cuestionario.");
    return;
  }

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("El navegador ha bloqueado la ventana. Permite ventanas emergentes para esta página.");
    return;
  }

  const maxScores = {"TENSIÓN":24,"DEPRESIÓN":20,"CÓLERA":32,"VIGOR":20,"FATIGA":20};

  const rows = Object.entries(scores).map(([dimension, value]) =>
    `<tr><td>${dimension}</td><td>${value}%</td><td>${maxScores[dimension]} puntos máx.</td></tr>`
  ).join("");

  const svg = document.getElementById("chart");
  const chart = svg ? svg.outerHTML : "";

  const answerSections = Object.entries(pomsCategories).map(([category, nums]) => {
    const rows = nums.map(n => {
      const value = getAnswerValue(n);
      return `<tr><td>${n}. ${pomsItemTexts[n-1]}</td><td>${getAnswerLabel(value)}</td><td>${value ?? "—"}</td></tr>`;
    }).join("");
    return `<h2>${category}</h2><table><thead><tr><th>Pregunta</th><th>Respuesta</th><th>Valor</th></tr></thead><tbody>${rows}</tbody></table>`;
  }).join("");

  printWindow.document.write(`<!doctype html>
<html><head><meta charset="utf-8"><title>Resultados POMS</title>
<style>
body{font-family:Arial,sans-serif;color:#111;margin:30px}
h1{margin-bottom:4px} h2{margin-top:25px}
.date{color:#666;margin-bottom:20px}
table{width:100%;border-collapse:collapse;margin:10px 0 20px}
th,td{border:1px solid #ccc;padding:7px;text-align:left}
th{background:#f2f2f2}
.chart{width:100%;max-width:800px;margin:10px 0 20px}
.note{font-size:10px;color:#666}
@media print{body{margin:12mm}}
</style></head><body>
<h1>Resultados POMS</h1>
<div class="date">Versión española del POMS · ${new Date().toLocaleString("es-ES")}</div>
<h2>Puntuaciones</h2>
<table><thead><tr><th>Emoción</th><th>Porcentaje</th><th>Máximo</th></tr></thead><tbody>${rows}</tbody></table>
<h2>Perfil gráfico</h2><div class="chart">${chart}</div>
<h2>Respuestas</h2>${answerSections}
<p class="note">Uso educativo. Este resultado no constituye un diagnóstico clínico.</p>
<script>window.onload=function(){setTimeout(function(){window.print()},700)}<\/script>
</body></html>`);

  printWindow.document.close();
}

document.addEventListener("DOMContentLoaded", () => {
  const pdfBtn = document.getElementById("pdfBtn");
  const reviewBtn = document.getElementById("reviewBtn");
  const closeReview = document.getElementById("closeReview");

  if (pdfBtn) pdfBtn.addEventListener("click", downloadPDF);
  if (reviewBtn) reviewBtn.addEventListener("click", showReview);
  if (closeReview) closeReview.addEventListener("click", () => {
    document.getElementById("reviewPanel").classList.add("hidden");
  });
});
