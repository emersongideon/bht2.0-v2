import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router";

// ── CONSTANTS ──────────────────────────────────────────────────────────────────

const COLORS = ["#8B7BA3", "#C47B5A", "#6B9F6B", "#5A7B9C", "#C4A44A", "#9C5A6B"];
const LABELS = ["I", "C", "O", "N", "I", "C"];
const VALUES = [0.78, 0.85, 0.62, 0.71, 0.68, 0.80];
const CX = 250, CY = 240, R = 170, N = 6;

const DIMENSIONS = [
  {
    letter: "I", name: "Imprinted in AI",
    desc: ["How ", { kw: "deeply" }, " and ", { kw: "distinctly" }, " the brand is encoded in the ", { kw: "minds of machines" }, " — the new frontier of brand visibility."],
    metrics: ["LLM Consistency", "Distinctiveness"],
  },
  {
    letter: "C", name: "Capturing Attention",
    desc: ["The ", { kw: "cultural energy" }, " and ", { kw: "momentum" }, " the brand carries right now — share of search, ", { kw: "social engagement" }, ", and AI surface ranking."],
    metrics: ["Share of Search", "Momentum"],
  },
  {
    letter: "O", name: "Openly Adored",
    desc: ["What people and machines actually ", { kw: "say and feel" }, " about the brand — ", { kw: "unfiltered sentiment" }, ", advocacy intensity, and ", { kw: "recommendation share" }, "."],
    metrics: ["Favourability", "Passion Score"],
  },
  {
    letter: "N", name: "Never Lost in Translation",
    desc: ["How ", { kw: "clearly" }, " the brand tells its story — and whether the world ", { kw: "receives it as intended" }, ". Consistency, coherence, and ", { kw: "sender-receiver alignment" }, "."],
    metrics: ["Consistency", "Alignment"],
  },
  {
    letter: "I", name: "Ingrained in Culture",
    desc: ["The ", { kw: "values" }, ", ", { kw: "aesthetics" }, ", and ", { kw: "symbolic meaning" }, " the brand owns in culture — the territories it dominates versus competitors."],
    metrics: ["Cultural Ownership", "Attribute Strength"],
  },
  {
    letter: "C", name: "Chosen for a Reason",
    desc: ["The perceived ", { kw: "worth" }, ", ", { kw: "quality" }, ", and ", { kw: "value" }, " the brand commands — why people pick you when it matters most."],
    metrics: ["Price Score", "Quality Score"],
  },
];

// ── HELPERS ─────────────────────────────────────────────────────────────────────

function polarToCart(angle: number, r: number) {
  const a = angle - Math.PI / 2;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}
function angleFor(i: number) {
  return (2 * Math.PI * i) / N;
}

// ── RADAR CHART ─────────────────────────────────────────────────────────────────

