/**
 * BrandCraft Merchandise — branding.js
 * Powers pages/custom-branding.html: the interactive workflow stepper
 * and the logo placement visualizer. File upload + form validation are
 * handled generically by forms.js.
 */
(function () {
  'use strict';

  var WORKFLOW_STEPS = [
    { title: 'Choose Product', detail: 'Pick any item from our apparel, drinkware, tech or gifting range — or send us something new to source.' },
    { title: 'Upload Logo', detail: 'Drop in a vector file (AI, EPS, SVG) or a high-resolution PNG/JPG/PDF. Our artwork team checks it for print readiness.' },
    { title: 'Select Branding Method', detail: 'We recommend the best method — embroidery, screen printing, UV, laser engraving or heat transfer — for your product and budget.' },
    { title: 'Choose Placement', detail: 'Use the visualizer to confirm exactly where your logo sits: left chest, wrap-around, front centre and more.' },
    { title: 'Confirm Quantity', detail: 'Tell us how many units you need. Bulk pricing kicks in automatically as quantity increases.' },
    { title: 'Review Proof', detail: 'We send a digital or physical proof for sign-off before anything goes into production.' },
    { title: 'Approve Production', detail: 'Once you approve the proof, your order is locked into the production schedule.' },
    { title: 'Delivery', detail: 'Finished merchandise is quality-checked, packed and shipped to one or multiple delivery addresses.' }
  ];

  var PLACEMENTS = {
    tshirt: [
      { id: 'left-chest', label: 'Left Chest', x: '38%', y: '32%' },
      { id: 'right-chest', label: 'Right Chest', x: '60%', y: '32%' },
      { id: 'front-center', label: 'Front Center', x: '50%', y: '48%' },
      { id: 'back', label: 'Back', x: '50%', y: '20%' },
      { id: 'sleeve', label: 'Sleeve', x: '78%', y: '38%' }
    ],
    mug: [
      { id: 'front', label: 'Front', x: '42%', y: '50%' },
      { id: 'wrap', label: 'Wrap Around', x: '65%', y: '50%' }
    ],
    bottle: [
      { id: 'front', label: 'Front', x: '50%', y: '45%' },
      { id: 'vertical', label: 'Vertical', x: '50%', y: '60%' },
      { id: 'full-wrap', label: 'Full Wrap', x: '50%', y: '30%' }
    ],
    tech: [
      { id: 'front', label: 'Front', x: '50%', y: '40%' },
      { id: 'back', label: 'Back', x: '50%', y: '65%' },
      { id: 'center', label: 'Center', x: '50%', y: '50%' }
    ]
  };

  function initWorkflow() {
    var wrap = document.querySelector('[data-workflow]');
    if (!wrap) { return; }
    var list = wrap.querySelector('[data-workflow-list]');
    var detail = wrap.querySelector('[data-workflow-detail]');
    if (!list || !detail) { return; }

    list.innerHTML = WORKFLOW_STEPS.map(function (step, i) {
      return '<button type="button" class="workflow-step-btn" role="tab" aria-selected="' + (i === 0) + '" data-step="' + i + '">' +
        '<span class="step-circle">' + (i + 1) + '</span>' +
        '<span><strong>STEP 0' + (i + 1) + ' — ' + step.title + '</strong><span>' + step.detail.slice(0, 46) + '…</span></span>' +
        '</button>';
    }).join('');

    function select(i) {
      list.querySelectorAll('.workflow-step-btn').forEach(function (btn, idx) {
        btn.setAttribute('aria-selected', String(idx === i));
      });
      var step = WORKFLOW_STEPS[i];
      detail.innerHTML = '<span class="eyebrow">Step 0' + (i + 1) + ' of 08</span><h3>' + step.title + '</h3><p>' + step.detail + '</p>';
    }
    list.querySelectorAll('.workflow-step-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { select(parseInt(btn.getAttribute('data-step'), 10)); });
    });
    select(0);
  }

  function initVisualizer() {
    var wrap = document.querySelector('[data-visualizer]');
    if (!wrap) { return; }
    var stage = wrap.querySelector('[data-visualizer-stage]');
    var optionsList = wrap.querySelector('[data-placement-options]');
    var productTabs = wrap.querySelectorAll('[data-visualizer-product]');
    var selectedLabel = wrap.querySelector('[data-placement-selected]');

    function render(productKey) {
      var placements = PLACEMENTS[productKey] || [];
      stage.querySelectorAll('.placement-dot').forEach(function (d) { d.remove(); });
      placements.forEach(function (pl, idx) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'placement-dot' + (idx === 0 ? ' is-active' : '');
        dot.style.left = pl.x;
        dot.style.top = pl.y;
        dot.setAttribute('aria-label', pl.label);
        dot.setAttribute('data-placement-id', pl.id);
        stage.appendChild(dot);
      });
      optionsList.innerHTML = placements.map(function (pl, idx) {
        return '<button type="button" class="placement-option" aria-pressed="' + (idx === 0) + '" data-placement-id="' + pl.id + '">' + pl.label +
          '<svg class="icon" style="width:18px;height:18px;" viewBox="0 0 24 24"><use href="#icon-check-circle"></use></svg></button>';
      }).join('');
      if (selectedLabel) { selectedLabel.textContent = placements[0] ? placements[0].label : ''; }
      bindSelection(placements);
    }

    function bindSelection(placements) {
      function setActive(id) {
        stage.querySelectorAll('.placement-dot').forEach(function (d) { d.classList.toggle('is-active', d.getAttribute('data-placement-id') === id); });
        optionsList.querySelectorAll('.placement-option').forEach(function (o) { o.setAttribute('aria-pressed', String(o.getAttribute('data-placement-id') === id)); });
        var pl = placements.filter(function (p) { return p.id === id; })[0];
        if (selectedLabel && pl) { selectedLabel.textContent = pl.label; }
      }
      stage.querySelectorAll('.placement-dot').forEach(function (dot) {
        dot.addEventListener('click', function () { setActive(dot.getAttribute('data-placement-id')); });
      });
      optionsList.querySelectorAll('.placement-option').forEach(function (opt) {
        opt.addEventListener('click', function () { setActive(opt.getAttribute('data-placement-id')); });
        opt.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(opt.getAttribute('data-placement-id')); }
        });
      });
    }

    productTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        productTabs.forEach(function (t) { t.setAttribute('aria-pressed', 'false'); });
        tab.setAttribute('aria-pressed', 'true');
        render(tab.getAttribute('data-visualizer-product'));
      });
    });

    render('tshirt');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initWorkflow();
    initVisualizer();
  });
})();
