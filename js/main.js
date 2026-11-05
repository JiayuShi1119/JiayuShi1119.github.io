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

  // ---- Active section highlight ----
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a'));
  var sections = navAnchors.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function setActive() {
    var y = window.scrollY + window.innerHeight * 0.3;
    var current = 0;
    sections.forEach(function (sec, i) { if (sec && sec.offsetTop <= y) current = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections.length - 1;
    navAnchors.forEach(function (a, i) { a.classList.toggle('active', i === current); });
    toTop.classList.toggle('show', window.scrollY > 700);
  }
  var toTop = document.querySelector('.to-top');
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(function () { setActive(); ticking = false; }); ticking = true; }
  }, { passive: true });
  setActive();

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

  // ---- Lightbox for photos ----
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('p');
  function closeLightbox() { lb.classList.remove('open'); lbImg.removeAttribute('src'); }
  document.addEventListener('click', function (e) {
    var img = e.target.closest('figure.media img, .project-card .thumb img');
    if (!img) return;
    var fig = img.closest('figure') || img.closest('.project-card');
    var cap = fig && (fig.querySelector('figcaption') || fig.querySelector('.cap'));
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
