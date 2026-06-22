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

// UI-tier story: composes the ATOMIC tab parts. `Tabs` (Base UI `Tabs.Root`) tracks the
// active tab and shares its `variant` via context; `TabsList` rows up the `Tab`s and renders
// the `TabsIndicator` underline bar for the underline variant; `TabsPanel` shows the content
// for the active value. `TabUnderlineLabel`/`TabUnderlineBar` are the decorative inner parts
// of an underline-variant tab. The ready-made tab set lives in `components/tabs`.
const meta = {
  title: "UI/Tabs",
  component: Tabs,
  subcomponents: { TabsList, Tab, TabsIndicator, TabsPanel },
  // The render fns assemble their own Tabs root with an explicit variant; this satisfies the
  // required `variant` axis on the meta component type.
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
 * The underline variant: `TabsList` renders the shared `TabsIndicator` that slides under the active
 * tab. Each `Tab` decorates its body with the atomic `TabUnderlineLabel` (the rounded label box)
 * and `TabUnderlineBar` (the per-tab hover bar the indicator hands off to when active).
 */
export const Underline: Story = {
  render: () => (
    <Tabs variant="underline" defaultValue="overview">
      <TabsList>
        {TAB_ITEMS.map((item) => (
          <Tab key={item.value} value={item.value}>
            <TabUnderlineLabel>{item.label}</TabUnderlineLabel>
            <TabUnderlineBar />
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
};
