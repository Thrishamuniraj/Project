/**
 * BrandCraft Merchandise — bulk-orders.js
 * Client-side indicative estimator for pages/bulk-orders.html.
 * All figures are illustrative only — see the disclaimer rendered
 * alongside the result. No real pricing engine or backend is wired up.
 *
 * TODO(backend): Replace BASE_UNIT_COST / multipliers with real rate
 * cards from the pricing/ERP system once available.
 */
(function () {
  'use strict';

  var BASE_UNIT_COST = {
    apparel: 6.5, drinkware: 5.5, tech: 12, bags: 4.5, office: 4, gifts: 15, event: 2, eco: 6
  };
  var BRANDING_COST = {
    'screen-printing': 0.9, 'embroidery': 1.6, 'digital-printing': 1.1, 'uv-printing': 1.3,
    'laser-engraving': 1.4, 'heat-transfer': 1.0, 'custom-packaging': 2.2
  };
  var QUANTITY_BREAKS = [
    { max: 25, mult: 1.35 }, { max: 50, mult: 1.2 }, { max: 100, mult: 1.05 },
    { max: 250, mult: 0.95 }, { max: 500, mult: 0.85 }, { max: Infinity, mult: 0.75 }
  ];

  function quantityMultiplier(qty) {
    for (var i = 0; i < QUANTITY_BREAKS.length; i++) {
      if (qty <= QUANTITY_BREAKS[i].max) { return QUANTITY_BREAKS[i].mult; }
    }
    return 0.75;
  }

  function estimate(inputs) {
    var base = BASE_UNIT_COST[inputs.category] || 6;
    var brandingUnit = (BRANDING_COST[inputs.branding] || 1) * inputs.locations;
    var colorAdj = Math.max(0, inputs.colors - 1) * 0.35;
    var packagingAdj = inputs.packaging ? 1.1 : 0;
    var rushAdj = inputs.rush ? base * 0.15 : 0;
    var mult = quantityMultiplier(inputs.qty);

    var unitCost = (base + brandingUnit + colorAdj + packagingAdj + rushAdj) * mult;
    var total = unitCost * inputs.qty;

    var prodDays = 10;
    if (inputs.qty > 500) { prodDays = 22; }
    else if (inputs.qty > 250) { prodDays = 18; }
    else if (inputs.qty > 100) { prodDays = 14; }
    else if (inputs.qty > 50) { prodDays = 12; }
    if (inputs.rush) { prodDays = Math.max(5, Math.round(prodDays * 0.6)); }

    return { unitCost: unitCost, total: total, prodDays: prodDays };
  }

  function readInputs(form) {
    return {
      category: form.querySelector('[name="est-category"]').value,
      qty: Math.max(10, parseInt(form.querySelector('[name="est-quantity"]').value || '10', 10)),
      branding: form.querySelector('[name="est-branding"]').value,
      locations: parseInt(form.querySelector('[name="est-locations"]').value || '1', 10),
      colors: parseInt(form.querySelector('[name="est-colors"]').value || '1', 10),
      packaging: form.querySelector('[name="est-packaging"]').checked,
      rush: form.querySelector('[name="est-rush"]').checked
    };
  }

  function formatCurrency(n) { return '$' + n.toFixed(2); }

  function initEstimator() {
    var form = document.querySelector('[data-estimator-form]');
    if (!form) { return; }
    var unitOut = form.querySelector('[data-est-unit]');
    var totalOut = form.querySelector('[data-est-total]');
    var timeOut = form.querySelector('[data-est-time]');
    var qtyLabel = form.querySelector('[data-est-qty-label]');

    function update() {
      var inputs = readInputs(form);
      var result = estimate(inputs);
      if (unitOut) { unitOut.textContent = formatCurrency(result.unitCost); }
      if (totalOut) { totalOut.textContent = formatCurrency(result.total); }
      if (timeOut) { timeOut.textContent = result.prodDays + ' business days'; }
      if (qtyLabel) { qtyLabel.textContent = inputs.qty.toLocaleString(); }
    }

    form.addEventListener('input', update);
    form.addEventListener('change', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', initEstimator);
})();
