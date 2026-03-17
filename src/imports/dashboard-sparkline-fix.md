# ICONIC Dashboard — Sparkline & Dimension Card Fix

Paste this into Figma Make.

---

```
Fix the sparklines and dimension card coloring on the Dashboard page.

## FIX 1: REMOVE THE OVAL DATA POINTS

Remove all oval/circle shapes on the sparkline. The sparkline should be a clean, smooth line ONLY — no dots, no circles, no markers at data points. Just the line. This applies to all 6 dimension cards.

On hover (in the real app), a thin vertical crosshair will appear with a tooltip — but for the static Figma prototype, just show a clean line with no markers.

## FIX 2: SPARKLINE COLOR — SAME ACROSS ALL DIMENSION CARDS

Do NOT color-code sparklines by dimension. All 6 sparklines should use the SAME color: text-secondary (warm gray, e.g. #7A6F65 for Dusk theme) at 60% opacity, with a stroke width of 1.5px.

The dimension identity is already shown by the colored dot next to the letter. The sparkline doesn't need to repeat that — it should be a neutral trend indicator.

The color coding on the Dashboard page is reserved for BRAND lines on the trend chart (Rhode, Summer Fridays, Glossier, etc.), not for dimensions.

## FIX 3: X-AXIS LABELS — REFLECT ACTUAL DATES

The x-axis labels currently show days of the week (M, T, W, T, F, S, S). This is wrong — they should reflect actual dates based on the selected date mode.

Since the prototype shows "Monthly" mode selected and "Mar 2026" as the current date, the 7 x-axis labels should be the past 7 months:

Sep    Oct    Nov    Dec    Jan    Feb    Mar

Use DM Sans 8px, text-muted color. Space evenly across the sparkline width.

For reference (not shown in prototype, but for Bolt later):
- If Daily mode, "7 Mar" date: show "1", "2", "3", "4", "5", "6", "7" (dates of the month)
- If Rolling 30 mode: show "Feb 6", "Feb 13", "Feb 20", "Feb 27", "Mar 6" (weekly intervals)
- If Monthly mode: show "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar" (past 7 months)

For this Figma prototype, just use the Monthly labels: Sep, Oct, Nov, Dec, Jan, Feb, Mar.

## FIX 4: SPARKLINE LINE STYLE

The sparkline should be:
- Smooth curve (not jagged straight lines between points)
- 1.5px stroke, text-secondary at 60% opacity
- No fill below the line
- No dots, circles, or markers
- Clean start and end (line starts at left edge, ends at right edge of the sparkline area)

Apply these fixes to all 6 dimension cards across the Dashboard and all Deep Dive pages.
```