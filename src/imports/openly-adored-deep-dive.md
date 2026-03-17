# ICONIC Dashboard — Openly Adored Deep Dive (Figma Make Prompt)

Paste this into Figma Make to rebuild the Openly Adored deep dive page.

---

```
Rebuild the "Deep Dive — O: Openly Adored" page. Same sidebar (layers icon active), top bar, dimension tabs (O active). Page scrolls. Warm cream glassmorphism style: page bg #FAF7F4, cards rgba(255,255,255,0.75) backdrop-blur 16px.

Brand colors: Rhode #B86A54, Summer Fridays #374762, Glossier #DAC58C, Clinique #ACBDA7, Laneige #6B241E.
Dimension color for O: #B86A54 (terracotta).

## SECTION 1: Dimension Header

Full-width glass card, padding 20px.
Left:
- Terracotta dot (10px, #B86A54) + "O — Openly Adored" (Instrument Serif 26px bold)
- Below: "What people and machines actually say and feel about the brand." (DM Sans 13px italic, #7A6F65)
Right:
- "Score:" DM Sans 13px #7A6F65 + "85" JetBrains Mono 32px bold + delta "▲ 1.6" green pill

## SECTION 2: Source Score Cards

2 glass cards side by side, equal width, 12px gap.

Card 1 — Social:
- 💬 icon + "Social" (DM Sans 13px semibold, #7A6F65)
- "89" (JetBrains Mono 32px bold) + delta "▲ 2.3" green pill
- "72% positive sentiment in earned content" (DM Sans 11px, #B5ADA5)

Card 2 — LLM:
- ✦ icon + "LLM"
- "79" + delta "▲ 1.5"
- "Recommendation Share Rank #2 across models"

## SECTION 3: Sentiment Over Time + Sentiment Breakdown

Two-column layout: ⅔ left + ⅓ right, 12px gap.

### Left (⅔) — Share of Positive Sentiment trend:
Glass card, padding 20px.
Header: "Share of Positive Sentiment" (DM Sans 15px semibold) + "Across earned consumer content over time · Click a month to see breakdown →" (11px #B5ADA5)

Line chart, ~180px tall. 5 brand lines using brand colors. All trending upward overall. Glossier (#DAC58C) leads, Rhode (#B86A54) second.

X-axis: Sep, Oct, Nov, Dec, Jan, Feb, Mar (DM Sans 9px). "Mar" is highlighted in #B86A54 bold with a dashed vertical crosshair line through the chart, indicating the selected month.
Y-axis: 40%, 60%, 80% gridlines with labels.

Brand legend below: ● Rhode (bold) ● Summer Fridays ● Glossier ● Clinique ● Laneige

### Right (⅓) — Sentiment Split:
Glass card, padding 20px.
Header: "Sentiment Split" (DM Sans 14px semibold) + "March 2026" (11px #B5ADA5). This updates when user clicks a different month on the left chart.

5 stacked horizontal bars, one per brand. Each bar shows positive (green #4A6644) + neutral (gold #D8C6A0) + negative (red #B86A54) as proportional segments. Rhode's bar is full opacity, others at 40%.

Below each bar: brand dot + brand name (10px) on left. "X% pos · X% neu · X% neg" labels (8px) below bar.

Data for March:
- Rhode: 72% positive, 18% neutral, 10% negative
- Summer Fridays: 65%, 22%, 13%
- Glossier: 78%, 14%, 8%
- Clinique: 58%, 28%, 14%
- Laneige: 68%, 20%, 12%

Color legend at bottom: green square "Positive" + gold square "Neutral" + red square "Negative" (9px)

## SECTION 4: Passion Score + Recommendation List

Two-column layout: ⅓ left + ⅔ right, 12px gap.

### Left (⅓) — Passion Score donut:
Glass card, padding 20px.
Header: "Passion Score" (DM Sans 14px semibold) + "Share of recommendation in earned content" (11px #B5ADA5)

Donut chart, ~180px diameter. 5 segments using brand colors. Rhode segment (28%) is full opacity, others at 60%.
Center of donut: "28%" (JetBrains Mono 22px bold) + "Rhode's share" (9px #B5ADA5)

Legend below donut (vertical list):
- ● Rhode — 28% (bold, #B86A54)
- ● Glossier — 24%
- ● Laneige — 19%
- ● Summer Fridays — 16%
- ● Clinique — 13%

Below legend, a mini card with neutral bg:
"LLM RECOMMENDATION" (9px uppercase #B5ADA5) → "79" (JetBrains Mono 18px bold) + delta "▲ 1.5" → "Rank #2 of 5 across GPT, Claude, Gemini" (9px #B5ADA5)

### Right (⅔) — Recommendation list:
Glass card, padding 20px.
Header: "What People Are Saying" (DM Sans 14px semibold) + "Top recommendations and endorsements from earned content" (11px #B5ADA5). Right side: "8 featured" (10px #B5ADA5)

Scrollable list (max height ~380px, overflow scroll). 8 items with separator lines.

Each item: horizontal row:
- Platform icon (36×36px rounded square, platform-tinted bg: IG = rgba(184,106,84,0.08), TT = rgba(0,0,0,0.06), Reddit = rgba(255,87,34,0.08), YouTube = rgba(255,0,0,0.06). Platform abbreviation centered: "IG", "TT", "R", "YT" in 9px #7A6F65)
- Quote + metadata (fills remaining):
  - Quote text in quotes (DM Sans 12px, line-height 1.5)
  - Below: platform name · author handle · engagement metric (all DM Sans 10px #B5ADA5, engagement in JetBrains Mono)
- Green sentiment dot (8px, #4A6644) right-aligned

Data:
1. Reddit · u/skincarejunkie_ · 2.4K upvotes: "Rhode's peptide lip treatment is the only lip product that actually hydrates overnight. I've repurchased 4 times."
2. TikTok · @glowwithme · 184K views: "Tried the glazing milk and my skin has never looked this good. The glow is insane for a $29 product."
3. Instagram · @thebeautyedit · 12.3K likes: "If you want Drunk Elephant results without the price tag, Rhode barrier cream is it. Period."
4. YouTube · @skinbysarah · 89K views: "I recommend Rhode to literally everyone. The formulas are so clean and the results are visible in days."
5. TikTok · @beautyboss22 · 312K views: "This brand doesn't miss. Every single product I've tried from Rhode has become a staple."
6. Instagram · @minimalbeauty · 8.7K likes: "Honestly the packaging alone makes it worth it but the product inside is even better."
7. Reddit · u/skincareobsessed · 1.8K upvotes: "Rhode glazing fluid > every other serum I've tried this year. Not even close."
8. TikTok · @realreviews_ · 95K views: "Bought this for my sister and she's now converted her whole friend group. It sells itself."

## SECTION 5: Insight

Full-width glass card, left border 3px #B86A54, padding 20px.

"💡 Why People Love & Recommend Rhode" (DM Sans 14px semibold)

Body: "Rhode's organic advocacy is driven by three core themes: product efficacy ('results you can see'), value-for-money in the clean beauty space ('Drunk Elephant results without the price'), and the simplicity of the routine ('doesn't need 12 steps'). The brand benefits from strong word-of-mouth — consumers who try it become recruiters." (DM Sans 12px, #7A6F65, line-height 1.6)

Three mini cards in a row (equal width, 12px gap):

Card 1 — "WHY THEY LOVE IT" (9px uppercase #4A6644, green-tinted bg):
Green pills: "visible results", "clean formulas", "simple routine", "hydration"

Card 2 — "WHY THEY RECOMMEND IT" (9px uppercase #4A6644, green-tinted bg):
Green pills: "value for money", "repurchase rate", "converts friends", "aesthetic packaging"

Card 3 — "WATCH OUT FOR" (9px uppercase #B86A54, red-tinted bg):
Red pills: "hype fatigue", "dupe mentions rising", "size complaints"

Footer: purple dot + "Cultural Pulse" (10px #7B68A6) + "Social Sentiment (p=0.033) predicts sales at 6-month lead" (10px #B5ADA5)

## PAGE FLOW

Above the fold:
1. Dimension Header
2. Source Score Cards (Social + LLM)
3. Sentiment trend + breakdown (top of section visible)

Scrollable:
4. Passion donut + Recommendation list
5. Insight

Deliver as a single frame replacing the current Openly Adored deep dive.
```