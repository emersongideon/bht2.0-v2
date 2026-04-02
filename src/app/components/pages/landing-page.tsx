import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { IconicHexagon } from "../landing/iconic-hexagon";

const ICONIC_SECTIONS = [
  { letter: "I", name: "Imprinted in AI",           description: "How well LLMs know and represent your brand — the new frontier of brand visibility." },
  { letter: "C", name: "Capturing Attention",        description: "Your share of digital attention and social scale across every channel that matters." },
  { letter: "O", name: "Openly Adored",              description: "What people genuinely feel and say about you — unfiltered sentiment at scale." },
  { letter: "N", name: "Never Lost in Translation",  description: "How consistently your message travels from your brand to the consumer's mind." },
  { letter: "I", name: "Ingrained in Culture",       description: "Your depth of cultural embedding and longevity — brands that outlast trends." },
  { letter: "C", name: "Chosen for a Reason",        description: "Why people pick you when it matters most — purchase intent and conversion strength." },
];

const BG_DARK    = "#1A1714";
const TERRACOTTA = "#B86A54";
const CREAM      = "#F5EFE6";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function LandingNav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: 60,
      backgroundColor: scrolled ? "rgba(26,23,20,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      transition: "background-color 0.3s, border-color 0.3s",
    }}>
      <span style={{ fontFamily: "serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.18em", color: CREAM }}>
        ICONIC
      </span>
      <Link to="/demo" style={{
        padding: "8px 20px", backgroundColor: TERRACOTTA, color: "#fff",
        borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none",
      }}>
        Try Demo
      </Link>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onLearnMore }: { onLearnMore: () => void }) {
  return (
    <section style={{
      minHeight: "100vh", backgroundColor: BG_DARK,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", textAlign: "center", padding: "80px 24px 60px",
    }}>
      {/* animated glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
        <p style={{ color: TERRACOTTA, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
          Brand Health Intelligence
        </p>
        <h1 style={{ fontFamily: "serif", fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 700, color: CREAM, lineHeight: 1.05, margin: "0 0 12px" }}>
          Know your brand.
        </h1>
        <h2 style={{ fontFamily: "serif", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 400, color: "rgba(245,239,230,0.55)", margin: "0 0 48px", lineHeight: 1.15 }}>
          Before the market does.
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/demo" style={{
            padding: "14px 32px", backgroundColor: TERRACOTTA, color: "#fff",
            borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none",
          }}>
            Try Demo →
          </Link>
          <button onClick={onLearnMore} style={{
            padding: "14px 32px", backgroundColor: "transparent", color: CREAM,
            border: "1.5px solid rgba(245,239,230,0.35)", borderRadius: 8,
            fontSize: 15, fontWeight: 500, cursor: "pointer",
          }}>
            Learn More ↓
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "rgba(245,239,230,0.3)", fontSize: 12, letterSpacing: "0.12em", zIndex: 1 }}>
        scroll to explore
      </div>

      <style>{`
        .hero-glow { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18; }
        .hero-glow-1 { width: 600px; height: 600px; background: radial-gradient(circle, #B86A54 0%, transparent 70%); top: -120px; right: -80px; animation: gd1 12s ease-in-out infinite alternate; }
        .hero-glow-2 { width: 500px; height: 500px; background: radial-gradient(circle, #7B68A6 0%, transparent 70%); bottom: -80px; left: -100px; animation: gd2 15s ease-in-out infinite alternate; }
        .hero-glow-3 { width: 400px; height: 400px; background: radial-gradient(circle, #4A7CC7 0%, transparent 70%); top: 30%; left: 40%; animation: gd3 10s ease-in-out infinite alternate; }
        @keyframes gd1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-40px,40px) scale(1.15); } }
        @keyframes gd2 { from { transform: translate(0,0) scale(1); } to { transform: translate(50px,-30px) scale(1.2); } }
        @keyframes gd3 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px,20px) scale(0.9); } }
        @keyframes hexPopIn {
          0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
          70%  { transform: scale(1.08) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .hex-popin { animation: hexPopIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </section>
  );
}

// ─── Sticky ICONIC section ────────────────────────────────────────────────────

function IconicScrollSection({ onFirstRef }: { onFirstRef: (el: HTMLElement | null) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSegments, setActiveSegments] = useState(0);
  const [hexVisible, setHexVisible] = useState(false);

  // Pop hexagon in when container enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHexVisible(true); },
      { threshold: 0.05 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll-driven segment activation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollIntoContainer = window.scrollY - top + window.innerHeight * 0.5;
      const idx = Math.floor(scrollIntoContainer / window.innerHeight);
      setActiveSegments(Math.max(0, Math.min(6, idx + 1)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={(el) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        onFirstRef(el);
      }}
      style={{ display: "flex", position: "relative", backgroundColor: BG_DARK }}
    >
      {/* Left: stacked text panels, each 100vh */}
      <div style={{ flex: "0 0 52%", minWidth: 0 }}>
        {ICONIC_SECTIONS.map((section, i) => (
          <div
            key={i}
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "80px 6% 80px 8%",
              borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <p style={{ color: TERRACOTTA, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 20px" }}>
              Dimension {i + 1} of 6
            </p>
            <h2 style={{ fontFamily: "serif", fontSize: "clamp(52px, 7vw, 80px)", fontWeight: 700, color: CREAM, lineHeight: 1, margin: "0 0 4px" }}>
              {section.letter}
            </h2>
            <h3 style={{ fontFamily: "serif", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 400, color: "rgba(245,239,230,0.75)", margin: "0 0 20px", lineHeight: 1.25 }}>
              {section.name}
            </h3>
            <p style={{ fontSize: "clamp(14px, 1.4vw, 17px)", color: "rgba(245,239,230,0.45)", lineHeight: 1.75, margin: 0, maxWidth: 380 }}>
              {section.description}
            </p>
          </div>
        ))}
      </div>

      {/* Right: sticky hexagon */}
      <div style={{
        flex: 1,
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div
          className={hexVisible ? "hex-popin" : ""}
          style={{
            width: "min(340px, 42vw)",
            opacity: hexVisible ? undefined : 0,
          }}
        >
          <IconicHexagon activeSegments={activeSegments} />
        </div>
      </div>
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section style={{
      minHeight: "60vh", backgroundColor: "#F0E8DF",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "80px 24px",
    }}>
      <h2 style={{ fontFamily: "serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: BG_DARK, margin: "0 0 16px", lineHeight: 1.1 }}>
        Your brand, fully understood.
      </h2>
      <p style={{ fontSize: 18, color: "rgba(26,23,20,0.6)", margin: "0 0 40px", maxWidth: 440, lineHeight: 1.6 }}>
        Six dimensions. One score. Complete clarity on where you stand and where to go.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/demo" style={{ padding: "14px 32px", backgroundColor: TERRACOTTA, color: "#fff", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
          Try Demo
        </Link>
        <Link to="/#subscribe" style={{ padding: "14px 32px", backgroundColor: "transparent", color: BG_DARK, border: "1.5px solid rgba(26,23,20,0.3)", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
          Get Full Access
        </Link>
      </div>
    </section>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const iconicRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLearnMore = () => {
    iconicRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <LandingNav scrolled={scrolled} />
      <HeroSection onLearnMore={handleLearnMore} />
      <IconicScrollSection onFirstRef={(el) => { iconicRef.current = el; }} />
      <CTASection />
    </div>
  );
}
