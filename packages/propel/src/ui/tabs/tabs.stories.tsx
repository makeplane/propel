import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Tab,
  TabUnderlineBar,
  TabUnderlineLabel,
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
} from "./index";
import { TabsVariantContext } from "./tabs-context";

// UI-tier story: composes the ATOMIC tab parts (each a single element). `Tabs` tracks the active
// tab; `TabsList` rows up the `Tab`s; `TabsPanel` shows the active content; `TabsIndicator` is the
// underline bar. The set's `variant` is wired to the parts via `TabsVariantContext` explicitly here
// (the ready-made `components/tabs` does this via its provider, and adds the horizontal scroll
// frame + the indicator for you).
const meta = {
  title: "UI/Tabs",
  component: Tabs,
  subcomponents: { TabsList, Tab, TabsIndicator, TabsPanel },
  args: { variant: "contained" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAB_ITEMS = [
  { value: "overview", label: "Overview", panel: "A high-level summary of the project." },
  { value: "activity", label: "Activity", panel: "The latest activity feed." },
  { value: "settings", label: "Settings", panel: "Configuration and preferences." },
];

/** Assemble the atomic parts: Root › List › Tab, plus a Panel per value (contained variant). */
export const Default: Story = {
  render: () => (
    <TabsVariantContext.Provider value="contained">
      <Tabs variant="contained" defaultValue="overview">
        <TabsList>
          {TAB_ITEMS.map((item) => (
            <Tab key={item.value} value={item.value}>
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
    </TabsVariantContext.Provider>
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
 * The underline variant: compose the shared `TabsIndicator` inside the `TabsList` (the ready-made
 * `components/tabs` adds it for you). Each `Tab` decorates its body with the atomic
 * `TabUnderlineLabel` (the rounded label box) and `TabUnderlineBar` (the per-tab hover bar).
 */
export const Underline: Story = {
  render: () => (
    <TabsVariantContext.Provider value="underline">
      <Tabs variant="underline" defaultValue="overview">
        <TabsList>
          {TAB_ITEMS.map((item) => (
            <Tab key={item.value} value={item.value}>
              <TabUnderlineLabel>{item.label}</TabUnderlineLabel>
              <TabUnderlineBar />
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
    </TabsVariantContext.Provider>
  ),
};
