import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CircularProgress,
  CircularProgressIndicator,
  type CircularProgressIndicatorProps,
  type CircularProgressProps,
  CircularProgressSvg,
  CircularProgressTrack,
} from "./index";

type CircularProgressMagnitude = NonNullable<CircularProgressProps["magnitude"]>;
type CircularProgressIndicatorTone = NonNullable<CircularProgressIndicatorProps["tone"]>;

const MAGNITUDES: CircularProgressMagnitude[] = ["sm", "md"];
const TONES: CircularProgressIndicatorTone[] = ["brand", "success", "warning", "danger"];

// Circle geometry per magnitude (mirrors the ready-made's Figma geometry): a 16px (sm) / 20px (md)
// box holding a 2px-stroke ring; centerline radius = (diameter - stroke) / 2 -> 6 (sm) / 8 (md).
const GEOMETRY: Record<CircularProgressMagnitude, { box: number; radius: number }> = {
  sm: { box: 16, radius: 6 },
  md: { box: 20, radius: 8 },
};
const STROKE = 2;

// elements-tier story (rule 2b): a pure UI-configuration showcase. The ring parts are
// Base-UI-agnostic styled elements rendered DIRECTLY — no Base UI graft — with the `progressbar`
// aria Base UI's `Progress.Root` would set (`role="progressbar"`, `aria-valuenow`/`-min`/`-max`,
// the accessible name) pinned statically on the ring box. The arc is pure SVG geometry
// (`strokeDasharray`/`strokeDashoffset`), so every visual state is a static configuration. The
// live value model is demonstrated AND tested in the ready-made CircularProgress
// (Components/CircularProgress), which composes these parts.
const meta = {
  title: "Elements/CircularProgress",
  component: CircularProgress,
  subcomponents: { CircularProgressSvg, CircularProgressTrack, CircularProgressIndicator },
  args: { magnitude: "md" },
  render: ({ magnitude, ...props }) => {
    const { box, radius } = GEOMETRY[magnitude];
    const circumference = 2 * Math.PI * radius;
    return (
      <CircularProgress
        {...props}
        magnitude={magnitude}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={60}
        aria-label="Sync progress"
      >
        <CircularProgressSvg viewBox={`0 0 ${box} ${box}`}>
          <CircularProgressTrack cx={box / 2} cy={box / 2} r={radius} strokeWidth={STROKE} />
          <CircularProgressIndicator
            tone="brand"
            cx={box / 2}
            cy={box / 2}
            r={radius}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.4}
          />
        </CircularProgressSvg>
      </CircularProgress>
    );
  },
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Arc color by signal: `brand` accent, `success`/`warning`/`danger` outcome. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: ({ magnitude }) => {
    const { box, radius } = GEOMETRY[magnitude];
    const circumference = 2 * Math.PI * radius;
    return (
      <div className="flex items-center gap-3">
        {TONES.map((tone) => (
          <CircularProgress
            key={tone}
            magnitude={magnitude}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={60}
            aria-label={`${tone} ring`}
          >
            <CircularProgressSvg viewBox={`0 0 ${box} ${box}`}>
              <CircularProgressTrack cx={box / 2} cy={box / 2} r={radius} strokeWidth={STROKE} />
              <CircularProgressIndicator
                tone={tone}
                cx={box / 2}
                cy={box / 2}
                r={radius}
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * 0.4}
              />
            </CircularProgressSvg>
          </CircularProgress>
        ))}
      </div>
    );
  },
};

/** Diameter: `sm` 16px / `md` 20px — the geometry attributes follow the box. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => {
        const { box, radius } = GEOMETRY[magnitude];
        const circumference = 2 * Math.PI * radius;
        return (
          <CircularProgress
            key={magnitude}
            magnitude={magnitude}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={60}
            aria-label={`${magnitude} ring`}
          >
            <CircularProgressSvg viewBox={`0 0 ${box} ${box}`}>
              <CircularProgressTrack cx={box / 2} cy={box / 2} r={radius} strokeWidth={STROKE} />
              <CircularProgressIndicator
                tone="brand"
                cx={box / 2}
                cy={box / 2}
                r={radius}
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * 0.4}
              />
            </CircularProgressSvg>
          </CircularProgress>
        );
      })}
    </div>
  ),
};

/**
 * The arc sweep is the value made visible: `strokeDashoffset = circumference × (1 − fraction)`,
 * pinned here at fixed fractions from empty to complete (the ready-made computes this from
 * `value`).
 */
export const Values: Story = {
  parameters: { controls: { disable: true } },
  render: ({ magnitude }) => {
    const { box, radius } = GEOMETRY[magnitude];
    const circumference = 2 * Math.PI * radius;
    return (
      <div className="flex items-center gap-3">
        {[0, 25, 50, 75, 100].map((value) => (
          <CircularProgress
            key={value}
            magnitude={magnitude}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-label={`${value}% ring`}
          >
            <CircularProgressSvg viewBox={`0 0 ${box} ${box}`}>
              <CircularProgressTrack cx={box / 2} cy={box / 2} r={radius} strokeWidth={STROKE} />
              <CircularProgressIndicator
                tone="brand"
                cx={box / 2}
                cy={box / 2}
                r={radius}
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - value / 100)}
              />
            </CircularProgressSvg>
          </CircularProgress>
        ))}
      </div>
    );
  },
};
