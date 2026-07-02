import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  LinearProgress,
  LinearProgressIndicator,
  LinearProgressLabel,
  LinearProgressTrack,
  LinearProgressValue,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// `Progress` behavior parts graft them via `render`. The `progressbar` value model (`value`/`min`/
// `max`) lives on `BaseProgress.Root`, wired straight from `@base-ui/react` here.
const meta = {
  title: "Elements/LinearProgress",
  component: LinearProgress,
  subcomponents: {
    LinearProgressTrack,
    LinearProgressIndicator,
    LinearProgressValue,
    LinearProgressLabel,
  },
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <BaseProgress.Root value={60} aria-label="Progress" render={<LinearProgress />}>
        <BaseProgress.Track render={<LinearProgressTrack magnitude="md" />}>
          <BaseProgress.Indicator render={<LinearProgressIndicator tone="brand" />} />
        </BaseProgress.Track>
        <BaseProgress.Value render={<LinearProgressValue />}>
          {(_, value) => (value == null ? "" : `${Math.round(value)}%`)}
        </BaseProgress.Value>
      </BaseProgress.Root>
    </div>
  ),
};
