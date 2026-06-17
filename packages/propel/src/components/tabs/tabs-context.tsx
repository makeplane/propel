import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

export const rootVariants = cva("inline-flex max-w-full flex-col items-start gap-3", {
  variants: {
    variant: {
      contained: "",
      underline: "",
    },
  },
});

// The Figma "Tabs" component defines two visual treatments. `contained` wraps
// the tabs in a pill and lifts the active tab onto a raised card; `underline`
// keeps the tabs flat and slides a dark bar under the active one.
export type TabsVariant = NonNullable<VariantProps<typeof rootVariants>["variant"]>;

export const TabsVariantContext = React.createContext<TabsVariant>("contained");

export const tabsListVariants = cva("relative inline-flex max-w-full", {
  variants: {
    variant: {
      contained: "items-center gap-px rounded-lg bg-layer-3 p-0.5",
      underline: "items-start gap-px px-0.5",
    },
  },
});

export const tabVariants = cva(
  "cursor-pointer font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-accent-strong disabled:cursor-not-allowed disabled:text-disabled",
  {
    variants: {
      variant: {
        contained:
          "inline-flex h-6 items-center justify-center gap-1 rounded-md border-sm border-transparent px-1.5 text-13 text-secondary hover:text-primary data-active:border-subtle-1 data-active:bg-layer-2 data-active:text-primary data-active:shadow-raised-200",
        underline: "group/tab inline-flex flex-col items-stretch gap-2 text-14",
      },
    },
  },
);

export const underlineLabelVariants = cva(
  "flex h-7 items-center justify-center gap-1.5 rounded-md px-2 py-0.5 text-tertiary transition-colors group-hover/tab:bg-layer-transparent-hover group-hover/tab:text-secondary group-data-active/tab:bg-layer-transparent-selected group-data-active/tab:text-primary",
);

export const underlineBarTrackVariants = cva("flex px-2");

export const underlineBarVariants = cva(
  "h-[3px] w-full rounded-full bg-current text-transparent transition-colors group-hover/tab:text-icon-placeholder group-data-active/tab:text-transparent",
);

export const tabIconVariants = cva(
  "inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-full",
);

export const tabsPanelVariants = cva("text-14 text-secondary outline-none");

export const tabsIndicatorVariants = cva(
  cx(
    "absolute top-[calc(var(--active-tab-top)+1.75rem+0.5rem)] left-[calc(var(--active-tab-left)+0.5rem)] h-[3px] w-[calc(var(--active-tab-width)-1rem)]",
    "rounded-full bg-inverse transition-all duration-150",
  ),
);
