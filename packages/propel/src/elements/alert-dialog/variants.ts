import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// AlertDialog is a structural overlay primitive. It is always modal and
// non-dismissible, and Base UI drives every interactive state (open/closed,
// starting/ending transition styles) as data attributes. The one design axis the
// spec calls out is the leading icon's intent (destructive vs informational), which
// the `AlertDialogIcon` exposes as a required `tone` — every other part is static
// chrome held in a single cva so there is no `className` at the boundary. The
// backdrop, title, and description reuse the shared `internal/` overlay primitives
// (grafted in `components`), so they carry no per-family cva here.

export const alertDialogViewportVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
);

export const alertDialogPopupVariants = cva(
  cx(
    // Fixed width and layout: the max-width constraint and internal spacing are
    // always the same per spec — baked here, not left to the consumer.
    "flex w-80 flex-col gap-4",
    "rounded-lg border-sm border-subtle bg-layer-1 p-4 shadow-overlay-100 outline-none",
    "origin-(--transform-origin) transition-[opacity,transform] duration-200",
    "data-starting-style:scale-95 data-starting-style:opacity-0",
    "data-ending-style:scale-95 data-ending-style:opacity-0",
  ),
);

// Header: the top region that places the leading icon at the inline-start of the
// intro (icon left of title, per spec). Items align to the start so a multi-line
// description keeps the icon level with the title.
export const alertDialogHeaderVariants = cva("flex items-start gap-3");

// Icon: the decorative leading glyph beside the title. Sizes its single child to
// `--node-size` (via the shared node-slot class) and tints it by `tone` — the
// destructive-vs-informational axis the spec marks as adjustable. The glyph itself
// (warning/error/info) is whatever child the caller passes. No default tone: the
// caller must state the intent.
export const alertDialogIconVariants = cva(cx(nodeSlotClass, "mt-0.5 [--node-size:1.25rem]"), {
  variants: {
    tone: {
      danger: "text-icon-danger",
      warning: "text-icon-warning-primary",
      info: "text-icon-info-primary",
      success: "text-icon-success-primary",
    },
  },
});

// Intro: groups the title and description with consistent vertical spacing.
// Always the same per spec (spacing between title and description). `min-w-0` lets
// long copy wrap instead of pushing the icon out of the header row.
export const alertDialogIntroVariants = cva("flex min-w-0 flex-col gap-2");

// Actions: right-aligns action buttons with consistent horizontal spacing.
// Always the same per spec (action button placement, right-aligned in footer).
export const alertDialogActionsVariants = cva("flex justify-end gap-2");

export const alertDialogCloseVariants = cva(
  cx(
    "inline-flex items-center justify-center rounded-md text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);

export type AlertDialogIconTone = NonNullable<VariantProps<typeof alertDialogIconVariants>["tone"]>;
export type AlertDialogIconVariantProps = StrictVariantProps<typeof alertDialogIconVariants>;
