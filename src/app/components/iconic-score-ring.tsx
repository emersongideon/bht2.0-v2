import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";

type ScoreRow = { date: string; daily_iconic_score: number };

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function shiftDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function avgRows(rows: ScoreRow[], from: string, to: string): number | null {
  const filtered = rows.filter((r) => r.date >= from && r.date <= to);
  if (!filtered.length) return null;
  return filtered.reduce((s, r) => s + r.daily_iconic_score, 0) / filtered.length;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function IconicScoreRing({ height }: { height?: number }) {
  const { mainBrand, selectedCategory } = useBrand();
  const { dateMode, selectedDate } = useDateMode();
  const [score, setScore] = useState<number | null>(null);
  const [delta, setDelta] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const todayISO = isoDate(selectedDate);
      let fetchFrom: string;
      let fetchTo: string = todayISO;

      if (dateMode === "Daily") {
        fetchFrom = isoDate(shiftDays(selectedDate, -1)); // today + yesterday
      } else if (dateMode === "Rolling 30") {
        fetchFrom = isoDate(shiftDays(selectedDate, -59)); // 60 days for delta
      } else {
        // Monthly: current month + previous month
        fetchFrom = isoDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
        fetchTo = isoDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0));
      }

      const { data } = await supabase
        .from("iconic_scores")
        .select("date, daily_iconic_score")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .gte("date", fetchFrom)
        .lte("date", fetchTo)
        .order("date", { ascending: true });

      if (!data?.length) {
        setScore(null);
        setDelta(null);
        return;
      }

      let cur: number | null = null;
      let prev: number | null = null;

      if (dateMode === "Daily") {
        const todayRow = data.find((r) => r.date === todayISO);
        const yestRow = data.find((r) => r.date === isoDate(shiftDays(selectedDate, -1)));
        cur = todayRow?.daily_iconic_score ?? null;
        prev = yestRow?.daily_iconic_score ?? null;
      } else if (dateMode === "Rolling 30") {
        cur = avgRows(data, isoDate(shiftDays(selectedDate, -29)), todayISO);
        prev = avgRows(data, isoDate(shiftDays(selectedDate, -59)), isoDate(shiftDays(selectedDate, -30)));
      } else {
        // Monthly
        const currStart = isoDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
        const currEnd = isoDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0));
        const prevStart = isoDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
        const prevEnd = isoDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0));
        cur = avgRows(data, currStart, currEnd);
        prev = avgRows(data, prevStart, prevEnd);
      }

      setScore(cur !== null ? round1(cur) : null);
      setDelta(cur !== null && prev !== null ? round1(cur - prev) : null);
    }

    load();
  }, [mainBrand, selectedCategory, dateMode, selectedDate]);

  const displayScore = score ?? 0;
  const circumference = 2 * Math.PI * 52;
  const progress = (displayScore / 100) * circumference;
  const isPositive = delta === null || delta >= 0;

  return (
    <div
      className="flex flex-col items-center justify-center relative w-full md:w-[180px]"
      style={{
        height: height ?? "auto",
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: height ? "16px 12px" : "12px",
        border: "1px solid var(--border-subtle)",
        gap: 6,
      }}
    >
      {/* "HOW ICONIC IS YOUR BRAND?" label */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          textAlign: "center",
          maxWidth: "90%",
          lineHeight: 1.3,
        }}
      >
        HOW ICONIC IS YOUR BRAND?
      </span>

      {/* Ring */}
      <div className="relative" style={{ width: 120, height: 120, flexShrink: 0 }}>
        {/* Glow background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "var(--accent-primary)",
            filter: "blur(60px)",
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: "relative", zIndex: 1 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-color)" strokeWidth="8" />
          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference - progress}`}
            strokeDashoffset={circumference * 0.25}
            transform="rotate(-90 60 60)"
          />
        </svg>
        {/* Center score */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 30,
            fontWeight: 700,
            color: "var(--text-primary)",
            zIndex: 2,
          }}
        >
          {score !== null ? displayScore : "—"}
        </div>
      </div>

      {/* "out of 100" */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          color: "var(--text-muted)",
        }}
      >
        out of 100
      </span>

      {/* "ICONIC" label */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        ICONIC
      </span>

      {/* Delta pill */}
      {delta !== null && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 10px",
            borderRadius: "var(--radius-pill)",
            backgroundColor: isPositive ? "rgba(74, 102, 68, 0.10)" : "rgba(180, 60, 60, 0.10)",
            color: isPositive ? "var(--color-positive)" : "var(--color-negative, #B43C3C)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(delta)}
        </span>
      )}
    </div>
  );
}
