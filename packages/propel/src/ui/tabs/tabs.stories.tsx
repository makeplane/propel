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

// UI-tier story: composes the ATOMIC tab parts (each a single, prop-driven element). `Tabs`,
// `TabsList`, and each `Tab` take the `appearance` explicitly — the ready-made `components/tabs` sets
// it once and shares it via context (and adds the scroll frame + indicator) so you don't repeat it.
const meta = {
  title: "UI/Tabs",
  component: Tabs,
  subcomponents: { TabsList, Tab, TabsIndicator, TabsPanel },
  args: { appearance: "contained" },
} satisfies Meta<typeof Tabs>;

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
    <Tabs appearance="contained" defaultValue="overview">
      <TabsList appearance="contained">
        {TAB_ITEMS.map((item) => (
          <Tab key={item.value} appearance="contained" value={item.value}>
            {item.label}
          </Tab>
        ))}
      </TabsList>
      {TAB_ITEMS.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          {item.panel}
        </TabsPanel>
      ))}
    </Tabs>
  ),
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
 * The underline appearance: compose the shared `TabsIndicator` inside the `TabsList` (the
 * ready-made `components/tabs` adds it for you). Each `Tab` decorates its body with the atomic
 * `TabUnderlineLabel` (the rounded label box) and a `TabUnderlineBarTrack` wrapping a
 * `TabUnderlineBar` (the padded track plus the per-tab hover bar).
 */
export const Underline: Story = {
  render: () => (
    <Tabs appearance="underline" defaultValue="overview">
      <TabsList appearance="underline">
        {TAB_ITEMS.map((item) => (
          <Tab key={item.value} appearance="underline" value={item.value}>
            <TabUnderlineLabel>{item.label}</TabUnderlineLabel>
            <TabUnderlineBarTrack>
              <TabUnderlineBar />
            </TabUnderlineBarTrack>
          </Tab>
        ))}
        <TabsIndicator />
      </TabsList>
      {TAB_ITEMS.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          {item.panel}
        </TabsPanel>
      ))}
    </Tabs>
  ),
};
