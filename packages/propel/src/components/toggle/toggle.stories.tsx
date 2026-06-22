import type { Meta, StoryObj } from "@storybook/react-vite";
import { Star } from "lucide-react";
import { expect } from "storybook/test";

import { Toggle } from "./index";

// Components-tier story: the ready-made `Toggle` (a 1:1 re-export of the ui primitive) —
// a two-state icon button. The UI-tier story documents the same primitive's parts and
// magnitudes.
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
      <Star aria-hidden className="size-(--node-size)" />
    </Toggle>
  ),
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Favorite" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
  },
};

/** Start pressed via `defaultPressed`; disabled does not toggle. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle magnitude="md" aria-label="Off">
        <Star aria-hidden className="size-(--node-size)" />
      </Toggle>
      <Toggle magnitude="md" defaultPressed aria-label="On">
        <Star aria-hidden className="size-(--node-size)" />
      </Toggle>
      <Toggle magnitude="md" disabled aria-label="Disabled">
        <Star aria-hidden className="size-(--node-size)" />
      </Toggle>
    </div>
  ),
};
