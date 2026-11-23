(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('motion-ready');
  const elements = document.querySelectorAll('.metric, .project-row, .artist-line, .collaborator-names span, .categories span, .formats li, .contact-details > *');
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

  elements.forEach((element) => {
    element.setAttribute('data-reveal', '');
    observer.observe(element);
  });
})();
