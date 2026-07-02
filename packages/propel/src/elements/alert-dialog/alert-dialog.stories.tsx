import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import type * as React from "react";
import { expect } from "storybook/test";

import { Backdrop } from "../../internal/backdrop";
import { Icon } from "../../internal/icon";
import { OverlayDescription } from "../../internal/overlay-description";
import { OverlayTitle } from "../../internal/overlay-title";
import { Button } from "../button";
import {
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogHeader,
  AlertDialogIcon,
  type AlertDialogIconTone,
  AlertDialogIntro,
  AlertDialogPopup,
  AlertDialogViewport,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with every visual state pinned statically via the `data-*`
// attributes Base UI's alert dialog would set (`data-starting-style=""` / `data-ending-style=""`
// on the popup). The backdrop, title, and description are shared `internal/` chrome (`Backdrop`,
// `OverlayTitle`, `OverlayDescription`), rendered statically here the way the components tier
// grafts them. The one variant axis in this family is the leading icon's `tone`
// (destructive-vs-informational); everything else is static chrome. Opening, modality, and
// aria wiring are demonstrated AND tested in the components-tier story (Components/AlertDialog).
const meta = {
  title: "Elements/AlertDialog",
  component: AlertDialogPopup,
  subcomponents: {
    AlertDialogViewport,
    AlertDialogHeader,
    AlertDialogIcon,
    AlertDialogIntro,
    AlertDialogActions,
    AlertDialogClose,
  },
} satisfies Meta<typeof AlertDialogPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

// The `tone` axis of `AlertDialogIcon` — the destructive-vs-informational intent of the
// confirmation. The glyph itself is whatever child the caller passes.
const TONES: { tone: AlertDialogIconTone; title: string; glyph: React.ReactNode }[] = [
  { tone: "danger", title: "Delete account?", glyph: <TriangleAlert /> },
  { tone: "warning", title: "Discard draft?", glyph: <CircleAlert /> },
  { tone: "info", title: "Switch workspace?", glyph: <Info /> },
  { tone: "success", title: "Publish changes?", glyph: <CircleCheck /> },
];

/**
 * The full overlay anatomy assembled statically: the shared internal `Backdrop` dims the stage,
 * `AlertDialogViewport` centers, and `AlertDialogPopup` holds `AlertDialogHeader`
 * (`AlertDialogIcon` at the inline-start of `AlertDialogIntro`, which stacks the shared
 * `OverlayTitle`/`OverlayDescription`) above `AlertDialogActions`. The backdrop and viewport are
 * `fixed inset-0`, so the stage uses `contain-layout` to scope them to the story canvas — in the
 * real composition they cover the page.
 */
export const Default: Story = {
  render: () => (
    <div className="h-96 w-full contain-layout">
      <Backdrop />
      <AlertDialogViewport>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogIcon tone="danger">
              <TriangleAlert />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <OverlayTitle magnitude="lg">Delete account?</OverlayTitle>
              <OverlayDescription magnitude="lg">
                This permanently deletes your account and cannot be undone.
              </OverlayDescription>
            </AlertDialogIntro>
          </AlertDialogHeader>
          <AlertDialogActions>
            <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl">
              Cancel
            </Button>
            <Button sizing="hug" prominence="primary" tone="danger" magnitude="xl">
              Delete
            </Button>
          </AlertDialogActions>
        </AlertDialogPopup>
      </AlertDialogViewport>
    </div>
  ),
};

/**
 * The family's one variant axis: `AlertDialogIcon`'s required `tone` tints the leading glyph by the
 * confirmation's intent — `danger`, `warning`, `info`, or `success`. The glyph is the caller's
 * child; the icon is decorative (`aria-hidden` baked in) since the title carries the name.
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      {TONES.map(({ tone, title, glyph }) => (
        <AlertDialogHeader key={tone}>
          <AlertDialogIcon tone={tone}>{glyph}</AlertDialogIcon>
          <AlertDialogIntro>
            <OverlayTitle magnitude="lg">{title}</OverlayTitle>
            <OverlayDescription magnitude="lg">The {tone} tone.</OverlayDescription>
          </AlertDialogIntro>
        </AlertDialogHeader>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state, statically:
 *
 * - **Resting** — the popup at its open resting pose (full opacity, natural scale).
 * - **Entering** — `data-starting-style=""` pins the enter transition's start endpoint: scaled to 95%
 *   and fully transparent, so the block below the caption is intentionally invisible.
 * - **Exiting** — `data-ending-style=""` pins the exit transition's end endpoint (same transparent
 *   pose).
 * - **Close chrome** — the corner dismiss affordance `AlertDialogClose`; hover and focus-visible are
 *   CSS pseudo-classes, forced here with the pseudo-states addon.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#alert-dialog-close-hover"],
      focusVisible: ["#alert-dialog-close-focus"],
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">Resting</OverlayDescription>
        <AlertDialogPopup id="alert-dialog-popup-resting">
          <AlertDialogHeader>
            <AlertDialogIcon tone="danger">
              <TriangleAlert />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <OverlayTitle magnitude="lg">Resting</OverlayTitle>
              <OverlayDescription magnitude="lg">
                The popup at its open resting pose.
              </OverlayDescription>
            </AlertDialogIntro>
          </AlertDialogHeader>
          <AlertDialogActions>
            <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl">
              Cancel
            </Button>
            <Button sizing="hug" prominence="primary" tone="danger" magnitude="xl">
              Delete
            </Button>
          </AlertDialogActions>
        </AlertDialogPopup>
      </div>
      <div className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">
          Entering — pinned at the transparent data-starting-style endpoint
        </OverlayDescription>
        <AlertDialogPopup data-starting-style="">
          <AlertDialogHeader>
            <AlertDialogIcon tone="danger">
              <TriangleAlert />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <OverlayTitle magnitude="lg">Entering</OverlayTitle>
              <OverlayDescription magnitude="lg">
                Scaled to 95% and fully transparent.
              </OverlayDescription>
            </AlertDialogIntro>
          </AlertDialogHeader>
        </AlertDialogPopup>
      </div>
      <div className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">
          Exiting — pinned at the transparent data-ending-style endpoint
        </OverlayDescription>
        <AlertDialogPopup data-ending-style="">
          <AlertDialogHeader>
            <AlertDialogIcon tone="danger">
              <TriangleAlert />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <OverlayTitle magnitude="lg">Exiting</OverlayTitle>
              <OverlayDescription magnitude="lg">
                Scaled to 95% and fully transparent.
              </OverlayDescription>
            </AlertDialogIntro>
          </AlertDialogHeader>
        </AlertDialogPopup>
      </div>
      <div className="flex flex-col gap-2">
        <OverlayDescription magnitude="lg">
          Close chrome — resting, hover, focus-visible
        </OverlayDescription>
        <div className="flex items-center gap-3">
          <AlertDialogClose aria-label="Close">
            <Icon magnitude="md">
              <X />
            </Icon>
          </AlertDialogClose>
          <AlertDialogClose id="alert-dialog-close-hover" aria-label="Close (hover)">
            <Icon magnitude="md">
              <X />
            </Icon>
          </AlertDialogClose>
          <AlertDialogClose id="alert-dialog-close-focus" aria-label="Close (focus-visible)">
            <Icon magnitude="md">
              <X />
            </Icon>
          </AlertDialogClose>
        </div>
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
    const popupOpacity = (selector: string) => {
      const popup = canvasElement.querySelector(selector);
      if (!(popup instanceof HTMLElement)) throw new Error(`missing popup for ${selector}`);
      return getComputedStyle(popup).opacity;
    };
    // The compiled `data-starting-style:opacity-0` / `data-ending-style:opacity-0` selectors pin
    // both transition endpoints transparent; the resting popup keeps full opacity.
    await expect(popupOpacity("[data-starting-style]")).toBe("0");
    await expect(popupOpacity("[data-ending-style]")).toBe("0");
    await expect(popupOpacity("#alert-dialog-popup-resting")).toBe("1");
  },
};
