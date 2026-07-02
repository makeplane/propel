import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect } from "storybook/test";

import { Backdrop } from "../../internal/backdrop";
import { Icon } from "../../internal/icon";
import { OverlayDescription } from "../../internal/overlay-description";
import { OverlayTitle } from "../../internal/overlay-title";
import { Button } from "../button";
import {
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPopup,
  type DrawerPopupSide,
  DrawerViewport,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with every visual state pinned statically via the `data-*`
// attributes Base UI's drawer would set (`data-starting-style=""` / `data-ending-style=""` on the
// popup, which slide it off its anchor edge). The dimmed backdrop and the title/description
// heading pair are shared `internal/` chrome (`Backdrop`, `OverlayTitle`, `OverlayDescription`),
// rendered statically here the way the components tier grafts them. The one variant axis in this
// family is the popup's anchor `side`; everything else is static chrome. Opening, dismissal,
// keyboard, and aria wiring are demonstrated AND tested in the components-tier story
// (Components/Drawer).
const meta = {
  title: "Elements/Drawer",
  component: DrawerPopup,
  subcomponents: {
    DrawerViewport,
    DrawerContent,
    DrawerHeader,
    DrawerHeaderContent,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
  },
  args: { side: "end" },
} satisfies Meta<typeof DrawerPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

// The `side` axis of `DrawerPopup` — the viewport edge the panel anchors to. The leading-edge
// shadow border and the slide direction both follow it.
const SIDES: DrawerPopupSide[] = ["start", "end"];

/**
 * The full anatomy assembled statically: the shared internal `Backdrop` dims the stage,
 * `DrawerViewport` is the full-screen positioning layer, and `DrawerPopup` (anchored to `side`)
 * holds `DrawerContent` › `DrawerHeader` (`DrawerHeaderContent` stacking the shared
 * `OverlayTitle`/`OverlayDescription`, with the bare `DrawerClose` affordance opposite),
 * `DrawerBody`, and `DrawerFooter`. The backdrop, viewport, and popup are `fixed`, so the stage
 * uses `contain-layout` to scope them to the story canvas — in the real composition they pin to the
 * screen edges.
 */
export const Default: Story = {
  render: ({ side }) => (
    <div className="h-120 w-full overflow-hidden contain-layout">
      <Backdrop />
      <DrawerViewport>
        <DrawerPopup side={side}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHeaderContent>
                <OverlayTitle magnitude="lg">Work item details</OverlayTitle>
                <OverlayDescription magnitude="lg">
                  Edit the fields for this work item.
                </OverlayDescription>
              </DrawerHeaderContent>
              <DrawerClose aria-label="Close">
                <Icon magnitude="md">
                  <X />
                </Icon>
              </DrawerClose>
            </DrawerHeader>
            <DrawerBody>Panel body content goes here.</DrawerBody>
            <DrawerFooter>
              <Button sizing="hug" prominence="ghost" tone="neutral" magnitude="lg">
                Cancel
              </Button>
              <Button sizing="hug" prominence="primary" tone="neutral" magnitude="lg">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPopup>
      </DrawerViewport>
    </div>
  ),
};

/**
 * The family's one variant axis: `DrawerPopup`'s required `side` picks the anchor edge — `start`
 * pins to the inline-start (left in LTR) with a trailing-edge shadow border, `end` pins to the
 * inline-end with a leading-edge one. The slide transition endpoints follow the same edge.
 */
export const Sides: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {SIDES.map((side) => (
        <section key={side} aria-label={`side ${side}`} className="flex flex-col gap-2">
          <OverlayDescription magnitude="lg">side="{side}"</OverlayDescription>
          <div className="h-64 w-full overflow-hidden contain-layout">
            <DrawerPopup side={side}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerHeaderContent>
                    <OverlayTitle magnitude="lg">Anchored {side}</OverlayTitle>
                    <OverlayDescription magnitude="lg">
                      Pinned to the inline-{side} edge.
                    </OverlayDescription>
                  </DrawerHeaderContent>
                </DrawerHeader>
              </DrawerContent>
            </DrawerPopup>
          </div>
        </section>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state, statically:
 *
 * - **Resting** — the popup at its open resting pose, flush against its anchor edge.
 * - **Entering** — `data-starting-style=""` pins the enter transition's start endpoint: the popup is
 *   translated fully off its anchor edge, so the stage below the caption is intentionally empty
 *   (the panel sits just outside the clipped stage).
 * - **Exiting** — `data-ending-style=""` pins the exit transition's end endpoint (the same off-edge
 *   pose).
 * - **Close chrome** — the bare corner dismiss affordance `DrawerClose`; hover and focus-visible are
 *   CSS pseudo-classes, forced here with the pseudo-states addon.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#drawer-close-hover"],
      focusVisible: ["#drawer-close-focus"],
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <section aria-label="Resting" className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">Resting</OverlayDescription>
        <div className="h-64 w-full overflow-hidden contain-layout">
          <DrawerPopup id="drawer-popup-resting" side="end">
            <DrawerContent>
              <DrawerHeader>
                <DrawerHeaderContent>
                  <OverlayTitle magnitude="lg">Resting</OverlayTitle>
                  <OverlayDescription magnitude="lg">
                    The popup at its open resting pose.
                  </OverlayDescription>
                </DrawerHeaderContent>
              </DrawerHeader>
            </DrawerContent>
          </DrawerPopup>
        </div>
      </section>
      <section aria-label="Entering" className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">
          Entering — pinned at the off-edge data-starting-style endpoint
        </OverlayDescription>
        <div className="h-64 w-full overflow-hidden contain-layout">
          <DrawerPopup data-starting-style="" side="end">
            <DrawerContent>
              <DrawerHeader>
                <DrawerHeaderContent>
                  <OverlayTitle magnitude="lg">Entering</OverlayTitle>
                  <OverlayDescription magnitude="lg">
                    Translated fully off the anchor edge.
                  </OverlayDescription>
                </DrawerHeaderContent>
              </DrawerHeader>
            </DrawerContent>
          </DrawerPopup>
        </div>
      </section>
      <section aria-label="Exiting" className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">
          Exiting — pinned at the off-edge data-ending-style endpoint
        </OverlayDescription>
        <div className="h-64 w-full overflow-hidden contain-layout">
          <DrawerPopup data-ending-style="" side="end">
            <DrawerContent>
              <DrawerHeader>
                <DrawerHeaderContent>
                  <OverlayTitle magnitude="lg">Exiting</OverlayTitle>
                  <OverlayDescription magnitude="lg">
                    Translated fully off the anchor edge.
                  </OverlayDescription>
                </DrawerHeaderContent>
              </DrawerHeader>
            </DrawerContent>
          </DrawerPopup>
        </div>
      </section>
      <div className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">
          Close chrome — resting, hover, focus-visible
        </OverlayDescription>
        <div className="flex items-center gap-3">
          <DrawerClose aria-label="Close">
            <Icon magnitude="md">
              <X />
            </Icon>
          </DrawerClose>
          <DrawerClose id="drawer-close-hover" aria-label="Close (hover)">
            <Icon magnitude="md">
              <X />
            </Icon>
          </DrawerClose>
          <DrawerClose id="drawer-close-focus" aria-label="Close (focus-visible)">
            <Icon magnitude="md">
              <X />
            </Icon>
          </DrawerClose>
        </div>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-starting-style`/`data-ending-style` popups compute a translation off the anchor edge while
 * the resting popup stays untranslated and flush against the inline-end edge. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const popupStyle = (selector: string) => {
      const popup = canvasElement.querySelector(selector);
      if (!(popup instanceof HTMLElement)) throw new Error(`missing popup for ${selector}`);
      return getComputedStyle(popup);
    };
    // The `side="end"` placement compiled: the resting popup sits flush against the inline-end
    // edge of its containing stage, with no translation.
    await expect(popupStyle("#drawer-popup-resting").insetInlineEnd).toBe("0px");
    await expect(popupStyle("#drawer-popup-resting").translate).toBe("none");
    // The compiled `data-starting-style:translate-x-full` / `data-ending-style:translate-x-full`
    // selectors pin both transition endpoints fully off the anchor edge.
    await expect(popupStyle("[data-starting-style]").translate).not.toBe("none");
    await expect(popupStyle("[data-ending-style]").translate).not.toBe("none");
  },
};
