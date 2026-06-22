import { cva } from "class-variance-authority";

export const tableHeadVariants = cva(
  "sticky top-0 h-[38px] px-4 py-2 text-start align-middle text-12 font-semibold text-tertiary",
  {
    variants: {
      variant: {
        default: "bg-layer-1",
        sortable: "bg-layer-1",
      },
    },
  },
);
