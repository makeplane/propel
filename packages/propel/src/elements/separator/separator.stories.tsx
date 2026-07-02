import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Separator } from "./index";

// elements-tier story (rule 2b): `Separator` is a Base-UI-agnostic styled `<div>`; Base UI's `Separator`
// behavior grafts onto it via `render`, supplying `role`/`aria-orientation` and the
// `[data-orientation]` the cva keys off. The Root-less primitive is wired straight from
// `@base-ui/react` here. Separator is static — a thin rule with no interaction-state styling — so it
// gets no pseudo-states story.
const meta = {
  title: "Elements/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Horizontal rule dividing stacked content. Semantic — announced to assistive technology. */
export const Horizontal: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <span className="text-13 text-secondary">Above</span>
      <BaseSeparator orientation="horizontal" render={<Separator />} />
      <span className="text-13 text-secondary">Below</span>
    </div>
  ),
};

/** `orientation="vertical"` divides inline content; Base UI sets `aria-orientation`. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3">
      <span className="text-13 text-secondary">Left</span>
      <BaseSeparator orientation="vertical" render={<Separator />} />
      <span className="text-13 text-secondary">Right</span>
    </div>
  ),
};

/**
 * A decorative separator is visual-only and hidden from assistive technology. Use this when the
 * separator adds rhythm to a layout but does not mark a meaningful content boundary. `role="none"`
 * and `aria-hidden` remove it from the a11y tree.
 */
export const Decorative: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <span className="text-13 text-secondary">Above</span>
      <BaseSeparator
        orientation="horizontal"
        render={<Separator />}
        role="none"
        aria-orientation={undefined}
        aria-hidden
      />
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
      <BaseSeparator orientation="horizontal" render={<Separator />} />
      <BaseSeparator orientation="vertical" render={<Separator />} />
      <BaseSeparator
        orientation="horizontal"
        render={<Separator />}
        role="none"
        aria-orientation={undefined}
        aria-hidden
      />
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
