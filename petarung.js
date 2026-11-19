(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Buka navigasi' : 'Tutup navigasi');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Buka navigasi');
        navigation.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Buka navigasi');
        navigation.classList.remove('is-open');
      }
    });
  }

  // Menandai tab divisi yang sedang paling banyak terlihat.
  const sections = [...document.querySelectorAll('.division-section')];
  const tabs = [...document.querySelectorAll('.division-tab')];
  if ('IntersectionObserver' in window && sections.length && tabs.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tabs.forEach((tab) => {
          const active = tab.getAttribute('href') === `#${entry.target.id}`;
          tab.classList.toggle('is-active', active);
          if (active) tab.setAttribute('aria-current', 'location');
          else tab.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  // Jangan biarkan foto rusak membuat kartu kosong atau memicu loop fallback.
  document.querySelectorAll('img').forEach((image) => {
    image.addEventListener('error', () => {
      image.classList.add('image-unavailable');
      image.removeAttribute('src');
      image.alt = 'Foto fighter belum tersedia';
    }, { once: true });
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
})();
