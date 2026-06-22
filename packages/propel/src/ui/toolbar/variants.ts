import { cva, cx } from "class-variance-authority";

import { surfaceVariants } from "../../internal/surface";

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

export const itemVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center rounded-md",
    "bg-layer-transparent text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-pressed:bg-layer-transparent-selected data-pressed:text-icon-accent-primary",
    "disabled:pointer-events-none disabled:text-icon-disabled",
    "[&_svg]:shrink-0",
  ),
  {
    variants: {
      density: {
        compact: "size-6 [&_svg]:size-3.5",
        comfortable: "size-7 [&_svg]:size-4",
      },
    },
  },
);

export const dropdownTriggerVariants = cva(
  cx(
    "inline-flex shrink-0 items-center gap-1 rounded-md px-2",
    "bg-layer-transparent text-13 text-secondary outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-popup-open:bg-layer-transparent-selected",
    "disabled:pointer-events-none disabled:text-disabled",
  ),
  {
    variants: {
      density: {
        compact: "h-6",
        comfortable: "h-7",
      },
    },
  },
);

export const dropdownChevronVariants = cva("shrink-0 text-icon-secondary", {
  variants: {
    density: {
      compact: "size-3.5",
      comfortable: "size-4",
    },
  },
});
