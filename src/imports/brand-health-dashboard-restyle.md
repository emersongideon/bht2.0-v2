Restyle the entire ICONIC Brand Health Dashboard with a modern glassmorphism + gradient mesh aesthetic. Apply these changes across all pages (Dashboard, Deep Dive, Alerts) and all components.

## STEP 1: REPLACE ALL COLORS

Before applying any visual effects, replace every color in the design system with these exact values. These are the ONLY colors to use — do not derive, lighten, darken, or modify any of them.

### Theme "Dusk" — Palette 4 colors only
- bg-primary: #3F1411 (deep brown)
- bg-card: use glassmorphism (see below), fallback rgba(63, 20, 17, 0.60)
- bg-surface: #6B241E (dark warm red-brown)
- bg-input: #374762 at 30% opacity
- text-primary: #F2EDE3 (warm white)
- text-secondary: #ACBDA7 (sage green)
- text-muted: #B86A54 at 50% opacity
- border: #B86A54 at 15% opacity
- border-subtle: #F2EDE3 at 6% opacity
- accent-primary: #DAC58C (gold)
- accent-secondary: #B86A54 (terracotta)
- positive: #ACBDA7 (sage)
- negative: #B86A54 (terracotta)
- neutral: #DAC58C (gold)
- dimension-I1: #374762 (navy)
- dimension-C1: #DAC58C (gold)
- dimension-O: #B86A54 (terracotta)
- dimension-N: #ACBDA7 (sage)
- dimension-I2: #6B241E (deep red)
- dimension-C2: #F2EDE3 at 60% (muted cream)

### Theme "Linen" — Palette 1 colors only
- bg-primary: #FDF5F1 (warm cream)
- bg-card: use glassmorphism, fallback rgba(253, 245, 241, 0.65)
- bg-surface: #E6CDC4 (dusty pink)
- bg-input: #CEDEE2 at 30% opacity
- text-primary: #463027 (dark brown)
- text-secondary: #A6C2DB at 80% (muted blue)
- text-muted: #DDBFB3 (warm beige)
- border: #DDBFB3 at 40% opacity
- border-subtle: #E6CDC4 at 30% opacity
- accent-primary: #DD9F86 (salmon/peach)
- accent-secondary: #A6C2DB (sky blue)
- positive: #A6C2DB (blue)
- negative: #DD9F86 (salmon)
- neutral: #DDBFB3 (beige)
- dimension-I1: #A6C2DB (sky blue)
- dimension-C1: #DD9F86 (salmon)
- dimension-O: #E6CDC4 (dusty pink)
- dimension-N: #CEDEE2 (ice blue)
- dimension-I2: #DDBFB3 (warm beige)
- dimension-C2: #463027 at 40% (muted brown)

### Theme "Blush" — Palette 5 colors only
- bg-primary: #CF9691 at 15% opacity over white (soft warm base)
- bg-card: use glassmorphism, fallback rgba(207, 150, 145, 0.25)
- bg-surface: #B3B9DB at 20% opacity (dusty blue tint)
- bg-input: #9CA6D8 at 15% opacity
- text-primary: #CE6539 darkened — use #8B3D1F (burnt umber)
- text-secondary: #86843B (olive)
- text-muted: #CF9691 (dusty rose)
- border: #D38562 at 15% opacity
- border-subtle: #B3B9DB at 15% opacity
- accent-primary: #CE6539 (burnt orange)
- accent-secondary: #9CA6D8 (dusty blue)
- positive: #B1B262 (olive-lime)
- negative: #CE6539 (orange)
- neutral: #D38562 (warm copper)
- dimension-I1: #9CA6D8 (dusty blue)
- dimension-C1: #CE6539 (burnt orange)
- dimension-O: #CF9691 (dusty rose)
- dimension-N: #B1B262 (olive-lime)
- dimension-I2: #D38562 (warm copper)
- dimension-C2: #86843B (olive)

## STEP 2: BACKGROUND — GRADIENT MESH

Replace the flat bg-primary background on every page with a soft, warm gradient mesh.

For Dusk theme (Palette 4): a subtle mesh of #3F1411, #6B241E, #374762, and #B86A54 at very low opacity — deep brown base with hints of navy and terracotta pooling in corners. The gradient should feel like a rich, warm darkness. Add a very faint grain/noise texture overlay at 3-5% opacity for tactile depth.

For Linen theme (Palette 1): mesh of #FDF5F1, #E6CDC4, #CEDEE2, and #DDBFB3 — soft pink-cream base with gentle blue and peach pools. Feels like warm daylight on linen.

For Blush theme (Palette 5): mesh of #CF9691, #D38562, #B3B9DB, and #9CA6D8 at low opacity (~15-20%) over a warm light base — sunset warmth with dusty blue accents. Energetic but not loud.

## STEP 3: CARDS — GLASSMORPHISM

Every card (dimension cards, ICONIC ring card, trend chart card, alerts panel, sub-metric cards, insight cards, alert cards) gets the glassmorphism treatment:

