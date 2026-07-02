import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  Meter,
  MeterHeader,
  MeterIndicator,
  type MeterIndicatorLevel,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "./index";

const LEVELS: { level: MeterIndicatorLevel; value: number }[] = [
  { level: "low", value: 15 },
  { level: "medium", value: 50 },
  { level: "high", value: 90 },
];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts. The indicator's inline `width` stands in (via the part's `render`
// capability) for the one Base UI's `Meter.Indicator` computes from `value`; the `meter` role,
// `aria-valuenow`, and the value formatting come from Base UI's `Meter.Root`/`Meter.Value` in the
// components tier, where they are demonstrated AND tested (Components/Meter).
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

/**
 * The full anatomy assembled statically: `Meter` › (`MeterHeader` › `MeterLabel` + `MeterValue`) +
 * (`MeterTrack` › `MeterIndicator`). The indicator's `width` is pinned inline — standing in for the
 * value-derived width Base UI's `Meter.Indicator` sets — and the readout text is authored, standing
 * in for `Meter.Value`'s formatted output.
 */
export const Default: Story = {
  render: () => (
    <Meter>
      <MeterHeader>
        <MeterLabel>Disk usage</MeterLabel>
        <MeterValue>64%</MeterValue>
      </MeterHeader>
      <MeterTrack>
        <MeterIndicator level="medium" render={<div style={{ width: "64%" }} />} />
      </MeterTrack>
    </Meter>
  ),
};

/**
 * The indicator's `level` axis — the family's only variant axis, encoding the spec's color
 * breakpoints: `low` fills with the warning color, `medium` with the brand/accent color, and `high`
 * with the success color. The components-tier ready-made derives the level from
 * `low`/`high`/`optimum`; here each value is pinned directly, with a matching inline width.
 */
export const Levels: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {LEVELS.map(({ level, value }) => (
        <Meter key={level}>
          <MeterHeader>
            <MeterLabel>Storage ({level})</MeterLabel>
            <MeterValue>{value}%</MeterValue>
          </MeterHeader>
          <MeterTrack>
            <MeterIndicator
              id={`meter-indicator-${level}`}
              level={level}
              render={<div style={{ width: `${value}%` }} />}
            />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the `level` variant classes actually compiled — the three fills
 * compute three distinct background colors (warning · accent · success). Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const LevelsCanary: Story = {
  ...Levels,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const backgroundColor = (level: MeterIndicatorLevel) => {
      const indicator = canvasElement.querySelector(`#meter-indicator-${level}`);
      if (!(indicator instanceof HTMLElement)) throw new Error(`missing #meter-indicator-${level}`);
      return getComputedStyle(indicator).backgroundColor;
    };
    const colors = LEVELS.map(({ level }) => backgroundColor(level));
    await expect(new Set(colors).size).toBe(LEVELS.length);
  },
};
