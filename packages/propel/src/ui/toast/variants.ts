import { cva, cx } from "class-variance-authority";

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

export const toastRootVariants = cva(
  cx(
    surfaceVariants({ elevation: "raised", radius: "lg" }),
    "relative flex w-full items-start gap-2 px-4 py-3",
    "transition-opacity data-ending:opacity-0",
  ),
);

export const toastContentVariants = cva("flex min-w-0 flex-1 flex-col gap-3");

export const toastTitleVariants = cva("text-14 font-medium text-primary");

export const toastDescriptionVariants = cva("text-13 text-tertiary");

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

export const toastCloseVariants = cva(
  cx(
    "absolute inset-e-1 top-1 inline-flex size-5 items-center justify-center rounded-sm text-icon-tertiary outline-none",
    "transition-colors hover:bg-layer-transparent-hover",
  ),
);

// Status-icon color per tone, straight from propel's `icon/*` tokens. The icon is
// the only tone-colored element; surface/border/text stay neutral, matching Figma.
export const statusIconVariants = cva("size-4 shrink-0", {
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
