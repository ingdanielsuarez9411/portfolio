'use strict';

/* ---------- Utilidades ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const toggle = (el) => el.classList.toggle('active');

/* ---------- Barra lateral (mostrar contactos en móvil) ---------- */
const sidebar = $('[data-sidebar]');
const sidebarBtn = $('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => toggle(sidebar));
}

/* ---------- Navegación por pestañas con soporte de #hash ----------
   Cada botón tiene data-target="sobre-mi" y cada article data-page="sobre-mi".
   Se puede enlazar directo: index.html#proyectos  ó  #demo-agente-voz-leads */
const navLinks = $$('[data-nav-link]');
const pages = $$('[data-page]');

function showPage(name, { updateHash = true, scroll = true } = {}) {
  const exists = pages.some((p) => p.dataset.page === name);
  if (!exists) name = pages[0].dataset.page;

  pages.forEach((p) => p.classList.toggle('active', p.dataset.page === name));
  navLinks.forEach((b) => b.classList.toggle('active', b.dataset.target === name));

  if (updateHash) history.replaceState(null, '', '#' + name);
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((btn) => btn.addEventListener('click', () => showPage(btn.dataset.target)));

/* ---------- Proyectos: render desde projects.js ---------- */
const projectList = $('[data-project-list]');
const filterList = $('[data-filter-list]');
const selectList = $('[data-select-list]');
const selectValue = $('[data-select-value]');
const selectBtn = $('[data-select]');

function iconHTML(name) {
  return `<ion-icon name="${name}" aria-hidden="true"></ion-icon>`;
}

function renderProjects() {
  if (!projectList || typeof PROJECTS === 'undefined') return;

  projectList.innerHTML = PROJECTS.map((p) => `
    <li class="project-item active" data-filter-item data-category="${p.category}">
      <button type="button" data-open-demo="${p.id}" aria-label="Abrir demo: ${p.title}">
        <figure class="project-img">
          ${p.badge ? `<span class="project-badge">${p.badge}</span>` : ''}
          <div class="project-item-icon-box">${iconHTML('play-circle-outline')}</div>
          <img src="${p.image}" alt="" loading="lazy">
        </figure>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-category">${p.category}</p>
      </button>
    </li>`).join('');

  // Filtros (botones en escritorio + lista desplegable en móvil)
  const cats = (typeof PROJECT_CATEGORIES !== 'undefined')
    ? PROJECT_CATEGORIES
    : ['Todos', ...new Set(PROJECTS.map((p) => p.category))];

  filterList.innerHTML = cats.map((c, i) =>
    `<li class="filter-item"><button type="button" class="${i === 0 ? 'active' : ''}" data-filter-btn data-value="${c}">${c}</button></li>`
  ).join('');
  selectList.innerHTML = cats.map((c) =>
    `<li class="select-item"><button type="button" data-select-item data-value="${c}">${c}</button></li>`
  ).join('');
  selectValue.textContent = cats[0];

  bindFilters();
  bindDemoButtons();
}

function applyFilter(value) {
  $$('[data-filter-item]').forEach((item) => {
    const show = value === 'Todos' || item.dataset.category === value;
    item.classList.toggle('active', show);
  });
  $$('[data-filter-btn]').forEach((b) => b.classList.toggle('active', b.dataset.value === value));
  selectValue.textContent = value;
}

function bindFilters() {
  $$('[data-filter-btn]').forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.value)));
  $$('[data-select-item]').forEach((b) => b.addEventListener('click', () => {
    applyFilter(b.dataset.value);
    toggle(selectBtn);
  }));
  if (selectBtn) selectBtn.addEventListener('click', () => toggle(selectBtn));
}

/* ---------- Modal de demo ---------- */
const modalContainer = $('[data-modal-container]');
const overlay = $('[data-overlay]');
const modalClose = $('[data-modal-close-btn]');
const demoMedia = $('[data-demo-media]');
const demoCategory = $('[data-demo-category]');
const demoTitle = $('[data-demo-title]');
const demoText = $('[data-demo-text]');
const demoStack = $('[data-demo-stack]');
const demoLinks = $('[data-demo-links]');
let lastFocused = null;

