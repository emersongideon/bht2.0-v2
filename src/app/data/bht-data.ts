/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: bht2_input.xlsx
 * Regenerate with: npm run parse-data
 */

export interface Brand {
  name: string;
  color: string;
}

export const categories: string[] = [
  "Beauty",
  "Fashion",
  "Personal Care"
];

export const brandsByCategory: Record<string, Brand[]> = {
  "Beauty": [
    {
      "name": "Rhode",
      "color": "#B86A54"
    },
    {
      "name": "Summer Fridays",
      "color": "#374762"
    },
    {
      "name": "Glossier",
      "color": "#DAC58C"
    },
    {
      "name": "Clinique",
      "color": "#ACBDA7"
    },
    {
      "name": "Laneige",
      "color": "#6B241E"
    }
  ],
  "Fashion": [
    {
      "name": "Nike",
      "color": "#111111"
    },
    {
      "name": "Adidas",
      "color": "#3D405B"
    },
    {
      "name": "Zara",
      "color": "#8B7355"
    },
    {
      "name": "H&M",
      "color": "#CC2529"
    },
    {
      "name": "Uniqlo",
      "color": "#E8372A"
    }
  ],
  "Personal Care": [
    {
      "name": "Dove",
      "color": "#7EB5D6"
    },
    {
      "name": "Nivea",
      "color": "#1B3A6B"
    },
    {
      "name": "CeraVe",
      "color": "#5B8DB8"
    },
    {
      "name": "Cetaphil",
      "color": "#6BAA8E"
    },
    {
      "name": "The Ordinary",
      "color": "#2C2C2C"
    }
  ]
};

/** All brands as a flat list */
export const allBrands: Brand[] = Object.values(brandsByCategory).flat();
