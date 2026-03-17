export interface DimensionConfig {
  key: string;
  letter: string;
  name: string;
  fullTitle: string;
  color: string;
  score: number;
  delta: number;
  description: string;
  subMetrics: {
    name: string;
    score: number;
    delta: number;
    source: "LLM" | "Search" | "Social";
  }[];
  trendLines: {
    name: string;
    color: string;
    width: number;
    path: string;
  }[];
  insight: {
    body: string;
    layer: "Predictive" | "Cultural Pulse";
  };
  radarAxes: string[];
  radarBrands: {
    name: string;
    color: string;
    values: number[];
  }[];
}

// Reusable brand radar data per dimension
const defaultBrands = (metricCount: number) => [
  { name: "Rhode", color: "#B86A54", values: Array.from({ length: metricCount }, (_, i) => 0.7 + Math.sin(i * 1.3) * 0.15) },
  { name: "Summer Fridays", color: "#374762", values: Array.from({ length: metricCount }, (_, i) => 0.6 + Math.cos(i * 1.7) * 0.12) },
  { name: "Glossier", color: "#DAC58C", values: Array.from({ length: metricCount }, (_, i) => 0.75 + Math.sin(i * 2.1) * 0.13) },
  { name: "Clinique", color: "#ACBDA7", values: Array.from({ length: metricCount }, (_, i) => 0.55 + Math.cos(i * 0.9) * 0.18) },
  { name: "Laneige", color: "#6B241E", values: Array.from({ length: metricCount }, (_, i) => 0.65 + Math.sin(i * 1.6) * 0.14) },
];

// Brand trend lines - each brand's dimension score over time
const brandTrendPaths: { name: string; color: string; width: number; path: string }[] = [
  { name: "Rhode", color: "#B86A54", width: 2.5, path: "M0,120 C40,110 80,100 120,95 C160,90 200,80 240,75 C280,70 320,60 360,55 C400,50 440,45 480,40 C520,35 560,30 600,25" },
  { name: "Summer Fridays", color: "#374762", width: 1.5, path: "M0,100 C40,105 80,110 120,108 C160,112 200,115 240,118 C280,120 320,118 360,122 C400,125 440,128 480,130 C520,132 560,130 600,135" },
  { name: "Glossier", color: "#DAC58C", width: 1.5, path: "M0,90 C40,88 80,92 120,90 C160,88 200,86 240,88 C280,86 320,84 360,86 C400,84 440,82 480,84 C520,82 560,80 600,82" },
  { name: "Clinique", color: "#ACBDA7", width: 1.5, path: "M0,140 C40,138 80,135 120,132 C160,130 200,128 240,125 C280,122 320,120 360,118 C400,115 440,112 480,110 C520,108 560,105 600,102" },
  { name: "Laneige", color: "#6B241E", width: 1.5, path: "M0,130 C40,128 80,125 120,120 C160,118 200,115 240,110 C280,108 320,105 360,100 C400,98 440,95 480,90 C520,88 560,85 600,82" },
];

function shadeColor(hex: string, factor: number): string {
  // lighten/darken by mixing with white or darkening
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * factor);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

