/**
 * REVTI DIGITAL — Main JavaScript
 * Handles: navbar, cursor, scroll progress, parallax, filters, mobile menu
 */

// ─── CUSTOM CURSOR ───
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .filter-btn, .gallery-item, .similar-card, .service-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ─── SCROLL PROGRESS ───
(function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
})();

// ─── NAVBAR ───
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();

// ─── MOBILE MENU ───
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();

// ─── REVEAL ON SCROLL ───
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .stagger-children, .text-reveal').forEach(el => {
    observer.observe(el);
  });
})();

// ─── PROJECT FILTERS ───
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      projectCards.forEach(card => {
        const cardCat = card.dataset.category;
        if (cat === 'all' || cardCat === cat) {
          card.style.opacity = '1';
          card.style.transform = '';
          card.style.pointerEvents = '';
        } else {
          card.style.opacity = '0.2';
          card.style.transform = 'scale(0.97)';
          card.style.pointerEvents = 'none';
        }
      });
    });
  });
})();

// ─── PARTICLES ───
(function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;

  const count = 30;
  const colors = ['rgba(124,58,237,0.7)', 'rgba(6,182,212,0.7)', 'rgba(37,99,235,0.6)'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left  = Math.random() * 100;
    const dur   = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${left}%;
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
      border-radius:50%;
    `;
    container.appendChild(p);
  }
})();

// ─── FLOATING ORBS PARALLAX ───
(function initOrbParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  window.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth  - 0.5) * 30;
    const my = (e.clientY / window.innerHeight - 0.5) * 30;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
    });
  }, { passive: true });
})();

// ─── MAGNETIC BUTTONS ───
(function initMagnetic() {
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// ─── SMOOTH SCROLL LINKS ───
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ─── ANIMATED COUNTER ───
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || el.textContent);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const dur    = parseInt(el.dataset.duration || 2000);
  const dec    = parseInt(el.dataset.decimals  || 0);
  const startTime = performance.now();

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / dur, 1);
    const value    = easeOutQuart(progress) * target;
    el.textContent = prefix + value.toFixed(dec) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observe counters
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

// ─── GALLERY LIGHTBOX ───
(function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg   = lightbox.querySelector('.lightbox-img');
  const closeBtn      = lightbox.querySelector('.lightbox-close');
  const prevBtn       = lightbox.querySelector('.lightbox-prev');
  const nextBtn       = lightbox.querySelector('.lightbox-next');
  const galleryItems  = document.querySelectorAll('.gallery-item[data-src]');
  let currentIndex    = 0;

  function openLightbox(index) {
    currentIndex = index;
    const src = galleryItems[index].dataset.src;
    if (lightboxImg) lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  function navigate(dir) {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    const src = galleryItems[currentIndex].dataset.src;
    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = src;
        lightboxImg.style.opacity = '1';
      }, 150);
    }
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  closeBtn  && closeBtn.addEventListener('click', closeLightbox);
  prevBtn   && prevBtn.addEventListener('click',  () => navigate(-1));
  nextBtn   && nextBtn.addEventListener('click',  () => navigate( 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate( 1);
  });
})();

// ─── SECTION LABEL ACTIVE NAV ───
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();

// ─── PAGE LOAD ANIMATION ───
(function initPageLoad() {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  });
})();



// gallery design

// Gallery scroll reveal + parallax
(function () {
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Force-show items already in viewport on load
  function checkVisible() {
    galleryItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        item.classList.add('visible');
      }
    });
  }

  // IntersectionObserver as backup
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  galleryItems.forEach(item => observer.observe(item));

  // Run on load
  checkVisible();
  window.addEventListener('load', checkVisible);

  // Parallax
  let ticking = false;
  function handleParallax() {
    if (!ticking) {
      requestAnimationFrame(() => {
        document.querySelectorAll('.parallax-img').forEach(img => {
          const rect = img.closest('.gallery-item').getBoundingClientRect();
          const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
          const isHovered = img.closest('.image-wrapper').matches(':hover');
          const scale = isHovered ? 1.045 : 1;
          img.style.transform = `translateY(${progress * 28}px) scale(${scale})`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mouseenter', handleParallax);
    wrapper.addEventListener('mouseleave', handleParallax);
  });

  handleParallax();
})();