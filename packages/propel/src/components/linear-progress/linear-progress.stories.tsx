import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  LinearProgressIndicator,
  LinearProgressTrack,
  LinearProgressValue,
} from "../../elements/linear-progress";
import { LinearProgress, type LinearProgressMagnitude, type LinearProgressTone } from "./index";

const MAGNITUDES: LinearProgressMagnitude[] = ["sm", "md"];
const TONES: LinearProgressTone[] = ["brand", "success", "warning", "danger"];

const meta = {
  title: "Components/LinearProgress",
  component: LinearProgress,
  subcomponents: { LinearProgressTrack, LinearProgressIndicator, LinearProgressValue },
  args: { value: 60, magnitude: "md", tone: "brand", "aria-label": "Upload progress" },
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `tone` encodes signal: `brand` accent, `success`/`warning`/`danger` outcome. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-64 flex-col gap-3">
      {TONES.map((tone) => (
        <LinearProgress key={tone} {...args} tone={tone} aria-label={`${tone} progress`} />
      ))}
    </div>
  ),
};

/** Track thickness: `sm` 5px / `md` 8px. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-64 flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <LinearProgress
          key={magnitude}
          {...args}
          magnitude={magnitude}
          aria-label={`${magnitude} bar`}
        />
      ))}
    </div>
  ),
};

/** `value={null}` is indeterminate: an animated fill with no `aria-valuenow`. */
export const Indeterminate: Story = { args: { value: null, showValue: false } };

/** It exposes the `progressbar` role and reflects the value as `aria-valuenow`. */
export const HasProgressbarRole: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { value: 42, "aria-label": "Loading" },
  play: async ({ canvas }) => {
    const bar = canvas.getByRole("progressbar", { name: "Loading" });
    await expect(bar).toHaveAttribute("aria-valuenow", "42");
  },
};
