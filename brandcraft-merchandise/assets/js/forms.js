/**
 * BrandCraft Merchandise — forms.js
 * Shared client-side validation + submission handling for every form
 * on the site (quote requests, bulk orders, custom branding, contact).
 *
 * TODO(backend): Replace the simulated submission in `fakeSubmit()` with
 * a real endpoint — e.g. a Formspree endpoint (https://formspree.io/f/XXXXX)
 * or a Netlify Forms `data-netlify="true"` attribute + redirect handling.
 * Newsletter (footer `.footer-newsletter`, Mailchimp / ConvertKit ready): post the email to
 *   Mailchimp  https://YOUR_DC.list-manage.com/subscribe/post?u=YOUR_U&id=YOUR_LIST_ID  (field name EMAIL)
 *   ConvertKit https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions            (field name email_address)
 * No backend exists in this template, so submissions are not persisted.
 */
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var DEMO_NOTE = '(Demo mode — nothing was sent.)';
  var PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
  var MAX_FILE_MB = 15;
  var ACCEPTED_TYPES = ['.png', '.jpg', '.jpeg', '.pdf', '.svg', '.ai', '.eps'];

  function setFieldError(field, message) {
    field.classList.add('has-error');
    field.classList.remove('has-success');
    var err = field.querySelector('.field-error');
    if (err) { err.textContent = message; }
  }
  function setFieldSuccess(field) {
    field.classList.remove('has-error');
    field.classList.add('has-success');
  }
  function clearFieldState(field) {
    field.classList.remove('has-error', 'has-success');
  }

  // Inputs without a .form-field wrapper (footer newsletter, blog CTA, coming-soon notify) used to
  // pass unchecked, so an empty or malformed email still "submitted". Check them directly.
  function validateBareInput(input) {
    var value = (input.value || '').trim();
    var ok = !(input.hasAttribute('required') && !value) && !(value && input.type === 'email' && !EMAIL_RE.test(value));
    if (ok) { input.removeAttribute('aria-invalid'); } else { input.setAttribute('aria-invalid', 'true'); }
    return ok;
  }

  function validateInput(input) {
    var field = input.closest('.form-field');
    if (!field) { return validateBareInput(input); }
    var value = (input.value || '').trim();
    var required = input.hasAttribute('required');

    if (!value) {
      if (required) { setFieldError(field, 'This field is required.'); return false; }
      clearFieldState(field);
      return true;
    }

    if (input.type === 'email' && !EMAIL_RE.test(value)) {
      setFieldError(field, 'Enter a valid email address.'); return false;
    }
    if (input.type === 'tel' && !PHONE_RE.test(value)) {
      setFieldError(field, 'Enter a valid phone number.'); return false;
    }
    if (input.type === 'date') {
      var chosen = new Date(value);
      var today = new Date(); today.setHours(0, 0, 0, 0);
      if (isNaN(chosen.getTime()) || chosen < today) {
        setFieldError(field, 'Choose a valid date, today or later.'); return false;
      }
    }
    if (input.hasAttribute('data-quantity')) {
      var num = parseInt(value, 10);
      if (isNaN(num) || num < 1) { setFieldError(field, 'Enter a valid quantity.'); return false; }
    }

    setFieldSuccess(field);
    return true;
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      if (input.type === 'file' || input.type === 'checkbox' || input.type === 'radio' || input.type === 'hidden') { return; }
      if (!validateInput(input)) { valid = false; }
    });
    form.querySelectorAll('[data-require-file]').forEach(function (uploadArea) {
      var listEl = uploadArea.parentElement.querySelector('.upload-list');
      var hasFile = listEl && listEl.children.length > 0;
      var wrap = uploadArea.closest('.form-field') || uploadArea;
      if (!hasFile) {
        wrap.classList.add('has-error');
        valid = false;
      } else {
        wrap.classList.remove('has-error');
      }
    });
    return valid;
  }

  function showStatus(form, type, message) {
    var status = form.querySelector('.form-status');
    if (!status) { return; }
    status.className = 'form-status is-visible status-' + type;
    status.innerHTML = '<span>' + message + '</span>';
    status.setAttribute('role', type === 'error' ? 'alert' : 'status');
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function fakeSubmit(form) {
    // TODO(backend): swap this timeout for a real fetch() to Formspree/Netlify.
    return new Promise(function (resolve) {
      window.setTimeout(resolve, 1100);
    });
  }

  function initForm(form) {
    form.setAttribute('novalidate', 'novalidate');

    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { validateInput(input); });
      input.addEventListener('input', function () {
        var field = input.closest('.form-field');
        if (field && field.classList.contains('has-error')) { validateInput(input); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = validateForm(form);
      if (!ok) {
        showStatus(form, 'error', 'Please review the highlighted fields and try again.');
        if (!form.querySelector('.form-status') && window.BCM && window.BCM.toast) {
          window.BCM.toast('Please review the highlighted fields and try again.', 'error');
        }
        var firstError = form.querySelector('.has-error, [aria-invalid="true"]');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (firstError.matches('input, select, textarea')) { firstError.focus(); }
        }
        return;
      }
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.classList.add('is-loading'); submitBtn.disabled = true; }

      fakeSubmit(form).then(function () {
        if (submitBtn) { submitBtn.classList.remove('is-loading'); submitBtn.disabled = false; }
        var successMsg = form.getAttribute('data-success-message') ||
          'Thanks! Your quotation request has been received. Our team will review your requirements and contact you shortly.';
        // fakeSubmit() sends nothing, so say so (login/register messages already do) — remove once a real endpoint is wired up.
        if (!/demo/i.test(successMsg)) { successMsg += ' ' + DEMO_NOTE; }
        showStatus(form, 'success', successMsg);
        if (window.BCM && window.BCM.toast) { window.BCM.toast('Request submitted successfully. ' + DEMO_NOTE, 'success'); }
        form.reset();
        form.querySelectorAll('.form-field').forEach(clearFieldState);
        form.querySelectorAll('.upload-list').forEach(function (list) { list.innerHTML = ''; });
      });
    });
  }

  /* ---------- File upload (drag & drop) ---------- */
  function formatSize(bytes) {
    if (bytes < 1024) { return bytes + ' B'; }
    if (bytes < 1024 * 1024) { return (bytes / 1024).toFixed(1) + ' KB'; }
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function validateFile(file) {
    var ext = '.' + file.name.split('.').pop().toLowerCase();
    if (ACCEPTED_TYPES.indexOf(ext) === -1) {
      return 'Unsupported file type. Accepted: ' + ACCEPTED_TYPES.join(', ');
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      return 'File exceeds the ' + MAX_FILE_MB + 'MB limit.';
    }
    return null;
  }

  function addFileToList(uploadArea, file) {
    var listEl = uploadArea.parentElement.querySelector('.upload-list');
    if (!listEl) { return; }
    var error = validateFile(file);
    var item = document.createElement('div');
    item.className = 'upload-item' + (error ? ' is-error' : '');
    item.innerHTML =
      '<span class="upload-icon">' +
      '<svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>' +
      '</span>' +
      '<span style="flex:1;min-width:0;">' +
      '<span class="upload-item-name">' + file.name + '</span><br>' +
      (error
        ? '<span class="field-error-inline">' + error + '</span>'
        : '<span class="upload-item-size">' + formatSize(file.size) + '</span><span class="upload-progress"><span class="upload-progress-bar"></span></span>') +
      '</span>' +
      '<button type="button" class="upload-remove" aria-label="Remove ' + file.name + '">' +
      '<svg class="icon" style="width:16px;height:16px;" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    listEl.appendChild(item);

    item.querySelector('.upload-remove').addEventListener('click', function () { item.remove(); });

    if (!error) {
      var bar = item.querySelector('.upload-progress-bar');
      var pct = 0;
      var timer = window.setInterval(function () {
        pct += 20;
        if (bar) { bar.style.width = Math.min(pct, 100) + '%'; }
        if (pct >= 100) { window.clearInterval(timer); }
      }, 90);
    }
  }

  function initUploadArea(uploadArea) {
    var input = uploadArea.querySelector('input[type="file"]');
    var browseTrigger = uploadArea.querySelector('.upload-browse');
    if (browseTrigger && input) {
      browseTrigger.addEventListener('click', function () { input.click(); });
    }
    if (input) {
      input.addEventListener('change', function () {
        Array.prototype.forEach.call(input.files, function (file) { addFileToList(uploadArea, file); });
        input.value = '';
      });
    }
    ['dragenter', 'dragover'].forEach(function (evt) {
      uploadArea.addEventListener(evt, function (e) {
        e.preventDefault(); e.stopPropagation();
        uploadArea.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach(function (evt) {
      uploadArea.addEventListener(evt, function (e) {
        e.preventDefault(); e.stopPropagation();
        uploadArea.classList.remove('is-dragover');
      });
    });
    uploadArea.addEventListener('drop', function (e) {
      var files = e.dataTransfer ? e.dataTransfer.files : [];
      Array.prototype.forEach.call(files, function (file) { addFileToList(uploadArea, file); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[data-validate]').forEach(initForm);
    document.querySelectorAll('.upload-area').forEach(initUploadArea);
  });
})();
