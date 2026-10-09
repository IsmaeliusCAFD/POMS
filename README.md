# POMS — Perfil del estado de ánimo

Aplicación web educativa para realizar la versión española del POMS de 29 ítems y representar los resultados en una gráfica.

## Estructura

- `index.html` — estructura de la aplicación.
- `style.css` — diseño responsive.
- `script.js` — preguntas, puntuación y gráfica.

## Publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube `index.html`, `style.css` y `script.js` a la raíz del repositorio.
3. Entra en **Settings → Pages**.
4. En **Build and deployment**, selecciona:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Guarda la configuración.
6. GitHub generará la URL pública de la página.

## Puntuación

El cálculo sigue los máximos indicados en el material proporcionado:

- TENSIÓN: máximo 24.
- DEPRESIÓN: máximo 20.
- CÓLERA: máximo 32.
- VIGOR: máximo 20.
- FATIGA: máximo 20.

La puntuación se expresa sobre 100 mediante una regla de tres.

## Nota

Esta aplicación está planteada para uso educativo. No constituye por sí misma una herramienta de diagnóstico psicológico.


### PDF de resultados
Al finalizar el cuestionario se puede generar un PDF con las puntuaciones, porcentajes y la gráfica de resultados. La generación utiliza jsPDF mediante CDN.


### Funciones añadidas
- Descarga de resultados mediante la ventana de impresión del navegador, desde la que se puede elegir «Guardar como PDF».
- Vista de respuestas ordenadas por Tensión, Depresión, Cólera, Vigor y Fatiga, mostrando la opción elegida (0–4).


Versión corregida: las respuestas del encuestado se conservan durante todo el cuestionario y aparecen correctamente tanto en la vista ordenada como en el documento imprimible para guardar como PDF.


## Instalar como aplicación en el móvil
La web incluye soporte PWA y un icono POMS. Tras publicar los archivos en GitHub Pages y abrir la web mediante HTTPS:
- **iPhone/iPad:** Safari → botón Compartir → **Añadir a pantalla de inicio**.
- **Android:** Chrome → menú ⋮ → **Instalar aplicación** o **Añadir a pantalla de inicio**.
La primera visita debe hacerse con conexión para que se guarde la aplicación y sus archivos básicos.
