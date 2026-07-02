import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressSvg,
  CircularProgressTrack,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// `Progress.Root` behavior (the `progressbar` role + `aria-valuenow`) grafts onto the styled ring
// box via `render`. The Root is behavior-only (it lives in `components`), so this in-tier story
// wires it straight from `@base-ui/react`.
const meta = {
  title: "Elements/CircularProgress",
  component: CircularProgressSvg,
  subcomponents: { CircularProgress, CircularProgressTrack, CircularProgressIndicator },
} satisfies Meta<typeof CircularProgressSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BaseProgress.Root
      value={60}
      aria-label="Progress"
      render={<CircularProgress magnitude="md" />}
    >
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
    </BaseProgress.Root>
  ),
};
