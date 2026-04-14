import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";

// Shape returned by the iconic_brand_reports table.
// All complex fields (dimensions, trend, etc.) are stored as JSONB.
export type ReportRow = {
  brand_name: string;
  category_name: string;
  week_label: string;
  market: string;
  iconic_score: number;
  rank: number;
  total_brands: number;
  delta: number;
  dimensions: { key: string; label: string; score: number; rank: number; delta: number }[];
  trend: { month: string; score: number }[];
  radar_data: { attr: string; value: number; full: number }[];
  dimension_bars: { dim: string; score: number }[];
  competitor_snapshot: { brand: string; score: number; delta: number; rank: number; self?: boolean }[];
  narratives: {
    lead: string[];
    dims: Record<string, string>;
    competitive: string;
    watch: string[];
  };
};

// Shape expected by the HTML template (camelCase, matching the original JS object)
export type TemplateBrand = {
  name: string;
  category: string;
  market: string;
  period: string;
  iconicScore: number;
  rank: number;
  totalBrands: number;
  delta: number;
  dimensions: ReportRow["dimensions"];
  trend: ReportRow["trend"];
  radarData: ReportRow["radar_data"];
  dimensionBars: ReportRow["dimension_bars"];
  competitorSnapshot: ReportRow["competitor_snapshot"];
  narratives: ReportRow["narratives"];
};

function toTemplateBrand(row: ReportRow): TemplateBrand {
  return {
    name:              row.brand_name,
    category:          row.category_name,
    market:            row.market ?? "",
    period:            row.week_label,
    iconicScore:       row.iconic_score,
    rank:              row.rank,
    totalBrands:       row.total_brands,
    delta:             row.delta,
    dimensions:        row.dimensions ?? [],
    trend:             row.trend ?? [],
    radarData:         row.radar_data ?? [],
    dimensionBars:     row.dimension_bars ?? [],
    competitorSnapshot: row.competitor_snapshot ?? [],
    narratives:        row.narratives ?? { lead: [], dims: {}, competitive: "", watch: [] },
  };
}

// Returns distinct week labels available for the selected category, newest first
export function useReportWeeks(): { weeks: string[]; loading: boolean } {
  const { selectedCategory } = useBrand();
  const [weeks, setWeeks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setWeeks([]);
    setLoading(true);
    async function load() {
      const { data } = await supabase
        .from("iconic_brand_reports")
        .select("week_label")
        .eq("category_name", selectedCategory)
        .order("week_label", { ascending: false });

      const unique = [...new Set((data ?? []).map((r: { week_label: string }) => r.week_label))];
      setWeeks(unique);
      setLoading(false);
    }
    load();
  }, [selectedCategory]);

  return { weeks, loading };
}

// Returns all brands for a given category + week, mapped to template shape
export function useReportBrands(weekLabel: string | null): { brands: TemplateBrand[]; loading: boolean } {
  const { selectedCategory } = useBrand();
  const [brands, setBrands] = useState<TemplateBrand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBrands([]);
    if (!weekLabel) return;
    setLoading(true);
    async function load() {
      const { data } = await supabase
        .from("iconic_brand_reports")
        .select("*")
        .eq("category_name", selectedCategory)
        .eq("week_label", weekLabel)
        .order("rank", { ascending: true });

      setBrands((data ?? []).map((row) => toTemplateBrand(row as ReportRow)));
      setLoading(false);
    }
    load();
  }, [selectedCategory, weekLabel]);

  return { brands, loading };
}
