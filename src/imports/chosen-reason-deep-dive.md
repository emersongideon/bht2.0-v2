# ICONIC Dashboard — Chosen for a Reason Deep Dive (Figma Make Prompt)

Paste this into Figma Make to rebuild the Chosen for a Reason deep dive page.

---

```
Rebuild the "Deep Dive — C: Chosen for a Reason" page. Same sidebar (layers icon active), top bar, dimension tabs (C2 active). Page scrolls. Warm cream glassmorphism style: page bg #FAF7F4, cards rgba(255,255,255,0.75) backdrop-blur 16px.

Brand colors: Rhode #B86A54, Summer Fridays #374762, Glossier #DAC58C, Clinique #ACBDA7, Laneige #6B241E.
Dimension color for C2: #3F1411 (dark brown).

## SECTION 1: Dimension Header

Full-width glass card, padding 20px.
Left:
- Dark brown dot (10px, #3F1411) + "C — Chosen for a Reason" (Instrument Serif 26px bold)
- Below: "The perceived worth, quality, and value the brand commands." (DM Sans 13px italic, #7A6F65)
Right:
- "Score:" DM Sans 13px #7A6F65 + "66" JetBrains Mono 32px bold + delta "▼ 1.2" red pill

## SECTION 2: Price / Quality / Worth Score Cards

3 glass cards in a row, equal width, 12px gap. Each card has the same internal structure.

### Card 1 — Price Perception:
Glass card, padding 18px.
- "PRICE PERCEPTION" (10px uppercase #B5ADA5, letter-spacing 1px)
- "62" (JetBrains Mono 32px bold) + delta "▼ 2.1" red pill
- "How consumers feel about the price point" (DM Sans 11px, #7A6F65)
- Sentiment pills row: "42% positive" (green-tinted pill, #4A6644) + "31% negative" (red-tinted pill, #B86A54) + "27% neutral" (neutral pill, #7A6F65)
- Competitive mini-bars (5 brands, sorted by score desc):
  Clinique 71, Glossier 68, Laneige 65, Rhode 62 (highlighted #B86A54), Summer Fridays 58
  Each: brand name (9px) + thin bar (6px tall, #F0EBE6 track, Rhode bar in #B86A54, others in #D5CEC7) + score (JetBrains Mono 9px)

### Card 2 — Quality Perception:
Same layout.
- "QUALITY PERCEPTION"
- "74" + delta "▲ 0.8" green pill
- "How consumers evaluate product quality"
- Sentiment: "61% positive", "14% negative", "25% neutral"
- Bars: Clinique 82, Rhode 74, Glossier 72, Laneige 70, Summer Fridays 69

### Card 3 — Worth Perception:
Same layout.
- "WORTH PERCEPTION"
- "63" + delta "▼ 1.8" red pill
- "Is it worth the investment?"
- Sentiment: "38% positive", "35% negative", "27% neutral"
- Bars: Laneige 75, Glossier 70, Clinique 67, Rhode 63, Summer Fridays 60

## SECTION 3: Share of "Worth It" Conversations Over Time

Full-width glass card, padding 20px.

Header row:
Left: "Share of 'Worth It' Conversations" (DM Sans 15px semibold) + "Brand share of value-related discussions over time" (11px #B5ADA5)
Right: green dot + "Leading Indicator · p=0.034, 2-mo lead" (10px #4A6644)

Line chart, ~200px tall. 5 brand lines using brand colors. Rhode line (2.5px, #B86A54) trends DOWNWARD from top-left to bottom-right. Glossier (#DAC58C) and Laneige (#6B241E) trend upward. Clinique (#ACBDA7) is flat. Summer Fridays (#374762) slightly up.

X-axis: Sep, Oct, Nov, Dec, Jan, Feb, Mar (DM Sans 9px #B5ADA5)
Y-axis: 10%, 20%, 30% gridlines with labels (JetBrains Mono 9px #B5ADA5)

Brand legend below chart: ● Rhode (bold) ● Summer Fridays ● Glossier ● Clinique ● Laneige

Warning callout below legend: warm red-tinted bar (rgba(184,106,84,0.06) bg, rounded 10px, padding 10px). ⚠️ icon + "Rhode's share of value conversations has declined 4.2pp over 7 months while Laneige and Glossier gained. Monitor price sensitivity in earned content." (DM Sans 11px, #B86A54)

## SECTION 4: What Drives Value Perception

Full-width glass card, padding 20px.
Header: "What Drives Value Perception" (DM Sans 15px semibold) + "Key themes in consumer conversations about price, quality, and worth" (11px #B5ADA5)

7 ranked items with separator lines between each.
Each row: rank number (JetBrains Mono 12px #B5ADA5) + driver name (DM Sans 13px) + sentiment tag pill + strength bar (120px wide, 8px tall) + mention count (JetBrains Mono 10px #7A6F65) + share % (JetBrains Mono 10px #7A6F65)

Sentiment tag colors:
- "positive": rgba(74,102,68,0.08) bg, #4A6644 text
- "mixed": rgba(218,197,140,0.15) bg, #DAC58C text (use darker gold for readability)
- "negative": rgba(184,106,84,0.08) bg, #B86A54 text

Bar color matches sentiment.

Data:
1. "Ingredient transparency" — positive — 2,840 mentions — 24%
2. "Price point vs competitors" — mixed — 2,210 — 19%
3. "Packaging quality" — positive — 1,870 — 16%
4. "Product size / quantity" — negative — 1,540 — 13%
5. "Celebrity association" — positive — 1,320 — 11%
6. "Longevity / how long it lasts" — mixed — 1,080 — 9%
7. "Dupes available" — negative — 940 — 8%

Footer: "Based on 11,800+ consumer mentions across social media and reviews" (10px italic #B5ADA5)

## SECTION 5: Value Perception Insight

Full-width glass card, left border 3px #B86A54, padding 20px.

"💡 Value Perception Summary" (DM Sans 14px semibold)

Body: "Rhode's value perception is under pressure. Quality scores remain strong (74, Rank #2), but Price (62) and Worth (63) are declining — suggesting consumers appreciate the product but increasingly question whether it justifies the price point." (DM Sans 12px, #7A6F65, line-height 1.6)

Two mini cards side by side (equal width, 12px gap):

Left — "STRENGTHS TO PROTECT" (9px uppercase #4A6644, green-tinted bg):
Green pills: "Ingredient transparency", "Packaging quality", "Celebrity association"

Right — "RISKS TO ADDRESS" (9px uppercase #B86A54, red-tinted bg):
Red pills: "Product size perception", "Dupe competition", "Price-to-quantity ratio"

Recommendation text below: "The 'dupe' conversation is growing — lean into ingredient education and clinical results to differentiate from alternatives. Consider value-pack sizing or loyalty mechanics to address the size/quantity concern without discounting." (DM Sans 11px, #7A6F65, bold "Recommendation:" prefix)

Footer: green dot + "Leading Indicator" (10px #4A6644) + "Share of Value Conversations (p=0.034) predicts sales at 2-month lead" (10px #B5ADA5)

## PAGE FLOW

Above the fold:
1. Dimension Header
2. Price / Quality / Worth Score Cards

Scrollable:
3. Share of "Worth It" Conversations trend chart
4. What Drives Value Perception
5. Value Perception Insight

Deliver as a single frame replacing the current Chosen for a Reason deep dive.
```