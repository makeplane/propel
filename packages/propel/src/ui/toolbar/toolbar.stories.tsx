import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Image,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";
import { expect } from "storybook/test";

import {
  Toolbar,
  ToolbarButton,
  ToolbarDropdownTriggerSurface,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
  ToolbarToggleGroup,
} from "./index";

// UI-tier story: composes the ATOMIC toolbar parts (each renders a single control).
// The components-tier `Toolbar` story shows the ready-made `ToolbarDropdown` (which composes
// propel's Dropdown/Menu). Here you assemble the raw controls — buttons, toggles, toggle groups,
// separators — plus the bare `ToolbarDropdownTriggerSurface` chrome (without an attached menu).
const meta = {
  title: "UI/Toolbar",
  component: Toolbar,
  subcomponents: {
    ToolbarGroup,
    ToolbarButton,
    ToolbarToggle,
    ToolbarToggleGroup,
    ToolbarSeparator,
    ToolbarDropdownTriggerSurface,
  },
  args: { elevation: "raised", density: "compact" },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A formatting bar assembled from raw parts: a dropdown-trigger surface, an inline B/I/U/S toggle
 * group cluster, an exclusive alignment toggle-group, and link/image action buttons.
 */
export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarDropdownTriggerSurface aria-label="Text style">Text</ToolbarDropdownTriggerSurface>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold">
          <Bold aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Italic">
          <Italic aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Underline">
          <Underline aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Strikethrough">
          <Strikethrough aria-hidden />
        </ToolbarToggle>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup aria-label="Text alignment" defaultValue={["left"]}>
        <ToolbarToggle value="left" aria-label="Align left">
          <AlignLeft aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle value="center" aria-label="Align center">
          <AlignCenter aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle value="right" aria-label="Align right">
          <AlignRight aria-hidden />
        </ToolbarToggle>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link">
        <Link aria-hidden />
      </ToolbarButton>
      <ToolbarButton aria-label="Insert image">
        <Image aria-hidden />
      </ToolbarButton>
    </Toolbar>
  ),
  play: async ({ canvas, userEvent }) => {
    // The root carries the toolbar role, and a toggle flips its pressed state on click.
    await expect(canvas.getByRole("toolbar")).toBeInTheDocument();
    const bold = canvas.getByRole("button", { name: "Bold" });
    await expect(bold).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(bold);
    await expect(bold).toHaveAttribute("aria-pressed", "true");
  },
};

/**
 * The `elevation` axis: `raised` draws its own card (border + shadow); `flat` draws no surface and
 * sits flush inside an existing bar.
 */
export const Elevations: Story = {
  argTypes: { elevation: { control: false } },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {(["raised", "flat"] as const).map((elevation) => (
        <Toolbar {...args} key={elevation} elevation={elevation}>
          <ToolbarToggle aria-label="Bold">
            <Bold aria-hidden />
          </ToolbarToggle>
          <ToolbarToggle aria-label="Italic">
            <Italic aria-hidden />
          </ToolbarToggle>
          <ToolbarSeparator />
          <ToolbarButton aria-label="Insert link">
            <Link aria-hidden />
          </ToolbarButton>
        </Toolbar>
      ))}
    </div>
  ),
};

/**
 * The `density` axis: `compact` packs the controls to 24px hit targets, `comfortable` gives them
 * 28px. `density` drives the child controls' size through context.
 */
export const Densities: Story = {
  argTypes: { density: { control: false } },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {(["compact", "comfortable"] as const).map((density) => (
        <Toolbar {...args} key={density} density={density}>
          <ToolbarToggle aria-label="Bold">
            <Bold aria-hidden />
          </ToolbarToggle>
          <ToolbarToggle aria-label="Italic">
            <Italic aria-hidden />
          </ToolbarToggle>
          <ToolbarSeparator />
          <ToolbarButton aria-label="Insert link">
            <Link aria-hidden />
          </ToolbarButton>
        </Toolbar>
      ))}
    </div>
  ),
};
