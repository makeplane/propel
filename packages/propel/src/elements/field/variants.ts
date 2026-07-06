import { cva, cx, type VariantProps } from "class-variance-authority";

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

type FieldLabelVariantConfig = VariantProps<typeof fieldLabelVariants>;

export type FieldMagnitude = NonNullable<FieldLabelVariantConfig["magnitude"]>;

export type FieldLabelVariantProps = StrictVariantProps<typeof fieldLabelVariants>;

// The required `*` marker rendered after the label text. Decorative (the control's
// `required` carries the semantics), tinted danger per the Figma spec.
export const fieldLabelRequiredMarkerVariants = cva("text-danger-primary");

// The label + description column for a single choice option (checkbox/radio/switch row). The
// explicit 20px line box (`leading-5`) pairs with the 20px control slot
// (`fieldItemControlGroupVariants`) so the control centers on the label's first line.
export const fieldItemContentVariants = cva("flex min-w-0 flex-col gap-1 leading-5");

// The control slot of a choice option row: a 20px-tall box matching the label's first line box
// (`fieldItemContentVariants`' `leading-5`), centering any control height (radio/checkbox 16px,
// switch 14–18px) against that line — even when the label wraps or a description follows.
export const fieldItemControlGroupVariants = cva("flex h-5 shrink-0 items-center");

export const fieldDescriptionVariants = cva("text-tertiary", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

export type FieldDescriptionVariantProps = StrictVariantProps<typeof fieldDescriptionVariants>;

export const fieldErrorVariants = cva("text-danger-primary", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

export type FieldErrorVariantProps = StrictVariantProps<typeof fieldErrorVariants>;

// The control + helper-text column shared by the input and textarea fields (orientation-aware).
export const fieldControlContentVariants = cva("flex flex-col", {
  variants: {
    orientation: {
      vertical: "w-full gap-1.5",
      horizontal: "min-w-0 flex-1 gap-2",
    },
  },
});

export type FieldControlContentVariantProps = StrictVariantProps<
  typeof fieldControlContentVariants
>;

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
