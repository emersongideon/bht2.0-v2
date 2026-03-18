// Brand data mapping
export const brandColors: Record<string, string> = {
  "Rhode": "#B86A54",
  "Summer Fridays": "#374762",
  "Glossier": "#DAC58C",
  "Clinique": "#ACBDA7",
  "Laneige": "#6B241E",
};

export const brandScores: Record<string, number> = {
  "Rhode": 76,
  "Summer Fridays": 68,
  "Glossier": 72,
  "Clinique": 65,
  "Laneige": 70,
};

// Helper to get color for a brand
export function getBrandColor(brandName: string): string {
  return brandColors[brandName] || "#B86A54";
}

// Helper to get score for a brand
export function getBrandScore(brandName: string): number {
  return brandScores[brandName] || 0;
}
