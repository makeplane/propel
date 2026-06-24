import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Separator } from "./index";

// Separator is static — a thin rule with no interaction-state styling — so it gets no
// pseudo-states story. Both of its adjustable axes are required props (no silent defaults):
// `orientation` and `decorative` (the spec's "Role" axis: semantic vs decorative).
const meta = {
  title: "UI/Separator",
  component: Separator,
  args: { orientation: "horizontal", decorative: false },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Horizontal rule dividing stacked content. Semantic — announced to assistive technology. */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="flex w-72 flex-col gap-3">
      <span className="text-13 text-secondary">Above</span>
      <Separator {...args} />
      <span className="text-13 text-secondary">Below</span>
    </div>
  ),
};

/** `orientation="vertical"` divides inline content; Base UI sets `aria-orientation`. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-6 items-center gap-3">
      <span className="text-13 text-secondary">Left</span>
      <Separator {...args} />
      <span className="text-13 text-secondary">Right</span>
    </div>
  ),
};

/**
 * A decorative separator is visual-only and hidden from assistive technology. Use this when the
 * separator adds rhythm to a layout but does not mark a meaningful content boundary.
 */
export const Decorative: Story = {
  args: { orientation: "horizontal", decorative: true },
  render: (args) => (
    <div className="flex w-72 flex-col gap-3">
      <span className="text-13 text-secondary">Above</span>
      <Separator {...args} />
      <span className="text-13 text-secondary">Below</span>
    </div>
  ),
};

/**
 * Behavior: the semantic separator exposes `role="separator"` and reflects its orientation via
 * `aria-orientation`. The decorative separator carries `role="none"` and `aria-hidden`. Tagged out
 * of the sidebar/docs/manifest but still runs under `test`.
 */
export const HasSeparatorRole: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex flex-col gap-3">
      <Separator orientation="horizontal" decorative={false} />
      <Separator orientation="vertical" decorative={false} />
      <Separator orientation="horizontal" decorative />
    </div>
  ),
  play: async ({ canvas }) => {
    const [horizontal, vertical] = canvas.getAllByRole("separator");
    await expect(horizontal).toHaveAttribute("aria-orientation", "horizontal");
    await expect(vertical).toHaveAttribute("aria-orientation", "vertical");
    // The decorative separator is hidden from the a11y tree — it should NOT appear in getAllByRole.
    await expect(canvas.getAllByRole("separator")).toHaveLength(2);
  },
};
