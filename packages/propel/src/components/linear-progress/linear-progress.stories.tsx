import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, waitFor } from "storybook/test";

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
  // The bar has no intrinsic width (`w-full` root, `flex-1 min-w-0` track), so a bare render
  // collapses to 0px under the centered layout — give every story a real width to fill.
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
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

/**
 * Drive `value` from task state — an export advancing in deterministic 300 ms steps here. The fill,
 * the trailing `%`, and `aria-valuenow` follow each update, and the bar marks itself
 * `data-complete` when the value reaches `max`.
 */
export const SimulatedTask: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => {
    function ExportExample() {
      const [value, setValue] = React.useState(0);
      React.useEffect(() => {
        if (value >= 100) return;
        const timer = window.setTimeout(() => setValue((current) => current + 25), 300);
        return () => window.clearTimeout(timer);
      }, [value]);
      return <LinearProgress {...args} value={value} aria-label="Export progress" />;
    }
    return <ExportExample />;
  },
};

/** Hidden twin of `SimulatedTask`: the bar settles at 100% and reports completion. */
export const SimulatedTaskInteraction: Story = {
  ...SimulatedTask,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const bar = canvas.getByRole("progressbar", { name: "Export progress" });
    await waitFor(() => expect(bar).toHaveAttribute("aria-valuenow", "100"), { timeout: 3000 });
    await expect(bar).toHaveAttribute("data-complete");
  },
};

/** It exposes the `progressbar` role and reflects the value as `aria-valuenow`. */
export const HasProgressbarRole: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { value: 42, "aria-label": "Loading" },
  play: async ({ canvas }) => {
    const bar = canvas.getByRole("progressbar", { name: "Loading" });
    await expect(bar).toHaveAttribute("aria-valuenow", "42");
  },
};
