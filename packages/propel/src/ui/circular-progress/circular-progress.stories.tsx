import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressSvg,
  CircularProgressTrack,
} from "./index";

// UI-tier parts of the determinate ring. The ready-made `CircularProgress` (Components/CircularProgress)
// composes these with the geometry math; here they are assembled by hand.
const meta = {
  title: "UI/CircularProgress",
  component: CircularProgress,
  subcomponents: { CircularProgressSvg, CircularProgressTrack, CircularProgressIndicator },
  args: { value: 60, "aria-label": "Progress", magnitude: "md" },
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CircularProgress {...args}>
      <CircularProgressSvg viewBox="0 0 20 20">
        <CircularProgressTrack cx={10} cy={10} r={8} strokeWidth={2} />
        <CircularProgressIndicator
          tone="brand"
          cx={10}
          cy={10}
          r={8}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 8}
          strokeDashoffset={2 * Math.PI * 8 * 0.4}
        />
      </CircularProgressSvg>
    </CircularProgress>
  ),
};
