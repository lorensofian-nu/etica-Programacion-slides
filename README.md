# La ética en la programación — Diapositivas

Presentación de 9 diapositivas en HTML/CSS/JS sobre ética en la programación: privacidad, justicia, ambiente, responsabilidad y una dinámica final tipo quiz.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `index.html` | Portada / índice de la presentación |
| `slide_01.html` | Portada del tema |
| `slide_02.html` | Introducción (Sofía) |
| `slide_03.html` | Principios éticos (Nicol) |
| `slide_04.html` | Privacidad y datos (Sebastián) |
| `slide_05.html` | Justicia e igualdad (Deiby) |
| `slide_06.html` | Ética profesional y ambiente (Dilan) |
| `slide_07.html` | Ética durante el desarrollo (Stiven) |
| `slide_08.html` | Conclusión (Carlos) |
| `slide_09.html` | Quiz interactivo (todo el equipo) |

Archivos de soporte:

- `global.css`: tokens de diseño (paleta, tipografía, radios, sombras) y componentes base.
- `nav.css` / `nav.js`: navegación entre diapositivas, atajos de teclado y escalado responsive.
- `utilities.css`: capa mínima de utilidades de layout (sustituye al CDN de Tailwind).
- `fonts.css` + `fonts/`: Fredoka, Nunito, JetBrains Mono y Material Icons autoalojados (funciona sin internet).
- `slides_brief.json`: brief histórico de diseño. El HTML y `global.css` son la fuente de verdad.
- `vercel.json`: configuración de despliegue.

## Uso

No requiere instalación ni build. Se puede abrir `index.html` directamente en el navegador o servirlo localmente:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

### Navegación

- `→` / `←`: siguiente / anterior.
- `Esc` o `Home`: volver al índice.
- El quiz se resuelve tocando una opción; la respuesta correcta se revela al instante.

### Proyección

El lienzo base es de 1280×720 px y se escala automáticamente para llenar cualquier pantalla (móvil, portátil, TV o proyector), manteniendo la proporción 16:9. En pantallas pequeñas la barra de navegación flotante queda fuera del contenido.

## Despliegue

El sitio es estático. En Vercel basta con importar el repositorio; `vercel.json` desactiva las URLs limpias para que los enlaces `.html` funcionen sin redirecciones.

## Notas de diseño

- Paleta: fondo azul claro con cuadrícula turquesa; texto azul marino profundo; acentos coral, verde, púrpura, naranja y azul.
- Tipografía grande pensada para proyección: títulos 42–64 px y cuerpo de 17–24 px.
- Componentes compartidos (`.speaker-badge`, `.mini-title`, `.chip`, `.badge-*`) para mantener la misma métrica en todas las diapositivas.
