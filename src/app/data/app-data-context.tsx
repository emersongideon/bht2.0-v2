import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Brand, Dimension, Submetric } from './types';

// ── Colour mappings (not stored in DB) ───────────────────────────────────────

export const BRAND_COLORS: Record<string, string> = {
  // Beauty
  'Rhode':          '#B86A54',
  'Summer Fridays': '#374762',
  'Glossier':       '#DAC58C',
  'Clinique':       '#ACBDA7',
  'Laneige':        '#6B241E',
  // Fashion
  'Nike':           '#111111',
  'Adidas':         '#3D405B',
  'Zara':           '#8B7355',
  'H&M':            '#CC2529',
  'Uniqlo':         '#E8372A',
  // Personal Care
  'Dove':           '#7EB5D6',
  'Nivea':          '#1B3A6B',
  'CeraVe':         '#5B8DB8',
  'Cetaphil':       '#6BAA8E',
  'The Ordinary':   '#2C2C2C',
};

export const DIM_COLOR: Record<string, string> = {
  I1: 'var(--dim-I1)',
  C1: 'var(--dim-C1)',
  O:  'var(--dim-O)',
  N:  'var(--dim-N)',
  I2: 'var(--dim-I2)',
  C2: 'var(--dim-C2)',
};

// ── Context shape ─────────────────────────────────────────────────────────────

interface AppDataState {
  categories: string[];
  brandsByCategory: Record<string, Brand[]>;
  dimensions: Dimension[];
  submetricsByPage: Record<string, Submetric[]>;
  loading: boolean;
  error: string | null;
}

const defaultState: AppDataState = {
  categories: [],
  brandsByCategory: {},
  dimensions: [],
  submetricsByPage: {},
  loading: true,
  error: null,
};

const AppDataContext = createContext<AppDataState>(defaultState);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppDataState>(defaultState);

  useEffect(() => {
    async function loadAll() {
      // Fetch all 3 ref tables in parallel — one round-trip to Supabase
      const [brandsResult, dimensionsResult, submetricsResult] = await Promise.all([
        supabase.from('ref_category_brands').select('category_name, brand_name'),
        supabase.from('ref_dimensions').select('page_key, page_letter, page_name, page_description, page_sort_order').order('page_sort_order', { ascending: true }),
        supabase.from('ref_submetrics').select('page_key, submetric_name, submetric_sort_order').order('submetric_sort_order', { ascending: true }),
      ]);

      const err = brandsResult.error?.message ?? dimensionsResult.error?.message ?? submetricsResult.error?.message ?? null;
      if (err) {
        setState((s) => ({ ...s, loading: false, error: err }));
        return;
      }

      // ── Process brands ──────────────────────────────────────────────────────
      const cats: string[] = [];
      const byCategory: Record<string, Brand[]> = {};

      for (const row of brandsResult.data ?? []) {
        const cat  = row.category_name as string;
        const name = row.brand_name as string;
        if (!byCategory[cat]) { cats.push(cat); byCategory[cat] = []; }
        if (!byCategory[cat].find((b) => b.name === name)) {
          byCategory[cat].push({ name, color: BRAND_COLORS[name] ?? '#888888' });
        }
      }

      // ── Process dimensions ──────────────────────────────────────────────────
      const dimensions: Dimension[] = (dimensionsResult.data ?? []).map((row) => ({
        page_key:        row.page_key,
        page_letter:     row.page_letter,
        page_name:       row.page_name,
        page_description:row.page_description,
        page_sort_order: row.page_sort_order,
        colorVar:        DIM_COLOR[row.page_key] ?? 'var(--text-muted)',
      }));

      // ── Process submetrics ──────────────────────────────────────────────────
      const submetricsByPage: Record<string, Submetric[]> = {};
      for (const row of submetricsResult.data ?? []) {
        const key = row.page_key as string;
        if (!submetricsByPage[key]) submetricsByPage[key] = [];
        submetricsByPage[key].push({
          page_key:             key,
          submetric_name:       row.submetric_name,
          submetric_sort_order: row.submetric_sort_order,
        });
      }

      setState({
        categories: cats,
        brandsByCategory: byCategory,
        dimensions,
        submetricsByPage,
        loading: false,
        error: null,
      });
    }

    loadAll();
  }, []); // runs exactly once on app mount

  // ── Loading screen ──────────────────────────────────────────────────────────
  if (state.loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'var(--bg-surface, #F5F0EB)',
          fontFamily: 'var(--font-body, sans-serif)',
          color: 'var(--text-muted, #9A8F87)',
          fontSize: 14,
          gap: 10,
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            border: '2px solid var(--border-color, #E0D8D0)',
            borderTopColor: 'var(--accent-primary, #B86A54)',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }}
        />
        Loading…
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (state.error) {
    return (
      <div style={{ padding: 32, fontFamily: 'sans-serif', color: '#B86A54' }}>
        Failed to load app data: {state.error}
      </div>
    );
  }

  return (
    <AppDataContext.Provider value={state}>
      {children}
    </AppDataContext.Provider>
  );
}

// ── Consumer hook ─────────────────────────────────────────────────────────────

export function useAppData(): AppDataState {
  return useContext(AppDataContext);
}
