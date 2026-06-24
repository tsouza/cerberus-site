/* ============================================================
   cerberus — interactions + light rendering
   - renders feature cards & layer chips from js/data.js
   - quick-start tab switching
   - copy-to-clipboard on the hero command
   No framework, no build step. Plain DOM.
   ============================================================ */

(function () {
  'use strict';

  /* ---- helpers -------------------------------------------- */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const el = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  /* ---- render feature cards ------------------------------- */
  function renderFeatures() {
    const grid = $('#features-grid');
    if (!grid || !window.CERBERUS_FEATURES) return;
    grid.innerHTML = '';
    window.CERBERUS_FEATURES.forEach((f) => {
      grid.appendChild(el(`
        <article class="card card--feature">
          <div class="card__head">
            <span class="icon-chip icon-chip--feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-soft)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${f.icon}</svg>
            </span>
            <span class="card__tag">${f.tag}</span>
          </div>
          <h3 class="card__title">${f.title}</h3>
          <p class="card__body">${f.body}</p>
          <div class="card__mono">${f.mono}</div>
        </article>
      `));
    });
  }

  /* ---- render layer chips --------------------------------- */
  function renderLayers() {
    const wrap = $('#layer-chips');
    if (!wrap || !window.CERBERUS_LAYERS) return;
    wrap.innerHTML = '';
    window.CERBERUS_LAYERS.forEach((name, i) => {
      const id = 'L' + String(i + 1).padStart(2, '0');
      wrap.appendChild(el(`
        <span class="layer-chip"><span class="layer-chip__id">${id}</span>${name}</span>
      `));
    });
  }

  /* ---- quick-start tabs ----------------------------------- */
  function initTabs() {
    const tabs = $$('.tab');
    const panels = $$('[data-panel]');
    if (!tabs.length) return;
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.tab;
        tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
        panels.forEach((p) => { p.hidden = p.dataset.panel !== key; });
      });
    });
  }

  /* ---- copy-to-clipboard ---------------------------------- */
  function initCopy() {
    $$('[data-copy]').forEach((btn) => {
      const label = $('[data-copy-label]', btn);
      const original = label ? label.textContent : '';
      let timer;
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
        if (label) {
          label.textContent = 'copied ✓';
          clearTimeout(timer);
          timer = setTimeout(() => { label.textContent = original; }, 1600);
        }
      });
    });
  }

  /* ---- boot ----------------------------------------------- */
  function init() {
    renderFeatures();
    renderLayers();
    initTabs();
    initCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
