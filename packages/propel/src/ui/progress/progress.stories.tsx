import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Progress,
  ProgressCircle,
  ProgressCircleIndicator,
  ProgressCircleSvg,
  ProgressCircleTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "./index";

// UI-tier story: composes the ATOMIC progress parts. `Progress` (Base UI `Progress.Root`)
// owns the `progressbar` value model; `ProgressTrack` › `ProgressIndicator` paint the bar,
// `ProgressLabel`/`ProgressValue` the accessible name + trailing text. The circular ring is
// `ProgressCircle` › `ProgressCircleSvg` › `ProgressCircleTrack` + `ProgressCircleIndicator`.
// The ready-made linear+circular `Progress` (magnitude, the trailing `%`) lives in
// `components/progress`.
const meta = {
  title: "UI/Progress",
  component: Progress,
  subcomponents: {
    ProgressTrack,
    ProgressIndicator,
    ProgressLabel,
    ProgressValue,
    ProgressCircle,
    ProgressCircleSvg,
    ProgressCircleTrack,
    ProgressCircleIndicator,
  },
  // The render fns assemble their own atoms; these satisfy the Root's value-model props.
  // `layout` is required on the ui Progress; the renders pass it explicitly, this satisfies the
  // story arg type.
  args: { value: 32, "aria-label": "Progress", layout: "linear" },
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
        <ProgressIndicator tone="brand" />
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
 * Assemble the determinate ring from atoms: `ProgressCircle` (the styled `Progress.Root`) ›
 * `ProgressCircleSvg` › `ProgressCircleTrack` (the subtle full ring) + `ProgressCircleIndicator`
 * (the toned arc). The root owns the `progressbar` role; pass `aria-label` for the accessible name,
 * `magnitude` for the diameter, and `tone` for the arc fill color. Geometry (radius, dash offset)
 * is passed to the circles as SVG attributes.
 */
export const Circle: Story = {
  render: () => {
    const radius = 8;
    const circumference = 2 * Math.PI * radius;
    return (
      <ProgressCircle value={64} magnitude="md" aria-label="Sync progress">
        <ProgressCircleSvg viewBox="0 0 20 20">
          <ProgressCircleTrack cx={10} cy={10} r={radius} strokeWidth={2} />
          <ProgressCircleIndicator
            tone="brand"
            cx={10}
            cy={10}
            r={radius}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - 64 / 100)}
          />
        </ProgressCircleSvg>
      </ProgressCircle>
    );
  },
};
