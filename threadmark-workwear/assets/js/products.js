/* ==========================================================================
   PRODUCTS.JS — Catalogue search, industry/material/color filtering, sort,
   and deep-link support (?category=healthcare) for pages/products.html
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('[data-product-grid]');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('[data-product]'));
    const searchInput = document.querySelector('[data-product-search]');
    const sortSelect = document.querySelector('[data-product-sort]');
    const resultCount = document.querySelector('[data-result-count]');
    const emptyState = document.querySelector('[data-empty-state]');
    const activeFiltersEl = document.querySelector('[data-active-filters]');
    const filterPanel = document.querySelector('[data-filter-panel]');
    const filterToggle = document.querySelector('[data-filter-toggle]');
    const filterClose = document.querySelector('[data-filter-close]');
    const clearAllBtn = document.querySelector('[data-clear-filters]');

    const state = { industry: [], type: [], material: [], color: [], search: '', sort: 'featured' };

    // Initialize state from URL (?category=healthcare)
    const params = new URLSearchParams(window.location.search);
    if (params.get('category')) state.industry = [params.get('category')];

    function syncCheckboxesFromState() {
      document.querySelectorAll('[data-filter-group]').forEach((group) => {
        const key = group.dataset.filterGroup;
        group.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
          cb.checked = state[key]?.includes(cb.value);
        });
      });
    }

    function readCheckboxesToState() {
      document.querySelectorAll('[data-filter-group]').forEach((group) => {
        const key = group.dataset.filterGroup;
        state[key] = Array.from(group.querySelectorAll('input[type="checkbox"]:checked')).map((cb) => cb.value);
      });
    }

    function renderActiveChips() {
      if (!activeFiltersEl) return;
      activeFiltersEl.innerHTML = '';
      const labels = { industry: 'Industry', type: 'Type', material: 'Material', color: 'Color' };
      let any = false;
      Object.keys(labels).forEach((key) => {
        (state[key] || []).forEach((val) => {
          any = true;
          const chip = document.createElement('span');
          chip.className = 'active-filter-chip';
          const cbEl = document.querySelector(`[data-filter-group="${key}"] input[value="${CSS.escape(val)}"]`);
          const text = cbEl?.nextElementSibling?.textContent?.trim() || val;
          chip.innerHTML = `<span>${labels[key]}: ${text}</span><button type="button" aria-label="Remove filter">&times;</button>`;
          chip.querySelector('button').addEventListener('click', () => {
            const cb = document.querySelector(`[data-filter-group="${key}"] input[value="${CSS.escape(val)}"]`);
            if (cb) cb.checked = false;
            readCheckboxesToState();
            applyFilters();
          });
          activeFiltersEl.appendChild(chip);
        });
      });
      activeFiltersEl.hidden = !any;
    }

    function applyFilters() {
      const search = state.search.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach((card) => {
        const industry = card.dataset.industry || '';
        const type = card.dataset.type || '';
        const material = card.dataset.material || '';
        const color = card.dataset.color || '';
        const name = (card.dataset.name || '').toLowerCase();

        const matchesIndustry = !state.industry.length || state.industry.includes(industry);
        const matchesType = !state.type.length || state.type.includes(type);
        const matchesMaterial = !state.material.length || state.material.includes(material);
        const matchesColor = !state.color.length || color.split(' ').some((c) => state.color.includes(c));
        const matchesSearch = !search || name.includes(search);

        const visible = matchesIndustry && matchesType && matchesMaterial && matchesColor && matchesSearch;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      sortCards();
      if (resultCount) resultCount.textContent = String(visibleCount);
      if (emptyState) emptyState.hidden = visibleCount !== 0;
      renderActiveChips();
    }

    function sortCards() {
      const visible = cards.filter((c) => !c.hidden);
      const sorted = visible.slice().sort((a, b) => {
        if (state.sort === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
        if (state.sort === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
        if (state.sort === 'name-asc') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        return Number(a.dataset.featured || 0) - Number(b.dataset.featured || 0);
      });
      sorted.forEach((card) => grid.appendChild(card));
    }

    document.querySelectorAll('[data-filter-group] input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener('change', () => {
        readCheckboxesToState();
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        state.search = searchInput.value;
        applyFilters();
      });
    }
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        applyFilters();
      });
    }
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        state.industry = []; state.type = []; state.material = []; state.color = []; state.search = '';
        if (searchInput) searchInput.value = '';
        syncCheckboxesFromState();
        applyFilters();
      });
    }
    if (filterToggle && filterPanel) {
      filterToggle.addEventListener('click', () => filterPanel.setAttribute('data-open', 'true'));
    }
    if (filterClose && filterPanel) {
      filterClose.addEventListener('click', () => filterPanel.setAttribute('data-open', 'false'));
    }

    syncCheckboxesFromState();
    applyFilters();
  });
})();
