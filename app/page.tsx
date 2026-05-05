"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth, UserButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  return (
    <main className="root">

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="logo">
            <span className="logo-dot" />
            Learnify
          </span>

          <div className="nav-links">
            {/* Show different buttons based on login state */}
            {!isLoaded ? (
              // Clerk still loading — show placeholder so layout doesn't jump
              <span className="nav-placeholder" />
            ) : isSignedIn ? (
              // ✅ Logged in → Go to Dashboard + User Menu
              <div className="flex items-center gap-x-4">
                <Link href="/dashboard" className="btn-primary">
                  Go to Dashboard →
                </Link>
                <SignOutButton>
                  <button className="btn-ghost-nav">Log out</button>
                </SignOutButton>
                <UserButton />
              </div>
            ) : (
              // ❌ Not logged in → Sign In + Get Started
              <>
                <Link href="/sign-in" className="btn-ghost-nav">Sign In</Link>
                <Link href="/sign-up" className="btn-primary">Get Started →</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── WELCOME BANNER ─────────────────────────────── */}
      {isLoaded && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--sky-800)', fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            {isSignedIn ? (
              <>_____ Welcome back, {user?.firstName || "Learner"}👋  _____</>
            ) : (
              <>_____ Start your journey👋 _____</>
            )}
          </h2>
        </div>
      )}

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-text">
          <div className="badge">🎓 Modern Learning Platform - <em className="badge-learnify">Learnify</em> </div>
          <h1 className="headline">
            Where great<br />
            <em>teachers</em> meet<br />
            eager learners.
          </h1>
          <p className="sub">
            Learnify is a full-stack LMS where educators create, price and sell
            courses — and students track every step of their growth.
          </p>

          <div className="cta-row">
            {!isLoaded ? null : isSignedIn ? (
              <Link href="/dashboard" className="btn-primary btn-lg">
                Continue Learning →
              </Link>
            ) : (
              <>
                <Link href="/sign-up" className="btn-primary btn-lg">Start for Free</Link>
                <Link href="/sign-in" className="btn-link">Sign in →</Link>
              </>
            )}
          </div>


        </div>

        <div className="hero-img-wrap">
          <div className="img-card">
            <Image
              src="/hero.svg"
              alt="Online learning illustration"
              width={560}
              height={404}
              priority
              className="hero-img"
            />
          </div>
        </div>
      </section>

      <div className="divider-line" />

      {/* ── FEATURES ───────────────────────────────────── */}
      <section className="features">
        <div className="features-intro">
          <p className="label">Everything you need</p>
          <h2 className="features-title">
            Built for teachers.<br />Loved by learners.
          </h2>
        </div>

        <div className="feat-grid">
          <div className="feat-item">
            <span className="feat-num">01</span>
            <div className="feat-body">
              <h3>Teacher Studio</h3>
              <p>Create chapters, upload videos via Mux, write rich descriptions
                with TipTap, drag-and-drop reorder lessons, and publish at your own price.</p>
            </div>
          </div>

          <div className="feat-item">
            <span className="feat-num">02</span>
            <div className="feat-body">
              <h3>Student Dashboard</h3>
              <p>Browse by category, purchase securely in ₹ via Razorpay, and track
                in-progress and completed courses from a clean personal dashboard.</p>
            </div>
          </div>

          <div className="feat-item">
            <span className="feat-num">03</span>
            <div className="feat-body">
              <h3>Instructor Analytics</h3>
              <p>Visualise revenue, enrollments, and course performance with beautiful
                Recharts graphs — know exactly what&apos;s working and what&apos;s not.</p>
            </div>
          </div>

          <div className="feat-item">
            <span className="feat-num">04</span>
            <div className="feat-body">
              <h3>Search &amp; Discover</h3>
              <p>Students filter by title or category in real time.
                Find the perfect course in seconds, not minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK SKY BANNER ────────────────────────────── */}
      <section className="banner">
        <div className="banner-inner">
          <h2 className="banner-title">
            Ready to share<br />your knowledge?
          </h2>
          <p className="banner-sub">
            Join educators already growing on Learnify. Set your price, publish
            your course, and reach students worldwide.
          </p>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="btn-sky-solid btn-lg">
            {isSignedIn ? "Go to Dashboard →" : "Create Your First Course →"}
          </Link>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="footer">
        <span className="logo" style={{ fontSize: "0.95rem" }}>
          <span className="logo-dot" style={{ width: "7px", height: "7px" }} />
          Learnify
        </span>
        <p className="footer-copy">Made by Kashish Naaz</p>
      </footer>

      {/* ── STYLES ─────────────────────────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --sky-100: #e0f2fe;
          --sky-200: #bae6fd;
          --sky-300: #7dd3fc;
          --sky-400: #38bdf8;
          --sky-500: #0ea5e9;
          --sky-600: #0284c7;
          --sky-700: #0369a1;
          --sky-800: #075985;
          --white:   #ffffff;
          --ink:     #0c1a27;
          --muted:   #4b6a82;
          --line:    #e0f2fe;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--white);
          color: var(--ink);
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV */
        .nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(224, 242, 254, 0.9); /* light sky blue */
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--sky-200);
        }
        .nav-inner {
          max-width: 1160px; margin: 0 auto;
          padding: 0 1.75rem; height: 62px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 800;
          color: var(--sky-800);
          display: flex; align-items: center; gap: 8px;
          letter-spacing: -0.01em;
        }
        .logo-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--sky-500);
          box-shadow: 0 0 0 3px var(--sky-100);
          flex-shrink: 0;
        }
        .nav-links { display: flex; gap: 0.75rem; align-items: center; min-height: 38px; }
        .nav-placeholder { display: inline-block; width: 120px; height: 36px; }

        /* BUTTONS */
        .btn-primary {
          background: var(--sky-700); color: #fff;
          padding: 0.5rem 1.3rem; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600; font-size: 0.88rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
        }
        .btn-primary:hover { background: var(--sky-800); transform: translateY(-1px); }
        .btn-primary.btn-lg { padding: 0.9rem 2.1rem; font-size: 0.95rem; border-radius: 10px; }

        .btn-sky-solid {
          background: var(--sky-200); color: var(--sky-800);
          padding: 0.5rem 1.3rem; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700; font-size: 0.88rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
        }
        .btn-sky-solid:hover { background: var(--sky-300); transform: translateY(-1px); }
        .btn-sky-solid.btn-lg { padding: 0.9rem 2.1rem; font-size: 0.95rem; border-radius: 10px; }

        .btn-ghost-nav {
          color: var(--muted); font-size: 0.88rem; font-weight: 500;
          text-decoration: none; padding: 0.4rem 1rem;
          border: 1.5px solid #000;
          border-radius: 9999px; transition: all 0.2s;
        }
        .btn-ghost-nav:hover { color: var(--sky-700); border-color: var(--sky-400); background: var(--sky-50); }

        .btn-link {
          color: var(--sky-700); font-size: 0.92rem; font-weight: 600;
          text-decoration: none;
          border-bottom: 1.5px solid var(--sky-400); padding-bottom: 1px;
          transition: opacity 0.2s;
        }
        .btn-link:hover { opacity: 0.6; }

        /* HERO */
        .hero {
          max-width: 1160px; margin: 0 auto;
          padding: 5.5rem 1.75rem 4rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center;
        }
        @media (max-width: 800px) {
          .hero { grid-template-columns: 1fr; padding: 3rem 1.5rem 2rem; gap: 2.5rem; }
          .hero-img-wrap { order: -1; }
        }
        .badge {
          display: inline-block;
          background: var(--sky-100); color: var(--sky-700);
          border: 1px solid var(--sky-200);
          padding: 0.3rem 0.9rem; border-radius: 6px;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.02em; margin-bottom: 1.4rem;
        }
        .badge-learnify {
          font-style: italic;
          color: var(--sky-700);
          position: relative;
          display: inline-block;
          margin-left: 6px;
          font-weight: 700;
          font-size: 1.09rem;
        }

        .badge-learnify::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 4px; /* thicker */
          background: linear-gradient(90deg, #38bdf8, #0ea5e9); /* gradient */
          border-radius: 3px;
        }
        .headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 5vw, 4rem); font-weight: 800;
          line-height: 1.1; color: var(--ink);
          margin-bottom: 1.3rem; letter-spacing: -0.02em;
        }
        .headline em {
          font-style: italic; color: var(--sky-700);
          position: relative; display: inline-block;
        }
        .headline em::after {
          content: ''; position: absolute; bottom: 2px; left: 0;
          width: 100%; height: 3px;
          background: var(--sky-300); border-radius: 2px; opacity: 0.7;
        }
        .sub {
          color: var(--muted); font-size: 1rem; line-height: 1.75;
          max-width: 440px; margin-bottom: 2rem;
        }
        .cta-row {
          display: flex; gap: 1.25rem;
          align-items: center; flex-wrap: wrap;
          margin-bottom: 1.5rem; min-height: 48px;
        }
        
        /* HERO IMAGE CARD */
        .hero-img-wrap { display: flex; justify-content: center; align-items: center; }
        .img-card {
          background: linear-gradient(145deg, var(--sky-700) 0%, var(--sky-800) 100%);
          border-radius: 24px; padding: 2.5rem 2rem;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 20px 60px rgba(3,105,161,0.25), 0 4px 16px rgba(3,105,161,0.15);
          width: 100%; max-width: 520px;
          position: relative; overflow: hidden;
        }
        .img-card::before {
          content: ''; position: absolute; inset: 0; border-radius: 24px;
          background: radial-gradient(ellipse at 60% 30%, rgba(186,230,253,0.18) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-img {
          width: 100%; max-width: 460px; height: auto;
          animation: float 6s ease-in-out infinite; position: relative;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        /* DIVIDER */
        .divider-line { max-width: 1160px; margin: 0 auto; height: 1px; background: var(--line); }

        /* FEATURES */
        .features {
          max-width: 1160px; margin: 0 auto; padding: 5rem 1.75rem;
          display: grid; grid-template-columns: 1fr 2fr;
          gap: 5rem; align-items: start;
        }
        @media (max-width: 800px) {
          .features { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 1.5rem; }
          .features-intro { position: static !important; }
        }
        .features-intro { position: sticky; top: 80px; }
        .label {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--sky-500); margin-bottom: 0.75rem;
        }
        .features-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800;
          line-height: 1.18; color: var(--ink); letter-spacing: -0.02em;
        }
        .feat-grid { display: flex; flex-direction: column; }
        .feat-item {
          display: flex; gap: 1.75rem; align-items: flex-start;
          padding: 2.25rem 0; border-bottom: 1px solid var(--line);
          transition: padding-left 0.3s ease; cursor: default;
        }
        .feat-item:first-child { padding-top: 0; }
        .feat-item:last-child { border-bottom: none; }
        .feat-item:hover { padding-left: 0.6rem; }
        .feat-num {
          font-family: 'Playfair Display', serif;
          font-size: 0.75rem; font-weight: 700;
          color: var(--sky-400); min-width: 26px;
          padding-top: 5px; letter-spacing: 0.05em; flex-shrink: 0;
        }
        .feat-body h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700;
          color: var(--ink); margin-bottom: 0.5rem; letter-spacing: -0.01em;
        }
        .feat-body p { color: var(--muted); font-size: 0.92rem; line-height: 1.72; max-width: 480px; }

        /* BANNER */
        .banner {
          background: linear-gradient(135deg, var(--sky-800) 0%, var(--sky-700) 100%);
          padding: 6rem 1.75rem;
        }
        .banner-inner { max-width: 640px; margin: 0 auto; text-align: center; }
        .banner-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 800;
          color: #fff; line-height: 1.15;
          margin-bottom: 1rem; letter-spacing: -0.02em;
        }
        .banner-sub { color: var(--sky-200); font-size: 0.97rem; line-height: 1.72; margin-bottom: 2.25rem; }

        /* FOOTER */
        .footer {
          max-width: 1160px; margin: 0 auto; padding: 1.6rem 1.75rem;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid var(--line);
        }
        .footer-copy { color: var(--muted); font-size: 0.82rem; }
        @media (max-width: 480px) {
          .footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
    </main>
  );
}