export const dimensionConfigs: DimensionConfig[] = [
  {
    key: "I1",
    letter: "I",
    name: "Imprinted in AI",
    fullTitle: "I — Imprinted in AI",
    color: "var(--dim-I1)",
    score: 74,
    delta: 2.8,
    description: "How deeply and distinctly the brand is encoded in the minds of machines.",
    subMetrics: [
      { name: "LLM Consistency", score: 85, delta: 3.1, source: "LLM" },
      { name: "LLM Distinctiveness", score: 64, delta: -1.2, source: "LLM" },
      { name: "LLM Value Associations", score: 71, delta: 0, source: "LLM" },
    ],
    trendLines: brandTrendPaths,
    insight: {
      body: "LLM Consistency is the #1 predictor of sales performance (p = 0.0002, 6-month lead). When AI systems encode a brand consistently, market share follows.",
      layer: "Predictive",
    },
    radarAxes: ["Consistency", "Distinctiveness", "Value Assoc.", "Sentiment", "Recall"],
    radarBrands: defaultBrands(5),
  },
  {
    key: "C1",
    letter: "C",
    name: "Capturing Attention",
    fullTitle: "C — Capturing Attention",
    color: "var(--dim-C1)",
    score: 82,
    delta: 3.1,
    description: "The cultural energy and momentum the brand carries right now.",
    subMetrics: [
      { name: "Search Volume", score: 88, delta: 4.2, source: "Search" },
      { name: "Search Momentum", score: 79, delta: 2.6, source: "Search" },
      { name: "Share of Search", score: 81, delta: 1.9, source: "Search" },
      { name: "Social Engagement", score: 76, delta: 1.4, source: "Social" },
      { name: "LLM Surface Rank", score: 83, delta: 5.1, source: "LLM" },
    ],
    trendLines: brandTrendPaths,
    insight: {
      body: "Share of Search (p=0.017), Search Momentum (p=0.023), and Search Volume (p=0.034) all predict sales 2–4 months ahead. Search intent precedes purchase.",
      layer: "Predictive",
    },
    radarAxes: ["Search Vol.", "Momentum", "Share of Search", "Social Eng.", "LLM Rank"],
    radarBrands: defaultBrands(5),
  },
  {
    key: "O",
    letter: "O",
    name: "Openly Adored",
    fullTitle: "O — Openly Adored",
    color: "var(--dim-O)",
    score: 85,
    delta: 1.6,
    description: "What people and machines actually say and feel about the brand.",
    subMetrics: [
      { name: "Social Sentiment", score: 89, delta: 2.3, source: "Social" },
      { name: "Favourability", score: 82, delta: 0.8, source: "Social" },
      { name: "LLM Recommendation Share", score: 79, delta: 1.5, source: "LLM" },
    ],
    trendLines: brandTrendPaths,
    insight: {
      body: "Social Sentiment (p=0.033) predicts sales at 6-month lead. Consistent with Binet & Field's finding that emotional brand-building produces durable growth.",
      layer: "Cultural Pulse",
    },
    radarAxes: ["Sentiment", "Favourability", "LLM Rec.", "Advocacy", "Engagement"],
    radarBrands: defaultBrands(5),
  },
  {
    key: "N",
    letter: "N",
    name: "Never Lost in Translation",
    fullTitle: "N — Never Lost in Translation",
    color: "var(--dim-N)",
    score: 71,
    delta: 0.9,
    description: "How clearly the brand tells its story — and whether the world receives it as intended.",
    subMetrics: [
      { name: "Brand Communication Score", score: 68, delta: 1.2, source: "Social" },
      { name: "Coherence", score: 72, delta: 0.4, source: "Social" },
      { name: "Sender Receiver Alignment", score: 74, delta: 1.1, source: "Social" },
    ],
    trendLines: brandTrendPaths,
    insight: {
      body: "Sender-Receiver Gap (p=0.003) is the 2nd strongest predictor at just 1-month lead. When brand message lands as intended, sales respond immediately.",
      layer: "Predictive",
    },
    radarAxes: ["Communication", "Coherence", "S-R Alignment", "Clarity", "Consistency"],
    radarBrands: defaultBrands(5),
  },
  {
    key: "I2",
    letter: "I",
    name: "Ingrained in Culture",
    fullTitle: "I — Ingrained in Culture",
    color: "var(--dim-I2)",
    score: 78,
    delta: 2.3,
    description: "The values, aesthetics, and symbolic meaning the brand owns in culture.",
    subMetrics: [
      { name: "Social Imagery Score", score: 81, delta: 3.0, source: "Social" },
      { name: "Value Associations", score: 76, delta: 1.8, source: "Social" },
      { name: "Attribute Performance", score: 74, delta: 1.6, source: "Social" },
    ],
    trendLines: brandTrendPaths,
    insight: {
      body: "Social Imagery (p=0.037) and Attribute Performance (p=0.031) predict at 6-month leads. Imagery is the slow-burn investment that compounds into unassailable brand equity.",
      layer: "Cultural Pulse",
    },
    radarAxes: ["Imagery", "Values", "Attributes", "Aesthetics", "Symbolism"],
    radarBrands: defaultBrands(5),
  },
  {
    key: "C2",
    letter: "C",
    name: "Chosen for a Reason",
    fullTitle: "C — Chosen for a Reason",
    color: "var(--dim-C2)",
    score: 66,
    delta: -1.2,
    description: "The perceived worth, quality, and value the brand commands.",
    subMetrics: [
      { name: "Value Score", score: 63, delta: -1.8, source: "Social" },
      { name: "Share of Value Conversations", score: 69, delta: -0.6, source: "Social" },
    ],
    trendLines: brandTrendPaths,
    insight: {
      body: "Share of Value Conversations (p=0.034) predicts sales at 2-month lead. A direct signal of purchase consideration.",
      layer: "Predictive",
    },
    radarAxes: ["Value", "Quality", "Price Perc.", "Worth", "Consideration"],
    radarBrands: defaultBrands(5),
  },
];

export function getDimensionConfig(key: string): DimensionConfig | undefined {
  return dimensionConfigs.find((d) => d.key === key);
}