document.querySelectorAll('.image-carousel').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  if (slides.length < 2) return;
  const viewport = carousel.querySelector('.carousel-viewport');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const DELAY = 4200;
  const capEl = document.createElement('p');
  capEl.className = 'carousel-cap';
  viewport.insertAdjacentElement('afterend', capEl);
  const capOf = i => (slides[i].nextElementSibling && slides[i].nextElementSibling.classList.contains('cap')) ? slides[i].nextElementSibling.textContent : '';
  capEl.textContent = capOf(0);
  let current = 0;
  let timer = null;
  const ready = slides.map(img => { img.loading = 'eager'; return img.decode ? img.decode().catch(() => {}) : Promise.resolve(); });

  function show(next) {
    slides[current].classList.remove('is-active');
    current = next % slides.length;
    slides[current].classList.add('is-active');
    capEl.style.opacity = 0;
    setTimeout(() => { capEl.textContent = capOf(current); capEl.style.opacity = 1; }, 300);
  }
  function tick() {
    const next = (current + 1) % slides.length;
    Promise.race([ready[next], new Promise(r => setTimeout(r, 1500))]).then(() => show(next));
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (reducedMotion.matches || document.hidden) return;
    timer = setInterval(tick, DELAY);
  }
  document.addEventListener('visibilitychange', start);
  window.addEventListener('pageshow', start);
  window.addEventListener('focus', start);
  reducedMotion.addEventListener('change', start);
  start();
});
