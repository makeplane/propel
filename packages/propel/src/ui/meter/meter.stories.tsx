import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "./index";

// UI-tier story: assembles the ATOMIC meter parts (`Meter` root + `MeterLabel` +
// `MeterTrack` › `MeterIndicator` + `MeterValue`). The components-tier `Meter` story
// uses the ready-made `<Meter value label />`, which composes these parts for you.
const meta = {
  title: "UI/Meter",
  component: Meter,
  subcomponents: { MeterLabel, MeterTrack, MeterIndicator, MeterValue },
  args: { value: 64 },
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

/** Assemble the parts: Root › Label + (Track › Indicator) + Value. */
export const Default: Story = {
  args: { value: 64 },
  render: (args) => (
    <Meter {...args}>
      <MeterLabel>Disk usage</MeterLabel>
      <MeterTrack>
        <MeterIndicator tone="medium" />
      </MeterTrack>
      <MeterValue />
    </Meter>
  ),
};

/** Several fill levels, each labelled. */
export const Levels: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {[15, 50, 90].map((value) => (
        <Meter key={value} value={value}>
          <MeterLabel>Storage</MeterLabel>
          <MeterTrack>
            <MeterIndicator tone="medium" />
          </MeterTrack>
          <MeterValue />
        </Meter>
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
    <Meter value={42} aria-label="Quota">
      <MeterTrack>
        <MeterIndicator tone="medium" />
      </MeterTrack>
      <MeterValue />
    </Meter>
  ),
  play: async ({ canvas }) => {
    const meter = canvas.getByRole("meter", { name: "Quota" });
    await expect(meter).toHaveAttribute("aria-valuenow", "42");
  },
};
