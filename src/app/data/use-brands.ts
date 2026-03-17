// Re-export Brand so existing imports stay unchanged
export type { Brand } from './types';

import { useAppData } from './app-data-context';
import type { Brand } from './types';

interface UseBrandsResult {
  categories: string[];
  brandsByCategory: Record<string, Brand[]>;
  allBrands: Brand[];
  loading: boolean;
  error: string | null;
}

/**
 * Returns brands and categories from the pre-loaded app data context.
 * No individual fetch — data is already in memory from app startup.
 */
export function useBrands(): UseBrandsResult {
  const { categories, brandsByCategory, loading, error } = useAppData();
  const allBrands = Object.values(brandsByCategory).flat();
  return { categories, brandsByCategory, allBrands, loading, error };
}
