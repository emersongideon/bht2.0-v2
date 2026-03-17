# ICONIC Dashboard — Main Page Layout Fix

Paste this into Figma Make to fix the dashboard layout.

---

```
Fix the main Dashboard page layout. Do not change colors or visual style — only fix the layout, sizing, and behavior described below.

## FIX 1: ICONIC RING — FULL HEIGHT SPANNING BOTH ROWS

The ICONIC ring card currently only spans the first row of dimension cards. Fix it:

- The ring card should span the FULL HEIGHT of both dimension card rows (row 1 and row 2).
- Card width stays at 180px. Height stretches to match both rows + the gap between them.
- Inside the card, vertically center the ring and score.
- Above the ring, add a headline: "HOW ICONIC ARE YOU" in DM Sans 10px, letter-spacing 2px, uppercase, text-muted. Centered horizontally.
- Below the delta badge, add small text "out of 100" in DM Sans 10px, text-muted.
- The card layout top to bottom: "HOW ICONIC ARE YOU" label → ring with score → "ICONIC" label → delta badge → "out of 100"

The grid should now be:
- Column 1: ICONIC ring card (180px wide, spans rows 2 AND 3)
- Columns 2-4: 3 dimension cards per row, 2 rows

## FIX 2: DIMENSION CARDS — LARGER TEXT AND EQUAL HEIGHT

The dimension name text ("Imprinted in AI", etc.) is too small to read.

- Dimension letter (e.g. "I", "C", "O"): Instrument Serif 18px bold, dimension color
- Dimension full name (e.g. "Imprinted in AI"): DM Sans 13px regular, text-secondary (NOT text-muted — needs to be more visible)
- Score: JetBrains Mono 32px bold (increase from 28px)
- Delta badge text: JetBrains Mono 13px

ALL 6 dimension cards must be the SAME height. Set a fixed card height that accommodates the tallest card content (including the longest name "Never Lost in Translation"). If a card has a shorter name, let the extra space distribute evenly — do not let cards shrink to fit their content.

## FIX 3: SPARKLINES — ADD X-AXIS WITH 7 DATA POINTS

The sparklines currently have no x-axis reference. Fix:

- Show exactly 7 data points on each sparkline (representing 7 periods — days or months depending on the date mode).
- Add small vertical tick marks at each data point along the bottom edge (1px tall, text-muted at 30% opacity).
- Add tiny x-axis labels below the ticks showing abbreviated time labels (e.g. "M", "T", "W", "T", "F", "S", "S" for daily, or "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar" for monthly). DM Sans 8px, text-muted.
- Each data point should have a small circle (3px) on the line at that position, same color as the sparkline but at 50% opacity. On hover, the circle fills to 100% and a tooltip appears showing the score value.
- The sparkline area height stays at 36px. The x-axis labels sit below, adding ~12px to the card height.

## FIX 4: DIMENSION CARD ROWS — EQUAL HEIGHT

Currently the first row of cards is taller than the second row. Fix:

- Both rows must be the same height.
- Use a fixed row height for both (match them).
- The ICONIC ring card height = row 1 height + gap (12px) + row 2 height.

## FIX 5: DIMENSION CARD CLICK → TREND CHART UPDATE

Add a visual indicator that clicking a dimension card updates the trend chart below:

- Currently I1 (Imprinted in AI) is in the selected state (left border). Keep this as the default.
- The trend chart title ("Imprinted in AI" with the blue dot) should visually match whichever dimension card is selected.
- Add a subtle visual connection: when a card is selected, add a small downward arrow or connector line (2px, dimension color, 8px tall) below the selected card pointing toward the trend chart area. This makes the "click card → chart updates" relationship obvious.
- Alternatively: add a small caption above the trend chart: "Showing: Imprinted in AI" with a colored dot, so the user knows which dimension the chart is displaying. This caption updates when a different card is clicked.

Also ensure: the selected card's dimension color matches the trend chart's title dot color and primary line color. If I1 is selected → chart title dot is #374762, chart primary line is #374762. If O is selected → chart uses #B86A54, etc.

## UPDATED GRID LAYOUT

```
Row 1: [Top bar — brand selector + date selector, full width]

Row 2-3: [ICONIC Ring Card, 180px, spans 2 rows] [Dim Card I1] [Dim Card C1] [Dim Card O]
                                                   [Dim Card N]  [Dim Card I2] [Dim Card C2]

Row 4: [Trend Chart — fills ~73% width] [Alerts Panel — 280px]
```

All gaps: 12px.
All dimension cards: equal width (fill available space in columns 2-4), equal height.
ICONIC ring: 180px wide × height of both card rows + gap.

Apply these fixes to the Dashboard page only.
```