Fix the colors and visual style across all pages and themes. The current design uses palette colors too heavily as background fills, making everything look monochromatic and muddy. The fix: neutral warm backgrounds with palette colors used ONLY as small accents.

## CORE PRINCIPLE

Palette colors are for ACCENTS ONLY — dimension dots, active pills, sparkline strokes, chart lines, border highlights, delta badges, and the ICONIC ring. They should NEVER fill large surface areas like card backgrounds, page backgrounds, or section fills.

Backgrounds and card fills should be neutral warm tones (cream, off-white, warm gray) so the accent colors pop.

Text color must always be high-contrast and readable. Dark text (#2D2420 or similar warm near-black) on light backgrounds. If any element has a dark fill (like the accent-primary pill), use white text.

## THEME 1: "Dusk" (Palette 4 as accents on warm white)

Page background: #FAF7F4 (warm off-white)
Card backgrounds: #FFFFFF with subtle shadow (0 2px 12px rgba(45, 36, 32, 0.06))
Card border: 1px solid rgba(63, 20, 17, 0.08)
Glassmorphism cards: rgba(255, 255, 255, 0.75), backdrop-blur 16px, border 1px solid rgba(255,255,255,0.9)

Gradient mesh background: very subtle warm mesh behind everything using #FAF7F4, #F5F0EB, #F7F2EE, #FBF8F5 — barely visible shifts in warm white. NOT brown.

Text primary: #2D2420 (warm near-black)
Text secondary: #7A6F65 (warm gray)
Text muted: #B5ADA5 (light warm gray)

Accent primary: #B86A54 (terracotta — from palette 4)
Accent secondary: #DAC58C (gold — from palette 4)

Sidebar background: #F5F0EB (slightly warmer than page bg)
Active nav pill: #B86A54 at 12% opacity, icon stroke #B86A54

Dimension colors (used ONLY for dots, sparklines, chart lines, tab accents):
  I1: #374762 (navy)
  C1: #DAC58C (gold)
  O: #B86A54 (terracotta)
  N: #ACBDA7 (sage)
  I2: #6B241E (deep red)
  C2: #3F1411 (dark brown)

Primary brand pill: solid #B86A54, text white
Competitor pills: white bg, 1px border #E8E2DC, text #2D2420
Delta positive: #4A6644 text on #4A6644 at 10% bg
Delta negative: #B86A54 text on #B86A54 at 10% bg
Source badges ("Social", "LLM", "Search"): #F5F0EB bg, #7A6F65 text

ICONIC ring: stroke gradient #B86A54 → #DAC58C. Glow: #B86A54 at 15% behind ring.
Ring card bg: white, same as other cards.

## THEME 2: "Linen" (Palette 1 as accents on clean cream)

Page background: #FDFBF9 (clean warm cream — NOT pink)
Card backgrounds: #FFFFFF
Card border: 1px solid rgba(70, 48, 39, 0.06)
Glassmorphism cards: rgba(255, 255, 255, 0.80), backdrop-blur 16px

Gradient mesh: #FDFBF9, #FBF7F3, #F9F5F2, #FEFCFA — warm cream shifts. NO pink in the background.

Text primary: #463027 (dark brown — from palette 1)
Text secondary: #8A7D76 (warm gray)
Text muted: #C4BBB5

Accent primary: #DD9F86 (salmon/peach — from palette 1)
Accent secondary: #A6C2DB (sky blue — from palette 1)

Sidebar background: #F7F3EF
Active nav: #DD9F86 at 12% opacity, icon #DD9F86

Dimension colors:
  I1: #A6C2DB (sky blue)
  C1: #DD9F86 (salmon)
  O: #463027 (dark brown)
  N: #CEDEE2 (ice blue)
  I2: #DDBFB3 (warm beige)
  C2: #E6CDC4 (dusty pink)

Primary brand pill: solid #DD9F86, text white
Competitor pills: white bg, border #EDE8E4, text #463027
Delta positive: #4A6644 text
Delta negative: #C66F80 text

ICONIC ring: stroke gradient #DD9F86 → #A6C2DB. Glow: #DD9F86 at 12%.

## THEME 3: "Blush" (Palette 5 as accents on warm cream)

Page background: #FBF8F6 (warm cream — NOT pink, NOT dusty rose)
Card backgrounds: #FFFFFF
Card border: 1px solid rgba(206, 101, 57, 0.06)
Glassmorphism cards: rgba(255, 255, 255, 0.80), backdrop-blur 16px

Gradient mesh: #FBF8F6, #F8F4F1, #FAF6F3, #FDFAF8 — neutral cream. NO pink or rose in the background.

Text primary: #3A2E28 (warm dark brown)
Text secondary: #7D7468 (warm gray)
Text muted: #B8AFA7

Accent primary: #CE6539 (burnt orange — from palette 5)
Accent secondary: #9CA6D8 (dusty blue — from palette 5)

Sidebar background: #F5F1ED
Active nav: #CE6539 at 12% opacity, icon #CE6539

Dimension colors:
  I1: #9CA6D8 (dusty blue)
  C1: #CE6539 (burnt orange)
  O: #CF9691 (dusty rose — used as small accent only, NOT as fill)
  N: #B1B262 (olive-lime)
  I2: #D38562 (warm copper)
  C2: #86843B (olive)

Primary brand pill: solid #CE6539, text white
Competitor pills: white bg, border #EAE5E0, text #3A2E28
Delta positive: #86843B text
Delta negative: #CE6539 text

ICONIC ring: stroke gradient #CE6539 → #9CA6D8. Glow: #CE6539 at 12%.

## WHAT TO KEEP FROM CURRENT DESIGN

- Layout structure (do not move or resize anything)
- Glassmorphism card treatment (backdrop blur, transparency, subtle borders)
- Gradient mesh concept (but fix the colors as specified above)
- Sidebar hover-expand behavior
- All data, text content, scores, and dummy values
- Sparkline shapes, chart placeholders, radar chart

## WHAT TO FIX

- ALL page backgrounds → warm cream/off-white (not brown, not pink, not colored)
- ALL card backgrounds → white or near-white glass (not tinted with palette colors)
- ALL text → high contrast warm dark on light backgrounds
- Palette colors → restricted to SMALL accent elements only
- Remove any large areas of salmon, pink, brown, or dusty rose fill
- The "Social" source badges should be subtle (light gray bg, muted text) not colored
- The insight card can keep its left accent border but the card bg should be white/cream, not colored

Apply to: Dashboard, all 6 Deep Dive pages, Alerts page, empty state, overlay dropdowns, and theme comparison frames.