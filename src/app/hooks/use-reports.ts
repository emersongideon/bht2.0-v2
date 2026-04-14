import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";

// ── Raw row from iconic_reports table ─────────────────────────────────────────
type ReportRow = {
  brand_name: string;
  week_label: string;
  week_start: string;
  week_end: string;
  iconic_score: number;
  iconic_rank: number;
  iconic_delta: number;
  i1_score: number; i1_rank: number;
  c1_score: number; c1_rank: number;
  o_score: number;  o_rank: number;
  n_score: number;  n_rank: number;
  i2_score: number; i2_rank: number;
  c2_score: number; c2_rank: number;
  lead_1: string; lead_2: string;
  dim_i1: string; dim_c1: string; dim_o: string;
  dim_n: string;  dim_i2: string; dim_c2: string;
  competitive: string;
  watch_1: string; watch_2: string;
};

// ── Shape the HTML template expects ──────────────────────────────────────────
export type TemplateBrand = {
  name: string;
  category: string;
  market: string;
  period: string;
  iconicScore: number;
  rank: number;
  totalBrands: number;
  delta: number;
  dimensions: { key: string; label: string; score: number; rank: number; delta: number }[];
  trend: { month: string; score: number }[];
  radarData: { attr: string; value: number; full: number }[];
  dimensionBars: { dim: string; score: number }[];
  competitorSnapshot: { brand: string; score: number; delta: number; rank: number; self?: boolean }[];
  narratives: {
    lead: string[];
    dims: Record<string, string>;
    competitive: string;
    watch: string[];
  };
};

const DIM_LABELS: Record<string, string> = {
  I1: "Imprinted in AI",
  C1: "Capturing Attention",
  O:  "Openly Adored",
  N:  "Never Lost in Translation",
  I2: "Ingrained in Culture",
  C2: "Chosen for a Reason",
};
const DIM_SHORT: Record<string, string> = {
  I1: "Imprinted", C1: "Attention", O: "Adored",
  N: "Translation", I2: "Culture", C2: "Chosen",
};
const DIM_ORDER = ["I1", "C1", "O", "N", "I2", "C2"];

function rowScore(row: ReportRow, key: string): number {
  return (row as Record<string, number>)[`${key.toLowerCase()}_score`] ?? 0;
}
function rowRank(row: ReportRow, key: string): number {
  return (row as Record<string, number>)[`${key.toLowerCase()}_rank`] ?? 0;
}

function buildTemplateBrand(
  row: ReportRow,
  allWeekRows: ReportRow[],   // all brands for this week (competitor snapshot)
  trendRows: ReportRow[],     // all weeks for this brand (trend)
  category: string,
): TemplateBrand {
  const dimensions = DIM_ORDER.map((key) => ({
    key,
    label: DIM_LABELS[key],
    score: rowScore(row, key),
    rank:  rowRank(row, key),
    delta: 0, // not in flat table; week-over-week delta would need prior week
  }));

  const radarData = DIM_ORDER.map((key) => ({
    attr:  DIM_SHORT[key],
    value: rowScore(row, key),
    full:  100,
  }));

  const dimensionBars = [...dimensions]
    .sort((a, b) => b.score - a.score)
    .map(({ key, score }) => ({ dim: key, score }));

  // Trend: one point per week, sorted by week_label (W1, W2, …)
  const trend = [...trendRows]
    .sort((a, b) => a.week_label.localeCompare(b.week_label))
    .map((r) => ({ month: r.week_label.split("_")[0], score: r.iconic_score }));

  // Competitor snapshot: brands sorted by rank, show window around self
  const sorted = [...allWeekRows].sort((a, b) => a.iconic_rank - b.iconic_rank);
  const selfIdx = sorted.findIndex((r) => r.brand_name === row.brand_name);
  const lo = Math.max(0, selfIdx - 2);
  const hi = Math.min(sorted.length, selfIdx + 3);
  const window = sorted.slice(lo, hi);
  const competitorSnapshot = window.map((r) => ({
    brand: r.brand_name,
    score: r.iconic_score,
    delta: r.iconic_delta,
    rank:  r.iconic_rank,
    ...(r.brand_name === row.brand_name ? { self: true } : {}),
  }));

  return {
    name:         row.brand_name,
    category,
    market:       "United States",
    period:       row.week_label.replace("_", " · ").replace(/-/g, "–"),
    iconicScore:  row.iconic_score,
    rank:         row.iconic_rank,
    totalBrands:  sorted.length,
    delta:        row.iconic_delta,
    dimensions,
    trend,
    radarData,
    dimensionBars,
    competitorSnapshot,
    narratives: {
      lead:        [row.lead_1 ?? "", row.lead_2 ?? ""],
      dims: {
        I1: row.dim_i1 ?? "", C1: row.dim_c1 ?? "",
        O:  row.dim_o  ?? "", N:  row.dim_n  ?? "",
        I2: row.dim_i2 ?? "", C2: row.dim_c2 ?? "",
      },
      competitive: row.competitive ?? "",
      watch:       [row.watch_1 ?? "", row.watch_2 ?? ""],
    },
  };
}

