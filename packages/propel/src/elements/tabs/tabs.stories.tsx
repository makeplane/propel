import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Tab,
  TabUnderlineBar,
  TabUnderlineBarTrack,
  TabUnderlineLabel,
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, list, tabs, panels, and indicator behaviors are
// wired straight from `@base-ui/react` here. `Tabs`, `TabsList`, and each `Tab` take the
// `appearance` explicitly — the ready-made `components/tabs` sets it once and shares it via context
// (and adds the scroll frame + indicator) so you don't repeat it.
const meta = {
  title: "Elements/Tabs",
  component: TabsPanel,
  subcomponents: { Tabs, TabsList, Tab, TabsIndicator },
} satisfies Meta<typeof TabsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAB_ITEMS = [
  { value: "overview", label: "Overview", panel: "A high-level summary of the project." },
  { value: "activity", label: "Activity", panel: "The latest activity feed." },
  { value: "settings", label: "Settings", panel: "Configuration and preferences." },
];

/** Assemble the atomic parts: Root › List › Tab, plus a Panel per value (contained appearance). */
export const Default: Story = {
  render: () => (
    <BaseTabs.Root render={<Tabs appearance="contained" />} defaultValue="overview">
      <BaseTabs.List render={<TabsList appearance="contained" />}>
        {TAB_ITEMS.map((item) => (
          <BaseTabs.Tab key={item.value} value={item.value} render={<Tab appearance="contained" />}>
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {TAB_ITEMS.map((item) => (
        <BaseTabs.Panel key={item.value} value={item.value} render={<TabsPanel />}>
          {item.panel}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  ),
};

/**
 * Interaction test: clicking a tab activates it and swaps the panel. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the active tab/panel change on its own.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const overview = canvas.getByRole("tab", { name: "Overview" });
    const activity = canvas.getByRole("tab", { name: "Activity" });
    await expect(overview).toHaveAttribute("aria-selected", "true");
    await userEvent.click(activity);
    await expect(activity).toHaveAttribute("aria-selected", "true");
    await expect(overview).toHaveAttribute("aria-selected", "false");
  },
};

/**
 * The underline appearance: graft the shared `TabsIndicator` inside the list (the ready-made
 * `components/tabs` adds it for you). Each `Tab` decorates its body with the atomic
 * `TabUnderlineLabel` (the rounded label box) and a `TabUnderlineBarTrack` wrapping a
 * `TabUnderlineBar` (the padded track plus the per-tab hover bar).
 */
export const Underline: Story = {
  render: () => (
    <BaseTabs.Root render={<Tabs appearance="underline" />} defaultValue="overview">
      <BaseTabs.List render={<TabsList appearance="underline" />}>
        {TAB_ITEMS.map((item) => (
          <BaseTabs.Tab key={item.value} value={item.value} render={<Tab appearance="underline" />}>
            <TabUnderlineLabel>{item.label}</TabUnderlineLabel>
            <TabUnderlineBarTrack>
              <TabUnderlineBar />
            </TabUnderlineBarTrack>
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator render={<TabsIndicator />} />
      </BaseTabs.List>
      {TAB_ITEMS.map((item) => (
        <BaseTabs.Panel key={item.value} value={item.value} render={<TabsPanel />}>
          {item.panel}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  ),
};
