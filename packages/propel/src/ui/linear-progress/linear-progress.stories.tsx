import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  LinearProgress,
  LinearProgressIndicator,
  LinearProgressLabel,
  LinearProgressTrack,
  LinearProgressValue,
} from "./index";

// UI-tier parts of the horizontal bar. The ready-made `LinearProgress` (Components/LinearProgress)
// composes these; here they are assembled by hand.
const meta = {
  title: "UI/LinearProgress",
  component: LinearProgress,
  subcomponents: {
    LinearProgressTrack,
    LinearProgressIndicator,
    LinearProgressValue,
    LinearProgressLabel,
  },
  // The render fns assemble their own atoms; these satisfy the Root's required value-model props.
  args: { value: 60, "aria-label": "Progress" },
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <LinearProgress {...args}>
        <LinearProgressTrack magnitude="md">
          <LinearProgressIndicator tone="brand" />
        </LinearProgressTrack>
        <LinearProgressValue>
          {(_, value) => (value == null ? "" : `${Math.round(value)}%`)}
        </LinearProgressValue>
      </LinearProgress>
    </div>
  ),
};
