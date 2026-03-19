import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";
import { toISODateString } from "../utils/date-utils";
import type { DateMode } from "../utils/date-utils";

type Row = { date: string; daily_dimension_score: number };

function shiftDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function avg(rows: Row[], from: string, to: string): number | null {
  const f = rows.filter((r) => r.date >= from && r.date <= to);
  if (!f.length) return null;
  return f.reduce((s, r) => s + r.daily_dimension_score, 0) / f.length;
}

function r1(n: number) { return Math.round(n * 10) / 10; }

export function useDimensionScore(pageKey: string) {
  const { mainBrand, selectedCategory } = useBrand();
  const { dateMode, selectedDate } = useDateMode();
  const [score, setScore] = useState<number | null>(null);
  const [delta, setDelta] = useState<number | null>(null);

  useEffect(() => {
    setScore(null);
    setDelta(null);
    async function load() {
      const mode = dateMode as DateMode;
      const todayISO = toISODateString(selectedDate);
      let fetchFrom: string;
      let fetchTo = todayISO;

      if (mode === "Daily") {
        fetchFrom = toISODateString(shiftDays(selectedDate, -1));
      } else if (mode === "Rolling 30") {
        fetchFrom = toISODateString(shiftDays(selectedDate, -59));
      } else {
        fetchFrom = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
        fetchTo   = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0));
      }

      const { data } = await supabase
        .from("iconic_dimension_scores")
        .select("date, daily_dimension_score")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .eq("page_key", pageKey)
        .gte("date", fetchFrom)
        .lte("date", fetchTo)
        .order("date", { ascending: true });

      if (!data?.length) return;

      const rows = data as Row[];
      let cur: number | null = null;
      let prev: number | null = null;

      if (mode === "Daily") {
        cur  = rows.find((r) => r.date === todayISO)?.daily_dimension_score ?? null;
        prev = rows.find((r) => r.date === toISODateString(shiftDays(selectedDate, -1)))?.daily_dimension_score ?? null;
      } else if (mode === "Rolling 30") {
        cur  = avg(rows, toISODateString(shiftDays(selectedDate, -29)), todayISO);
        prev = avg(rows, toISODateString(shiftDays(selectedDate, -59)), toISODateString(shiftDays(selectedDate, -30)));
      } else {
        const y = selectedDate.getFullYear(), m = selectedDate.getMonth();
        cur  = avg(rows, toISODateString(new Date(y, m, 1)),   toISODateString(new Date(y, m + 1, 0)));
        prev = avg(rows, toISODateString(new Date(y, m - 1, 1)), toISODateString(new Date(y, m, 0)));
      }

      setScore(cur  !== null ? r1(cur)        : null);
      setDelta(cur !== null && prev !== null ? r1(cur - prev) : null);
    }
    load();
  }, [mainBrand, selectedCategory, dateMode, selectedDate, pageKey]);

  return { score, delta };
}
