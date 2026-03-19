import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";
import { toISODateString } from "../utils/date-utils";

// brand_name → submetric_name → score
export type AllBrandsSubmetricScores = Record<string, Record<string, number | null>>;

export function useAllBrandsSubmetricScores(pageKey: string): AllBrandsSubmetricScores {
  const { selectedBrands, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();
  const [scores, setScores] = useState<AllBrandsSubmetricScores>({});

  useEffect(() => {
    setScores({});
    async function load() {
      const { data } = await supabase
        .from("iconic_sub_metric_scores")
        .select("brand_name, date, submetric_name, submetric_score")
        .eq("category_name", selectedCategory)
        .eq("page_key", pageKey)
        .in("brand_name", selectedBrands)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!data?.length) return;

      // For each brand+submetric pair, keep only the most recent date's score
      const result: AllBrandsSubmetricScores = {};
      const seen = new Set<string>();
      for (const row of data) {
        const key = `${row.brand_name}__${row.submetric_name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        if (!result[row.brand_name]) result[row.brand_name] = {};
        result[row.brand_name][row.submetric_name] = Math.round(row.submetric_score * 10) / 10;
      }

      setScores(result);
    }
    load();
  }, [selectedBrands, selectedCategory, pageKey, selectedDate]);

  return scores;
}
