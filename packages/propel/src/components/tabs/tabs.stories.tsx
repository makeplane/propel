import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { Tab, Tabs, TabsIndicator, TabsList, TabsPanel } from "./index";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: { TabsList, Tab, TabsPanel, TabsIndicator },
  tags: ["ai-generated"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1144-3157",
    },
  },
  args: {
    variant: "contained",
    defaultValue: "overview",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A working contained tab set: a raised card lifts the active tab inside the pill. */
export const Contained: Story = {
  args: { variant: "contained" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabsList>
      <TabsPanel value="overview">A high-level summary of the project.</TabsPanel>
      <TabsPanel value="activity">The latest activity feed.</TabsPanel>
      <TabsPanel value="settings">Configuration and preferences.</TabsPanel>
    </Tabs>
  ),
};

/** A working underline tab set: a dark bar slides under the active tab. */
export const Underline: Story = {
  args: { variant: "underline" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabsList>
      <TabsPanel value="overview">A high-level summary of the project.</TabsPanel>
      <TabsPanel value="activity">The latest activity feed.</TabsPanel>
      <TabsPanel value="settings">Configuration and preferences.</TabsPanel>
    </Tabs>
  ),
};

/**
 * Real interaction test: clicking a tab selects it (`aria-selected="true"`) and
 * reveals its panel while the previously active panel hides. Tagged `!dev`/
 * `!autodocs`/`!manifest` so it stays out of the sidebar, docs, and AI manifest
 * but still runs under the default `test` tag.
 */
export const ClickActivates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { variant: "underline" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
      </TabsList>
      <TabsPanel value="overview">Overview panel</TabsPanel>
      <TabsPanel value="activity">Activity panel</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvas, userEvent }) => {
    // Initially the first tab is selected and shows its panel.
    const overviewTab = canvas.getByRole("tab", { name: "Overview" });
    const activityTab = canvas.getByRole("tab", { name: "Activity" });
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    await expect(activityTab).toHaveAttribute("aria-selected", "false");
    await waitFor(async () => {
      const p = canvas.getAllByRole("tabpanel");
      await expect(p).toHaveLength(1);
      await expect(p[0]).toHaveTextContent("Overview panel");
    });

    // Clicking the second tab moves selection and swaps the visible panel.
    await userEvent.click(activityTab);
    await expect(activityTab).toHaveAttribute("aria-selected", "true");
    await expect(overviewTab).toHaveAttribute("aria-selected", "false");
    await waitFor(async () => {
      const panels = canvas.getAllByRole("tabpanel");
      await expect(panels).toHaveLength(1);
      await expect(panels[0]).toHaveTextContent("Activity panel");
    });
  },
};
