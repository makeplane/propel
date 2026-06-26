import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { surfaceVariants } from "../../internal/surface";
import { type StrictVariantProps } from "../../internal/variant-props";

export const toolbarVariants = cva("flex w-fit items-center gap-2 p-1.5 text-secondary", {
  variants: {
    elevation: {
      raised: surfaceVariants({ elevation: "raised", radius: "lg" }),
      flat: "",
    },
    density: {
      compact: "",
      comfortable: "",
    },
  },
});

export const toolbarGroupVariants = cva("flex items-center gap-0.5");

export const toolbarSeparatorVariants = cva("mx-1 h-5 w-0 shrink-0 border-s-sm border-subtle-1");

export const toolbarToggleGroupVariants = cva("flex items-center gap-0.5");

// The square hit target for an icon control (button or toggle). Holds only the box,
// chrome, and the `--node-size` the child icon scales to via `ToolbarItemIcon` — the
// glyph itself is a separate node-slot part, never sized by a descendant selector here.
export const toolbarItemVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center rounded-md",
    "bg-layer-transparent text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-pressed:bg-layer-transparent-selected data-pressed:text-icon-accent-primary",
    "disabled:pointer-events-none disabled:text-icon-disabled",
  ),
  {
    variants: {
      density: {
        compact: "size-6 [--node-size:0.875rem]", // 24px box, 14px glyph
        comfortable: "size-7 [--node-size:1rem]", // 28px box, 16px glyph
      },
    },
  },
);

// The decorative glyph inside an icon control. Sizes its single child to the item's
// `--node-size` (via the shared node-slot class) and tints it. A slot — bakes no size
// or className onto the child.
export const toolbarItemIconVariants = cva(cx(nodeSlotClass, "text-current"));

// The styled chrome for a toolbar menu trigger: a horizontal control that pairs a
// text label with a disclosure indicator. The label's typography lives on the label
// part, not here.
export const toolbarMenuTriggerButtonVariants = cva(
  cx(
    "inline-flex shrink-0 items-center gap-1 rounded-md px-2",
    "bg-layer-transparent text-secondary outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-popup-open:bg-layer-transparent-selected",
    "disabled:pointer-events-none disabled:text-disabled",
  ),
  {
    variants: {
      density: {
        compact: "h-6 [--node-size:0.875rem]", // 24px tall, 14px caret
        comfortable: "h-7 [--node-size:1rem]", // 28px tall, 16px caret
      },
    },
  },
);

// The text label region of a menu trigger (e.g. "Text", "Aa"). Its own part so the
// trigger button holds no raw typography.
export const toolbarMenuTriggerLabelVariants = cva("text-13");

// The disclosure caret at the trigger's inline-end. Sizes its single child to the
// trigger's `--node-size` and tints it; a slot, like `ToolbarItemIcon`.
export const toolbarMenuTriggerIndicatorVariants = cva(cx(nodeSlotClass, "text-icon-secondary"));

/** Whether the toolbar draws its own surface (`raised`) or sits flush (`flat`). */
export type ToolbarElevation = NonNullable<VariantProps<typeof toolbarVariants>["elevation"]>;

/** How tightly the controls pack: `compact` (24px) or `comfortable` (28px). */
export type ToolbarDensity = NonNullable<VariantProps<typeof toolbarVariants>["density"]>;

export type ToolbarVariantProps = StrictVariantProps<typeof toolbarVariants>;

export type ToolbarItemVariantProps = StrictVariantProps<typeof toolbarItemVariants>;

export type ToolbarMenuTriggerButtonVariantProps = StrictVariantProps<
  typeof toolbarMenuTriggerButtonVariants
>;
