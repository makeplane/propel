import { Slider as BaseSlider } from "@base-ui/react/slider";
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

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// `Slider` behavior parts graft them via `render`. This is where you wire up multiple thumbs or a
// custom layout. The components-tier story shows the ready-made single-thumb `Slider`.
const meta = {
  title: "Elements/Slider",
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
  render: () => (
    <BaseSlider.Root render={<Slider />} defaultValue={40} min={0} max={100} step={1}>
      <SliderHeader>
        <BaseSlider.Label render={<SliderLabel />}>Volume</BaseSlider.Label>
        <BaseSlider.Value render={<SliderValue />} />
      </SliderHeader>
      <BaseSlider.Control render={<SliderControl magnitude="md" />}>
        <BaseSlider.Track render={<SliderTrack />}>
          <BaseSlider.Indicator render={<SliderIndicator />} />
          <BaseSlider.Thumb render={<SliderThumb magnitude="md" />} aria-label="Volume" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  ),
};

/**
 * Interaction test: the single-thumb slider exposes its `slider` role. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
  },
};

/** A range slider: two thumbs share one track. */
export const Range: Story = {
  render: () => (
    <BaseSlider.Root
      render={<Slider />}
      defaultValue={[0.2, 0.8]}
      min={0}
      max={1}
      step={0.01}
      format={{ style: "percent", maximumFractionDigits: 0 }}
    >
      <SliderHeader>
        <BaseSlider.Label render={<SliderLabel />}>Scaling threshold</BaseSlider.Label>
        <BaseSlider.Value render={<SliderValue />} />
      </SliderHeader>
      <BaseSlider.Control render={<SliderControl magnitude="md" />}>
        <BaseSlider.Track render={<SliderTrack />}>
          <BaseSlider.Indicator render={<SliderIndicator />} />
          <BaseSlider.Thumb
            render={<SliderThumb magnitude="md" />}
            index={0}
            aria-label="Minimum threshold"
          />
          <BaseSlider.Thumb
            render={<SliderThumb magnitude="md" />}
            index={1}
            aria-label="Maximum threshold"
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  ),
};

/**
 * Interaction test: the range slider exposes both thumb `slider` roles. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const RangeInteraction: Story = {
  ...Range,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Minimum threshold" })).toBeInTheDocument();
    await expect(canvas.getByRole("slider", { name: "Maximum threshold" })).toBeInTheDocument();
  },
};
