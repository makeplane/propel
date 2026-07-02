import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Separator } from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled `Separator` `<div>`
// renders DIRECTLY — no Base UI graft — with the `[data-orientation]` its cva keys off pinned
// statically, exactly as Base UI's `Separator` behavior would set it. The role/`aria-orientation`
// wiring (semantic vs. decorative) is behavior, demonstrated AND tested in the components-tier
// story (Components/Separator). Separator is static — a thin rule with no interaction-state
// styling — so it gets no pseudo-states story.
const meta = {
  title: "Elements/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Horizontal rule dividing stacked content: pins `data-orientation="horizontal"` — the attribute
 * Base UI's `Separator` would set — collapsing the `<div>` to a full-width `border-subtle` top
 * border.
 */
export const Horizontal: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <span className="text-13 text-secondary">Above</span>
      <Separator data-orientation="horizontal" />
      <span className="text-13 text-secondary">Below</span>
    </div>
  ),
};

/**
 * Vertical rule dividing inline content: pins `data-orientation="vertical"`, collapsing the `<div>`
 * to a self-stretching `border-subtle` inline-start border.
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3">
      <span className="text-13 text-secondary">Left</span>
      <Separator data-orientation="vertical" />
      <span className="text-13 text-secondary">Right</span>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned `[data-orientation]` selectors actually compiled — the
 * horizontal rule draws a top border and no inline-start border; the vertical rule the inverse.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const OrientationCanary: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Separator id="separator-horizontal" data-orientation="horizontal" />
      <div className="flex h-6">
        <Separator id="separator-vertical" data-orientation="vertical" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rule = (id: string) => {
      const node = canvasElement.querySelector(`#${id}`);
      if (!(node instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(node);
    };
    await expect(rule("separator-horizontal").borderTopWidth).not.toBe("0px");
    await expect(rule("separator-vertical").borderTopWidth).toBe("0px");
    await expect(rule("separator-vertical").borderInlineStartWidth).not.toBe("0px");
  },
};
