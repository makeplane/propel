import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Meter } from "./index";

// Components-tier story: the ready-made `<Meter value label />`, which composes the
// `elements/meter` parts (root + label + track › indicator + value). The elements-tier story
// assembles those parts by hand.
const meta = {
  title: "Components/Meter",
  component: Meter,
  args: { value: 64, label: "Disk usage" },
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

/** Drive the gauge with `value`; the fill and the formatted readout follow. */
export const Default: Story = {};

/** Several fill levels of the ready-made meter. */
export const Levels: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {[15, 50, 90].map((value) => (
        <Meter key={value} value={value} label="Storage" />
      ))}
    </div>
  ),
};

/** `format` (an `Intl.NumberFormatOptions`) formats the readout — here as a percentage. */
export const Formatted: Story = {
  args: { value: 0.42, label: "Quota", format: { style: "percent" }, max: 1 },
  parameters: { controls: { disable: true } },
};

/**
 * `showValue={false}` hides the formatted value text — the gauge still announces its value to
 * assistive tech via `aria-valuenow` on the root.
 */
export const NoValue: Story = {
  args: { showValue: false },
  parameters: { controls: { disable: true } },
};

/**
 * `low`/`high`/`optimum` set the color breakpoints. Here the optimal range is at the high end
 * (`optimum` above `high`), so a value in the high segment fills with success green, while values
 * below `low` or between `low` and `high` fill with the warning color.
 */
export const Thresholds: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {/* Low segment → warning */}
      <Meter value={10} label="Low (warning)" low={25} high={75} optimum={90} />
      {/* Middle segment → warning (optimum is high) */}
      <Meter value={50} label="Middle (warning)" low={25} high={75} optimum={90} />
      {/* High segment → success */}
      <Meter value={90} label="High (success)" low={25} high={75} optimum={90} />
    </div>
  ),
};

/**
 * Behavior: the ready-made meter exposes `role="meter"` with the current value via `aria-valuenow`.
 * Tagged out of the sidebar/docs/manifest but still runs under `test`.
 */
export const HasMeterRole: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { value: 42, label: undefined, "aria-label": "Quota" },
  play: async ({ canvas }) => {
    const meter = canvas.getByRole("meter", { name: "Quota" });
    await expect(meter).toHaveAttribute("aria-valuenow", "42");
  },
};