For Dusk theme (Palette 4: #3F1411, #DAC58C, #B86A54, #374762, #F2EDE3, #6B241E, #ACBDA7):
- Background: rgba(63, 20, 17, 0.60) — semi-transparent deep brown
- Backdrop blur: 20px
- Border: 1px solid rgba(242, 237, 227, 0.06)
- Shadow: 0 8px 32px rgba(63, 20, 17, 0.35), 0 2px 8px rgba(63, 20, 17, 0.20)
- Inner highlight: 1px inner top border at rgba(242, 237, 227, 0.04)

For Linen theme (Palette 1: #DD9F86, #CEDEE2, #A6C2DB, #DDBFB3, #FDF5F1, #463027, #E6CDC4):
- Background: rgba(253, 245, 241, 0.65)
- Backdrop blur: 20px
- Border: 1px solid rgba(255, 255, 255, 0.8)
- Shadow: 0 8px 32px rgba(70, 48, 39, 0.06), 0 2px 8px rgba(70, 48, 39, 0.04)

For Blush theme (Palette 5: #CE6539, #86843B, #B3B9DB, #D38562, #B1B262, #9CA6D8, #CF9691):
- Background: rgba(207, 150, 145, 0.25)
- Backdrop blur: 20px
- Border: 1px solid rgba(179, 185, 219, 0.3)
- Shadow: 0 8px 32px rgba(206, 101, 57, 0.10), 0 2px 8px rgba(206, 101, 57, 0.06)

Card hover state: increase background opacity by 10% and add a subtle scale(1.005) or increase shadow blur by 4px.

## STEP 4: ICONIC SCORE RING — ADD GLOW

The circular score ring should have a soft glow effect behind it:
- Add a blurred circle (60px blur, 40% opacity) in accent-primary color behind the ring, creating an ambient glow.
- The ring stroke gradient (accent-primary → accent-secondary) should feel luminous against the glass card.

## STEP 5: DIMENSION SCORE CARDS

Each dimension card gets:
- Glassmorphism background (as above)
- A very subtle gradient tint at the top of the card using the dimension color at 5-8% opacity, fading to transparent. This gives each card a faint colored "aura" that distinguishes it without being heavy.
- The sparkline should have a faint glow behind it (dimension color at 15% opacity, 4px blur).

## STEP 6: TREND CHART

- Glassmorphism card
- The chart area background should be slightly more transparent than the card (reduce opacity by 10%) creating a recessed glass panel feel.
- Chart lines should have a subtle glow: primary line gets a 3px blur shadow in accent-primary at 30% opacity. Competitor lines get 2px blur at 15%.

## STEP 7: ALERTS PANEL

- Glassmorphism card
- Each alert item's left severity border should have a faint glow matching its color (2px blur, 20% opacity).
- Separator between alerts: rgba(255,255,255,0.04) instead of solid border.

## STEP 8: SIDEBAR — HOVER-EXPAND WITH GLASS

Restyle the sidebar completely:

Collapsed state (60px wide):
- Background: glassmorphism — same treatment as cards (semi-transparent, backdrop blur, subtle border)
- No solid right border — let the glass edge define it
- Icons: 20px, stroke text-muted. Active icon: fill accent-primary, with a small glowing dot (4px, accent-primary, 2px blur) below or beside the icon instead of a pill background.
- The "I" monogram at top should have a faint glow in accent-primary.

Expanded state (200px wide, shown on hover):
- Smoothly expands the glass panel to 200px
- Each nav item shows: icon + label text. Active item: text in accent-primary, small glow dot.
- Nav items:
  - Grid icon + "Dashboard"
  - Layers icon + "Deep Dive"
  - Bell icon + "Alerts"
- Bottom section shows:
  - Theme switcher (3 circles) + "Theme" label
  - Settings icon + "Settings" label
  - Avatar circle + user name text
- Labels fade in as the panel expands (opacity 0 → 1, 200ms delay after width starts expanding)

Create BOTH states as separate component variants so they can be shown in the prototype.

## STEP 9: PILLS & SELECTORS

- Category pill and competitor pills: glassmorphism treatment (semi-transparent bg, blur, subtle border) instead of flat solid fills.
- Primary brand pill (Rhode): keep solid accent-primary bg but add a subtle shadow glow in accent-primary at 20% opacity.
- Date mode selector: the inactive segments should be glass, the active segment stays solid accent-primary with a glow.

## STEP 10: DROPDOWN OVERLAYS

Brand picker and category dropdown:
- Glassmorphism panel (stronger blur — 30px backdrop blur, higher opacity ~70%)
- Rows on hover: brighten background by 5%, add a faint left border accent.
- Search input: glass inset (slightly darker than the panel, inner shadow).

## STEP 11: TYPOGRAPHY — ADD DEPTH

- Large scores (48px, 28px JetBrains Mono): add a very subtle text shadow (0 1px 2px rgba(0,0,0,0.15)) for Dusk theme to lift numbers off the glass.
- Accent-colored text (deltas, links): add matching color glow (0 0 8px at 20% opacity).

## STEP 12: GENERAL RULES

- Every shadow should use the theme's palette colors, not neutral gray. Dusk: rgba(63, 20, 17, ...), Linen: rgba(70, 48, 39, ...), Blush: rgba(206, 101, 57, ...).
- The overall feel should be: looking through warm frosted glass panels floating over a rich gradient atmosphere.
- Nothing should feel flat or stuck to the background. Every card should feel like it's hovering.
- Keep text crisp and readable against the glass — if contrast is low, increase text opacity or add a very subtle text shadow.
- USE ONLY the hex codes from the 3 palettes listed in Step 1. Do not invent new colors, do not use generic grays or blacks. Every color in the design must trace back to a specific palette hex.

Apply these changes to all existing pages: Dashboard, all 6 Deep Dive pages, Alerts page, overlay states, empty state, and theme comparison frames.