import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart, Star } from "lucide-react";
import * as React from "react";
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

/**
 * Controlled `pressed`/`onPressedChange`: the consumer owns the state and derives the glyph from it
 * — an outline heart when off, a filled heart once favorited.
 */
export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle magnitude="md" aria-label="Favorite" pressed={pressed} onPressedChange={setPressed}>
        <Heart fill={pressed ? "currentColor" : "none"} />
      </Toggle>
    );
  },
};

/**
 * Interaction test: the controlled round-trip — a click lifts state through `onPressedChange` and
 * flows back down through `pressed`, and the state-derived glyph fills in and empties again. Tagged
 * out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const ControlledInteraction: Story = {
  ...Controlled,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Favorite" });
    const glyph = () => toggle.querySelector("svg");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(glyph()).toHaveAttribute("fill", "none");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(glyph()).toHaveAttribute("fill", "currentColor");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(glyph()).toHaveAttribute("fill", "none");
  },
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
