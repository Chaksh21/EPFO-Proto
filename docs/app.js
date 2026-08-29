/* Hash router: one index.html, page bodies in <template>s (decision 29 Aug 2026).
   #/login (default), later #/dashboard, #/passbook, #/consent, #/redirect, #/portal.
   Guest pages add body.is-guest, which hides the signed-in header parts. */
(function () {
  'use strict';
  var app = document.getElementById('app');
  if (!app) return;
  var GUEST = { login: true };
  /* Demo sign-in. Mock data only (AGENTS.md): UAN 1000 2233 4455, password Demo@2026. */
  var DEMO = { uan: '100022334455', password: 'Demo@2026' };
  var reduced = function () { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; };
  var authed = function () { try { return sessionStorage.getItem('ep-auth') === '1'; } catch (e) { return false; } };
  var setAuth = function (on) { try { on ? sessionStorage.setItem('ep-auth', '1') : sessionStorage.removeItem('ep-auth'); } catch (e) {} };
  var NAV = { dashboard: 'Home', passbook: 'View', consent: 'View', redirect: 'View', portal: 'View' };
  var BRAND = { portal: 'Passbook Portal' };   /* owner: the portal frame is branded "Passbook Portal" */
  var brandFull = document.querySelector('.ep-brand-full'), brandShort = document.querySelector('.ep-brand-short');
  var brandDefault = brandFull ? brandFull.textContent : '', brandShortDefault = brandShort ? brandShort.textContent : '';   /* which top-level item is current per page */
  function route() {
    var parts = (location.hash.replace(/^#\/?/, '') || 'login').split('/');
    var name = parts[0], sub = parts[1] || '';
    var tpl = document.getElementById('page-' + name) || document.getElementById('page-login');
    name = tpl.id.replace('page-', '');
    if (!GUEST[name] && !authed()) { location.replace('#/login'); return; }   /* signed-in pages need the demo session */
    document.body.classList.toggle('is-guest', !!GUEST[name]);
    document.body.setAttribute('data-page', name);
    if (brandFull) brandFull.textContent = BRAND[name] || brandDefault;
    if (brandShort) brandShort.textContent = BRAND[name] ? 'Passbook' : brandShortDefault;
    document.querySelectorAll('.ep-navitem').forEach(function (li) {
      var label = (li.querySelector('.ep-navlink') || {}).textContent || '';
      if (NAV[name] && label.trim().indexOf(NAV[name]) === 0) li.setAttribute('aria-current', 'page'); else li.removeAttribute('aria-current');
    });
    var frag = document.createDocumentFragment();
    var base = tpl.getAttribute('data-base') && document.getElementById('page-' + tpl.getAttribute('data-base'));
    if (base) {
      var b = base.content.cloneNode(true);
      var t = b.querySelector('.ep-toast'); if (t) t.remove();   /* no toast under a dialog */
      frag.appendChild(b);
    }
    frag.appendChild(tpl.content.cloneNode(true));
    var swap = function () {
      app.replaceChildren(frag);
      app.classList.remove('is-leaving');
      app.classList.add('is-entering');
      setTimeout(function () { app.classList.remove('is-entering'); }, 300);
      window.scrollTo(0, 0);
      afterSwap(sub);
    };
    if (app.childElementCount && !reduced()) {   /* cross-fade: old out 120 ms, new fades up */
      app.classList.add('is-leaving');
      setTimeout(swap, 120);
    } else swap();
  }
  function afterSwap(sub) {
    var dialog = app.querySelector('.ep-dialog');
    if (dialog) {
      dialog.focus();
      var bar = dialog.querySelector('.ep-progress');
      if (bar) {   /* redirect: fill in 3 s, then hand off to the passbook portal frame */
        requestAnimationFrame(function () { bar.classList.add('is-running'); bar.setAttribute('aria-valuenow', '100'); });
        if (sub !== 'hold') setTimeout(function () { if (dialog.isConnected) location.hash = '#/portal'; }, 3200);   /* #/redirect/hold stays put (demo, screenshots) */
      }
    }
    var toast = app.querySelector('.ep-toast');
    if (toast) setTimeout(function () { if (toast.isConnected) toast.remove(); }, 10000);   /* owner: toasts go away after 10 s */
  }
  /* dismissables: toasts and notice strips */
  /* sign in: check the demo credentials; error names what failed, who owns it, what next */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('.ep-login-form');
    if (!form) return;
    e.preventDefault();
    var uan = (form.uan.value || '').replace(/\s+/g, ''), pw = form.password.value || '';
    var err = form.querySelector('.ep-field-error'), field = err && err.closest('.ep-field');
    if (uan === DEMO.uan && pw === DEMO.password) {
      var btn = form.querySelector('.ep-btn--primary');
      btn.classList.add('is-loading'); btn.setAttribute('aria-busy', 'true'); form.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
      setAuth(true);
      setTimeout(function () { location.hash = '#/dashboard'; }, reduced() ? 0 : 450);   /* a beat of "signing in" before the page changes */
      return;
    }
    err.querySelector('span').textContent = uan.length !== 12
      ? 'That UAN is not 12 digits. Nothing is wrong with your account. Check the number on your payslip and try again.'
      : 'That UAN and password do not match. Nothing is wrong with your account. Check both and try again, or use Forgot password.';
    err.hidden = false; field.classList.add('is-invalid'); form.password.setAttribute('aria-invalid', 'true'); form.password.focus();
  });
  document.addEventListener('reset', function (e) {
    var form = e.target.closest('.ep-login-form'); if (!form) return;
    var err = form.querySelector('.ep-field-error'); if (err) { err.hidden = true; err.closest('.ep-field').classList.remove('is-invalid'); }
    form.password.removeAttribute('aria-invalid');
  });
  /* logout: header button on both portals */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.ep-logout')) { setAuth(false); location.hash = '#/login'; }
  });
  document.addEventListener('keydown', function (e) {   /* Esc on the consent dialog = Not now */
    if (e.key === 'Escape' && document.body.getAttribute('data-page') === 'consent') location.hash = '#/passbook';
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.ep-toast-close, .ep-notice-close');
    if (b) b.closest('.ep-toast, .ep-notice').remove();
  });
  window.addEventListener('hashchange', route);
  route();
})();
