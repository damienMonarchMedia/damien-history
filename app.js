/* Progressive enhancement only: all historical content is pre-rendered from data/timeline.json. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = [...document.querySelectorAll('.chapter')];
  const links = [...document.querySelectorAll('.era-bar a')];
  const hero = document.querySelector('.hero-image');
  const depthFrames = [...document.querySelectorAll('.depth-frame')];
  const progress = document.querySelector('#progress');
  let scheduled = false;
  function updateScroll() {
    scheduled = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 0;
    progress.style.width = `${pct}%`;
    let current = null;
    for (const chapter of chapters) if (chapter.getBoundingClientRect().top < innerHeight * .48) current = chapter;
    for (const link of links) {
      if (current && link.dataset.era === current.dataset.era) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    if (!reduced.matches && scrollY < innerHeight * 1.5) hero.style.transform = `translateY(${Math.min(scrollY * .25, 150)}px)`;
    else hero.style.transform = '';
    for (const frame of depthFrames) {
      const img = frame.querySelector('img');
      const rect = frame.getBoundingClientRect();
      if (reduced.matches) { img.style.transform = ''; continue; }
      if (rect.bottom > -100 && rect.top < innerHeight + 100) {
        const position = (rect.top + rect.height / 2 - innerHeight / 2) / (innerHeight / 2 + rect.height / 2);
        img.style.transform = `translateY(${Math.max(-1, Math.min(1, position)) * -36}px) scale(1.16)`;
      }
    }
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  updateScroll();
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); }
    }), {threshold:.12});
    document.querySelectorAll('.chapter-visual').forEach(el => { el.classList.add('pending'); observer.observe(el); });
  }
  const dialog = document.querySelector('#map-dialog');
  const viewport = document.querySelector('#map-viewport');
  const map = document.querySelector('#map-image');
  const label = document.querySelector('#zoom-label');
  const zoomIn = document.querySelector('#zoom-in');
  const zoomOut = document.querySelector('#zoom-out');
  let opener = null, scale = 1, x = 0, y = 0, pointer = null, oldOverflow = '';
  function draw() {
    const limitX = viewport.clientWidth * (scale - 1) / 2;
    const limitY = viewport.clientHeight * (scale - 1) / 2;
    x = Math.max(-limitX, Math.min(limitX, x));
    y = Math.max(-limitY, Math.min(limitY, y));
    map.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    label.value = `${Math.round(scale * 100)}%`;
    zoomOut.disabled = scale <= 1;
    zoomIn.disabled = scale >= 5;
  }
  function zoom(delta) { scale = Math.min(5, Math.max(1, scale + delta)); draw(); }
  function reset() { scale = 1; x = y = 0; draw(); }
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
    if (typeof dialog.showModal !== 'function') { location.href = 'assets/map.webp'; return; }
    opener = button;
    if (!map.getAttribute('src')) map.src = 'assets/map.webp';
    oldOverflow = document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow = 'hidden'; reset();
    dialog.querySelector('[data-close]').focus();
  }));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.style.overflow = oldOverflow; pointer = null; opener?.focus({preventScroll:true}); });
  zoomIn.addEventListener('click', () => zoom(.5));
  zoomOut.addEventListener('click', () => zoom(-.5));
  document.querySelector('#reset-map').addEventListener('click', reset);
  const offsets = {left:[60,0],right:[-60,0],up:[0,60],down:[0,-60]};
  function pan(direction) { const offset = offsets[direction]; x += offset[0]; y += offset[1]; draw(); }
  document.querySelectorAll('[data-pan]').forEach(button => button.addEventListener('click', () => pan(button.dataset.pan)));
  viewport.addEventListener('keydown', event => {
    const key = event.key;
    if (['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) {
      event.preventDefault();
      if (key === '+' || key === '=') zoom(.5);
      else if (key === '-') zoom(-.5);
      else if (key === '0') reset();
      else pan(key.replace('Arrow','').toLowerCase());
    }
  });
  viewport.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = {id:event.pointerId, x:event.clientX, y:event.clientY}; viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    x += event.clientX - pointer.x; y += event.clientY - pointer.y;
    pointer.x = event.clientX; pointer.y = event.clientY; draw();
  });
  const release = () => { pointer = null; };
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);
  viewport.addEventListener('lostpointercapture', release);
  addEventListener('resize', () => { if (dialog.open) draw(); });
})();
