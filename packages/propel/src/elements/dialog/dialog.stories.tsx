import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect } from "storybook/test";

import { Backdrop } from "../../internal/backdrop";
import { Icon } from "../../internal/icon";
import { OverlayDescription } from "../../internal/overlay-description";
import { OverlayTitle } from "../../internal/overlay-title";
import { Button, ButtonLabel } from "../button";
import { IconButton } from "../icon-button";
import {
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogHeading,
  DialogPopup,
  type DialogPopupProps,
  DialogViewport,
} from "./index";

const MAGNITUDES: DialogPopupProps["magnitude"][] = ["sm", "md", "lg"];
const MAGNITUDE_WIDTHS = { sm: "320px", md: "384px", lg: "512px" } as const;

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the popup's transition poses pinned statically via the
// `data-starting-style`/`data-ending-style` attributes Base UI's dialog would set. The Root,
// Trigger, Portal, and Close are behavior-only roles (they live in `components`); the Backdrop,
// Title, and Description are shared `internal/` chrome the dialog adopts, composed here directly
// for fidelity. Opening, dismissal, focus, and aria behavior are demonstrated AND tested in the
// components-tier story (Components/Dialog).
const meta = {
  title: "Elements/Dialog",
  component: DialogPopup,
  subcomponents: {
    DialogViewport,
    DialogHeader,
    DialogHeading,
    DialogBody,
    DialogActions,
  },
  args: { magnitude: "sm" },
} satisfies Meta<typeof DialogPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically, as Base UI would lay it out while open: the shared
 * `Backdrop` dims the page, `DialogViewport` centers the popup, and `DialogPopup` stacks
 * `DialogHeader` (a `DialogHeading` holding the shared `OverlayTitle`, opposite a close
 * `IconButton`), the scrollable `DialogBody` (holding the shared `OverlayDescription`), and the
 * trailing-aligned `DialogActions`. The backdrop and viewport are `fixed inset-0`, so the demo
 * frame carries a `transform` to become their containing block — pinning the overlay inside the
 * frame instead of over the whole page.
 */
export const Default: Story = {
  render: ({ magnitude }) => (
    <div className="relative h-120 w-full [transform:translateZ(0)] overflow-hidden rounded-lg border-sm border-subtle">
      <Backdrop />
      <DialogViewport>
        <DialogPopup magnitude={magnitude}>
          <DialogHeader>
            <DialogHeading>
              <OverlayTitle magnitude="lg">Delete project</OverlayTitle>
            </DialogHeading>
            <IconButton prominence="ghost" tone="neutral" magnitude="lg" aria-label="Close">
              <Icon>
                <X />
              </Icon>
            </IconButton>
          </DialogHeader>
          <DialogBody>
            <OverlayDescription magnitude="lg">
              This permanently removes the project and all of its work items.
            </OverlayDescription>
          </DialogBody>
          <DialogActions>
            <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl">
              <ButtonLabel>Cancel</ButtonLabel>
            </Button>
            <Button sizing="hug" prominence="primary" tone="danger" magnitude="xl">
              <ButtonLabel>Delete</ButtonLabel>
            </Button>
          </DialogActions>
        </DialogPopup>
      </DialogViewport>
    </div>
  ),
};

/**
 * The popup's width axis — `sm` = 320 px, `md` = 384 px, `lg` = 512 px — required at every call
 * site. The popups render inline (they are just styled divs); the centering viewport and backdrop
 * are omitted so the three widths read side by side.
 */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {MAGNITUDES.map((magnitude) => (
        <DialogPopup key={magnitude} magnitude={magnitude}>
          <DialogHeader>
            <DialogHeading>
              <OverlayTitle magnitude="lg">
                {magnitude} — {MAGNITUDE_WIDTHS[magnitude]}
              </OverlayTitle>
            </DialogHeading>
            <IconButton prominence="ghost" tone="neutral" magnitude="lg" aria-label="Close">
              <Icon>
                <X />
              </Icon>
            </IconButton>
          </DialogHeader>
          <DialogBody>
            <OverlayDescription magnitude="lg">
              The header, body, and actions gutters stay constant across widths.
            </OverlayDescription>
          </DialogBody>
          <DialogActions>
            <Button sizing="hug" prominence="primary" tone="neutral" magnitude="xl">
              <ButtonLabel>Confirm</ButtonLabel>
            </Button>
          </DialogActions>
        </DialogPopup>
      ))}
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
  parameters: { controls: { disable: true } },
  render: ({ magnitude }) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Resting</p>
        <DialogPopup id="dialog-popup-resting" magnitude={magnitude}>
          <DialogHeader>
            <DialogHeading>
              <OverlayTitle magnitude="lg">Resting</OverlayTitle>
            </DialogHeading>
          </DialogHeader>
          <DialogBody>
            <OverlayDescription magnitude="lg">The open pose.</OverlayDescription>
          </DialogBody>
          <DialogActions>
            <Button sizing="hug" prominence="primary" tone="neutral" magnitude="xl">
              <ButtonLabel>Confirm</ButtonLabel>
            </Button>
          </DialogActions>
        </DialogPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Entering (data-starting-style) — invisible</p>
        <DialogPopup id="dialog-popup-entering" magnitude={magnitude} data-starting-style="">
          <DialogHeader>
            <DialogHeading>
              <OverlayTitle magnitude="lg">Entering</OverlayTitle>
            </DialogHeading>
          </DialogHeader>
          <DialogBody>
            <OverlayDescription magnitude="lg">Pinned at opacity-0 scale-95.</OverlayDescription>
          </DialogBody>
          <DialogActions>
            <Button sizing="hug" prominence="primary" tone="neutral" magnitude="xl">
              <ButtonLabel>Confirm</ButtonLabel>
            </Button>
          </DialogActions>
        </DialogPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Exiting (data-ending-style) — invisible</p>
        <DialogPopup id="dialog-popup-exiting" magnitude={magnitude} data-ending-style="">
          <DialogHeader>
            <DialogHeading>
              <OverlayTitle magnitude="lg">Exiting</OverlayTitle>
            </DialogHeading>
          </DialogHeader>
          <DialogBody>
            <OverlayDescription magnitude="lg">Pinned at opacity-0 scale-95.</OverlayDescription>
          </DialogBody>
          <DialogActions>
            <Button sizing="hug" prominence="primary" tone="neutral" magnitude="xl">
              <ButtonLabel>Confirm</ButtonLabel>
            </Button>
          </DialogActions>
        </DialogPopup>
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
    await expect(getComputedStyle(popup("dialog-popup-resting")).opacity).toBe("1");
    await expect(getComputedStyle(popup("dialog-popup-entering")).opacity).toBe("0");
    await expect(getComputedStyle(popup("dialog-popup-exiting")).opacity).toBe("0");
  },
};
