import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { OverlayDescription } from "../../internal/overlay-description";
import { OverlayTitle } from "../../internal/overlay-title";
import { Button, ButtonLabel } from "../button";
import {
  PopoverActions,
  PopoverArrow,
  PopoverBody,
  PopoverClose,
  PopoverIntro,
  PopoverPanelPopup,
  PopoverPopup,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — inline instead of portaled/positioned, with every visual state
// pinned statically via the `data-*` attributes Base UI's popover would set (`data-side` on the
// arrow, `data-starting-style=""`/`data-ending-style=""` on the popup). The Root, Trigger, Portal,
// Positioner, Backdrop, and Viewport are behavior-only or shared `internal` roles (they live in
// `components`/`internal`); the title and description use the shared `internal/overlay-*` recipes
// at the popover's `md` size. Opening, dismissal, focus, and aria behavior are demonstrated AND
// tested in Components/Popover.
const meta = {
  title: "Elements/Popover",
  component: PopoverPopup,
  subcomponents: {
    PopoverPanelPopup,
    PopoverBody,
    PopoverIntro,
    PopoverActions,
    PopoverArrow,
    PopoverClose,
  },
} satisfies Meta<typeof PopoverPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically, as Base UI would lay it out open below its trigger:
 * `PopoverPopup` (the self-contained elevated surface) holds a `PopoverBody` stacking a
 * `PopoverIntro` (the shared `OverlayTitle` + `OverlayDescription` at the popover's `md` size) over
 * a `PopoverActions` row, and the `PopoverArrow` — pinned `data-side="bottom"` and parked at the
 * top edge by a demo wrapper (Base UI's positioner owns the real placement) — points back at the
 * would-be trigger.
 */
export const Default: Story = {
  render: () => (
    <div className="relative w-fit pt-2">
      <PopoverPopup>
        <PopoverBody>
          <PopoverIntro>
            <OverlayTitle magnitude="md">Keyboard shortcuts</OverlayTitle>
            <OverlayDescription magnitude="md">
              Press <kbd>?</kbd> anywhere to see the full list.
            </OverlayDescription>
          </PopoverIntro>
          <PopoverActions>
            <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl">
              <ButtonLabel>Got it</ButtonLabel>
            </Button>
          </PopoverActions>
        </PopoverBody>
      </PopoverPopup>
      <div className="absolute inset-s-8 top-1" aria-hidden="true">
        <PopoverArrow data-side="bottom" />
      </div>
    </div>
  ),
};

/**
 * The two popup surfaces:
 *
 * - **`PopoverPopup`** — self-contained: the shared popup surface chrome (subtle border, `layer-1`
 *   fill, overlay shadow, `rounded-lg`, the open/close scale-fade) plus the `max-w-xs`
 *   readable-column cap.
 * - **`PopoverPanelPopup`** — the bare scroll body used when an elevated panel supplies the surface
 *   (the components-tier `PopoverContent` wraps it in the shared overlay panel): only the inner
 *   padding + focus-outline reset, never border/bg/shadow/radius, which would double up with the
 *   panel. The demo frame stands in for that panel chrome so the two read side by side.
 */
export const Surfaces: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">PopoverPopup — self-contained surface</p>
        <PopoverPopup>
          <PopoverBody>
            <PopoverIntro>
              <OverlayTitle magnitude="md">Self-contained</OverlayTitle>
              <OverlayDescription magnitude="md">
                Carries its own border, fill, shadow, and radius.
              </OverlayDescription>
            </PopoverIntro>
          </PopoverBody>
        </PopoverPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">PopoverPanelPopup — bare body, chrome from panel</p>
        <div className="w-72 rounded-lg border-sm border-subtle bg-layer-1 shadow-overlay-100">
          <PopoverPanelPopup>
            <PopoverBody>
              <PopoverIntro>
                <OverlayTitle magnitude="md">Panel body</OverlayTitle>
                <OverlayDescription magnitude="md">
                  Padding only — the surrounding panel owns the surface.
                </OverlayDescription>
              </PopoverIntro>
            </PopoverBody>
          </PopoverPanelPopup>
        </div>
      </div>
    </div>
  ),
};

const ARROW_SIDES = ["top", "bottom", "left", "right", "inline-start", "inline-end"] as const;

/**
 * The caret's placement axis: `data-side` — the attribute Base UI's positioner sets to report which
 * side of the trigger the popup resolved to — switches the rotated square's clip-path (and, under
 * the positioner's absolute placement, its `-3px` edge offset) so the visible triangle always
 * points back at the trigger. The logical `inline-start`/`inline-end` values flip their clip under
 * RTL.
 */
export const ArrowSides: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      {ARROW_SIDES.map((side) => (
        <div key={side} className="flex flex-col items-center gap-2">
          <p className="text-12 text-tertiary">{side}</p>
          <div
            className="flex size-10 items-center justify-center rounded-md border-sm border-subtle"
            aria-hidden="true"
          >
            <PopoverArrow data-side={side} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * `PopoverClose` is deliberately bare at the elements tier — a plain `<button>` carrying only the
 * focus-visible ring, for inline dismiss affordances inside arbitrary popover content. For a fuller
 * look, the components tier grafts the close behavior onto a `Button` instead; both render targets
 * sit side by side here.
 */
export const Close: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Bare PopoverClose</p>
        <PopoverClose>Dismiss</PopoverClose>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Close grafted onto a Button</p>
        <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl">
          <ButtonLabel>Close</ButtonLabel>
        </Button>
      </div>
    </div>
  ),
};

/**
 * The popup's transition poses, pinned statically:
 *
 * - **Resting** — the open pose: full opacity, natural scale.
 * - **Entering** — `data-starting-style=""` pins the pre-open endpoint of the transition (`opacity-0
 *   scale-95`), so the card is intentionally invisible while holding its layout.
 * - **Exiting** — `data-ending-style=""` pins the same faded, scaled-down endpoint on the way closed.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Resting</p>
        <PopoverPopup id="popover-popup-resting">
          <PopoverBody>
            <PopoverIntro>
              <OverlayTitle magnitude="md">Resting</OverlayTitle>
              <OverlayDescription magnitude="md">The open pose.</OverlayDescription>
            </PopoverIntro>
          </PopoverBody>
        </PopoverPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Entering (data-starting-style) — invisible</p>
        <PopoverPopup id="popover-popup-entering" data-starting-style="">
          <PopoverBody>
            <PopoverIntro>
              <OverlayTitle magnitude="md">Entering</OverlayTitle>
              <OverlayDescription magnitude="md">Pinned at opacity-0 scale-95.</OverlayDescription>
            </PopoverIntro>
          </PopoverBody>
        </PopoverPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Exiting (data-ending-style) — invisible</p>
        <PopoverPopup id="popover-popup-exiting" data-ending-style="">
          <PopoverBody>
            <PopoverIntro>
              <OverlayTitle magnitude="md">Exiting</OverlayTitle>
              <OverlayDescription magnitude="md">Pinned at opacity-0 scale-95.</OverlayDescription>
            </PopoverIntro>
          </PopoverBody>
        </PopoverPopup>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-starting-style`/`data-ending-style` popups compute to opacity 0 while the resting popup
 * stays fully opaque. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const popup = (id: string) => {
      const el = canvasElement.querySelector(`#${id}`);
      if (!(el instanceof HTMLElement)) throw new Error(`missing #${id} popup`);
      return el;
    };
    // The compiled `data-starting-style:opacity-0` / `data-ending-style:opacity-0` selectors pin
    // the transition endpoints; the resting popup carries neither attribute.
    await expect(getComputedStyle(popup("popover-popup-resting")).opacity).toBe("1");
    await expect(getComputedStyle(popup("popover-popup-entering")).opacity).toBe("0");
    await expect(getComputedStyle(popup("popover-popup-exiting")).opacity).toBe("0");
  },
};
