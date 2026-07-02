import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Slider, type SliderMagnitude } from "./index";

const MAGNITUDES: SliderMagnitude[] = ["sm", "md", "lg"];

// Components-tier story: the ready-made single-thumb `Slider`. It composes the
// `elements/slider` parts (label + value + control + track + indicator + thumb) for you —
// pass `label` (or `aria-label`), `min`/`max`/`step`, and an optional `format`. The
// elements-tier story shows how to assemble the parts (e.g. a two-thumb range).
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

/** All thumb sizes: `sm` (12 px), `md` (16 px), `lg` (20 px). The track bar height never changes. */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each slider with the magnitude name, so disable just
  // those two controls; the rest stay live and update every slider at once.
  argTypes: { magnitude: { control: false }, label: { control: false } },
  args: { magnitude: "md", defaultValue: 40, min: 0, max: 100, step: 1 },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {MAGNITUDES.map((magnitude) => (
        <Slider key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  ),
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
