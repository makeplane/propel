import { cva } from "class-variance-authority";

export const crumbVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-14 leading-none font-medium text-tertiary",
  {
    variants: {
      interactive: {
        true: "transition-colors hover:bg-layer-transparent-hover hover:text-primary",
        false: "",
      },
    },
  },
);

export const crumbTriggerVariants = cva(
  "cursor-default data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
  {
    variants: {
      group: {
        true: "group/trigger",
        false: "",
      },
    },
  },
);
