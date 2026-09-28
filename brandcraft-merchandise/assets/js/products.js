/**
 * BrandCraft Merchandise — products.js
 * Product catalogue data + client-side search/filter/render for
 * pages/products.html. No backend — this array is the single source
 * of product data for the catalogue grid.
 *
 * TODO(backend): Replace PRODUCTS with a fetch() to a real product API
 * or CMS feed when one is connected; keep the same field names so the
 * render/filter functions below continue to work unchanged.
 */
(function () {
  'use strict';

  var PRODUCTS = [
    { id: 'p01', name: 'Classic Corporate Polo', category: 'apparel', type: 'polo-shirts', icon: 'icon-polo', material: 'Cotton-Pique', colors: ['#0e2740', '#c9372c', '#ffffff', '#1e9e6b'], branding: ['Embroidery', 'Screen Printing'], useCase: ['Corporate Offices', 'Events & Conferences'], price: 12.5, moq: 25, availability: 'in-stock', desc: 'A breathable pique-cotton polo built for daily wear, with a clean left-chest embroidery zone.', img: 'bc-prod-polo.webp', alt: 'Corporate polo shirts in blue and navy on a retail display rail' },
    { id: 'p02', name: 'Everyday Crew T-Shirt', category: 'apparel', type: 't-shirts', icon: 'icon-tshirt', material: '100% Cotton', colors: ['#0e2740', '#ffffff', '#5b6472', '#ff6a3d'], branding: ['Screen Printing', 'Digital Printing'], useCase: ['Events & Conferences', 'Schools & Universities'], price: 6.9, moq: 25, availability: 'in-stock', desc: 'Soft-hand ringspun cotton tee, a reliable staple for campaigns, teams and giveaways.', img: 'bc-prod-crew-tee.webp', alt: 'Blue crew-neck cotton t-shirt on a hanger' },
    { id: 'p03', name: 'Insulated Executive Tumbler', category: 'drinkware', type: 'tumblers', icon: 'icon-tumbler', material: 'Stainless Steel', colors: ['#0e2740', '#20242b', '#c9372c'], branding: ['Laser Engraving', 'UV Printing'], useCase: ['Corporate Gifting', 'Technology Companies'], price: 14.0, moq: 25, availability: 'in-stock', desc: 'Double-wall vacuum insulation keeps drinks hot or cold for hours — a premium desk companion.', img: 'bc-prod-tumbler.webp', alt: 'Insulated steel tumbler beside a laptop and notebook' },
    { id: 'p04', name: 'Heritage Coffee Mug', category: 'drinkware', type: 'mugs', icon: 'icon-mug', material: 'Ceramic', colors: ['#ffffff', '#0e2740', '#ff6a3d'], branding: ['UV Printing', 'Screen Printing'], useCase: ['Corporate Offices', 'Corporate Gifting'], price: 5.5, moq: 50, availability: 'in-stock', desc: 'A wrap-around ceramic mug with a generous full-color branding surface.', img: 'bc-prod-mug.webp', alt: 'White ceramic coffee mug ready for full-colour branding' },
    { id: 'p05', name: 'Trailblazer Sport Bottle', category: 'drinkware', type: 'bottles', icon: 'icon-bottle', material: 'BPA-Free Plastic', colors: ['#1e9e6b', '#0e2740', '#ffffff'], branding: ['Screen Printing', 'Digital Printing'], useCase: ['Events & Conferences', 'Sports Teams'], price: 4.9, moq: 50, availability: 'in-stock', desc: 'Lightweight, leak-proof bottle sized for gym bags, campus events and trade-show giveaways.', img: 'bc-prod-sport-bottle.webp', alt: 'Sport bottle beside an athlete during an outdoor workout' },
    { id: 'p06', name: 'Logo Power Bank 10,000mAh', category: 'tech', type: 'power-banks', icon: 'icon-powerbank', material: 'Recycled ABS', colors: ['#20242b', '#ffffff'], branding: ['UV Printing', 'Laser Engraving'], useCase: ['Technology Companies', 'Corporate Gifting'], price: 16.0, moq: 25, availability: 'in-stock', desc: 'Dual-port fast-charging power bank with a clean branding panel on the front face.', img: 'bc-prod-power-bank.webp', alt: 'Black power bank and phone accessories on a desk' },
    { id: 'p07', name: 'Rewritable USB Drive 32GB', category: 'tech', type: 'usb-drives', icon: 'icon-usb', material: 'Aluminium', colors: ['#94a0ae', '#0e2740'], branding: ['Laser Engraving', 'UV Printing'], useCase: ['Corporate Offices', 'Marketing Agencies'], price: 8.2, moq: 50, availability: 'in-stock', desc: 'Swivel-cap aluminium USB drive, engraved with a crisp, permanent logo mark.', img: 'bc-prod-usb-drive.webp', alt: 'Slim metal USB drive on a ball chain' },
    { id: 'p08', name: 'Branded Wireless Charger', category: 'tech', type: 'wireless-chargers', icon: 'icon-charger', material: 'ABS + Bamboo', colors: ['#0e2740', '#c9922b'], branding: ['UV Printing'], useCase: ['Technology Companies', 'Corporate Gifting'], price: 13.5, moq: 25, availability: 'in-stock', desc: '10W wireless charging pad with a sustainably-sourced bamboo top for a premium print surface.', img: 'bc-prod-wireless-charger.webp', alt: 'Cork-topped wireless charging pad on a desk' },
    { id: 'p09', name: 'Signal Bluetooth Speaker', category: 'tech', type: 'speakers', icon: 'icon-speaker', material: 'ABS Plastic', colors: ['#0e2740', '#20242b', '#c9372c'], branding: ['UV Printing', 'Laser Engraving'], useCase: ['Marketing Agencies', 'Events & Conferences'], price: 18.9, moq: 25, availability: 'made-to-order', desc: 'Compact 5W speaker with a wraparound branding band, ideal for high-visibility gifting.', img: 'bc-prod-speaker.webp', alt: 'Compact Bluetooth speaker on a wooden shelf' },
    { id: 'p10', name: 'Premium Canvas Tote', category: 'bags', type: 'totes', icon: 'icon-totebag', material: 'Heavy Canvas', colors: ['#f6f7f9', '#0e2740', '#5b6472'], branding: ['Screen Printing', 'Embroidery'], useCase: ['Retail', 'Nonprofits'], price: 5.2, moq: 50, availability: 'in-stock', desc: 'Reinforced-handle canvas tote with a large front panel built for bold branding.', img: 'bc-prod-canvas-tote.webp', alt: 'Canvas tote bag with a reusable bottle and bamboo cutlery' },
    { id: 'p11', name: 'Foundry Zip Hoodie', category: 'apparel', type: 'hoodies', icon: 'icon-hoodie', material: 'Cotton-Poly Fleece', colors: ['#20242b', '#0e2740', '#94a0ae'], branding: ['Embroidery', 'Screen Printing'], useCase: ['Startups', 'Sports Teams'], price: 24.0, moq: 25, availability: 'in-stock', desc: 'Mid-weight fleece zip hoodie for welcome kits and cold-weather event merchandise.', img: 'bc-prod-hoodie.webp', alt: 'Grey marl fleece hoodie' },
    { id: 'p12', name: 'Structured Corporate Cap', category: 'apparel', type: 'caps', icon: 'icon-cap', material: 'Cotton Twill', colors: ['#0e2740', '#ffffff', '#c9372c'], branding: ['Embroidery'], useCase: ['Sports Teams', 'Events & Conferences'], price: 7.5, moq: 50, availability: 'in-stock', desc: 'A structured six-panel cap with a wide front panel for 3D-puff or flat embroidery.', img: 'bc-prod-cap.webp', alt: 'Structured six-panel cap with a patch-ready front panel' },
    { id: 'p13', name: 'Executive Notebook Set', category: 'office', type: 'notebooks', icon: 'icon-notebook', material: 'PU Leatherette', colors: ['#0e2740', '#3a3f48'], branding: ['Laser Engraving', 'UV Printing'], useCase: ['Corporate Gifting', 'Corporate Offices'], price: 9.8, moq: 25, availability: 'in-stock', desc: 'A5 notebook and matching pen set, debossed with your logo on the cover.', img: 'bc-prod-notebook-set.webp', alt: 'Hardcover notebook and pen set on a desk' },
    { id: 'p14', name: 'Precision Metal Pen', category: 'office', type: 'pens', icon: 'icon-pen', material: 'Brushed Metal', colors: ['#94a0ae', '#0e2740', '#c9922b'], branding: ['Laser Engraving'], useCase: ['Corporate Offices', 'Corporate Gifting'], price: 3.1, moq: 100, availability: 'in-stock', desc: 'Weighted metal-barrel pen, engraved for a refined everyday-carry giveaway.', img: 'bc-prod-metal-pen.webp', alt: 'Metal-barrel pen writing in a journal' },
    { id: 'p15', name: 'Insulated Vacuum Flask', category: 'drinkware', type: 'flasks', icon: 'icon-tumbler', material: 'Stainless Steel', colors: ['#0e2740', '#20242b'], branding: ['Laser Engraving'], useCase: ['Corporate Gifting', 'Healthcare Organizations'], price: 15.5, moq: 25, availability: 'made-to-order', desc: 'Slim vacuum flask that holds temperature for 12+ hours — a lasting daily-use gift.', img: 'bc-prod-flask.webp', alt: 'Stainless steel vacuum flask beside a laptop' },
    { id: 'p16', name: 'Field Softshell Jacket', category: 'apparel', type: 'jackets', icon: 'icon-jacket', material: 'Softshell Poly', colors: ['#0e2740', '#20242b'], branding: ['Embroidery'], useCase: ['Corporate Offices', 'Hospitality'], price: 34.0, moq: 25, availability: 'made-to-order', desc: 'Weather-resistant softshell jacket for outdoor teams, field staff and executive gifting.', img: 'bc-prod-softshell.webp', alt: 'Weather-resistant jacket worn on an outdoor trail' },
    { id: 'p17', name: 'EcoFibre Recycled Tote', category: 'eco', type: 'totes', icon: 'icon-totebag', material: 'Recycled rPET', colors: ['#1e9e6b', '#5b6472'], branding: ['Screen Printing'], useCase: ['Nonprofits', 'Retail'], price: 4.4, moq: 50, availability: 'in-stock', desc: 'Made from recycled plastic bottles — a sustainability-forward giveaway option.', img: 'bc-prod-recycled-tote.webp', alt: 'Recycled tote bag hanging on a clothes rail' },
    { id: 'p18', name: 'Bamboo Wireless Earbuds', category: 'eco', type: 'tech-accessories', icon: 'icon-charger', material: 'Bamboo + ABS', colors: ['#c9922b', '#0e2740'], branding: ['UV Printing'], useCase: ['Technology Companies', 'Startups'], price: 21.0, moq: 25, availability: 'made-to-order', desc: 'True-wireless earbuds in a bamboo-finish case, printed with a full-color logo.', img: 'bc-prod-earbuds.webp', alt: 'Wireless earbuds with a charging case' },
    { id: 'p19', name: 'Conference Lanyard & Badge', category: 'event', type: 'lanyards', icon: 'icon-badge', material: 'Polyester', colors: ['#0e2740', '#ff6a3d'], branding: ['Screen Printing', 'Digital Printing'], useCase: ['Events & Conferences', 'Technology Companies'], price: 1.6, moq: 100, availability: 'in-stock', desc: 'Custom-woven lanyard with breakaway clasp and matching printed badge holder.', img: 'bc-prod-lanyard.webp', alt: 'Red event lanyard with a breakaway clasp' },
    { id: 'p20', name: 'Onboarding Welcome Box', category: 'gifts', type: 'gift-sets', icon: 'icon-giftbox', material: 'Kraft Rigid Box', colors: ['#0e2740', '#f6f7f9'], branding: ['Custom Packaging', 'Digital Printing'], useCase: ['Startups', 'Corporate Offices'], price: 28.0, moq: 25, availability: 'made-to-order', desc: 'A curated welcome kit box — notebook, bottle, pen and apparel — branded and boxed.', img: 'bc-prod-welcome-box.webp', alt: 'Kraft welcome box wrapped with twine' },
  ];

  var CATEGORY_LABELS = {
    apparel: 'Apparel', drinkware: 'Drinkware', tech: 'Tech Accessories', bags: 'Bags',
    office: 'Office Essentials', gifts: 'Corporate Gifts', event: 'Event Merchandise', eco: 'Eco Merchandise'
  };

  function currency(n) { return '$' + n.toFixed(2); }

  function swatch(hex) { return '<span class="color-swatch" style="background:' + hex + '"></span>'; }

  var PHOTO_DIR = '../assets/images/photos/';

  function productPhoto(p, eager) {
    return '<img src="' + PHOTO_DIR + p.img + '" alt="' + p.alt + '" width="800" height="600"' +
      (eager ? '' : ' loading="lazy"') + ' decoding="async">';
  }

  function renderCard(p) {
    var badge = p.availability === 'made-to-order'
      ? '<span class="product-badge">Made to Order</span>'
      : '<span class="product-badge badge-accent">In Stock</span>';
    return (
      '<article class="card product-card" data-id="' + p.id + '">' +
        '<div class="product-media has-photo">' + badge + productPhoto(p) + '</div>' +
        '<div class="product-body">' +
          '<span class="product-cat">' + CATEGORY_LABELS[p.category] + '</span>' +
          '<h3>' + p.name + '</h3>' +
          '<p>' + p.desc + '</p>' +
          '<div class="product-meta">' +
            '<span>' + p.material + '</span>' +
            '<span>MOQ ' + p.moq + '</span>' +
            '<span>' + p.branding.join(' / ') + '</span>' +
          '</div>' +
          '<div class="color-swatch-row" aria-label="Available colors">' + p.colors.map(swatch).join('') + '</div>' +
          '<div class="product-price">' + currency(p.price) + ' <small>per unit, from</small></div>' +
        '</div>' +
        '<div class="product-actions">' +
          '<a class="btn btn-outline btn-sm" href="product-details.html?id=' + p.id + '">View Details</a>' +
          '<a class="btn btn-accent btn-sm" href="contact.html?product=' + encodeURIComponent(p.name) + '">Request Quote</a>' +
        '</div>' +
      '</article>'
    );
  }

  function readFilters(form) {
    var f = { categories: [], branding: [], useCase: [], search: '', price: 'all', availability: [] };
    form.querySelectorAll('[data-filter="category"]:checked').forEach(function (i) { f.categories.push(i.value); });
    form.querySelectorAll('[data-filter="branding"]:checked').forEach(function (i) { f.branding.push(i.value); });
    form.querySelectorAll('[data-filter="usecase"]:checked').forEach(function (i) { f.useCase.push(i.value); });
    form.querySelectorAll('[data-filter="availability"]:checked').forEach(function (i) { f.availability.push(i.value); });
    var priceEl = form.querySelector('[data-filter="price"]:checked');
    if (priceEl) { f.price = priceEl.value; }
    var searchEl = document.querySelector('[data-product-search]');
    if (searchEl) { f.search = searchEl.value.trim().toLowerCase(); }
    return f;
  }

  function matchesPrice(price, range) {
    if (range === 'all') { return true; }
    if (range === 'under10') { return price < 10; }
    if (range === '10to20') { return price >= 10 && price <= 20; }
    if (range === 'over20') { return price > 20; }
    return true;
  }

  function applyFilters() {
    var form = document.querySelector('[data-filters-form]');
    var grid = document.querySelector('[data-product-grid]');
    var countEl = document.querySelector('[data-results-count]');
    var emptyEl = document.querySelector('[data-empty-state]');
    if (!form || !grid) { return; }

    var f = readFilters(form);
    var results = PRODUCTS.filter(function (p) {
      if (f.categories.length && f.categories.indexOf(p.category) === -1) { return false; }
      if (f.branding.length && !f.branding.some(function (b) { return p.branding.indexOf(b) !== -1; })) { return false; }
      if (f.useCase.length && !f.useCase.some(function (u) { return p.useCase.indexOf(u) !== -1; })) { return false; }
      if (f.availability.length && f.availability.indexOf(p.availability) === -1) { return false; }
      if (!matchesPrice(p.price, f.price)) { return false; }
      if (f.search && (p.name + ' ' + p.desc + ' ' + p.type).toLowerCase().indexOf(f.search) === -1) { return false; }
      return true;
    });

    grid.innerHTML = results.map(renderCard).join('');
    if (countEl) { countEl.textContent = results.length + (results.length === 1 ? ' product' : ' products'); }
    if (emptyEl) { emptyEl.hidden = results.length !== 0; }
    grid.hidden = results.length === 0;

    renderActiveChips(f);
  }

  function renderActiveChips(f) {
    var wrap = document.querySelector('[data-active-filters]');
    if (!wrap) { return; }
    var chips = [].concat(
      f.categories.map(function (c) { return { label: CATEGORY_LABELS[c] || c, group: 'category', value: c }; }),
      f.branding.map(function (b) { return { label: b, group: 'branding', value: b }; }),
      f.useCase.map(function (u) { return { label: u, group: 'usecase', value: u }; }),
      f.availability.map(function (a) { return { label: a === 'in-stock' ? 'In Stock' : 'Made to Order', group: 'availability', value: a }; })
    );
    wrap.innerHTML = chips.map(function (c) {
      return '<span class="active-filter-chip" data-chip-group="' + c.group + '" data-chip-value="' + c.value + '">' + c.label +
        '<button type="button" aria-label="Remove ' + c.label + ' filter"><svg class="icon" viewBox="0 0 24 24"><use href="#icon-close"></use></svg></button></span>';
    }).join('');
    wrap.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chip = btn.closest('.active-filter-chip');
        var group = chip.getAttribute('data-chip-group');
        var value = chip.getAttribute('data-chip-value');
        var selector = group === 'category' ? 'category' : group === 'branding' ? 'branding' : group === 'usecase' ? 'usecase' : 'availability';
        var input = document.querySelector('[data-filter="' + selector + '"][value="' + value + '"]');
        if (input) { input.checked = false; }
        applyFilters();
      });
    });
  }

  function initProductsPage() {
    var form = document.querySelector('[data-filters-form]');
    if (!form) { return; }

    var params = new URLSearchParams(window.location.search);
    var presetCategory = params.get('category');
    if (presetCategory) {
      var presetInput = form.querySelector('[data-filter="category"][value="' + presetCategory + '"]');
      if (presetInput) { presetInput.checked = true; }
    }

    form.addEventListener('change', applyFilters);
    var searchEl = document.querySelector('[data-product-search]');
    if (searchEl) { searchEl.addEventListener('input', applyFilters); }
    var clearBtn = document.querySelector('[data-clear-filters]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        form.reset();
        if (searchEl) { searchEl.value = ''; }
        applyFilters();
      });
    }
    applyFilters();
  }

  function initProductDetails() {
    var mount = document.querySelector('[data-product-details]');
    if (!mount) { return; }
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || PRODUCTS[0].id;
    var product = PRODUCTS.filter(function (p) { return p.id === id; })[0] || PRODUCTS[0];

    document.title = product.name + ' — BrandCraft Merchandise';
    document.querySelectorAll('[data-pd-title]').forEach(function (el) { el.textContent = product.name; });
    var catEl = document.querySelector('[data-pd-category]');
    if (catEl) { catEl.textContent = CATEGORY_LABELS[product.category]; }
    var descEl = document.querySelector('[data-pd-desc]');
    if (descEl) { descEl.textContent = product.desc; }
    var materialEl = document.querySelector('[data-pd-material]');
    if (materialEl) { materialEl.textContent = product.material; }
    var moqEl = document.querySelector('[data-pd-moq]');
    if (moqEl) { moqEl.textContent = product.moq + ' units'; }
    var brandingEl = document.querySelector('[data-pd-branding]');
    if (brandingEl) { brandingEl.textContent = product.branding.join(', '); }
    var priceEl = document.querySelector('[data-pd-price]');
    if (priceEl) { priceEl.textContent = currency(product.price) + ' per unit'; }
    var mediaEl = document.querySelector('[data-pd-icon]');
    if (mediaEl) {
      mediaEl.classList.add('has-photo');
      mediaEl.innerHTML = productPhoto(product, true);
    }
    var colorsEl = document.querySelector('[data-pd-colors]');
    if (colorsEl) { colorsEl.innerHTML = product.colors.map(swatch).join(''); }
    var quoteLink = document.querySelector('[data-pd-quote-link]');
    if (quoteLink) { quoteLink.href = 'contact.html?product=' + encodeURIComponent(product.name); }

    var relatedEl = document.querySelector('[data-pd-related]');
    if (relatedEl) {
      var related = PRODUCTS.filter(function (p) { return p.category === product.category && p.id !== product.id; }).slice(0, 3);
      relatedEl.innerHTML = related.map(renderCard).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initProductsPage();
    initProductDetails();

    /* Popular products preview on homepage, if present */
    var homeGrid = document.querySelector('[data-popular-products]');
    if (homeGrid) {
      // A page can choose its own line-up: <div data-popular-products="p11,p16,...">
      var custom = (homeGrid.getAttribute('data-popular-products') || '').split(',').filter(Boolean);
      var featuredIds = custom.length ? custom : ['p01', 'p03', 'p10', 'p06', 'p02', 'p08'];
      var featured = featuredIds.map(function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean);
      homeGrid.innerHTML = featured.map(renderCard).join('');
    }
  });

  window.BCM = window.BCM || {};
  window.BCM.PRODUCTS = PRODUCTS;
})();
