import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";
import { toISODateString } from "../utils/date-utils";

export type C1LatestRow = {
  brand_name: string;
  date: string;
  c1_scale_score: number | null;
  c1_scale_share_of_search_pct: number | null;
  c1_scale_total_followers: number | null;
  c1_scale_interactions: number | null;
  c1_scale_llm_rank: number | null;
  c1_velocity_score: number | null;
  c1_velocity_search_momentum_pct: number | null;
  c1_velocity_follower_growth_pct: number | null;
  c1_velocity_interactions_growth: number | null;
  c1_velocity_llm_rank_change: number | null;
};

export function useC1LatestMetrics(): Record<string, C1LatestRow> {
  const { selectedBrands, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();
  const [data, setData] = useState<Record<string, C1LatestRow>>({});

  useEffect(() => {
    setData({});
    async function load() {
      const { data: rows } = await supabase
        .from("c1_attention_metrics")
        .select("brand_name, date, c1_scale_score, c1_scale_share_of_search_pct, c1_scale_total_followers, c1_scale_interactions, c1_scale_llm_rank, c1_velocity_score, c1_velocity_search_momentum_pct, c1_velocity_follower_growth_pct, c1_velocity_interactions_growth, c1_velocity_llm_rank_change")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!rows?.length) return;

      const result: Record<string, C1LatestRow> = {};
      for (const row of rows) {
        if (!result[row.brand_name]) result[row.brand_name] = row as C1LatestRow;
      }
      setData(result);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate]);

  return data;
}
