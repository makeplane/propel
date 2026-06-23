import { cva, cx, type VariantProps } from "class-variance-authority";

// Search size scale: sm/md/lg map to the Figma height steps (28/32/36px).
// `--node-size` drives both the leading magnifier icon and trailing clear icon
// via the node-slot pattern (`[&>svg]:size-(--node-size)`), so all glyph sizing
// is owned here rather than baked on each <svg> element.
export const searchBoxVariants = cva(
  cx(
    "group/search inline-flex w-full items-center gap-2 rounded-lg border-sm border-subtle-1 bg-layer-2",
    "transition-colors hover:bg-layer-2-hover",
    "focus-within:border-accent-strong focus-within:bg-layer-2 focus-within:ring-2 focus-within:ring-accent-strong/25",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-layer-2 has-[:disabled]:hover:bg-layer-2",
  ),
  {
    variants: {
      magnitude: {
        sm: "h-7 px-1.5 [--node-size:0.875rem]", // 28px, 14px icon
        md: "h-8 px-2 [--node-size:1rem]", // 32px, 16px icon
        lg: "h-9 px-2.5 [--node-size:1rem]", // 36px, 16px icon
      },
    },
  },
);

export const searchInputVariants = cva(
  cx(
    "min-w-0 flex-1 bg-transparent text-primary outline-none",
    "placeholder:text-placeholder disabled:cursor-not-allowed disabled:text-disabled",
    "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
  ),
  {
    variants: {
      magnitude: {
        sm: "text-13",
        md: "text-14",
        lg: "text-14",
      },
    },
  },
);

// The leading magnifier — sized from --node-size set on the box.
export const searchIconClass = cx(
  "shrink-0 text-icon-placeholder transition-colors group-focus-within/search:text-icon-secondary",
  "[&>svg]:size-(--node-size)",
);

// The trailing clear button — square, sized to --node-size, focus ring on accent.
export const searchClearButtonVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center rounded-sm text-icon-secondary outline-none",
    "transition-colors hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "[&>svg]:size-(--node-size)",
  ),
  {
    variants: {
      magnitude: {
        sm: "size-5",
        md: "size-5",
        lg: "size-6",
      },
    },
  },
);

// Expandable-search wrapper: reserves the collapsed square; expands from the
// inline-end edge so the icon stays on the left as the box widens.
export const expandableWrapperVariants = cva("relative inline-flex shrink-0", {
  variants: {
    magnitude: {
      sm: "size-7",
      md: "size-8",
      lg: "size-9",
    },
  },
});

export const expandableBoxVariants = cva(
  cx(
    "group/search absolute inset-e-0 top-0 inline-flex items-center gap-2 overflow-hidden rounded-md",
    "border-sm border-transparent bg-layer-transparent",
    "transition-[width,border-color,background-color] duration-200 ease-out motion-reduce:transition-none",
    "not-data-expanded:hover:bg-layer-transparent-hover",
    "data-expanded:border-subtle-1 data-expanded:bg-layer-2",
    "data-expanded:focus-within:border-accent-strong data-expanded:focus-within:ring-1 data-expanded:focus-within:ring-accent-strong/35",
  ),
  {
    variants: {
      magnitude: {
        sm: "h-7 w-7 px-1.5 [--node-size:0.875rem] data-expanded:w-51",
        md: "h-8 w-8 px-2 [--node-size:1rem] data-expanded:w-51",
        lg: "h-9 w-9 px-2.5 [--node-size:1rem] data-expanded:w-51",
      },
    },
  },
);

type SearchBoxVariantProps = VariantProps<typeof searchBoxVariants>;
export type SearchMagnitude = NonNullable<SearchBoxVariantProps["magnitude"]>;