function RadarChart({ activeDimensions }: { activeDimensions: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const areaRef = useRef<SVGPolygonElement>(null);
  const vertexRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const centerRef = useRef<SVGCircleElement>(null);
  const scoreNumRef = useRef<HTMLDivElement>(null);
  const scoreDisplayRef = useRef<HTMLDivElement>(null);
  const currentPoints = useRef(Array.from({ length: N }, () => ({ x: CX, y: CY })));
  const animFrame = useRef<number | null>(null);

  const animate = useCallback(() => {
    const active = activeDimensions;
    let moving = false;
    for (let i = 0; i < N; i++) {
      const target = i < active ? polarToCart(angleFor(i), R * VALUES[i]) : { x: CX, y: CY };
      const cur = currentPoints.current[i];
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        moving = true;
        currentPoints.current[i] = { x: cur.x + dx * 0.08, y: cur.y + dy * 0.08 };
      } else {
        currentPoints.current[i] = { ...target };
      }
    }

    // Update polygon
    if (areaRef.current) {
      areaRef.current.setAttribute("points", currentPoints.current.map(p => `${p.x},${p.y}`).join(" "));
      if (active > 0) {
        const alpha = 0.06 + 0.02 * active;
        if (active === N) {
          areaRef.current.setAttribute("fill", "rgba(196,123,90,0.18)");
          areaRef.current.setAttribute("stroke", "rgba(232,221,212,0.4)");
        } else {
          areaRef.current.setAttribute("fill", `rgba(196,123,90,${alpha})`);
          areaRef.current.setAttribute("stroke", COLORS[active - 1]);
        }
        areaRef.current.setAttribute("stroke-width", "2");
      }
    }

    // Update vertices
    for (let i = 0; i < N; i++) {
      const v = vertexRefs.current[i];
      if (!v) continue;
      v.setAttribute("cx", String(currentPoints.current[i].x));
      v.setAttribute("cy", String(currentPoints.current[i].y));
      v.setAttribute("r", i < active ? "5" : "0");
      v.setAttribute("opacity", i < active ? "1" : "0");
    }

    // Update labels
    for (let i = 0; i < N; i++) {
      const l = labelRefs.current[i];
      if (!l) continue;
      l.style.fill = i < active ? COLORS[i] : "";
    }

    // Score
    if (scoreDisplayRef.current && scoreNumRef.current) {
      if (active > 0) {
        scoreDisplayRef.current.style.opacity = "1";
        let sum = 0;
        for (let i = 0; i < active; i++) sum += VALUES[i];
        scoreNumRef.current.textContent = (sum / active * 100).toFixed(0);
        scoreNumRef.current.style.color = COLORS[active - 1];
      } else {
        scoreDisplayRef.current.style.opacity = "0";
      }
    }

    // Center pulse
    if (centerRef.current) {
      centerRef.current.style.opacity = active === 0 ? "1" : "0";
    }

    if (moving) {
      animFrame.current = requestAnimationFrame(animate);
    } else {
      animFrame.current = null;
    }
  }, [activeDimensions]);

  useEffect(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(animate);
    return () => { if (animFrame.current) cancelAnimationFrame(animFrame.current); };
  }, [animate]);

  // Build static SVG elements
  const rings = [];
  for (let ring = 1; ring <= 4; ring++) {
    const rr = (R / 4) * ring;
    const pts = Array.from({ length: N }, (_, i) => {
      const p = polarToCart(angleFor(i), rr);
      return `${p.x},${p.y}`;
    }).join(" ");
    rings.push(<polygon key={ring} points={pts} fill="none" stroke="rgba(232,221,212,0.04)" strokeWidth={0.5} />);
  }

  const axes = Array.from({ length: N }, (_, i) => {
    const p = polarToCart(angleFor(i), R + 10);
    return <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="rgba(232,221,212,0.08)" strokeWidth={1} />;
  });

  const labels = Array.from({ length: N }, (_, i) => {
    const p = polarToCart(angleFor(i), R + 32);
    return (
      <text
        key={i}
        ref={el => { labelRefs.current[i] = el; }}
        x={p.x} y={p.y}
        textAnchor="middle" dominantBaseline="central"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 2, fill: "#8a7e74", transition: "fill 0.5s" }}
      >
        {LABELS[i]}
      </text>
    );
  });

  const vertices = Array.from({ length: N }, (_, i) => (
    <circle
      key={i}
      ref={el => { vertexRefs.current[i] = el; }}
      cx={CX} cy={CY} r={0}
      fill={COLORS[i]}
      opacity={0}
      style={{ transition: "r 0.4s 0.3s, opacity 0.4s 0.3s" }}
    />
  ));

  return (
    <div style={{ position: "relative", width: "min(500px, 42vw)", height: "min(500px, 42vw)" }}>
      <svg ref={svgRef} viewBox="0 0 500 500" style={{ width: "100%", height: "100%" }}>
        {rings}
        {axes}
        {labels}
        <circle ref={centerRef} cx={CX} cy={CY} r={3} fill="rgba(232,221,212,0.5)" style={{ animation: "radarPulse 3s infinite" }} />
        <polygon
          ref={areaRef}
          points={Array(N).fill(`${CX},${CY}`).join(" ")}
          fill="rgba(196,123,90,0.12)"
          stroke="rgba(196,123,90,0.5)"
          strokeWidth={1.5}
        />
        {vertices}
      </svg>
      <div ref={scoreDisplayRef} style={{ position: "absolute", bottom: -72, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: 0, transition: "opacity 0.6s" }}>
        <div ref={scoreNumRef} style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700 }}>0</div>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#8a7e74", marginTop: 4 }}>ICONIC Score</div>
      </div>
    </div>
  );
}

