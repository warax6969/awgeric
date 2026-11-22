(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('[data-reveal]');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    revealItems.forEach((item) => observer.observe(item));

    if (window.matchMedia('(min-width: 761px)').matches) {
      let frame = 0;
      window.addEventListener('scroll', () => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          const shift = Math.min(window.scrollY * 0.025, 22);
          document.documentElement.style.setProperty('--left-parallax', `${-shift}px`);
          document.documentElement.style.setProperty('--right-parallax', `${shift * 0.5}px`);
          frame = 0;
        });
      }, { passive:true });
    }
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const frame = document.querySelector('.video-frame');
  if (frame && /^https?:$/.test(window.location.protocol)) {
    const videoId = frame.dataset.youtubeId;
    const url = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
    url.searchParams.set('rel', '0');
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('origin', window.location.origin);
    const player = document.createElement('iframe');
    player.src = url.toString();
    player.title = 'Censu / asta asta, videoclip oficial';
    player.loading = 'lazy';
    player.referrerPolicy = 'origin';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.allowFullscreen = true;
    frame.replaceChildren(player);
  }
})();
