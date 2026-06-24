import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { surfaceVariants } from "../../internal/surface";

// Toast is a structural overlay primitive. Base UI drives every interactive state
// (expanded/limited/swipe/starting/ending transition styles) as data attributes, so
// the atomic parts expose no styling axes (variant/tone/magnitude). The cva pairings
// below hold the static chrome so each part is styled in one place, with no
// `className` at the boundary. Provider, Portal, and Root carry no styling.

export const toastViewportVariants = cva(
  cx(
    "fixed inset-e-4 bottom-4 z-50 flex w-85 max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-lg outline-none",
    "focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-accent-strong",
  ),
);

export const toastVariants = cva(
  cx(
    surfaceVariants({ elevation: "raised", radius: "lg" }),
    "relative flex w-full items-start gap-2 px-4 py-3",
    "transition-opacity data-ending:opacity-0",
  ),
);

export const toastContentVariants = cva("flex min-w-0 flex-1 flex-col gap-3");

// The tight vertical pairing of the title and description, sitting at the top of the
// content column. A separate part so `ToastContent` can also hold a progress bar and an
// action row as siblings with the wider `gap-3` rhythm, while title+description keep a
// closer `gap-1`.
export const toastTextGroupVariants = cva("flex flex-col gap-1");

export const toastTitleVariants = cva("text-14 font-medium text-primary");

export const toastDescriptionVariants = cva("text-13 text-tertiary");

// The full-width action row beneath the text/progress (Figma node 1146-61689). Holds the
// inline-start `ToastActionGroup` cluster and an optional inline-end `ToastAction`.
export const toastActionsVariants = cva("flex w-full gap-1.5");

// The inline-start cluster of 1–2 plain action buttons. Grows to fill the row so a
// trailing `ToastAction` pins to the inline-end edge. `-ms-2` pulls each button's
// transparent `px-2` pill flush with the title text while letting the hover fill bleed
// toward the inline-start. RTL-safe via logical utilities.
export const toastActionGroupVariants = cva("-ms-2 flex min-w-0 flex-1 items-center gap-1.5");

// Shared action-button styling, straight from Figma's "Buttons" sub-frame: a 24px-tall
// pill with a 40px min width, `md` radius, 13px medium secondary text, transparent
// background that fills on hover. Used for both the left cluster and the right action.
export const toastActionVariants = cva(
  cx(
    "inline-flex h-6 min-w-10 shrink-0 items-center justify-center gap-1 rounded-md px-2",
    "text-13 font-medium text-secondary outline-none",
    "bg-layer-transparent transition-colors hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);

// The dismiss button pinned to the toast's inline-end corner. Sizes its single glyph
// child to `--node-size` (via the shared node-slot class), so callers pass a bare icon
// rather than styling it at the boundary.
export const toastCloseVariants = cva(
  cx(
    nodeSlotClass,
    "absolute inset-e-1 top-1 size-5 rounded-sm text-icon-tertiary outline-none [--node-size:0.875rem]",
    "transition-colors hover:bg-layer-transparent-hover",
  ),
);

// Status-icon color per tone, straight from propel's `icon/*` tokens. The icon is
// the only tone-colored element; surface/border/text stay neutral, matching Figma.
// `mt-0.5` nudges the icon 2px down so it visually aligns with the title baseline
// when the toast root uses `items-start` — eliminates the need for a wrapper span.
export const toastStatusIconVariants = cva("mt-0.5 size-4 shrink-0", {
  variants: {
    tone: {
      success: "text-icon-success-primary",
      danger: "text-icon-danger-primary",
      info: "text-icon-info-primary",
      warning: "text-icon-warning-primary",
      neutral: "text-icon-tertiary",
    },
  },
});
