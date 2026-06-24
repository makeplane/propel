import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Slider,
  SliderControl,
  SliderHeader,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "./index";

// UI-tier story: composes the atomic slider parts (root + label + value + control +
// track + indicator + thumb). This is where you wire up multiple thumbs or a custom
// layout. The components-tier story shows the ready-made single-thumb `Slider`.
const meta = {
  title: "UI/Slider",
  component: Slider,
  subcomponents: {
    SliderHeader,
    SliderLabel,
    SliderValue,
    SliderControl,
    SliderTrack,
    SliderIndicator,
    SliderThumb,
  },
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

/** A single-thumb slider assembled from the raw parts. */
export const Default: Story = {
  args: { defaultValue: 40, min: 0, max: 100, step: 1 },
  render: (args) => (
    <Slider {...args}>
      <SliderHeader>
        <SliderLabel>Volume</SliderLabel>
        <SliderValue />
      </SliderHeader>
      <SliderControl magnitude="md">
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb magnitude="md" aria-label="Volume" />
        </SliderTrack>
      </SliderControl>
    </Slider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
  },
};

/** A range slider: two thumbs share one track. */
export const Range: Story = {
  args: {
    defaultValue: [0.2, 0.8],
    min: 0,
    max: 1,
    step: 0.01,
    format: { style: "percent", maximumFractionDigits: 0 },
  },
  render: (args) => (
    <Slider {...args}>
      <SliderHeader>
        <SliderLabel>Scaling threshold</SliderLabel>
        <SliderValue />
      </SliderHeader>
      <SliderControl magnitude="md">
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb magnitude="md" index={0} aria-label="Minimum threshold" />
          <SliderThumb magnitude="md" index={1} aria-label="Maximum threshold" />
        </SliderTrack>
      </SliderControl>
    </Slider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Minimum threshold" })).toBeInTheDocument();
    await expect(canvas.getByRole("slider", { name: "Maximum threshold" })).toBeInTheDocument();
  },
};
