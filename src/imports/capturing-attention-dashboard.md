# ICONIC Dashboard — Capturing Attention Deep Dive (Figma Make Prompt)

Paste this into Figma Make to rebuild the Capturing Attention deep dive page.

---

```
Rebuild the "Deep Dive — C: Capturing Attention" page. This replaces the current version. Same sidebar (layers icon active), same top bar (brand selector + date mode), same dimension tabs (C1 active). Page scrolls to fit all sections.

Use the warm cream glassmorphism style: page bg #FAF7F4, cards are rgba(255,255,255,0.75) with backdrop-blur 16px and subtle warm shadows. All fonts: Instrument Serif for display, DM Sans for body, JetBrains Mono for numbers.

Brand colors (consistent everywhere):
Rhode: #B86A54 (primary), Summer Fridays: #374762, Glossier: #DAC58C, Clinique: #ACBDA7, Laneige: #6B241E

## SECTION 1: Dimension Header

Full-width glass card, padding 20px.
Left side:
- Gold dot (10px, #DAC58C) + "C — Capturing Attention" in Instrument Serif 26px bold
- Below: "The cultural energy and momentum the brand carries right now." in DM Sans 13px italic, #7A6F65
Right side (aligned right, baseline with title):
- "Score:" in DM Sans 13px #7A6F65
- "82" in JetBrains Mono 32px bold
- Delta pill "▲ 3.1" (green)

## SECTION 2: Source Breakdown

3 glass cards in a row, equal width, 12px gap.

Card 1 — Search:
- 🔍 icon + "Search" label (DM Sans 13px semibold, #7A6F65)
- "78" (JetBrains Mono 30px bold) + delta "▲ 2.4" (green pill)
- "Rank #2 in category" (DM Sans 11px, #B5ADA5)

Card 2 — Social:
- 💬 icon + "Social"
- "76" + delta "▲ 1.4"
- "2.4M total followers"

Card 3 — LLM:
- ✦ icon + "LLM"
- "83" + delta "▲ 5.1"
- "Surface Rank #2 across models"

## SECTION 3: Scale & Velocity Panel

One full-width glass card containing two parts stacked vertically.

### TOP PART: Scale + Velocity summary cards (side by side, 12px gap)

Left — Scale card:
Inner card with warm neutral bg (rgba(245,240,235,0.6)), rounded 14px, padding 16px.
Header row: "SCALE" (DM Sans 13px semibold uppercase, #7A6F65, letter-spacing 1px) + "Where you stand right now" (11px, #B5ADA5). Right-aligned: "78" (JetBrains Mono 28px bold) + "/100" (11px, #B5ADA5).
Below header: 4 mini metric tiles in a row, equal width, 10px gap. Each tile: white bg at 60% opacity, rounded 10px, padding 8px 10px.
  - "SHARE OF SEARCH" (9px uppercase #B5ADA5) → "18.2%" (JetBrains Mono 15px bold) → "Rank #2" (9px #7A6F65)
  - "TOTAL FOLLOWERS" → "2.4M" → "Rank #3"
  - "INTERACTIONS" → "842K" → "Rank #2"
  - "LLM RANK" → "#2" → "of 5"

Right — Velocity card:
Inner card with green-tinted bg (rgba(74,102,68,0.04)), rounded 14px, padding 16px.
Header row: "VELOCITY" (DM Sans 13px semibold uppercase, #4A6644) + "Where you're headed" (11px, #B5ADA5). Right-aligned: "87" (JetBrains Mono 28px bold, #4A6644) + "/100".
Below: 4 mini tiles, each with green-tinted bg (rgba(74,102,68,0.06)), rounded 10px.
  - "SEARCH MOMENTUM" → "+12%" (JetBrains Mono 15px bold, #4A6644) → "▲▲▲" (9px #4A6644)
  - "FOLLOWER GROWTH" → "+8.3%" → "▲▲"
  - "ENG. RATE Δ" → "+1.2pp" → "▲"
  - "SOS CHANGE" → "+3.1pp" → "▲▲▲"

### BOTTOM PART: 2×2 Brand Position Scatter (below the summary cards, 16px gap)

Header row above chart: "Brand Positioning" (DM Sans 14px semibold) + "Scale (size) vs Velocity (momentum) for Capturing Attention" (11px, #B5ADA5). Right side: brand legend — 5 dots with brand names (10px).

Scatter chart area: full width, ~280px tall, subtle warm bg (rgba(245,240,235,0.4)), rounded 10px.
- Dashed crosshair lines dividing into 4 quadrants
- Y-axis label: "Velocity →" (rotated)
- X-axis label: "Scale →"
- Quadrant labels (11px, #B5ADA5): top-left "Rising Star", top-right "Dominant", bottom-left "Stalling", bottom-right "Coasting"
- 5 brand dots plotted:
  - Rhode: large dot (14px radius), #B86A54, top-right area (Dominant). Labeled "Rhode" with accent bg pill.
  - Glossier: 11px dot, #DAC58C, right-center (between Dominant and Coasting). Label "Glossier".
  - Summer Fridays: 11px dot, #374762, top-left (Rising Star). Label "Summer Fridays".
  - Clinique: 11px dot, #ACBDA7, bottom-right (Coasting). Label "Clinique".
  - Laneige: 11px dot, #6B241E, top-center (between Rising Star and Dominant). Label "Laneige".

## SECTION 4: Competitive Ranking Table

Full-width glass card, padding 20px.
Header: "Competitive Ranking" (DM Sans 16px semibold).

Table with 6 columns and 5 rows (one per brand, sorted by overall C1 score descending):
- Column headers (10px uppercase, #B5ADA5, letter-spacing 1px): BRAND | SHARE OF SEARCH | SEARCH MOMENTUM | SEARCH VOLUME | SOCIAL ENG. | LLM SURFACE
- Row separators: 1px #F0EBE6
- Rhode row: highlighted with rgba(184,106,84,0.06) background
- Highest value per column: bold, #B86A54 color
- Brand column: colored dot (6px, brand color) + brand name (DM Sans 12px)
- Score cells: JetBrains Mono 12px, centered

Data:
| Glossier    | 84 | 71 | 92★ | 82★ | 79 |
| Rhode       | 81 | 79 | 88  | 76  | 83★ |
| Clinique    | 79 | 68 | 90  | 71  | 81 |
| Laneige     | 74 | 82★ | 78 | 79  | 77 |
| Summer Fri. | 72 | 75 | 74  | 80  | 69 |
(★ = highest in column, shown in bold #B86A54)

## SECTION 5: Brand Comparison Trend

Full-width glass card, padding 20px.
Header: gold dot (8px, #DAC58C) + "Brand Comparison — Capturing Attention" (DM Sans 16px semibold).

Line chart placeholder, ~220px tall:
- 5 brand lines using brand colors. Rhode line is 2.5px full opacity, others 1.5px at 80%.
- X-axis: Sep, Oct, Nov, Dec, Jan, Feb, Mar (DM Sans 10px, #B5ADA5)
- Y-axis: subtle gridlines at 25, 50, 75 (#E8E2DC)
- Suggest upward trends with Rhode accelerating fastest

Legend below chart: ● Rhode (bold) ● Summer Fridays ● Glossier ● Clinique ● Laneige

## SECTION 6: Insight Card

Full-width glass card, left border 3px #B86A54, padding 20px.
- "💡 Insight" (DM Sans 15px semibold)
- Body text (DM Sans 13px, #7A6F65, line-height 1.6): "Share of Search (p=0.017), Search Momentum (p=0.023), and Search Volume (p=0.034) all predict sales changes 2–4 months ahead. When these metrics move, market share follows within a quarter. Social Engagement (p=0.059) shows marginal significance at 3-month lead."
- Footer: green dot (5px, #4A6644) + "Leading Indicator" (10px, #4A6644) + "3 of 5 metrics are validated sales predictors" (10px, #B5ADA5)

## PAGE FLOW (top to bottom)

Visible without scrolling:
1. Dimension Header
2. Source Breakdown (3 cards)
3. Scale & Velocity Panel (summary cards + 2×2 scatter)

Visible on scroll:
4. Competitive Ranking Table
5. Brand Comparison Trend
6. Insight Card

Deliver as a single frame replacing the current Capturing Attention deep dive.
```