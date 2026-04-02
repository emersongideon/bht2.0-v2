import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { IconicHexagon } from "../landing/iconic-hexagon";

// ─── Types ──────────────────────────────────────────────────────────────────

interface IconicSection {
  letter: string;
  name: string;
  description: string;
  index: number; // 1-based
}

// ─── Data ────────────────────────────────────────────────────────────────────

const ICONIC_SECTIONS: IconicSection[] = [
  {
    letter: "I",
    name: "Imprinted in AI",
    description: "How well LLMs know and represent your brand — the new frontier of brand visibility.",
    index: 1,
  },
  {
    letter: "C",
    name: "Capturing Attention",
    description: "Your share of digital attention and social scale across every channel that matters.",
    index: 2,
  },
  {
    letter: "O",
    name: "Openly Adored",
    description: "What people genuinely feel and say about you — unfiltered sentiment at scale.",
    index: 3,
  },
  {
    letter: "N",
    name: "Never Lost in Translation",
    description: "How consistently your message travels from your brand to the consumer's mind.",
    index: 4,
  },
  {
    letter: "I",
    name: "Ingrained in Culture",
    description: "Your depth of cultural embedding and longevity — brands that outlast trends.",
    index: 5,
  },
  {
    letter: "C",
    name: "Chosen for a Reason",
    description: "Why people pick you when it matters most — purchase intent and conversion strength.",
    index: 6,
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const BG_DARK = "#1A1714";
const BG_MID = "#22201D";
const TERRACOTTA = "#B86A54";
const CREAM = "#F5EFE6";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function LandingNav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 60,
        backgroundColor: scrolled ? "rgba(26,23,20,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily: "serif",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: CREAM,
        }}
      >
        ICONIC
      </span>
      <Link
        to="/demo"
        style={{
          padding: "8px 20px",
          backgroundColor: TERRACOTTA,
          color: "#fff",
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.02em",
          transition: "opacity 0.2s",
        }}
      >
        Try Demo
      </Link>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onLearnMore }: { onLearnMore: () => void }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: BG_DARK,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "80px 24px 60px",
      }}
    >
      {/* Animated glow background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
        <p
          style={{
            color: TERRACOTTA,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Brand Health Intelligence
        </p>
        <h1
          style={{
            fontFamily: "serif",
            fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 12,
          }}
        >
          Know your brand.
        </h1>
        <h2
          style={{
            fontFamily: "serif",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 400,
            color: "rgba(245,239,230,0.55)",
            margin: 0,
            marginBottom: 48,
            lineHeight: 1.15,
          }}
        >
          Before the market does.
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/demo"
            style={{
              padding: "14px 32px",
              backgroundColor: TERRACOTTA,
              color: "#fff",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.02em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Try Demo →
          </Link>
          <button
            onClick={onLearnMore}
            style={{
              padding: "14px 32px",
              backgroundColor: "transparent",
              color: CREAM,
              border: `1.5px solid rgba(245,239,230,0.35)`,
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            Learn More ↓
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(245,239,230,0.3)",
          fontSize: 12,
          letterSpacing: "0.12em",
          zIndex: 1,
        }}
      >
        scroll to explore
      </div>

      <style>{`
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
        }
        .hero-glow-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #B86A54 0%, transparent 70%);
          top: -120px;
          right: -80px;
          animation: glowDrift1 12s ease-in-out infinite alternate;
        }
        .hero-glow-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #7B68A6 0%, transparent 70%);
          bottom: -80px;
          left: -100px;
          animation: glowDrift2 15s ease-in-out infinite alternate;
        }
        .hero-glow-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #4A7CC7 0%, transparent 70%);
          top: 30%;
          left: 40%;
          animation: glowDrift3 10s ease-in-out infinite alternate;
        }
        @keyframes glowDrift1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-40px, 40px) scale(1.15); }
        }
        @keyframes glowDrift2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(50px, -30px) scale(1.2); }
        }
        @keyframes glowDrift3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-30px, 20px) scale(0.9); }
        }
      `}</style>
    </section>
  );
}

// ─── ICONIC Dimension Section ─────────────────────────────────────────────────

interface DimSectionProps {
  section: IconicSection;
  activeSegments: number;
  isOdd: boolean;
  sectionRef: (el: HTMLElement | null) => void;
}

function DimSection({ section, activeSegments, isOdd, sectionRef }: DimSectionProps) {
  const bg = isOdd ? BG_DARK : BG_MID;

  return (
    <section
      ref={sectionRef}
      data-dim-index={section.index}
      style={{
        minHeight: "100vh",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        padding: "80px 5%",
        gap: 40,
      }}
    >
      {/* Left: text */}
      <div
        style={{
          flex: "0 0 55%",
          maxWidth: 560,
        }}
      >
        <p
          style={{
            color: TERRACOTTA,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 16,
            margin: "0 0 16px",
          }}
        >
          Dimension {section.index} of 6
        </p>
        <h2
          style={{
            fontFamily: "serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1.1,
            margin: "0 0 8px",
          }}
        >
          {section.letter}
          <span style={{ color: "rgba(245,239,230,0.45)" }}> —</span>
        </h2>
        <h3
          style={{
            fontFamily: "serif",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 400,
            color: "rgba(245,239,230,0.85)",
            margin: "0 0 24px",
            lineHeight: 1.25,
          }}
        >
          {section.name}
        </h3>
        <p
          style={{
            fontSize: "clamp(15px, 1.5vw, 18px)",
            color: "rgba(245,239,230,0.55)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 420,
          }}
        >
          {section.description}
        </p>
      </div>

      {/* Right: hexagon */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        <div style={{ width: "min(320px, 80vw)" }}>
          <IconicHexagon activeSegments={activeSegments} />
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      style={{
        minHeight: "60vh",
        backgroundColor: "#F0E8DF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <h2
        style={{
          fontFamily: "serif",
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 700,
          color: BG_DARK,
          margin: "0 0 16px",
          lineHeight: 1.1,
        }}
      >
        Your brand, fully understood.
      </h2>
      <p
        style={{
          fontSize: 18,
          color: "rgba(26,23,20,0.6)",
          margin: "0 0 40px",
          maxWidth: 440,
          lineHeight: 1.6,
        }}
      >
        Six dimensions. One score. Complete clarity on where you stand and where to go.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          to="/demo"
          style={{
            padding: "14px 32px",
            backgroundColor: TERRACOTTA,
            color: "#fff",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Try Demo
        </Link>
        <Link
          to="/#subscribe"
          style={{
            padding: "14px 32px",
            backgroundColor: "transparent",
            color: BG_DARK,
            border: `1.5px solid rgba(26,23,20,0.3)`,
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Get Full Access
        </Link>
      </div>
    </section>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0); // 0 = none, 1-6 = dim index
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const learnMoreRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll for nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for ICONIC sections
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(i + 1);
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleLearnMore = () => {
    learnMoreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <LandingNav scrolled={scrolled} />

      {/* Section 1: Hero */}
      <HeroSection onLearnMore={handleLearnMore} />

      {/* Sections 2-7: ICONIC dimensions */}
      {ICONIC_SECTIONS.map((section, i) => (
        <DimSection
          key={section.index}
          section={section}
          activeSegments={activeSection >= section.index ? section.index : section.index - 1}
          isOdd={i % 2 === 0}
          sectionRef={(el) => {
            sectionRefs.current[i] = el;
            if (i === 0) learnMoreRef.current = el;
          }}
        />
      ))}

      {/* Section 8: CTA */}
      <CTASection />
    </div>
  );
}
