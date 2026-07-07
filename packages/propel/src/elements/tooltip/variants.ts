import { cva, cx } from "class-variance-authority";

export const tooltipPopupVariants = cva(
  "flex items-center gap-3 rounded-md border-sm border-subtle-1 bg-layer-2 px-2 py-1.5 text-caption-md-regular text-primary shadow-overlay-200",
);
export const tooltipArrowVariants = cva(
  cx(
    "size-2 rotate-45 border-sm border-subtle-1 bg-layer-2",
    "data-[side=bottom]:top-[-3px] data-[side=bottom]:[clip-path:polygon(0_0,100%_0,0_100%)]",
    "data-[side=top]:bottom-[-3px] data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
    "data-[side=left]:right-[-3px] data-[side=left]:[clip-path:polygon(0_0,100%_0,100%_100%)]",
    "data-[side=right]:left-[-3px] data-[side=right]:[clip-path:polygon(0_0,0_100%,100%_100%)]",
    "data-[side=inline-start]:inset-e-[-3px] data-[side=inline-start]:[clip-path:polygon(0_0,100%_0,100%_100%)] rtl:data-[side=inline-start]:[clip-path:polygon(0_0,0_100%,100%_100%)]",
    "data-[side=inline-end]:inset-s-[-3px] data-[side=inline-end]:[clip-path:polygon(0_0,0_100%,100%_100%)] rtl:data-[side=inline-end]:[clip-path:polygon(0_0,100%_0,100%_100%)]",
  ),
);
