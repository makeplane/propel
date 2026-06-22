import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Progress,
  ProgressCircle,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "./index";

// UI-tier story: composes the ATOMIC progress parts. `Progress` (Base UI `Progress.Root`)
// owns the `progressbar` value model; `ProgressTrack` › `ProgressIndicator` paint the bar,
// `ProgressLabel`/`ProgressValue` the accessible name + trailing text. `ProgressCircle` is
// the atomic determinate ring. The ready-made linear+circular `Progress` (magnitude, the
// trailing `%`) lives in `components/progress`.
const meta = {
  title: "UI/Progress",
  component: Progress,
  subcomponents: { ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue, ProgressCircle },
  // The render fns assemble their own atoms; these satisfy the Root's value-model props.
  args: { value: 32, "aria-label": "Progress" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Assemble the linear bar from atoms: Root (`layout="linear"`) › Label + Track › Indicator, plus
 * the trailing Value. The Root requires an accessible name — here the visible `ProgressLabel`
 * supplies it.
 */
export const Default: Story = {
  render: () => (
    <Progress layout="linear" value={32}>
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressTrack magnitude="md">
        <ProgressIndicator />
      </ProgressTrack>
      <ProgressValue>{(_, value) => (value == null ? "" : `${Math.round(value)}%`)}</ProgressValue>
    </Progress>
  ),
  play: async ({ canvas }) => {
    const bar = canvas.getByRole("progressbar", { name: "Upload progress" });
    await expect(bar).toHaveAttribute("aria-valuenow", "32");
    await expect(canvas.getByText("32%")).toBeInTheDocument();
  },
};

/**
 * The atomic determinate ring — a styled `Progress.Root` wrapping an SVG. It owns its own
 * `progressbar` role; pass `aria-label` for the accessible name and `magnitude` for the diameter
 * (`sm` 16px / `md` 20px).
 */
export const Circle: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ProgressCircle value={32} magnitude="sm" aria-label="Small sync progress" />
      <ProgressCircle value={64} magnitude="md" aria-label="Medium sync progress" />
    </div>
  ),
};
