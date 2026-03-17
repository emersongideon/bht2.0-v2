// Re-export types so existing imports stay unchanged
export type { Dimension, Submetric } from './types';

import { useAppData } from './app-data-context';
import type { Dimension, Submetric } from './types';

// ── useDimensions ─────────────────────────────────────────────────────────────
// Returns all dimensions sorted by page_sort_order (from pre-loaded context)

interface UseDimensionsResult {
  dimensions: Dimension[];
  loading: boolean;
  error: string | null;
}

export function useDimensions(): UseDimensionsResult {
  const { dimensions, loading, error } = useAppData();
  return { dimensions, loading, error };
}

// ── useDimension (single) ─────────────────────────────────────────────────────
// Returns metadata for one specific dimension by page_key (from pre-loaded context)

interface UseDimensionResult {
  dimension: Dimension | null;
  loading: boolean;
  error: string | null;
}

export function useDimension(pageKey: string): UseDimensionResult {
  const { dimensions, loading, error } = useAppData();
  const dimension = dimensions.find((d) => d.page_key === pageKey) ?? null;
  return { dimension, loading, error };
}

// ── useSubmetrics ─────────────────────────────────────────────────────────────
// Returns submetrics for a given page_key, sorted by submetric_sort_order

interface UseSubmetricsResult {
  submetrics: Submetric[];
  loading: boolean;
  error: string | null;
}

export function useSubmetrics(pageKey: string): UseSubmetricsResult {
  const { submetricsByPage, loading, error } = useAppData();
  const submetrics = submetricsByPage[pageKey] ?? [];
  return { submetrics, loading, error };
}
