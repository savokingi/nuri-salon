// JavaScript for Beauty Salon NURI — Modern Bento & Advanced Animations

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const burgerBtn = document.getElementById('burgerBtn');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (burgerBtn) burgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Service Tabs Switcher
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // 3. Gallery Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Gallery Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const captionSpan = item.querySelector('.gallery-overlay span');
      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = captionSpan ? captionSpan.textContent : 'Салон NURI';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeDrawer();
    }
  });

  // 5. ScrollSpy & Nav Active Highlighting
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 250;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 6. Intersection Observer for Advanced Reveal Animations with Stagger
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add reveal and stagger delay classes
  const revealElements = document.querySelectorAll('.about-grid, .price-card, .gallery-item, .master-spotlight-grid, .reviews-top-card, .reviews-criteria, .review-card, .contact-grid');
  revealElements.forEach((el, idx) => {
    el.classList.add('reveal');
    if (idx % 3 === 1) el.classList.add('reveal-delay-1');
    if (idx % 3 === 2) el.classList.add('reveal-delay-2');
    observer.observe(el);
  });

  // 7. Card Spotlight Mouse Effect
  const cards = document.querySelectorAll('.price-card, .review-card, .about-image, .master-bio-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 8. Interactive Before/After Slider
  const baRange = document.getElementById('baRange');
  const baAfterLayer = document.getElementById('baAfterLayer');
  const baDivider = document.getElementById('baDivider');

  if (baRange && baAfterLayer) {
    baRange.addEventListener('input', (e) => {
      const val = e.target.value;
      baAfterLayer.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
      if (baDivider) baDivider.style.left = `${val}%`;
    });
  }

  // 9. Kinetic Word Rotator
  const rotatorWord = document.getElementById('wordRotator');
  if (rotatorWord) {
    const words = ['красоте.', 'длине.', 'уверенности.', 'идеальности.'];
    let wordIdx = 0;
    setInterval(() => {
      rotatorWord.classList.add('fade-out');
      setTimeout(() => {
        wordIdx = (wordIdx + 1) % words.length;
        rotatorWord.textContent = words[wordIdx];
        rotatorWord.classList.remove('fade-out');
        rotatorWord.classList.add('fade-in');
        setTimeout(() => rotatorWord.classList.remove('fade-in'), 400);
      }, 400);
    }, 3000);
  }
});
