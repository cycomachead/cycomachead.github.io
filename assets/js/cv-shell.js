// Keep the CV sidebar's offset in sync with the shared navbar's real height
// (it varies with font size, zoom and wrapping). Pairs with the
// --cv-navbar-h fallback in assets/styles/cv-shell.scss.
(function () {
  'use strict';

  var nav = document.querySelector('.bd-navbar') || document.querySelector('header.sticky-top');
  if (!nav) return;

  function setNavbarHeight() {
    document.documentElement.style.setProperty('--cv-navbar-h', nav.offsetHeight + 'px');
  }

  setNavbarHeight();
  window.addEventListener('resize', setNavbarHeight);
  window.addEventListener('load', setNavbarHeight);
})();
