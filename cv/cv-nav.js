// Scroll spy for the sidebar TOC: highlights the section currently being
// read. The CV is long enough that "where am I?" is a real question, and the
// TOC is the only navigation on the page.
//
// Ships next to cv-theme.js — both are inlined into the standalone preview
// (`make preview`) and served from /cv/ on the deployed Jekyll site, so this
// file may not assume anything about the surrounding page beyond the
// .cv-toc / .cv-sidebar markup the sidebar fragment emits.
(function () {
  'use strict';

  var ACTIVE = 'is-active';

  // Resolve a CSS length that may be expressed in px or rem. The site shell
  // publishes --cv-navbar-h as px from JS but declares a rem fallback, so we
  // can't just parseFloat it.
  function toPixels(value) {
    value = (value || '').trim();
    if (!value) return 0;
    var n = parseFloat(value);
    if (isNaN(n)) return 0;
    if (/rem$/.test(value)) {
      return n * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    return n;
  }

  function navbarHeight() {
    return toPixels(getComputedStyle(document.documentElement)
      .getPropertyValue('--cv-navbar-h'));
  }

  function init() {
    var toc = document.querySelector('.cv-toc');
    if (!toc) return;

    var sidebar = toc.closest('.cv-sidebar');
    var entries = [];

    toc.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var id = decodeURIComponent(link.hash.slice(1));
      var target = id && document.getElementById(id);
      if (target) entries.push({ link: link, target: target });
    });
    if (!entries.length) return;

    var active = null;

    function setActive(entry) {
      if (entry === active) return;
      if (active) {
        active.link.classList.remove(ACTIVE);
        active.link.removeAttribute('aria-current');
      }
      active = entry || null;
      if (!active) return;
      active.link.classList.add(ACTIVE);
      // aria-current is what conveys the highlight to assistive tech — the
      // colour change alone says nothing.
      active.link.setAttribute('aria-current', 'true');
      keepVisible(active.link);
    }

    // Scroll the sidebar — never the page — so the highlighted link stays on
    // screen in the desktop layout, where the TOC is taller than its column.
    function keepVisible(link) {
      if (!sidebar || sidebar.scrollHeight <= sidebar.clientHeight + 1) return;
      var l = link.getBoundingClientRect();
      var s = sidebar.getBoundingClientRect();
      if (l.top < s.top + 8) sidebar.scrollTop -= (s.top + 8 - l.top);
      else if (l.bottom > s.bottom - 8) sidebar.scrollTop += (l.bottom - s.bottom + 8);
    }

    // A heading counts as "current" once it crosses this line, which sits a
    // little way down the viewport — below the site's sticky navbar, and far
    // enough in that the section you're actually reading wins over the one
    // whose last paragraph is still clinging to the top edge.
    function readingLine() {
      return navbarHeight() + Math.min(160, window.innerHeight * 0.25);
    }

    function update() {
      // The final sections may be too short to ever reach the reading line,
      // so at the bottom of the page pick the last heading outright —
      // otherwise the spy sticks several sections back.
      var scrolled = window.scrollY + window.innerHeight;
      if (scrolled >= document.documentElement.scrollHeight - 2) {
        setActive(entries[entries.length - 1]);
        return;
      }

      var line = readingLine();
      var current = entries[0];
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].target.getBoundingClientRect().top > line) break;
        current = entries[i];
      }
      setActive(current);
    }

    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        update();
      });
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('load', schedule);

    // Smooth scrolling means the scroll handler wouldn't catch up for a few
    // hundred milliseconds; highlight the clicked section straight away.
    toc.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;
      var hit = entries.find(function (e) { return e.link === link; });
      if (hit) setActive(hit);
    });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
