import { cva, cx, type VariantProps } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

export type { InputMagnitude } from "../input/variants";

export const fieldVariants = cva("flex flex-col gap-1.5");

export const fieldLabelVariants = cva(
  cx("inline-flex items-center gap-0.5", "font-medium text-primary"),
  {
    variants: {
      magnitude: {
        md: "text-13",
        lg: "text-14",
        xl: "text-14",
      },
      inset: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { magnitude: "md", inset: true, class: "pt-[7px]" },
      { magnitude: "lg", inset: true, class: "pt-[9px]" },
      { magnitude: "xl", inset: true, class: "pt-[13px]" },
    ],
  },
);

type FieldLabelVariantProps = VariantProps<typeof fieldLabelVariants>;

export type FieldMagnitude = NonNullable<FieldLabelVariantProps["magnitude"]>;

// The required `*` marker rendered after the label text. Decorative (the control's
// `required` carries the semantics), tinted danger per the Figma spec.
export const fieldLabelRequiredMarkerVariants = cva("text-danger-primary");

// The label + description column for a single choice option (checkbox/radio/switch row).
export const fieldItemContentVariants = cva("flex min-w-0 flex-col gap-1");

export const fieldDescriptionVariants = cva("text-tertiary", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

export const fieldErrorVariants = cva("text-danger-primary", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

export const inputFieldRootVariants = cva("flex gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col items-start",
      horizontal: "flex-row items-start",
    },
  },
});

export const inputFieldContentVariants = cva("flex flex-col", {
  variants: {
    orientation: {
      vertical: "w-full gap-1.5",
      horizontal: "min-w-0 flex-1 gap-2",
    },
  },
});

// The input "box" composes the shared field-control surface; it adds only its own geometry
// (rounded-md, px, magnitude py), hover, transition, and the descendant-`:disabled` muting (the
// disabled state lives on the inner `<input>`, so it's keyed via `has-[:disabled]`). The `neutral`
// tone keeps the accent focus ring (`focus: within`); `danger` opts the ring out (`focus: none`).
export const inputFieldBoxVariants = cva(
  cx(
    "flex w-full items-center gap-1.5 transition-[color,background-color,border-color,box-shadow]",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
    "rounded-md px-3",
  ),
  {
    variants: {
      tone: {
        neutral: cx(
          fieldControlSurfaceVariants({ tone: "neutral", focus: "within" }),
          "hover:border-subtle-1 hover:bg-layer-2-hover",
          "focus-within:bg-layer-2 focus-within:hover:border-accent-strong focus-within:hover:bg-layer-2",
        ),
        danger: fieldControlSurfaceVariants({ tone: "danger", focus: "none" }),
      },
      magnitude: {
        md: "py-1.5",
        lg: "py-2",
        xl: "py-3",
      },
    },
  },
);

type InputFieldBoxVariantProps = VariantProps<typeof inputFieldBoxVariants>;

export type InputTone = NonNullable<InputFieldBoxVariantProps["tone"]>;

// The decorative 16px node at the control's inline start/end. Sizes its single child
// to `--node-size` (via the shared node-slot class) and tints it.
export const inputFieldIconSlotVariants = cva(
  cx(nodeSlotClass, "text-icon-secondary [--node-size:1rem]"),
);

export const fieldItemVariants = cva(
  cx(
    "flex min-w-0 items-start gap-2 rounded-sm px-2 py-1 text-primary transition-colors",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
    "not-data-disabled:hover:bg-layer-transparent-hover",
  ),
);

export const fieldLabelGroupVariants = cva("flex flex-col gap-1", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "min-w-0 flex-1",
    },
  },
});

export type FieldLabelGroupVariantProps = StrictVariantProps<typeof fieldLabelGroupVariants>;
