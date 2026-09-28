/**
 * BrandCraft Merchandise — dashboard.js
 * Powers the OPTIONAL demo-only pages/admin-dashboard.html. This page is
 * not part of the public customer experience (no dashboard is linked from
 * the public header/footer) — it exists only as a template extra.
 * Static demo data only; no backend/auth is wired up.
 */
(function () {
  'use strict';

  function initSectionNav() {
    var links = document.querySelectorAll('[data-dash-nav]');
    var sections = document.querySelectorAll('[data-dash-section]');
    if (!links.length) { return; }
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var target = link.getAttribute('data-dash-nav');
        links.forEach(function (l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
        sections.forEach(function (s) { s.hidden = s.getAttribute('data-dash-section') !== target; });
      });
    });
  }

  function animateBars() {
    document.querySelectorAll('[data-dash-bar]').forEach(function (bar) {
      var value = bar.getAttribute('data-dash-bar');
      requestAnimationFrame(function () { bar.style.width = value + '%'; });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSectionNav();
    animateBars();
  });
})();
