import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Slider } from "./index";

// Components-tier story: the ready-made single-thumb `Slider`. It composes the
// `ui/slider` parts (label + value + control + track + indicator + thumb) for you —
// pass `label` (or `aria-label`), `min`/`max`/`step`, and an optional `format`. The
// UI-tier story shows how to assemble the parts (e.g. a two-thumb range).
const meta = {
  title: "Components/Slider",
  component: Slider,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A labelled single-thumb slider. */
export const Default: Story = {
  args: { label: "Volume", magnitude: "md", defaultValue: 40, min: 0, max: 100, step: 1 },
};

/**
 * Interaction test: the labelled thumb is reachable by its accessible name. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
  },
};

/** `format` (Intl options) controls the readout — here a percentage. */
export const Percentage: Story = {
  args: {
    label: "Opacity",
    magnitude: "md",
    defaultValue: 0.6,
    min: 0,
    max: 1,
    step: 0.01,
    format: { style: "percent", maximumFractionDigits: 0 },
  },
};

/**
 * Interaction test: the percentage-formatted thumb is reachable by its accessible name. Tagged out
 * of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const PercentageInteraction: Story = {
  ...Percentage,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Opacity" })).toBeInTheDocument();
  },
};

/** Without a visible `label`, name the thumb with `aria-label`. */
export const WithoutLabel: Story = {
  parameters: { controls: { disable: true } },
  args: {
    "aria-label": "Brightness",
    magnitude: "md",
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
};

/**
 * Interaction test: the `aria-label`-named thumb is reachable by its accessible name. Tagged out of
 * the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const WithoutLabelInteraction: Story = {
  ...WithoutLabel,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Brightness" })).toBeInTheDocument();
  },
};
