import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, LayoutGrid, Settings } from "lucide-react";
import type { ComponentProps } from "react";
import { expect, waitFor } from "storybook/test";

import { Tab, Tabs, TabsIndicator, TabsList, TabsPanel } from "./index";

// The standard three-tab set the basic stories share (the only difference between
// them is the `variant` and whether each tab shows its leading icon).
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

function TabsFixture({
  withIcons = false,
  ...props
}: ComponentProps<typeof Tabs> & { withIcons?: boolean }) {
  return (
    <Tabs {...props}>
      <TabsList>
        {TAB_ITEMS.map((t) => (
          <Tab key={t.value} value={t.value} leadingIcon={withIcons ? t.icon : undefined}>
            {t.label}
          </Tab>
        ))}
      </TabsList>
      {TAB_ITEMS.map((t) => (
        <TabsPanel key={t.value} value={t.value}>
          {t.panel}
        </TabsPanel>
      ))}
    </Tabs>
  );
}

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: { TabsList, Tab, TabsPanel, TabsIndicator },
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
  render: (args) => <TabsFixture {...args} />,
};

/** A working underline tab set: a dark bar slides under the active tab. */
export const Underline: Story = {
  args: { variant: "underline" },
  render: (args) => <TabsFixture {...args} />,
};

/** Both variants accept an optional `leadingIcon` (a 16px slot tinted to the tab's text color). */
export const WithIcons: Story = {
  args: { variant: "contained" },
  render: (args) => <TabsFixture {...args} withIcons />,
};

/** The `leadingIcon` slot on the underline variant. */
export const UnderlineWithIcons: Story = {
  args: { variant: "underline" },
  render: (args) => <TabsFixture {...args} withIcons />,
};

/**
 * When a tab set is wider than the space it has, the row scrolls horizontally instead of
 * overflowing its container. The overlay scrollbar is hidden at rest and fades in on hover/scroll.
 * Keyboard navigation still reaches every tab, and Base UI keeps the focused tab in view. Here the
 * trail is capped to a narrow column so the later tabs scroll into view.
 */
export const Overflowing: Story = {
  args: { variant: "underline" },
  render: (args) => (
    <div className="w-80">
      <Tabs {...args}>
        <TabsList>
          {[
            "Overview",
            "Activity",
            "Settings",
            "Members",
            "Integrations",
            "Automations",
            "Webhooks",
            "Billing",
          ].map((label) => (
            <Tab key={label} value={label.toLowerCase()}>
              {label}
            </Tab>
          ))}
        </TabsList>
        <TabsPanel value="overview">A high-level summary of the project.</TabsPanel>
      </Tabs>
    </div>
  ),
};

/**
 * The overflowing list is a real horizontal scroll container (`scrollWidth` exceeds `clientWidth`)
 * and scrolling it moves the row. Tagged `!dev`/`!autodocs`/ `!manifest` so it stays out of the
 * sidebar, docs, and AI manifest but still runs under the default `test` tag.
 */
export const OverflowScrolls: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { variant: "underline" },
  render: (args) => (
    <div className="w-80">
      <Tabs {...args}>
        <TabsList>
          {Array.from({ length: 12 }, (_, i) => (
            <Tab key={i} value={`tab-${i}`}>
              {`Section ${i + 1}`}
            </Tab>
          ))}
        </TabsList>
        <TabsPanel value="tab-0">Section 1 panel</TabsPanel>
      </Tabs>
    </div>
  ),
  play: async ({ canvas }) => {
    const list = canvas.getByRole("tablist");
    // The list is wider than the column, so it is a real horizontal scroller.
    await expect(list.scrollWidth).toBeGreaterThan(list.clientWidth);

    // Scrolling the viewport moves the content.
    list.scrollLeft = 120;
    await waitFor(() => expect(list.scrollLeft).toBeGreaterThan(0));
  },
};

