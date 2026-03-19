import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";
import { useDateMode } from "../contexts/date-mode-context";
import { toISODateString } from "../utils/date-utils";

export type NAlignmentRow = {
  brand_name: string;
  n_attribute_name: string;
  date: string;
  n_sender_score: number | null;
  n_receiver_score: number | null;
  n_alignment_gap: number | null;
  n_sender_alignment_status: boolean | null;
  n_receiver_alignment_status: boolean | null;
};

/** Returns latest-date rows grouped by brand: { [brandName]: NAlignmentRow[] } */
export function useNAlignmentLatest(): Record<string, NAlignmentRow[]> {
  const { selectedBrands, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();
  const [data, setData] = useState<Record<string, NAlignmentRow[]>>({});

  useEffect(() => {
    setData({});
    async function load() {
      const { data: rows } = await supabase
        .from("n_alignment")
        .select(
          "brand_name, n_attribute_name, date, n_sender_score, n_receiver_score, n_alignment_gap, n_sender_alignment_status, n_receiver_alignment_status"
        )
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

      // Group rows at latest date by brand
      const result: Record<string, NAlignmentRow[]> = {};
      for (const row of rows) {
        if (row.date === latestDate[row.brand_name]) {
          if (!result[row.brand_name]) result[row.brand_name] = [];
          result[row.brand_name].push(row as NAlignmentRow);
        }
      }

      setData(result);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate]);

  return data;
}
