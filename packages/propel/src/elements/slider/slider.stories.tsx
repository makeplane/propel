import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { expect } from "storybook/test";

import {
  Slider,
  SliderControl,
  SliderHeader,
  SliderIndicator,
  SliderLabel,
  type SliderMagnitude,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "./index";

const MAGNITUDES: SliderMagnitude[] = ["sm", "md", "lg"];

// Value-derived inline geometry, exactly as Base UI's `Slider` computes it from `value`: the
// indicator spans from the start percent to the end percent of the track, and each thumb centers
// on its value percent. Geometry is not a variant — the showcase pins it statically through the
// part's own `render` capability, the same way Base UI's inline style lands on the rendered
// element.
const indicatorStyle = (startPercent: number, endPercent: number): React.CSSProperties => ({
  insetInlineStart: `${startPercent}%`,
  width: `${endPercent - startPercent}%`,
});

const thumbStyle = (percent: number): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  insetInlineStart: `${percent}%`,
  translate: "-50% -50%",
});

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI import, no graft — with the value-derived geometry Base UI's `Slider`
// would compute (indicator start/width, thumb center position) pinned statically, and the
// disabled state pinned via `data-disabled` (which Base UI mirrors onto every part; the thumb's
// cva is what reads it). The `slider` role, keyboard, and form behavior live on the hidden input
// Base UI renders inside the thumb — demonstrated AND tested in the ready-made
// (Components/Slider), which composes these parts. This tier is also where a custom layout like a
// two-thumb range is assembled.
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

/**
 * The full anatomy pinned at 40/100: the header row holds the label (inline-start) and the
 * `<output>` readout (inline-end); the control row holds the thin track, its filled indicator, and
 * the thumb centered on the value percent.
 */
export const Default: Story = {
  render: () => (
    <Slider>
      <SliderHeader>
        <SliderLabel>Volume</SliderLabel>
        <SliderValue>40</SliderValue>
      </SliderHeader>
      <SliderControl magnitude="md">
        <SliderTrack>
          <SliderIndicator render={<div style={indicatorStyle(0, 40)} />} />
          <SliderThumb magnitude="md" render={<div style={thumbStyle(40)} />} />
        </SliderTrack>
      </SliderControl>
    </Slider>
  ),
};

/**
 * All thumb sizes: `sm` (12 px), `md` (16 px), `lg` (20 px). `magnitude` sizes the thumb and the
 * control's hit-area together; the track bar height never changes.
 */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {MAGNITUDES.map((magnitude) => (
        <Slider key={magnitude}>
          <SliderHeader>
            <SliderLabel>{magnitude}</SliderLabel>
            <SliderValue>40</SliderValue>
          </SliderHeader>
          <SliderControl magnitude={magnitude}>
            <SliderTrack>
              <SliderIndicator render={<div style={indicatorStyle(0, 40)} />} />
              <SliderThumb magnitude={magnitude} render={<div style={thumbStyle(40)} />} />
            </SliderTrack>
          </SliderControl>
        </Slider>
      ))}
    </div>
  ),
};

/**
 * A range layout: two thumbs share one track and the indicator spans between them (20%–80%) — the
 * geometry Base UI computes for a two-value `value`. Assembling multiple thumbs is exactly what
 * this tier's parts are for; the ready-made `Components/Slider` is single-thumb.
 */
export const Range: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Slider>
      <SliderHeader>
        <SliderLabel>Scaling threshold</SliderLabel>
        <SliderValue>20% – 80%</SliderValue>
      </SliderHeader>
      <SliderControl magnitude="md">
        <SliderTrack>
          <SliderIndicator render={<div style={indicatorStyle(20, 80)} />} />
          <SliderThumb magnitude="md" render={<div style={thumbStyle(20)} />} />
          <SliderThumb magnitude="md" render={<div style={thumbStyle(80)} />} />
        </SliderTrack>
      </SliderControl>
    </Slider>
  ),
};

