import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";

/**
 * Returns a Set of ISO date strings (YYYY-MM-DD) that have at least one
 * row in iconic_dimension_scores for the current category (any brand).
 * Used by the date picker to grey out dates with no data.
 */
export function useAvailableDates(): Set<string> {
  const { selectedCategory } = useBrand();
  const [dates, setDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data } = await supabase
        .from("iconic_dimension_scores")
        .select("date")
        .eq("category", selectedCategory);

      if (cancelled || !data) return;
      setDates(new Set(data.map((r: { date: string }) => r.date)));
    }
    load();
    return () => { cancelled = true; };
  }, [selectedCategory]);

  return dates;
}
