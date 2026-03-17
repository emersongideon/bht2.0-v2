# ICONIC Deep Dive Pages — Top Section Alignment Fix

Only change the TOP 3 SECTIONS of each deep dive page. Keep everything else on each page exactly as it is. The target layout is the "N — Never Lost in Translation" page top.

---

```
This prompt ONLY changes the top 3 sections of each deep dive page. Everything below section 3 on each page stays exactly where it is — do NOT remove, rewrite, or reposition any sections that come after the Brand Comparison row.

## TARGET: Standard Top 3-Row Structure

Every deep dive page must have these 3 sections at the top, in this exact order, with this exact layout:

### ROW 1: Dimension Header
Full-width card, cream bg, rounded-lg, padding 24px.
- Left: dimension color dot (10px) + "X — Dimension Name" in Instrument Serif ~28px bold
- Below title: italic description in DM Sans 14px, muted text
- Right-aligned: "Score:" label (DM Sans 14px muted) + score (JetBrains Mono ~36px bold) + delta pill

### ROW 2: Sub-Metric Score Cards
Equal-width cards side by side, 12px gap. Every card has the SAME internal structure:
- Top-left: metric name (DM Sans 16px semibold)
- Top-right: source badge pill ("Social" / "LLM" / "Search") — small rounded pill, muted bg
- Score: JetBrains Mono ~48px bold + delta pill inline
- Sparkline: smooth line in dimension color, ~40px tall, with monthly x-axis labels (Sep, Oct, Nov, Dec, Jan, Feb, Mar)
- NOTHING ELSE in the card — no descriptions, no rank text, no sentiment pills, no mini-bars, no validation badges

### ROW 3: Brand Comparison
Full-width card. "Brand Comparison" title + subtitle naming the sub-metrics.
Horizontal bar groups side by side (one group per sub-metric).
Each group: brands ranked by score (highest first), horizontal bars in permanent brand colors:
  Rhode #B86A54 (bold name), Summer Fridays #374762, Glossier #DAC58C, Clinique #ACBDA7, Laneige #6B241E
Score value at end of each bar.

---

## PAGE 1: I — Imprinted in AI

Dimension color: #374762. Score: 74, ▲ 2.8
Description: "How deeply and distinctly the brand is encoded in the minds of machines."

ROW 2 — Sub-metric cards (2 cards):
- "LLM Consistency" — 85, ▲ 3.1, badge "LLM"
- "LLM Distinctiveness" — 64, ▼ 1.2, badge "LLM"

CHANGES FROM CURRENT: Remove the description paragraphs from each card. Remove "Rank #1 of 5" / "Rank #3 of 5". Remove "Leading Indicator p=0.0002" and "Cultural Pulse" validation badges. Remove the competitive mini-bars from inside each card. Keep only: metric name, LLM badge, score, delta, sparkline with Sep–Mar labels.

ROW 3 — Brand Comparison:
Subtitle: "Consistency & Distinctiveness across brands"
Left group "CONSISTENCY": Rhode 85, Glossier 82, Clinique 78, Summer Fridays 71, Laneige 68
Right group "DISTINCTIVENESS": Glossier 72, Summer Fridays 68, Rhode 64, Clinique 59, Laneige 55

THEN KEEP ALL REMAINING SECTIONS EXACTLY AS THEY ARE:
→ Section 3 (LLM Value Associations tag comparison) — no changes
→ Section 4 (LLM Domain Sources) — no changes
→ Section 5 (LLM Audience Perception) — no changes
→ Section 6 (Insight Card) — no changes

---

## PAGE 2: C — Capturing Attention

Dimension color: #DAC58C. Score: 82, ▲ 3.1
Description: "The cultural energy and momentum the brand carries right now."

ROW 2 — REPLACE the current 3 source-summary cards (Search 78 / Social 76 / LLM 83) with 5 individual sub-metric cards. Use a row of 3 + row of 2, or 5 across if they fit:
- "Search Volume" — 88, ▲ 4.2, badge "Search"
- "Search Momentum" — 79, ▲ 2.6, badge "Search"
- "Share of Search" — 81, ▲ 1.9, badge "Search"
- "Social Engagement" — 76, ▲ 1.4, badge "Social"
- "LLM Surface Rank" — 83, ▲ 5.1, badge "LLM"

ROW 3 — ADD Brand Comparison section (new, didn't exist before):
Subtitle: "Sub-metrics across brands"
5 horizontal bar groups (one per sub-metric):
SEARCH VOLUME: Rhode 88, Glossier 84, Clinique 79, Summer Fridays 75, Laneige 71
SEARCH MOMENTUM: Laneige 82, Rhode 79, Summer Fridays 75, Glossier 72, Clinique 68
SHARE OF SEARCH: Glossier 85, Rhode 81, Clinique 77, Summer Fridays 73, Laneige 69
SOCIAL ENGAGEMENT: Glossier 82, Summer Fridays 80, Laneige 79, Rhode 76, Clinique 71
LLM SURFACE RANK: Rhode 83, Clinique 81, Glossier 80, Laneige 77, Summer Fridays 72

THEN KEEP ALL REMAINING SECTIONS EXACTLY AS THEY ARE:
→ Scale & Velocity Panel (summary cards + 2×2 scatter) — no changes
→ Competitive Ranking Table — no changes
→ Brand Comparison Trend line chart — no changes
→ Insight Card — no changes

---

## PAGE 3: O — Openly Adored

Dimension color: #B86A54. Score: 85, ▲ 1.6
Description: "What people and machines actually say and feel about the brand."

ROW 2 — REPLACE the current 2 source-summary cards (Social 89 / LLM 79) with 3 individual sub-metric cards:
- "Social Sentiment" — 89, ▲ 2.3, badge "Social"
- "Favourability" — 82, ▲ 0.8, badge "Social"
- "LLM Recommendation Share" — 79, ▲ 1.5, badge "LLM"

ROW 3 — ADD Brand Comparison section (new):
Subtitle: "Sentiment, Favourability & LLM Recommendation across brands"
3 horizontal bar groups:
SOCIAL SENTIMENT: Rhode 89, Glossier 86, Summer Fridays 82, Clinique 78, Laneige 74
FAVOURABILITY: Glossier 85, Rhode 82, Clinique 79, Summer Fridays 76, Laneige 72
LLM RECOMMENDATION: Rhode 79, Glossier 77, Clinique 73, Summer Fridays 70, Laneige 66

THEN KEEP ALL REMAINING SECTIONS EXACTLY AS THEY ARE:
→ Sentiment Over Time trend + Sentiment Breakdown stacked bars — no changes
→ Passion Score donut + Recommendation list — no changes
→ Insight Card ("Why People Love & Recommend") — no changes

---

## PAGE 4: N — Never Lost in Translation

NO CHANGES. This is the target layout. Keep everything exactly as it is.

---

## PAGE 5: I — Ingrained in Culture

Dimension color: #6B241E. Score: 78, ▲ 2.3
Description: "The values, aesthetics, and symbolic meaning the brand owns in culture."

ROW 2 — Fix the 3 existing sub-metric cards to match target:
- Move "Social" badge from bottom-left to top-right of each card
- Add Sep–Mar x-axis labels to sparklines if missing
- Cards: "Social Imagery Score" (81, ▲ 3.0), "Value Associations" (76, ▲ 1.8), "Attribute Performance" (74, ▲ 1.6) — all badge "Social"

ROW 3 — ADD Brand Comparison section (currently missing):
Subtitle: "Imagery, Values & Attributes across brands"
3 horizontal bar groups:
SOCIAL IMAGERY: Glossier 84, Rhode 81, Summer Fridays 78, Clinique 74, Laneige 70
VALUE ASSOCIATIONS: Rhode 76, Glossier 75, Clinique 72, Summer Fridays 69, Laneige 65
ATTRIBUTE PERFORMANCE: Rhode 74, Glossier 72, Clinique 71, Summer Fridays 68, Laneige 63

THEN KEEP ALL REMAINING SECTIONS EXACTLY AS THEY ARE:
→ Whatever sections currently exist below the sub-metric cards — do not change them.

---

## PAGE 6: C — Chosen for a Reason

Dimension color: #3F1411. Score: 66, ▼ 1.2
Description: "The perceived worth, quality, and value the brand commands."

ROW 2 — REPLACE the current 3 cards (which have sentiment breakdown pills and integrated mini-bars) with the standard clean card layout:
- "Price Perception" — 62, ▼ 2.1, badge "Social"
- "Quality Perception" — 74, ▲ 0.8, badge "Social"
- "Worth Perception" — 63, ▼ 1.8, badge "Social"
Each card: metric name + badge top-right, score + delta, sparkline with Sep–Mar. NO sentiment pills, NO mini-bars, NO description text.

ROW 3 — ADD Brand Comparison section (replaces the mini-bars that were inside the old cards):
Subtitle: "Price, Quality & Worth across brands"
3 horizontal bar groups:
PRICE PERCEPTION: Clinique 71, Glossier 68, Laneige 65, Rhode 62, Summer Fridays 58
QUALITY PERCEPTION: Clinique 82, Rhode 74, Glossier 72, Laneige 70, Summer Fridays 69
WORTH PERCEPTION: Laneige 75, Glossier 70, Clinique 67, Rhode 63, Summer Fridays 60

THEN KEEP ALL REMAINING SECTIONS EXACTLY AS THEY ARE:
→ Share of "Worth It" Conversations trend chart — no changes
→ What Drives Value Perception ranked list — no changes
→ Value Perception Insight card — no changes

---

## SUMMARY OF CHANGES PER PAGE

| Page | Row 1 (Header) | Row 2 (Cards) | Row 3 (Brand Comparison) | Rest of page |
|------|----------------|---------------|--------------------------|-------------|
| I — Imprinted in AI | Keep | Simplify (remove descriptions, ranks, badges, mini-bars) | Keep (move out of cards into own section) | No changes |
| C — Capturing Attention | Keep | Replace 3 source cards → 5 sub-metric cards | Add new | No changes |
| O — Openly Adored | Keep | Replace 2 source cards → 3 sub-metric cards | Add new | No changes |
| N — Never Lost | No changes | No changes | No changes | No changes |
| I — Ingrained in Culture | Keep | Fix badge position + add x-axis labels | Add new | No changes |
| C — Chosen for a Reason | Keep | Replace (remove sentiment pills + mini-bars) | Add new | No changes |
```