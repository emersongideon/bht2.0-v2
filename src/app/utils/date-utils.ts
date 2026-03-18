/**
 * Date Utilities for ICONIC Dashboard
 *
 * Centralised date logic used by the DateModeContext and all charts/sparklines.
 * Edit this file to adjust axis labels, date ranges, formatting, etc.
 */

// ── Types ────────────────────────────────────────────────────────────
export type DateMode = "Daily" | "Rolling 30" | "Monthly";

// ── Constants ────────────────────────────────────────────────────────
export const AXIS_POINT_COUNT = 7;

export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// ── Core: compute the 7 axis dates relative to an anchor ─────────────
export function computeAxisDates(mode: DateMode, anchorDate: Date): Date[] {
  const dates: Date[] = [];
  for (let i = AXIS_POINT_COUNT - 1; i >= 0; i--) {
    const d = new Date(anchorDate);
    if (mode === "Monthly") {
      d.setMonth(d.getMonth() - i);
      d.setDate(1); // normalise to 1st of month
    } else {
      // "Daily" and "Rolling 30" both resolve to 7 calendar days
      d.setDate(d.getDate() - i);
    }
    dates.push(d);
  }
  return dates;
}

// ── Formatting ───────────────────────────────────────────────────────

/** Short axis label — "Mar 26" for Monthly, "13 Mar 26" for Daily / Rolling 30 */
export function formatAxisLabel(mode: DateMode, date: Date): string {
  const yy = String(date.getFullYear()).slice(-2);
  if (mode === "Monthly") {
    return `${MONTH_NAMES[date.getMonth()]} ${yy}`;
  }
  // Daily / Rolling 30 → "13 Mar 26" style
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${yy}`;
}

/** dd/mmm/yy display string — e.g. "17/Mar/26" */
export function formatDisplayDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mmm = MONTH_NAMES[date.getMonth()];
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}/${mmm}/${yy}`;
}

/** yyyy-mm-dd for native <input type="date"> value */
export function toISODateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse a yyyy-mm-dd string back to a Date (local timezone) */
export function parseISODateString(value: string): Date | null {
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

// ── Convenience: get all 7 labels in one call ────────────────────────
export function getAxisLabels(mode: DateMode, anchorDate: Date): string[] {
  return computeAxisDates(mode, anchorDate).map((d) => formatAxisLabel(mode, d));
}