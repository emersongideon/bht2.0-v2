# ICONIC Dashboard — Imprinted in AI Deep Dive (Figma Make Prompt)

Paste this into Figma Make to rebuild the Imprinted in AI deep dive page.

---

```
Rebuild the "Deep Dive — I: Imprinted in AI" page. Same sidebar (layers icon active), top bar, dimension tabs (I1 active). Page scrolls. Warm cream glassmorphism style: page bg #FAF7F4, cards rgba(255,255,255,0.75) backdrop-blur 16px.

Brand colors: Rhode #B86A54, Summer Fridays #374762, Glossier #DAC58C, Clinique #ACBDA7, Laneige #6B241E.
Dimension color for I1: #374762 (navy).

## SECTION 1: Dimension Header

Full-width glass card, padding 20px.
Left:
- Navy dot (10px, #374762) + "I — Imprinted in AI" (Instrument Serif 26px bold)
- Below: "How deeply and distinctly the brand is encoded in the minds of machines." (DM Sans 13px italic, #7A6F65)
Right:
- "Score:" DM Sans 13px #7A6F65 + "74" JetBrains Mono 32px bold + delta "▲ 2.8" green pill

## SECTION 2: Consistency & Distinctiveness (two score cards side by side)

Two glass cards, equal width, 12px gap. These are the two core metrics that directly calculate the Imprint score.

### Card 1 — LLM Consistency
Glass card, padding 20px.
Header: "LLM Consistency" (DM Sans 16px semibold) + source badge "LLM" (pill, #F5F0EB bg, #7A6F65 text, 10px)
Score row: "85" (JetBrains Mono 36px bold) + delta "▲ 3.1" (green pill) + "Rank #1 of 5" (DM Sans 11px, #B5ADA5)
Description: "How reliably AI systems maintain a stable understanding of the brand across different prompts, models, and contexts." (DM Sans 12px, #7A6F65)
Sparkline: neutral gray smooth line, 40px tall, 7 points (Sep–Mar labels below)
Layer badge: green dot + "Leading Indicator" (10px) + "p=0.0002, 6-month lead" (10px, #B5ADA5)

Competitive mini-bar below sparkline (compact horizontal bar chart showing all 5 brands):
- Glossier: 82 (bar width proportional)
- Rhode: 85 (highlighted bar in #B86A54, bold label)
- Clinique: 78
- Summer Fridays: 71
- Laneige: 68
Bars are thin (8px tall), light gray fill, Rhode's bar in #B86A54. Brand name (9px) left of bar, score (9px, JetBrains Mono) right of bar.

### Card 2 — LLM Distinctiveness
Same layout as Consistency card.
Header: "LLM Distinctiveness" + "LLM" badge
Score: "64" + delta "▼ 1.2" (red pill) + "Rank #3 of 5"
Description: "How uniquely the brand is positioned in AI's semantic space compared to competitors. High distinctiveness means AI perceives the brand as occupying its own territory."
Sparkline: 7 points (Sep–Mar)
Layer badge: purple dot + "Cultural Pulse" (10px)

Competitive mini-bar:
- Glossier: 72 (highlighted, highest)
- Rhode: 64
- Summer Fridays: 68
- Clinique: 59
- Laneige: 55

## SECTION 3: LLM Value Associations

Full-width glass card, padding 20px.
Header: "Value Associations" (DM Sans 16px semibold) + subtitle "Top values AI associates with each brand" (11px, #B5ADA5)

Show a visual comparison of value tags across brands. Layout: one row per brand, brands stacked vertically.

Each brand row:
- Left: brand dot (6px) + brand name (DM Sans 12px, bold for Rhode) — fixed 120px width
- Right: horizontal row of value tag pills. Each pill: rounded-full, padding 4px 12px, DM Sans 11px.
  - For Rhode: pills use #B86A54 at 10% bg, #B86A54 text
  - For competitors: pills use #F5F0EB bg, #7A6F65 text
  - Pill order = strongest association first (left to right)

12px vertical gap between brand rows. Separator line (1px #F0EBE6) between rows.

Dummy data:
Rhode: "Clean Beauty" · "Minimalist" · "Luxury Accessible" · "Gen Z" · "Skincare-First"
Summer Fridays: "Clean Beauty" · "Self-Care" · "Instagram-Native" · "Gentle" · "Vegan"
Glossier: "Millennial" · "Minimalist" · "Community-Driven" · "Everyday Beauty" · "Direct-to-Consumer"
Clinique: "Dermatologist-Tested" · "Sensitive Skin" · "Science-Backed" · "Classic" · "Department Store"
Laneige: "K-Beauty" · "Hydration" · "Lip Care" · "Overnight" · "Affordable Luxury"

Add a small note below: "Values extracted from 12,000+ LLM queries across GPT, Claude, and Gemini" (DM Sans 10px, #B5ADA5, italic)

## SECTION 4: LLM Domain Sources

Full-width glass card, padding 20px.
Header: "Domain Sources" (DM Sans 16px semibold) + subtitle "Most referenced sources when LLMs discuss the brand" (11px, #B5ADA5)

Two-column layout inside the card:

Left column (~55%): Horizontal bar chart showing top 10 domains for Rhode.
Each bar: domain name left-aligned (DM Sans 11px), thin horizontal bar (10px tall, #B86A54 at varying opacity based on frequency), percentage right-aligned (JetBrains Mono 11px).

Top 10 domains for Rhode:
1. sephora.com — 18%
2. vogue.com — 14%
3. reddit.com — 12%
4. allure.com — 11%
5. instagram.com — 9%
6. byrdie.com — 8%
7. youtube.com — 7%
8. tiktok.com — 6%
9. glamour.com — 5%
10. rhode.com — 4%

Bar widths proportional to percentage. Highest bar (18%) is full width, others scale down.

Right column (~45%): Compact comparison showing each brand's top 3 domains.
5 rows (one per brand), 10px gap.
Each row: brand dot + brand name (bold for Rhode) → 3 domain pills (rounded-full, #F5F0EB bg, DM Sans 10px, #7A6F65)

Rhode: sephora.com · vogue.com · reddit.com
Summer Fridays: sephora.com · byrdie.com · youtube.com
Glossier: glossier.com · reddit.com · instagram.com
Clinique: sephora.com · webmd.com · nordstrom.com
Laneige: sephora.com · reddit.com · allure.com

Small note: "Based on retrieval-augmented generation source analysis" (10px, #B5ADA5, italic)

## SECTION 5: LLM Audience Perception

Full-width glass card, padding 20px.
Header: "Audience Perception" (DM Sans 16px semibold) + subtitle "Age groups AI associates with the brand" (11px, #B5ADA5)

Two-column layout:

Left column (~50%): Stacked bar chart or horizontal grouped bars showing age distribution for Rhode.
Age groups on Y-axis: "16–24", "25–34", "35–44", "45–54", "55+"
Horizontal bars showing what percentage of LLM responses associate the brand with each age group.
Rhode data: 16–24: 35%, 25–34: 42%, 35–44: 15%, 45–54: 6%, 55+: 2%
Bars in #B86A54, labels in JetBrains Mono 11px.
The dominant group (25–34, 42%) bar is full opacity, others fade proportionally.

Right column (~50%): Brand comparison table.
Compact table showing the PRIMARY age group AI associates with each brand (the group with highest %).

| Brand           | Primary Audience | Confidence |
|-----------------|-----------------|------------|
| Rhode           | 25–34           | 42%        |
| Summer Fridays  | 25–34           | 38%        |
| Glossier        | 18–27           | 45%        |
| Clinique        | 35–49           | 51%        |
| Laneige         | 22–32           | 40%        |

Table: DM Sans 12px body, JetBrains Mono for percentages. Rhode row highlighted. Header row: 10px uppercase #B5ADA5.

Below table: small insight text "Clinique has the most distinct audience positioning — LLMs associate it most strongly with a specific age group (51% confidence)." (DM Sans 11px, #7A6F65, italic)

## SECTION 6: Insight Card

Full-width glass card, left border 3px #B86A54, padding 20px.
- "💡 Insight" (DM Sans 15px semibold)
- Body text (DM Sans 13px, #7A6F65, line-height 1.6): "LLM Consistency is the #1 predictor of sales performance (p=0.0002, 6-month lead). Rhode's score of 85 (Rank #1) is a strong commercial signal. However, Distinctiveness at 64 (Rank #3) suggests the brand doesn't yet occupy a fully unique position in AI's understanding — an area for strategic focus."
- Footer: green dot (5px, #4A6644) + "Leading Indicator" (10px, #4A6644) + "1 of 2 core metrics is a validated sales predictor" (10px, #B5ADA5)

## PAGE FLOW

Above the fold:
1. Dimension Header
2. Consistency & Distinctiveness score cards

Scrollable:
3. LLM Value Associations
4. LLM Domain Sources
5. LLM Audience Perception
6. Insight Card

Deliver as a single frame replacing the current Imprinted in AI deep dive.
```