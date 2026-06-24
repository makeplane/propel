import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
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
  ToolbarMenuTriggerButton,
  ToolbarMenuTriggerIndicator,
  ToolbarMenuTriggerLabel,
  ToolbarGroup,
  ToolbarItemIcon,
  ToolbarSeparator,
  ToolbarToggle,
  ToolbarToggleGroup,
} from "./index";
import { ToolbarDensityContext } from "./toolbar-context";

// UI-tier story: composes the ATOMIC toolbar parts (each renders a single element). `Toolbar` is a
// single element; its `density` styles the row, and is wired to the controls inside via the
// `ToolbarDensityContext` provider explicitly here (the components-tier `Toolbar` does this for you
// via its ready-made). Every control's icon is its own `ToolbarItemIcon` slot.
const meta = {
  title: "UI/Toolbar",
  component: Toolbar,
  subcomponents: {
    ToolbarGroup,
    ToolbarButton,
    ToolbarItemIcon,
    ToolbarToggle,
    ToolbarToggleGroup,
    ToolbarSeparator,
    ToolbarMenuTriggerButton,
    ToolbarMenuTriggerLabel,
    ToolbarMenuTriggerIndicator,
  },
  args: { elevation: "raised", density: "compact" },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A formatting bar assembled from raw parts: a menu-trigger surface (label + caret), an inline
 * B/I/U/S toggle group cluster, an exclusive alignment toggle-group, and link/image action
 * buttons.
 */
export const Default: Story = {
  render: (args) => (
    <ToolbarDensityContext.Provider value={args.density}>
      <Toolbar {...args}>
        <ToolbarMenuTriggerButton aria-label="Text style">
          <ToolbarMenuTriggerLabel>Text</ToolbarMenuTriggerLabel>
          <ToolbarMenuTriggerIndicator>
            <ChevronDown />
          </ToolbarMenuTriggerIndicator>
        </ToolbarMenuTriggerButton>
        <ToolbarSeparator />
        <ToolbarGroup aria-label="Text formatting">
          <ToolbarToggle aria-label="Bold">
            <ToolbarItemIcon>
              <Bold />
            </ToolbarItemIcon>
          </ToolbarToggle>
          <ToolbarToggle aria-label="Italic">
            <ToolbarItemIcon>
              <Italic />
            </ToolbarItemIcon>
          </ToolbarToggle>
          <ToolbarToggle aria-label="Underline">
            <ToolbarItemIcon>
              <Underline />
            </ToolbarItemIcon>
          </ToolbarToggle>
          <ToolbarToggle aria-label="Strikethrough">
            <ToolbarItemIcon>
              <Strikethrough />
            </ToolbarItemIcon>
          </ToolbarToggle>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarToggleGroup aria-label="Text alignment" defaultValue={["left"]}>
          <ToolbarToggle value="left" aria-label="Align left">
            <ToolbarItemIcon>
              <AlignLeft />
            </ToolbarItemIcon>
          </ToolbarToggle>
          <ToolbarToggle value="center" aria-label="Align center">
            <ToolbarItemIcon>
              <AlignCenter />
            </ToolbarItemIcon>
          </ToolbarToggle>
          <ToolbarToggle value="right" aria-label="Align right">
            <ToolbarItemIcon>
              <AlignRight />
            </ToolbarItemIcon>
          </ToolbarToggle>
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Insert link">
          <ToolbarItemIcon>
            <Link />
          </ToolbarItemIcon>
        </ToolbarButton>
        <ToolbarButton aria-label="Insert image">
          <ToolbarItemIcon>
            <Image />
          </ToolbarItemIcon>
        </ToolbarButton>
      </Toolbar>
    </ToolbarDensityContext.Provider>
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
        <ToolbarDensityContext.Provider key={elevation} value={args.density}>
          <Toolbar {...args} elevation={elevation}>
            <ToolbarToggle aria-label="Bold">
              <ToolbarItemIcon>
                <Bold />
              </ToolbarItemIcon>
            </ToolbarToggle>
            <ToolbarToggle aria-label="Italic">
              <ToolbarItemIcon>
                <Italic />
              </ToolbarItemIcon>
            </ToolbarToggle>
            <ToolbarSeparator />
            <ToolbarButton aria-label="Insert link">
              <ToolbarItemIcon>
                <Link />
              </ToolbarItemIcon>
            </ToolbarButton>
          </Toolbar>
        </ToolbarDensityContext.Provider>
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
        <ToolbarDensityContext.Provider key={density} value={density}>
          <Toolbar {...args} density={density}>
            <ToolbarToggle aria-label="Bold">
              <ToolbarItemIcon>
                <Bold />
              </ToolbarItemIcon>
            </ToolbarToggle>
            <ToolbarToggle aria-label="Italic">
              <ToolbarItemIcon>
                <Italic />
              </ToolbarItemIcon>
            </ToolbarToggle>
            <ToolbarSeparator />
            <ToolbarButton aria-label="Insert link">
              <ToolbarItemIcon>
                <Link />
              </ToolbarItemIcon>
            </ToolbarButton>
          </Toolbar>
        </ToolbarDensityContext.Provider>
      ))}
    </div>
  ),
};
