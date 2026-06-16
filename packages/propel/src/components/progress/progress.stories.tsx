import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Progress } from "./index";

const meta = {
  title: "Components/Progress",
  component: Progress,
  args: { variant: "linear", value: 32, magnitude: "md", "aria-label": "Upload progress" },
  // Give the bar a width to fill (it grows to its container).
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1990-63",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A linear progress bar with the trailing percentage label. */
export const Default: Story = {};

/** Both thicknesses (`sm` 5px / `md` 8px). */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress variant="linear" value={32} magnitude="sm" aria-label="Small progress" />
      <Progress variant="linear" value={32} magnitude="md" aria-label="Medium progress" />
    </div>
  ),
};

/** Across the range — empty, partial, and complete. */
export const Values: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress variant="linear" value={0} magnitude="md" aria-label="0 percent" />
      <Progress variant="linear" value={50} magnitude="md" aria-label="50 percent" />
      <Progress variant="linear" value={100} magnitude="md" aria-label="100 percent" />
    </div>
  ),
};

/** Hide the trailing label with `showValue={false}` (e.g. a slim inline track). */
export const WithoutLabel: Story = {
  args: { variant: "linear", value: 64, magnitude: "md", showValue: false },
};

/**
 * `variant="circular"` is a small determinate ring — a gray track plus an accent arc
 * proportional to the value, with no label. The arc starts at 12 o'clock and sweeps
 * clockwise.
 */
export const Circular: Story = {
  args: { variant: "circular", value: 32, magnitude: "md", "aria-label": "Sync progress" },
  // The ring sizes itself; the meta's 80-wide wrapper isn't needed.
};

/** The ring at both diameters (`sm` 16px / `md` 20px) across the range. */
export const CircularMagnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Progress variant="circular" value={0} magnitude="sm" aria-label="Small 0 percent" />
      <Progress variant="circular" value={32} magnitude="sm" aria-label="Small 32 percent" />
      <Progress variant="circular" value={100} magnitude="sm" aria-label="Small 100 percent" />
      <Progress variant="circular" value={0} magnitude="md" aria-label="Medium 0 percent" />
      <Progress variant="circular" value={32} magnitude="md" aria-label="Medium 32 percent" />
      <Progress variant="circular" value={100} magnitude="md" aria-label="Medium 100 percent" />
    </div>
  ),
};

/**
 * The linear bar exposes the `progressbar` role with `aria-valuenow`, and the label
 * renders the rounded percentage. Tagged out of the sidebar/docs/manifest but still run
 * under the default `test` tag.
 */
export const Semantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { variant: "linear", value: 32, magnitude: "md", "aria-label": "Upload progress" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bar = canvas.getByRole("progressbar", { name: "Upload progress" });
    await expect(bar).toHaveAttribute("aria-valuenow", "32");
    await expect(canvas.getByText("32%")).toBeInTheDocument();
  },
};

/**
 * The circular variant keeps the same `progressbar` role + `aria-valuenow` (Base UI's
 * Root owns them), and exposes no `%` text. Tagged out of the sidebar/docs/manifest but
 * still run under the default `test` tag.
 */
export const CircularSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { variant: "circular", value: 32, magnitude: "md", "aria-label": "Sync progress" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bar = canvas.getByRole("progressbar", { name: "Sync progress" });
    await expect(bar).toHaveAttribute("aria-valuenow", "32");
    await expect(canvas.queryByText("32%")).not.toBeInTheDocument();
  },
};
