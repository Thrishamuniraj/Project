/* ==========================================================================
   PRICING.JS — Interactive bulk-order estimator for pages/pricing.html
   Estimate only: unit cost, total, and production time. Not a binding quote.
   ========================================================================== */
(function () {
  'use strict';

  // Base unit price per garment type (USD), before embroidery + quantity adjustments
  const GARMENT_BASE = {
    'polo': 14,
    'work-shirt': 18,
    'jacket': 38,
    'softshell': 52,
    'scrub-set': 24,
    'hi-vis': 30,
    'fleece': 26,
  };

  // Quantity break multipliers (higher volume = lower per-unit cost)
  function quantityMultiplier(qty) {
    if (qty >= 500) return 0.72;
    if (qty >= 250) return 0.8;
    if (qty >= 100) return 0.88;
    if (qty >= 50) return 0.94;
    return 1;
  }

  function embroideryCost(locations, colors) {
    const perLocation = 4.5;
    const perColorAfterFirst = 0.6;
    return locations * perLocation + locations * Math.max(0, colors - 1) * perColorAfterFirst;
  }

  function productionDays(qty, locations) {
    const base = 7;
    const qtyFactor = Math.ceil(qty / 150);
    const embroideryFactor = locations > 1 ? 2 : 0;
    return base + qtyFactor + embroideryFactor;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const calc = document.querySelector('[data-pricing-calculator]');
    if (!calc) return;

    const garmentSelect = calc.querySelector('[name="garmentType"]');
    const qtyInput = calc.querySelector('[name="estQuantity"]');
    const locationsSelect = calc.querySelector('[name="embroideryLocations"]');
    const colorsSelect = calc.querySelector('[name="threadColors"]');

    const unitOut = calc.querySelector('[data-result-unit]');
    const totalOut = calc.querySelector('[data-result-total]');
    const timeOut = calc.querySelector('[data-result-time]');

    function calculate() {
      const garment = garmentSelect?.value || 'polo';
      const qty = Math.max(10, Number(qtyInput?.value) || 10);
      const locations = Number(locationsSelect?.value) || 1;
      const colors = Number(colorsSelect?.value) || 1;

      const base = GARMENT_BASE[garment] ?? 16;
      const mult = quantityMultiplier(qty);
      const embroidery = embroideryCost(locations, colors);
      const unit = base * mult + embroidery;
      const total = unit * qty;
      const days = productionDays(qty, locations);

      if (unitOut) unitOut.textContent = '$' + unit.toFixed(2);
      if (totalOut) totalOut.textContent = '$' + total.toLocaleString(undefined, { maximumFractionDigits: 0 });
      if (timeOut) timeOut.textContent = `${days}–${days + 3} business days`;
    }

    [garmentSelect, qtyInput, locationsSelect, colorsSelect].forEach((el) => {
      if (el) el.addEventListener('input', calculate);
    });

    calculate();
  });
})();
