import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, LayoutGrid, Settings } from "lucide-react";
import type * as React from "react";
import { expect, within } from "storybook/test";

import { NodeSlot } from "../../internal/node-slot";
import {
  Tab,
  TabUnderlineBar,
  TabUnderlineBarTrack,
  TabUnderlineLabel,
  Tabs,
  TabsIndicator,
  TabsList,
  TabsListScrollArea,
  TabsPanel,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the tab semantics (`role="tablist"`/`role="tab"`/
// `role="tabpanel"`, `aria-selected`) and every visual state pinned statically via the attributes
// Base UI's tabs would set: `data-active=""` on the selected tab, the native `disabled` attribute,
// and the `--active-tab-*` CSS vars `Tabs.Indicator` measures (pinned through the indicator's own
// `render`, the way Base UI's inline style lands on the rendered element). Both values of the
// family's one variant axis (`appearance: contained | underline`) get a story. Grafting, keyboard,
// and aria behavior are demonstrated and tested in Components/Tabs.
const meta = {
  title: "Elements/Tabs",
  component: Tabs,
  subcomponents: {
    TabsListScrollArea,
    TabsList,
    Tab,
    TabUnderlineLabel,
    TabUnderlineBarTrack,
    TabUnderlineBar,
    TabsIndicator,
    TabsPanel,
  },
  args: { appearance: "contained" },
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAB_ITEMS = [
  {
    value: "overview",
    label: "Overview",
    icon: <LayoutGrid />,
    panel: "A high-level summary of the project.",
  },
  { value: "activity", label: "Activity", icon: <Activity />, panel: "The latest activity feed." },
  {
    value: "settings",
    label: "Settings",
    icon: <Settings />,
    panel: "Configuration and preferences.",
  },
];

// The `--active-tab-*` geometry Base UI's `Tabs.Indicator` measures live from the active tab,
// pinned to representative values for these static rows: the list's 2px inline padding puts the
// first (active) tab at `left: 2px`, and the width approximates the rendered label. The
// indicator's cva turns the vars into its `top`/`left`/`width` via `calc()`.
const indicatorStyle = (activeTabWidth: number): React.CSSProperties =>
  ({
    "--active-tab-top": "0px",
    "--active-tab-left": "2px",
    "--active-tab-width": `${activeTabWidth}px`,
  }) as React.CSSProperties;

/**
 * The contained anatomy assembled statically: `Tabs` › `TabsListScrollArea` (the plain frame the
 * ready-made grafts a real ScrollArea onto) › `TabsList` › `Tab`s, plus the active tab's
 * `TabsPanel`. The first tab pins `data-active=""` — the attribute Base UI sets on the selected tab
 * — which lifts it onto the raised card. Only the active panel renders, matching Base UI's
 * unmount-while-inactive default (which is also why only the active tab carries `aria-controls`).
 * Each tab leads with an internal `NodeSlot` glyph sized by the tab's own `--node-size`.
 */
export const Contained: Story = {
  render: () => (
    <Tabs appearance="contained">
      <TabsListScrollArea>
        <TabsList appearance="contained" role="tablist" aria-label="Project sections">
          {TAB_ITEMS.map((item, index) => {
            const active = index === 0;
            return (
              <Tab
                key={item.value}
                appearance="contained"
                id={`tabs-elements-contained-tab-${item.value}`}
                role="tab"
                aria-selected={active}
                aria-controls={active ? "tabs-elements-contained-panel" : undefined}
                data-active={active ? "" : undefined}
              >
                <NodeSlot aria-hidden>{item.icon}</NodeSlot>
                {item.label}
              </Tab>
            );
          })}
        </TabsList>
      </TabsListScrollArea>
      <TabsPanel
        id="tabs-elements-contained-panel"
        role="tabpanel"
        aria-labelledby="tabs-elements-contained-tab-overview"
      >
        {TAB_ITEMS[0].panel}
      </TabsPanel>
    </Tabs>
  ),
};

/**
 * The underline anatomy: each `Tab` stacks a `TabUnderlineLabel` (the rounded label box) over a
 * `TabUnderlineBarTrack` › `TabUnderlineBar` (the padded track plus the per-tab hover bar), and the
 * list holds one shared `TabsIndicator` — the sliding dark bar. The active tab pins
 * `data-active=""` (its label fills, its own bar goes transparent) and the indicator pins the
 * `--active-tab-*` vars Base UI would measure from that tab, so the bar sits under it.
 */
export const Underline: Story = {
  render: () => (
    <Tabs appearance="underline">
      <TabsListScrollArea>
        <TabsList appearance="underline" role="tablist" aria-label="Project sections">
          {TAB_ITEMS.map((item, index) => {
            const active = index === 0;
            return (
              <Tab
                key={item.value}
                appearance="underline"
                id={`tabs-elements-underline-tab-${item.value}`}
                role="tab"
                aria-selected={active}
                aria-controls={active ? "tabs-elements-underline-panel" : undefined}
                data-active={active ? "" : undefined}
              >
                <TabUnderlineLabel>{item.label}</TabUnderlineLabel>
                <TabUnderlineBarTrack>
                  <TabUnderlineBar />
                </TabUnderlineBarTrack>
              </Tab>
            );
          })}
          <TabsIndicator aria-hidden render={<span style={indicatorStyle(76)} />} />
        </TabsList>
      </TabsListScrollArea>
      <TabsPanel
        id="tabs-elements-underline-panel"
        role="tabpanel"
        aria-labelledby="tabs-elements-underline-tab-overview"
      >
        {TAB_ITEMS[0].panel}
      </TabsPanel>
    </Tabs>
  ),
};

/**
 * Every pinnable state, per appearance:
 *
 * - **Resting** — the quiet row.
 * - **Active** — `data-active=""` (the attribute Base UI sets on the selected tab): the contained tab
 *   lifts onto its raised card; the underline tab fills its label box and hands the bar off to the
 *   pinned `TabsIndicator` (its own `TabUnderlineBar` goes transparent).
 * - **Disabled** — the native `disabled` attribute dims the label and swaps the cursor.
 *
 * The underline section leads with the active tab so the pinned indicator geometry (`left: 2px`)
 * lines up under it. Hover and focus-visible are CSS pseudo-classes, not attributes, so they cannot
 * be pinned here.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs appearance="contained">
        <TabsList appearance="contained" role="tablist" aria-label="Contained tab states">
          <Tab appearance="contained" role="tab" aria-selected={false}>
            Resting
          </Tab>
          <Tab appearance="contained" role="tab" aria-selected data-active="">
            Active
          </Tab>
          <Tab appearance="contained" role="tab" aria-selected={false} disabled>
            Disabled
          </Tab>
        </TabsList>
      </Tabs>
      <Tabs appearance="underline">
        <TabsList appearance="underline" role="tablist" aria-label="Underline tab states">
          <Tab appearance="underline" role="tab" aria-selected data-active="">
            <TabUnderlineLabel>Active</TabUnderlineLabel>
            <TabUnderlineBarTrack>
              <TabUnderlineBar />
            </TabUnderlineBarTrack>
          </Tab>
          <Tab appearance="underline" role="tab" aria-selected={false}>
            <TabUnderlineLabel>Resting</TabUnderlineLabel>
            <TabUnderlineBarTrack>
              <TabUnderlineBar />
            </TabUnderlineBarTrack>
          </Tab>
          <Tab appearance="underline" role="tab" aria-selected={false} disabled>
            <TabUnderlineLabel>Disabled</TabUnderlineLabel>
            <TabUnderlineBarTrack>
              <TabUnderlineBar />
            </TabUnderlineBarTrack>
          </Tab>
          <TabsIndicator aria-hidden render={<span style={indicatorStyle(60)} />} />
        </TabsList>
      </Tabs>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors and the `--active-tab-*` var
 * pipeline actually compiled. Tagged out of the sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // Contained: `data-active` lifts the tab onto the raised card (its background changes) and
    // the native `disabled` attribute swaps the text color to the disabled tone.
    const containedList = within(canvas.getByRole("tablist", { name: "Contained tab states" }));
    const resting = containedList.getByRole("tab", { name: "Resting" });
    const active = containedList.getByRole("tab", { name: "Active" });
    const disabled = containedList.getByRole("tab", { name: "Disabled" });
    await expect(getComputedStyle(active).backgroundColor).not.toBe(
      getComputedStyle(resting).backgroundColor,
    );
    await expect(getComputedStyle(disabled).color).not.toBe(getComputedStyle(resting).color);

    // Underline: the pinned `data-active` fills the label box through the compiled
    // `group-data-active/tab` selector.
    const underlineListEl = canvas.getByRole("tablist", { name: "Underline tab states" });
    const underlineList = within(underlineListEl);
    const labelOf = (tab: HTMLElement) => {
      const label = tab.querySelector("span");
      if (!(label instanceof HTMLElement)) throw new Error("missing underline label");
      return label;
    };
    await expect(
      getComputedStyle(labelOf(underlineList.getByRole("tab", { name: "Active" }))).backgroundColor,
    ).not.toBe(
      getComputedStyle(labelOf(underlineList.getByRole("tab", { name: "Resting" })))
        .backgroundColor,
    );

    // The pinned `--active-tab-left` (2px) resolves through the indicator's compiled
    // `left: calc(var(--active-tab-left) + 0.5rem)` to 10px.
    const indicator = underlineListEl.querySelector(":scope > [aria-hidden]");
    if (!(indicator instanceof HTMLElement)) throw new Error("missing pinned indicator");
    await expect(getComputedStyle(indicator).left).toBe("10px");
  },
};
