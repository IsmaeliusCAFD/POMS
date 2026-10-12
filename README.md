# POMS — Perfil del estado de ánimo

Aplicación web educativa para realizar la versión española del POMS de 29 ítems y representar los resultados en una gráfica.

## Estructura

- `index.html` — estructura de la aplicación.
- `style.css` — diseño responsive.
- `script.js` — preguntas, puntuación, gráfica, revisión de respuestas y PDF.
- `manifest.webmanifest` — datos de la aplicación instalable (PWA).
- `service-worker.js` — caché para el modo aplicación.
- `poms-192.png`, `poms-512.png`, `poms.svg` — iconos.

## Publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos del proyecto a la raíz del repositorio.
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
- IRA: máximo 32.
- VIGOR: máximo 20.
- FATIGA: máximo 20.

La puntuación se expresa sobre 100 mediante una regla de tres.

## Nota

Esta aplicación está planteada para uso educativo. No constituye por sí misma una herramienta de diagnóstico psicológico.


### Funciones añadidas
- Descarga de resultados mediante la ventana de impresión del navegador, desde la que se puede elegir «Guardar como PDF». Incluye puntuaciones, gráfica y respuestas.
- Vista de respuestas ordenadas por Tensión, Depresión, Ira, Vigor y Fatiga, mostrando la opción elegida (0–4).


Versión corregida: las respuestas del encuestado se conservan durante todo el cuestionario y aparecen correctamente tanto en la vista ordenada como en el documento imprimible para guardar como PDF.


## Instalar como aplicación en el móvil
La web incluye soporte PWA y un icono POMS. Tras publicar los archivos en GitHub Pages y abrir la web mediante HTTPS:
- **iPhone/iPad:** Safari → botón Compartir → **Añadir a pantalla de inicio**.
- **Android:** Chrome → menú ⋮ → **Instalar aplicación** o **Añadir a pantalla de inicio**.
La primera visita debe hacerse con conexión para que se guarde la aplicación y sus archivos básicos.

Al publicar cambios, sube también el número de versión de `CACHE_NAME` en `service-worker.js` (por ejemplo, `poms-app-v5`) para que los móviles con la app instalada descarguen la versión nueva.
