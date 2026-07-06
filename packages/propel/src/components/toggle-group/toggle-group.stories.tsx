import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { expect, fn } from "storybook/test";

import { Icon } from "../icon";
import { Toggle, type ToggleMagnitude } from "../toggle/index";
import { ToggleGroup } from "./index";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

// Components-tier story: the ready-made `ToggleGroup` (a 1:1 re-export of the elements
// primitive) holding ready-made `Toggle` items. The group sizes each toggle via
// `magnitude` and tracks selection. The elements-tier story documents the same parts.
const meta = {
  title: "Components/ToggleGroup",
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

/** A single-select group; selecting one clears the other. */
export const Default: Story = {
  args: { magnitude: "md", defaultValue: ["bulleted"], onValueChange: fn() },
  render: (args) => (
    <ToggleGroup {...args} aria-label="List style">
      <Toggle value="bulleted" aria-label="Bulleted list" icon={<Icon icon={List} />} />
      <Toggle value="numbered" aria-label="Numbered list" icon={<Icon icon={ListOrdered} />} />
    </ToggleGroup>
  ),
};

/**
 * Interaction test: selecting one toggle clears the other and fires `onValueChange`. Tagged out of
 * the sidebar/docs/manifest while still running under the default `test` tag — so a browsing user
 * never sees the selection change on its own.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent, args }) => {
    const bulleted = canvas.getByRole("button", { name: "Bulleted list" });
    const numbered = canvas.getByRole("button", { name: "Numbered list" });
    await expect(bulleted).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(numbered);
    await expect(numbered).toHaveAttribute("aria-pressed", "true");
    await expect(bulleted).toHaveAttribute("aria-pressed", "false");
    await expect(args.onValueChange).toHaveBeenCalled();
  },
};

/**
 * Every size side by side — the group's `magnitude` sizes each `Toggle` inside via context, and
 * each magnitude also scales the `ToggleIcon` glyph via `--node-size`.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and gives each group its own accessible name, so disable just
  // that control; the rest stay live and update every group at once.
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-6">
      {MAGNITUDES.map((magnitude) => (
        <ToggleGroup
          key={magnitude}
          {...args}
          magnitude={magnitude}
          multiple
          defaultValue={["bold"]}
          aria-label={`Text formatting (${magnitude})`}
        >
          <Toggle value="bold" aria-label={`Bold (${magnitude})`} icon={<Icon icon={Bold} />} />
          <Toggle
            value="italic"
            aria-label={`Italic (${magnitude})`}
            icon={<Icon icon={Italic} />}
          />
          <Toggle
            value="underline"
            aria-label={`Underline (${magnitude})`}
            icon={<Icon icon={Underline} />}
          />
        </ToggleGroup>
      ))}
    </div>
  ),
};

/** `multiple` lets more than one toggle stay pressed at once. */
export const Multiple: Story = {
  args: { magnitude: "md", multiple: true, defaultValue: ["bold", "italic"] },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Text formatting">
      <Toggle value="bold" aria-label="Bold" icon={<Icon icon={Bold} />} />
      <Toggle value="italic" aria-label="Italic" icon={<Icon icon={Italic} />} />
      <Toggle value="underline" aria-label="Underline" icon={<Icon icon={Underline} />} />
    </ToggleGroup>
  ),
};

/**
 * Interaction test: in a `multiple` group, pressing another toggle keeps the current ones pressed.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const MultipleInteraction: Story = {
  ...Multiple,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const bold = canvas.getByRole("button", { name: "Bold" });
    const underline = canvas.getByRole("button", { name: "Underline" });
    await expect(bold).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(underline);
    await expect(underline).toHaveAttribute("aria-pressed", "true");
    await expect(bold).toHaveAttribute("aria-pressed", "true");
  },
};