/**
 * The disabled state, pinned via `data-disabled` — the attribute Base UI mirrors onto every part
 * when the root is disabled; the thumb's cva is what reads it (60% opacity + `not-allowed`
 * cursor).
 */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Slider data-disabled="">
      <SliderHeader>
        <SliderLabel>Volume</SliderLabel>
        <SliderValue>40</SliderValue>
      </SliderHeader>
      <SliderControl magnitude="md" data-disabled="">
        <SliderTrack data-disabled="">
          <SliderIndicator data-disabled="" render={<div style={indicatorStyle(0, 40)} />} />
          <SliderThumb magnitude="md" data-disabled="" render={<div style={thumbStyle(40)} />} />
        </SliderTrack>
      </SliderControl>
    </Slider>
  ),
};

/**
 * Hidden CSS canary (the allowed rule-2b play): asserts the pinned configurations compile to real
 * styling — `magnitude` scales the thumb (`sm` < `md` < `lg`), the indicator's fill resolves to a
 * color distinct from the track's, the pinned 40% geometry occupies 40% of the track, and
 * `data-disabled` dims the thumb to 60% opacity. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const StatesCssCanary: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex flex-col gap-6">
      <Slider>
        <SliderControl magnitude="md">
          <SliderTrack data-testid="canary-track">
            <SliderIndicator
              data-testid="canary-indicator"
              render={<div style={indicatorStyle(0, 40)} />}
            />
            <SliderThumb
              magnitude="md"
              data-testid="canary-thumb-md"
              render={<div style={thumbStyle(40)} />}
            />
          </SliderTrack>
        </SliderControl>
      </Slider>
      <Slider>
        <SliderControl magnitude="sm">
          <SliderTrack>
            <SliderThumb
              magnitude="sm"
              data-testid="canary-thumb-sm"
              render={<div style={thumbStyle(40)} />}
            />
          </SliderTrack>
        </SliderControl>
      </Slider>
      <Slider>
        <SliderControl magnitude="lg">
          <SliderTrack>
            <SliderThumb
              magnitude="lg"
              data-testid="canary-thumb-lg"
              render={<div style={thumbStyle(40)} />}
            />
          </SliderTrack>
        </SliderControl>
      </Slider>
      <Slider data-disabled="">
        <SliderControl magnitude="md" data-disabled="">
          <SliderTrack data-disabled="">
            <SliderThumb
              magnitude="md"
              data-disabled=""
              data-testid="canary-thumb-disabled"
              render={<div style={thumbStyle(40)} />}
            />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  ),
  play: async ({ canvas }) => {
    const track = canvas.getByTestId("canary-track");
    const indicator = canvas.getByTestId("canary-indicator");
    const smThumb = canvas.getByTestId("canary-thumb-sm");
    const mdThumb = canvas.getByTestId("canary-thumb-md");
    const lgThumb = canvas.getByTestId("canary-thumb-lg");
    const disabledThumb = canvas.getByTestId("canary-thumb-disabled");

    // `magnitude` compiles to a real thumb-size scale (`sm` 12px < `md` 16px < `lg` 20px).
    const widthOf = (element: HTMLElement) => element.getBoundingClientRect().width;
    await expect(widthOf(smThumb)).toBeLessThan(widthOf(mdThumb));
    await expect(widthOf(mdThumb)).toBeLessThan(widthOf(lgThumb));

    // The indicator's fill resolves to a color distinct from the track it sits on.
    await expect(getComputedStyle(indicator).backgroundColor).not.toBe(
      getComputedStyle(track).backgroundColor,
    );

    // The pinned `width: 40%` geometry occupies 40% of the track.
    await expect(
      indicator.getBoundingClientRect().width / track.getBoundingClientRect().width,
    ).toBeCloseTo(0.4, 2);

    // `data-disabled` dims the thumb to 60% opacity.
    await expect(getComputedStyle(disabledThumb).opacity).toBe("0.6");
  },
};