function mediaHTML(video, title) {
  if (!video) {
    return `<div class="demo-media is-empty">${iconHTML('videocam-off-outline')}&nbsp; Demo en preparación. Pronto habrá un video aquí.</div>`;
  }
  if (video.type === 'youtube') {
    return `<div class="demo-media"><iframe src="https://www.youtube-nocookie.com/embed/${video.id}?rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  }
  if (video.type === 'mp4') {
    return `<div class="demo-media"><video src="${video.src}" controls playsinline preload="metadata"></video></div>`;
  }
  if (video.type === 'gif') {
    return `<div class="demo-media"><img src="${video.src}" alt="Demo de ${title}"></div>`;
  }
  return '';
}

function openDemo(id, { updateHash = true } = {}) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;

  demoMedia.innerHTML = mediaHTML(p.video, p.title);
  demoCategory.textContent = p.category;
  demoTitle.textContent = p.title;
  demoText.textContent = p.description;
  demoStack.innerHTML = (p.stack || []).map((s) => `<span>${s}</span>`).join('');
  demoLinks.innerHTML = (p.links || []).map((l) =>
    `<a class="demo-link" href="${l.url}" target="_blank" rel="noopener">${iconHTML(l.icon || 'open-outline')}<span>${l.label}</span></a>`
  ).join('');

  lastFocused = document.activeElement;
  modalContainer.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
  if (updateHash) history.replaceState(null, '', '#demo-' + id);
}

function closeDemo() {
  modalContainer.classList.remove('active');
  overlay.classList.remove('active');
  demoMedia.innerHTML = ''; // detiene el video
  document.body.style.overflow = '';
  history.replaceState(null, '', '#proyectos');
  if (lastFocused) lastFocused.focus();
}

function bindDemoButtons() {
  $$('[data-open-demo]').forEach((b) => b.addEventListener('click', () => openDemo(b.dataset.openDemo)));
}

if (modalClose) modalClose.addEventListener('click', closeDemo);
if (overlay) overlay.addEventListener('click', closeDemo);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('active')) closeDemo();
});

/* ---------- Formulario de contacto (Formspree o mailto) ---------- */
const form = $('[data-form]');
const formInputs = $$('[data-form-input]');
const formBtn = $('[data-form-btn]');
const formStatus = $('[data-form-status]');

if (form) {
  formInputs.forEach((input) => input.addEventListener('input', () => {
    formBtn.toggleAttribute('disabled', !form.checkValidity());
  }));

  form.addEventListener('submit', async (e) => {
    const action = form.getAttribute('action') || '';
    // Si no se configuró Formspree, se abre el correo con el mensaje prellenado.
    if (!action.includes('formspree.io')) {
      e.preventDefault();
      const data = new FormData(form);
      const to = form.dataset.mailto || '';
      const subject = encodeURIComponent('Contacto desde el portafolio - ' + data.get('fullname'));
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('fullname')} (${data.get('email')})`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      return;
    }
    e.preventDefault();
    formBtn.setAttribute('disabled', '');
    formStatus.textContent = 'Enviando…';
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        formStatus.textContent = 'Mensaje enviado. Te responderé pronto.';
      } else {
        formStatus.textContent = 'No se pudo enviar. Escríbeme directamente por correo o LinkedIn.';
        formBtn.removeAttribute('disabled');
      }
    } catch {
      formStatus.textContent = 'Sin conexión. Escríbeme directamente por correo o LinkedIn.';
      formBtn.removeAttribute('disabled');
    }
  });
}

/* ---------- Arranque: leer el #hash de la URL ---------- */
function routeFromHash() {
  const hash = decodeURIComponent(location.hash.replace('#', ''));
  if (hash.startsWith('demo-')) {
    showPage('proyectos', { updateHash: false, scroll: false });
    openDemo(hash.slice(5), { updateHash: false });
  } else if (hash) {
    showPage(hash, { updateHash: false, scroll: false });
  }
}

renderProjects();
routeFromHash();
window.addEventListener('hashchange', routeFromHash);

$('[data-year]') && ($('[data-year]').textContent = new Date().getFullYear());
