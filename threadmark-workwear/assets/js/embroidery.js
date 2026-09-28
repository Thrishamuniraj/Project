/* ==========================================================================
   EMBROIDERY.JS — Custom embroidery request workflow
   Garment -> Quantity -> Logo upload -> Placement -> Thread -> Review
   Drives the step progress UI and upload zone on pages/custom-embroidery.html
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-embroidery-form]');
    if (!form) return;

    /* Step progress indicator: purely visual, reflects furthest field
       group the visitor has interacted with so the "workflow" feels real
       without gating the (single-page) form behind hard steps. */
    const steps = Array.from(document.querySelectorAll('[data-embroidery-step]'));
    const groups = Array.from(form.querySelectorAll('[data-step-group]'));

    function markStepComplete(index) {
      steps.forEach((step, i) => {
        step.classList.toggle('is-complete', i < index);
        step.classList.toggle('is-active', i === index);
        step.setAttribute('aria-current', i === index ? 'step' : 'false');
      });
    }

    groups.forEach((group, index) => {
      group.addEventListener('focusin', () => markStepComplete(index));
    });
    if (steps.length) markStepComplete(0);

    /* Placement diagram selection */
    document.querySelectorAll('.placement-option input').forEach((input) => {
      input.addEventListener('change', () => {
        document.querySelectorAll('.placement-option').forEach((opt) => opt.classList.remove('is-selected'));
        if (input.checked) input.closest('.placement-option')?.classList.add('is-selected');
      });
    });

    /* Upload zone */
    const uploadZone = document.querySelector('[data-upload-zone]');
    if (uploadZone && window.TM?.initUploadZone) {
      window.TM.initUploadZone(uploadZone, {
        maxSizeMB: 25,
        onFiles: (files) => {
          const hasFile = document.querySelectorAll('#embroideryUploadList .upload-item').length > 0;
          window.TM.setFieldError(uploadZone.querySelector('input[type="file"]'), hasFile ? '' : '');
          if (files.length && steps.length) markStepComplete(2);
        },
      });
    }

    /* Custom submit: validate every field AND upload presence together so
       the visitor sees every outstanding issue at once, then defer to the
       shared submitForm for the actual (simulated) send. */
    form.setAttribute('data-custom-submit', 'true');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = form.querySelectorAll('.input, select.select, textarea.input');
      let fieldsValid = true;
      fields.forEach((f) => { if (!window.TM.validateField(f)) fieldsValid = false; });

      const uploadList = document.getElementById('embroideryUploadList');
      const uploadHint = document.querySelector('[data-upload-error]');
      const hasFile = uploadList && uploadList.querySelectorAll('.upload-item').length > 0;
      if (uploadHint) uploadHint.hidden = hasFile;

      if (!fieldsValid || !hasFile) {
        const firstError = form.querySelector('.has-error .input, .has-error .select, .has-error textarea') || (!hasFile ? uploadZone : null);
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      window.TM.submitForm(form, {
        onSuccess: () => markStepComplete(steps.length),
      });
    });
  });
})();
