import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { expect } from "storybook/test";

import {
  LinearProgress,
  LinearProgressIndicator,
  type LinearProgressIndicatorProps,
  LinearProgressLabel,
  LinearProgressTrack,
  type LinearProgressTrackProps,
  LinearProgressValue,
} from "./index";

type LinearProgressTrackMagnitude = NonNullable<LinearProgressTrackProps["magnitude"]>;
type LinearProgressIndicatorTone = NonNullable<LinearProgressIndicatorProps["tone"]>;

const MAGNITUDES: LinearProgressTrackMagnitude[] = ["sm", "md"];
const TONES: LinearProgressIndicatorTone[] = ["brand", "success", "warning", "danger"];

// Determinate fill geometry, exactly as Base UI's `Progress.Indicator` computes it from `value`
// (`insetInlineStart: 0; height: inherit; width: <percent>%`). The fill width is value-derived
// inline geometry — not a variant — so the showcase pins it statically through the part's own
// `render` capability, the same way Base UI's inline style lands on the rendered element.
const fillStyle = (percent: number): React.CSSProperties => ({
  insetInlineStart: 0,
  height: "inherit",
  width: `${percent}%`,
});

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI import, no graft — with the `progressbar` semantics Base UI's `Progress`
// would set pinned statically: `role="progressbar"` + `aria-valuemin`/`-max`/`-now` on the frame,
// and the status attribute (`data-progressing=""` / `data-complete=""` / `data-indeterminate=""`,
// which Base UI mirrors onto every part) where the styling reads it. The live value model is
// demonstrated AND tested in the ready-made (Components/LinearProgress), which composes these
// parts.
const meta = {
  title: "Elements/LinearProgress",
  component: LinearProgress,
  subcomponents: {
    LinearProgressLabel,
    LinearProgressTrack,
    LinearProgressIndicator,
    LinearProgressValue,
  },
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy at 60%: the flex-row frame groups the label, the track with its fill, and the
 * neutral `%` readout. The frame is pinned with the `progressbar` aria Base UI's `Progress.Root`
 * would set, named by the label part via `aria-labelledby`.
 */
export const Default: Story = {
  render: () => (
    <div className="w-64">
      <LinearProgress
        role="progressbar"
        aria-labelledby="elements-linear-progress-label"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={60}
        data-progressing=""
      >
        <LinearProgressLabel id="elements-linear-progress-label">Uploading</LinearProgressLabel>
        <LinearProgressTrack magnitude="md">
          <LinearProgressIndicator
            tone="brand"
            data-progressing=""
            render={<div style={fillStyle(60)} />}
          />
        </LinearProgressTrack>
        <LinearProgressValue>60%</LinearProgressValue>
      </LinearProgress>
    </div>
  ),
};

/** Fill color by signal: `brand` accent, `success`/`warning`/`danger` outcome. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      {TONES.map((tone) => (
        <LinearProgress
          key={tone}
          role="progressbar"
          aria-label={`${tone} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={60}
          data-progressing=""
        >
          <LinearProgressTrack magnitude="md">
            <LinearProgressIndicator
              tone={tone}
              data-progressing=""
              render={<div style={fillStyle(60)} />}
            />
          </LinearProgressTrack>
          <LinearProgressValue>60%</LinearProgressValue>
        </LinearProgress>
      ))}
    </div>
  ),
};

/** Track thickness: `sm` 5px / `md` 8px. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <LinearProgress
          key={magnitude}
          role="progressbar"
          aria-label={`${magnitude} bar`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={60}
          data-progressing=""
        >
          <LinearProgressTrack magnitude={magnitude}>
            <LinearProgressIndicator
              tone="brand"
              data-progressing=""
              render={<div style={fillStyle(60)} />}
            />
          </LinearProgressTrack>
          <LinearProgressValue>60%</LinearProgressValue>
        </LinearProgress>
      ))}
    </div>
  ),
};

/**
 * The fill is the value made visible — `width: <percent>%`, the inline geometry Base UI derives
 * from `value`, pinned here from empty to complete. At `max` the status attribute flips from
 * `data-progressing` to `data-complete`.
 */
export const Values: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      {[0, 25, 50, 75, 100].map((value) => {
        const status = value === 100 ? { "data-complete": "" } : { "data-progressing": "" };
        return (
          <LinearProgress
            key={value}
            role="progressbar"
            aria-label={`${value}% progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            {...status}
          >
            <LinearProgressTrack magnitude="md">
              <LinearProgressIndicator
                tone="brand"
                {...status}
                render={<div style={fillStyle(value)} />}
              />
            </LinearProgressTrack>
            <LinearProgressValue>{value}%</LinearProgressValue>
          </LinearProgress>
        );
      })}
    </div>
  ),
};

/**
 * The unknown-duration state, pinned via `data-indeterminate` — the attribute Base UI sets when
 * `value` is `null` (mirrored onto every part; the fill's cva is what reads it): the fill drops to
 * a third of the track and slide-pulses (no inline width geometry), `aria-valuenow` is unset, and
 * `aria-valuetext` reads "indeterminate progress".
 */
export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-64">
      <LinearProgress
        role="progressbar"
        aria-label="Syncing"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext="indeterminate progress"
        data-indeterminate=""
      >
        <LinearProgressTrack magnitude="md">
          <LinearProgressIndicator tone="brand" data-indeterminate="" />
        </LinearProgressTrack>
      </LinearProgress>
    </div>
  ),
};

/**
 * Hidden CSS canary (the allowed rule-2b play): asserts the pinned configurations compile to real
 * styling — the `sm` track is thinner than the `md` track, `brand` and `danger` resolve to distinct
 * fill colors, the pinned 60% geometry occupies 60% of the track, and `data-indeterminate` swaps
 * the width transition for the slide-pulse animation. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const StatesCssCanary: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <LinearProgress
        role="progressbar"
        aria-label="sm canary"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={60}
        data-progressing=""
      >
        <LinearProgressTrack magnitude="sm">
          <LinearProgressIndicator
            tone="brand"
            data-progressing=""
            render={<div style={fillStyle(60)} />}
          />
        </LinearProgressTrack>
      </LinearProgress>
      <LinearProgress
        role="progressbar"
        aria-label="md canary"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={60}
        data-progressing=""
      >
        <LinearProgressTrack magnitude="md">
          <LinearProgressIndicator
            tone="danger"
            data-progressing=""
            render={<div style={fillStyle(60)} />}
          />
        </LinearProgressTrack>
      </LinearProgress>
      <LinearProgress
        role="progressbar"
        aria-label="indeterminate canary"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext="indeterminate progress"
        data-indeterminate=""
      >
        <LinearProgressTrack magnitude="md">
          <LinearProgressIndicator tone="brand" data-indeterminate="" />
        </LinearProgressTrack>
      </LinearProgress>
    </div>
  ),
  play: async ({ canvas }) => {
    // Each canary bar holds exactly Track > Indicator, so structural traversal is deterministic.
    const trackOf = (bar: HTMLElement) => bar.firstElementChild as HTMLElement;
    const fillOf = (bar: HTMLElement) => trackOf(bar).firstElementChild as HTMLElement;
    const smBar = canvas.getByRole("progressbar", { name: "sm canary" });
    const mdBar = canvas.getByRole("progressbar", { name: "md canary" });
    const indeterminateBar = canvas.getByRole("progressbar", { name: "indeterminate canary" });
    // `magnitude` compiles to a real thickness difference (`sm` 5px < `md` 8px).
    await expect(trackOf(smBar).getBoundingClientRect().height).toBeLessThan(
      trackOf(mdBar).getBoundingClientRect().height,
    );
    // `tone` resolves to distinct fill colors.
    await expect(getComputedStyle(fillOf(smBar)).backgroundColor).not.toBe(
      getComputedStyle(fillOf(mdBar)).backgroundColor,
    );
    // The pinned `width: 60%` geometry occupies 60% of the track.
    const mdTrackRect = trackOf(mdBar).getBoundingClientRect();
    const mdFillRect = fillOf(mdBar).getBoundingClientRect();
    await expect(mdFillRect.width / mdTrackRect.width).toBeCloseTo(0.6, 2);
    // `data-indeterminate` runs the slide-pulse animation instead of a width transition.
    await expect(getComputedStyle(fillOf(indeterminateBar)).animationName).not.toBe("none");
  },
};
