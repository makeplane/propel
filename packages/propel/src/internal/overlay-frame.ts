import { cx } from "class-variance-authority";

/**
 * Frame regions shared across the modal/popover families (rule 4a): - `modalViewportClass` — the
 * fixed, centering viewport behind a dialog/alert-dialog popup. - `overlayHeadingClass` — the
 * title+description column at the top of a surface. - `overlayActionsClass` — the trailing-aligned
 * action row (families add their own padding). - `overlayCloseClass` — the corner dismiss
 * affordance's chrome (identical in alert-dialog and drawer; the toast's close is a composed
 * `IconButton` instead).
 */
export const modalViewportClass = "fixed inset-0 z-50 flex items-center justify-center p-4";
export const overlayHeadingClass = "flex min-w-0 flex-col gap-2";
export const overlayActionsClass = "flex justify-end gap-2";
export const overlayCloseClass = cx(
  "inline-flex items-center justify-center rounded-md text-icon-secondary outline-none",
  "hover:bg-layer-transparent-hover",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
);
