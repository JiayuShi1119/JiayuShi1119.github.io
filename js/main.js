/* Jiayu Shi ePortfolio — small, dependency-free interactions */
(function () {
  'use strict';

  // ---- Mobile navigation ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  function closeMenu() {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeLightbox(); } });

  // ---- Page router: show one page at a time, driven by the URL hash ----
  // Each top-level page has class "page"; project detail pages set data-parent="projects"
  // so the Projects tab stays highlighted. Back/forward buttons and deep links work.
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a'));
  var home = document.getElementById('home');
  var baseTitle = document.title;
  var current = null;

  function pageFor(el) {
    if (!el) return null;
    return el.classList.contains('page') ? el : el.closest('.page');
  }

  function route() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id ? document.getElementById(id) : null;
    var page = pageFor(el);
    if (!page) {
      if (el && current) return;          // e.g. #top or #main: keep the current page
      page = home;
    }
    if (page !== current) {
      pages.forEach(function (p) { p.classList.toggle('active', p === page); });
      current = page;
      var key = page.getAttribute('data-parent') || page.id;
      navAnchors.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + key;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      document.title = page === home ? baseTitle : page.getAttribute('data-title') + ' | Jiayu (Joey) Shi';
      // Pause any video on pages that are now hidden
      document.querySelectorAll('video').forEach(function (v) { if (!page.contains(v)) v.pause(); });
    }
    if (el && el !== page) el.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.addEventListener('hashchange', route);
  route();

  // ---- Back-to-top button ----
  var toTop = document.querySelector('.to-top');
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () { toTop.classList.toggle('show', window.scrollY > 700); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  // ---- Reveal on scroll ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Lightbox for photos (not for images inside links, such as project summary cards) ----
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('p');
  function closeLightbox() { lb.classList.remove('open'); lbImg.removeAttribute('src'); }
  document.addEventListener('click', function (e) {
    var img = e.target.closest('figure.media img');
    if (!img || img.closest('a')) return;
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent.replace(/\s+/g, ' ').trim() : img.alt;
    lb.classList.add('open');
    lb.querySelector('button').focus();
  });
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLightbox(); });

  // ---- Footer year ----
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
