import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Meter, MeterHeader, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// `Meter` behavior grafts them via `render` (behavior part outer, styled part as render target).
// The Root/Label/Value/Track/Indicator behavior comes straight from `@base-ui/react/meter` here.
// The components-tier `Meter` story uses the ready-made `<Meter value label />`, which composes
// these parts for you.
const meta = {
  title: "Elements/Meter",
  component: Meter,
  subcomponents: { MeterHeader, MeterLabel, MeterTrack, MeterIndicator, MeterValue },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the parts: Root › (Header › Label + Value) + (Track › Indicator). */
export const Default: Story = {
  render: () => (
    <BaseMeter.Root value={64} render={<Meter />}>
      <MeterHeader>
        <BaseMeter.Label render={<MeterLabel />}>Disk usage</BaseMeter.Label>
        <BaseMeter.Value render={<MeterValue />} />
      </MeterHeader>
      <BaseMeter.Track render={<MeterTrack />}>
        <BaseMeter.Indicator render={<MeterIndicator level="medium" />} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  ),
};

/** Several fill levels, each labelled. */
export const Levels: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {[15, 50, 90].map((value) => (
        <BaseMeter.Root key={value} value={value} render={<Meter />}>
          <MeterHeader>
            <BaseMeter.Label render={<MeterLabel />}>Storage</BaseMeter.Label>
            <BaseMeter.Value render={<MeterValue />} />
          </MeterHeader>
          <BaseMeter.Track render={<MeterTrack />}>
            <BaseMeter.Indicator render={<MeterIndicator level="medium" />} />
          </BaseMeter.Track>
        </BaseMeter.Root>
      ))}
    </div>
  ),
};

/**
 * Behavior: Base UI's `Meter.Root` exposes `role="meter"` with the current value via
 * `aria-valuenow`. Tagged out of the sidebar/docs/manifest but still runs under `test`.
 */
export const HasMeterRole: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseMeter.Root value={42} aria-label="Quota" render={<Meter />}>
      <MeterHeader>
        <BaseMeter.Value render={<MeterValue />} />
      </MeterHeader>
      <BaseMeter.Track render={<MeterTrack />}>
        <BaseMeter.Indicator render={<MeterIndicator level="medium" />} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  ),
  play: async ({ canvas }) => {
    const meter = canvas.getByRole("meter", { name: "Quota" });
    await expect(meter).toHaveAttribute("aria-valuenow", "42");
  },
};
