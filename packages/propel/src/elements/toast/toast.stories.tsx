import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, X } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { IconButton } from "../icon-button";
import {
  Toast,
  ToastAction,
  ToastActionButton,
  ToastActionGroup,
  ToastActions,
  ToastCloseGroup,
  ToastContent,
  ToastDescription,
  ToastStatusIcon,
  ToastTextGroup,
  ToastTitle,
  type ToastTone,
  ToastViewport,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts, no manager, no Provider/Portal (those are behavior-only roles that
// live in `components`). The viewport and toast are just styled divs: the viewport pins itself
// `fixed` to the inline-end/bottom corner, so the demo frame carries a `transform` to become its
// containing block, and each visual state is pinned statically via the attribute the cva keys off
// (`data-ending=""` for the dismiss fade) or forced pseudo-classes (`:hover`, `:focus-visible`).
// Queueing, swipe/dismiss, keyboard (F6/Tab), and aria behavior are demonstrated AND tested in the
// components-tier story (Components/Toast).
const TONES: ToastTone[] = ["success", "danger", "info", "warning", "neutral"];

const meta = {
  title: "Elements/Toast",
  component: Toast,
  subcomponents: {
    ToastViewport,
    ToastContent,
    ToastTextGroup,
    ToastTitle,
    ToastDescription,
    ToastActions,
    ToastActionGroup,
    ToastActionButton,
    ToastAction,
    ToastCloseGroup,
    ToastStatusIcon,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1146-61689",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically, as Base UI would lay it out: the fixed `ToastViewport`
 * pins to the inline-end/bottom corner (the demo frame's `transform` makes it its containing block)
 * and stacks queued toasts with its `gap-2` rhythm. Each `Toast` card holds the tone-colored
 * `ToastStatusIcon` glyph slot, then `ToastContent` › `ToastTextGroup` (`ToastTitle` +
 * `ToastDescription`) over the `ToastActions` row — the inline-start `ToastActionGroup` cluster
 * growing to pin the trailing `ToastAction` to the inline-end edge — with the dismiss `IconButton`
 * sitting in the corner-positioned `ToastCloseGroup`. In real usage Base UI keeps the close control
 * hidden until the viewport expands; statically it shows plainly.
 */
export const Default: Story = {
  render: () => (
    <div className="relative h-64 w-full [transform:translateZ(0)] overflow-hidden rounded-lg border-sm border-subtle">
      <ToastViewport>
        <Toast>
          <ToastStatusIcon tone="info">
            <Info />
          </ToastStatusIcon>
          <ToastContent>
            <ToastTextGroup>
              <ToastTitle>Toast title</ToastTitle>
              <ToastDescription>Description of the toast alert</ToastDescription>
            </ToastTextGroup>
            <ToastActions>
              <ToastActionGroup>
                <ToastActionButton>Undo</ToastActionButton>
              </ToastActionGroup>
              <ToastAction>View</ToastAction>
            </ToastActions>
          </ToastContent>
          <ToastCloseGroup>
            <IconButton variant="ghost" size="sm" aria-label="Dismiss">
              <Icon>
                <X />
              </Icon>
            </IconButton>
          </ToastCloseGroup>
        </Toast>
        <Toast>
          <ToastStatusIcon tone="success">
            <Info />
          </ToastStatusIcon>
          <ToastContent>
            <ToastTextGroup>
              <ToastTitle>Draft saved</ToastTitle>
              <ToastDescription>Stacked with the viewport gap-2 rhythm</ToastDescription>
            </ToastTextGroup>
          </ToastContent>
          <ToastCloseGroup>
            <IconButton variant="ghost" size="sm" aria-label="Dismiss">
              <Icon>
                <X />
              </Icon>
            </IconButton>
          </ToastCloseGroup>
        </Toast>
      </ToastViewport>
    </div>
  ),
};

/**
 * The `ToastStatusIcon` tone axis (success / danger / info / warning / neutral): the slot is the
 * only tone-colored element — it sizes and tints whatever bare glyph child it's given while the
 * card's surface, border, and text stay neutral. The tone→filled-glyph mapping is a `components`
 * concern (Components/Toast picks the solid status glyphs); here one generic glyph shows the tint.
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-85 flex-col gap-3">
      {TONES.map((tone) => (
        <Toast key={tone}>
          <ToastStatusIcon tone={tone}>
            <Info />
          </ToastStatusIcon>
          <ToastContent>
            <ToastTextGroup>
              <ToastTitle>Toast title</ToastTitle>
              <ToastDescription>The status-icon slot tints the glyph {tone}</ToastDescription>
            </ToastTextGroup>
          </ToastContent>
        </Toast>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the anatomy:
 *
 * - **Resting** — the raised floating-card surface at full opacity.
 * - **Dismissing** — pins the `data-ending=""` attribute the cva keys off for the outgoing fade
 *   (`data-ending:opacity-0`), so the card is intentionally invisible while holding its layout.
 * - **Action pill** — rest / `:hover` (the transparent pill fills) / `:focus-visible` (the accent
 *   ring), forced by the pseudo-states addon.
 * - **Viewport focused** — the `:focus-visible` outline the live region shows when F6 moves focus
 *   into it, forced on a viewport pinned inside its own transformed frame.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#toast-action-hover",
      focusVisible: ["#toast-action-focus", "#toast-viewport-focus"],
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex w-85 shrink-0 flex-col gap-2">
          <p className="text-13 text-secondary">Resting</p>
          <Toast id="toast-resting">
            <ToastStatusIcon tone="info">
              <Info />
            </ToastStatusIcon>
            <ToastContent>
              <ToastTextGroup>
                <ToastTitle>Resting</ToastTitle>
                <ToastDescription>The open pose</ToastDescription>
              </ToastTextGroup>
            </ToastContent>
          </Toast>
        </div>
        <div className="flex w-85 shrink-0 flex-col gap-2">
          <p className="text-13 text-secondary">Dismissing (data-ending) — invisible</p>
          <Toast id="toast-ending" data-ending="">
            <ToastStatusIcon tone="info">
              <Info />
            </ToastStatusIcon>
            <ToastContent>
              <ToastTextGroup>
                <ToastTitle>Dismissing</ToastTitle>
                <ToastDescription>Pinned at opacity-0</ToastDescription>
              </ToastTextGroup>
            </ToastContent>
          </Toast>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-13 text-secondary">Action pill: rest · hover · focus-visible</p>
        <div className="flex items-center gap-3">
          <ToastActionButton>Rest</ToastActionButton>
          <ToastActionButton id="toast-action-hover">Hover</ToastActionButton>
          <ToastActionButton id="toast-action-focus">Focus-visible</ToastActionButton>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-13 text-secondary">Viewport focused (F6) — the live region ring</p>
        <div className="relative h-32 w-full [transform:translateZ(0)] overflow-hidden rounded-lg border-sm border-subtle">
          <ToastViewport id="toast-viewport-focus">
            <Toast>
              <ToastStatusIcon tone="neutral">
                <Info />
              </ToastStatusIcon>
              <ToastContent>
                <ToastTextGroup>
                  <ToastTitle>Focused viewport</ToastTitle>
                </ToastTextGroup>
              </ToastContent>
            </Toast>
          </ToastViewport>
        </div>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selector actually compiled — the
 * `data-ending=""` card computes to opacity 0 while the resting card stays fully opaque. Tagged out
 * of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const toast = (id: string) => {
      const el = canvasElement.querySelector(`#${id}`);
      if (!(el instanceof HTMLElement)) throw new Error(`missing #${id} toast`);
      return el;
    };
    // The compiled `data-ending:opacity-0` selector pins the dismiss fade's endpoint; the resting
    // card carries no state attribute.
    await expect(getComputedStyle(toast("toast-resting")).opacity).toBe("1");
    await expect(getComputedStyle(toast("toast-ending")).opacity).toBe("0");
  },
};
