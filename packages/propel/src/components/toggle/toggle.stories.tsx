import type { Meta, StoryObj } from "@storybook/react-vite";
import { Star } from "lucide-react";
import { expect } from "storybook/test";

import { Toggle, type ToggleMagnitude } from "./index";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

// Components-tier story: the ready-made `Toggle` (a 1:1 re-export of the elements primitive) —
// a two-state icon button that wraps its bare svg child in the shared glyph slot. The elements-tier story documents
// the same parts and magnitudes.
const meta = {
  title: "Components/Toggle",
  component: Toggle,
  args: { magnitude: "md", "aria-label": "Favorite" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A toggle wrapping an icon; click flips pressed. */
export const Default: Story = {
  args: { magnitude: "md" },
  render: (args) => (
    <Toggle {...args}>
      <Star />
    </Toggle>
  ),
};

/**
 * Interaction test: clicking the toggle flips `aria-pressed`. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the pressed state flip on its own.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Favorite" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
  },
};

/** Every size side by side; each magnitude also scales the glyph via `--node-size`. */
export const Magnitudes: Story = {
  // Iterates `magnitude` and gives each toggle its own accessible name, so disable just
  // those two controls; the rest stay live and update every toggle at once.
  argTypes: { magnitude: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Toggle
          key={magnitude}
          {...args}
          magnitude={magnitude}
          aria-label={`Favorite (${magnitude})`}
        >
          <Star />
        </Toggle>
      ))}
    </div>
  ),
};

/** Start pressed via `defaultPressed`; disabled does not toggle. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle magnitude="md" aria-label="Off">
        <Star />
      </Toggle>
      <Toggle magnitude="md" defaultPressed aria-label="On">
        <Star />
      </Toggle>
      <Toggle magnitude="md" disabled aria-label="Disabled">
        <Star />
      </Toggle>
    </div>
  ),
};
