export const projectCustomCss = `
/* ═══════════════════════════════════════
     REVTI DIGITAL — PROJECT PAGE v4
     Fixed cursor · One-line heading · Video section
  ═══════════════════════════════════════ */
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html, body { scroll-behavior:smooth; overflow-x:hidden; cursor:none !important; }

  :root {
    --bg:#08080e; --bg2:#0d0d18; --bg3:#12121f;
    --glass:rgba(255,255,255,0.04); --glass2:rgba(255,255,255,0.08);
    --purple:#ffffff; --purple-lt:#d1d5db;
    --blue:#ffffff; --blue-lt:#d1d5db;
    --cyan:#ffffff; --cyan-lt:#d1d5db;
    --grad:linear-gradient(135deg,#ffffff,#b8bcc5);
    --txt:#f8f8f8; --txt2:#a8adb7; --txt3:#686d78;
    --border:rgba(255,255,255,0.12);
    --font:'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    --ease:cubic-bezier(0.4,0,0.2,1);
  }

  body { font-family:var(--font); background:var(--bg); color:var(--txt); -webkit-font-smoothing:antialiased; }
  /* Keep the case study locked to the dark brand theme regardless of OS preference. */
  /* FORCE cursor none everywhere */
  *, *::before, *::after { cursor:none !important; }
  html { cursor:none !important; }
  a, button, input, textarea, select, [role="button"] { cursor:none !important; }

  ::selection { background:rgba(124,58,237,.3); }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-thumb { background:var(--grad); border-radius:3px; }

  /* ══ CUSTOM CURSOR — fixed z-index & visibility ══ */
  #cur-dot {
    position: fixed;
    width: 8px; height: 8px;
    background: #06b6d4;
    border-radius: 50%;
    pointer-events: none;
    z-index: 2147483647; /* max z-index */
    top: 0; left: 0;
    transform: translate(-50%, -50%);
    will-change: transform;
    transition: width .2s, height .2s, background .2s;
  }
  #cur-ring {
    position: fixed;
    width: 36px; height: 36px;
    border: 1.5px solid rgba(124,58,237,.55);
    border-radius: 50%;
    pointer-events: none;
    z-index: 2147483646;
    top: 0; left: 0;
    transform: translate(-50%, -50%);
    will-change: transform;
    transition: width .3s var(--ease), height .3s var(--ease), border-color .3s, background .3s;
  }
  #cur-ring.h { width:54px; height:54px; border-color:var(--cyan); background:rgba(6,182,212,.05); }

  #prog { position:fixed; top:0; left:0; height:2px; width:0; background:var(--grad); z-index:2147483645; }

  /* ══ NAV ══ */
  .nav { position:fixed; top:0; left:0; right:0; z-index:9000; padding:22px 0; transition:all .4s; }
  .nav.sc { padding:14px 0; background:rgba(8,8,14,.9); backdrop-filter:blur(24px); border-bottom:1px solid var(--border); }
  .nav-in { max-width:1320px; margin:0 auto; padding:0 48px; display:flex; align-items:center; justify-content:space-between; }
  .logo { display:flex; align-items:center; gap:11px; text-decoration:none; color:var(--txt); }
  .logo-i { width:36px; height:36px; background:var(--grad); border-radius:9px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:16px; color:#fff; box-shadow:0 4px 18px rgba(124,58,237,.4); }
  .logo-t { font-size:18px; font-weight:700; letter-spacing:-.02em; }
  .logo-t span { color:var(--cyan); }
  .nav-links { display:flex; gap:32px; list-style:none; }
  .nav-links a { font-size:14px; font-weight:500; color:var(--txt2); text-decoration:none; transition:color .2s; }
  .nav-links a:hover { color:var(--txt); }
  .nav-back { display:inline-flex; align-items:center; gap:8px; padding:9px 20px; border-radius:99px; background:var(--glass); border:1px solid var(--border); font-size:13px; font-weight:500; color:var(--txt2); text-decoration:none; transition:all .3s; backdrop-filter:blur(10px); }
  .nav-back:hover { border-color:rgba(124,58,237,.4); color:var(--txt); transform:translateX(-2px); }
  .ham { display:none; flex-direction:column; gap:5px; padding:6px; background:transparent !important; border:none !important; outline:none !important; cursor:none !important; }
  .ham span { display:block; width:22px; height:2px; background:var(--txt2) !important; border-radius:2px; transition:all .3s; }
  .ham.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .ham.open span:nth-child(2) { opacity:0; }
  .ham.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
  .mob-nav { position:fixed; top:0; right:0; bottom:0; width:300px; height:100vh; background:rgba(8, 8, 14, 0.98); backdrop-filter:blur(24px); border-left:1px solid rgba(255, 255, 255, 0.08); z-index:8999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:32px; transform:translateX(100%); transition:transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
  .mob-nav.open { transform:translateX(0); }
  .mob-nav a { font-size:24px; font-weight:700; color:var(--txt2); text-decoration:none; transition:color 0.3s ease; }
  .mob-nav a:hover { color:var(--txt); }

  .wrap { max-width:1320px; margin:0 auto; padding:0 48px; }

  /* ══ HERO — CENTERED, ONE-LINE HEADING ══ */
  .proj-hero {
    min-height: 84vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--bg);
    text-align: center;
  }
  .hero-mesh { position:absolute; inset:0;}
  .hero-grid-bg { position:absolute; inset:0;}
  .hero-wm { position:absolute; right:-40px; bottom:-60px; font-size:clamp(160px,20vw,300px); font-weight:900; letter-spacing:-.05em; color:rgba(255,255,255,.022); pointer-events:none; user-select:none; line-height:1; }
  .orb { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; animation:orb-f 10s ease-in-out infinite; }
  @keyframes orb-f { 0%,100%{transform:translate(0,0);} 50%{transform:translate(15px,-15px);} }

  .proj-hero-content { position:relative; z-index:2; padding:120px 48px 64px; max-width:1100px; margin:0 auto; width:100%; }

  /* Breadcrumb */
  .breadcrumb { display:flex; align-items:center; justify-content:center; gap:8px; font-size:12px; color:var(--txt3); margin-bottom:28px; list-style:none; flex-wrap:wrap; }
  .breadcrumb a { color:var(--txt3); text-decoration:none; transition:color .2s; }
  .breadcrumb a:hover { color:var(--txt2); }
  .breadcrumb li::after { content:'/'; margin-left:8px; }
  .breadcrumb li:last-child::after { display:none; }
  .breadcrumb li:last-child { color:var(--txt2); }

  /* Category pill */
  .proj-cat-pill { display:inline-flex; align-items:center; gap:8px; padding:7px 18px; border-radius:99px; margin-bottom:24px; background:rgba(124,58,237,.1); border:1px solid rgba(124,58,237,.22); font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--purple-lt); animation:fu .7s both .2s; }

  /* ONE-LINE HEADING — auto-scales with viewport */
  .proj-h1 {
    font-size: clamp(28px, 4.8vw, 72px);
    font-weight: 900;
    letter-spacing: -.04em;
    line-height: 1.0;
    white-space: nowrap;
    margin-bottom: 24px;
    animation: fu .8s both .35s;
  }
  .grad { background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* Sub-description */
  .proj-sub { font-size:clamp(14px,1.4vw,17px); color:var(--txt2); max-width:580px; margin:0 auto 48px; line-height:1.75; animation:fu .8s both .5s; }

  /* Meta — 4 items, centered */
  .proj-meta-row { display:flex; align-items:flex-start; justify-content:center; gap:0; border-top:1px solid var(--border); padding-top:36px; flex-wrap:wrap; animation:fu .8s both .65s; }
  .meta-item { padding:0 36px; border-right:1px solid var(--border); text-align:center; }
  .meta-item:last-child { border-right:none; }
  .meta-label { font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--txt3); margin-bottom:8px; display:block; }
  .meta-value { font-size:15px; font-weight:600; color:var(--txt); display:block; }

  @keyframes fu { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:none;} }

  /* ══ OVERVIEW ══ */
  .proj-overview { padding:100px 0; background:var(--bg2); overflow:hidden; }
  .overview-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
  .ov-big { font-size:clamp(18px,2.8vw,38px); font-weight:800; letter-spacing:-.02em; line-height:1.3; margin-bottom:24px; word-break:break-word; overflow-wrap:anywhere; }
  .ov-p { font-size:15px; color:var(--txt2); line-height:1.8; margin-bottom:16px; word-break:break-word; overflow-wrap:anywhere; max-width:100%; }
  .tech-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:24px; padding-top:24px; border-top:1px solid var(--border); }
  .tech-t { display:flex; align-items:center; gap:7px; padding:7px 14px; background:var(--glass); border:1px solid var(--border); border-radius:8px; font-size:12px; font-weight:600; transition:all .3s; word-break:break-word; }
  .tech-t:hover { background:var(--glass2); border-color:rgba(124,58,237,.3); transform:translateY(-2px); }
  .tech-t span { font-size:16px; }
  .ov-cards { display:flex; flex-direction:column; gap:14px; }
  .ov-card { display:flex; align-items:flex-start; gap:16px; padding:20px 22px; background:var(--glass); border:1px solid var(--border); border-radius:16px; transition:all .3s; }
  .ov-card:hover { background:var(--glass2); border-color:rgba(124,58,237,.25); }
  .ov-icon { width:40px; height:40px; flex-shrink:0; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:17px; }
  .ov-text { min-width:0; flex:1; }
  .ov-text h4 { font-size:14px; font-weight:600; margin-bottom:4px; word-break:break-word; }
  .ov-text p { font-size:12px; color:var(--txt3); line-height:1.55; word-break:break-word; overflow-wrap:anywhere; }

  /* ══ PROCESS ══ */
  .proj-process { padding:100px 0; background:var(--bg); }
  .timeline { position:relative; }
  .timeline::before { content:''; position:absolute; left:27px; top:0; bottom:0; width:2px; background:linear-gradient(to bottom,var(--purple),var(--cyan)); border-radius:2px; }
  .tl-item { display:grid; grid-template-columns:56px 1fr; gap:28px; margin-bottom:44px; }
  .tl-item:last-child { margin-bottom:0; }
  .tl-dot { width:56px; height:56px; border-radius:50%; background:var(--bg3); border:2px solid var(--purple); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; z-index:1; box-shadow:0 0 20px rgba(124,58,237,.2); transition:all .3s; position:relative; }
  .tl-item:hover .tl-dot { border-color:var(--cyan); box-shadow:0 0 28px rgba(6,182,212,.28); transform:scale(1.08); }
  .tl-body { padding:22px 26px; background:var(--glass); border:1px solid var(--border); border-radius:16px; transition:all .3s; }
  .tl-item:hover .tl-body { background:var(--glass2); border-color:rgba(124,58,237,.2); }
  .tl-step { font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--purple-lt); margin-bottom:6px; }
  .tl-title { font-size:clamp(16px,2vw,22px); font-weight:700; letter-spacing:-.01em; margin-bottom:8px; }
  .tl-text { font-size:14px; color:var(--txt2); line-height:1.75; }

  /* ══ VIDEO SECTION ══ */
  .proj-video { padding:100px 0; background:var(--bg2); }
  .video-wrap { margin-top:48px; position:relative; }

  /* Player container */
  .video-player {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    background: var(--bg3);
    border: 1px solid var(--border);
    box-shadow: 0 40px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(124,58,237,.06);
    aspect-ratio: 16/9;
  }

  /* Thumbnail / preview state */
  .video-thumb {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(124,58,237,.18), rgba(37,99,235,.12), rgba(6,182,212,.1));
    font-size: clamp(60px,10vw,120px);
    transition: filter .3s;
    z-index: 1;
  }
  .video-player:hover .video-thumb { filter:brightness(.7); }

  /* Animated gradient bg for video */
  .video-bg-anim {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 60% at 30% 40%, rgba(124,58,237,.25), transparent),
                radial-gradient(ellipse 50% 50% at 70% 60%, rgba(37,99,235,.18), transparent);
    animation: vbg 8s ease-in-out infinite alternate;
    z-index: 0;
  }
  @keyframes vbg { from{opacity:.6;transform:scale(1);} to{opacity:1;transform:scale(1.05);} }

  /* Play button */
  .video-play-btn {
    position: absolute; top:50%; left:50%;
    transform: translate(-50%,-50%);
    width: 80px; height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(16px);
    border: 2px solid rgba(255,255,255,.25);
    display: flex; align-items:center; justify-content:center;
    font-size: 26px; color: #fff;
    z-index: 2;
    transition: all .35s var(--ease);
  }
  .video-player:hover .video-play-btn {
    background: var(--grad);
    border-color: transparent;
    transform: translate(-50%,-50%) scale(1.12);
    box-shadow: 0 0 48px rgba(124,58,237,.5);
  }
  .video-play-btn i { margin-left: 3px; }

  /* Video duration badge */
  .video-duration {
    position: absolute; bottom:20px; right:20px; z-index:2;
    padding:5px 12px; border-radius:99px;
    background:rgba(0,0,0,.55); backdrop-filter:blur(10px);
    font-size:12px; font-weight:600; color:#fff;
    border:1px solid rgba(255,255,255,.12);
  }

  /* Chapter bars (decorative) */
  .video-chapters {
    position: absolute; bottom:20px; left:20px; z-index:2;
    display:flex; gap:4px; align-items:flex-end;
  }
  .chapter-bar {
    width:3px; border-radius:2px; background:rgba(255,255,255,.3);
    transition:height .3s, background .3s;
  }
  .chapter-bar.active { background:var(--cyan); }

  /* Iframe embed (hidden by default) */
  .video-iframe-wrap { position:absolute; inset:0; z-index:3; display:none; border-radius:24px; overflow:hidden; }
  .video-iframe-wrap iframe { width:100%; height:100%; border:none; display:block; }

  /* Video metadata row */
  .video-meta {
    display:flex; align-items:center; justify-content:space-between;
    margin-top:20px; flex-wrap:wrap; gap:12px;
  }
  .video-meta-left { display:flex; align-items:center; gap:14px; }
  .video-title-sm { font-size:15px; font-weight:700; }
  .video-sub-sm { font-size:12px; color:var(--txt3); }
  .video-meta-right { display:flex; gap:10px; }
  .video-action-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 16px; border-radius:99px;
    background:var(--glass); border:1px solid var(--border);
    font-size:12px; font-weight:600; color:var(--txt2);
    text-decoration:none; transition:all .3s;
  }
  .video-action-btn:hover { background:var(--glass2); color:var(--txt); border-color:rgba(124,58,237,.3); }

  /* ══ PROJECT REEL ══ */
  .project-reel-section {
    padding: clamp(72px, 8vw, 112px) 0;
    background:
      radial-gradient(circle at 78% 18%, rgba(124,58,237,.12), transparent 34%),
      radial-gradient(circle at 18% 82%, rgba(6,182,212,.10), transparent 34%),
      var(--bg);
    border-top: 1px solid rgba(255,255,255,.06);
    border-bottom: 1px solid rgba(255,255,255,.06);
    overflow: hidden;
  }

  .project-reel-inner {
    width: min(100%, 1180px);
    margin: 0 auto;
    padding: 0 clamp(18px, 4vw, 60px);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 420px);
    gap: clamp(34px, 6vw, 86px);
    align-items: center;
  }

  .project-reel-inner--media-only {
    grid-template-columns: minmax(0, 420px);
    justify-content: center;
  }

  .project-reel-content {
    min-width: 0;
  }

  .project-reel-title {
    margin: 0;
    color: var(--txt);
    font-size: clamp(42px, 7vw, 96px);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -.07em;
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .project-reel-description {
    max-width: 620px;
    margin: clamp(18px, 3vw, 28px) 0 0;
    color: var(--txt2);
    font-size: clamp(15px, 1.4vw, 18px);
    line-height: 1.8;
    overflow-wrap: anywhere;
  }

  .project-reel-canvas {
    position: relative;
    width: min(100%, 420px);
    aspect-ratio: 9 / 16;
    justify-self: center;
    overflow: hidden;
    border-radius: 28px;
    border: 1px solid rgba(255,255,255,.12);
    background:
      linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02)),
      var(--bg3);
    background-position: center;
    background-size: cover;
    box-shadow: 0 28px 90px rgba(0,0,0,.42);
  }

  .project-reel-video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background: #000;
  }

  .project-reel-video:focus-visible {
    outline: 3px solid var(--cyan);
    outline-offset: -6px;
  }

  .project-reel-error {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;
    color: var(--txt2);
    font-size: 14px;
    line-height: 1.6;
    background: rgba(5,5,5,.72);
    backdrop-filter: blur(10px);
  }

  /* ══ GALLERY LIGHTBOX ══ */
  .lb { position:fixed; inset:0; background:rgba(8,8,14,.97); backdrop-filter:blur(28px); z-index:50000; opacity:0; pointer-events:none; transition:opacity .3s; display:flex; align-items:center; justify-content:center; }
  .lb.open { opacity:1; pointer-events:all; }
  .lb-stage { width:min(92vw,1100px); text-align:center; }
  .lb-img { display:block; width:100%; max-height:78vh; object-fit:contain; border-radius:22px; border:1px solid var(--border); box-shadow:0 24px 80px rgba(0,0,0,.55); animation:lbz .4s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes lbz { from{transform:scale(.96);opacity:0;} to{transform:none;opacity:1;} }
  .lb-label { font-size:15px; font-weight:600; color:var(--txt2); margin-top:18px; }
  .lb-ctr { font-size:12px; color:var(--txt3); margin-top:10px; letter-spacing:.1em; }
  .lb-x { position:fixed; top:24px; right:24px; width:44px; height:44px; background:var(--glass); border:1px solid var(--border); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; color:var(--txt); transition:all .3s; z-index:50001; }
  .lb-x:hover { transform:rotate(90deg); background:rgba(255,255,255,.1); }
  .lb-nav { position:fixed; top:50%; transform:translateY(-50%); width:52px; height:52px; background:var(--glass); border:1px solid var(--border); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:22px; color:var(--txt); transition:all .3s; z-index:50001; }
  .lb-nav:hover { background:rgba(124,58,237,.3); border-color:var(--purple-lt); }
  .lb-prev { left:24px; }
  .lb-next { right:24px; }


  /* ══ RESULTS — 4-BENTO ══ */
  .proj-results { padding:100px 0; background:var(--bg2); }
  .bento-grid { display:grid; grid-template-columns:1fr 1fr 1fr; grid-template-rows:auto auto; gap:14px; margin-top:48px; align-items:stretch; }
  .bc1 { grid-column:1; grid-row:1; }
  .bc2 { grid-column:2; grid-row:1; }
  .bc3 { grid-column:3; grid-row:1; }
  .bc4 { grid-column:1/4; grid-row:2; }
  .bento-card { border-radius:22px; background:var(--bg3); border:1px solid var(--border); padding:36px 32px; display:flex; flex-direction:column; position:relative; overflow:hidden; transition:all .4s var(--ease); min-height:220px; }
  .bento-card::before { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:var(--grad); transform:scaleX(0); transform-origin:left; transition:transform .4s var(--ease); }
  .bento-card:hover::before { transform:scaleX(1); }
  .bento-card:hover { transform:translateY(-6px); border-color:rgba(124,58,237,.3); box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 0 1px rgba(124,58,237,.1); }
  .bento-card.bc1 { background:linear-gradient(145deg,rgba(124,58,237,.12),rgba(6,182,212,.06),var(--bg3)); }
  .bento-card.bc4 { background:linear-gradient(145deg,rgba(6,182,212,.1),rgba(37,99,235,.07),var(--bg3)); flex-direction:row; align-items:center; gap:40px; }
  .bento-badge { display:inline-block; padding:4px 12px; border-radius:99px; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; background:rgba(124,58,237,.18); color:var(--purple-lt); border:1px solid rgba(124,58,237,.28); margin-bottom:20px; width:fit-content; }
  .bento-num { font-size:clamp(52px,6vw,80px); font-weight:900; letter-spacing:-.04em; line-height:1; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:12px; display:block; }
  .bento-title { font-size:16px; font-weight:700; margin-bottom:8px; }
  .bento-sub { font-size:13px; color:var(--txt3); line-height:1.6; }
  .ring-wrap { flex-shrink:0; position:relative; width:120px; height:120px; }
  .ring-wrap svg { transform:rotate(-90deg); }
  .ring-bg { stroke:rgba(255,255,255,.08); }
  .ring-bar { stroke-dasharray:314.15; stroke-dashoffset:314.15; transition:stroke-dashoffset 1.5s ease; }
  .ring-val { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:22px; font-weight:800; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .ring-text { flex:1; }
  @media(max-width:768px) { .bento-grid { grid-template-columns:1fr; grid-template-rows:auto; } .bc1,.bc2,.bc3,.bc4 { grid-column:1; grid-row:auto; } .bento-card.bc4 { flex-direction:column; gap:24px; } }

  /* ══ TESTIMONIAL — WHATSAPP ══ */
  .proj-testimonial { padding:100px 0; background:var(--bg); }
  .wa-wrap { display:grid; grid-template-columns:300px 1fr; border-radius:24px; overflow:hidden; border:1px solid var(--border); background:var(--bg3); box-shadow:0 24px 80px rgba(0,0,0,.6); min-height:520px; margin-top:48px; }
  .wa-sidebar { background:rgba(255,255,255,.025); border-right:1px solid var(--border); }
  .wa-sidebar-hdr { padding:20px 20px 14px; border-bottom:1px solid var(--border); }
  .wa-sidebar-hdr h3 { font-size:16px; font-weight:700; }
  .wa-search { padding:10px 16px; margin:12px 14px; background:rgba(255,255,255,.05); border:1px solid var(--border); border-radius:10px; font-size:13px; color:var(--txt); outline:none; font-family:var(--font); width:calc(100% - 28px); }
  .wa-search::placeholder { color:var(--txt3); }
  .wa-list { overflow-y:auto; max-height:380px; }
  .wa-contact { display:flex; align-items:center; gap:12px; padding:14px 18px; border-bottom:1px solid var(--border); transition:background .2s; position:relative; }
  .wa-contact:hover { background:rgba(255,255,255,.04); }
  .wa-contact.active { background:rgba(124,58,237,.1); border-left:2px solid var(--purple); }
  .wa-avatar { width:42px; height:42px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#fff; }
  .wa-contact-info { flex:1; min-width:0; }
  .wa-contact-name { font-size:13px; font-weight:600; margin-bottom:2px; }
  .wa-contact-prev { font-size:11px; color:var(--txt3); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px; }
  .wa-contact-time { font-size:10px; color:var(--txt3); flex-shrink:0; }
  .wa-stars-sm { display:flex; gap:1px; margin-top:2px; }
  .wa-stars-sm span { font-size:9px; color:#f59e0b; }
  .wa-chat-panel { display:flex; flex-direction:column; }
  .wa-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:var(--txt3); }
  .wa-empty-icon { font-size:48px; }
  .wa-empty p { font-size:14px; }
  .wa-chat-content { display:none; flex-direction:column; height:100%; }
  .wa-chat-content.open { display:flex; }
  .wa-chat-hdr { padding:16px 20px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:12px; background:rgba(255,255,255,.025); flex-shrink:0; }
  .wa-chat-hdr-avatar { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#fff; flex-shrink:0; }
  .wa-chat-hdr-name { font-size:14px; font-weight:700; }
  .wa-chat-hdr-role { font-size:11px; color:var(--txt3); }
  .wa-status { margin-left:auto; display:flex; align-items:center; gap:6px; font-size:11px; color:#34d399; }
  .wa-status::before { content:''; width:7px; height:7px; border-radius:50%; background:#34d399; display:block; box-shadow:0 0 8px #34d399; }
  .wa-msgs { flex:1; padding:20px; display:flex; flex-direction:column; gap:12px; overflow-y:auto; background:var(--bg); }
  .wa-msg { display:flex; align-items:flex-end; gap:10px; max-width:78%; }
  .wa-bubble { padding:12px 16px; border-radius:16px 16px 16px 4px; background:var(--bg3); border:1px solid var(--border); font-size:13px; line-height:1.65; color:var(--txt2); }
  .wa-time { font-size:10px; color:var(--txt3); margin-top:4px; }
  .wa-check { font-size:10px; color:var(--cyan); margin-left:4px; }
  .wa-msg.right { align-self:flex-end; flex-direction:row-reverse; max-width:78%; }
  .wa-msg.right .wa-bubble { border-radius:16px 16px 4px 16px; background:rgba(124,58,237,.15); border-color:rgba(124,58,237,.25); color:var(--txt); }
  .wa-stars { display:flex; gap:3px; margin-top:8px; }
  .wa-stars span { color:#f59e0b; font-size:12px; }
  .typing-dots { display:flex; gap:4px; }
  .typing-dots span { width:7px; height:7px; border-radius:50%; background:var(--txt3); animation:tj .9s ease-in-out infinite; }
  .typing-dots span:nth-child(2) { animation-delay:.15s; }
  .typing-dots span:nth-child(3) { animation-delay:.3s; }
  @keyframes tj { 0%,80%,100%{transform:none;} 40%{transform:translateY(-7px);} }
  .wa-input-row { padding:14px 16px; background:var(--bg3); border-top:1px solid var(--border); display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .wa-input { flex:1; padding:10px 16px; background:var(--bg2); border:1px solid var(--border); border-radius:99px; font-size:13px; color:var(--txt); outline:none; font-family:var(--font); }
  .wa-input::placeholder { color:var(--txt3); }
  .wa-send { width:36px; height:36px; border-radius:50%; background:var(--grad); display:flex; align-items:center; justify-content:center; color:#fff; font-size:13px; border:none; box-shadow:0 4px 14px rgba(124,58,237,.35); transition:all .3s; }
  .wa-send:hover { transform:scale(1.1); }
  @media(max-width:768px) { .wa-wrap { grid-template-columns:1fr; } .wa-sidebar { display:none; } }

  /* ══ SIMILAR ══ */
  .proj-similar { padding:100px 0; background:var(--bg2); }
  .sim-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(24px,3vw,36px); margin-top:48px; align-items:stretch; }
  
  .sim-grid .project-card {
    display:flex;
    flex-direction:column;
    text-decoration:none;
    color:inherit;
    position:relative;
    border-radius:20px;
    overflow:hidden;
    background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02));
    border:1px solid rgba(255,255,255,0.08);
    backdrop-filter:blur(20px);
    transition:opacity .4s cubic-bezier(.25,.46,.45,.94),
               transform .4s cubic-bezier(.25,.46,.45,.94),
               border-color .4s cubic-bezier(.22,1,.36,1),
               box-shadow .4s cubic-bezier(.22,1,.36,1);
    will-change:transform,opacity;
  }
  .sim-grid .project-card:hover {
    transform:translateY(-10px);
    border-color:rgba(103,232,249,0.3);
    box-shadow:0 28px 70px rgba(0,0,0,0.5),0 0 36px rgba(6,182,212,0.1);
  }
  .sim-grid .card-visual {
    position:relative;
    aspect-ratio:4/5;
    width:100%;
    overflow:hidden;
    border-radius:20px;
    background:var(--bg3);
    flex-shrink:0;
  }
  .sim-grid .card-image-wrapper {
    position:relative;
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .sim-grid .card-image-wrapper img {
    width:100%;
    height:100%;
    object-fit:cover;
    transition:transform 0.7s cubic-bezier(.22,1,.36,1);
    will-change:transform;
  }
  .sim-grid .project-card:hover .card-image-wrapper img { transform:scale(1.08); }
  .sim-grid .card-overlay {
    position:absolute;
    inset:0;
    background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.8) 100%);
    opacity:0;
    transition:opacity .5s cubic-bezier(.22,1,.36,1);
    display:flex;
    align-items:flex-end;
    padding:24px;
  }
  .sim-grid .project-card:hover .card-overlay { opacity:1; }
  .sim-grid .overlay-content {
    transform:translateY(20px);
    transition:transform .5s cubic-bezier(.22,1,.36,1);
  }
  .sim-grid .project-card:hover .overlay-content { transform:translateY(0); }
  .sim-grid .overlay-category {
    display:inline-block;
    padding:6px 14px;
    background:rgba(124,58,237,0.3);
    border:1px solid rgba(124,58,237,0.5);
    border-radius:99px;
    font-size:11px;
    font-weight:700;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:#fff;
    margin-bottom:12px;
  }
  .sim-grid .card-info { padding:20px; }
  .sim-grid .card-title {
    font-size:clamp(16px,1.8vw,20px);
    font-weight:700;
    color:var(--txt);
    margin:0 0 16px;
    line-height:1.3;
  }
  .sim-grid .card-tags { display:flex; flex-wrap:wrap; gap:8px; margin:0; position:relative; }
  .sim-grid .tag {
    padding:6px 12px;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:99px;
    font-size:10px;
    font-weight:600;
    letter-spacing:.05em;
    text-transform:uppercase;
    color:var(--txt2);
    transition:all .3s ease;
  }
  .sim-grid .project-card:hover .tag {
    background:rgba(124,58,237,0.15);
    border-color:rgba(124,58,237,0.3);
    color:var(--purple-lt);
  }
  .sim-grid .show-project-view {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:.9rem;
    color:#b3b3b3;
    position:absolute;
    top:0; left:0;
    opacity:0;
    transform:translateY(6px);
    transition:opacity .3s ease,transform .3s ease;
    pointer-events:none;
  }
  .sim-grid .show-project-view::after {
    content:'';
    display:inline-block;
    width:24px; height:1px;
    background:#b3b3b3;
  }
  .sim-grid .project-card:hover .card-tags { opacity:0; transform:translateY(-6px); pointer-events:none; }
  .sim-grid .project-card:hover .show-project-view { opacity:1; transform:translateY(0); pointer-events:auto; }
  .sim-grid .meta-container { position:relative; height:32px; width:100%; margin-top:12px; }
  
  @media(max-width:1024px) { .sim-grid { grid-template-columns:repeat(2,1fr); } }
  @media(max-width:640px)  { .sim-grid { grid-template-columns:1fr; gap:20px; } }

  /* ══ BACK HOME ══ */
  .back-bar { padding:56px 0; background:var(--bg); border-top:1px solid var(--border); text-align:center; }
  .back-btn { display:inline-flex; align-items:center; gap:10px; padding:16px 36px; border-radius:99px; background:var(--glass); border:1px solid var(--border); font-size:15px; font-weight:600; color:var(--txt); text-decoration:none; backdrop-filter:blur(10px); transition:all .35s; }
  .back-btn:hover { background:var(--glass2); border-color:rgba(124,58,237,.4); color:var(--purple-lt); transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,.4),0 0 24px rgba(124,58,237,.12); }
  .back-btn i { transition:transform .3s; }
  .back-btn:hover i { transform:translateX(-3px); }

  /* ══ FOOTER ══ */
  .footer { background:var(--bg2); border-top:1px solid var(--border); padding:72px 0 0; }
  .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1.5fr; gap:52px; padding-bottom:52px; }
  .footer-brand p { font-size:14px; color:var(--txt2); line-height:1.75; margin:18px 0 24px; max-width:270px; }
  .soc-row { display:flex; gap:10px; }
  .soc-btn { width:38px; height:38px; background:var(--glass); border:1px solid var(--border); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:15px; color:var(--txt2); text-decoration:none; transition:all .3s; }
  .soc-btn:hover { background:var(--grad); border-color:transparent; color:#fff; transform:translateY(-3px); box-shadow:0 8px 22px rgba(124,58,237,.4); }
  .foot-h { font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--txt3); margin-bottom:18px; }
  .foot-links { display:flex; flex-direction:column; gap:12px; }
  .foot-links a { font-size:14px; color:var(--txt2); text-decoration:none; transition:color .2s; }
  .foot-links a:hover { color:var(--txt); }
  .cr { display:flex; align-items:center; gap:10px; margin-bottom:12px; font-size:13px; color:var(--txt2); }
  .cr a { color:var(--txt2); text-decoration:none; }
  .cr i { color:var(--purple-lt); }
  .foot-bot { border-top:1px solid var(--border); padding:22px 0; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
  .foot-copy { font-size:12px; color:var(--txt3); }
  .foot-leg { display:flex; gap:20px; }
  .foot-leg a { font-size:12px; color:var(--txt3); text-decoration:none; }

  /* Shared helpers */
  .sec-label { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--purple-lt); padding:6px 16px; border-radius:99px; background:rgba(124,58,237,.1); border:1px solid rgba(124,58,237,.2); margin-bottom:14px; }
  .sec-label .dot { width:5px; height:5px; border-radius:50%; background:var(--cyan); box-shadow:0 0 6px var(--cyan); }
  .sec-h2 { font-size:clamp(28px,4vw,52px); font-weight:900; letter-spacing:-.03em; line-height:1.05; }

  .rv { opacity:0; transform:translateY(28px); transition:opacity .7s,transform .7s; }
  .rv.vis { opacity:1; transform:none; }

  @media(max-width:900px) {
    .proj-overview { padding:64px 0; }
    .overview-grid { grid-template-columns:1fr; gap:40px; }
    .ov-big { font-size:clamp(18px,5vw,30px); }
    .proj-meta-row {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 0 !important;
      padding-top: 24px !important;
    }
    .meta-item {
      padding: 14px 10px !important;
      border-right: none !important;
      border-bottom: 1px solid var(--border) !important;
    }
    .meta-item:nth-child(odd) {
      text-align: left !important;
      padding-left: 0 !important;
    }
    .meta-item:nth-child(even) {
      text-align: right !important;
      padding-right: 0 !important;
    }
    /* Remove bottom border on the bottom row of the 2x2 grid */
    .meta-item:nth-child(3),
    .meta-item:nth-child(4) {
      border-bottom: none !important;
    }
    .footer-grid { grid-template-columns:1fr 1fr; gap:36px; }
    .proj-h1 { white-space:normal; }
  }
  @media(max-width:600px) {
    .proj-overview { padding:48px 0; }
    .wrap { padding:0 20px; }
    .nav-in { padding:0 20px; }
    .footer-grid { grid-template-columns:1fr; }
    .foot-bot { flex-direction:column; text-align:center; }
    .nav-links { display:none; }
    .ham { display:flex; }
    .tl-item { grid-template-columns:48px 1fr; gap:16px; }
    .timeline::before { left:23px; }
    .ov-card { padding:14px 16px; gap:12px; }
    .ov-icon { width:36px; height:36px; font-size:14px; }
    .ov-text h4 { font-size:13px; }
    .ov-text p { font-size:11px; }
  }


  /* ===================================== */
  /* SCROLL REVEAL GALLERY */
  /* ===================================== */
  .sticky-section-gallery {
      min-height: auto;
      height: auto;
      width: 100%;
      box-sizing: border-box;
      padding: 120px 4%;
      background-color: var(--bg-primary, var(--bg));
      position: relative;
  }

  .gallery-scroll-container {
      width: 95%;
      max-width: 1200px;
      margin: 0 auto;
  }

  .gallery-header {
      text-align: center;
      margin-bottom: 80px;
  }

  .gallery-header span {
      font-size: 13px;
      letter-spacing: 4px;
      color: var(--accent, var(--cyan));
      font-weight: 700;
      text-transform: uppercase;
  }

  .gallery-header h2 {
      font-family: var(--font-heading, var(--font));
      font-size: clamp(36px, 5vw, 64px);
      color: var(--text-primary, var(--txt));
      margin: 10px 0 15px;
  }

  .gallery-header p {
      font-size: 16px;
      color: var(--text-secondary, var(--txt2));
      max-width: 600px;
      margin: 0 auto;
  }

  .stacked-reveal-gallery {
      display: flex;
      flex-direction: column;
      gap: 80px;
      width: 100%;
  }

  .reveal-img-container {
      width: 100%;
      aspect-ratio: 16 / 10;
      border-radius: 30px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      box-shadow: var(--card-shadow, 0 22px 70px rgba(0,0,0,.42));
  }

  .reveal-img-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transform: scale(1.15); /* Controlled by GSAP */
  }

  @media(max-width: 768px) {
      .stacked-reveal-gallery {
          gap: 40px;
      }
      .reveal-img-container {
          border-radius: 20px;
          aspect-ratio: 4 / 3;
      }
      .sticky-section-gallery {
          padding: 80px 24px;
      }
  }

  .impact-showcase { max-width:1120px; margin:0 auto; display:grid; gap:28px; }
  .impact-title { font-size:clamp(40px,7vw,72px); line-height:1; letter-spacing:-.055em; font-weight:600; color:var(--txt); text-align:center; }
  .impact-title .muted { color:var(--txt2); }
  .impact-card-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:22px; }
  .impact-metric-card { min-height:clamp(190px,24vw,260px); border:2px solid var(--txt); border-radius:42px; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; justify-items:center; gap:clamp(10px,3vw,28px); padding:clamp(24px,4vw,40px); background:var(--bg); color:var(--txt); position:relative; overflow:hidden; }
  .impact-before { position:relative; font-size:clamp(36px,6vw,76px); font-weight:300; color:var(--txt2); letter-spacing:-.08em; }
  .impact-before::after { content:''; position:absolute; left:-12%; right:-12%; top:56%; height:2px; background:var(--txt2); transform:rotate(-9deg); }
  .impact-arrow { font-size:clamp(46px,8vw,96px); line-height:2; color:var(--txt); transform:translateY(-4px); }
  .impact-after { font-size:clamp(42px,7vw,88px); font-weight:400; letter-spacing:-.075em; color:var(--txt); }
  .impact-copy { grid-column:1/-1; text-align:center; color:var(--txt2); font-size:clamp(12px,1.2vw,15px); line-height:1.55; max-width:460px; margin:0 auto; }
  .sec-label, .sec-h2, .ov-big, .proj-h1 {  margin-left:auto; margin-right:auto; }
  @media(max-width:900px){ .impact-card-grid{grid-template-columns:1fr;} }
  @media(max-width:760px){ .impact-metric-card{border-radius:30px; grid-template-columns:1fr; gap:8px;} .impact-arrow{transform:rotate(90deg);} }



  /* Client requested dark editorial pass */
  :root {
    --bg:#050505; --bg2:#050505; --bg3:#0b0b0d;
    --grad:linear-gradient(135deg,#a855f7 0%,#7c3aed 48%,#60a5fa 100%);
    --txt:#ffffff; --txt2:#a8adb7; --txt3:#757b86; --border:rgba(255,255,255,.16);
  }
  body, section, .footer, .proj-overview, .proj-process, .proj-video, .sticky-section-gallery { background:#050505 !important; font-family:var(--font) !important; }
  .proj-h1, .sec-h2, .gallery-header h2, .impact-title { text-align:center !important; font-size:clamp(46px,7.2vw,96px) !important; line-height:1.05 !important; letter-spacing:-.07em !important; font-weight:400 !important; white-space:normal !important; }
  .btn-primary, .back-btn, .nav-back, .video-action-btn { background:#69707d !important; color:#fff !important; border:1px solid rgba(255,255,255,.2) !important; box-shadow:none !important; }
  .btn-primary:hover, .back-btn:hover, .nav-back:hover, .video-action-btn:hover { background:#7b8493 !important; color:#fff !important; box-shadow:none !important; }
  .sticky-section-gallery { padding:clamp(72px,8vw,110px) 4% !important; }
  .stacked-reveal-gallery { gap:18px !important; }
  .reveal-img-container { border-radius:0 !important; box-shadow:none !important; border:1px solid var(--border); }
  .impact-showcase { max-width:1200px; }
  .impact-card-grid { grid-template-columns:repeat(4,minmax(0,1fr)) !important; gap:18px !important; }
  .impact-metric-card { min-height:176px !important; border:1px solid var(--border) !important; border-radius:14px !important; display:block !important; padding:28px 30px !important; background:#080808 !important; }
  .impact-metric-label { display:block; color:var(--txt2); font-size:15px; font-weight:600; margin-bottom:26px; }
  .impact-before-label, .impact-after-label { display:block; font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--txt3); margin-bottom:6px; }
  .impact-metric-row { display:flex; align-items:flex-end; gap:12px; }
  .impact-before { font-size:clamp(22px,2.4vw,30px) !important; font-weight:500 !important; letter-spacing:-.04em !important; color:#5a5a6e !important; opacity:0.75; }
  .impact-before::after { top:55%; height:1.5px; transform:rotate(-7deg); background:#5a5a6e !important; }
  .impact-arrow { font-size:24px !important; color:#c084fc !important; transform:none !important; }
  .impact-after { font-size:clamp(28px,3vw,40px) !important; font-weight:800 !important; letter-spacing:-.05em !important; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .impact-copy { text-align:left !important; margin:0 !important; max-width:none !important; }
  @media(max-width:1024px){ .impact-card-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;} }
  @media(max-width:640px){ .impact-card-grid{grid-template-columns:1fr !important;} }



  /* Align the overview heading with the section content */
  .proj-overview .overview-grid { align-items:center; }
  .proj-overview .sec-h2 { text-align:left !important; margin-bottom:32px !important; }

  /* Reference image-style related-work cards */
  .proj-similar { background:#050505 !important; }
  /* project-card mobile touch rules on project.html */
  @media (hover: none), (max-width: 768px) {
    .sim-grid .card-visual { aspect-ratio: 16/9 !important; }
    .sim-grid .meta-container { position:static !important; height:auto !important; display:flex !important; flex-direction:column !important; gap:12px !important; margin-top:12px !important; }
    .sim-grid .project-card .card-tags { position:static !important; display:flex !important; flex-wrap:wrap !important; opacity:1 !important; transform:none !important; pointer-events:auto !important; }
    .sim-grid .project-card .show-project-view { position:static !important; display:flex !important; opacity:1 !important; transform:none !important; pointer-events:auto !important; font-size:13px; color:rgba(255,255,255,0.55); }
  }

  /* Site-wide neutral typography and controls */
  :root {
    --bg:#050505;
    --bg2:#0b0b0b;
    --bg3:#141414;
    --glass:rgba(255,255,255,.035);
    --glass2:rgba(255,255,255,.07);
    --purple:#f5f5f5;
    --purple-lt:#d7d7d7;
    --blue:#e7e7e7;
    --blue-lt:#d7d7d7;
    --cyan:#f5f5f5;
    --cyan-lt:#d7d7d7;
    --grad:linear-gradient(135deg,#f7f7f7,#8f8f8f);
    --txt:#f4f4f4;
    --txt2:#b8b8b8;
    --txt3:#737373;
    --border:rgba(255,255,255,.16);
    --font:'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  }
  body {
    background:#050505 !important;
    color:var(--txt) !important;
    font-family:var(--font) !important;
  }
  body, p, li, a, button, input, textarea, .pc-tag, .sim-cat, .foot-copy, .foot-links a {
    font-family:var(--font) !important;
    letter-spacing:-0.01em !important;
  }
  h1, h2, h3, h4, h5, h6,
  .hero-h1, .gallery-sec-hdr h2, .sec-h2, .cta-title, .proj-h1, .sim-title, .pc-title {
    font-family:var(--font) !important;
    color:var(--txt) !important;
    font-weight:400 !important;
    letter-spacing:0 !important;
    line-height:1.1 !important;
  }
  .hero-sub, .pc-desc, .sim-sub, .sec-label, .gallery-sec-hdr .eyebrow, .impact-sub,
  .pc-cat, .pc-meta, .foot-h, .foot-copy, .foot-links a, .nav-links a {
    color:var(--txt2) !important;
  }
  .grad, .logo-t span, .impact-num, .impact-after {
    background:none !important;
    -webkit-background-clip:initial !important;
    background-clip:initial !important;
    -webkit-text-fill-color:currentColor !important;
    color:var(--txt2) !important;
  }
  .hero-mesh, .orb, .ey-dot, .scroll-mouse::before, .gallery-sec-hdr .eyebrow::before,
  .sec-label .dot { filter:grayscale(1) !important; box-shadow:none !important; }
  .logo-i, .nav-cta, .btn-primary, .btn-ghost, .back-btn, .nav-back,
  .pc-link, .pc-cta-hover, .wa-send, .soc-btn, .cta-social, .f-btn {
    background:transparent !important;
    background-image:none !important;
    color:var(--txt) !important;
    border:1px solid rgba(255,255,255,.18) !important;
    box-shadow:0 10px 28px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.08) !important;
  }
  .logo-i { color:var(--txt) !important; }
  .btn-primary:hover, .btn-ghost:hover, .nav-cta:hover, .back-btn:hover, .nav-back:hover,
  .pc-link:hover, .pc-cta-hover:hover, .wa-send:hover, .soc-btn:hover, .cta-social:hover {
    color:#fff !important;
    border-color:rgba(255,255,255,.34) !important;
    background:rgba(255,255,255,.035) !important;
    box-shadow:0 16px 38px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,255,255,.12) !important;
  }
  .f-btn {
    border:0 !important;
    box-shadow:none !important;
    color:var(--txt3) !important;
  }
  .f-btn.active, .f-btn:hover { color:var(--txt) !important; }
  .pc-tag, .sim-cat, .pc-cat::before, .sec-label, .gallery-sec-hdr .eyebrow, .hero-ey {
    background:transparent !important;
    background-image:none !important;
    border-color:rgba(255,255,255,.22) !important;
    color:var(--txt2) !important;
    box-shadow:none !important;
  }
  section, .footer, .nav.sc, .impact, .gallery-sec, .proj-similar, .proj-overview, .proj-process,
  .proj-video, .sticky-section-gallery, .back-bar, .contact-cta {
    background-color:#050505 !important;
    background-image:none !important;
  }
  .pc-visual-img, .sim-thumb img, img, video { filter:none !important; }


  /* Impact before/after labels */
  .impact-metric-row {
    align-items:flex-end !important;
    gap:clamp(12px,1.8vw,18px) !important;
  }
  .impact-value-group {
    display:inline-flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-end;
    gap:8px;
    min-width:0;
  }
  .impact-before-label,
  .impact-after-label {
    display:block !important;
    color:var(--txt3) !important;
    font-size:11px !important;
    font-weight:700 !important;
    letter-spacing:.14em !important;
    line-height:1 !important;
    margin:0 !important;
    text-transform:uppercase !important;
  }
  .impact-arrow { color:var(--txt2) !important; line-height:1 !important; padding-bottom:2px; }
  @media(max-width:760px){
    .impact-metric-row { align-items:center !important; }
    .impact-value-group { align-items:center; }
  }


  /* Align impact arrows between before/after values */
  .impact-metric-row {
    display:grid !important;
    grid-template-columns:minmax(56px, max-content) 34px minmax(82px, max-content) !important;
    align-items:end !important;
    justify-content:center !important;
    column-gap:clamp(10px,1.5vw,16px) !important;
  }
  .impact-arrow {
    align-self:end !important;
    display:flex !important;
    align-items:center !important;
    justify-content:center !important;
    height:clamp(30px, 3vw, 40px) !important;
    padding:0 !important;
    line-height:1 !important;
    transform:none !important;
  }
  .impact-value-group { align-self:end !important; }
  @media(max-width:760px){
    .impact-metric-row { grid-template-columns:1fr 34px 1fr !important; width:100%; }
    .impact-value-group:first-child { align-items:flex-end; }
    .impact-value-group:last-child { align-items:flex-start; }
  }


  /*
   * CONTENT SAFE-ZONE
   * Arrow footprint from edge = container-padding + svg-width
   *   ≈ clamp(12px,2vw,32px) + clamp(32px,5vw,80px) = clamp(44px,7vw,112px)
   * Content padding must always be LARGER than that footprint.
   * clamp(90px, 10vw, 150px) guarantees:
   *   @ 769px  → 90px  > ~76px footprint  ✓
   *   @ 1024px → 102px > ~75px footprint  ✓
   *   @ 1280px → 128px > ~96px footprint  ✓
   *   @ 1600px → 150px > ~112px footprint ✓
   */
  .wrap {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 clamp(90px, 10vw, 150px) !important;
  }
  .proj-hero-content {
    position: relative;
    z-index: 2;
    padding: 120px clamp(90px, 10vw, 150px) 64px !important;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }
  .gallery-scroll-container {
    width: 100% !important;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(90px, 10vw, 150px) !important;
  }


  /* ── MOBILE: hide arrows, fix nav, normalise paddings ── */
  @media (max-width: 768px) {
    /* Nav-back button: shrink so it doesn't collide with logo */
    .nav-back {
      font-size: 11px !important;
      padding: 6px 12px !important;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Hero content: comfortable side padding */
    .proj-hero-content {
      padding: 100px 20px 48px !important;
    }

    /* Wrap & gallery: 20px sides */
    .wrap {
      padding: 0 20px !important;
    }
    .gallery-scroll-container {
      padding: 0 20px !important;
    }

    /* Nav inner: tighter on phone */
    .nav-in {
      padding: 0 16px !important;
    }

    /* Reduce large section gaps on mobile */
    .proj-overview,
    .proj-process,
    .proj-video,
    .proj-results,
    .proj-testimonial,
    .proj-similar,
    .proj-impact,
    .sticky-section-gallery {
      padding-top:    clamp(36px, 6vw, 64px) !important;
      padding-bottom: clamp(36px, 6vw, 64px) !important;
    }

    /* Tighten internal wrap vertical rhythm */
    .wrap > * + * {
      margin-top: clamp(24px, 4vw, 48px);
    }
  }


  /* ══ FINAL LETTER-SPACING RESET — must stay last ══
     Wins over every earlier !important negative value  */
  h1, h2, h3, h4, h5, h6,
  .proj-h1,
  .sec-h2,
  .gallery-header h2,
  .ov-big,
  .tl-title,
  .sim-title,
  .impact-title,
  .pc-title,
  .cta-title {
    letter-spacing: 0 !important;
  }

  /* Hide custom cursor on tablets, mobile devices, and touch screens */
  @media (max-width: 1024px), (hover: none), (pointer: coarse) {
    #cur-dot, #cur-ring, .cur-dot, .cur-ring, .cur-view-txt { display: none !important; }
    html, body, *, *::before, *::after { cursor: auto !important; }
  }

  /* ══ EXIT INTENT MODAL & POPUP FORM ══ */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(6, 6, 15, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 2147483640; /* High z-index but below custom cursor */
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s var(--ease);
  }
  .modal-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }
  .modal-card {
    background: rgba(13, 13, 26, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 48px;
    max-width: 680px;
    width: 90%;
    position: relative;
    box-shadow: var(--shadow-glow), 0 20px 50px rgba(0,0,0,0.5);
    transform: scale(0.95) translateY(20px);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .modal-overlay.open .modal-card {
    transform: scale(1) translateY(0);
  }
  .modal-close {
    position: absolute;
    top: 24px; right: 24px;
    background: transparent;
    border: none;
    color: var(--txt2);
    font-size: 28px;
    line-height: 1;
    cursor: none !important;
    transition: color 0.2s;
  }
  .modal-close:hover {
    color: var(--txt);
  }
  .modal-title {
    font-family: var(--font);
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 32px;
    color: var(--txt);
    line-height: 1.2;
  }
  .modal-title .grad {
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 600px) {
    .form-row {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .modal-card {
      padding: 32px 24px;
    }
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }
  .form-group.full-width {
    grid-column: 1 / -1;
  }
  .form-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--txt2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .form-label .required {
    color: #ef4444;
  }
  .form-line-input {
    background: transparent;
    border: none;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.15);
    padding: 10px 0;
    color: var(--txt);
    font-size: 15px;
    font-family: var(--font);
    outline: none;
    cursor: none !important;
    transition: border-color 0.3s var(--ease);
  }
  .form-line-input::placeholder {
    color: var(--txt3);
    opacity: 0.6;
  }
  .form-line-input:focus {
    border-color: #06b6d4;
  }
  
  /* Checkboxes section */
  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 20px;
    margin-top: 8px;
  }
  @media (max-width: 500px) {
    .checkbox-grid {
      grid-template-columns: 1fr;
    }
  }
  .check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--txt2);
    font-size: 14px;
    cursor: none !important;
    user-select: none;
    transition: color 0.2s;
  }
  .check-item:hover {
    color: var(--txt);
  }
  .check-item input[type="checkbox"] {
    display: none;
  }
  .custom-checkbox {
    width: 18px;
    height: 18px;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 4px;
    display: inline-block;
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
  }
  .check-item input[type="checkbox"]:checked + .custom-checkbox {
    border-color: #7c3aed;
    background: rgba(124, 58, 237, 0.2);
  }
  .check-item input[type="checkbox"]:checked + .custom-checkbox::after {
    content: "\f00c";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    font-size: 11px;
    color: var(--txt);
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .form-submit-btn {
    align-self: flex-start;
    padding: 14px 32px;
    border-radius: 99px;
    background: var(--grad);
    border: none;
    color: #08080e !important;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.05em;
    cursor: none !important;
    box-shadow: 0 4px 15px rgba(255,255,255,0.1);
    transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
  }
  .form-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,255,255,0.18);
  }

  /* Success State */
  .form-success-container {
    text-align: center;
    padding: 40px 0;
    animation: fadeIn 0.4s var(--ease);
  }
  .success-icon {
    font-size: 64px;
    color: #10b981;
    margin-bottom: 24px;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
  }
  .form-success-container h3 {
    font-size: 24px;
    margin-bottom: 12px;
    color: var(--txt);
  }
  .form-success-container p {
    color: var(--txt2);
    font-size: 15px;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }


  .modal-cancel-link {
    background: none;
    border: none;
    color: var(--txt2);
    font-size: 13px;
    text-decoration: underline;
    font-family: var(--font);
    cursor: none !important;
    padding: 4px 0;
    align-self: flex-start;
    transition: color 0.2s;
  }
  .modal-cancel-link:hover {
    color: var(--txt);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Dynamic content fitting: centered rows without reserved blank columns. */
  .overview-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)) !important;
  }

  .ov-cards,
  .timeline {
    max-width: 760px;
    margin-inline: auto;
  }

  .impact-card-grid,
  .sim-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 280px)) !important;
    justify-content: center;
    justify-items: stretch;
  }

  .sim-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 360px)) !important;
  }

  .impact-metric-card,
  .sim-grid .project-card {
    width: 100%;
  }

  .stacked-reveal-gallery {
    justify-items: center;
  }

  .reveal-img-container {
    width: min(100%, 1120px);
  }

  .show-project-view:only-child {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  /* Final responsive safety layer for project pages. */
  html,
  body {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  img,
  video,
  canvas,
  svg {
    max-width: 100%;
  }

  section,
  .proj-hero,
  .sticky-section-gallery {
    max-width: 100vw;
  }

  .wrap,
  .nav-in,
  .proj-hero-content,
  .gallery-scroll-container {
    width: min(100%, 1320px);
    padding-inline: clamp(18px, 4vw, 60px) !important;
  }

  .proj-hero-content {
    padding-block: clamp(110px, 14vw, 170px) clamp(48px, 8vw, 80px) !important;
  }

  .proj-h1,
  .sec-h2,
  .impact-title,
  .gallery-header h2,
  .sim-title,
  .card-title {
    overflow-wrap: anywhere;
    text-wrap: balance;
  }

  .overview-grid,
  .impact-card-grid,
  .sim-grid {
    max-width: 100%;
  }

  .impact-metric-card,
  .sim-grid .project-card,
  .ov-card,
  .tl-item {
    min-width: 0;
  }

  .impact-metric-row {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .sticky-section-gallery {
    padding-inline: 0 !important;
  }

  .stacked-reveal-gallery {
    width: 100%;
  }

  .modal-card {
    width: min(94vw, 720px) !important;
    max-height: min(88vh, 760px);
    overflow-y: auto;
  }

  .mob-nav {
    width: min(86vw, 320px);
    z-index: 10000;
    visibility: hidden;
    pointer-events: none;
  }

  .mob-nav.open {
    visibility: visible;
    pointer-events: auto;
  }

  .ham {
    position: relative;
    z-index: 10001;
  }

  .mob-close {
    position: absolute;
    top: 22px;
    right: 22px;
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 999px;
    background: rgba(255,255,255,.04);
    color: var(--txt);
    font-size: 30px;
    line-height: 1;
    cursor: pointer !important;
  }

  .mob-close:hover {
    background: rgba(255,255,255,.10);
  }

  .project-navigation-shell {
    position: fixed;
    inset: 0;
    z-index: 8800;
    pointer-events: none;
    display: grid;
    grid-template-columns: minmax(72px, 9vw) minmax(0, 1fr) minmax(72px, 9vw);
  }

  .project-navigation-rail {
    min-width: 0;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .project-navigation-rail--left {
    grid-column: 1;
    justify-content: center;
  }

  .project-navigation-rail--right {
    grid-column: 3;
    justify-content: center;
  }

  .project-navigation-arrow {
    width: clamp(46px, 5vw, 76px);
    height: clamp(86px, 12vw, 156px);
    display: none;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    color: rgba(255,255,255,.72);
    pointer-events: auto;
    z-index: 200;
    cursor: pointer !important;
    transition: color .25s ease, opacity .25s ease, transform .25s ease;
  }



  @media (min-width: 768px) {
    .project-navigation-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      visibility: visible;
      opacity: 1;
      z-index: 200;
    }
  }

  .project-navigation-arrow:hover,
  .project-navigation-arrow:focus-visible {
    color: #fff;
    transform: scale(1.06);
  }

  .project-navigation-arrow:focus-visible {
    outline: 1px solid rgba(255,255,255,.45);
    outline-offset: 8px;
    border-radius: 999px;
  }

  .project-navigation-arrow:disabled {
    opacity: .35;
    pointer-events: none;
  }

  .project-navigation-arrow-icon {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 0 14px rgba(0,0,0,.45));
  }

  .project-navigation-arrow-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .tl-body,
  .tl-title,
  .tl-text,
  .tl-step {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  @media (hover: none), (pointer: coarse) {
    html,
    body,
    a,
    button,
    input,
    textarea,
    select {
      cursor: auto !important;
    }
  }

  @media (max-width: 1024px) {
    .overview-grid,
    .impact-card-grid,
    .sim-grid {
      grid-template-columns: minmax(0, min(100%, 620px)) !important;
      justify-content: center;
    }

    .proj-overview,
    .proj-process,
    .project-reel-section,
    .proj-results,
    .proj-similar,
    .sticky-section-gallery {
      padding-block: clamp(58px, 10vw, 90px) !important;
    }

    .project-navigation-shell {
      grid-template-columns: 72px minmax(0, 1fr) 72px;
    }
  }

  @media (max-width: 1280px) {
    .proj-overview .wrap,
    .proj-process .wrap,
    .proj-results .wrap,
    .proj-similar .wrap,
    .proj-hero-content,
    .gallery-scroll-container,
    .project-reel-inner {
      padding-left: max(86px, clamp(18px, 4vw, 60px)) !important;
      padding-right: max(86px, clamp(18px, 4vw, 60px)) !important;
    }
  }

  @media (max-width: 767.98px) {
    .project-navigation-shell {
      display: none !important;
    }
  }

  @media (max-width: 768px) {

    .nav-links,
    .nav-back {
      display: none !important;
    }

    .ham {
      display: flex !important;
    }

    .wrap,
    .nav-in,
    .proj-hero-content,
    .gallery-scroll-container,
    .project-reel-inner {
      padding-inline: clamp(16px, 5vw, 24px) !important;
    }

    .proj-h1,
    .sec-h2,
    .project-reel-title,
    .impact-title,
    .gallery-header h2 {
      font-size: clamp(38px, 12vw, 62px) !important;
      line-height: 1.05 !important;
      letter-spacing: -0.055em !important;
    }

    .tl-item {
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 16px;
      width: 100%;
      max-width: 100%;
    }

    .timeline::before {
      left: 21px;
    }

    .tl-dot {
      width: 44px;
      height: 44px;
      font-size: 16px;
    }

    .tl-body {
      padding: 18px;
    }

    .impact-metric-card {
      grid-template-columns: 1fr !important;
      text-align: center;
    }

    .impact-metric-row {
      justify-content: center;
    }

    .project-reel-section {
      padding-block: clamp(58px, 10vw, 86px);
    }

    .project-reel-inner {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: 28px;
      text-align: center;
    }

    .project-reel-description {
      margin-inline: auto;
    }

    .project-reel-canvas {
      width: min(100%, 380px);
      border-radius: 22px;
    }
  }

  @media (min-width: 768px) and (max-width: 1280px) {
    .proj-overview .wrap,
    .proj-process .wrap,
    .proj-results .wrap,
    .proj-similar .wrap,
    .proj-hero-content,
    .gallery-scroll-container,
    .project-reel-inner {
      padding-left: max(86px, clamp(18px, 4vw, 60px)) !important;
      padding-right: max(86px, clamp(18px, 4vw, 60px)) !important;
    }
  }

  @media (max-width: 420px) {
    .wrap,
    .nav-in,
    .proj-hero-content,
    .gallery-scroll-container,
    .project-reel-inner {
      padding-inline: 12px !important;
    }

    .tl-item {
      grid-template-columns: 38px minmax(0, 1fr);
      gap: 14px;
      text-align: left;
    }

    .timeline::before {
      display: block;
      left: 18px;
    }

    .tl-dot {
      width: 38px;
      height: 38px;
      margin-inline: 0;
      font-size: 14px;
    }

    .tl-body {
      padding: 16px;
      border-radius: 14px;
    }

    .sim-grid,
    .impact-card-grid {
      gap: 16px;
    }

    .project-reel-canvas {
      width: min(100%, 340px);
      border-radius: 18px;
    }
  }


  /* Small-screen project detail layout fixes. Keep overview cards and impact metrics readable. */
  @media (max-width: 480px) {
    .proj-overview .wrap,
    .proj-results .wrap {
      width: 100% !important;
      padding-inline: clamp(18px, 6vw, 24px) !important;
    }

    .proj-overview .overview-grid {
      width: 100% !important;
      grid-template-columns: minmax(0, 1fr) !important;
      gap: 34px !important;
      justify-items: stretch !important;
    }

    .proj-overview .sec-h2,
    .proj-overview .ov-big,
    .proj-overview .ov-p {
      max-width: 100% !important;
      text-align: left !important;
    }

    .proj-overview .ov-cards {
      width: 100% !important;
      max-width: 100% !important;
      align-items: stretch !important;
    }

    .proj-overview .ov-card {
      width: 100% !important;
      display: grid !important;
      grid-template-columns: 42px minmax(0, 1fr) !important;
      gap: 14px !important;
      padding: 18px !important;
      border-radius: 16px !important;
    }

    .proj-overview .ov-icon {
      width: 38px !important;
      height: 38px !important;
    }

    .proj-results .impact-card-grid {
      width: 100% !important;
      grid-template-columns: minmax(0, min(100%, 300px)) !important;
      justify-content: center !important;
      justify-items: stretch !important;
      gap: 18px !important;
    }

    .proj-results .impact-metric-card {
      width: 100% !important;
      min-height: 0 !important;
      padding: 28px 22px !important;
      display: grid !important;
      justify-items: center !important;
      text-align: center !important;
      overflow: visible !important;
    }

    .proj-results .impact-metric-label {
      max-width: 100% !important;
      margin-bottom: 24px !important;
      overflow-wrap: anywhere !important;
    }

    .proj-results .impact-metric-row {
      width: auto !important;
      max-width: 100% !important;
      display: grid !important;
      grid-template-columns: max-content 26px max-content !important;
      justify-content: center !important;
      justify-items: center !important;
      align-items: end !important;
      column-gap: 10px !important;
    }

    .proj-results .impact-before-label,
    .proj-results .impact-after-label {
      white-space: nowrap !important;
      word-break: normal !important;
      overflow-wrap: normal !important;
      letter-spacing: .12em !important;
    }

    .proj-results .impact-value-group {
      min-width: 0 !important;
      align-items: center !important;
      text-align: center !important;
    }

    .proj-results .impact-arrow {
      width: 26px !important;
      line-height: 1 !important;
      align-self: end !important;
      transform: none !important;
    }
  }

  @media (min-width: 769px) {
    .mob-nav,
    .mob-nav.open {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  }
  /* Multi-reel project section: backend-driven item grid */
  .project-reel-section .project-reel-inner {
    grid-template-columns: minmax(0, 1fr) !important;
    justify-items: center;
    align-items: start;
  }

  .project-reel-section .project-reel-content {
    width: min(100%, 820px);
    text-align: center;
    margin: 0 auto clamp(30px, 5vw, 58px);
  }

  .project-reel-section .project-reel-description {
    margin-inline: auto;
  }

  .project-reel-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 380px));
    justify-content: center;
    justify-items: stretch;
    gap: clamp(20px, 3vw, 40px);
  }

  .project-reel-item {
    width: 100%;
    min-width: 0;
    display: grid;
    gap: 16px;
  }

  .project-reel-item-copy {
    text-align: center;
    min-width: 0;
  }

  .project-reel-item-title {
    margin: 0;
    color: var(--txt);
    font-size: clamp(18px, 2vw, 26px);
    font-weight: 700;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .project-reel-item-description {
    margin: 8px auto 0;
    max-width: 34rem;
    color: var(--txt2);
    font-size: clamp(13px, 1.2vw, 15px);
    line-height: 1.65;
    overflow-wrap: anywhere;
  }

  .project-reel-item .project-reel-canvas {
    width: 100%;
    max-width: 380px;
  }

  @media (max-width: 640px) {
    .project-reel-grid {
      grid-template-columns: minmax(0, min(100%, 360px));
    }
  }


  /* Process mobile readability: keep the existing rail/dot timeline, but prevent narrow word columns. */
  .project-process-section .wrap {
    max-width: 1100px;
  }

  .project-process-heading {
    max-width: min(100%, 680px);
    margin-inline: auto;
    text-align: center;
    font-size: clamp(32px, 7vw, 72px) !important;
    line-height: 0.98 !important;
    word-break: normal !important;
    overflow-wrap: normal !important;
    hyphens: none !important;
    text-wrap: balance;
  }

  .project-process-timeline {
    width: min(100%, 900px);
    margin-inline: auto;
  }

  .project-process-step {
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    column-gap: 14px;
    align-items: start;
  }

  .project-process-card {
    width: 100%;
    min-width: 0;
  }

  .project-process-card-title,
  .project-process-card-description {
    max-width: 100%;
    min-width: 0;
    word-break: normal !important;
    overflow-wrap: break-word !important;
  }

  .project-process-card-description {
    line-height: 1.65;
  }

  @media (max-width: 600px) {
    .project-process-section {
      padding-inline: 16px;
    }

    .project-process-section .wrap {
      padding-inline: 0 !important;
    }

    .project-process-heading {
      font-size: clamp(30px, 10vw, 44px) !important;
      line-height: 1.02 !important;
      padding-inline: 16px;
      margin-bottom: 38px !important;
    }

    .project-process-step {
      grid-template-columns: 38px minmax(0, 1fr) !important;
      column-gap: 10px !important;
      gap: 10px !important;
    }

    .project-process-timeline::before {
      left: 18px !important;
    }

    .project-process-step .tl-dot {
      width: 38px !important;
      height: 38px !important;
      font-size: 14px !important;
    }

    .project-process-card {
      padding: 18px 16px !important;
      border-radius: 16px !important;
    }

    .project-process-card-title {
      font-size: 16px;
      line-height: 1.3;
    }

    .project-process-card-description {
      font-size: 14px;
      line-height: 1.65;
    }
  }


  .project-video-showcase {
    width: min(100%, 1180px);
    margin-inline: auto;
    padding: clamp(68px, 8vw, 108px) 20px;
    background: var(--bg2) !important;
  }

  .project-video-showcase-copy {
    width: min(100%, 820px);
    margin: 0 auto clamp(28px, 5vw, 52px);
    text-align: center;
  }

  .project-video-heading {
    margin: 0;
    color: var(--txt);
    font-size: clamp(34px, 6vw, 82px);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -.06em;
    text-wrap: balance;
  }

  .project-video-description {
    max-width: 640px;
    margin: clamp(14px, 2.5vw, 24px) auto 0;
    color: var(--txt2);
    font-size: clamp(14px, 1.3vw, 17px);
    line-height: 1.75;
    overflow-wrap: break-word;
  }

  .project-video-showcase-frame {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,.12);
    background: #000;
    box-shadow: 0 34px 96px rgba(0,0,0,.5);
  }

  .project-video-showcase-player {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 0;
    background: #000;
  }

  .project-video-showcase-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--txt);
    text-decoration: none;
    background: var(--bg3);
  }

  @media (max-width: 640px) {
    .project-video-showcase {
      padding: clamp(52px, 10vw, 76px) 16px;
    }

    .project-video-heading {
      font-size: clamp(30px, 11vw, 48px);
      letter-spacing: -.05em;
    }

    .project-video-showcase-frame {
      border-radius: 18px;
    }
  }

  /* Studio Eksaat-style fixed project arrows */
  .project-switcher {
    position: fixed;
    inset: 0;
    z-index: 8800;
    pointer-events: none;
  }

  .project-switch {
    position: fixed;
    top: 50%;
    width: 76px;
    height: 112px;
    min-width: 44px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: #fff;
    background: transparent;
    border: 0;
    border-radius: 0;
    transform: translateY(-50%);
    pointer-events: auto;
    z-index: 8801;
    mix-blend-mode: difference;
    transition: transform .32s var(--ease), opacity .32s var(--ease);
    cursor: pointer !important;
  }

  .project-switch svg {
    width: 54px;
    height: 90px;
    display: block;
    pointer-events: none;
    filter: drop-shadow(0 1px 1px rgba(255,255,255,.08));
  }

  .project-prev { left: max(28px, calc((100vw - 1320px) / 2 - 74px)); }
  .project-next { right: max(28px, calc((100vw - 1320px) / 2 - 74px)); }

  .project-switch:hover,
  .project-switch:focus-visible {
    opacity: .72;
    outline: none;
  }

  .project-prev:hover,
  .project-prev:focus-visible { transform: translateY(-50%) translateX(-5px) scale(1.03); }
  .project-next:hover,
  .project-next:focus-visible { transform: translateY(-50%) translateX(5px) scale(1.03); }

  .project-route-is-transitioning body { opacity: .74; transition: opacity .28s var(--ease); }

  @media (max-width: 768px) {
    .project-switcher { display: none; }
  }

`;
