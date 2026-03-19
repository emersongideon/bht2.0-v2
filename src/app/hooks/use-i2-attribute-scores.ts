import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";
import { toISODateString } from "../utils/date-utils";

export type I2AttributeRow = {
  i2_attribute_name: string;
  brand_name: string;
  i2_attribute_score: number;
  i2_attribute_territory: string;
};

export type I2AttributeData = {
  name: string;
  scores: Record<string, number>;
  territory: string;
};

/**
 * Returns attribute rows grouped by attribute name, with scores keyed by brand.
 * Territory is taken from the mainBrand's row for each attribute.
 */
export function useI2AttributeScores(): I2AttributeData[] {
  const { selectedBrands, selectedCategory, mainBrand } = useBrand();
  const { selectedDate } = useDateMode();
  const [data, setData] = useState<I2AttributeData[]>([]);

  useEffect(() => {
    setData([]);
    async function load() {
      const { data: rows } = await supabase
        .from("i2_attribute_scores")
        .select("brand_name, i2_attribute_name, i2_attribute_score, i2_attribute_territory, date")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!rows?.length) return;

      // Find latest date per brand
      const latestDate: Record<string, string> = {};
      for (const row of rows) {
        if (!latestDate[row.brand_name]) latestDate[row.brand_name] = row.date;
      }

      // Keep only rows at latest date per brand
      const latestRows = rows.filter(
        (row) => row.date === latestDate[row.brand_name]
      ) as I2AttributeRow[];

      // Group by attribute name
      const byAttr: Record<string, { scores: Record<string, number>; territory: string }> = {};
      for (const row of latestRows) {
        if (!byAttr[row.i2_attribute_name]) {
          byAttr[row.i2_attribute_name] = { scores: {}, territory: "" };
        }
        byAttr[row.i2_attribute_name].scores[row.brand_name] = row.i2_attribute_score;
        // Use mainBrand's territory as the row territory
        if (row.brand_name === mainBrand) {
          byAttr[row.i2_attribute_name].territory = row.i2_attribute_territory;
        }
      }

      // If mainBrand has no entry for an attribute, fall back to first brand's territory
      for (const attr of Object.values(byAttr)) {
        if (!attr.territory) {
          attr.territory = Object.values(attr.scores).length > 0 ? "" : "";
          // pick from latestRows
        }
      }

      // Build sorted result: sort by mainBrand score desc
      const result: I2AttributeData[] = Object.entries(byAttr)
        .map(([name, { scores, territory }]) => ({ name, scores, territory }))
        .sort((a, b) => (b.scores[mainBrand] ?? 0) - (a.scores[mainBrand] ?? 0));

      setData(result);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate, mainBrand]);

  return data;
}
