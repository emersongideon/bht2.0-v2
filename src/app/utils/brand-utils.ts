// Brand colors — mirrors BRAND_COLORS in app-data-context (canonical source of truth for colors)
export const brandColors: Record<string, string> = {
  // Beauty
  "Rhode":          "#B86A54",
  "Summer Fridays": "#374762",
  "Glossier":       "#DAC58C",
  "Clinique":       "#ACBDA7",
  "Laneige":        "#6B241E",
  // Fashion
  "Nike":           "#111111",
  "Adidas":         "#3D405B",
  "Zara":           "#8B7355",
  "H&M":            "#CC2529",
  "Uniqlo":         "#E8372A",
  // Personal Care
  "Dove":           "#7EB5D6",
  "Nivea":          "#1B3A6B",
  "CeraVe":         "#5B8DB8",
  "Cetaphil":       "#6BAA8E",
  "The Ordinary":   "#2C2C2C",
};

// Overall ICONIC scores
export const brandScores: Record<string, number> = {
  // Beauty
  "Rhode": 76, "Summer Fridays": 68, "Glossier": 72, "Clinique": 65, "Laneige": 70,
  // Fashion
  "Nike": 81, "Adidas": 77, "Zara": 69, "H&M": 63, "Uniqlo": 74,
  // Personal Care
  "Dove": 78, "Nivea": 71, "CeraVe": 75, "Cetaphil": 67, "The Ordinary": 73,
};

// Per-metric sub-scores used by each deep-dive BrandComparison section
// Keys: i1_consistency, i1_distinctiveness, c1_search, c1_social, c1_llm,
//       o_favourability, n_consistency, n_coherence, n_alignment,
//       i2_social, c2_price, c2_quality
export const brandSubScores: Record<string, Record<string, number>> = {
  "Rhode":          { i1_consistency: 85, i1_distinctiveness: 64, c1_search: 78, c1_social: 76, c1_llm: 83, o_favourability: 82, n_consistency: 82, n_coherence: 76, n_alignment: 74, i2_social: 81, c2_price: 62, c2_quality: 74 },
  "Summer Fridays": { i1_consistency: 71, i1_distinctiveness: 68, c1_search: 71, c1_social: 78, c1_llm: 72, o_favourability: 76, n_consistency: 74, n_coherence: 65, n_alignment: 62, i2_social: 78, c2_price: 58, c2_quality: 69 },
  "Glossier":       { i1_consistency: 82, i1_distinctiveness: 72, c1_search: 76, c1_social: 80, c1_llm: 80, o_favourability: 85, n_consistency: 78, n_coherence: 80, n_alignment: 68, i2_social: 84, c2_price: 68, c2_quality: 72 },
  "Clinique":       { i1_consistency: 78, i1_distinctiveness: 59, c1_search: 74, c1_social: 69, c1_llm: 81, o_favourability: 79, n_consistency: 85, n_coherence: 72, n_alignment: 79, i2_social: 74, c2_price: 71, c2_quality: 82 },
  "Laneige":        { i1_consistency: 68, i1_distinctiveness: 55, c1_search: 68, c1_social: 73, c1_llm: 77, o_favourability: 72, n_consistency: 70, n_coherence: 69, n_alignment: 71, i2_social: 70, c2_price: 65, c2_quality: 70 },
  // Fashion
  "Nike":           { i1_consistency: 90, i1_distinctiveness: 78, c1_search: 88, c1_social: 87, c1_llm: 85, o_favourability: 84, n_consistency: 88, n_coherence: 82, n_alignment: 80, i2_social: 89, c2_price: 65, c2_quality: 85 },
  "Adidas":         { i1_consistency: 84, i1_distinctiveness: 72, c1_search: 82, c1_social: 83, c1_llm: 79, o_favourability: 80, n_consistency: 82, n_coherence: 76, n_alignment: 74, i2_social: 83, c2_price: 68, c2_quality: 80 },
  "Zara":           { i1_consistency: 74, i1_distinctiveness: 65, c1_search: 76, c1_social: 78, c1_llm: 68, o_favourability: 73, n_consistency: 72, n_coherence: 68, n_alignment: 66, i2_social: 76, c2_price: 78, c2_quality: 70 },
  "H&M":            { i1_consistency: 68, i1_distinctiveness: 60, c1_search: 70, c1_social: 74, c1_llm: 62, o_favourability: 67, n_consistency: 66, n_coherence: 62, n_alignment: 60, i2_social: 72, c2_price: 82, c2_quality: 64 },
  "Uniqlo":         { i1_consistency: 80, i1_distinctiveness: 70, c1_search: 74, c1_social: 71, c1_llm: 76, o_favourability: 79, n_consistency: 78, n_coherence: 74, n_alignment: 76, i2_social: 74, c2_price: 80, c2_quality: 82 },
  // Personal Care
  "Dove":           { i1_consistency: 85, i1_distinctiveness: 68, c1_search: 80, c1_social: 76, c1_llm: 78, o_favourability: 86, n_consistency: 86, n_coherence: 80, n_alignment: 78, i2_social: 80, c2_price: 76, c2_quality: 82 },
  "Nivea":          { i1_consistency: 78, i1_distinctiveness: 62, c1_search: 74, c1_social: 70, c1_llm: 72, o_favourability: 80, n_consistency: 80, n_coherence: 72, n_alignment: 74, i2_social: 74, c2_price: 79, c2_quality: 78 },
  "CeraVe":         { i1_consistency: 82, i1_distinctiveness: 74, c1_search: 84, c1_social: 79, c1_llm: 80, o_favourability: 83, n_consistency: 84, n_coherence: 76, n_alignment: 78, i2_social: 82, c2_price: 74, c2_quality: 86 },
  "Cetaphil":       { i1_consistency: 74, i1_distinctiveness: 60, c1_search: 72, c1_social: 65, c1_llm: 71, o_favourability: 76, n_consistency: 76, n_coherence: 70, n_alignment: 72, i2_social: 72, c2_price: 77, c2_quality: 80 },
  "The Ordinary":   { i1_consistency: 80, i1_distinctiveness: 72, c1_search: 78, c1_social: 76, c1_llm: 74, o_favourability: 78, n_consistency: 80, n_coherence: 74, n_alignment: 72, i2_social: 78, c2_price: 71, c2_quality: 84 },
};

