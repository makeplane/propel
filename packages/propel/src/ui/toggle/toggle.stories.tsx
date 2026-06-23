import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold } from "lucide-react";
import { expect } from "storybook/test";

import { Toggle, ToggleIcon, type ToggleMagnitude } from "./index";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

// UI-tier story: the atomic `Toggle` — a two-state icon button (Base UI `Toggle`),
// reflecting `[data-pressed]`/`[data-disabled]` — with its `ToggleIcon` glyph slot
// (sizes a bare icon to the toggle's `--node-size`). The components-tier story re-exports
// the same parts (no extra composition). `magnitude` is the only visual axis.
const meta = {
  title: "UI/Toggle",
  component: Toggle,
  subcomponents: { ToggleIcon },
  args: { magnitude: "md", "aria-label": "Bold" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single toggle wrapping an icon; click flips pressed. */
export const Default: Story = {
  args: { magnitude: "md" },
  render: (args) => (
    <Toggle {...args}>
      <ToggleIcon>
        <Bold />
      </ToggleIcon>
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
          <ToggleIcon>
            <Bold />
          </ToggleIcon>
        </Toggle>
      ))}
    </div>
  ),
};
