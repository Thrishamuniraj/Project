/**
 * BrandCraft Merchandise — pricing.js
 * pages/pricing.html has no fixed price tiers (this is a quote-based B2B
 * business — see section on pricing factors). This file drives the small
 * interactive quantity-impact slider that shows how indicative unit cost
 * trends down as order quantity grows, reusing the same curve as the
 * bulk-order estimator (see bulk-orders.js) for a consistent story.
 */
(function () {
  'use strict';

  var QUANTITY_BREAKS = [
    { max: 25, mult: 1.35, label: '10–25' }, { max: 50, mult: 1.2, label: '26–50' },
    { max: 100, mult: 1.05, label: '51–100' }, { max: 250, mult: 0.95, label: '101–250' },
    { max: 500, mult: 0.85, label: '251–500' }, { max: Infinity, mult: 0.75, label: '500+' }
  ];

  function initSlider() {
    var slider = document.querySelector('[data-pricing-slider]');
    if (!slider) { return; }
    var out = document.querySelector('[data-pricing-slider-output]');
    var barFill = document.querySelector('[data-pricing-bar-fill]');
    var breakLabel = document.querySelector('[data-pricing-break-label]');

    function update() {
      var idx = parseInt(slider.value, 10);
      var tier = QUANTITY_BREAKS[idx];
      var relativeSavings = Math.round((1 - tier.mult / QUANTITY_BREAKS[0].mult) * 100);
      if (out) { out.textContent = tier.label + ' units'; }
      if (breakLabel) { breakLabel.textContent = relativeSavings > 0 ? 'Approx. ' + relativeSavings + '% lower indicative unit cost vs. small-batch pricing' : 'Baseline small-batch pricing'; }
      if (barFill) { barFill.style.width = (100 - relativeSavings) + '%'; }
    }

    slider.setAttribute('max', String(QUANTITY_BREAKS.length - 1));
    slider.addEventListener('input', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', initSlider);
})();
