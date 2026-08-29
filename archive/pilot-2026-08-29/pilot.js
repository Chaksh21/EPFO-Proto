/* Header behaviour, copied from how ux4g.gov.in behaves (measured 29 Aug 2026):
   Desktop
   - accessibility bar scrolls away; navbar + nav row stick, full width
   - hovering a menu item opens its panel after ~100 ms; leaving closes at once
   - click / Enter toggles the panel; Esc closes; focus leaving closes
   Phone (< 768 px)
   - nav row hidden; hamburger in the top bar toggles an in-flow accordion
     panel built from the same items; one section open at a time */
(function () {
  'use strict';

  var header = document.querySelector('.ep-header');
  var card = document.querySelector('.ep-navcard');
  if (!header || !card) return;
  header.classList.add('js');

  var phone = window.matchMedia('(max-width: 767px)');
  var chevron = '<svg class="ep-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---- scrolled state ---- */
  var bar = document.querySelector('.ep-bar');
  var barHeight = bar ? bar.offsetHeight : 0;
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > barHeight);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---- text size: A− / A / A+ (bar and its phone clone) ----
     Copied from UX4G's accessibility widget: 0.1 zoom steps, 4 max, reset. */
  var TEXT_MAX = 4;
  var textStep = 0;
  try { textStep = Math.min(TEXT_MAX, Math.max(0, parseInt(localStorage.getItem('ep-text') || '0', 10) || 0)); } catch (e) {}
  function applyText() {
    var root = document.documentElement;
    for (var i = 1; i <= TEXT_MAX; i++) root.classList.toggle('ep-text-' + i, textStep === i);
    document.querySelectorAll('.ep-bar-fontsize button').forEach(function (b) {
      var k = b.getAttribute('data-text');
      b.setAttribute('aria-pressed', String(k === '0' ? textStep === 0 : k === '+' ? textStep > 0 : false));
      b.disabled = (k === '+' && textStep === TEXT_MAX) || (k === '-' && textStep === 0);
    });
    try { localStorage.setItem('ep-text', String(textStep)); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.ep-bar-fontsize button');
    if (!b) return;
    var k = b.getAttribute('data-text');
    textStep = k === '+' ? Math.min(TEXT_MAX, textStep + 1) : k === '-' ? Math.max(0, textStep - 1) : 0;
    applyText();
  });
  applyText();

  /* ---- desktop mega menus ---- */
  var OPEN_DELAY = 100;
  var CLOSE_DELAY = 40;
  var items = Array.prototype.slice.call(card.querySelectorAll('.ep-has-menu'));
  var openItem = null;
  var openTimer = null;
  var closeTimer = null;

  function setOpen(item, open) {
    item.classList.toggle('is-open', open);
    item.querySelector('.ep-navlink').setAttribute('aria-expanded', open ? 'true' : 'false');
    item.querySelector('.ep-mega').hidden = !open;
  }
  function closeAll() {
    if (!openItem) return;
    setOpen(openItem, false);
    openItem = null;
    card.classList.remove('has-active-dropdown');
  }
  function openMenu(item) {
    if (openItem === item) return;
    closeAll();
    setOpen(item, true);
    openItem = item;
    card.classList.add('has-active-dropdown');
  }
  function scheduleOpen(item) {
    if (phone.matches) return;
    clearTimeout(closeTimer);
    clearTimeout(openTimer);
    openTimer = setTimeout(function () { openMenu(item); }, OPEN_DELAY);
  }
  function scheduleClose() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(closeAll, CLOSE_DELAY);
  }

  items.forEach(function (item) {
    var btn = item.querySelector('.ep-navlink');
    item.addEventListener('mouseenter', function () { scheduleOpen(item); });
    item.addEventListener('mouseleave', scheduleClose);
    btn.addEventListener('click', function () {
      clearTimeout(openTimer);
      if (openItem === item) closeAll(); else openMenu(item);
    });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) closeAll();
    });
  });
  Array.prototype.forEach.call(card.querySelectorAll('.ep-navitem:not(.ep-has-menu)'), function (plain) {
    plain.addEventListener('mouseenter', scheduleClose);
  });

  /* ---- phone: hamburger + accordion panel ---- */
  var menuBtn = card.querySelector('.ep-menu-btn');
  var panel = card.querySelector('.ep-mobile');

  function buildMobile() {
    if (!panel || panel.dataset.built) return;
    var frag = document.createDocumentFragment();

    /* search first, as on ux4g.gov.in the search leaves the top bar on phones */
    var search = card.querySelector('.ep-search-form');
    if (search) {
      var s = document.createElement('div');
      s.className = 'ep-mobile-search';
      s.appendChild(search.cloneNode(true));
      frag.appendChild(s);
    }

    Array.prototype.forEach.call(card.querySelectorAll('.ep-navrow .ep-navitem'), function (item, i) {
      var link = item.querySelector('.ep-navlink');
      var label = link.firstChild.textContent.trim();
      var mega = item.querySelector('.ep-mega');
      var section = document.createElement('div');
      section.className = 'ep-mobile-section';

      if (!mega) {
        var a = document.createElement('a');
        a.className = 'ep-mobile-head';
        a.href = link.getAttribute('href') || '#';
        a.textContent = label;
        if (item.getAttribute('aria-current')) a.setAttribute('aria-current', 'page');
        section.appendChild(a);
      } else {
        var head = document.createElement('button');
        head.type = 'button';
        head.className = 'ep-mobile-head';
        head.setAttribute('aria-expanded', 'false');
        head.setAttribute('aria-controls', 'mobile-sec-' + i);
        head.innerHTML = '<span></span>' + chevron;
        head.firstChild.textContent = label;

        var body = document.createElement('div');
        body.className = 'ep-mobile-body';
        body.id = 'mobile-sec-' + i;
        body.hidden = true;

        Array.prototype.forEach.call(mega.querySelectorAll('.ep-mega-item'), function (mi) {
          var a2 = document.createElement('a');
          a2.className = 'ep-mobile-link';
          a2.href = mi.getAttribute('href') || '#';
          var ic = mi.querySelector('.ep-mega-icon .ep-icon');
          if (ic) a2.appendChild(ic.cloneNode(true));
          var t = document.createElement('span');
          t.textContent = mi.querySelector('.ep-mega-title').textContent;
          a2.appendChild(t);
          body.appendChild(a2);
        });
        var more = mega.querySelector('.ep-mega-foot a');
        if (more) {
          var m = more.cloneNode(true);
          m.className = 'ep-mobile-link ep-mobile-more';
          body.appendChild(m);
        }

        head.addEventListener('click', function () {
          var open = head.getAttribute('aria-expanded') === 'true';
          Array.prototype.forEach.call(panel.querySelectorAll('.ep-mobile-head[aria-expanded="true"]'), function (h) {
            h.setAttribute('aria-expanded', 'false');
            document.getElementById(h.getAttribute('aria-controls')).hidden = true;
          });
          if (!open) {
            head.setAttribute('aria-expanded', 'true');
            body.hidden = false;
          }
        });

        section.appendChild(head);
        section.appendChild(body);
      }
      frag.appendChild(section);
    });

    /* accessibility tools: text size + language leave the bar on phones */
    var fontsize = document.querySelector('.ep-bar-fontsize');
    var lang = document.querySelector('.ep-bar-lang');
    if (fontsize || lang) {
      var tools = document.createElement('div');
      tools.className = 'ep-mobile-tools';
      if (fontsize) {
        var row1 = document.createElement('div');
        row1.className = 'ep-mobile-tool';
        var l1 = document.createElement('span'); l1.textContent = 'Text size';
        row1.appendChild(l1);
        row1.appendChild(fontsize.cloneNode(true));
        tools.appendChild(row1);
      }
      if (lang) {
        var row2 = document.createElement('div');
        row2.className = 'ep-mobile-tool';
        var l2 = document.createElement('span'); l2.textContent = 'Language';
        row2.appendChild(l2);
        row2.appendChild(lang.cloneNode(true));
        tools.appendChild(row2);
      }
      frag.appendChild(tools);
    }

    /* account: UAN chip + Logout, hidden from the top bar on phones */
    var uan = card.querySelector('.ep-uan');
    var logout = card.querySelector('.ep-btn-primary');
    if (uan || logout) {
      var acc = document.createElement('div');
      acc.className = 'ep-mobile-account';
      if (uan) acc.appendChild(uan.cloneNode(true));
      if (logout) acc.appendChild(logout.cloneNode(true));
      frag.appendChild(acc);
    }

    panel.appendChild(frag);
    panel.dataset.built = '1';
  }

  function setMobile(open) {
    if (!menuBtn || !panel) return;
    if (open) buildMobile();
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
    header.classList.toggle('menu-open', open);
  }

  if (menuBtn && panel) {
    menuBtn.addEventListener('click', function () {
      setMobile(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
  }

  /* leaving the phone breakpoint closes the panel; entering it closes mega menus */
  function onBreakpoint() {
    if (phone.matches) closeAll(); else setMobile(false);
  }
  if (phone.addEventListener) phone.addEventListener('change', onBreakpoint);
  else phone.addListener(onBreakpoint);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (openItem) {
      var btn = openItem.querySelector('.ep-navlink');
      closeAll();
      btn.focus();
    } else if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') {
      setMobile(false);
      menuBtn.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (openItem && !card.contains(e.target)) closeAll();
  });
})();
