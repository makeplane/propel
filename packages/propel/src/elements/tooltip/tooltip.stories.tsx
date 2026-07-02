import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { TooltipArrow, TooltipPopup, TooltipShortcut } from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the popup laid out inline (it is just a styled div; Base UI
// only positions it) and the arrow's placement axis pinned statically via the `data-side`
// attribute Base UI's positioner would set. The Root, Trigger, Portal, Positioner, and Provider
// are behavior-only roles (they live in `components`, grafting the shared `internal/positioner`).
// Hover/focus opening, dismissal, Escape, and aria behavior are demonstrated AND tested in
// Components/Tooltip.
const meta = {
  title: "Elements/Tooltip",
  component: TooltipPopup,
  subcomponents: {
    TooltipArrow,
    TooltipShortcut,
  },
} satisfies Meta<typeof TooltipPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically, as Base UI would lay it out open above its trigger (the
 * ready-made's default `side="top"`): the `TooltipPopup` surface (adaptive `layer-2` fill, caption
 * text, radius, overlay shadow) holds the label and a `TooltipShortcut` hint, with the
 * `TooltipArrow` pinned `data-side="top"` and parked at the bottom edge by a demo wrapper (Base
 * UI's positioner owns the real placement) so it points down at the would-be trigger.
 */
export const Default: Story = {
  render: () => (
    <div className="relative w-fit pb-2">
      <TooltipPopup>
        Saves automatically
        <TooltipShortcut>⌘ S</TooltipShortcut>
      </TooltipPopup>
      <div className="absolute inset-s-6 bottom-1" aria-hidden="true">
        <TooltipArrow data-side="top" />
      </div>
    </div>
  ),
};

/**
 * The `TooltipShortcut` slot: a keyboard-shortcut hint to the inline-end of the label — the Figma
 * "Cmd + K" slot — one notch smaller (`caption-sm`) and tinted `text/tertiary` so it reads as a
 * dimmer, secondary cue while still meeting text contrast on the popup surface. Omit it for a plain
 * tooltip.
 */
export const Shortcut: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Plain label</p>
        <TooltipPopup>Saves automatically</TooltipPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">With shortcut</p>
        <TooltipPopup>
          Open command menu
          <TooltipShortcut>⌘ K</TooltipShortcut>
        </TooltipPopup>
      </div>
    </div>
  ),
};

const ARROW_SIDES = ["top", "bottom", "left", "right", "inline-start", "inline-end"] as const;

const LOGICAL_ARROW_SIDES = ["inline-start", "inline-end"] as const;

/**
 * The caret's placement axis: `data-side` — the attribute Base UI's positioner sets to report which
 * side of the trigger the popup resolved to — switches the rotated square's clip-path (and, under
 * the positioner's absolute placement, its `-3px` edge offset) so the visible triangle always
 * points back at the trigger. The second row pins `dir="rtl"`: the logical
 * `inline-start`/`inline-end` values flip their clip with writing direction, while the physical
 * sides render the same.
 */
export const ArrowSides: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start gap-4">
        {ARROW_SIDES.map((side) => (
          <div key={side} className="flex flex-col items-center gap-2">
            <p className="text-12 text-tertiary">{side}</p>
            <div
              className="flex size-10 items-center justify-center rounded-md border-sm border-subtle"
              aria-hidden="true"
            >
              <TooltipArrow id={`tooltip-arrow-${side}`} data-side={side} />
            </div>
          </div>
        ))}
      </div>
      <div dir="rtl" className="flex flex-wrap items-start gap-4">
        {LOGICAL_ARROW_SIDES.map((side) => (
          <div key={side} className="flex flex-col items-center gap-2">
            <p className="text-12 text-tertiary">{side} (RTL)</p>
            <div
              className="flex size-10 items-center justify-center rounded-md border-sm border-subtle"
              aria-hidden="true"
            >
              <TooltipArrow data-side={side} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned `data-side` attribute selectors actually compiled — each
 * side resolves a real clip-path, and opposite sides resolve different triangles. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const ArrowSidesCanary: Story = {
  ...ArrowSides,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const arrowClipPath = (side: string) => {
      const el = canvasElement.querySelector(`#tooltip-arrow-${side}`);
      if (!(el instanceof HTMLElement)) throw new Error(`missing #tooltip-arrow-${side} arrow`);
      return getComputedStyle(el).clipPath;
    };
    await expect(arrowClipPath("top")).not.toBe("none");
    await expect(arrowClipPath("bottom")).not.toBe("none");
    await expect(arrowClipPath("top")).not.toBe(arrowClipPath("bottom"));
  },
};
