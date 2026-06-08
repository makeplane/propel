import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cva, cx } from "class-variance-authority";
import * as React from "react";

// The Figma "Tabs" component defines two visual treatments. `contained` wraps
// the tabs in a pill and lifts the active tab onto a raised card; `underline`
// keeps the tabs flat and slides a dark bar under the active one. Active / hover /
// pressed are interaction states from the primitive, not variants.
type TabsVariant = "contained" | "underline";

// Shared so `TabsList`, `Tab`, and `TabsPanel` know which treatment to render
// without each consumer threading `variant` through every part. `Tabs` (Root)
// sets it; the parts read it.
const TabsVariantContext = React.createContext<TabsVariant>("contained");

const rootVariants = cva("flex flex-col gap-3");

export type TabsProps = Omit<
  React.ComponentProps<typeof BaseTabs.Root>,
  "className" | "render" | "style"
> & {
  /**
   * Visual treatment (Figma variant). `contained` lifts the active tab onto a
   * raised card inside a pill; `underline` slides a dark bar under it.
   * @default "contained"
   */
  variant?: TabsVariant;
};

/**
 * Root of a tab set. Groups a `TabsList` of `Tab`s with their `TabsPanel`s and
 * tracks which tab is active. Build the compound API from its parts:
 *
 *   <Tabs defaultValue="overview">
 *     <TabsList>
 *       <Tab value="overview">Overview</Tab>
 *       <Tab value="activity">Activity</Tab>
 *     </TabsList>
 *     <TabsPanel value="overview">…</TabsPanel>
 *     <TabsPanel value="activity">…</TabsPanel>
 *   </Tabs>
 */
export function Tabs({ variant = "contained", ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <BaseTabs.Root className={rootVariants()} {...props} />
    </TabsVariantContext.Provider>
  );
}

// `contained` is a pill: a neutral layer-1 fill with 2px inset padding (no
// container border) so the raised active tab sits within it, rounded to 8px.
// `underline` is just a flat row with a hairline baseline that the indicator
// rides along. `relative` on both lets the indicator position against the list.
const tabsListVariants = cva("relative inline-flex items-center", {
  variants: {
    variant: {
      contained: "gap-px rounded-lg bg-layer-1 p-0.5",
      underline: "gap-px border-b-sm border-subtle-1",
    },
  },
});

export type TabsListProps = Omit<
  React.ComponentProps<typeof BaseTabs.List>,
  "className" | "render" | "style"
>;

/** The row of tabs. Renders the active-tab `Tabs.Indicator` for the underline. */
export function TabsList({ children, ...props }: TabsListProps) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <BaseTabs.List className={tabsListVariants({ variant })} {...props}>
      {children}
      {variant === "underline" ? <TabsIndicator /> : null}
    </BaseTabs.List>
  );
}

// Tabs share the inactive look (secondary/tertiary text) and flip to primary
// text when active. `contained` additionally lifts the active tab onto a raised
// layer-2 card; `underline` only changes text color (the bar is the indicator).
const tabVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1.5 font-medium whitespace-nowrap outline-none transition-colors select-none focus-visible:ring-2 focus-visible:ring-accent-strong disabled:cursor-not-allowed disabled:text-disabled",
  {
    variants: {
      variant: {
        contained:
          "rounded-md border-sm border-transparent px-2 py-1 text-13 text-secondary hover:text-primary data-[active]:border-subtle-1 data-[active]:bg-layer-2 data-[active]:text-primary data-[active]:shadow-raised-200",
        underline:
          "rounded-md px-2 py-0.5 text-14 text-tertiary hover:bg-layer-transparent-hover hover:text-secondary data-[active]:bg-layer-transparent-selected data-[active]:text-primary",
      },
    },
  },
);

export type TabProps = Omit<
  React.ComponentProps<typeof BaseTabs.Tab>,
  "className" | "render" | "style"
>;

/** A single tab button. `value` ties it to the `TabsPanel` of the same `value`. */
export function Tab(props: TabProps) {
  const variant = React.useContext(TabsVariantContext);
  return <BaseTabs.Tab className={tabVariants({ variant })} {...props} />;
}

const tabsPanelVariants = cva("text-14 text-secondary outline-none");

export type TabsPanelProps = Omit<
  React.ComponentProps<typeof BaseTabs.Panel>,
  "className" | "render" | "style"
>;

/** Content shown when the `Tab` of the matching `value` is active. */
export function TabsPanel(props: TabsPanelProps) {
  return <BaseTabs.Panel className={tabsPanelVariants()} {...props} />;
}

// The underline rides along the bottom of the list, sized and positioned to the
// active tab via Base UI's `--active-tab-*` CSS vars. Per Figma the bar is 3px
// tall, fully rounded, and uses `bg-inverse` (neutral-1200 = icon/primary) to
// match the active-tab text.
const tabsIndicatorVariants = cva(
  cx(
    "-bottom-px absolute left-[var(--active-tab-left)] h-[3px] w-[var(--active-tab-width)]",
    "rounded-full bg-inverse transition-all duration-150",
  ),
);

export type TabsIndicatorProps = Omit<
  React.ComponentProps<typeof BaseTabs.Indicator>,
  "className" | "render" | "style"
>;

/**
 * The underline bar. Surfaced for callers composing a custom list; the built-in
 * `TabsList` already renders it for the `underline` variant.
 */
export function TabsIndicator(props: TabsIndicatorProps) {
  return <BaseTabs.Indicator className={tabsIndicatorVariants()} {...props} />;
}
