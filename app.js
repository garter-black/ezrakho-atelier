/* ═══════════════════════════════════════════════
   E Z R A   K H O   —   A T E L I E R
   Nav scroll + reveal + music player.
   YouTube playlist ID: swap YOUTUBE_PLAYLIST_ID in HTML once the
   artist account is set up. The mini-player expands on click.
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('nav');
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── MUSIC PLAYER ─── */
  const player = document.getElementById('music-player');
  if (player) {
    setTimeout(() => player.classList.add('visible'), 1500);

    const toggle = player.querySelector('.player-toggle');
    const closeBtn = player.querySelector('.player-close');
    const embed = player.querySelector('.player-embed');
    const iframe = player.querySelector('#yt-player');
    const bars = player.querySelectorAll('.player-bars span');

    function setBars(state) {
      bars.forEach(b => b.style.animationPlayState = state ? 'running' : 'paused');
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      player.classList.toggle('expanded');
      const expanded = player.classList.contains('expanded');
      embed.hidden = !expanded;
      setBars(expanded);
      // When expanding, force the iframe to load (it has src already, so just toggle visibility)
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      player.classList.remove('visible', 'expanded');
      embed.hidden = true;
      setBars(false);
      if (iframe) iframe.src = iframe.src; // stop playback
    });
  }
});