// ── Hook: distinct week labels available in iconic_reports for this category ──
export function useReportWeeks(): { weeks: string[]; loading: boolean } {
  const { selectedCategory } = useBrand();
  const [weeks, setWeeks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setWeeks([]);
    setLoading(true);
    async function load() {
      // Step 1: get all brand names in this category
      const { data: catBrands } = await supabase
        .from("ref_category_brands")
        .select("brand_name")
        .eq("category_name", selectedCategory);

      const brandNames = (catBrands ?? []).map((r: { brand_name: string }) => r.brand_name);
      if (!brandNames.length) { setLoading(false); return; }

      // Step 2: get distinct week_labels for those brands
      const { data } = await supabase
        .from("iconic_reports")
        .select("week_label")
        .in("brand_name", brandNames);

      const unique = [
        ...new Set((data ?? []).map((r: { week_label: string }) => r.week_label)),
      ].sort((a, b) => b.localeCompare(a)); // newest first

      setWeeks(unique);
      setLoading(false);
    }
    load();
  }, [selectedCategory]);

  return { weeks, loading };
}

// ── Hook: all template brands for a given week (all category brands with data) ─
export function useReportBrands(weekLabel: string | null): { brands: TemplateBrand[]; loading: boolean } {
  const { selectedCategory } = useBrand();
  const [brands, setBrands] = useState<TemplateBrand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBrands([]);
    if (!weekLabel) return;
    setLoading(true);

    async function load() {
      // Step 1: all brands in this category
      const { data: catBrands } = await supabase
        .from("ref_category_brands")
        .select("brand_name")
        .eq("category_name", selectedCategory);

      const brandNames = (catBrands ?? []).map((r: { brand_name: string }) => r.brand_name);
      if (!brandNames.length) { setLoading(false); return; }

      // Step 2: all weeks for trend (slim columns)
      const { data: allWeeksData } = await supabase
        .from("iconic_reports")
        .select("brand_name,week_label,iconic_score,iconic_rank,iconic_delta")
        .in("brand_name", brandNames);

      // Step 3: full rows for this week
      const { data: weekData } = await supabase
        .from("iconic_reports")
        .select("*")
        .in("brand_name", brandNames)
        .eq("week_label", weekLabel)
        .order("iconic_rank", { ascending: true });

      const allWeeks = (allWeeksData ?? []) as ReportRow[];
      const weekRows = (weekData ?? []) as ReportRow[];

      const result = weekRows.map((row) => {
        const trendRows = allWeeks.filter((r) => r.brand_name === row.brand_name);
        return buildTemplateBrand(row, weekRows, trendRows, selectedCategory);
      });

      setBrands(result);
      setLoading(false);
    }
    load();
  }, [selectedCategory, weekLabel]);

  return { brands, loading };
}
