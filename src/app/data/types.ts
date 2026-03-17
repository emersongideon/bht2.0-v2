// Shared data types used across hooks and the app-data context.
// Define here once to avoid circular imports.

export interface Brand {
  name: string;
  color: string;
}

export interface Dimension {
  page_key: string;
  page_letter: string;
  page_name: string;
  page_description: string;
  page_sort_order: number;
  colorVar: string; // CSS variable, e.g. var(--dim-I1)
}

export interface Submetric {
  page_key: string;
  submetric_name: string;
  submetric_sort_order: number;
}