// SVG trend paths for the dashboard chart (viewBox: 0 0 600 200, lower y = higher score)
export const brandTrendPaths: Record<string, string> = {
  // Beauty
  "Rhode":          "M0,160 C40,140 80,120 120,130 C160,140 200,100 240,90 C280,80 320,70 360,60 C400,65 440,50 480,55 C520,45 560,40 600,35",
  "Summer Fridays": "M0,140 C40,135 80,145 120,140 C160,130 200,125 240,120 C280,115 320,110 360,115 C400,108 440,100 480,95 C520,90 560,85 600,80",
  "Glossier":       "M0,100 C40,105 80,98 120,95 C160,100 200,90 240,85 C280,90 320,80 360,75 C400,80 440,70 480,68 C520,65 560,60 600,55",
  "Clinique":       "M0,170 C40,165 80,160 120,158 C160,155 200,150 240,148 C280,145 320,140 360,142 C400,138 440,135 480,130 C520,128 560,125 600,120",
  "Laneige":        "M0,130 C40,128 80,125 120,120 C160,118 200,115 240,110 C280,108 320,105 360,100 C400,98 440,95 480,90 C520,88 560,85 600,82",
  // Fashion
  "Nike":           "M0,85 C40,75 80,68 120,72 C160,78 200,62 240,52 C280,46 320,40 360,38 C400,42 440,34 480,29 C520,27 560,24 600,20",
  "Adidas":         "M0,102 C40,96 80,90 120,88 C160,94 200,83 240,76 C280,72 320,68 360,65 C400,70 440,61 480,57 C520,54 560,51 600,47",
  "Zara":           "M0,142 C40,138 80,132 120,128 C160,125 200,122 240,118 C280,115 320,112 360,110 C400,112 440,107 480,103 C520,101 560,97 600,94",
  "H&M":            "M0,168 C40,164 80,159 120,156 C160,153 200,150 240,147 C280,144 320,141 360,139 C400,137 440,135 480,132 C520,130 560,127 600,124",
  "Uniqlo":         "M0,116 C40,112 80,108 120,105 C160,108 200,100 240,96 C280,94 320,90 360,87 C400,91 440,84 480,80 C520,78 560,75 600,71",
  // Personal Care
  "Dove":           "M0,96 C40,91 80,87 120,91 C160,96 200,85 240,79 C280,77 320,73 360,71 C400,75 440,67 480,63 C520,61 560,57 600,54",
  "Nivea":          "M0,126 C40,122 80,118 120,115 C160,118 200,112 240,108 C280,106 320,102 360,100 C400,104 440,96 480,92 C520,90 560,86 600,82",
  "CeraVe":         "M0,106 C40,101 80,95 120,98 C160,102 200,92 240,86 C280,84 320,80 360,77 C400,80 440,72 480,68 C520,66 560,62 600,58",
  "Cetaphil":       "M0,146 C40,142 80,138 120,135 C160,138 200,132 240,128 C280,126 320,122 360,120 C400,122 440,116 480,112 C520,110 560,106 600,102",
  "The Ordinary":   "M0,120 C40,116 80,112 120,109 C160,112 200,104 240,100 C280,98 320,94 360,91 C400,94 440,87 480,83 C520,81 560,77 600,73",
};

export function getBrandColor(brandName: string): string {
  return brandColors[brandName] ?? "#888888";
}

export function getBrandScore(brandName: string): number {
  return brandScores[brandName] ?? 50;
}

export function getBrandSubScore(brandName: string, metric: string): number {
  return brandSubScores[brandName]?.[metric] ?? brandScores[brandName] ?? 50;
}

export function getBrandTrendPath(brandName: string): string {
  return brandTrendPaths[brandName] ?? "M0,150 C200,140 400,130 600,120";
}
