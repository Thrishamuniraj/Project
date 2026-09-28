/* ==========================================================================
   BLOG.JS — Article search, category filtering, and client-side pagination
   for pages/blog.html
   ========================================================================== */
(function () {
  'use strict';

  const PAGE_SIZE = 6;

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('[data-blog-grid]');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('[data-article]'));
    const searchInput = document.querySelector('[data-blog-search]');
    const categoryButtons = document.querySelectorAll('[data-blog-category]');
    const emptyState = document.querySelector('[data-blog-empty]');
    const pagination = document.querySelector('[data-blog-pagination]');

    let activeCategory = 'all';
    let searchTerm = '';
    let currentPage = 1;

    function filteredCards() {
      return cards.filter((card) => {
        // The featured article already leads the page, so the grid skips its card in the unfiltered "All" view.
        if (activeCategory === 'all' && !searchTerm && card.hasAttribute('data-featured')) return false;
        const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
        const haystack = (card.dataset.title + ' ' + card.dataset.excerpt).toLowerCase();
        const matchesSearch = !searchTerm || haystack.includes(searchTerm);
        return matchesCategory && matchesSearch;
      });
    }

    function render() {
      const filtered = filteredCards();
      cards.forEach((c) => (c.hidden = true));

      const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      currentPage = Math.min(currentPage, totalPages);
      const start = (currentPage - 1) * PAGE_SIZE;
      filtered.slice(start, start + PAGE_SIZE).forEach((c) => (c.hidden = false));

      if (emptyState) emptyState.hidden = filtered.length !== 0;
      renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
      if (!pagination) return;
      pagination.innerHTML = '';
      if (totalPages <= 1) return;

      const makeBtn = (label, page, opts = {}) => {
        const el = document.createElement(opts.isCurrent ? 'span' : 'a');
        el.textContent = label;
        el.href = '#';
        if (opts.isCurrent) el.classList.add('is-active');
        if (opts.disabled) el.classList.add('is-disabled');
        if (!opts.isCurrent) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = page;
            render();
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
        return el;
      };

      pagination.appendChild(makeBtn('Previous', currentPage - 1, { disabled: currentPage === 1 }));
      for (let i = 1; i <= totalPages; i += 1) {
        pagination.appendChild(makeBtn(String(i), i, { isCurrent: i === currentPage }));
      }
      pagination.appendChild(makeBtn('Next', currentPage + 1, { disabled: currentPage === totalPages }));
    }

    categoryButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        activeCategory = btn.dataset.blogCategory;
        currentPage = 1;
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        currentPage = 1;
        render();
      });
    }

    render();
  });
})();
