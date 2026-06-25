import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Progress,
  ProgressCircle,
  ProgressCircleIndicator,
  ProgressCircleSvg,
  ProgressCircleTrack,
  ProgressIndicator,
  ProgressTrack,
  ProgressValue,
} from "./index";

// The lower-level progress parts. Most consumers want the ready-mades `LinearProgress` /
// `CircularProgress`; these stories show the parts composed by hand.
const meta = {
  title: "Components/Progress (parts)",
  component: Progress,
  // The render fns assemble their own atoms; these satisfy the Root's required value-model props.
  args: { value: 60, "aria-label": "Progress", layout: "linear" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The linear parts composed by hand into a determinate bar (prefer `LinearProgress`). */
export const LinearParts: Story = {
  render: () => (
    <div className="flex w-64 items-center gap-2">
      <Progress layout="linear" value={60} aria-label="Linear progress">
        <ProgressTrack magnitude="md">
          <ProgressIndicator tone="brand" />
        </ProgressTrack>
        <ProgressValue>
          {(_, value) => (value == null ? "" : `${Math.round(value)}%`)}
        </ProgressValue>
      </Progress>
    </div>
  ),
};

/** The circular parts composed by hand into a determinate ring (prefer `CircularProgress`). */
export const CircularParts: Story = {
  render: () => (
    <ProgressCircle value={60} magnitude="md" aria-label="Circular progress">
      <ProgressCircleSvg viewBox="0 0 20 20">
        <ProgressCircleTrack cx={10} cy={10} r={8} strokeWidth={2} />
        <ProgressCircleIndicator
          tone="brand"
          cx={10}
          cy={10}
          r={8}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 8}
          strokeDashoffset={2 * Math.PI * 8 * 0.4}
        />
      </ProgressCircleSvg>
    </ProgressCircle>
  ),
};
