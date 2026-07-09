'use client'

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { projectCustomCss } from '../../styles/projectCustomCss';
import { submitEnquiry } from '@/lib/actions';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id || 'websites';

  const [prevId, setPrevId] = useState('seo');
  const [nextId, setNextId] = useState('branding');

  useEffect(() => {
    // 1. GSAP ScrollTrigger register
    if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // GSAP timeline items
      gsap.utils.toArray('.tl-item').forEach((el: any, i: number) => {
        gsap.fromTo(el, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      // Left-to-right clipPath image reveal animation
      const revealContainers = document.querySelectorAll('.reveal-img-container');
      revealContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        gsap.set(container, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' });
        gsap.set(img, { scale: 1.15 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        tl.to(container, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.4,
          ease: 'power3.inOut'
        })
        .to(img, {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out'
        }, '-=1.4');
      });

      // GSAP reveal for impact cards
      gsap.fromTo('.impact-metric-card', { opacity: 0, y: 24, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-card-grid', start: 'top 82%', once: true }
      });
    }

    // 2. Dynamic Prev / Next Navigation setup (Filtered by category)
    const activeFilter = sessionStorage.getItem('activeCategoryFilter') || 'all';
    const categorySequences: Record<string, string[]> = {
      'all': ['branding', 'websites', 'events', 'nova', 'mfg', 'seo', 'social', 'fintech', 'ecommerce'],
      'Branding': ['branding', 'nova'],
      'Websites': ['websites', 'seo', 'mfg'],
      'Events': ['events', 'ecommerce'],
      'Publication': ['nova', 'mfg'],
      'Interiors': ['social'],
      'Packaging': ['fintech'],
      'Illustration': [],
      'Print': []
    };

    let storedSequence: string[] = [];
    try {
      const parsedSequence = JSON.parse(sessionStorage.getItem('activeProjectSequence') || '[]');
      if (Array.isArray(parsedSequence)) {
        storedSequence = parsedSequence.filter((projectId): projectId is string => typeof projectId === 'string' && Boolean(projectId));
      }
    } catch {
      storedSequence = [];
    }

    let filteredSequence = storedSequence.includes(id)
      ? storedSequence
      : categorySequences[activeFilter] || categorySequences['all'];

    if (!filteredSequence.includes(id) || filteredSequence.length === 0) {
      filteredSequence = categorySequences['all'];
    }

    const currentProjectIndex = filteredSequence.indexOf(id);
    const prevProjId = filteredSequence[(currentProjectIndex - 1 + filteredSequence.length) % filteredSequence.length];
    const nextProjId = filteredSequence[(currentProjectIndex + 1) % filteredSequence.length];
    setPrevId(prevProjId);
    setNextId(nextProjId);

    const projectPrev = document.getElementById('projectPrev') as HTMLAnchorElement;
    const projectNext = document.getElementById('projectNext') as HTMLAnchorElement;
    if (projectPrev && projectNext) {
      projectPrev.href = '/project/' + prevProjId;
      projectNext.href = '/project/' + nextProjId;
    }

    // 3. Custom Cursor
    const curDot = document.getElementById('cur-dot');
    const curRing = document.getElementById('cur-ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    if (curDot && curRing) {
      curDot.style.left = mx + 'px'; curDot.style.top = my + 'px';
      curRing.style.left = rx + 'px'; curRing.style.top = ry + 'px';

      const handleMouseMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        curDot.style.left = mx + 'px';
        curDot.style.top = my + 'px';
      };
      document.addEventListener('mousemove', handleMouseMove);

      let animId: number;
      const animCur = () => {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        curRing.style.left = rx + 'px';
        curRing.style.top = ry + 'px';
        animId = requestAnimationFrame(animCur);
      };
      animCur();

      const hoverables = document.querySelectorAll('a, button, .reveal-img-container, .sim-card, .impact-metric-card, .ov-card, .tl-item, input, select, textarea, label, .check-item, .custom-checkbox, .modal-close, .modal-cancel-link');
      const addHoverCls = () => curRing.classList.add('h');
      const removeHoverCls = () => curRing.classList.remove('h');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', addHoverCls);
        el.addEventListener('mouseleave', removeHoverCls);
      });

      // Cleanup function scope variables
      (window as any)._cleanupCursor = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animId);
        hoverables.forEach(el => {
          el.removeEventListener('mouseenter', addHoverCls);
          el.removeEventListener('mouseleave', removeHoverCls);
        });
      };
    }

    // 4. Scroll Prog & Nav toggle
    const pg = document.getElementById('prog');
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if (pg) {
        pg.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
      }
      if (nav) {
        nav.classList.toggle('sc', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 5. Hamburger
    const hamB = document.getElementById('ham');
    const mob = document.getElementById('mob');
    const handleHamClick = () => {
      if (hamB && mob) {
        hamB.classList.toggle('open');
        mob.classList.toggle('open');
        document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
      }
    };
    if (hamB) hamB.addEventListener('click', handleHamClick);

    const mobLinks = mob ? mob.querySelectorAll('a') : [];
    const handleMobLinkClick = () => {
      if (hamB && mob) {
        hamB.classList.remove('open');
        mob.classList.remove('open');
        document.body.style.overflow = '';
      }
    };
    mobLinks.forEach(a => a.addEventListener('click', handleMobLinkClick));

    // 6. Reveal Observer
    const ro = new IntersectionObserver(e => e.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('vis');
        ro.unobserve(en.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => ro.observe(el));

    // 7. Counters
    function runCounter(el: any) {
      const tgt = parseFloat(el.dataset.t);
      const suf = el.dataset.s || '';
      const pre = el.dataset.p || '';
      const dur = 2000;
      const s = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      (function tick(now) {
        const t = Math.min((now - s) / dur, 1);
        el.textContent = pre + Math.round(ease(t) * tgt) + suf;
        if (t < 1) requestAnimationFrame(tick);
      })(s);
    }
    const co = new IntersectionObserver(e => e.forEach(en => {
      if (en.isIntersecting) {
        runCounter(en.target);
        co.unobserve(en.target);
      }
    }), { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(el => co.observe(el));

    // 8. Lightbox Setup
    const galMeta = [
      { src: '/Images/Gemini_Generated_Image_39dgf639dgf639dg.png', l: 'Brand Asset 01' },
      { src: '/Images/Gemini_Generated_Image_4wbmmb4wbmmb4wbm.png', l: 'Brand Asset 02' },
      { src: '/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png', l: 'Brand Asset 03' },
      { src: '/Images/Gemini_Generated_Image_5iyked5iyked5iyk.png', l: 'Brand Asset 04' }
    ];
    let lbIdx = 0;
    function openLb(i: number) {
      lbIdx = i;
      const img = document.getElementById('lb-img') as HTMLImageElement;
      if (!img) return;
      img.src = galMeta[i].src;
      img.alt = 'HealthCore — ' + galMeta[i].l;
      const labelEl = document.getElementById('lb-label');
      if (labelEl) labelEl.textContent = 'HealthCore — ' + galMeta[i].l;
      const ctrEl = document.getElementById('lb-ctr');
      if (ctrEl) ctrEl.textContent = (i + 1) + ' / ' + galMeta.length;
      const lbEl = document.getElementById('lb');
      if (lbEl) lbEl.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      const lbEl = document.getElementById('lb');
      if (lbEl) lbEl.classList.remove('open');
      document.body.style.overflow = '';
    }
    function navLb(d: number) {
      lbIdx = (lbIdx + d + galMeta.length) % galMeta.length;
      openLb(lbIdx);
    }
    (window as any).openLightbox = openLb;

    const lbCloseBtn = document.getElementById('lb-x');
    const lbPrevBtn = document.getElementById('lb-prev');
    const lbNextBtn = document.getElementById('lb-next');
    const lbEl = document.getElementById('lb');

    if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLb);
    if (lbPrevBtn) lbPrevBtn.addEventListener('click', () => navLb(-1));
    if (lbNextBtn) lbNextBtn.addEventListener('click', () => navLb(1));
    if (lbEl) {
      lbEl.addEventListener('click', e => {
        if (e.target === lbEl) closeLb();
      });
    }

    const handleLightboxKeys = (e: KeyboardEvent) => {
      const activeLb = document.getElementById('lb');
      if (!activeLb || !activeLb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') navLb(-1);
      if (e.key === 'ArrowRight') navLb(1);
    };
    document.addEventListener('keydown', handleLightboxKeys);

    // Bind stacked click to lightbox
    const revealImgContainers = document.querySelectorAll('.reveal-img-container');
    revealImgContainers.forEach((container, i) => {
      container.addEventListener('click', () => openLb(i));
    });

    // 9. Keyboard left/right logic for project switching
    const handleProjectSwitchKeys = (e: KeyboardEvent) => {
      const activeLb = document.getElementById('lb');
      if (activeLb && activeLb.classList.contains('open')) return; // ignore if lightbox is open
      const activeModal = document.getElementById('back-form-modal');
      if (activeModal && activeModal.classList.contains('open')) return; // ignore if form modal is open
      if (e.key === 'ArrowLeft') router.push('/project/' + prevProjId);
      if (e.key === 'ArrowRight') router.push('/project/' + nextProjId);
    };
    document.addEventListener('keydown', handleProjectSwitchKeys);

    // 10. Swipe Gesture switcher
    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 60;
    const ANGLE_LIMIT = 40;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dy) > Math.abs(dx) * Math.tan(ANGLE_LIMIT * Math.PI / 180)) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (dx < 0) {
        router.push('/project/' + nextProjId);
      } else if (dx > 0) {
        router.push('/project/' + prevProjId);
      }
    };
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 11. Exit Intent form modal system
    const modal = document.getElementById('back-form-modal');
    const modalClose = document.getElementById('modalCloseBtn');
    const modalCancel = document.getElementById('modalCancelBtn');
    const modalForm = document.getElementById('modal-contact-form') as HTMLFormElement;
    const modSuccess = document.getElementById('modal-success-message');
    function closeFormModal() {
      if (!modal) return;
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function goHome() {
      closeFormModal();
      router.push('/');
    }

    // Browser back from project pages should go to the homepage, not open the lead form.
    history.replaceState({ page: 'project-detail' }, '', window.location.href);
    history.pushState({ page: 'project-detail-current' }, '', window.location.href);

    const handlePopState = () => {
      closeFormModal();
      router.replace('/');
    };
    window.addEventListener('popstate', handlePopState);

    if (modalClose) modalClose.addEventListener('click', closeFormModal);
    if (modalCancel) modalCancel.addEventListener('click', goHome);
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeFormModal(); });

    // Form submit connection to Supabase Server Action
    if (modalForm) {
      modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const checkboxes = modalForm.querySelectorAll('input[name="looking_for"]:checked');
        if (checkboxes.length === 0) {
          alert("Please select at least one service option.");
          return;
        }

        const services = Array.from(checkboxes).map(cb => (cb as HTMLInputElement).value);
        const name = (document.getElementById('mod-name') as HTMLInputElement).value;
        const email = (document.getElementById('mod-email') as HTMLInputElement).value;
        const phone = (document.getElementById('mod-phone') as HTMLInputElement).value;
        const website = (document.getElementById('mod-web') as HTMLInputElement).value;

        const submitBtn = modalForm.querySelector('.form-submit-btn') as HTMLButtonElement;
        if (submitBtn) submitBtn.disabled = true;

        try {
          const result = await submitEnquiry({
            name,
            email,
            phone,
            company: website,
            services,
            message: 'Website Link: ' + website
          });

          if (result.success) {
            modalForm.style.display = 'none';
            if (modSuccess) modSuccess.style.display = 'block';

            setTimeout(() => {
              closeFormModal();
              router.push('/');
            }, 2000);
          } else {
            alert(result.error || 'Failed to submit enquiry.');
            if (submitBtn) submitBtn.disabled = false;
          }
        } catch (err) {
          console.error(err);
          alert('An error occurred. Please try again.');
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }

    return () => {
      if ((window as any)._cleanupCursor) (window as any)._cleanupCursor();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('keydown', handleLightboxKeys);
      document.removeEventListener('keydown', handleProjectSwitchKeys);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [id, router, prevId, nextId]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: projectCustomCss }} />
      
{/* ══ CURSOR (max z-index, always on top) ══ */}
<div id="cur-dot"></div>
<div id="cur-ring"></div>
<div id="prog"></div>

{/* SVG gradient for ring chart */}
<svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
  <defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#7c3aed"/>
      <stop offset="50%" stopColor="#2563eb"/>
      <stop offset="100%" stopColor="#06b6d4"/>
    </linearGradient>
  </defs>
</svg>

{/* NAV */}
<nav className="nav" id="nav">
  <div className="nav-in">
    <a href="/" className="logo"><div className="logo-i">R</div><span className="logo-t">Revti<span>Digital</span></span></a>
    <ul className="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/#portfolio">Projects</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <a href="/" className="nav-back" id="navBackBtn"><i className="fa-solid fa-arrow-left"></i> Back to Home</a>
    <button className="ham" id="ham" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>



<div className="mob-nav" id="mob">
  <a href="/">Home</a>
  <a href="/#portfolio">Projects</a>
  <a href="/#contact">Contact</a>
</div>

{/* ══ HERO — CENTERED, ONE-LINE ══ */}
<header className="proj-hero">
  <div className="hero-mesh"></div>
  <div className="hero-grid-bg"></div>
  {/* <div className="hero-wm">HC</div> */}
  <div className="orb" style={{ width: "500px", height: "500px", top: "-80px", left: "-100px", background: "black" }}></div>
  <div className="orb" style={{ width: "320px", height: "320px", bottom: "20%", right: "-60px", background: "black", animationDelay: "-5s" }}></div>
  <div style={{ width: "100%" }}>
    <div className="proj-hero-content">
      <ol className="breadcrumb">
        <li><a href="/">Home</a></li>
        <li><a href="/#portfolio">Projects</a></li>
        <li>HealthCore Web Platform</li>
      </ol>
      <div className="proj-cat-pill">🏥 Web Development · Healthcare</div>
      {/* ONE-LINE HEADING */}
      <h1 className="proj-h1">
        HealthCore <span className="grad">Web Platform</span>
      </h1>
      <p className="proj-sub">AI-powered, HIPAA-compliant patient management serving 500+ hospitals — 40% fewer diagnostic errors and $12M in annual savings.</p>
      <div className="proj-meta-row">
        <div className="meta-item">
          <span className="meta-label">Client</span>
          <span className="meta-value">Apollo Health Systems</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Industry</span>
          <span className="meta-value">Healthcare / MedTech</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Year</span>
          <span className="meta-value">2023 – 2024</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Sprint</span>
          <span className="meta-value">18-Month Agile</span>
        </div>
      </div>
    </div>
  </div>
</header>

{/* ══ OVERVIEW + TECH ══ */}
<section className="proj-overview" id="overview">
  <div className="wrap">
    <div className="overview-grid">
      <div>
        {/* <div className="sec-label rv"><span className="dot"></span> Overview</div> */}
          <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s", marginBottom: "56px" }}><span className="grad">Overview</span></h2>
        <h2 className="ov-big rv" style={{ transitionDelay: ".1s" }}>Revolutionising diagnostics with AI intelligence</h2>
        <p className="ov-p rv" style={{ transitionDelay: ".15s" }}>Apollo Health Systems faced fragmented patient data across 500+ facilities — overwhelming clinical staff and causing costly diagnostic delays. Revti Digital designed and engineered a unified AI-powered platform that connects every hospital, surfaces real-time insights, and assists physicians with evidence-based recommendations.</p>
        <p className="ov-p rv" style={{ transitionDelay: ".2s" }}>Full HIPAA, HL7 FHIR R4, and ISO 27001 compliance from sprint one — zero security incidents since April 2024 launch.</p>

      </div>
      <div className="ov-cards">
        <div className="ov-card rv" style={{ transitionDelay: ".1s" }}><div className="ov-icon" style={{ background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.25)" }}>🎯</div><div className="ov-text"><h4>The Challenge</h4><p>500+ hospitals, 15 different EMR systems, zero unified intelligence — causing diagnostic inconsistencies and dangerous data silos.</p></div></div>
        <div className="ov-card rv" style={{ transitionDelay: ".15s" }}><div className="ov-icon" style={{ background: "rgba(6,182,212,.12)", border: "1px solid rgba(6,182,212,.25)" }}>💡</div><div className="ov-text"><h4>Our Approach</h4><p>Microservices with an AI inference engine, FHIR R4 federation layer, and a clinical-grade React UI with 200+ purpose-built components.</p></div></div>
        <div className="ov-card rv" style={{ transitionDelay: ".2s" }}><div className="ov-icon" style={{ background: "rgba(37,99,235,.12)", border: "1px solid rgba(37,99,235,.25)" }}>📈</div><div className="ov-text"><h4>The Impact</h4><p>40% fewer diagnostic errors, 3× faster reporting, $12M annual savings, 99.99% uptime across all 500+ hospitals.</p></div></div>
        <div className="ov-card rv" style={{ transitionDelay: ".25s" }}><div className="ov-icon" style={{ background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.2)" }}>🛡️</div><div className="ov-text"><h4>Compliance First</h4><p>Full HIPAA, HL7 FHIR R4, and ISO 27001 compliance baked in from sprint one — zero security incidents since launch.</p></div></div>
      </div>
    </div>
  </div>
</section>

{/* ══ PROCESS ══ */}
<section className="proj-process" id="process">
  <div className="wrap">
    {/* <div className="sec-label rv"><span className="dot"></span> Our Process</div> */}
    <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s", marginBottom: "56px" }}>From discovery to <span className="grad">deployment</span></h2>
    <div className="timeline">
      <div className="tl-item rv"><div className="tl-dot">🔍</div><div className="tl-body"><div className="tl-step">Phase 01 · Weeks 1–4</div><h3 className="tl-title">Discovery & Research</h3><p className="tl-text">80+ stakeholder interviews across 12 hospitals. Mapped 200+ clinical workflows and synthesised 40 pain points into a strategic platform blueprint.</p></div></div>
      <div className="tl-item rv" style={{ transitionDelay: ".06s" }}><div className="tl-dot">📐</div><div className="tl-body"><div className="tl-step">Phase 02 · Weeks 5–10</div><h3 className="tl-title">Architecture & Strategy</h3><p className="tl-text">Designed a microservices platform with FastAPI backend, TensorFlow AI models, React frontend, AWS GovCloud infrastructure, and FHIR R4 API layer unifying 15 EMR systems.</p></div></div>
      <div className="tl-item rv" style={{ transitionDelay: ".1s" }}><div className="tl-dot">🎨</div><div className="tl-body"><div className="tl-step">Phase 03 · Weeks 8–16</div><h3 className="tl-title">Design & Prototyping</h3><p className="tl-text">Clinical-grade design system with 200+ components. Six rounds of usability testing with actual clinicians. WCAG 2.1 AA accessibility enforced from first wireframe.</p></div></div>
      <div className="tl-item rv" style={{ transitionDelay: ".14s" }}><div className="tl-dot">⚙️</div><div className="tl-body"><div className="tl-step">Phase 04 · Weeks 12–52</div><h3 className="tl-title">Engineering & AI Development</h3><p className="tl-text">18-person team across four tracks: AI model training (12 models, 2M+ medical images), backend, frontend, and EMR integrations with Epic, Oracle Health, and Meditech.</p></div></div>
      <div className="tl-item rv" style={{ transitionDelay: ".18s" }}><div className="tl-dot">🚀</div><div className="tl-body"><div className="tl-step">Phase 05 · Month 18</div><h3 className="tl-title">Deployment & Scale</h3><p className="tl-text">Blue-green rollout across 500+ hospitals with zero downtime. 12,000 clinical staff trained in 90 days. Continuous anomaly detection ensures 99.99% uptime.</p></div></div>
    </div>
  </div>
</section>

{/* 06. SCROLL REVEAL GALLERY (BRILIO STYLE) */}
<section id="project-gallery" className="sticky-section-gallery">
    <div className="gallery-scroll-container">
        <div className="gallery-header">
            {/* <span>VISUAL IDENTITY</span> */}
            <h2>Brand Showcase</h2>
            <p>Observe the fluid left-to-right scroll reveal transition on each visual asset.</p>
        </div>

        <div className="stacked-reveal-gallery">
            {/* Image 1 */}
            <div className="reveal-img-container">
                <img src="/Images/Gemini_Generated_Image_39dgf639dgf639dg.png" alt="Brand Asset 01" />
            </div>

            {/* Image 2 */}
            <div className="reveal-img-container">
                <img src="/Images/Gemini_Generated_Image_4wbmmb4wbmmb4wbm.png" alt="Brand Asset 02" />
            </div>

            {/* Image 3 */}
            <div className="reveal-img-container">
                <img src="/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png" alt="Brand Asset 03" />
            </div>

            {/* Image 4 */}
            <div className="reveal-img-container">
                <img src="/Images/Gemini_Generated_Image_5iyked5iyked5iyk.png" alt="Brand Asset 04" />
            </div>
        </div>
    </div>

  <div className="lb" id="lb">
    <button className="lb-x" id="lb-x" type="button" aria-label="Close gallery lightbox">✕</button>
    <button className="lb-nav lb-prev" id="lb-prev" type="button" aria-label="Previous gallery image">&lt;</button>
    <div className="lb-stage"><img className="lb-img" id="lb-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="" /><div className="lb-label" id="lb-label">Brand Asset</div><div className="lb-ctr" id="lb-ctr">1 / 4</div></div>
    <button className="lb-nav lb-next" id="lb-next" type="button" aria-label="Next gallery image">&gt;</button>
  </div>
</section>

{/* ══ RESULTS — IMPACT ══ */}
<section className="proj-results" id="results">
  <div className="wrap impact-showcase">
    <h2 className="impact-title rv">Impact <span className="muted">Results</span></h2>
    <div className="impact-card-grid" aria-label="Impact result metrics">
      <div className="impact-metric-card rv" style={{ transitionDelay: ".1s" }} aria-label="Improved diagnostic errors from ten times to forty percent fewer errors">
        <span className="impact-metric-label">Diagnostic Errors</span>
        <div className="impact-metric-row">
          <span className="impact-value-group"><span className="impact-before-label">Before</span><span className="impact-before">10×</span></span>
          <span className="impact-arrow" aria-hidden="true">→</span>
          <span className="impact-value-group"><span className="impact-after-label">After</span><span className="impact-after counter" data-t="40" data-s="%">40%</span></span>
        </div>
      </div>
      <div className="impact-metric-card rv" style={{ transitionDelay: ".16s" }} aria-label="Reporting improved from one times to three times faster">
        <span className="impact-metric-label">Reporting Speed</span>
        <div className="impact-metric-row">
          <span className="impact-value-group"><span className="impact-before-label">Before</span><span className="impact-before">1×</span></span>
          <span className="impact-arrow" aria-hidden="true">→</span>
          <span className="impact-value-group"><span className="impact-after-label">After</span><span className="impact-after counter" data-t="3" data-s="×">3×</span></span>
        </div>
      </div>
      <div className="impact-metric-card rv" style={{ transitionDelay: ".22s" }} aria-label="Annual savings improved from zero million to twelve million dollars">
        <span className="impact-metric-label">Annual Savings</span>
        <div className="impact-metric-row">
          <span className="impact-value-group"><span className="impact-before-label">Before</span><span className="impact-before">$0</span></span>
          <span className="impact-arrow" aria-hidden="true">→</span>
          <span className="impact-value-group"><span className="impact-after-label">After</span><span className="impact-after counter" data-p="$" data-t="12" data-s="M">$12M</span></span>
        </div>
      </div>
      <div className="impact-metric-card rv" style={{ transitionDelay: ".28s" }} aria-label="Hospital rollout improved from one hospital to five hundred plus hospitals">
        <span className="impact-metric-label">Hospitals Connected</span>
        <div className="impact-metric-row">
          <span className="impact-value-group"><span className="impact-before-label">Before</span><span className="impact-before">1</span></span>
          <span className="impact-arrow" aria-hidden="true">→</span>
          <span className="impact-value-group"><span className="impact-after-label">After</span><span className="impact-after counter" data-t="500" data-s="+">500+</span></span>
        </div>
      </div>
    </div>
    {/* <p className="impact-copy rv" style={{ transitionDelay: ".18s" }}>Fewer diagnostic errors after launching the AI-assisted healthcare platform.</p> */}
  </div>
</section>

{/* Project Previous / Next */}
<div className="project-switcher" aria-label="Project navigation">
  <a className="project-switch project-prev" id="projectPrev" href={`/project/${prevId}`} aria-label="Previous project">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 20 8 12 16 4"></polyline></svg>
  </a>
  <a className="project-switch project-next" id="projectNext" href={`/project/${nextId}`} aria-label="Next project">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 20 16 12 8 4"></polyline></svg>
  </a>
</div>

{/* ══ SIMILAR ══ */}
<section className="proj-similar" id="similar">
  <div className="wrap">
    {/* <div className="sec-label rv"><span className="dot"></span> More Case Studies</div> */}
    <h2 className="sec-h2 rv" style={{ transitionDelay: ".1s" }}>Explore <span className="grad">related work</span></h2>
    <div className="sim-grid">
      <a href="/project/seo" className="project-card">
        <div className="card-visual">
          <div className="card-image-wrapper">
            <img src="/Images/Gemini_Generated_Image_7pjuoj7pjuoj7pju.png" alt="OrganicBoost SEO Campaign" loading="lazy" />
            <div className="card-overlay">
              <div className="overlay-content">
                <span className="overlay-category">SEO</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-info">
          <h3 className="card-title">OrganicBoost SEO Campaign</h3>
          <div className="meta-container">
            <div className="card-tags">
              <span className="tag">SEO</span>
              <span className="tag">Branding</span>
            </div>
            <div className="show-project-view">Show Project</div>
          </div>
        </div>
      </a>
      <a href="/project/ecommerce" className="project-card">
        <div className="card-visual">
          <div className="card-image-wrapper">
            <img src="/Images/Gemini_Generated_Image_56kvyt56kvyt56kv.png" alt="LuxeStore Commerce" loading="lazy" />
            <div className="card-overlay">
              <div className="overlay-content">
                <span className="overlay-category">UI/UX</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-info">
          <h3 className="card-title">LuxeStore Commerce</h3>
          <div className="meta-container">
            <div className="card-tags">
              <span className="tag">UI/UX</span>
              <span className="tag">E-commerce</span>
            </div>
            <div className="show-project-view">Show Project</div>
          </div>
        </div>
      </a>
      <a href="/project/branding" className="project-card">
        <div className="card-visual">
          <div className="card-image-wrapper">
            <img src="/Images/Gemini_Generated_Image_9hy5999hy5999hy5.png" alt="Zenith Realty Rebrand" loading="lazy" />
            <div className="card-overlay">
              <div className="overlay-content">
                <span className="overlay-category">Branding</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-info">
          <h3 className="card-title">Zenith Realty Rebrand</h3>
          <div className="meta-container">
            <div className="card-tags">
              <span className="tag">Branding</span>
              <span className="tag">Web Design</span>
            </div>
            <div className="show-project-view">Show Project</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>

{/* ══ BACK HOME ══ */}
{/* <div className="back-bar"><a href="/" className="back-btn"><i className="fa-solid fa-arrow-left"></i> Back to Home</a></div> */}

{/* ══ EXIT INTENT MODAL OVERLAY ══ */}
<div id="back-form-modal" className="modal-overlay">
  <div className="modal-card">
    <button className="modal-close" id="modalCloseBtn" aria-label="Close form">&times;</button>
    <h2 className="modal-title">Want your Brand to stand out? <span className="grad">Contact Us</span></h2>
    <form id="modal-contact-form" className="modal-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mod-name" className="form-label">Name</label>
          <input type="text" id="mod-name" className="form-line-input" required placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label htmlFor="mod-email" className="form-label">Email</label>
          <input type="email" id="mod-email" className="form-line-input" required placeholder="Your Email" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mod-phone" className="form-label">Phone Number</label>
          <input type="tel" id="mod-phone" className="form-line-input" required placeholder="Your Phone Number" />
        </div>
        <div className="form-group">
          <label htmlFor="mod-web" className="form-label">Website Link (Optional)</label>
          <input type="url" id="mod-web" className="form-line-input" placeholder="https://example.com" />
        </div>
      </div>
      <div className="form-group full-width">
        <span className="form-label">Looking For <span className="required">*</span></span>
        <div className="checkbox-grid">
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="Website Development" />
            <span className="custom-checkbox"></span>
            Website Development
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="Branding" />
            <span className="custom-checkbox"></span>
            Branding
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="SEO" />
            <span className="custom-checkbox"></span>
            SEO
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="Social Media Management" />
            <span className="custom-checkbox"></span>
            Social Media Management
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="Digital Activation" />
            <span className="custom-checkbox"></span>
            Digital Activation
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="Content" />
            <span className="custom-checkbox"></span>
            Content
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="Corporate Videos & Photos" />
            <span className="custom-checkbox"></span>
            Corporate Videos & Photos
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="WhatsApp for Business" />
            <span className="custom-checkbox"></span>
            WhatsApp for Business
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="AI based Chat Bot" />
            <span className="custom-checkbox"></span>
            AI based Chat Bot
          </label>
          <label className="check-item">
            <input type="checkbox" name="looking_for" value="Advertisement" />
            <span className="custom-checkbox"></span>
            Advertisement (PPC, Fb & Insta Ads, Lead Gen)
          </label>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
        <button type="submit" className="btn-primary form-submit-btn">ENQUIRE NOW</button>
        <button type="button" className="modal-cancel-link" id="modalCancelBtn">No thanks, continue to Homepage</button>
      </div>
    </form>
    <div id="modal-success-message" className="form-success-container" style={{ display: "none" }}>
      <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
      <h3>Thank You!</h3>
      <p>Your enquiry has been submitted successfully. We will get back to you shortly.</p>
    </div>
  </div>
</div>

    </>
  );
}
