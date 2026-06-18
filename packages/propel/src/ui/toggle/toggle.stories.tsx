import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold } from "lucide-react";
import { expect } from "storybook/test";

import { Toggle, type ToggleMagnitude } from "./index";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

// UI-tier story: the atomic `Toggle` — a two-state icon button (Base UI `Toggle`),
// reflecting `[data-pressed]`/`[data-disabled]`. The components-tier story re-exports
// the same primitive (no extra composition). `magnitude` is the only visual axis.
const meta = {
  title: "UI/Toggle",
  component: Toggle,
  args: { magnitude: "md", "aria-label": "Bold" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single toggle wrapping an icon; click flips pressed. */
export const Default: Story = {
  args: { magnitude: "md" },
  render: (args) => (
    <Toggle {...args}>
      <Bold aria-hidden className="size-(--node-size)" />
    </Toggle>
  ),
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Bold" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};

/** The three sizes side by side. */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex items-center gap-2">
      {MAGNITUDES.map((magnitude) => (
        <Toggle key={magnitude} magnitude={magnitude} aria-label={`Bold ${magnitude}`}>
          <Bold aria-hidden className="size-(--node-size)" />
        </Toggle>
      ))}
    </div>
  ),
};
