// Brand data mapping for all 15 brands across 3 categories
export const brandColors: Record<string, string> = {
  // Beauty
  "Rhode": "#B86A54",
  "Summer Fridays": "#374762",
  "Glossier": "#DAC58C",
  "Clinique": "#ACBDA7",
  "Laneige": "#6B241E",
  // Fashion
  "Nike": "#111111",
  "Adidas": "#3D405B",
  "Zara": "#8B7355",
  "H&M": "#CC2529",
  "Uniqlo": "#E8372A",
  // Personal Care
  "Dove": "#7EB5D6",
  "Nivea": "#1B3A6B",
  "CeraVe": "#5B8DB8",
  "Cetaphil": "#6BAA8E",
  "The Ordinary": "#2C2C2C",
};

export const brandScores: Record<string, number> = {
  // Beauty
  "Rhode": 76,
  "Summer Fridays": 68,
  "Glossier": 72,
  "Clinique": 65,
  "Laneige": 70,
  // Fashion
  "Nike": 82,
  "Adidas": 74,
  "Zara": 66,
  "H&M": 61,
  "Uniqlo": 71,
  // Personal Care
  "Dove": 73,
  "Nivea": 69,
  "CeraVe": 78,
  "Cetaphil": 72,
  "The Ordinary": 75,
};

// Sub-metric scores per brand
// Keys: i1_consistency, i1_distinctiveness, c1_search, c1_social, c1_llm,
//       o_favourability, n_consistency, n_coherence, n_alignment, i2_social, c2_price, c2_quality
export const brandSubScores: Record<string, Record<string, number>> = {
  // Beauty
  "Rhode": {
    i1_consistency: 85, i1_distinctiveness: 64,
    c1_search: 78, c1_social: 76, c1_llm: 83,
    o_favourability: 80,
    n_consistency: 74, n_coherence: 71, n_alignment: 78,
    i2_social: 82,
    c2_price: 65, c2_quality: 79,
  },
  "Summer Fridays": {
    i1_consistency: 71, i1_distinctiveness: 68,
    c1_search: 71, c1_social: 78, c1_llm: 72,
    o_favourability: 72,
    n_consistency: 68, n_coherence: 65, n_alignment: 70,
    i2_social: 74,
    c2_price: 58, c2_quality: 71,
  },
  "Glossier": {
    i1_consistency: 82, i1_distinctiveness: 72,
    c1_search: 76, c1_social: 80, c1_llm: 80,
    o_favourability: 76,
    n_consistency: 72, n_coherence: 68, n_alignment: 74,
    i2_social: 78,
    c2_price: 62, c2_quality: 74,
  },
  "Clinique": {
    i1_consistency: 78, i1_distinctiveness: 59,
    c1_search: 74, c1_social: 69, c1_llm: 81,
    o_favourability: 68,
    n_consistency: 65, n_coherence: 62, n_alignment: 66,
    i2_social: 65,
    c2_price: 55, c2_quality: 76,
  },
  "Laneige": {
    i1_consistency: 68, i1_distinctiveness: 55,
    c1_search: 68, c1_social: 73, c1_llm: 77,
    o_favourability: 74,
    n_consistency: 70, n_coherence: 66, n_alignment: 72,
    i2_social: 70,
    c2_price: 60, c2_quality: 72,
  },
  // Fashion
  "Nike": {
    i1_consistency: 90, i1_distinctiveness: 88,
    c1_search: 92, c1_social: 90, c1_llm: 87,
    o_favourability: 84,
    n_consistency: 85, n_coherence: 82, n_alignment: 86,
    i2_social: 91,
    c2_price: 72, c2_quality: 85,
  },
  "Adidas": {
    i1_consistency: 82, i1_distinctiveness: 79,
    c1_search: 84, c1_social: 82, c1_llm: 79,
    o_favourability: 76,
    n_consistency: 77, n_coherence: 74, n_alignment: 78,
    i2_social: 83,
    c2_price: 68, c2_quality: 78,
  },
  "Zara": {
    i1_consistency: 74, i1_distinctiveness: 71,
    c1_search: 76, c1_social: 74, c1_llm: 71,
    o_favourability: 68,
    n_consistency: 69, n_coherence: 66, n_alignment: 70,
    i2_social: 72,
    c2_price: 75, c2_quality: 66,
  },
  "H&M": {
    i1_consistency: 68, i1_distinctiveness: 62,
    c1_search: 70, c1_social: 68, c1_llm: 65,
    o_favourability: 62,
    n_consistency: 62, n_coherence: 59, n_alignment: 63,
    i2_social: 65,
    c2_price: 82, c2_quality: 58,
  },
  "Uniqlo": {
    i1_consistency: 76, i1_distinctiveness: 73,
    c1_search: 78, c1_social: 72, c1_llm: 74,
    o_favourability: 72,
    n_consistency: 73, n_coherence: 70, n_alignment: 74,
    i2_social: 70,
    c2_price: 78, c2_quality: 74,
  },
  // Personal Care
  "Dove": {
    i1_consistency: 79, i1_distinctiveness: 66,
    c1_search: 76, c1_social: 73, c1_llm: 74,
    o_favourability: 75,
    n_consistency: 74, n_coherence: 70, n_alignment: 76,
    i2_social: 72,
    c2_price: 80, c2_quality: 72,
  },
  "Nivea": {
    i1_consistency: 74, i1_distinctiveness: 61,
    c1_search: 72, c1_social: 68, c1_llm: 70,
    o_favourability: 70,
    n_consistency: 70, n_coherence: 66, n_alignment: 71,
    i2_social: 66,
    c2_price: 82, c2_quality: 68,
  },
  "CeraVe": {
    i1_consistency: 84, i1_distinctiveness: 72,
    c1_search: 82, c1_social: 80, c1_llm: 85,
    o_favourability: 80,
    n_consistency: 78, n_coherence: 75, n_alignment: 80,
    i2_social: 79,
    c2_price: 74, c2_quality: 82,
  },
  "Cetaphil": {
    i1_consistency: 78, i1_distinctiveness: 64,
    c1_search: 76, c1_social: 72, c1_llm: 78,
    o_favourability: 74,
    n_consistency: 73, n_coherence: 70, n_alignment: 74,
    i2_social: 70,
    c2_price: 76, c2_quality: 76,
  },
  "The Ordinary": {
    i1_consistency: 80, i1_distinctiveness: 76,
    c1_search: 78, c1_social: 76, c1_llm: 82,
    o_favourability: 77,
    n_consistency: 76, n_coherence: 73, n_alignment: 77,
    i2_social: 75,
    c2_price: 90, c2_quality: 78,
  },
};

