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

// `inline-flex` (not block `flex`) so the root hugs its tabs instead of
// spanning the full width of its parent — the tab set should be as wide as its
// content, matching the Figma group which is an inline row.
const rootVariants = cva("inline-flex flex-col gap-3");

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

// `contained` is a pill: a neutral layer-3 fill with 2px inset padding (no
// container border, per Figma `Contained Tab group` 1144:3856), `gap-px` (1px)
// between tabs, rounded to 8px (`radius/lg`). The raised active tab sits within.
// `underline` is a flat inline row that hugs its tabs (no baseline border per
// Figma `Underline Tab group` 1162:321 — `gap-px px-0.5`). The active bar rides
// under the active tab as the JS-measured `TabsIndicator`. `relative` lets that
// indicator position against the list; `inline-flex` keeps the row sized to its
// content. Underline uses `items-start` so every tab column shares a top edge.
const tabsListVariants = cva("relative inline-flex", {
  variants: {
    variant: {
      contained: "items-center gap-px rounded-lg bg-layer-3 p-0.5",
      underline: "items-start gap-px px-0.5",
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

// Both variants share the inactive look (muted text) and flip to primary text
// when active. `contained` lifts the active tab onto a raised layer-2 card; the
// tab box is `h-6` (24px) with `px-1.5` (6px) and `gap-1` (4px) so the whole
// container is 28px (24 + 2px padding top/bottom). `underline` is a vertical
// column: a `h-7` (28px) label box with `px-2` (8px) / `py-0.5` (2px) /
// `gap-1.5` (6px), then an 8px (`gap-2`) gap, then a 3px bar track — totaling
// 40px. The per-tab bar handles the hover affordance (placeholder gray); the
// active bar is the JS-measured `TabsIndicator` overlaid on top.
const tabVariants = cva(
  "cursor-pointer font-medium whitespace-nowrap outline-none transition-colors select-none focus-visible:ring-2 focus-visible:ring-accent-strong disabled:cursor-not-allowed disabled:text-disabled",
  {
    variants: {
      variant: {
        contained:
          "inline-flex h-6 items-center justify-center gap-1 rounded-md border-sm border-transparent px-1.5 text-13 text-secondary hover:text-primary data-[active]:border-subtle-1 data-[active]:bg-layer-2 data-[active]:text-primary data-[active]:shadow-raised-200",
        underline: "group/tab inline-flex flex-col items-stretch gap-2 text-14",
      },
    },
  },
);

// The label box inside an `underline` tab. Carries the interaction states
// (hover/selected backgrounds + text color); the surrounding column owns the
// layout and the bar track. `contained` renders its label inline, so this is
// only used for `underline`.
const underlineLabelVariants = cva(
  "flex h-7 items-center justify-center gap-1.5 rounded-md px-2 py-0.5 text-tertiary transition-colors group-hover/tab:bg-layer-transparent-hover group-hover/tab:text-secondary group-data-[active]/tab:bg-layer-transparent-selected group-data-[active]/tab:text-primary",
);

// The 3px bar track under an `underline` tab. The track is inset `px-2` (8px)
// from the tab box so the bar hugs the label rather than bleeding under the
// horizontal padding, matching Figma `1162:321`. The bar uses `bg-current` with
// transparent text by default and `text-icon-placeholder` on hover, so the
// hover affordance is a gray bar. The active bar is drawn by `TabsIndicator`
// (primary), so the active tab's own bar stays transparent to avoid doubling.
const underlineBarTrackVariants = cva("flex px-2");
const underlineBarVariants = cva(
  "h-[3px] w-full rounded-full bg-current text-transparent transition-colors group-hover/tab:text-icon-placeholder group-data-[active]/tab:text-transparent",
);

// The leading-icon box. Sized to 16px (`Icon`) and tinted via `currentColor`,
// matching the Figma `placeholder` slot present on both variants.
const tabIconVariants = cva(
  "inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-full",
);

export type TabProps = Omit<
  React.ComponentProps<typeof BaseTabs.Tab>,
  "className" | "render" | "style"
> & {
  /** Optional leading icon (e.g. a lucide icon), sized to 16px and tinted to the tab's text color. */
  icon?: React.ReactNode;
};

/** A single tab button. `value` ties it to the `TabsPanel` of the same `value`. */
export function Tab({ icon, children, ...props }: TabProps) {
  const variant = React.useContext(TabsVariantContext);
  const iconNode =
    icon != null ? (
      <span aria-hidden className={tabIconVariants()}>
        {icon}
      </span>
    ) : null;
  if (variant === "underline") {
    return (
      <BaseTabs.Tab className={tabVariants({ variant })} {...props}>
        <span className={underlineLabelVariants()}>
          {iconNode}
          {children}
        </span>
        <span className={underlineBarTrackVariants()}>
          <span aria-hidden className={underlineBarVariants()} />
        </span>
      </BaseTabs.Tab>
    );
  }
  return (
    <BaseTabs.Tab className={tabVariants({ variant })} {...props}>
      {iconNode}
      {children}
    </BaseTabs.Tab>
  );
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

// The active underline bar. Per Figma `1162:321` the bar sits 8px below the
// 28px label box, so its `top` is pinned to `--active-tab-top + 28px label +
// 8px gap` (`+ 1.75rem + 0.5rem`). The horizontal placement uses Base UI's
// JS-measured `--active-tab-left` / `--active-tab-width` (the documented RTL
// exception, kept physical) and is inset `px-2` (8px / 0.5rem each side) to
// match the per-tab bar track: left = tab-left + 8px, width = tab-width - 16px.
// The bar is 3px tall, fully rounded, `bg-inverse` (neutral-1200 =
// icon/primary) to match the active-tab text.
const tabsIndicatorVariants = cva(
  cx(
    "absolute top-[calc(var(--active-tab-top)+1.75rem+0.5rem)] left-[calc(var(--active-tab-left)+0.5rem)] h-[3px] w-[calc(var(--active-tab-width)-1rem)]",
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
