/* ==========================================================================
   BULK-ORDERS.JS — Bulk order form behavior + logo-availability toggle
   for pages/bulk-orders.html
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-bulk-form]');
    if (!form) return;

    // Selecting "I don't have a logo yet" surfaces a note steering the
    // customer toward the Custom Embroidery / logo digitization service.
    const logoRadios = form.querySelectorAll('input[name="logoAvailable"]');
    const logoNote = document.querySelector('[data-logo-note]');
    logoRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        if (logoNote) logoNote.hidden = radio.value !== 'no' || !radio.checked;
      });
    });

    const uploadZone = document.querySelector('[data-upload-zone]');
    if (uploadZone && window.TM?.initUploadZone) {
      window.TM.initUploadZone(uploadZone, { maxSizeMB: 25 });
    }
  });
})();
