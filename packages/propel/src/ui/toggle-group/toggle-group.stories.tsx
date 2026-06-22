import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { expect, fn } from "storybook/test";

import { Toggle } from "../toggle/index";
import { ToggleGroup } from "./index";

// UI-tier story: composes the atomic `ToggleGroup` with atomic `Toggle` items. The group
// manages single/multi-select state + roving focus and sizes every toggle via its
// `magnitude` (each `Toggle` inherits it through context). The components-tier story uses
// the ready-made re-exports.
const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  subcomponents: { Toggle },
  args: { magnitude: "md" },
  parameters: {
    a11y: {
      // Base UI's ToggleGroup renders `role="group"` with `aria-orientation`, which axe's
      // aria-allowed-attr flags because `aria-orientation` isn't in the allowed attribute
      // set for `role="group"`. This is Base UI's intended roving-focus markup, not invalid
      // intent, so suppress just this rule (mirrors the menu.stories aria-required-children
      // precedent).
      config: { rules: [{ id: "aria-allowed-attr", enabled: false }] },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single-select group of three alignment toggles. */
export const Default: Story = {
  args: { magnitude: "md", defaultValue: ["left"], onValueChange: fn() },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Text alignment">
      <Toggle value="left" aria-label="Align left">
        <AlignLeft aria-hidden className="size-(--node-size)" />
      </Toggle>
      <Toggle value="center" aria-label="Align center">
        <AlignCenter aria-hidden className="size-(--node-size)" />
      </Toggle>
      <Toggle value="right" aria-label="Align right">
        <AlignRight aria-hidden className="size-(--node-size)" />
      </Toggle>
    </ToggleGroup>
  ),
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
  args: { magnitude: "md", multiple: true, defaultValue: [] },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Text formatting">
      <Toggle value="bold" aria-label="Bold">
        <AlignLeft aria-hidden className="size-(--node-size)" />
      </Toggle>
      <Toggle value="italic" aria-label="Italic">
        <AlignCenter aria-hidden className="size-(--node-size)" />
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
