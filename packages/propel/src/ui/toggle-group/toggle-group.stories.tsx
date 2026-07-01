import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { expect, fn } from "storybook/test";

import { Toggle, ToggleIcon } from "../toggle/index";
import { ToggleGroup } from "./index";

// UI-tier story: the atomic `ToggleGroup` (single/multi-select state + roving focus) composed with
// atomic `Toggle` items. `ToggleGroup` is a single element; the shared-`magnitude` context is wired
// here explicitly (the components-tier `ToggleGroup` does this via its provider) so every `Toggle`
// inherits one size.
const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  subcomponents: { Toggle, ToggleIcon },
  parameters: {
    a11y: {
      // Base UI's ToggleGroup renders `role="group"` with `aria-orientation`, which axe's
      // aria-allowed-attr flags. This is Base UI's intended roving-focus markup, so suppress it.
      config: { rules: [{ id: "aria-allowed-attr", enabled: false }] },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single-select group of three alignment toggles. */
export const Default: Story = {
  args: { defaultValue: ["left"], onValueChange: fn() },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Text alignment">
      <Toggle magnitude="md" value="left" aria-label="Align left">
        <ToggleIcon>
          <AlignLeft />
        </ToggleIcon>
      </Toggle>
      <Toggle magnitude="md" value="center" aria-label="Align center">
        <ToggleIcon>
          <AlignCenter />
        </ToggleIcon>
      </Toggle>
      <Toggle magnitude="md" value="right" aria-label="Align right">
        <ToggleIcon>
          <AlignRight />
        </ToggleIcon>
      </Toggle>
    </ToggleGroup>
  ),
};

/**
 * Interaction test: selecting another toggle moves the pressed state and fires `onValueChange`.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent, args }) => {
    const left = canvas.getByRole("button", { name: "Align left" });
    const center = canvas.getByRole("button", { name: "Align center" });
    await expect(left).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(center);
    await expect(center).toHaveAttribute("aria-pressed", "true");
    await expect(left).toHaveAttribute("aria-pressed", "false");
    await expect(args.onValueChange).toHaveBeenCalled();
  },
};

/** `multiple` lets more than one toggle stay pressed. */
export const Multiple: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { multiple: true, defaultValue: [] },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Text formatting">
      <Toggle magnitude="md" value="bold" aria-label="Bold">
        <ToggleIcon>
          <AlignLeft />
        </ToggleIcon>
      </Toggle>
      <Toggle magnitude="md" value="italic" aria-label="Italic">
        <ToggleIcon>
          <AlignCenter />
        </ToggleIcon>
      </Toggle>
    </ToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const bold = canvas.getByRole("button", { name: "Bold" });
    const italic = canvas.getByRole("button", { name: "Italic" });
    await userEvent.click(bold);
    await userEvent.click(italic);
    await expect(bold).toHaveAttribute("aria-pressed", "true");
    await expect(italic).toHaveAttribute("aria-pressed", "true");
  },
};
