/* Slide navigation: adds prev / index / next controls to every slide. */
(function () {
  'use strict';

  var TOTAL = 9;

  function slideFile(number) {
    return 'slide_' + String(number).padStart(2, '0') + '.html';
  }

  function currentNumber() {
    var match = window.location.pathname.match(/slide[_-]?(\d+)(?:\.html)?$/i);
    return match ? parseInt(match[1], 10) : 1;
  }

  function makeControl(label, href, extraClass, arrow, title) {
    var el;
    if (href) {
      el = document.createElement('a');
      el.href = href;
    } else {
      el = document.createElement('span');
      el.setAttribute('aria-disabled', 'true');
    }
    el.className = 'slide-nav-btn ' + extraClass;

    if (arrow === 'left') {
      el.appendChild(arrowSpan('←'));
      el.appendChild(document.createTextNode(' ' + label));
    } else if (arrow === 'right') {
      el.appendChild(document.createTextNode(label + ' '));
      el.appendChild(arrowSpan('→'));
    } else {
      el.textContent = label;
    }

    if (title) el.title = title;
    return el;
  }

  function arrowSpan(symbol) {
    var span = document.createElement('span');
    span.className = 'arrow';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = symbol;
    return span;
  }

  function buildNav(number) {
    var prev = number > 1 ? slideFile(number - 1) : null;
    var next = number < TOTAL ? slideFile(number + 1) : null;

    var nav = document.createElement('nav');
    nav.className = 'slide-nav';
    nav.setAttribute('aria-label', 'Navegación entre diapositivas');

    nav.appendChild(makeControl('Anterior', prev, 'slide-nav-prev', 'left', 'Diapositiva anterior (←)'));
    nav.appendChild(makeControl('Índice', 'index.html', 'slide-nav-home', null, 'Volver al índice (Esc)'));

    var nextControl = makeControl('Siguiente', next, 'slide-nav-next', 'right', 'Diapositiva siguiente (→)');
    nav.appendChild(nextControl);

    return nav;
  }

  function mountNav() {
    var meta = document.querySelector('.page-meta');
    if (!meta || meta.querySelector('.slide-nav')) return;

    var number = currentNumber();
    var counter = meta.lastElementChild;
    var right = document.createElement('div');
    right.className = 'slide-meta-right';
    right.appendChild(buildNav(number));
    if (counter) right.appendChild(counter);
    meta.appendChild(right);

    var mobile = buildNav(number);
    mobile.classList.add('slide-nav-mobile');
    document.body.appendChild(mobile);

    document.addEventListener('keydown', function (event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

      if (event.key === 'ArrowLeft' && number > 1) {
        window.location.href = slideFile(number - 1);
      } else if (event.key === 'ArrowRight' && number < TOTAL) {
        window.location.href = slideFile(number + 1);
      } else if (event.key === 'Escape' || event.key === 'Home') {
        window.location.href = 'index.html';
      }
    });
  }

  function fitSlide() {
    var slide = document.querySelector('.slide');
    if (!slide) return;

    var width = document.documentElement.clientWidth || window.innerWidth;
    var height = document.documentElement.clientHeight || window.innerHeight;
    var stage = slide.parentElement;
    var scale = Math.min(width / 1280, height / 720, 1);
    var shouldScale = scale < 1;

    if (!shouldScale) {
      if (stage && stage.classList.contains('slide-stage')) {
        stage.parentNode.insertBefore(slide, stage);
        stage.parentNode.removeChild(stage);
      }
      slide.style.transform = '';
      slide.style.transformOrigin = '';
      return;
    }

    if (!stage || !stage.classList.contains('slide-stage')) {
      stage = document.createElement('div');
      stage.className = 'slide-stage';
      slide.parentNode.insertBefore(stage, slide);
      stage.appendChild(slide);
    }

    stage.style.width = Math.ceil(1280 * scale) + 'px';
    stage.style.height = Math.ceil(720 * scale) + 'px';
    slide.style.transformOrigin = 'top left';
    slide.style.transform = 'scale(' + scale + ')';
  }

  function init() {
    mountNav();
    fitSlide();
    window.addEventListener('resize', fitSlide);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
