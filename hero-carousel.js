document.querySelectorAll('.hero-carousel').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  if (slides.length < 2) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const DELAY = 4800;
  const figcap = carousel.querySelector('figcaption span');
  const capOf = i => (slides[i].nextElementSibling && slides[i].nextElementSibling.classList.contains('cap')) ? slides[i].nextElementSibling.textContent : '';
  if (figcap) figcap.textContent = capOf(0);
  let current = 0;
  let timer = null;

  // Alle Bilder vorab laden und dekodieren, damit die Überblendung nie auf ein leeres Bild trifft
  const ready = slides.map(img => {
    img.loading = 'eager';
    return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
  });

  function show(next) {
    slides[current].classList.remove('is-active');
    slides[current].setAttribute('aria-hidden', 'true');
    current = next % slides.length;
    slides[current].classList.add('is-active');
    slides[current].setAttribute('aria-hidden', 'false');
    if (figcap) { figcap.style.opacity = 0; setTimeout(() => { figcap.textContent = capOf(current); figcap.style.opacity = 1; }, 500); }
  }
  function tick() {
    // Nächstes Bild erst zeigen, wenn es geladen ist; sonst kurz warten statt hängen zu bleiben
    const next = (current + 1) % slides.length;
    Promise.race([ready[next], new Promise(r => setTimeout(r, 1500))]).then(() => show(next));
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (reducedMotion.matches || document.hidden) return;
    timer = setInterval(tick, DELAY);
  }
  // Läuft immer durch: kein Pausieren bei Maus, Touch oder Fokus
  document.addEventListener('visibilitychange', start);
  window.addEventListener('pageshow', start);
  window.addEventListener('focus', start);
  reducedMotion.addEventListener('change', start);
  start();
});
