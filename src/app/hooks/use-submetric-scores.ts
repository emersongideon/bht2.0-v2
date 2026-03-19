import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";
import { toISODateString, computeAxisDates } from "../utils/date-utils";
import type { DateMode } from "../utils/date-utils";

type SubRow = { date: string; submetric_name: string; submetric_score: number };

export type SubmetricScores = Record<string, { score: number | null; delta: number | null; trendValues: (number | null)[] }>;

function shiftDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function avgRows(rows: SubRow[], from: string, to: string): number | null {
  const f = rows.filter((r) => r.date >= from && r.date <= to);
  if (!f.length) return null;
  return f.reduce((s, r) => s + r.submetric_score, 0) / f.length;
}

function r1(n: number) {
  return Math.round(n * 10) / 10;
}

export function useSubmetricScores(pageKey: string): SubmetricScores {
  const { mainBrand, selectedCategory } = useBrand();
  const { dateMode, selectedDate } = useDateMode();
  const [scores, setScores] = useState<SubmetricScores>({});

  useEffect(() => {
    setScores({});
    async function load() {
      const mode = dateMode as DateMode;
      const todayISO = toISODateString(selectedDate);

      // 7 axis dates for sparkline trend
      const axisDates = computeAxisDates(mode, selectedDate);
      const axisKeys = axisDates.map((d) => toISODateString(d));
      const trendFromISO = axisKeys[0]; // earliest axis date

      let fetchFrom: string;
      let fetchTo = todayISO;

      if (mode === "Daily") {
        fetchFrom = toISODateString(shiftDays(selectedDate, -1));
      } else if (mode === "Rolling 30") {
        fetchFrom = toISODateString(shiftDays(selectedDate, -59));
      } else {
        // Monthly
        fetchFrom = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
        fetchTo = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0));
      }

      // Use the earlier of fetchFrom and trendFromISO so we cover sparkline range
      const actualFetchFrom = trendFromISO < fetchFrom ? trendFromISO : fetchFrom;

      const { data } = await supabase
        .from("iconic_sub_metric_scores")
        .select("date, submetric_name, submetric_score")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .eq("page_key", pageKey)
        .gte("date", actualFetchFrom)
        .lte("date", fetchTo)
        .order("date", { ascending: true });

      if (!data?.length) return;

      // Group rows by submetric_name
      const bySubmetric: Record<string, SubRow[]> = {};
      for (const row of data as SubRow[]) {
        if (!bySubmetric[row.submetric_name]) bySubmetric[row.submetric_name] = [];
        bySubmetric[row.submetric_name].push(row);
      }

      const result: SubmetricScores = {};
      for (const [name, rows] of Object.entries(bySubmetric)) {
        let cur: number | null = null;
        let prev: number | null = null;

        if (mode === "Daily") {
          cur = rows.find((r) => r.date === todayISO)?.submetric_score ?? null;
          prev = rows.find((r) => r.date === toISODateString(shiftDays(selectedDate, -1)))?.submetric_score ?? null;
        } else if (mode === "Rolling 30") {
          cur = avgRows(rows, toISODateString(shiftDays(selectedDate, -29)), todayISO);
          prev = avgRows(rows, toISODateString(shiftDays(selectedDate, -59)), toISODateString(shiftDays(selectedDate, -30)));
        } else {
          // Monthly
          const y = selectedDate.getFullYear();
          const m = selectedDate.getMonth();
          cur = avgRows(rows, toISODateString(new Date(y, m, 1)), toISODateString(new Date(y, m + 1, 0)));
          prev = avgRows(rows, toISODateString(new Date(y, m - 1, 1)), toISODateString(new Date(y, m, 0)));
        }

        // Compute 7-point sparkline trend values (one per axis date)
        const trendValues: (number | null)[] = axisKeys.map((axisKey) => {
          if (mode === "Monthly") {
            const month = axisKey.substring(0, 7);
            const monthRows = rows.filter((r) => r.date.startsWith(month));
            if (!monthRows.length) return null;
            const avg = monthRows.reduce((s, r) => s + r.submetric_score, 0) / monthRows.length;
            return r1(avg);
          } else {
            const row = rows.find((r) => r.date === axisKey);
            return row ? r1(row.submetric_score) : null;
          }
        });

        result[name] = {
          score: cur !== null ? r1(cur) : null,
          delta: cur !== null && prev !== null ? r1(cur - prev) : null,
          trendValues,
        };
      }

      setScores(result);
    }
    load();
  }, [mainBrand, selectedCategory, dateMode, selectedDate, pageKey]);

  return scores;
}