/**
 * Real interaction test: clicking a tab selects it (`aria-selected="true"`) and reveals its panel
 * while the previously active panel hides. Tagged `!dev`/ `!autodocs`/`!manifest` so it stays out
 * of the sidebar, docs, and AI manifest but still runs under the default `test` tag.
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

/**
 * Keyboard / ARIA tab pattern (CI-enforced). Base UI's tablist uses a roving tabindex: it is one
 * Tab stop, only the selected tab has `tabindex=0`, and the arrow keys move _focus_ between tabs.
 * Selection is **manual** (Base UI `activateOnFocus` defaults to `false`): arrowing moves focus but
 * does NOT change `aria-selected`/the panel — you commit with Enter/Space (a native `<button>`
 * click). Home/End jump to the first/last tab (Base UI sets `enableHomeAndEndKeys`). Tagged
 * `!dev`/`!autodocs`/`!manifest` so it stays out of the sidebar/docs/AI manifest but still runs
 * under the default `test` tag.
 */
export const KeyboardNavigates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { variant: "underline" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabsList>
      <TabsPanel value="overview">Overview panel</TabsPanel>
      <TabsPanel value="activity">Activity panel</TabsPanel>
      <TabsPanel value="settings">Settings panel</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvas, userEvent }) => {
    const overviewTab = canvas.getByRole("tab", { name: "Overview" });
    const activityTab = canvas.getByRole("tab", { name: "Activity" });
    const settingsTab = canvas.getByRole("tab", { name: "Settings" });

    // The tablist is a single Tab stop (roving tabindex): only the selected
    // tab is reachable with Tab, and Tab focuses it.
    await expect(overviewTab).toHaveAttribute("tabindex", "0");
    await expect(activityTab).toHaveAttribute("tabindex", "-1");
    await expect(settingsTab).toHaveAttribute("tabindex", "-1");
    await userEvent.tab();
    await expect(overviewTab).toHaveFocus();

    // ArrowRight moves focus to the next tab. Activation is MANUAL: focus
    // moves and the roving tabindex follows, but selection/panel do not change.
    await userEvent.keyboard("{ArrowRight}");
    await expect(activityTab).toHaveFocus();
    await expect(activityTab).toHaveAttribute("tabindex", "0");
    await expect(overviewTab).toHaveAttribute("tabindex", "-1");
    await expect(activityTab).toHaveAttribute("aria-selected", "false");
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    await waitFor(async () => {
      const p = canvas.getAllByRole("tabpanel");
      await expect(p).toHaveLength(1);
      await expect(p[0]).toHaveTextContent("Overview panel");
    });

    // Enter commits the focused tab: aria-selected + the visible panel update.
    await userEvent.keyboard("{Enter}");
    await expect(activityTab).toHaveAttribute("aria-selected", "true");
    await expect(overviewTab).toHaveAttribute("aria-selected", "false");
    await waitFor(async () => {
      const p = canvas.getAllByRole("tabpanel");
      await expect(p).toHaveLength(1);
      await expect(p[0]).toHaveTextContent("Activity panel");
    });

    // ArrowLeft moves focus back; Space also commits selection.
    await userEvent.keyboard("{ArrowLeft}");
    await expect(overviewTab).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    await expect(activityTab).toHaveAttribute("aria-selected", "false");
    await waitFor(async () => {
      const p = canvas.getAllByRole("tabpanel");
      await expect(p).toHaveLength(1);
      await expect(p[0]).toHaveTextContent("Overview panel");
    });

    // End jumps focus to the last tab, Home back to the first.
    await userEvent.keyboard("{End}");
    await expect(settingsTab).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(settingsTab).toHaveAttribute("aria-selected", "true");
    await waitFor(async () => {
      const p = canvas.getAllByRole("tabpanel");
      await expect(p).toHaveLength(1);
      await expect(p[0]).toHaveTextContent("Settings panel");
    });

    await userEvent.keyboard("{Home}");
    await expect(overviewTab).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    await waitFor(async () => {
      const p = canvas.getAllByRole("tabpanel");
      await expect(p).toHaveLength(1);
      await expect(p[0]).toHaveTextContent("Overview panel");
    });
  },
};
