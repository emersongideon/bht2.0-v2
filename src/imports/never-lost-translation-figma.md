# ICONIC Dashboard — Never Lost in Translation Deep Dive (Figma Make Prompt)

Paste this into Figma Make to rebuild the Never Lost in Translation deep dive page.

---

```
Rebuild the "Deep Dive — N: Never Lost in Translation" page. Same sidebar (layers icon active), top bar, dimension tabs (N active). Page scrolls. Warm cream glassmorphism style: page bg #FAF7F4, cards rgba(255,255,255,0.75) backdrop-blur 16px.

Brand colors: Rhode #B86A54, Summer Fridays #374762, Glossier #DAC58C, Clinique #ACBDA7, Laneige #6B241E.
Dimension color for N: #ACBDA7 (sage).

## SECTION 1: Dimension Header

Full-width glass card, padding 20px.
Left:
- Sage dot (10px, #ACBDA7) + "N — Never Lost in Translation" (Instrument Serif 26px bold)
- Below: "How clearly the brand tells its story — and whether the world receives it as intended." (DM Sans 13px italic, #7A6F65)
Right:
- "Score:" DM Sans 13px #7A6F65 + "71" JetBrains Mono 32px bold + delta "▲ 0.9" green pill

## SECTION 2: Rhode's Score Cards (two cards side by side)

Two glass cards, equal width, 12px gap. These show the focal brand's headline metrics.

Card 1 — Brand Communication Score:
- Header: "Brand Communication Score" (DM Sans 15px semibold) + source badge "Social" (pill, #F5F0EB bg, 10px)
- Score: "68" (JetBrains Mono 34px bold) + delta "▲ 1.2" green pill
- Sparkline: neutral gray smooth line, 36px tall, 7 points
- X-axis: Sep, Oct, Nov, Dec, Jan, Feb, Mar (8px, #B5ADA5)

Card 2 — Coherence:
- Same layout. "Coherence" + "Social" badge
- Score: "72" + delta "▲ 0.4"
- Sparkline + x-axis labels

## SECTION 3: Brand Comparison (comparative bar chart)

Full-width glass card, padding 20px.
Header: "Brand Comparison" (DM Sans 15px semibold) + "Consistency & Coherence across brands" (11px, #B5ADA5)

Two-column layout inside:

Left column — Consistency:
Label "CONSISTENCY" (12px semibold uppercase, #7A6F65, letter-spacing 1px)
5 horizontal bars, one per brand, sorted by score descending:
  Clinique: 85 (bar in #ACBDA7 at 50% opacity)
  Rhode: 82 (bar in #B86A54 full opacity, bold label)
  Glossier: 78 (bar in #DAC58C at 50%)
  Summer Fridays: 74 (bar in #374762 at 50%)
  Laneige: 70 (bar in #6B241E at 50%)
Each row: brand dot (6px) + brand name (11px, bold for Rhode) + bar (14px tall, #F0EBE6 track) + score (JetBrains Mono 11px)

Right column — Coherence:
Same layout. Sorted:
  Glossier: 80
  Rhode: 76
  Clinique: 72
  Laneige: 69
  Summer Fridays: 65

## SECTION 4: Sender / Receiver Alignment Spider Chart

Full-width glass card, padding 20px.

Header row with brand selector:
Left: "Sender / Receiver Alignment" (DM Sans 15px semibold) + "What the brand says vs what consumers hear" (11px, #B5ADA5)
Right: row of 5 brand pills. Rhode is active (solid #B86A54 bg, white text). Others are inactive (transparent bg, 1px #E8E2DC border, #7A6F65 text). Clicking a pill switches whose sender/receiver data is shown. Static prototype shows Rhode active.

Two-column layout (55% / 45%):

Left — Spider chart:
Radar/pentagon shape with 5 axes:
  "Clean / Ingredients", "Aesthetic / Visual", "Premium / Luxury", "Skin Health", "Simplicity"
4 concentric grid rings (25%, 50%, 75%, 100%). Faint axis lines from center to each vertex.

TWO polygons overlaid:
  Sender (brand): solid line, #B86A54, 2px stroke, 10% fill opacity. Data: 92, 87, 81, 78, 71
  Receiver (consumer): dashed line, #ACBDA7, 2px stroke, 10% fill opacity. Data: 88, 85, 74, 52, 68
Small dots (3px) at each vertex on both polygons.

Legend below chart:
  Solid terracotta line (16px) + "Sender (brand)"
  Dashed sage line (16px) + "Receiver (consumer)"

Right — Summary cards (4 stacked, 10px gap):

Card 1: "OVERALL ALIGNMENT SCORE" (10px uppercase #B5ADA5) → "74" (JetBrains Mono 28px bold) + delta "▲ 1.1" → "Rank #2 of 5" (10px #B5ADA5). Warm neutral bg.

Card 2: "SENDER-RECEIVER GAP" (10px uppercase #4A6644) → "-8 pts" (JetBrains Mono 22px bold #4A6644) + "↓ improving" (10px #4A6644) → "Leading Indicator · p=0.003, 1-mo lead" (9px #4A6644). Green-tinted bg.

Card 3: "BIGGEST GAP" (10px uppercase #B5ADA5) → "Skin Health" (DM Sans 13px semibold) → "Sender: 78 → Receiver: 52 (−26 pts)" (10px #B5ADA5). Warm neutral bg.

Card 4: "BEST ALIGNMENT" (10px uppercase #B5ADA5) → "Clean / Ingredients" (DM Sans 13px semibold) → "Sender: 92 → Receiver: 88 (−4 pts)" (10px #B5ADA5). Warm neutral bg.

## SECTION 4b: Alignment Gap Strip

Narrow full-width glass card, padding 16px. Horizontal layout with 3 groups separated by 1px vertical dividers:

Group 1 — "ALIGNED" (9px uppercase #B5ADA5):
3 green-tinted pills: "✓ Clean", "✓ Aesthetic", "✓ Premium" (10px, rgba(74,102,68,0.08) bg, #4A6644 text)

Group 2 — "GAP: SENDER ONLY" (9px uppercase #B5ADA5):
2 terracotta-tinted pills: "→ Skin Health", "→ Effortless" (10px, rgba(184,106,84,0.08) bg, #B86A54 text)

Group 3 — "GAP: RECEIVER ONLY" (9px uppercase #B5ADA5):
2 navy-tinted pills: "← Celebrity-Backed", "← Hydration" (10px, rgba(55,71,98,0.08) bg, #374762 text)

## SECTION 5: Sender vs Receiver Values (two panels side by side)

Two glass cards, equal width, 12px gap.

Left card — Sender Values:
Header: "Sender Values" (DM Sans 14px semibold) + "What the brand communicates through owned content" (11px, #B5ADA5)
5 ranked items with separator lines between:
Each row: rank number (JetBrains Mono 12px bold #B86A54) + value name (DM Sans 13px) + strength bar (80px wide, 8px tall, #B86A54 at 60% opacity, width proportional to score) + score (JetBrains Mono 11px #7A6F65)

1. Clean Ingredients — 92
2. Minimalist Aesthetic — 87
3. Accessible Luxury — 81
4. Skin Health — 78
5. Effortless Beauty — 71

Right card — Receiver Values:
Same layout but rank numbers in #ACBDA7, bars in #ACBDA7.
Header: "Receiver Values" + "What consumers perceive from earned content"
Items that also appear in sender list get a small "↔ aligned" tag (9px, green-tinted pill).

1. Clean Beauty — 88 (↔ aligned)
2. Aesthetic / Visual — 85 (↔ aligned)
3. Affordable Premium — 74 (↔ aligned)
4. Hydration / Glow — 72
5. Celebrity-Backed — 68

## SECTION 6: Top Aligned Posts

Full-width glass card, padding 20px.
Header: "Top Aligned Posts" (DM Sans 15px semibold) + "Brand posts that best resonate with receiver values" (11px, #B5ADA5)

5 post items stacked vertically with separator lines.

Each item: horizontal row with:
- Rank (JetBrains Mono 16px bold #B86A54, 24px wide)
- Thumbnail placeholder (52×52px, rounded 10px, warm-tinted bg). Small platform label in corner: "IG" or "TT" (8px, white, dark shadow)
- Caption area (fills remaining):
  - Caption text (DM Sans 12px, max 2 lines, truncate)
  - Platform + handle (DM Sans 10px #B5ADA5)
- Alignment score (JetBrains Mono 18px bold #4A6644, right-aligned, 60px wide) + "ALIGNMENT" label (8px uppercase #B5ADA5)
- Engagement rate (JetBrains Mono 14px semibold, right-aligned, 50px wide) + "ENG. RATE" label (8px uppercase #B5ADA5)

Post data:
1. IG. "Your skin barrier called — it wants the peptide glazing fluid ✨" · @rhode · Alignment 94% · Eng 8.2%
2. TT. "3 ingredients. That's it. That's the whole formula." · @rhode · Alignment 91% · Eng 11.4%
3. TT. "POV: skincare that doesn't need 12 steps" · @rhode · Alignment 88% · Eng 9.7%
4. IG. "The Rhode barrier restore cream — clinically tested, beautifully simple" · @rhode · Alignment 85% · Eng 6.8%
5. IG. "Less is more. More glow, that is 💧" · @rhode · Alignment 82% · Eng 7.3%

## SECTION 7: Communication Guidelines (Insight Card)

Full-width glass card, left border 3px #B86A54, padding 20px.

"💡 Communication Guidelines" (DM Sans 14px semibold)

Body text (DM Sans 12px, #7A6F65, line-height 1.6):
"Based on sender/receiver alignment analysis, Rhode's messaging lands strongest when it emphasises clean, minimal aesthetics and accessible luxury positioning. The gap analysis reveals two opportunities:"

Three mini cards in a row (equal width, 12px gap), each with warm neutral bg, rounded 10px, padding 12px:

Card 1 — "KEYWORDS TO LEAN INTO" (9px uppercase #B5ADA5):
Green-tinted pills: "clean", "simple", "glow", "barrier", "minimal"

Card 2 — "VISUAL TONE" (9px uppercase #B5ADA5):
Green-tinted pills: "neutral palette", "close-up texture", "minimal props", "natural light"

Card 3 — "TONE OF VOICE" (9px uppercase #B5ADA5):
Green-tinted pills: "confident", "understated", "playful-not-loud", "science-lite"

Below the 3 cards, body text:
"Bridge the gap: 'Skin Health' and 'Effortless Beauty' are strong sender values that aren't landing with consumers. Consider amplifying through creator partnerships and educational content. Conversely, consumers strongly perceive 'Celebrity-Backed' which the brand doesn't actively push — this is organic equity worth protecting."

Footer: green dot + "Leading Indicator" (10px #4A6644) + "Sender-Receiver Gap (p=0.003) is the fastest-acting predictor at 1-month lead" (10px #B5ADA5)

## PAGE FLOW

Above the fold:
1. Dimension Header
2. Rhode's Score Cards (Communication Score + Coherence)
3. Brand Comparison bars

Scrollable:
4. Sender/Receiver Spider Chart + Alignment Gap Strip
5. Sender vs Receiver Values panels
6. Top Aligned Posts
7. Communication Guidelines

Deliver as a single frame replacing the current Never Lost deep dive.
```