/**
 * BrandCraft Merchandise — blog.js
 * Client-side data, search, category filter and pagination for
 * pages/blog.html. Article detail content lives directly in
 * pages/blog-details.html (static, since this is a template — wire a
 * real CMS feed here if one becomes available).
 */
(function () {
  'use strict';

  var POSTS = [
    { id: 'b01', title: 'How to Choose the Right Promotional Product for Your Campaign', category: 'Product Guides', date: '2026-08-02', author: 'Maya Lindqvist', excerpt: 'Matching a product to your audience, budget and message matters more than picking the trendiest item. Here is the framework our account team uses.', featured: true, img: 'bc-blog-choose-product.webp', alt: 'Marketing team planning a campaign around a table' },
    { id: 'b02', title: 'Embroidery vs. Screen Printing: Which Branding Method Wins?', category: 'Branding Tips', date: '2026-07-18', author: 'Devon Okafor', excerpt: 'Both methods have a place in a merchandise programme. We break down cost, durability and best-fit garments for each.', img: 'bc-blog-embroidery.webp', alt: 'Embroidered roses on a white shirt sleeve' },
    { id: 'b03', title: '5 Corporate Gifting Ideas That Employees Actually Keep', category: 'Corporate Gifting', date: '2026-07-05', author: 'Priya Nandakumar', excerpt: 'Skip the drawer-filler. These five gift categories consistently get used long after the unboxing.', img: 'bc-blog-gifting.webp', alt: 'Wrapped gift box with confetti' },
    { id: 'b04', title: 'Planning Merchandise for a 500-Person Conference', category: 'Event Merchandise', date: '2026-06-21', author: 'Maya Lindqvist', excerpt: 'A step-by-step timeline for sourcing, branding and delivering merchandise for a large-scale event without last-minute panic.', img: 'bc-blog-conference.webp', alt: 'Conference hall set with long tables before an event' },
    { id: 'b05', title: 'Apparel Sizing Guide for Corporate Bulk Orders', category: 'Apparel', date: '2026-06-09', author: 'Devon Okafor', excerpt: 'Avoid re-order headaches. How to collect accurate sizing from a distributed team before you place a bulk apparel order.', img: 'bc-blog-sizing.webp', alt: 'Folded t-shirts in several colours and sizes' },
    { id: 'b06', title: 'Drinkware That Survives the Office Dishwasher (and Looks Good Doing It)', category: 'Drinkware', date: '2026-05-27', author: 'Priya Nandakumar', excerpt: 'Not all printed mugs are created equal. What to ask your supplier about print durability before you order 500 of them.', img: 'bc-blog-drinkware.webp', alt: 'Coffee being poured into a ceramic mug' },
    { id: 'b07', title: 'Tech Accessories Employees Will Actually Plug In', category: 'Tech Accessories', date: '2026-05-14', author: 'Devon Okafor', excerpt: 'Power banks and USB drives remain top requests — here is how to pick ones people keep on their desk, not in a drawer.', img: 'bc-blog-tech.webp', alt: 'Hand holding a white phone charger' },
    { id: 'b08', title: 'Building a Reorder Programme for Recurring Merchandise Needs', category: 'Corporate Branding', date: '2026-04-30', author: 'Maya Lindqvist', excerpt: 'For teams ordering onboarding kits or event swag every quarter, a standing reorder programme saves weeks of lead time.', img: 'bc-blog-reorder.webp', alt: 'Warehouse racking stocked with boxed merchandise' },
    { id: 'b09', title: 'A Practical Guide to Logo File Formats for Merchandise Printing', category: 'Branding Tips', date: '2026-04-11', author: 'Priya Nandakumar', excerpt: 'Vector vs. raster, and why your marketing team should always keep an AI or EPS master file on hand.', img: 'bc-blog-logo-files.webp', alt: 'Designer preparing artwork on a drawing tablet' }
  ];

  var PAGE_SIZE = 6;
  var state = { search: '', category: 'all', page: 1 };

  function formatDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  var PHOTO_DIR = '../assets/images/photos/';

  function postPhoto(post, eager) {
    return '<img src="' + PHOTO_DIR + post.img + '" alt="' + post.alt + '" width="900" height="562"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }

  function renderCard(post) {
    return (
      '<article class="card blog-card">' +
        '<div class="blog-media has-photo">' + postPhoto(post) + '</div>' +
        '<div class="blog-body">' +
          '<div class="blog-meta"><span class="badge badge-accent">' + post.category + '</span><span>' + formatDate(post.date) + '</span></div>' +
          '<h3>' + post.title + '</h3>' +
          '<p>' + post.excerpt + '</p>' +
          '<a class="blog-readmore" href="blog-details.html?id=' + post.id + '">Read Article ' +
          '<svg class="icon" style="width:16px;height:16px;" viewBox="0 0 24 24"><use href="#icon-arrow-right"></use></svg></a>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    var grid = document.querySelector('[data-blog-grid]');
    var emptyEl = document.querySelector('[data-blog-empty]');
    var paginationEl = document.querySelector('[data-blog-pagination]');
    if (!grid) { return; }

    var filtered = POSTS.filter(function (p) {
      var matchesCat = state.category === 'all' || p.category === state.category;
      var matchesSearch = !state.search || (p.title + ' ' + p.excerpt).toLowerCase().indexOf(state.search) !== -1;
      return matchesCat && matchesSearch;
    });

    var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    state.page = Math.min(state.page, totalPages);
    var start = (state.page - 1) * PAGE_SIZE;
    var pageItems = filtered.slice(start, start + PAGE_SIZE);

    grid.innerHTML = pageItems.map(renderCard).join('');
    grid.hidden = filtered.length === 0;
    if (emptyEl) { emptyEl.hidden = filtered.length !== 0; }

    if (paginationEl) {
      var html = '';
      html += '<button type="button" class="pagination-arrow" data-page-dir="-1" ' + (state.page === 1 ? 'disabled' : '') + ' aria-label="Previous page">‹</button>';
      for (var i = 1; i <= totalPages; i++) {
        html += '<button type="button" class="' + (i === state.page ? 'is-current' : '') + '" data-page="' + i + '">' + i + '</button>';
      }
      html += '<button type="button" class="pagination-arrow" data-page-dir="1" ' + (state.page === totalPages ? 'disabled' : '') + ' aria-label="Next page">›</button>';
      paginationEl.innerHTML = html;
      paginationEl.querySelectorAll('[data-page]').forEach(function (btn) {
        btn.addEventListener('click', function () { state.page = parseInt(btn.getAttribute('data-page'), 10); render(); window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' }); });
      });
      paginationEl.querySelectorAll('[data-page-dir]').forEach(function (btn) {
        btn.addEventListener('click', function () { state.page += parseInt(btn.getAttribute('data-page-dir'), 10); render(); window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' }); });
      });
    }
  }

  function renderFeatured() {
    var mount = document.querySelector('[data-blog-featured]');
    if (!mount) { return; }
    var featured = POSTS.filter(function (p) { return p.featured; })[0] || POSTS[0];
    mount.classList.add('blog-featured');
    mount.innerHTML =
      '<div class="blog-featured__media">' + postPhoto(featured) + '</div>' +
      '<div class="blog-featured__body">' +
      '<span class="eyebrow">Featured Article</span>' +
      '<h2>' + featured.title + '</h2>' +
      '<p class="lead">' + featured.excerpt + '</p>' +
      '<div class="blog-meta" style="margin-bottom:var(--space-6);"><span class="badge badge-accent">' + featured.category + '</span><span>' + formatDate(featured.date) + '</span><span>By ' + featured.author + '</span></div>' +
      '<a class="btn btn-accent" href="blog-details.html?id=' + featured.id + '">Read Full Article</a>' +
      '</div>';
  }

  function renderDetails() {
    var mount = document.querySelector('[data-blog-detail]');
    if (!mount) { return; }
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || POSTS[0].id;
    var post = POSTS.filter(function (p) { return p.id === id; })[0] || POSTS[0];
    document.title = post.title + ' — BrandCraft Merchandise Blog';

    var titleEl = document.querySelector('[data-bd-title]');
    if (titleEl) { titleEl.textContent = post.title; }
    var coverEl = document.querySelector('[data-bd-cover]');
    if (coverEl) { coverEl.classList.add('has-photo'); coverEl.innerHTML = postPhoto(post, true); }
    var metaEl = document.querySelector('[data-bd-meta]');
    if (metaEl) { metaEl.innerHTML = '<span class="badge badge-accent">' + post.category + '</span><span>' + formatDate(post.date) + '</span><span>By ' + post.author + '</span>'; }

    var related = POSTS.filter(function (p) { return p.id !== post.id; }).slice(0, 3);
    var relatedEl = document.querySelector('[data-bd-related]');
    if (relatedEl) { relatedEl.innerHTML = related.map(renderCard).join(''); }
  }

  function initListPage() {
    var searchEl = document.querySelector('[data-blog-search]');
    var catButtons = document.querySelectorAll('[data-blog-category]');
    if (!searchEl && !catButtons.length) { return; }

    if (searchEl) {
      searchEl.addEventListener('input', function () { state.search = searchEl.value.trim().toLowerCase(); state.page = 1; render(); });
    }
    catButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        catButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
        state.category = btn.getAttribute('data-blog-category');
        state.page = 1;
        render();
      });
    });
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderFeatured();
    initListPage();
    renderDetails();
  });
})();