// ── SCROLLYTELLING ──────────────────────────────────────────────────────────────

function ScrollytellingSection({ onFirstRef }: { onFirstRef: (el: HTMLElement | null) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDimensions, setActiveDimensions] = useState(0);
  const [activePanels, setActivePanels] = useState<Set<number>>(new Set());
  const [kwPanels, setKwPanels] = useState<Set<number>>(new Set());

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

    const observer = new IntersectionObserver((entries) => {
      setActivePanels(prev => {
        const next = new Set(prev);
        entries.forEach(entry => {
          const idx = parseInt((entry.target as HTMLElement).dataset.dim ?? "0");
          if (entry.isIntersecting) next.add(idx);
          else next.delete(idx);
        });
        let maxActive = 0;
        next.forEach(i => { maxActive = Math.max(maxActive, i + 1); });
        setActiveDimensions(maxActive);
        return next;
      });
    }, { threshold: 0.45, rootMargin: "-10% 0px -10% 0px" });

    const kwObs = new IntersectionObserver((entries) => {
      setKwPanels(prev => {
        const next = new Set(prev);
        entries.forEach(entry => {
          const idx = parseInt((entry.target as HTMLElement).dataset.dim ?? "0");
          if (entry.isIntersecting) next.add(idx);
          else next.delete(idx);
        });
        return next;
      });
    }, { threshold: 0.5, rootMargin: "-35% 0px -35% 0px" });

    panels.forEach(p => { observer.observe(p); kwObs.observe(p); });
    return () => { observer.disconnect(); kwObs.disconnect(); };
  }, []);

  // Hero observer to reset radar
  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveDimensions(0);
        setActivePanels(new Set());
      }
    }, { threshold: 0.3 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={el => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        onFirstRef(el);
      }}
      style={{ position: "relative", display: "flex", minHeight: "100vh", backgroundColor: "#1a1310" }}
      className="scrolly-container-root"
    >
      {/* Sticky radar — rendered first in DOM so it's on top on mobile */}
      <div style={{ flex: 1, position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, order: 2 }} className="scrolly-chart-col">
        <RadarChart activeDimensions={activeDimensions} />
      </div>

      {/* Text panels — order:1 puts them on the left on desktop */}
      <div style={{ flex: 1, padding: "0 5%", position: "relative", zIndex: 2, order: 1 }} className="scrolly-text-col">
        {DIMENSIONS.map((dim, i) => {
          const isActive = activePanels.has(i);
          const isKw = kwPanels.has(i);
          const color = COLORS[i];
          return (
            <div
              key={i}
              ref={el => { panelRefs.current[i] = el; }}
              data-dim={i}
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "60px 0",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: 4, textTransform: "uppercase", color, marginBottom: 32 }}>
                Dimension {i + 1} of 6
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(64px, 8vw, 96px)", fontWeight: 900, lineHeight: 1, color, marginBottom: 8 }}>
                {dim.letter}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 600, marginBottom: 20, lineHeight: 1.2, color: "#e8ddd4" }}>
                {dim.name}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: "#8a7e74", maxWidth: 380 }}>
                {dim.desc.map((part, j) =>
                  typeof part === "string" ? (
                    <span key={j}>{part}</span>
                  ) : (
                    <span
                      key={j}
                      style={{
                        color: isKw ? color : "#8a7e74",
                        textShadow: isKw ? `0 0 24px ${color}44` : "none",
                        transition: "color 0.5s ease, text-shadow 0.5s ease",
                        transitionDelay: isKw ? `${0.2 * (j / 2 + 1)}s` : "0s",
                      }}
                    >
                      {part.kw}
                    </span>
                  )
                )}
              </div>
              <div style={{ display: "flex", gap: 24, marginTop: 28 }}>
                {dim.metrics.map((m, j) => (
                  <span key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "#8a7e74", whiteSpace: "nowrap" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── LANDING PAGE ────────────────────────────────────────────────────────────────

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
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, background: "#1a1310", color: "#e8ddd4", WebkitFontSmoothing: "antialiased" }}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* Global styles */}
      <style>{`
        @keyframes radarPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%      { opacity: 0.8; transform: scaleY(1.3); }
        }
        .landing-fade-1 { opacity: 0; animation: fadeUp 0.8s 0.3s forwards; }
        .landing-fade-2 { opacity: 0; animation: fadeUp 0.8s 0.5s forwards; }
        .landing-fade-3 { opacity: 0; animation: fadeUp 0.8s 0.7s forwards; }
        .landing-fade-4 { opacity: 0; animation: fadeUp 0.8s 0.9s forwards; }
        .landing-fade-5 { opacity: 0; animation: fadeUp 0.8s 1.2s forwards; }

        @media (max-width: 900px) {
          .scrolly-container-root {
            display: block !important;
          }
          .scrolly-chart-col {
            order: 0 !important;
            position: sticky !important;
            top: 0 !important;
            height: 45vh !important;
            z-index: 3 !important;
            width: 100% !important;
          }
          .scrolly-text-col {
            order: 1 !important;
          }
          .scrolly-chart-col > div {
            width: min(280px, 65vw) !important;
            height: min(280px, 65vw) !important;
          }
          .scrolly-text-col { padding: 0 24px !important; }
          .scrolly-text-col > div { min-height: 70vh !important; padding: 40px 0 !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px 40px",
        background: scrolled ? "rgba(26,19,16,0.95)" : "linear-gradient(to bottom, rgba(26,19,16,0.95), transparent)",
        pointerEvents: "none",
        transition: "background 0.3s",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, letterSpacing: 6, textTransform: "uppercase", color: "#e8ddd4", pointerEvents: "auto" }}>
          Iconic
        </div>
        <Link to="/demo" style={{
          background: "#c47b5a", color: "#fff", border: "none", padding: "10px 24px",
          borderRadius: 24, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
          cursor: "pointer", textDecoration: "none", pointerEvents: "auto",
        }}>
          Try Demo
        </Link>
      </nav>

      {/* HERO */}
      <section data-hero style={{
        height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(196,123,90,0.12), transparent 70%)", pointerEvents: "none" }} />

        <div className="landing-fade-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 4, textTransform: "uppercase", color: "#c47b5a", marginBottom: 28 }}>
          Brand Health Intelligence
        </div>
        <h1 className="landing-fade-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: "#e8ddd4" }}>
          Know your brand.
        </h1>
        <div className="landing-fade-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 300, color: "#8a7e74", marginBottom: 48 }}>
          Before the market does.
        </div>
        <div className="landing-fade-4" style={{ display: "flex", gap: 16 }}>
          <Link to="/demo" style={{
            background: "#c47b5a", color: "#fff", border: "none", padding: "14px 36px",
            borderRadius: 32, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
            cursor: "pointer", textDecoration: "none",
          }}>
            Try Demo →
          </Link>
          <button onClick={handleLearnMore} style={{
            background: "transparent", color: "#e8ddd4",
            border: "1px solid rgba(232,221,212,0.25)", padding: "14px 36px",
            borderRadius: 32, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 400,
            cursor: "pointer",
          }}>
            Learn More ↓
          </button>
        </div>

        <div className="landing-fade-5" style={{ position: "absolute", bottom: 40, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#8a7e74" }}>
          scroll to explore
          <div style={{ width: 1, height: 32, background: "#8a7e74", margin: "12px auto 0", animation: "scrollPulse 2s infinite" }} />
        </div>
      </section>

      {/* SCROLLYTELLING */}
      <ScrollytellingSection onFirstRef={el => { iconicRef.current = el; }} />

      {/* CLOSING */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", background: "#f5ece4", color: "#1a1310", padding: "80px 24px",
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
          Your brand, fully<br />understood.
        </h2>
        <p style={{ fontSize: 16, color: "#6b5e54", maxWidth: 400, marginBottom: 40, lineHeight: 1.6 }}>
          Six dimensions. One score. Complete clarity on where you stand and where to go.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <Link to="/demo" style={{
            background: "#c47b5a", color: "#fff", border: "none", padding: "14px 36px",
            borderRadius: 32, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
            cursor: "pointer", textDecoration: "none",
          }}>
            Try Demo
          </Link>
          <Link to="/#subscribe" style={{
            background: "transparent", color: "#1a1310",
            border: "1px solid rgba(26,19,16,0.2)", padding: "14px 36px",
            borderRadius: 32, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 400,
            textDecoration: "none",
          }}>
            Get Full Access
          </Link>
        </div>
      </section>
    </div>
  );
}
