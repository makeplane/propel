import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";

import { Button } from "../button";
import { Field } from "../field";
import { Form, FormActions, FormBody } from "../form";
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

/**
 * `thumbAlignment="edge"` keeps the whole thumb inside the control: at the extremes the thumb's
 * edge lines up with the track's edge instead of overhanging it by half the thumb width.
 */
export const EdgeAlignedThumb: Story = {
  args: {
    label: "Progress",
    magnitude: "md",
    defaultValue: 25,
    min: 0,
    max: 100,
    step: 1,
    thumbAlignment: "edge",
  },
};

/**
 * Interaction test: keyboard `End`/`Home` snap the value to the bounds (the readout follows) while
 * the edge-aligned thumb stays inside the track instead of overhanging it. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const EdgeAlignedThumbInteraction: Story = {
  ...EdgeAlignedThumb,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    const slider = canvas.getByRole("slider", { name: "Progress" });
    const thumb = canvasElement.querySelector("[data-index='0']");
    const track = thumb?.parentElement;
    if (thumb == null || track == null) {
      throw new Error("Expected the slider thumb and track elements to be rendered.");
    }

    await userEvent.tab();
    await expect(slider).toHaveFocus();

    // `End` snaps to the max; the thumb's far edge stays inside the track.
    await userEvent.keyboard("{End}");
    await expect(canvas.getByText("100")).toBeInTheDocument();
    await expect(thumb.getBoundingClientRect().right).toBeLessThanOrEqual(
      track.getBoundingClientRect().right + 1,
    );

    // `Home` snaps to the min; the thumb's near edge stays inside the track.
    await userEvent.keyboard("{Home}");
    await expect(canvas.getByText("0")).toBeInTheDocument();
    await expect(thumb.getBoundingClientRect().left).toBeGreaterThanOrEqual(
      track.getBoundingClientRect().left - 1,
    );
  },
};

/**
 * Form integration: wrap the slider in a `Field` with a `name` and Base UI wires the rest — the
 * field name flows onto the thumb's hidden input, its value serializes with the form, and `Form`'s
 * `onFormSubmit` receives the number under the field's `name`. Submit to see the captured value.
 */
export const FormIntegration: Story = {
  parameters: { controls: { disable: true } },
  args: { magnitude: "md" },
  render: function Render(args) {
    const [submitted, setSubmitted] = React.useState<{ volume: number } | null>(null);
    return (
      <div className="flex flex-col gap-3">
        <Form<{ volume: number }> onFormSubmit={(values) => setSubmitted(values)}>
          <FormBody layout="single">
            <Field name="volume">
              <Slider {...args} label="Volume" defaultValue={40} min={0} max={100} step={1} />
            </Field>
          </FormBody>
          <FormActions layout="inline">
            <Button
              sizing="hug"
              type="submit"
              prominence="primary"
              tone="neutral"
              magnitude="md"
              label="Save"
            />
          </FormActions>
        </Form>
        <output className="text-13 text-secondary">
          {submitted ? `Volume: ${submitted.volume}` : null}
        </output>
      </div>
    );
  },
};

/**
 * Interaction test: the `Field` name serializes the slider's value into `Form`'s `onFormSubmit` —
 * the default value first, then the keyboard-nudged value after resubmitting. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const FormIntegrationInteraction: Story = {
  ...FormIntegration,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const slider = canvas.getByRole("slider", { name: "Volume" });
    const save = canvas.getByRole("button", { name: "Save" });

    // Submitting with the default value serializes 40 under the field name.
    await userEvent.click(save);
    await expect(canvas.getByText("Volume: 40")).toBeInTheDocument();

    // Nudging the thumb with the keyboard and resubmitting serializes the new value.
    await userEvent.tab({ shift: true });
    await expect(slider).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.click(save);
    await expect(canvas.getByText("Volume: 41")).toBeInTheDocument();
  },
};
