/* ==========================================================================
   DASHBOARD.JS — Admin dashboard sidebar toggle + table/section switching
   for pages/admin-dashboard.html (demo/admin surface, not customer-facing)
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('[data-dashboard-sidebar]');
    const overlay = document.querySelector('[data-dashboard-overlay]');
    const toggle = document.querySelector('[data-dashboard-toggle]');

    function openSidebar() {
      sidebar?.setAttribute('data-open', 'true');
      overlay?.setAttribute('data-open', 'true');
    }
    function closeSidebar() {
      sidebar?.setAttribute('data-open', 'false');
      overlay?.setAttribute('data-open', 'false');
    }
    toggle?.addEventListener('click', () => {
      sidebar?.getAttribute('data-open') === 'true' ? closeSidebar() : openSidebar();
    });
    overlay?.addEventListener('click', closeSidebar);

    // Section switching (Overview / Orders / Quotes / Customers / ...)
    const navLinks = document.querySelectorAll('[data-dashboard-nav] a');
    const sections = document.querySelectorAll('[data-dashboard-section]');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('data-section-target');
        if (!target) return;
        e.preventDefault();
        navLinks.forEach((l) => l.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
        sections.forEach((s) => (s.hidden = s.dataset.dashboardSection !== target));
        closeSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Simple client-side table search (Orders / Quotes / Embroidery Requests)
    document.querySelectorAll('[data-table-search]').forEach((input) => {
      input.addEventListener('input', () => {
        const wrap = document.getElementById(input.dataset.tableSearch);
        if (!wrap) return;
        const term = input.value.trim().toLowerCase();
        wrap.querySelectorAll('tbody tr').forEach((row) => {
          row.hidden = term.length > 0 && !row.textContent.toLowerCase().includes(term);
        });
      });
    });
  });
})();
