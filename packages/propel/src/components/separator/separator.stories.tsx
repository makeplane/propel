import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Separator } from "./index";

// Separator is static — a thin rule with no interaction-state styling — so it gets no
// pseudo-states story; its only axis is `orientation`, driven by Base UI.
const meta = {
  title: "Components/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default horizontal rule, dividing stacked content. */
export const Horizontal: Story = {
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
  render: (args) => (
    <div className="flex h-6 items-center gap-3">
      <span className="text-13 text-secondary">Left</span>
      <Separator {...args} orientation="vertical" />
      <span className="text-13 text-secondary">Right</span>
    </div>
  ),
};

/**
 * Behavior: the separator exposes `role="separator"` and reflects its orientation via
 * `aria-orientation`. Tagged out of the sidebar/docs/manifest but still runs under `test`.
 */
export const HasSeparatorRole: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex flex-col gap-3">
      <Separator />
      <Separator orientation="vertical" />
    </div>
  ),
  play: async ({ canvas }) => {
    const [horizontal, vertical] = canvas.getAllByRole("separator");
    await expect(horizontal).toHaveAttribute("aria-orientation", "horizontal");
    await expect(vertical).toHaveAttribute("aria-orientation", "vertical");
  },
};
