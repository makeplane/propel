import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
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
  type ToolbarDensity,
  type ToolbarElevation,
  ToolbarGroup,
  ToolbarItemIcon,
  ToolbarMenuTriggerButton,
  ToolbarMenuTriggerIndicator,
  ToolbarMenuTriggerLabel,
  ToolbarSeparator,
  ToolbarToggleGroup,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// `Toolbar` behavior parts graft them via `render`. The Root is behavior-only (it lives in
// `components`), so this in-tier story wires it — plus `Toggle`/`ToggleGroup` — straight from
// `@base-ui/react`. Every control takes `density` explicitly; the ready-made `components/toolbar`
// sets it once and shares it via context.
const meta = {
  title: "Elements/Toolbar",
  component: ToolbarGroup,
  subcomponents: {
    Toolbar,
    ToolbarButton,
    ToolbarItemIcon,
    ToolbarToggleGroup,
    ToolbarSeparator,
    ToolbarMenuTriggerButton,
    ToolbarMenuTriggerLabel,
    ToolbarMenuTriggerIndicator,
  },
} satisfies Meta<typeof ToolbarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A formatting bar assembled from raw parts: a menu-trigger surface (label + caret), an inline
 * B/I/U/S toggle group cluster, an exclusive alignment toggle-group, and link/image action
 * buttons.
 */
function DemoToolbar({
  density,
  elevation,
}: {
  density: ToolbarDensity;
  elevation: ToolbarElevation;
}) {
  return (
    <BaseToolbar.Root render={<Toolbar density={density} elevation={elevation} />}>
      <BaseToolbar.Button
        render={<ToolbarMenuTriggerButton density={density} />}
        aria-label="Text style"
      >
        <ToolbarMenuTriggerLabel>Text</ToolbarMenuTriggerLabel>
        <ToolbarMenuTriggerIndicator>
          <ChevronDown />
        </ToolbarMenuTriggerIndicator>
      </BaseToolbar.Button>
      <BaseToolbar.Separator render={<ToolbarSeparator />} />
      <BaseToolbar.Group render={<ToolbarGroup />} aria-label="Text formatting">
        <BaseToolbar.Button
          render={<Toggle render={<ToolbarButton density={density} />} />}
          aria-label="Bold"
        >
          <ToolbarItemIcon>
            <Bold />
          </ToolbarItemIcon>
        </BaseToolbar.Button>
        <BaseToolbar.Button
          render={<Toggle render={<ToolbarButton density={density} />} />}
          aria-label="Italic"
        >
          <ToolbarItemIcon>
            <Italic />
          </ToolbarItemIcon>
        </BaseToolbar.Button>
        <BaseToolbar.Button
          render={<Toggle render={<ToolbarButton density={density} />} />}
          aria-label="Underline"
        >
          <ToolbarItemIcon>
            <Underline />
          </ToolbarItemIcon>
        </BaseToolbar.Button>
        <BaseToolbar.Button
          render={<Toggle render={<ToolbarButton density={density} />} />}
          aria-label="Strikethrough"
        >
          <ToolbarItemIcon>
            <Strikethrough />
          </ToolbarItemIcon>
        </BaseToolbar.Button>
      </BaseToolbar.Group>
      <BaseToolbar.Separator render={<ToolbarSeparator />} />
      <ToggleGroup
        render={<ToolbarToggleGroup />}
        defaultValue={["left"]}
        aria-label="Text alignment"
      >
        <BaseToolbar.Button
          render={<Toggle value="left" render={<ToolbarButton density={density} />} />}
          aria-label="Align left"
        >
          <ToolbarItemIcon>
            <AlignLeft />
          </ToolbarItemIcon>
        </BaseToolbar.Button>
        <BaseToolbar.Button
          render={<Toggle value="center" render={<ToolbarButton density={density} />} />}
          aria-label="Align center"
        >
          <ToolbarItemIcon>
            <AlignCenter />
          </ToolbarItemIcon>
        </BaseToolbar.Button>
        <BaseToolbar.Button
          render={<Toggle value="right" render={<ToolbarButton density={density} />} />}
          aria-label="Align right"
        >
          <ToolbarItemIcon>
            <AlignRight />
          </ToolbarItemIcon>
        </BaseToolbar.Button>
      </ToggleGroup>
      <BaseToolbar.Separator render={<ToolbarSeparator />} />
      <BaseToolbar.Button render={<ToolbarButton density={density} />} aria-label="Insert link">
        <ToolbarItemIcon>
          <Link />
        </ToolbarItemIcon>
      </BaseToolbar.Button>
      <BaseToolbar.Button render={<ToolbarButton density={density} />} aria-label="Insert image">
        <ToolbarItemIcon>
          <Image />
        </ToolbarItemIcon>
      </BaseToolbar.Button>
    </BaseToolbar.Root>
  );
}

/** The default: a `raised`, `compact` floater assembled from the raw styled parts. */
export const Default: Story = {
  render: () => <DemoToolbar density="compact" elevation="raised" />,
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
  render: () => (
    <div className="flex flex-col gap-6">
      {(["raised", "flat"] as const).map((elevation) => (
        <DemoToolbar key={elevation} density="compact" elevation={elevation} />
      ))}
    </div>
  ),
};

/**
 * The `density` axis: `compact` packs the controls to 24px hit targets, `comfortable` gives them
 * 28px.
 */
export const Densities: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["compact", "comfortable"] as const).map((density) => (
        <DemoToolbar key={density} density={density} elevation="raised" />
      ))}
    </div>
  ),
};
