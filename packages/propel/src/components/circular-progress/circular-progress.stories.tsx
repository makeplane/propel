import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  CircularProgressIndicator,
  CircularProgressSvg,
  CircularProgressTrack,
} from "../../elements/circular-progress";
import {
  CircularProgress,
  type CircularProgressMagnitude,
  type CircularProgressTone,
} from "./index";

const MAGNITUDES: CircularProgressMagnitude[] = ["sm", "md"];
const TONES: CircularProgressTone[] = ["brand", "success", "warning", "danger"];

const meta = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  subcomponents: { CircularProgressSvg, CircularProgressTrack, CircularProgressIndicator },
  args: { value: 60, magnitude: "md", tone: "brand", "aria-label": "Sync progress" },
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Arc color by signal: `brand` accent, `success`/`warning`/`danger` outcome. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {TONES.map((tone) => (
        <CircularProgress key={tone} {...args} tone={tone} aria-label={`${tone} ring`} />
      ))}
    </div>
  ),
};

/** Diameter: `sm` 16px / `md` 20px. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <CircularProgress
          key={magnitude}
          {...args}
          magnitude={magnitude}
          aria-label={`${magnitude} ring`}
        />
      ))}
    </div>
  ),
};

/** It exposes the `progressbar` role and reflects the value as `aria-valuenow`. */
export const HasProgressbarRole: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { value: 42, "aria-label": "Syncing" },
  play: async ({ canvas }) => {
    const ring = canvas.getByRole("progressbar", { name: "Syncing" });
    await expect(ring).toHaveAttribute("aria-valuenow", "42");
  },
};

/**
 * Out-of-range `value` is clamped to `[0, max]` before the arc and `aria-valuenow` are derived, so
 * the two never disagree. Tagged out of the sidebar/docs/manifest while still running under
 * `test`.
 */
export const ClampsOutOfRange: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { value: 150, "aria-label": "Overshoot" },
  play: async ({ canvas }) => {
    const ring = canvas.getByRole("progressbar", { name: "Overshoot" });
    await expect(ring).toHaveAttribute("aria-valuenow", "100");
  },
};

/** `value={null}` is indeterminate: a fixed quarter arc spins with no `aria-valuenow`. */
export const Indeterminate: Story = {
  args: { value: null, magnitude: "md", tone: "brand", "aria-label": "Syncing" },
};

/**
 * Interaction test: the indeterminate ring exposes the `progressbar` role with no `aria-valuenow`,
 * and the spin animation runs. Tagged out of the sidebar/docs/manifest while still running under
 * the default `test` tag.
 */
export const IndeterminateInteraction: Story = {
  ...Indeterminate,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const ring = canvas.getByRole("progressbar", { name: "Syncing" });
    await expect(ring).not.toHaveAttribute("aria-valuenow");
    await expect(ring).toHaveAttribute("data-indeterminate");
    const svg = ring.querySelector("svg");
    if (svg == null) throw new Error("expected the ring svg");
    await expect(getComputedStyle(svg).animationName).toBe("spin");
  },
};
