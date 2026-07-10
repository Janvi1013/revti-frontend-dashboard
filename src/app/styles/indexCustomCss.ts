export const indexCustomCss = `
/* ═══════════════════════════════════════
     REVTI DIGITAL — INDEX v4
     Cinematic Slider + Editorial Gallery
  ═══════════════════════════════════════ */
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html, body { scroll-behavior:smooth; overflow-x:hidden;}

  :root {
    --bg:     #08080e;
    --bg2:    #0d0d18;
    --bg3:    #12121f;
    --glass:  rgba(255,255,255,0.04);
    --glass2: rgba(255,255,255,0.08);
    --purple: #ffffff; --purple-lt: #d1d5db;
    --blue:   #ffffff; --cyan: #ffffff; --cyan-lt: #d1d5db;
    --grad:   linear-gradient(135deg,#ffffff,#b8bcc5);
    --txt:    #f8f8f8; --txt2: #a8adb7; --txt3: #686d78;
    --border: rgba(255,255,255,0.12);
    --font:   'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    --ease:   cubic-bezier(0.4,0,0.2,1);
  }

  body { font-family:var(--font); background:var(--bg); color:var(--txt); -webkit-font-smoothing:antialiased; }
  /* Force the portfolio to stay in the dark brand theme regardless of OS preference. */

  ::selection { background:rgba(124,58,237,.3); }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-thumb { background:var(--grad); border-radius:3px; }

  /* ── CURSOR ── */
  /* .cur-dot  { position:fixed; width:8px; height:8px; background:var(--cyan); border-radius:50%; pointer-events:none; z-index:99999; transform:translate(-50%,-50%); transition:width .2s, height .2s, background .2s; top:0; left:0; }
  .cur-ring { position:fixed; width:36px; height:36px; border:1.5px solid rgba(124,58,237,.55); border-radius:50%; pointer-events:none; z-index:99998; transform:translate(-50%,-50%); transition:width .3s,height .3s,border-color .3s; top:0; left:0; }
  .cur-ring.h { width:56px; height:56px; border-color:var(--cyan); }
  .cur-dot.view { width:60px; height:60px; background:rgba(124,58,237,.85); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; letter-spacing:.05em; }
  .cur-view-txt { position:fixed; z-index:99999; pointer-events:none; font-size:11px; font-weight:700; color:#fff; letter-spacing:.08em; text-transform:uppercase; transform:translate(-50%,-50%); opacity:0; transition:opacity .2s; top:0; left:0; }
  .cur-view-txt.show { opacity:1; } */

  #prog { position:fixed; top:0; left:0; height:2px; width:0; background:var(--grad); z-index:100000; }

  /* ── NAV ── */
  .nav { position:fixed; top:0; left:0; right:0; z-index:9000; padding:22px 0; transition:all .4s; }
  .nav.sc { padding:14px 0; background:rgba(8,8,14,.9); backdrop-filter:blur(24px); border-bottom:1px solid var(--border); }
  .nav-in { max-width:1320px; margin:0 auto; padding:0 48px; display:flex; align-items:center; justify-content:space-between; }
  .logo { display:flex; align-items:center; gap:11px; text-decoration:none; color:var(--txt); }
  .logo-i { width:36px; height:36px; background:var(--grad); border-radius:9px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:16px; color:#fff; box-shadow:0 4px 18px rgba(124,58,237,.4); }
  .logo-t { font-size:18px; font-weight:700; letter-spacing:-.02em; }
  .logo-t span { color:var(--cyan); }
  .nav-links { display:flex; gap:36px; list-style:none; }
  .nav-links a { font-size:14px; font-weight:500; color:var(--txt2); text-decoration:none; transition:color .2s; position:relative; }
  .nav-links a::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1.5px; background:var(--grad); transition:width .3s; }
  .nav-links a:hover { color:var(--txt); }
  .nav-links a:hover::after { width:100%; }
  .nav-cta { padding:10px 24px; border-radius:99px; background:var(--grad); color:#fff; font-size:13px; font-weight:600; text-decoration:none; box-shadow:0 4px 18px rgba(124,58,237,.35); transition:all .3s; }
  .nav-cta:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(124,58,237,.55); }
  .ham { display:none; flex-direction:column; gap:5px; padding:6px; background:transparent !important; border:none !important; outline:none !important; }
  .ham span { display:block; width:22px; height:2px; background:var(--txt2) !important; border-radius:2px; transition:all .3s; }
  .ham.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .ham.open span:nth-child(2) { opacity:0; }
  .ham.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
  .mob-nav { position:fixed; top:0; right:0; bottom:0; width:300px; height:100vh; background:rgba(8,8,14,.98); backdrop-filter:blur(24px); border-left:1px solid rgba(255,255,255,0.08); z-index:8999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:32px; transform:translateX(100%); transition:transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
  .mob-nav.open { transform:translateX(0); }
  .mob-nav a { font-size:24px; font-weight:700; color:var(--txt2); text-decoration:none; transition:color 0.3s ease; }
  .mob-nav a:hover { color:var(--txt); }

  .wrap { max-width:1320px; margin:0 auto; padding:0 48px; }

  /* ── HERO ── */
  .hero { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; background:var(--bg); }
  .hero-mesh { position:absolute; inset:0; background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(124,58,237,.12),transparent),radial-gradient(ellipse 50% 50% at 80% 20%,rgba(37,99,235,.09),transparent),radial-gradient(ellipse 40% 40% at 20% 80%,rgba(6,182,212,.07),transparent); animation:mesh 12s ease-in-out infinite alternate; }
  @keyframes mesh { from{opacity:.7;transform:scale(1);} to{opacity:1;transform:scale(1.04);} }
  .hero-grid-bg { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px); background-size:72px 72px; }
  .orb { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; animation:orb-f 10s ease-in-out infinite; }
  @keyframes orb-f { 0%,100%{transform:translate(0,0);} 50%{transform:translate(20px,-20px);} }
  .hero-content { position:relative; z-index:2; padding-top:80px; text-align:center; max-width:920px; margin:0 auto; }
  .hero-ey { display:inline-flex; align-items:center; gap:8px; padding:7px 18px; border-radius:99px; margin-bottom:36px; background:rgba(124,58,237,.1); border:1px solid rgba(124,58,237,.22); font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--purple-lt); animation:fu .7s both .2s; }
  .ey-dot { width:6px; height:6px; border-radius:50%; background:var(--cyan); box-shadow:0 0 8px var(--cyan); animation:blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
  .hero-h1 { font-size:clamp(38px,6vw,84px); font-weight:900; line-height:.92; letter-spacing:-.04em; margin-bottom:28px; animation:fu .8s both .4s; }
  .grad { background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .hero-sub { font-size:clamp(16px,1.6vw,20px); color:var(--txt2); max-width:560px; line-height:1.75; margin:0 auto 44px; animation:fu .8s both .6s; }
  .hero-btns { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; animation:fu .8s both .8s; }
  .btn-primary { padding:14px 32px; border-radius:99px; background:var(--grad); color:#fff; font-size:15px; font-weight:600; text-decoration:none; box-shadow:0 6px 24px rgba(124,58,237,.4); display:inline-flex; align-items:center; gap:8px; transition:transform .3s,box-shadow .3s; }
  .btn-primary:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(124,58,237,.6); }
  .btn-ghost { padding:14px 32px; border-radius:99px; background:transparent; color:var(--txt); border:1px solid rgba(255,255,255,.12); font-size:15px; font-weight:500; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all .3s; backdrop-filter:blur(10px); }
  .btn-ghost:hover { border-color:var(--purple-lt); color:var(--purple-lt); transform:translateY(-3px); }
  @keyframes fu { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:none;} }
  .scroll-hint { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; z-index:2; animation:fu .8s both 1.1s; }
  .scroll-mouse { width:24px; height:38px; border:1.5px solid rgba(255,255,255,.15); border-radius:12px; display:flex; justify-content:center; padding-top:6px; }
  .scroll-mouse::before { content:''; width:3px; height:7px; background:var(--cyan); border-radius:2px; animation:sd 2s ease-in-out infinite; }
  @keyframes sd { 0%{transform:none;opacity:1;} 100%{transform:translateY(10px);opacity:0;} }
  .scroll-label { font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:var(--txt3); }

  /* ── IMPACT ── */
  /* .impact { padding:80px 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:var(--bg2); }
  .impact-grid { display:grid; grid-template-columns:repeat(4,1fr); }
  .impact-item { padding:36px 30px; border-right:1px solid var(--border); transition:background .3s; }
  .impact-item:last-child { border-right:none; }
  .impact-item:hover { background:rgba(255,255,255,.02); }
  .impact-num { font-size:clamp(36px,4.8vw,64px); font-weight:900; letter-spacing:-.04em; line-height:1; background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:10px; display:block; }
  .impact-label { font-size:13px; font-weight:600; color:var(--txt2); text-transform:uppercase; letter-spacing:.1em; }
  .impact-sub { font-size:12px; color:var(--txt3); margin-top:4px; } */


/* ===========================
   IMPACT SECTION
=========================== */

.impact{
    position:relative;
    padding:50px 0;
    background:
        radial-gradient(circle at top left, rgba(99,102,241,.12), transparent 35%),
        radial-gradient(circle at bottom right, rgba(236,72,153,.10), transparent 35%),
        var(--bg2);
    overflow:hidden;
}

.impact::before{
    content:"";
    position:absolute;
    inset:0;
    background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
    background-size:40px 40px;
    mask-image:linear-gradient(to bottom,transparent,black 20%,black 80%,transparent);
    pointer-events:none;
}

.impact-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:24px;
}

.impact-item{
    position:relative;
    padding:42px 30px;
    text-align:center;

    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    border-radius:22px;

    backdrop-filter:blur(14px);

    transition:.4s ease;
    overflow:hidden;
}

.impact-item::before{
    content:"";
    position:absolute;
    inset:0;
    padding:1px;
    border-radius:22px;
    background:linear-gradient(
        135deg,
        rgba(99,102,241,.6),
        rgba(236,72,153,.6)
    );

    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

    -webkit-mask-composite:xor;
            mask-composite:exclude;

    opacity:0;
    transition:.35s;
}

.impact-item:hover{
    transform:translateY(-10px);
    background:rgba(255,255,255,.06);
    box-shadow:
        0 20px 60px rgba(0,0,0,.35),
        0 0 30px rgba(99,102,241,.15);
}

.impact-item:hover::before{
    opacity:1;
}

.impact-num{
    position:relative;
    display:inline-block;

    font-size:clamp(42px,5vw,70px);
    font-weight:900;
    line-height:1;
    letter-spacing:-2px;

    background:var(--grad);
    background-size:200% auto;

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    animation:gradientMove 5s linear infinite;

    margin-bottom:18px;
}

.impact-num::after{
    content:"";
    position:absolute;
    left:50%;
    top:50%;
    width:110px;
    height:110px;
    transform:translate(-50%,-50%);
    background:rgba(99,102,241,.18);
    filter:blur(45px);
    border-radius:50%;
    z-index:-1;
}

.impact-label{
    font-size:15px;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:.12em;
    color:var(--txt);
    margin-bottom:8px;
}

.impact-sub{
    font-size:14px;
    line-height:1.7;
    color:var(--txt2);
    max-width:220px;
    margin:auto;
}

/* Floating animation */

.impact-item:nth-child(1){
    animation:floatCard 6s ease-in-out infinite;
}

.impact-item:nth-child(2){
    animation:floatCard 6s ease-in-out infinite .4s;
}

.impact-item:nth-child(3){
    animation:floatCard 6s ease-in-out infinite .8s;
}

.impact-item:nth-child(4){
    animation:floatCard 6s ease-in-out infinite 1.2s;
}

@keyframes floatCard{
    0%,100%{
        transform:translateY(0);
    }
    50%{
        transform:translateY(-8px);
    }
}

@keyframes gradientMove{
    to{
        background-position:200% center;
    }
}

/* Responsive */

@media(max-width:991px){

    .impact-grid{
        grid-template-columns:repeat(2,1fr);
    }

}

@media(max-width:640px){

    .impact{
        padding:70px 0;
    }

    .impact-grid{
        grid-template-columns:1fr;
    }

    .impact-item{
        padding:35px 25px;
    }

}


  /* ═══════════════════════════════════════
     CINEMATIC PROJECT SHOWCASE SLIDER
  ═══════════════════════════════════════ */
  .showcase { position:relative; width:100%; height:100vh; min-height:700px; overflow:hidden; background:var(--bg); }

  /* Background layers */
  .ss-bg-layer {
    position:absolute; inset:0;
    opacity:0; pointer-events:none;
    transition:opacity 0s;
    will-change:opacity,transform;
  }
  .ss-bg-layer.active { opacity:1; }
  .ss-bg-emoji {
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center;
    font-size:min(40vw,400px);
    filter:blur(80px); opacity:.18;
    animation:kb 14s ease-in-out infinite alternate;
    transform-origin:center;
  }
  @keyframes kb { from{transform:scale(1);} to{transform:scale(1.12);} }
  .ss-bg-grad {
    position:absolute; inset:0;
    opacity:1;
  }
  /* Dark overlays */
  .ss-overlay {
    position:absolute; inset:0; z-index:1;
    background:linear-gradient(to right, rgba(8,8,14,.92) 0%, rgba(8,8,14,.7) 55%, rgba(8,8,14,.4) 100%),
               linear-gradient(to top, rgba(8,8,14,.8) 0%, transparent 40%);
  }
  /* Grain texture */
  .ss-grain {
    position:absolute; inset:0; z-index:2; opacity:.04; pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat:repeat; background-size:256px;
  }

  /* Main content */
  .ss-content {
    position:absolute; inset:0; z-index:3;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 0 0 10%;
    max-width:760px;
    will-change:transform,opacity;
  }
  .ss-eyebrow {
    font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
    color:var(--purple-lt); margin-bottom:24px;
    display:flex; align-items:center; gap:10px;
    opacity:0; transform:translateY(16px);
  }
  .ss-eyebrow::before { content:''; width:32px; height:1.5px; background:var(--grad); flex-shrink:0; }
  .ss-title-wrap { overflow:hidden; margin-bottom:8px; }
  .ss-title {
    font-size:clamp(38px,6vw,84px);
    font-weight:900; line-height:.96; letter-spacing:-.035em;
    white-space:nowrap;
    opacity:0; transform:translateY(100%);
  }
  .ss-title-line2 {
    font-size:clamp(38px,6vw,84px);
    font-weight:900; line-height:.96; letter-spacing:-.035em;
    color:var(--txt2); font-weight:300;
    white-space:nowrap;
    opacity:0; transform:translateY(100%);
  }
  .ss-desc {
    font-size:clamp(15px,1.4vw,18px); color:var(--txt2); line-height:1.7;
    margin:28px 0 32px; max-width:480px;
    opacity:0; transform:translateY(20px);
  }
  .ss-meta {
    display:flex; align-items:center; gap:0;
    margin-bottom:36px;
    opacity:0; transform:translateY(20px);
  }
  .ss-meta-item {
    padding:0 24px; border-right:1px solid var(--border);
    font-size:12px; color:var(--txt3);
  }
  .ss-meta-item:first-child { padding-left:0; }
  .ss-meta-item:last-child { border-right:none; }
  .ss-meta-label { font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--txt3); margin-bottom:4px; }
  .ss-meta-val { font-size:13px; font-weight:600; color:var(--txt); }
  .ss-cta {
    display:inline-flex; align-items:center; gap:10px;
    padding:14px 30px; border-radius:99px;
    background:var(--glass); border:1px solid var(--border);
    font-size:14px; font-weight:600; color:var(--txt);
    text-decoration:none; backdrop-filter:blur(16px);
    transition:all .3s; width:fit-content;
    opacity:0; transform:translateY(20px);
  }
  .ss-cta:hover { background:var(--glass2); border-color:rgba(124,58,237,.4); transform:translateY(-2px); }
  .ss-cta i { transition:transform .3s; }
  .ss-cta:hover i { transform:translateX(4px); }

  /* Counter */
  .ss-counter {
    position:absolute; top:50%; right:56px; transform:translateY(-50%);
    z-index:5; display:flex; flex-direction:column; align-items:center; gap:12px;
  }
  .ss-count-num { font-size:13px; font-weight:700; color:var(--txt); letter-spacing:.05em; }
  .ss-count-sep { width:1px; height:48px; background:var(--border); }
  .ss-count-total { font-size:13px; font-weight:400; color:var(--txt3); letter-spacing:.05em; }

  /* Progress bar (vertical) */
  .ss-vbar {
    position:absolute; top:50%; right:44px; transform:translateY(-50%);
    z-index:4; width:2px; height:200px;
    background:rgba(255,255,255,.08); border-radius:2px;
    overflow:hidden; display:none;
  }
  .ss-vbar-fill { position:absolute; top:0; left:0; width:100%; background:var(--grad); border-radius:2px; transition:height .6s; }

  /* Dot indicators */
  .ss-dots {
    position:absolute; bottom:48px; left:10%;
    z-index:5; display:flex; gap:8px; align-items:center;
  }
  .ss-dot { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.2); transition:all .4s; }
  .ss-dot.active { width:28px; border-radius:3px; background:var(--grad); }

  /* Arrows */
  .ss-arrow {
    position:absolute; top:50%; transform:translateY(-50%);
    z-index:6; display:flex; align-items:center; gap:14px;
    background:none; border:none; padding:16px;
    color:var(--txt2); transition:all .3s;
  }
  .ss-prev { left:40px; }
  .ss-next { right:40px; flex-direction:row-reverse; }
  .ss-arrow-btn {
    width:52px; height:52px; border-radius:50%;
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
    display:flex; align-items:center; justify-content:center;
    font-size:20px; color:var(--txt); backdrop-filter:blur(10px);
    transition:all .35s var(--ease);
    flex-shrink:0;
  }
  .ss-arrow:hover .ss-arrow-btn { background:rgba(255,255,255,.12); border-color:rgba(124,58,237,.4); transform:scale(1.1); box-shadow:0 0 24px rgba(124,58,237,.2); color:var(--purple-lt); }
  .ss-arrow-info { opacity:0; transform:translateX(10px); transition:all .3s; pointer-events:none; }
  .ss-prev .ss-arrow-info { transform:translateX(-10px); }
  .ss-arrow:hover .ss-arrow-info { opacity:1; transform:none; }
  .ss-arrow-lbl { font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--txt3); margin-bottom:4px; }
  .ss-arrow-title { font-size:13px; font-weight:600; color:var(--txt); max-width:140px; line-height:1.4; }
  .ss-next .ss-arrow-info { text-align:right; }

  /* Project number watermark */
  .ss-num-wm {
    position:absolute; right:12%; top:50%; transform:translateY(-50%);
    font-size:clamp(140px,20vw,280px); font-weight:900;
    color:rgba(255,255,255,.03); line-height:1;
    pointer-events:none; z-index:2; letter-spacing:-.04em;
    user-select:none;
  }

  /* ═══════════════════════════════════════
     EDITORIAL GALLERY SECTION
  ═══════════════════════════════════════ */
  .gallery-sec { padding:120px 0; background:var(--bg); position:relative; }

  /* Section header — matching the reference image */
  .gallery-sec-hdr { text-align:center; margin-bottom:72px; }
  .gallery-sec-hdr .eyebrow {
    display:block; font-size:11px; font-weight:600; letter-spacing:.22em; text-transform:uppercase;
    color:var(--txt3); margin-bottom:20px;
  }
  .gallery-sec-hdr h2 {
    font-size:clamp(52px,9vw,128px); font-weight:900; letter-spacing:-.04em; line-height:.9;
    margin-bottom:20px; white-space:nowrap;
  }
  .gallery-sec-hdr p {
    font-size:16px; color:var(--txt2); margin-bottom:0;
  }

  /* ── Filter ── */
  .filter-outer {
    position:sticky; top:66px; z-index:800;
    padding:14px 0; margin-bottom:60px;
    /* background:rgba(8,8,14,.82); backdrop-filter:blur(24px); */
    /* border-bottom:1px solid var(--border); */
  }
  .filter-bar {
    display:flex; align-items:center; justify-content:center;
    gap:4px; flex-wrap:nowrap; overflow-x:auto;
    padding:4px 48px; position:relative;
    -ms-overflow-style:none; scrollbar-width:none;
  }
  .filter-bar::-webkit-scrollbar { display:none; }
  .filter-ind {
    position:absolute; height:36px; border-radius:99px;
    /* background:linear-gradient(135deg,rgba(124,58,237,.25),rgba(37,99,235,.2),rgba(6,182,212,.15)); */
    /* border:1px solid rgba(124,58,237,.45); */
    /* box-shadow:0 0 18px rgba(124,58,237,.22),0 0 6px rgba(6,182,212,.15); */
    pointer-events:none;
    transition:left .42s cubic-bezier(.22,1,.36,1),width .42s cubic-bezier(.22,1,.36,1),top .42s cubic-bezier(.22,1,.36,1);
    top:50%; transform:translateY(-50%);
  }
  .f-btn {
    position:relative; z-index:1;
    background:none; border:none; outline:none; font-family:var(--font);
    font-size:13px; font-weight:500;
    padding:8px 18px; border-radius:99px; white-space:nowrap;
    transition:color .25s,transform .25s; letter-spacing:.01em; flex-shrink:0;
  }
  .f-btn:hover {  transform:scale(1.04); }
  .f-btn.active { color:#fff; font-weight:700; }
  .f-btn .fc { display:inline-block; margin-left:5px; font-size:10px; opacity:.55; font-weight:400; }

  /* ── Editorial project cards (full-width stacked) ── */
  .proj-stack { display:flex; flex-direction:column; gap:0; }

  .pc {
    display:grid;
    grid-template-columns:1fr 1fr;
    min-height:520px;
    border-top:1px solid var(--border);
    overflow:hidden;
    position:relative;
    transition:border-color .3s;
  }
  .pc:last-child { border-bottom:1px solid var(--border); }
  .pc:hover { border-color:rgba(124,58,237,.25); }

  /* Alternating layout */
  .pc.alt .pc-visual { order:2; }
  .pc.alt .pc-info   { order:1; }

  /* Visual half */
  .pc-visual {
    position:relative; overflow:hidden;
    background:var(--bg3);
  }
  .pc-visual-inner {
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center;
    font-size:min(18vw,180px);
    transition:transform .7s cubic-bezier(0.4,0,0.2,1), filter .4s;
    will-change:transform;
  }
  .pc:hover .pc-visual-inner { transform:scale(1.07); filter:brightness(.7); }
  .pc-visual-img { position:absolute; inset:0; object-fit:cover; width:100%; height:100%; transition:transform .7s cubic-bezier(0.4,0,0.2,1),filter .4s; }
  .pc:hover .pc-visual-img { transform:scale(1.07); filter:brightness(.65); }
  .pc-visual-ov {
    position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(8,8,14,.5),rgba(8,8,14,.1));
    opacity:0; transition:opacity .4s;
  }
  .pc:hover .pc-visual-ov { opacity:1; }
  .pc-cta-hover {
    position:absolute; bottom:32px; left:32px;
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 24px; border-radius:99px;
    background:rgba(255,255,255,.1); backdrop-filter:blur(14px);
    border:1px solid rgba(255,255,255,.2);
    font-size:13px; font-weight:600; color:#fff;
    opacity:0; transform:translateY(10px);
    transition:all .35s; text-decoration:none;
  }
  .pc:hover .pc-cta-hover { opacity:1; transform:none; }

  /* Info half */
  .pc-info {
    padding:60px 72px;
    display:flex; flex-direction:column; justify-content:center;
    position:relative;
  }
  .pc-num {
    font-size:clamp(80px,10vw,130px); font-weight:900; letter-spacing:-.04em; line-height:1;
    position:absolute; top:36px; right:48px;
    color:rgba(255,255,255,.04);
    user-select:none; pointer-events:none;
  }
  .pc-cat {
    display:inline-flex; align-items:center; gap:8px;
    font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase;
    color:var(--purple-lt); padding:5px 14px; border-radius:99px;
    background:rgba(124,58,237,.1); border:1px solid rgba(124,58,237,.2);
    margin-bottom:22px; width:fit-content;
  }
  .pc-title {
    font-size:clamp(28px,3.5vw,52px); font-weight:800; letter-spacing:-.03em; line-height:1.05;
    margin-bottom:18px;
    transform:translateY(0); transition:transform .4s;
  }
  .pc:hover .pc-title { transform:translateY(-4px); }
  .pc-desc { font-size:15px; color:var(--txt2); line-height:1.75; margin-bottom:28px; max-width:420px; }
  .pc-tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
  .pc-tag { padding:5px 14px; border-radius:99px; font-size:11px; font-weight:600; background:var(--glass); border:1px solid var(--border); color:var(--txt2); }
  .pc-meta { display:flex; gap:24px; align-items:center; }
  .pc-meta-item { font-size:12px; color:var(--txt3); }
  .pc-meta-item span { color:var(--txt2); font-weight:500; }
  .pc-link {
    display:inline-flex; align-items:center; gap:8px; margin-top:28px;
    font-size:14px; font-weight:700; color:var(--txt);
    text-decoration:none; width:fit-content;
    padding:0 0 4px; border-bottom:1px solid rgba(255,255,255,.2);
    transition:all .3s;
  }
  .pc-link:hover { color:var(--purple-lt); border-color:var(--purple-lt); }
  .pc-link i { transition:transform .3s; }
  .pc-link:hover i { transform:translateX(5px); }

  /* Hidden for filter */
  .pc.hidden { display:none; }

  /* ── FOOTER ── */
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

  .rv { opacity:0; transform:translateY(28px); transition:opacity .7s,transform .7s; }
  .rv.vis { opacity:1; transform:none; }

  /* ── RESPONSIVE ── */
  @media(max-width:1100px) {
    .pc { grid-template-columns:1fr; min-height:auto; }
    .pc.alt .pc-visual { order:1; }
    .pc.alt .pc-info { order:2; }
    .pc-visual { aspect-ratio:16/9; position:relative; min-height:280px; }
    .pc-info { padding:40px 36px; }
    .pc-num { display:none; }
    .footer-grid { grid-template-columns:1fr 1fr; gap:36px; }
  }
  @media(max-width:768px) {
    .nav-links, .nav-cta { display:none; }
    .ham { display:flex; }
    .wrap { padding:0 20px; }
    .nav-in { padding:0 20px; }
    .impact-grid { grid-template-columns:1fr; }
    .impact-item { border-right:none; border-bottom:1px solid var(--border); padding:32px 24px; }
    .ss-content { padding:0 24px; max-width:100%; }
    .ss-title, .ss-title-line2 { font-size:clamp(34px,9vw,64px); white-space:normal; }
    .ss-arrow { display:none; }
    .ss-counter { right:24px; }
    .gallery-sec-hdr h2 { white-space:normal; font-size:clamp(40px,12vw,80px); }
    .footer-grid { grid-template-columns:1fr; }
    .foot-bot { flex-direction:column; text-align:center; }
    .pc-info { padding:32px 24px; }
  }


  /* ═══════════════════════════════════════
     PREMIUM PROJECT CARD GRID — Awwwards-inspired
  ═══════════════════════════════════════ */
  .gallery-sec {
    padding:clamp(96px,10vw,150px) 0;
    background:#0B0B0F;
    background-image:
      radial-gradient(ellipse 70% 45% at 18% 0%, rgba(124,58,237,.13), transparent 64%),
      radial-gradient(ellipse 55% 42% at 88% 18%, rgba(6,182,212,.09), transparent 60%),
      linear-gradient(180deg,#0B0B0F 0%, #09090d 100%);
    position:relative;
    overflow:hidden;
  }
  .gallery-sec::before { content:''; position:absolute; inset:0; pointer-events:none; opacity:.05; background-image:linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px, transparent 1px); background-size:80px 80px; mask-image:linear-gradient(to bottom, transparent, #000 18%, #000 76%, transparent); }
  .gallery-sec-hdr { width:min(1180px, calc(100% - 48px)); margin:0 auto clamp(42px,6vw,76px); text-align:left; display:grid; grid-template-columns:1.2fr .8fr; gap:32px; align-items:end; position:relative; z-index:1; }
  .gallery-sec-hdr .eyebrow { display:inline-flex; width:max-content; align-items:center; gap:10px; padding:8px 14px; border:1px solid rgba(255,255,255,.11); border-radius:999px; background:rgba(255,255,255,.035); backdrop-filter:blur(18px); color:#a3a3b8; font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; margin-bottom:22px; }
  .gallery-sec-hdr .eyebrow::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--cyan); box-shadow:0 0 16px rgba(6,182,212,.9); }
  .gallery-sec-hdr h2 { font-size:clamp(36px,6.4vw,88px); line-height:.88; letter-spacing:-.065em; font-weight:900; margin:0; white-space:normal; color:#fff; }
  .gallery-sec-hdr p { max-width:380px; margin:0 0 10px auto; color:#8f8fa3; font-size:clamp(14px,1.4vw,17px); line-height:1.75; }
  .filter-outer { position:sticky; top:66px; z-index:800; margin-bottom:clamp(36px,5vw,64px); padding:12px 0; background:rgba(11,11,15,.78); backdrop-filter:blur(24px); border-block:1px solid rgba(255,255,255,.06); }
  .proj-stack { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(22px,2.6vw,36px); align-items:stretch; }
  .pc { display:flex; flex-direction:column; min-height:610px; height:auto; border:1px solid rgba(255,255,255,.085); border-radius:26px; padding:12px; overflow:hidden; position:relative; background:linear-gradient(180deg,rgba(255,255,255,.065),rgba(255,255,255,.025)); box-shadow:0 18px 55px rgba(0,0,0,.38); backdrop-filter:blur(22px); transition:transform .48s cubic-bezier(.22,1,.36,1), border-color .48s cubic-bezier(.22,1,.36,1), box-shadow .48s cubic-bezier(.22,1,.36,1), background .48s cubic-bezier(.22,1,.36,1); cursor:pointer; }
  .pc::after { content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; background:radial-gradient(circle at 50% 0%, rgba(255,255,255,.16), transparent 42%); opacity:.55; transition:opacity .45s; }
  .pc:hover { transform:translate3d(0,-10px,0); border-color:rgba(103,232,249,.34); box-shadow:0 34px 90px rgba(0,0,0,.62), 0 0 42px rgba(6,182,212,.075); background:linear-gradient(180deg,rgba(255,255,255,.085),rgba(255,255,255,.032)); }
  .pc.alt .pc-visual,.pc.alt .pc-info { order:initial; }
  .pc-visual { position:relative; overflow:hidden; height:clamp(250px,22vw,330px); border-radius:20px; background:var(--bg3); flex:none; }
  .pc-visual-img,.pc-visual-inner { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .55s cubic-bezier(.22,1,.36,1), filter .48s cubic-bezier(.22,1,.36,1); will-change:transform; transform:translateZ(0); }
  .pc-visual-inner { display:flex; align-items:center; justify-content:center; font-size:clamp(80px,10vw,150px); }
  .pc:hover .pc-visual-img,.pc:hover .pc-visual-inner { transform:scale(1.05) translateZ(0); filter:brightness(1.08) saturate(1.08); }
  .pc-visual-ov { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.42)); opacity:.7; transition:opacity .45s; }
  .pc-info { padding:22px 6px 8px; background:transparent; min-height:0; display:flex; flex:1; flex-direction:column; }
  .pc-num,.pc-desc,.pc-meta { display:none; }
  .pc-cat { order:2; display:flex; flex-wrap:wrap; gap:8px; margin:14px 0 16px; color:#b8b8c8; font-size:12px; font-weight:600; letter-spacing:.01em; }
  .pc-cat::before { content:'Featured'; padding:6px 11px; border:1px solid rgba(255,255,255,.13); border-radius:999px; color:#a3a3b8; background:rgba(255,255,255,.03); }
  .pc-title { order:1; font-size:clamp(22px,2vw,30px); line-height:1.08; letter-spacing:-.035em; color:#fff; margin:0; overflow-wrap:anywhere; }
  .pc-tags { order:3; display:flex; flex-wrap:wrap; gap:8px; margin:0 0 18px; }
  .pc-tag { padding:7px 11px; border-radius:999px; border:1px solid rgba(255,255,255,.12); color:#9a9aaf; background:rgba(255,255,255,.025); font-size:11px; font-weight:600; }
  .pc-link,.pc-cta-hover { order:4; margin-top:auto; position:relative; display:inline-flex; align-items:center; gap:9px; width:max-content; padding:0 0 5px; border:0; background:transparent; color:#fff; font-size:13px; font-weight:700; text-decoration:none; opacity:1; transform:none; backdrop-filter:none; }
  .pc-link::after,.pc-cta-hover::after { content:''; position:absolute; left:0; bottom:0; height:1px; width:100%; background:linear-gradient(90deg,var(--cyan),var(--purple-lt)); transform:scaleX(.28); transform-origin:left; transition:transform .45s cubic-bezier(.22,1,.36,1); }
  .pc:hover .pc-link::after,.pc:hover .pc-cta-hover::after { transform:scaleX(1); }
  .pc-cta-hover { position:absolute; left:24px; bottom:24px; padding:11px 18px; border:1px solid rgba(255,255,255,.18); border-radius:999px; background:rgba(11,11,15,.42); backdrop-filter:blur(16px); opacity:0; transform:translateY(10px); transition:all .42s cubic-bezier(.22,1,.36,1); }
  .pc:hover .pc-cta-hover { opacity:1; transform:none; }
  @media(max-width:1024px){ .proj-stack{grid-template-columns:repeat(2,minmax(0,1fr));} .gallery-sec-hdr{grid-template-columns:1fr;text-align:left;} .gallery-sec-hdr p{margin:0;}}
  @media(max-width:640px){ .wrap{padding:0 22px;} .proj-stack{grid-template-columns:1fr; gap:24px;} .filter-bar{padding:4px 22px; justify-content:flex-start;} .gallery-sec-hdr{width:calc(100% - 44px);} .pc{border-radius:22px; min-height:0; height:auto;} .pc-visual,.pc:nth-child(n) .pc-visual{height:clamp(280px,88vw,420px); border-radius:17px;} }


  /* Simplified centered headings, full-width clickable cards, Brilio-style filters */
  .gallery-sec-hdr { display:block !important; text-align:center !important; }
  .gallery-sec-hdr .eyebrow { margin-left:auto; margin-right:auto; }
  .gallery-sec-hdr p, .hero-sub, .impact-label, .impact-sub { display:none !important; }
  .filter-outer { position:relative; top:auto; border:0; background:transparent; backdrop-filter:none; }
  .filter-bar { gap:14px; justify-content:center; }
  .filter-ind { display:none; }
  .f-btn { border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.035); color:#a3a3b8; padding:11px 22px; }
  .f-btn.active, .f-btn:hover { color:#fff; border-color:rgba(103,232,249,.45); background:linear-gradient(135deg,rgba(124,58,237,.28),rgba(6,182,212,.16)); transform:none; }
  .pc { padding:0; text-decoration:none; }
  .pc-visual { width:100%; border-radius:26px 26px 0 0; }
  .pc-info { padding:24px; }
  .pc-link { pointer-events:none; }



  /* Neutral theme + reference-style project cards */
  .grad { background:none; -webkit-text-fill-color:currentColor; color:var(--txt2); }
  .hero-ey, .sec-label, .gallery-sec-hdr .eyebrow, .impact-label, .impact-sub, .pc-desc, .pc-meta, .pc-link { display:none !important; }
  .gallery-sec { background:var(--bg); background-image:none; padding:clamp(72px,8vw,118px) 0; }
  .gallery-sec::before { display:none; }
  .gallery-sec-hdr { width:min(1120px, calc(100% - 56px)); margin:0 auto clamp(28px,4vw,48px); display:block !important; text-align:left !important; }
  .gallery-sec-hdr h2 { font-size:clamp(40px,7vw,92px); line-height:.86; letter-spacing:-.085em; font-weight:400; color:var(--txt); white-space:nowrap; }
  .gallery-sec-hdr h2::after { content:' Portfolio'; color:var(--txt2); }
  .filter-outer { display:flex; justify-content:center; position:relative; top:auto; margin:0 auto clamp(36px,5vw,58px); padding:0; border:0; background:transparent; backdrop-filter:none; }
  .filter-bar { width:min(100%, 880px); justify-content:center; gap:clamp(24px,4vw,52px); padding:0 24px 28px; overflow-x:auto; border-bottom:1px solid rgba(255,255,255,.08); }
  .filter-ind { display:none !important; }
  .f-btn { position:relative; border:0; border-radius:0; background:transparent; padding:0 0 14px; color:var(--txt2); font-size:13px; font-weight:800; letter-spacing:.28em; line-height:1; text-transform:uppercase; }
  .f-btn::after { content:''; position:absolute; left:50%; right:50%; bottom:0; height:2px; background:currentColor; transition:left .28s var(--ease), right .28s var(--ease); }
  .f-btn:hover { color:var(--txt); transform:none; }
  .f-btn.active { color:var(--txt); font-weight:900; }
  .f-btn.active::after, .f-btn:hover::after { left:0; right:0; }
  .f-btn .fc { display:none; }
  .proj-stack { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,2vw,28px); }
  .pc { min-height:0; padding:0; border:0; border-radius:0; background:transparent; box-shadow:none; backdrop-filter:none; text-decoration:none; }
  .pc::after, .pc-visual-ov { display:none; }
  .pc:hover { transform:none; border-color:transparent; box-shadow:none; background:transparent; }
  .pc-visual { height:auto; aspect-ratio:4/5; border-radius:7px; background:var(--bg3); overflow:hidden; }
  .pc-visual-img, .pc-visual-inner { border-radius:7px; }
  .pc:hover .pc-visual-img, .pc:hover .pc-visual-inner { transform:none; filter:none; }
  .pc-info { padding:18px 4px 0; display:block; }
  .pc-title { font-size:clamp(18px,1.7vw,22px); line-height:1.08; letter-spacing:-.04em; font-weight:700; color:var(--txt); margin:0 0 12px; }
  .pc-tags { display:flex; flex-wrap:wrap; gap:7px; margin:0; }
  .pc-tag { padding:6px 10px; border-radius:999px; border:1px solid var(--txt); background:transparent; color:var(--txt); font-size:10px; font-weight:800; letter-spacing:.02em !important; text-transform:uppercase; cursor:pointer; transition:all .3s var(--ease); }
  .pc-tag:hover { background:var(--txt); color:var(--bg); transform:scale(1.05); }
  .pc-tag:nth-child(n+3) { display:none; }
  .pc:nth-child(even) .pc-tag { background:transparent; color:var(--txt); }
  .pc-cta-hover { display:none; }
  @media(max-width:1024px){ .proj-stack{grid-template-columns:repeat(2,minmax(0,1fr));} }
  @media(max-width:760px){ .gallery-sec-hdr h2{white-space:normal;} .proj-stack{grid-template-columns:1fr;} .filter-outer{justify-content:center;} .filter-bar{justify-content:flex-start; gap:28px; padding-inline:22px;} .f-btn{font-size:12px; letter-spacing:.2em;} }


  /* Client requested dark editorial pass */
  :root {
    --bg:#050505; --bg2:#050505; --bg3:#0b0b0d;
    --grad:linear-gradient(135deg,#a855f7 0%,#7c3aed 48%,#60a5fa 100%);
    --txt:#ffffff; --txt2:#a8adb7; --txt3:#757b86; --border:rgba(255,255,255,.16);
  }
  body, section, .footer, .gallery-sec, .impact, .showcase { background:#050505 !important; font-family:var(--font) !important; }
  .hero { min-height:92vh; padding:120px 0 80px; }
  .hero-h1, .gallery-sec-hdr h2, .sec-h2, .cta-title {
    text-align:center !important; font-size:clamp(46px,7.2vw,96px) !important; line-height:1.05 !important; letter-spacing:-.07em !important; font-weight:400 !important;
  }
  .hero-sub { display:block !important; max-width:720px; margin:0 auto 34px; color:var(--txt2); }
  .btn-primary, .btn-ghost, .nav-cta, .ss-cta { background:#69707d !important; color:#fff !important; border:1px solid rgba(255,255,255,.2) !important; box-shadow:none !important; }
  .btn-primary:hover, .btn-ghost:hover, .nav-cta:hover, .ss-cta:hover { background:#7b8493 !important; transform:translateY(-2px); box-shadow:none !important; }
  .filter-outer, .filter-bar, .f-btn, .f-btn:hover, .f-btn.active { box-shadow:none !important; }
  .f-btn:hover { text-shadow:none !important; }
  .gallery-sec-hdr { text-align:center !important; }
  .gallery-sec-hdr h2::after { color:var(--txt2); }
  .proj-stack { grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:clamp(24px,3vw,36px) !important; width:min(100%,1120px); margin:0 auto; }
  .pc { min-height:0 !important; border:1px solid rgba(255,255,255,.18) !important; border-radius:12px !important; padding:12px 12px 16px !important; background:#080808 !important; box-shadow:none !important; backdrop-filter:none !important; }
  .pc:hover { transform:none !important; border-color:rgba(255,255,255,.34) !important; box-shadow:none !important; background:#080808 !important; }
  .pc-visual { aspect-ratio:1/1.34 !important; height:auto !important; border-radius:6px !important; overflow:hidden; background:#101010 !important; }
  .pc-visual-img, .pc-visual-inner { border-radius:6px !important; }
  .pc-info { padding:20px 6px 0 !important; }
  .pc-title { font-size:clamp(24px,2.6vw,28px) !important; line-height:1.05 !important; letter-spacing:-.06em !important; font-weight:700 !important; margin:0 0 16px !important; color:#fff !important; }
  .pc-tags { gap:8px !important; }
  .pc-tag { padding:8px 11px !important; border-radius:999px !important; border:1px solid rgba(255,255,255,.9) !important; background:transparent !important; color:#fff !important; font-size:11px !important; font-weight:800 !important; letter-spacing:-.04em !important; text-transform:none !important; }
  .pc-tag:nth-child(n+3) { display:none !important; }
  .contact-cta { padding:clamp(80px,9vw,130px) 0; background:#050505; border-top:1px solid var(--border); }
  .contact-cta-box { max-width:980px; margin:0 auto; text-align:center; }
  .cta-title { margin-bottom:28px; }
  .cta-title .muted { color:var(--txt2); display:inline-block; }
  .cta-row { display:flex; align-items:center; justify-content:center; gap:22px; flex-wrap:wrap; }
  .cta-line { width:min(190px,24vw); height:1px; background:rgba(255,255,255,.7); }
  .cta-socials { margin-top:54px; display:flex; justify-content:center; gap:34px; flex-wrap:wrap; }
  .cta-socials a { color:#fff; text-decoration:none; font-size:16px; font-weight:600; }
  @media(max-width:1024px){ .proj-stack{grid-template-columns:repeat(2,minmax(0,1fr)) !important; width:min(100%,760px);} }
  @media(max-width:760px){ .hero{padding:110px 0 64px;} .cta-line{display:none;} .hero-h1,.gallery-sec-hdr h2,.sec-h2,.cta-title{font-size:clamp(42px,15vw,72px)!important;} .proj-stack{grid-template-columns:1fr !important; width:min(100%,420px);} }


  /* Responsive polish: wider, shorter project cards and safer layouts on every viewport */
  .wrap, .nav-in {
    width:min(100%, 1440px);
    padding-inline:clamp(18px, 4vw, 56px);
  }

  .nav-in { gap:24px; }
  .nav-links { gap:clamp(20px, 3vw, 36px); }

  .hero {
    min-height:min(92vh, 920px);
    padding-block:clamp(104px, 14vw, 150px) clamp(56px, 8vw, 88px);
  }

  .hero-content {
    width:min(100%, 980px);
    padding-top:0;
  }

  .hero-h1, .gallery-sec-hdr h2, .sec-h2, .cta-title {
    text-wrap:balance;
  }

  .impact { padding-block:clamp(56px, 8vw, 100px); }
  .impact-grid { grid-template-columns:repeat(auto-fit, minmax(min(240px, 100%), 1fr)); }
  .impact-item { min-width:0; }

  .gallery-sec { padding-block:clamp(60px, 8vw, 112px) !important; }
  .gallery-sec-hdr { width:min(1280px, calc(100% - 36px)) !important; }
  .filter-bar { max-width:100%; }

  .proj-stack {
    grid-template-columns:repeat(2, minmax(0, 1fr)) !important;
    width:min(100%, 1280px) !important;
    gap:clamp(20px, 2.6vw, 34px) !important;
  }

  .pc {
    padding:clamp(10px, 1.3vw, 14px) !important;
  }

  .pc-visual {
    aspect-ratio:16 / 9.5 !important;
  }

  .pc-info {
    padding:clamp(14px, 1.6vw, 20px) clamp(4px, 1vw, 8px) 0 !important;
  }

  .pc-title {
    font-size:clamp(21px, 2vw, 28px) !important;
    margin-bottom:clamp(10px, 1.2vw, 14px) !important;
  }

  .pc-tags { gap:7px !important; }
  .pc-tag { padding:7px 10px !important; }

  .contact-cta { padding-block:clamp(64px, 9vw, 120px); }
  .cta-socials { gap:clamp(16px, 4vw, 34px); }

  @media (max-width: 1180px) {
    .proj-stack { width:min(100%, 980px) !important; }
    .nav-cta { padding-inline:18px; }
  }

  @media (max-width: 900px) {
    .nav-links, .nav-cta { display:none; }
    .ham { display:flex; }
    .hero { min-height:auto; }
    .hero-btns { align-items:center; }
    .proj-stack { grid-template-columns:1fr !important; width:min(100%, 620px) !important; }
    .pc-visual { aspect-ratio:16 / 9 !important; }
    .footer-grid { grid-template-columns:1fr 1fr; }
  }

  @media (max-width: 640px) {
    html, body, *, *::before, *::after { }
    .cur-dot, .cur-ring, .cur-view-txt { display:none !important; }
    .wrap, .nav-in { padding-inline:18px; }
    .logo-t { font-size:16px; }
    .logo-i { width:34px; height:34px; }
    .hero { padding-block:96px 52px; }
    .hero-h1, .gallery-sec-hdr h2, .sec-h2, .cta-title {
      font-size:clamp(38px, 13vw, 62px) !important;
      letter-spacing:-.055em !important;
    }
    .hero-sub { font-size:15px; line-height:1.65; margin-bottom:26px; }
    .hero-btns, .cta-row { flex-direction:column; width:100%; }
    .btn-primary, .btn-ghost { width:100%; justify-content:center; }
    .impact-grid { gap:16px; }
    .impact-item { padding:26px 18px; }
    .impact-num { font-size:clamp(36px, 14vw, 54px); }
    .gallery-sec-hdr { width:calc(100% - 36px) !important; margin-bottom:28px !important; }
    .filter-outer { justify-content:flex-start; overflow:hidden; }
    .filter-bar { justify-content:flex-start; gap:22px; padding:0 18px 22px; }
    .proj-stack { width:100% !important; gap:28px !important; }
    .pc { border-radius:10px !important; padding:10px 10px 14px !important; }
    .pc-visual { aspect-ratio:4 / 3 !important; }
    .pc-title { font-size:clamp(22px, 7vw, 28px) !important; }
    .cta-socials, .foot-leg { flex-direction:column; align-items:center; gap:14px; }
    .footer-grid { grid-template-columns:1fr; gap:30px; }
    .foot-bot { align-items:center; }
  }

  @media (max-width: 380px) {
    .wrap, .nav-in { padding-inline:14px; }
    .mob-nav a { font-size:28px; }
    .f-btn { font-size:11px; letter-spacing:.14em; }
    .pc-tag { font-size:10px !important; padding:6px 8px !important; }
  }



  /* Reference image-style portfolio cards */
  .proj-stack {
    grid-template-columns:repeat(3, minmax(0, 1fr)) !important;
    width:min(100%, 1320px) !important;
    gap:clamp(20px, 2.2vw, 32px) !important;
    align-items:start !important;
  }
  .pc {
    display:flex !important;
    flex-direction:column !important;
    min-height:0 !important;
    padding:0 !important;
    border:0 !important;
    border-radius:0 !important;
    background:transparent !important;
    box-shadow:none !important;
    overflow:visible !important;
    text-decoration:none !important;
  }
  .pc:hover {
    transform:none !important;
    border-color:transparent !important;
    box-shadow:none !important;
  }
  .pc-visual,
  .pc:nth-child(n) .pc-visual {
    position:relative !important;
    inset:auto !important;
    width:100% !important;
    height:auto !important;
    aspect-ratio:4 / 5.42 !important;
    border-radius:5px !important;
    overflow:hidden !important;
    background:#15151a !important;
    flex:none !important;
  }
  .pc.alt .pc-visual,
  .pc.alt .pc-info { order:initial !important; }
  .pc-visual::before,
  .pc-visual-ov,
  .pc-cta-hover { display:none !important; }
  .pc-visual-img,
  .pc-visual-inner {
    position:absolute !important;
    inset:0 !important;
    width:100% !important;
    height:100% !important;
    object-fit:cover !important;
    border-radius:5px !important;
    filter:none !important;
    transform:none !important;
    transition:transform .45s var(--ease) !important;
  }
  .pc:hover .pc-visual-img,
  .pc:hover .pc-visual-inner { transform:scale(1.035) !important; filter:none !important; }
  .pc-info {
    position:relative !important;
    z-index:1 !important;
    display:flex !important;
    flex-direction:column !important;
    justify-content:flex-start !important;
    min-height:0 !important;
    margin:0 !important;
    padding:20px 6px 0 !important;
    color:#fff !important;
  }
  .pc-num,
  .pc-cat,
  .pc-desc,
  .pc-meta,
  .pc-link { display:none !important; }
  .pc-title {
    order:1 !important;
    color:#f5f5f5 !important;
    font-size:clamp(22px,2vw,30px) !important;
    line-height:1.05 !important;
    letter-spacing:-.06em !important;
    font-weight:800 !important;
    margin:0 0 14px !important;
    text-shadow:none !important;
    transform:none !important;
  }
  .pc-tags {
    order:2 !important;
    display:flex !important;
    flex-wrap:wrap !important;
    gap:8px !important;
    margin:0 !important;
  }
  .pc-tag,
  .pc-tag:nth-child(n+3) {
    display:inline-flex !important;
    align-items:center !important;
    min-height:30px !important;
    padding:6px 11px !important;
    border:1.5px solid rgba(255,255,255,.92) !important;
    border-radius:999px !important;
    background:transparent !important;
    color:#fff !important;
    font-size:11px !important;
    font-weight:800 !important;
    letter-spacing:-.04em !important;
    line-height:1 !important;
    text-transform:none !important;
  }
  .pc-tag + .pc-tag::before { content:none !important; }
  @media(max-width:1024px){ .proj-stack{grid-template-columns:repeat(2, minmax(0, 1fr)) !important; width:min(100%, 900px) !important;} }
  @media(max-width:760px){ .proj-stack{grid-template-columns:1fr !important; width:min(100%, 420px) !important;} .pc-visual,.pc:nth-child(n) .pc-visual{aspect-ratio:4 / 5.1 !important;} }


  /* Reference-style portfolio filtering tabs */
  .gallery-sec .filter-outer {
    justify-content:center !important;
    margin:0 auto clamp(36px,5vw,58px) !important;
    padding:0 !important;
    background:transparent !important;
    border:0 !important;
    backdrop-filter:none !important;
    overflow:visible !important;
  }
  .gallery-sec .filter-bar {
    width:max-content !important;
    max-width:calc(100% - 36px) !important;
    display:flex !important;
    align-items:flex-end !important;
    justify-content:center !important;
    gap:0 !important;
    padding:0 !important;
    overflow-x:auto !important;
    border:0 !important;
    scrollbar-width:none;
  }
  .gallery-sec .filter-bar::-webkit-scrollbar { display:none; }
  .gallery-sec .filter-ind { display:none !important; }
  .gallery-sec .f-btn {
    position:relative !important;
    display:grid !important;
    grid-template-rows:auto auto !important;
    gap:4px !important;
    min-width:max-content !important;
    padding:0 24px 2px !important;
    border:0 !important;
    border-radius:0 !important;
    background:transparent !important;
    color:#777c88 !important;
    font-family:var(--font) !important;
    font-size:15px !important;
    font-weight:700 !important;
    letter-spacing:-.02em !important;
    line-height:1 !important;
    text-transform:none !important;
    transition:color .25s var(--ease) !important;
  }
  .gallery-sec .f-btn:not(:last-child)::before {
    content:'/';
    position:absolute;
    right:-4px;
    bottom:2px;
    color:#f0f0f0;
    font-size:18px;
    font-weight:400;
    line-height:1;
  }
  .gallery-sec .f-btn::after {
    content:'' !important;
    position:absolute !important;
    left:24px !important;
    right:24px !important;
    bottom:-6px !important;
    height:2px !important;
    background:#fff !important;
    opacity:0 !important;
    transform:none !important;
    transition:opacity .25s var(--ease) !important;
  }
  .gallery-sec .f-btn:hover,
  .gallery-sec .f-btn.active {
    color:#fff !important;
    transform:none !important;
  }
  .gallery-sec .f-btn.active::after { opacity:1 !important; }
  .gallery-sec .f-btn .fc {
    display:block !important;
    margin:0 0 0 18px !important;
    color:currentColor !important;
    font-size:12px !important;
    font-weight:800 !important;
    line-height:1 !important;
    opacity:1 !important;
  }
  .gallery-sec .f-btn .fl { display:block; }
  @media (max-width:640px) {
    .gallery-sec .filter-outer { justify-content:flex-start !important; overflow:hidden !important; }
    .gallery-sec .filter-bar { max-width:100% !important; justify-content:flex-start !important; padding:0 18px 10px !important; }
    .gallery-sec .f-btn { padding-inline:18px !important; font-size:14px !important; }
    .gallery-sec .f-btn::after { left:18px !important; right:18px !important; }
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


  /* Home impact card descriptions */
  .impact .impact-item {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:10px;
  }
  .impact .impact-label,
  .impact .impact-sub {
    display:block !important;
    text-align:center !important;
  }
  .impact .impact-label {
    color:var(--txt) !important;
    font-size:14px !important;
    font-weight:700 !important;
    letter-spacing:.04em !important;
    line-height:1.25 !important;
    margin-top:4px !important;
    text-transform:none !important;
  }
  .impact .impact-sub {
    color:var(--txt2) !important;
    font-size:12px !important;
    font-weight:500 !important;
    line-height:1.45 !important;
    max-width:190px;
    margin:0 auto !important;
  }


  /* Extra space between Creative Projects cards */
  .gallery-sec .proj-stack {
    gap:clamp(44px, 5vw, 72px) clamp(24px, 2.8vw, 36px) !important;
  }
  @media(max-width:760px){
    .gallery-sec .proj-stack { gap:56px !important; }
  }


  /* ═══════════════════════════════════════
     PREMIUM ANIMATED FILTERING GALLERY
  ═══════════════════════════════════════ */
  
  /* Portfolio Section */
  .portfolio-section {
    padding: clamp(50px, 12vw, 50px) 0;
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }

  .portfolio-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 70% 50% at 20% 0%, rgba(124,58,237,0.08), transparent 50%),
      radial-gradient(ellipse 60% 40% at 80% 100%, rgba(6,182,212,0.06), transparent 50%);
    pointer-events: none;
  }

  .portfolio-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(24px, 4vw, 60px);
    position: relative;
    z-index: 1;
  }

  /* Portfolio Header */
  .portfolio-header {
    text-align: center;
    margin-bottom: clamp(48px, 6vw, 80px);
  }

  .portfolio-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 18px;
    background: rgba(124,58,237,0.1);
    border: 1px solid rgba(124,58,237,0.25);
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--purple-lt);
    margin-bottom: 24px;
  }

  .eyebrow-dot {
    width: 6px;
    height: 6px;
    background: var(--cyan);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--cyan);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }

  .portfolio-title {
    font-size: clamp(40px, 7vw, 96px);
    font-weight: 900;
    line-height: 0.92;
    letter-spacing: -0.06em;
    margin-bottom: 20px;
    color: var(--txt);
  }

  .portfolio-subtitle {
    font-size: clamp(15px, 1.4vw, 18px);
    color: var(--txt2);
    max-width: 580px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Filter Tabs */
  /* .filter-wrapper {
    position: sticky;
    top: 80px;
    z-index: 100;
    margin-bottom: clamp(48px, 6vw, 72px);
    padding: 16px 0;
    background: rgba(8,8,14,0.85);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .filter-tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    position: relative;
    padding: 8px;
  }

  .filter-btn {
    position: relative;
    z-index: 1;
    padding: 8px 18px;
    border-radius: 99px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-family: var(--font);
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.6);
    cursor: none;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    white-space: nowrap;
  }

  .filter-btn:hover {
    /* background-color: rgba(255, 255, 255, 0.05); 
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
  }

  .filter-btn.active {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #050505;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
  } */


/* filter button design  */

.filter-wrapper {
  position: sticky;
  top: 80px;
  z-index: 100;
  margin-bottom: clamp(48px, 6vw, 72px);
  padding: 16px 0;
  background: rgba(8,8,14,0.85);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.filter-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  position: relative;
  padding: 6px;
  max-width: fit-content;
  margin: 0 auto;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
}

.filter-btn {
  position: relative;
  z-index: 1;
  padding: 10px 20px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid transparent;
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.55);
  transition: color 0.35s cubic-bezier(0.25,0.46,0.45,0.94),
              transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
  white-space: nowrap;
}

.filter-btn:hover {
  color: #fff;
  transform: translateY(-1px);
}

.filter-btn.active {
  color: #050505;
  font-weight: 700;
}

/* sliding pill background */
.filter-btn.active::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ffffff, #d7d7d7);
  border-radius: 999px;
  z-index: -1;
  box-shadow: 0 6px 20px rgba(255,255,255,0.18);
  animation: pillIn 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
}

@keyframes pillIn {
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 640px) {
  .filter-tabs { max-width: 100% !important; justify-content: center !important; flex-wrap: wrap !important; border-radius: 20px !important; background: transparent !important; border: none !important; padding: 10px !important; }
  .filter-btn { font-size: 12px; padding: 9px 16px; }
}



  /* Project Grid */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(24px, 3vw, 36px);
    align-items: stretch;
  }

  /* ── PROJECT CARD — consistent on every screen size ── */
  .project-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(20px);
  
    /* filter animation + hover animation share the same transition */
    transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow  0.4s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, opacity;
    opacity: 1;
    transform: scale(1);
  }

  /* Hover — identical on desktop, tablet and mobile */
  .project-card:hover {
    transform: translateY(-10px);
    border-color: rgba(103,232,249,0.3);
    box-shadow: 0 28px 70px rgba(0,0,0,0.5), 0 0 36px rgba(6,182,212,0.1);
  }

  /* Card Visual — same aspect-ratio everywhere */
  .card-visual {
    position: relative;
    aspect-ratio: 4 / 5;
    width: 100%;
    overflow: hidden;
    border-radius: 20px;
    background: var(--bg3);
    flex-shrink: 0;
  }

  .card-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .card-image-wrapper img,
  .card-placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
    will-change: transform;
  }

  .card-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
  }

  .placeholder-icon {
    filter: drop-shadow(0 0 20px rgba(255,255,255,0.3));
  }

  .project-card:hover .card-image-wrapper img,
  .project-card:hover .card-placeholder {
    transform: scale(1.08);
  }

  /* Card Overlay */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8) 100%);
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1);
    display: flex;
    align-items: flex-end;
    padding: 24px;
  }

  .project-card:hover .card-overlay {
    opacity: 1;
  }

  .overlay-content {
    transform: translateY(20px);
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }

  .project-card:hover .overlay-content {
    transform: translateY(0);
  }

  .overlay-category {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(124,58,237,0.3);
    border: 1px solid rgba(124,58,237,0.5);
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
  }

  .overlay-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.3;
  }

  /* Card Info */
  .card-info {
    padding: 20px;
  }

  .card-category {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--purple-lt);
    margin-bottom: 12px;
  }

  .card-category i {
    font-size: 10px;
  }

  .card-title {
    font-size: clamp(16px, 1.8vw, 20px);
    font-weight: 700;
    color: var(--txt);
    margin: 0 0 16px;
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    padding: 6px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 99px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--txt2);
    transition: all 0.3s ease;
  }

  .project-card:hover .tag {
    background: rgba(124,58,237,0.15);
    border-color: rgba(124,58,237,0.3);
    color: var(--purple-lt);
  }

  /* Project Card Styling with transition setup */
  .project-card.fade-out {
    opacity: 0;
    transform: scale(0.85);
  }

  .project-card.hide {
    display: none;
  }

  /* ── GRID BREAKPOINTS — only column count changes, card style stays identical ── */
  @media (max-width: 1024px) {
    .project-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .project-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .filter-wrapper {
      position: relative;
      top: auto;
      margin-bottom: 28px;
      padding: 10px 0;
    }
    .filter-tabs {
      gap: 6px;
      padding: 6px;
      justify-content: center !important;
      flex-wrap: wrap !important;
      border-radius: 20px !important;
      background: transparent !important;
      border: none !important;
    }
    .filter-btn {
      padding: 7px 14px;
      font-size: 11px;
    }
  }


  /* ══ FINAL LETTER-SPACING RESET — must stay last ══
     Wins over every earlier !important negative value  */
  h1, h2, h3, h4, h5, h6,
  .hero-h1,
  .ss-title,
  .ss-title-line2,
  .gallery-sec-hdr h2,
  .sec-h2,
  .cta-title,
  .proj-h1,
  .sim-title,
  .pc-title,
  .ov-big,
  .tl-title,
  .impact-label,
  .portfolio-title {
    letter-spacing: 0 !important;
  }

/* filter menu  */

.filter-menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 auto clamp(48px, 6vw, 72px);
  padding: 6px;
  max-width: fit-content;
}

.filter-menu .filter-btn {
  padding: 10px 20px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.14);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.6);

  white-space: nowrap;
  transition: color .3s, border-color .3s, background .3s, transform .3s;
}

.filter-menu .filter-btn:hover {
  color: #fff;
  border-color: rgba(255,255,255,0.3);
  transform: translateY(-1px);
}

.filter-menu .filter-btn.active {
  background: #fff;
  border-color: #fff;
  color: #050505;
  font-weight: 700;
}

@media (max-width: 640px) {
  .filter-menu {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: unset;
    max-width: 100%;
    gap: 8px;
    padding: 0 16px;
  }
  .filter-menu .filter-btn {
    font-size: 12px;
    padding: 8px 16px;
  }
}


/* Container to maintain fixed area bounds */
.meta-container {
  position: relative;
  height: 32px; /* Set height matching your tag sizes to avoid layout shifting */
  width: 100%;
  margin-top: 12px;
}

/* Default View (Category Pills) */
.card-tags {
  display: flex;
  gap: 8px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Hover View: "Show Project —" */
.show-project-view {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #b3b3b3; /* Or your preferred theme text color */
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translateY(6px); /* Starts slightly lower to create a lifting effect */
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

/* Appending the accent dash after text */
.show-project-view::after {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background-color: #b3b3b3;
}

/* --- HOVER INTERACTION TRIGGER --- */

/* Slide out and fade tags */
.project-card:hover .card-tags {
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
}

/* Slide in and reveal Show Project link */
.project-card:hover .show-project-view {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* ── MOBILE: touch devices have no hover ── */
@media (hover: none), (max-width: 768px) {
  /* Wider image ratio so cards don't tower on phone */
  .card-visual {
    aspect-ratio: 16 / 9 !important;
  }

  /* Pull meta-container out of the absolute/relative trick — just static flow */
  .meta-container {
    position: static !important;
    height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    margin-top: 12px !important;
  }

  /* Tags: always visible, in normal flow */
  .project-card .card-tags {
    position: static !important;
    display: flex !important;
    flex-wrap: wrap !important;
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto !important;
  }

  /* Show Project: always visible below tags, in normal flow */
  .project-card .show-project-view {
    position: static !important;
    display: flex !important;
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto !important;
    margin-top: 0 !important;
    font-size: 13px;
    color: rgba(255,255,255,0.55);
  }
}


  /* Hide custom cursor on tablets, mobile devices, and touch screens */
  /* @media (max-width: 1024px), (hover: none), (pointer: coarse) {
    #cur-dot, #cur-ring, .cur-dot, .cur-ring, .cur-view-txt { display: none !important; }
    html, body, *, *::before, *::after { cursor: auto !important; }
  } */

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
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    box-shadow: 0 0 60px rgba(124,58,237,.2), 0 20px 50px rgba(0,0,0,0.5);
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
    color: var(--text-secondary);
    font-size: 28px;
    line-height: 1;

    transition: color 0.2s;
  }
  .modal-close:hover {
    color: var(--text-primary);
  }
  .modal-title {
    font-family: var(--font-heading), var(--font-body), sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 32px;
    color: var(--text-primary);
    line-height: 1.2;
  }
  .modal-title .grad {
    background: var(--grad-primary);
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
    color: var(--text-secondary);
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
    color: var(--text-primary);
    font-size: 15px;
    font-family: var(--font-body), sans-serif;
    outline: none;
  
    transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .form-line-input::placeholder {
    color: var(--text-muted);
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
    color: var(--text-secondary);
    font-size: 14px;
 
    user-select: none;
    transition: color 0.2s;
  }
  .check-item:hover {
    color: var(--text-primary);
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
    color: var(--text-primary);
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .form-submit-btn {
    align-self: flex-start;
    padding: 14px 32px;
    border-radius: 99px;
    background: var(--text-primary);
    border: none;
    color: #06060f !important;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.05em;

    box-shadow: 0 4px 15px rgba(255,255,255,0.1);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .form-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,255,255,0.18);
  }

  /* Success State */
  .form-success-container {
    text-align: center;
    padding: 40px 0;
    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    color: var(--text-primary);
  }
  .form-success-container p {
    color: var(--text-secondary);
    font-size: 15px;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
