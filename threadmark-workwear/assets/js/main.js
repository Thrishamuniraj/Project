/* ==========================================================================
   THREADMARK WORKWEAR — MAIN.JS
   Shared site-wide behavior: theme switching, mobile nav, accordions,
   tabs, dropdowns, modals, toasts, password toggles, header scroll state.
   Loaded on every page. Page-specific modules (products.js, embroidery.js,
   bulk-orders.js, pricing.js, blog.js, dashboard.js) extend this.
   ========================================================================== */

(function () {
  'use strict';

  const THEME_KEY = 'tm-theme';
  const root = document.documentElement;

  /* ------------------------------------------------------------------
     Theme: light / dark / system, persisted to localStorage
     ------------------------------------------------------------------ */
  function applyStoredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      root.setAttribute('data-theme', stored);
    }
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = current ? current === 'dark' : prefersDark;
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(next === 'dark'));
    });
  }

  applyStoredTheme();

  /* ------------------------------------------------------------------
     Text direction: LTR / RTL, persisted to localStorage
     ------------------------------------------------------------------ */
  const DIR_KEY = 'tm-dir';

  // One toggle button per location (top bar, mobile menu, dashboard); its label shows the current direction.
  function applyDir(dir) {
    const rtl = dir === 'rtl';
    root.setAttribute('dir', dir);
    document.querySelectorAll('[data-dir-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(rtl));
      btn.setAttribute('aria-label', rtl ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
      btn.textContent = rtl ? 'RTL' : 'LTR';
    });
  }

  function initDir() {
    let stored = null;
    try { stored = localStorage.getItem(DIR_KEY); } catch (e) { /* storage unavailable */ }
    applyDir(stored === 'rtl' || stored === 'ltr' ? stored : root.getAttribute('dir') || 'ltr');
    document.querySelectorAll('[data-dir-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        try { localStorage.setItem(DIR_KEY, next); } catch (e) { /* storage unavailable */ }
        applyDir(next);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDir();
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });

    initMobileNav();
    initHeaderScroll();
    initDropdowns();
    initHomeMenu();
    initAccordions();
    initTabs();
    initModals();
    initPasswordToggles();
    initFormValidation();
    initSmoothAnchors();
    setActiveNavLink();
    initGenericNewsletterForms();
  });

  /* ------------------------------------------------------------------
     Mobile navigation drawer
     ------------------------------------------------------------------ */
  function initMobileNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-mobile-nav]');
    if (!toggle || !nav) return;
    const closeBtn = nav.querySelector('[data-nav-close]');
    const backdrop = nav.querySelector('.mobile-nav-backdrop');

    function open() {
      nav.setAttribute('data-open', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-locked');
      const firstLink = nav.querySelector('a, button');
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
    function close() {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-locked');
      toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener('click', () => {
      nav.getAttribute('data-open') === 'true' ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') close();
    });
  }

  /* ------------------------------------------------------------------
     Sticky header shadow state
     ------------------------------------------------------------------ */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     Highlight current page in nav (works without a server templating layer)
     ------------------------------------------------------------------ */
  function setActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a, .mobile-nav-links a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const file = href.split('/').pop();
      if (file === path) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- Home menu: Escape closes the hover/focus dropdown; the mobile Home row expands/collapses ---------- */
  function initHomeMenu() {
    document.querySelectorAll('.nav-menu').forEach(function (menu) {
      menu.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { menu.classList.add('is-dismissed'); var l = menu.querySelector('.nav-menu__link'); if (l) { l.focus(); } }
      });
      menu.addEventListener('mouseleave', function () { menu.classList.remove('is-dismissed'); });
      menu.addEventListener('focusout', function (e) { if (!menu.contains(e.relatedTarget)) { menu.classList.remove('is-dismissed'); } });
    });
    document.querySelectorAll('.mobile-nav-group__toggle').forEach(function (btn) {
      var list = document.getElementById(btn.getAttribute('aria-controls'));
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        if (list) { list.hidden = !open; }
      });
    });
  }

  /* ------------------------------------------------------------------
     Dropdown menus (header utility menus, filter sorts, etc.)
     ------------------------------------------------------------------ */
  function initDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
      const trigger = dropdown.querySelector('[data-dropdown-trigger]');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.getAttribute('data-open') === 'true';
        document.querySelectorAll('[data-dropdown][data-open="true"]').forEach((d) => d.setAttribute('data-open', 'false'));
        dropdown.setAttribute('data-open', String(!isOpen));
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('[data-dropdown][data-open="true"]').forEach((d) => {
        d.setAttribute('data-open', 'false');
        const t = d.querySelector('[data-dropdown-trigger]');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('[data-dropdown][data-open="true"]').forEach((d) => {
          d.setAttribute('data-open', 'false');
          const t = d.querySelector('[data-dropdown-trigger]');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  /* ------------------------------------------------------------------
     Accordions (FAQ sections, embroidery workflow details)
     ------------------------------------------------------------------ */
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach((accordion) => {
      const allowMultiple = accordion.hasAttribute('data-accordion-multiple');
      const triggers = accordion.querySelectorAll('.accordion-trigger');
      triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const panel = document.getElementById(trigger.getAttribute('aria-controls'));
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';
          if (!allowMultiple) {
            triggers.forEach((t) => {
              if (t !== trigger) {
                t.setAttribute('aria-expanded', 'false');
                const p = document.getElementById(t.getAttribute('aria-controls'));
                if (p) p.style.maxHeight = null;
              }
            });
          }
          trigger.setAttribute('aria-expanded', String(!isOpen));
          if (panel) panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Tabs (product details, pricing breakdowns)
     ------------------------------------------------------------------ */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
      const buttons = tabGroup.querySelectorAll('.tabs-list button');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.setAttribute('aria-selected', 'false'));
          btn.setAttribute('aria-selected', 'true');
          const target = document.getElementById(btn.getAttribute('aria-controls'));
          tabGroup.querySelectorAll('.tab-panel').forEach((p) => {
            p.classList.remove('is-active');
            p.hidden = true;
          });
          if (target) {
            target.classList.add('is-active');
            target.hidden = false;
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Modals
     ------------------------------------------------------------------ */
  function initModals() {
    document.querySelectorAll('[data-modal-open]').forEach((opener) => {
      opener.addEventListener('click', () => {
        const modal = document.getElementById(opener.getAttribute('data-modal-open'));
        if (modal) openModal(modal);
      });
    });
    document.querySelectorAll('.modal-root').forEach((modal) => {
      modal.querySelectorAll('[data-modal-close], .modal-backdrop').forEach((el) => {
        el.addEventListener('click', () => closeModal(modal));
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-root[data-open="true"]').forEach((m) => closeModal(m));
      }
    });
  }
  function openModal(modal) {
    modal.setAttribute('data-open', 'true');
    document.body.classList.add('nav-locked');
    const focusable = modal.querySelector('input, button, textarea, select');
    if (focusable) focusable.focus();
  }
  function closeModal(modal) {
    modal.setAttribute('data-open', 'false');
    document.body.classList.remove('nav-locked');
  }
  window.TM = window.TM || {};
  window.TM.openModal = openModal;
  window.TM.closeModal = closeModal;

  /* ------------------------------------------------------------------
     Password visibility toggles (login / register)
     ------------------------------------------------------------------ */
  function initPasswordToggles() {
    document.querySelectorAll('[data-password-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.getAttribute('data-password-toggle'));
        if (!input) return;
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
        btn.classList.toggle('is-visible', !showing);
      });
    });
  }

  /* ------------------------------------------------------------------
     Toast notifications
     ------------------------------------------------------------------ */
  function ensureToastRegion() {
    let region = document.querySelector('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    return region;
  }
  function showToast({ type = 'info', title, message, duration = 5000 }) {
    const region = ensureToastRegion();
    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'success' ? ' toast-success' : type === 'error' ? ' toast-error' : '');
    toast.innerHTML =
      '<div><strong></strong><p></p></div><button class="toast-close" aria-label="Dismiss notification" type="button">&times;</button>';
    toast.querySelector('strong').textContent = title || '';
    toast.querySelector('p').textContent = message || '';
    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    region.appendChild(toast);
    if (duration) setTimeout(() => toast.remove(), duration);
  }
  window.TM.showToast = showToast;

  /* ------------------------------------------------------------------
     Form validation helpers (shared by contact, quote, embroidery,
     bulk-order, login, register forms — page modules call validateField)
     ------------------------------------------------------------------ */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

  function setFieldError(field, message) {
    const wrap = field.closest('.field');
    if (!wrap) return;
    const errorEl = wrap.querySelector('.field-error');
    if (message) {
      wrap.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
      field.setAttribute('aria-invalid', 'true');
    } else {
      wrap.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      field.removeAttribute('aria-invalid');
    }
  }
  window.TM.setFieldError = setFieldError;

  function validateField(field) {
    const value = (field.value || '').trim();
    const label = field.closest('.field')?.querySelector('label')?.textContent.replace('*', '').trim() || 'This field';

    if (field.hasAttribute('required') && !value && field.type !== 'checkbox') {
      setFieldError(field, `Please enter ${label.toLowerCase()}.`);
      return false;
    }
    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
      setFieldError(field, 'This is required to continue.');
      return false;
    }
    if (value && field.type === 'email' && !EMAIL_RE.test(value)) {
      setFieldError(field, 'Please enter a valid email address.');
      return false;
    }
    if (value && field.type === 'tel' && !PHONE_RE.test(value)) {
      setFieldError(field, 'Please enter a valid phone number.');
      return false;
    }
    if (value && field.type === 'number') {
      const min = field.getAttribute('min');
      if (min && Number(value) < Number(min)) {
        setFieldError(field, `Please enter an estimated quantity of at least ${min}.`);
        return false;
      }
    }
    if (field.dataset.matchField) {
      const other = document.getElementById(field.dataset.matchField);
      if (other && value !== other.value) {
        setFieldError(field, 'Passwords do not match.');
        return false;
      }
    }
    setFieldError(field, '');
    return true;
  }
  window.TM.validateField = validateField;

  function initFormValidation() {
    document.querySelectorAll('form[data-validate]').forEach((form) => {
      const fields = form.querySelectorAll('.input, select.select, textarea.input, input[type="checkbox"][required]');
      fields.forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
          if (field.closest('.field')?.classList.contains('has-error')) validateField(field);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Generic Formspree/Netlify-ready form submit handler.
     Pages with richer behavior (contact, bulk-orders, embroidery) attach
     their own handler in their dedicated module and can reuse
     TM.submitForm for the shared fetch/success/error/loading flow.
     ------------------------------------------------------------------ */
  function submitForm(form, { onSuccess, onError } = {}) {
    const fields = form.querySelectorAll('.input, select.select, textarea.input');
    let valid = true;
    fields.forEach((f) => { if (!validateField(f)) valid = false; });
    form.querySelectorAll('input[type="checkbox"][required]').forEach((f) => { if (!validateField(f)) valid = false; });
    if (!valid) {
      const firstError = form.querySelector('.has-error .input, .has-error .select, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const successEl = form.querySelector('[data-form-success]');
    const errorEl = form.querySelector('[data-form-error]');
    if (submitBtn) submitBtn.classList.add('is-loading');
    if (errorEl) errorEl.hidden = true;

    // TODO: Replace with actual Formspree endpoint (or Netlify Forms `data-netlify="true"` on the <form>)
    const endpoint = form.getAttribute('action') || '';

    // Demo template: simulate a network call so the UI states are real and
    // testable without a backend. Swap this block for a real fetch() once
    // the Formspree/Netlify endpoint above is configured.
    setTimeout(() => {
      if (submitBtn) submitBtn.classList.remove('is-loading');
      form.reset();
      form.querySelectorAll('.upload-list').forEach((list) => (list.innerHTML = ''));
      if (successEl) successEl.hidden = false;
      showToast({ type: 'success', title: 'Request received', message: "We'll be in touch within one business day." });
      if (typeof onSuccess === 'function') onSuccess();
    }, 900);
  }
  window.TM.submitForm = submitForm;

  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.matches('form[data-validate]') && !form.hasAttribute('data-custom-submit')) {
      e.preventDefault();
      submitForm(form);
    }
  });

  /* ------------------------------------------------------------------
     Newsletter forms (footer) — Mailchimp/ConvertKit ready
     ------------------------------------------------------------------ */
  function initGenericNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && !EMAIL_RE.test(input.value.trim())) {
          showToast({ type: 'error', title: 'Invalid email', message: 'Please enter a valid email address to subscribe.' });
          return;
        }
        // TODO: Replace with Mailchimp / ConvertKit form action + list ID
        showToast({ type: 'success', title: 'Subscribed', message: "You're on the list for uniform & workwear updates." });
        form.reset();
      });
    });
  }

  /* ------------------------------------------------------------------
     Smooth-scroll for in-page anchors (table of contents, FAQ links)
     ------------------------------------------------------------------ */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      link.addEventListener('click', (e) => {
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ------------------------------------------------------------------
     File upload helper shared by custom-embroidery.js and bulk-orders.js
     ------------------------------------------------------------------ */
  function initUploadZone(zone, { onFiles, accept, maxSizeMB = 25 } = {}) {
    const input = zone.querySelector('input[type="file"]');
    const list = document.getElementById(zone.dataset.uploadList || '');
    if (!input) return;

    function humanSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function renderFile(file) {
      if (!list) return;
      const item = document.createElement('div');
      item.className = 'upload-item';
      const tooBig = file.size > maxSizeMB * 1024 * 1024;
      item.innerHTML =
        '<div class="upload-item-icon" aria-hidden="true">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>' +
        '</div><div class="upload-item-info"><strong></strong><span></span></div>' +
        '<button type="button" class="upload-item-remove" aria-label="Remove file"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
      item.querySelector('strong').textContent = file.name;
      item.querySelector('span').textContent = tooBig
        ? `File size must be below ${maxSizeMB} MB.`
        : humanSize(file.size);
      if (tooBig) item.querySelector('span').style.color = 'var(--color-danger)';
      item.querySelector('.upload-item-remove').addEventListener('click', () => item.remove());
      list.appendChild(item);
    }

    function handleFiles(fileList) {
      const files = Array.from(fileList || []);
      files.forEach(renderFile);
      if (typeof onFiles === 'function') onFiles(files);
    }

    zone.addEventListener('click', (e) => {
      if (e.target === input) return;
      input.click();
    });
    zone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input.click();
      }
    });
    input.addEventListener('change', () => handleFiles(input.files));

    ['dragenter', 'dragover'].forEach((evt) => {
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        zone.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach((evt) => {
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        zone.classList.remove('is-dragover');
      });
    });
    zone.addEventListener('drop', (e) => {
      if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files);
    });
  }
  window.TM.initUploadZone = initUploadZone;
})();
