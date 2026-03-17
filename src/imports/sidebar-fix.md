# ICONIC Dashboard — Sidebar Fix

Paste this into Figma Make to fix the sidebar component.

---

```
Fix the sidebar component in both collapsed and expanded states. Replace across all pages.

## COLLAPSED STATE (60px wide)

Top to bottom, everything centered horizontally:

1. LOGO: Letter "Q" in Instrument Serif 22px bold, accent-primary color. Centered. 16px top padding.

2. NAV ICONS (vertical stack, 8px gap, centered):
   - Dashboard: grid icon (20px)
   - Deep Dive: layers icon (20px)
   - Alerts: bell icon (20px)
   Active state: rounded-md pill bg (accent-primary at 12% opacity) behind the icon, icon stroke in accent-primary. Inactive: icon stroke in text-muted.

3. SPACER (fills remaining vertical space)

4. BOTTOM SECTION (vertical stack, 12px gap, centered):
   - "Theme" label: DM Sans 9px, text-muted, centered. ABOVE the circles.
   - Theme circles: 3 circles in a horizontal row, 6px gap. Each circle is 18px (smaller than before). Each split vertically: left half = theme bg color, right half = theme accent. Active circle has a 1.5px ring in accent-primary. The row of 3 circles should be centered within the 60px width.
   - Settings: gear icon (18px), text-muted, centered.
   - Avatar: 28px circle, centered. 16px bottom padding.

The collapsed sidebar should feel clean and tight. No elements should touch the edges — maintain at least 10px horizontal padding.

## EXPANDED STATE (200px wide)

Same vertical order, but with labels visible:

1. LOGO: "QUILT.AI" in Instrument Serif 18px bold, accent-primary. Left-aligned with 16px left padding. 16px top padding.

2. NAV ITEMS (vertical stack, 4px gap):
   Each item: auto-layout horizontal, gap 10px, padding 8px 14px, full width, rounded-md.
   - Icon (20px) + Label (DM Sans 14px)
   - Active: bg accent-primary at 12% opacity, icon + text in accent-primary
   - Inactive: no bg, icon + text in text-muted
   - Hover: bg card-hover
   Items:
   - Grid icon + "Dashboard"
   - Layers icon + "Deep Dive"
   - Bell icon + "Alerts"

3. SPACER

4. BOTTOM SECTION (vertical stack, 10px gap):
   - Auto-layout horizontal: 3 theme circles (18px each, 6px gap) + "Theme" label (DM Sans 12px, text-muted). Circles on left, label on right.
   - Auto-layout horizontal: gear icon (18px) + "Settings" (DM Sans 12px, text-muted). 14px left padding.
   - Auto-layout horizontal: avatar circle (28px) + user name placeholder "User" (DM Sans 12px, text-secondary). 14px left padding. 16px bottom padding.

## APPLY TO ALL PAGES

Update the sidebar on: Dashboard, all 6 Deep Dive pages, Alerts page, and empty state. Make sure the correct nav item is active on each page (Dashboard = grid, Deep Dive = layers, Alerts = bell).
```