// 7-point trend data per brand
export const brandTrendValues: Record<string, number[]> = {
  "Rhode":          [62, 65, 68, 66, 71, 74, 78],
  "Summer Fridays": [55, 56, 54, 57, 58, 60, 62],
  "Glossier":       [70, 68, 69, 67, 66, 65, 64],
  "Clinique":       [42, 43, 44, 43, 45, 46, 48],
  "Laneige":        [50, 51, 53, 54, 55, 57, 58],
  "Nike":           [75, 77, 79, 78, 80, 82, 84],
  "Adidas":         [68, 69, 70, 71, 72, 73, 74],
  "Zara":           [60, 61, 60, 62, 63, 64, 65],
  "H&M":            [55, 54, 55, 56, 57, 58, 59],
  "Uniqlo":         [64, 65, 66, 67, 68, 69, 70],
  "Dove":           [66, 67, 68, 68, 69, 70, 71],
  "Nivea":          [62, 63, 63, 64, 65, 66, 67],
  "CeraVe":         [70, 72, 74, 73, 75, 77, 79],
  "Cetaphil":       [65, 66, 67, 67, 68, 69, 70],
  "The Ordinary":   [68, 69, 70, 71, 72, 73, 75],
};

// Helpers
export function getBrandColor(brandName: string): string {
  return brandColors[brandName] ?? "#888888";
}

export function getBrandScore(brandName: string): number {
  return brandScores[brandName] ?? 0;
}

export function getBrandSubScore(brandName: string, metricKey: string): number {
  return brandSubScores[brandName]?.[metricKey] ?? 50;
}

export function getBrandTrendValues(brandName: string): number[] {
  return brandTrendValues[brandName] ?? [50, 50, 50, 50, 50, 50, 50];
}
