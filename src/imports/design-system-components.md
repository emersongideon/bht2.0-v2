IMPORTANT: This is Prompt 1 of 3. Only create the design system and component library. Do NOT create any assembled pages or layouts. Pages are built in Prompts 2 and 3.

This is a premium analytics dashboard called "ICONIC Brand Health Dashboard" for senior marketers and CMOs. Aesthetic: warm, editorial, sophisticated — earthy tones, muted accents, warm backgrounds. NOT a cold blue corporate dashboard.

## STRUCTURE RULES

- Use auto-layout on every frame
- Create a "Design System" page for color/type tokens
- Create a "Components" page with each component as its own separate frame
- Group internal elements logically (e.g. a card's header, score row, and sparkline should be separate child frames within the card)

## DESIGN TOKENS

Fonts: "Instrument Serif" for display/headings, "DM Sans" for body, "JetBrains Mono" for all numbers and scores. Import from Google Fonts.

Type scale:
- 48px Instrument Serif bold (main score display)
- 28px Instrument Serif bold (page titles)
- 20px DM Sans semibold (section headers)
- 16px DM Sans semibold (card titles)
- 28px JetBrains Mono bold (dimension scores)
- 18px JetBrains Mono semibold (sub-metric scores)
- 14px DM Sans regular (body text)
- 12px DM Sans regular (captions, labels)
- 12px JetBrains Mono semibold (delta badges)

Border radius: 10px (small), 14px (medium), 20px (large), 9999px (pills)
Card shadow: 0 1px 2px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05)

## THREE COLOR THEMES

Create all 3 as Figma color styles. Use Dusk as default for all components.

Theme "Dusk" (warm dark, default):
bg-primary #1C1714, bg-card #2A2320, bg-card-hover #342C28, bg-surface #221B17, bg-input #342C28, text-primary #F2EDE3, text-secondary #ACBDA7, text-muted #7A6F65, border #3D3530, border-subtle #2F2824, accent-primary #CE6539, accent-secondary #DAC58C, positive #9FAA74, negative #C66F80, neutral #D8C6A0, dimension-I1 #9CA6D8, dimension-C1 #DAC58C, dimension-O #C66F80, dimension-N #4A6644, dimension-I2 #B86A54, dimension-C2 #D38562

Theme "Linen" (warm light):
bg-primary #F6F1EB, bg-card #FFFFFF, bg-surface #EDE7DF, text-primary #3F1411, text-secondary #676D6B, text-muted #A09890, border #E2DCD4, accent-primary #CE6539, positive #4A6644, negative #C66F80, dimension-I1 #374762, dimension-C1 #B86A54, dimension-N #4A6644, dimension-I2 #86843B, dimension-C2 #D38562

Theme "Blush" (soft editorial):
bg-primary #F5EDEA, bg-card #FFFFFF, bg-surface #EDE5E0, text-primary #463027, text-secondary #86843B, text-muted #B5ADA6, border #E0D8D2, accent-primary #C66F80, accent-secondary #DD9F86, positive #9FAA74, negative #A85565, dimension-I1 #A6C2DB, dimension-C1 #DD9F86, dimension-I2 #D38562, dimension-C2 #D8C6A0

## DESIGN SYSTEM PAGE

Show: all 3 theme palettes as swatch rows, type scale samples, spacing/radius tokens.

## COMPONENTS PAGE

Create each of the following as its own separate auto-layout frame:

### Sidebar
60px wide, full height (900px), bg surface, right border.
Top: "I" monogram in accent-primary (Instrument Serif 24px bold).
Middle: 3 nav icons stacked vertically (grid, layers, bell). Active icon has a pill background at 15% accent-primary opacity.
Bottom: theme switcher (3 small circles, each half-split: left = theme bg-primary, right = theme accent-primary, active one has a ring), settings icon, user avatar circle (32px).

