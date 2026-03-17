# ICONIC Dashboard — Deep Dive Trend Chart Fix

Paste this into Figma Make.

---

```
Fix the trend chart on ALL 6 Deep Dive pages. Two changes: chart lines represent brands (not metrics), and brand colors are consistent across the entire app.

## FIX 1: ASSIGN PERMANENT BRAND COLORS

These 5 brand colors are FIXED and must be used consistently on every page — Dashboard trend chart, Deep Dive trend charts, and anywhere brands are compared.

- Rhode (primary): #B86A54 (terracotta) — always 2.5px stroke, full opacity
- Summer Fridays: #374762 (navy) — 1.5px stroke, 80% opacity
- Glossier: #DAC58C (gold) — 1.5px stroke, 80% opacity
- Clinique: #ACBDA7 (sage) — 1.5px stroke, 80% opacity
- Laneige: #6B241E (deep red) — 1.5px stroke, 80% opacity

These same colors must appear on:
- The competitor pill dots in the brand selector (top bar)
- The trend chart legend dots on Dashboard
- The trend chart legend dots on Deep Dive pages
- The radar chart polygons on Deep Dive pages

Go back and update the Dashboard page competitor pill dots and trend chart legend to match these colors too.

## FIX 2: DEEP DIVE TREND CHART — LINES ARE BRANDS, NOT METRICS

Currently the Deep Dive trend chart shows one line per sub-metric (e.g. Consistency, Distinctiveness, Value Associations) with a metric-based legend.

Change this. The trend chart on Deep Dive should show:
- One line per brand (Rhode, Summer Fridays, Glossier, Clinique, Laneige)
- Each line represents that brand's DIMENSION SCORE for the active dimension over time
- NOT the individual sub-metric scores

For example, on the "Imprinted in AI" Deep Dive page:
- Rhode line shows Rhode's I1 dimension score over time
- Summer Fridays line shows Summer Fridays' I1 dimension score over time
- etc.

This is the same behavior as the Dashboard trend chart — the only difference is which dimension is being displayed.

## FIX 3: UPDATE LEGEND

Replace the metric-based legend (● Consistency, ● Distinctiveness, ● Value Associations) with the brand legend:

● Rhode (bold)  ● Summer Fridays  ● Glossier  ● Clinique  ● Laneige

Use the permanent brand colors defined above. Same style as the Dashboard trend chart legend.

## FIX 4: UPDATE CHART TITLE

The chart title should say: "Brand Comparison — [Dimension Name]"

For example: "Brand Comparison — Imprinted in AI"

With the dimension dot color next to it (matching the active dimension tab).

## APPLY TO ALL 6 DEEP DIVE PAGES

Update the trend chart on every Deep Dive page:
- Deep Dive — I: Imprinted in AI
- Deep Dive — C: Capturing Attention
- Deep Dive — O: Openly Adored
- Deep Dive — N: Never Lost in Translation
- Deep Dive — I: Ingrained in Culture
- Deep Dive — C: Chosen for a Reason

All 6 use the same brand legend and brand colors. The only thing that changes per page is the chart title and the dummy line shapes.
```