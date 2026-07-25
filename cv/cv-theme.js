// Dark/light toggle for the CV. Initialises from localStorage if set,
// otherwise from the OS preference, and persists the choice. Also fires
// before the layout paints so we don't get a flash of the wrong theme.
//
// Lives on `.cv-layout` rather than <html> so the same script works
// whether the CV is the whole page (standalone preview) or embedded
// inside another site that has its own theming.
(function () {
  var STORAGE_KEY = 'cv-theme';

  function layouts() {
    return document.querySelectorAll('.cv-layout');
  }

  function apply(theme) {
    layouts().forEach(function (el) { el.dataset.theme = theme; });
    document.querySelectorAll('[data-cv-theme-toggle]').forEach(function (btn) {
      var label = btn.querySelector('.cv-theme-label');
      var icon  = btn.querySelector('.cv-theme-icon');
      if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
      if (icon)  icon.textContent  = theme === 'dark' ? '☾' : '☀';
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      // The toggle ships `hidden` (it's inert without JS) — reveal it now.
      var wrap = btn.closest('.cv-theme-toggle');
      if (wrap) wrap.hidden = false;
    });
  }

  function storedTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (_) { /* localStorage may be disabled */ }
    return null;
  }

  function preferredTheme() {
    var stored = storedTheme();
    if (stored) return stored;
    return window.matchMedia &&
           window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }

  // Apply early to avoid a flash on first paint.
  apply(preferredTheme());

  function init() {
    apply(preferredTheme());
    document.querySelectorAll('[data-cv-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var els = layouts();
        var cur = els.length && els[0].dataset.theme === 'dark' ? 'dark' : 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
      });
    });

    // Follow live OS theme changes until the user makes an explicit choice.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        if (!storedTheme()) apply(e.matches ? 'dark' : 'light');
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