### Category & Brand Selector
Horizontal row with two groups:
Left — category pill: bg surface, border, rounded-full. Folder icon + "Beauty" + dropdown caret.
Right — brand pills in a row:
  Primary: bg accent-primary, rounded-full. "Rhode" (bold white) + "76" (mono white) + caret.
  4 competitors: bg card, border, rounded-full. Each has a 6px colored dot + brand name + ✕ close icon.
    ● Summer Fridays (dot #9CA6D8)
    ● Glossier (dot #DAC58C)
    ● Clinique (dot #ACBDA7)
    ● Laneige (dot #C66F80)
  "+" add button: dashed circle.

### Brand Picker Dropdown
Floating panel, bg card, rounded-lg, shadow, 300px wide. Search input at top. 5 rows: brand name + ICONIC score (JetBrains Mono). "Rhode — 76" is dimmed with checkmark. Others: "Summer Fridays — 72", "Glossier — 81", "Clinique — 74", "Laneige — 78".

### Category Dropdown
Same style, 280px wide. Rows: "Beauty (5 brands)" with checkmark, "Fashion" dimmed italic "coming soon", "Personal Care" dimmed italic "coming soon".

### Date Mode Selector
Segmented control: "Daily" | "Rolling 30" | "Monthly". Active segment (Monthly): bg accent-primary, white text, rounded-full. Inactive: text-secondary. To the right: "Mar 2026" caption + calendar icon.

### ICONIC Score Ring
Card 180px wide, bg card, rounded-lg, shadow.
Circular ring: 120px diameter, 8px stroke, gradient accent-primary → accent-secondary. Background track in border color.
Center: "76" JetBrains Mono 48px bold. Below ring: "ICONIC" caption. Below that: delta pill "▲ 2.1" (green bg at 20%, green text).

### Dimension Score Card (create 6 variants + 1 selected state)
Card ~200px wide, bg card, rounded-md, shadow, 16px padding.
Top: 8px colored dot + letter (Instrument Serif 16px, dimension color) + full name (caption, text-muted).
Middle: score (JetBrains Mono 28px bold) + delta pill.
Bottom: sparkline (thin wavy line, 36px tall, dimension color, no axes).

Variants:
- I1: dot #9CA6D8, "I", "Imprinted in AI", 74, ▲ 2.8
- C1: dot #DAC58C, "C", "Capturing Attention", 82, ▲ 3.1
- O: dot #C66F80, "O", "Openly Adored", 85, ▲ 1.6
- N: dot #4A6644, "N", "Never Lost in Translation", 71, ▲ 0.9
- I2: dot #B86A54, "I", "Ingrained in Culture", 78, ▲ 2.3
- C2: dot #D38562, "C", "Chosen for a Reason", 66, ▼ 1.2
- I1-selected: same as I1 but left border 3px in dimension color, elevated shadow.

### Trend Chart
Wide card, bg card, rounded-lg, shadow, 20px padding.
Header: dimension dot + "Imprinted in AI" (title). Right: small chart icons.
Chart area: ~220px tall placeholder with 5 wavy lines (primary thick in accent-primary, 4 thinner at 70% opacity in different colors).
Legend: 5 pills — ● Rhode (bold), ● Summer Fridays, ● Glossier, ● Clinique, ● Laneige.

### Alerts Panel
Card 280px wide, bg card, rounded-lg, shadow.
Header: "Alerts" + "See all →" link in accent-primary.
5 compact alert items stacked. Each ~60px: 3px left border (severity color) + dimension dot + dimension name (caption bold) + metric change text + timestamp.
Data:
1. border negative, dot C1: "Capturing Attention — Share of Search ▼ 8%", "2 hours ago"
2. border positive, dot I1: "Imprinted in AI — LLM Consistency ▲ 5 pts", "Yesterday"
3. border neutral, dot O: "Openly Adored — Sentiment shifted +6%", "Today"
4. border negative, dot C2: "Chosen for a Reason — Value share ▼ 5%", "3 hours ago"
5. border positive, dot N: "Never Lost — Alignment improved ▲ 4 pts", "2 days ago"

### Sub-Metric Card
Card, bg card, rounded-md, 16px padding.
Metric name (16px semibold) + score (JetBrains Mono 18px) + delta + sparkline (24px tall) + source badge pill ("LLM" / "Search" / "Social" in caption).

### Insight Card
Card, bg surface, rounded-md, left border 3px accent-primary.
"💡 Insight" header + body text + "Layer: Predictive" with green dot (or "Cultural Pulse" with purple dot).

### Dimension Tabs
Horizontal tab bar, 6 tabs. Each: colored dot + letter + name. Active tab: bottom border 2px in dimension color, bg card. Inactive: text-muted, no border.

### Filter Bar
Segmented control (All | Critical | Positive | Notable) + dimension dropdown pill.

Do NOT assemble these into pages. Stop here.