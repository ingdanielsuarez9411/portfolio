# Portafolio web — Daniel Suárez

Sitio estático (HTML + CSS + JS, sin frameworks ni compilación) listo para publicarse en **GitHub Pages**.
Basado en la plantilla *vCard* de codewithsadee (CodePen), adaptada al español y con una sección
de **proyectos y demos** manejada desde un solo archivo de datos.

## Estructura

```
.
├── index.html               # Toda la página (4 pestañas: Sobre mí, Hoja de vida, Proyectos, Contacto)
├── .nojekyll                # Evita que GitHub procese el sitio con Jekyll
├── assets/
│   ├── css/style.css        # Estilos (plantilla + extensiones al final del archivo)
│   ├── js/projects.js       # ← Lista de proyectos y demos. Edita solo este archivo para agregar demos.
│   ├── js/main.js           # Navegación, filtros, ventana de demo, formulario
│   ├── img/                 # Foto, portadas de proyectos, favicon, imagen para redes (og-cover.png)
│   └── demos/               # Videos .mp4 o GIFs de las demos
└── README.md
```

## Publicar en GitHub Pages (5 minutos)

1. Crea un repositorio en GitHub. Dos opciones:
   - `TU-USUARIO.github.io` → la web quedará en `https://TU-USUARIO.github.io/`
   - cualquier otro nombre, por ejemplo `portafolio` → quedará en `https://TU-USUARIO.github.io/portafolio/`
2. Sube estos archivos a la rama `main` (arrastrándolos en la web de GitHub, con GitHub Desktop o con git):
   ```bash
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. Espera 1–2 minutos y abre la URL que GitHub muestra en esa misma pantalla.

Todas las rutas del sitio son relativas, así que funciona en cualquiera de las dos URLs sin cambios.

## Antes de publicar: qué personalizar

Busca `TU-` en `index.html` y reemplaza:

| Qué | Dónde |
|---|---|
| Correo, LinkedIn, GitHub, YouTube | Barra lateral y pestaña Contacto |
| Tu foto | Guarda `assets/img/avatar.jpg` (cuadrada, ≥ 400 px) y cambia `avatar.svg` por `avatar.jpg` en `index.html` |
| Formulario de contacto | Crea un formulario gratis en https://formspree.io, copia su URL y pégala en `action="..."`. Si lo dejas en `#`, el botón abre el correo del visitante con el mensaje ya escrito |
| Porcentajes de habilidades, textos | Pestaña Hoja de vida |

## Agregar una demo

Abre `assets/js/projects.js`, copia un objeto de la lista `PROJECTS` y edítalo. Ejemplos de video:

```js
video: { type: "youtube", id: "dQw4w9WgXcQ" }         // video en YouTube (recomendado: no ocupa espacio en el repo)
video: { type: "mp4", src: "assets/demos/agente.mp4" } // archivo local (GitHub recomienda < 50 MB por archivo)
video: { type: "gif", src: "assets/demos/bot.gif" }
video: null                                             // muestra "Demo en preparación"
```

Y enlaces opcionales:

```js
links: [
  { label: "Ver código", url: "https://github.com/TU-USUARIO/repo", icon: "logo-github" },
  { label: "Artículo", url: "https://...", icon: "document-text-outline" }
]
```

Cada demo tiene su propio enlace directo, útil para LinkedIn:
`https://TU-USUARIO.github.io/TU-REPO/#demo-agente-voz-leads` (usa el `id` del proyecto).
También puedes enlazar a una pestaña: `#proyectos`, `#hoja-de-vida`, `#contacto`.

Las portadas en `assets/img/project-*.svg` son placeholders; reemplázalas por capturas reales (640×400 recomendado).

## Ponerlo en LinkedIn

- **Sitio web del perfil:** Información de contacto → Sitio web → pega la URL.
- **Encabezado / titular:** añade la URL corta al final de tu titular.
- **Sección Destacado:** agrega "Enlace" con la URL del sitio o de una demo concreta. LinkedIn usará `og-cover.png` como vista previa; cámbiala si quieres otra imagen (1200×630).

## Iconos

Los iconos se cargan desde [Ionicons](https://ionic.io/ionicons) por CDN. Para cambiar uno, usa el nombre que aparece en esa página.

## Licencia

Plantilla original: MIT (ver `LICENSE.txt`). Contenido y proyectos: © Daniel Suárez.
