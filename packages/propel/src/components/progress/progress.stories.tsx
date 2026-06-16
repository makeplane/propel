import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Progress } from "./index";

const meta = {
  title: "Components/Progress",
  component: Progress,
  args: { value: 32, magnitude: "md", "aria-label": "Upload progress" },
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
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1990-51",
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
      <Progress value={32} magnitude="sm" aria-label="Small progress" />
      <Progress value={32} magnitude="md" aria-label="Medium progress" />
    </div>
  ),
};

/** Across the range — empty, partial, and complete. */
export const Values: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={0} magnitude="md" aria-label="0 percent" />
      <Progress value={50} magnitude="md" aria-label="50 percent" />
      <Progress value={100} magnitude="md" aria-label="100 percent" />
    </div>
  ),
};

/** Hide the trailing label with `showValue={false}` (e.g. a slim inline track). */
export const WithoutLabel: Story = {
  args: { value: 64, magnitude: "md", showValue: false },
};

/**
 * The bar exposes the `progressbar` role with `aria-valuenow`, and the label renders the rounded
 * percentage. Tagged out of the sidebar/docs/manifest but still run under the default `test` tag.
 */
export const Semantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { value: 32, magnitude: "md", "aria-label": "Upload progress" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bar = canvas.getByRole("progressbar", { name: "Upload progress" });
    await expect(bar).toHaveAttribute("aria-valuenow", "32");
    await expect(canvas.getByText("32%")).toBeInTheDocument();
  },
};
