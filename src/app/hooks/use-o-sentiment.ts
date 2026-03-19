import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";
import { toISODateString } from "../utils/date-utils";

export type OSentimentRow = {
  brand_name: string;
  date: string;
  o_positive_pct: number | null;
  o_neutral_pct: number | null;
  o_negative_pct: number | null;
  o_llm_rec_share: number | null;
  o_passion_score: number | null;
};

export function useOSentimentLatest(): Record<string, OSentimentRow> {
  const { selectedBrands, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();
  const [data, setData] = useState<Record<string, OSentimentRow>>({});

  useEffect(() => {
    setData({});
    async function load() {
      const { data: rows } = await supabase
        .from("o_sentiment")
        .select("brand_name, date, o_positive_pct, o_neutral_pct, o_negative_pct, o_llm_rec_share, o_passion_score")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!rows?.length) return;

      const result: Record<string, OSentimentRow> = {};
      for (const row of rows) {
        if (!result[row.brand_name]) result[row.brand_name] = row as OSentimentRow;
      }
      setData(result);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate]);

  return data;
}
