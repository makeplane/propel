import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Field } from "../field/index";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "./index";

const meta = {
  title: "Components/Slider",
  component: Slider,
  subcomponents: {
    SliderLabel,
    SliderValue,
    SliderControl,
    SliderTrack,
    SliderIndicator,
    SliderThumb,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Slider labels its value and thumbs while using Field.Root for form naming. */
export const Default: Story = {
  args: {
    defaultValue: [0.2, 0.8],
    min: 0,
    max: 1,
    step: 0.01,
    format: { style: "percent", maximumFractionDigits: 0 },
  },
  render: (args) => (
    <Field name="scalingThreshold">
      <Slider {...args}>
        <SliderLabel>Scaling threshold</SliderLabel>
        <SliderValue />
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb index={0} aria-label="Minimum threshold" />
            <SliderThumb index={1} aria-label="Maximum threshold" />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </Field>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Minimum threshold" })).toBeInTheDocument();
    await expect(canvas.getByRole("slider", { name: "Maximum threshold" })).toBeInTheDocument();
  },
};
