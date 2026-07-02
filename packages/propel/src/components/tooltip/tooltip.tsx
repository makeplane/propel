import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { TooltipRoot } from "@base-ui/react/tooltip";
import type * as React from "react";

import { TooltipArrow, TooltipPopup, TooltipShortcut } from "../../elements/tooltip";
import { Positioner } from "../../internal/positioner";

export type TooltipProps<Payload = unknown> = Omit<
  TooltipRoot.Props<Payload>,
  "children" | "className" | "style"
> & {
  /** The text (or rich content) shown inside the tooltip popup. */
  content: React.ReactNode;
  /**
   * Optional keyboard-shortcut hint shown to the right of `content`, dimmed (e.g. `"⌘ K"`). Maps to
   * the Figma "Cmd + K" slot — omit it for a plain tooltip.
   */
  shortcut?: React.ReactNode;
  /**
   * The element the tooltip is attached to. Base UI renders the trigger as a `<button>` by default;
   * pass a single element and it is used as the trigger via the `render` prop, so any focusable
   * element (a real button, an icon button) can anchor the tooltip.
   */
  children: React.ReactElement;
  /**
   * Which side of the trigger to place the popup on. May flip automatically to stay in view.
   *
   * @default "top"
   */
  side?: BaseTooltip.Positioner.Props["side"];
  /**
   * Gap in pixels between the trigger and the popup. Leaves room for the arrow.
   *
   * @default 8
   */
  sideOffset?: number;
  /**
   * How long to wait (ms) before opening on hover. Focus opens immediately.
   *
   * @default 600
   */
  delay?: number;
};

/**
 * A small popup that describes the element it is attached to. Appears on hover or keyboard focus of
 * the trigger and is dismissed on blur, pointer-leave, or `Esc`.
 *
 * Built on Base UI's tooltip, so it's accessible by default: the popup is exposed as
 * `role="tooltip"` and wired to the trigger. Pass the trigger as `children`, the label as
 * `content`, and an optional `shortcut` for a dimmed keyboard hint.
 *
 * Grafts Base UI's tooltip behavior onto propel's styled parts: `Tooltip.Root` + `Tooltip.Trigger`
 * + `Tooltip.Portal` → `Tooltip.Positioner` (shared `internal/positioner`) → `TooltipPopup` +
 * `TooltipArrow`. Colors come from propel's adaptive surface tokens (`bg-layer-2` / `text-primary`
 * / `border-subtle-1`), so the tooltip is light on light themes and dark on dark themes, matching
 * the Figma "Tooltip" component (node 1144-3159).
 */
export function Tooltip<Payload = unknown>({
  content,
  shortcut,
  children,
  side = "top",
  sideOffset = 8,
  delay = 600,
  ...props
}: TooltipProps<Payload>) {
  return (
    <BaseTooltip.Root {...props}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={sideOffset} render={<Positioner />}>
          {/* Base UI wires the popup to the trigger via `aria-describedby` but does
              not set a role; declare `role="tooltip"` so the popup matches the ARIA
              tooltip pattern and is queryable as one by assistive tech and tests. The
              popup chrome (inverse-adaptive surface, caption text, radius, shadow,
              padding, and the gap to the shortcut) lives on the styled `TooltipPopup`. */}
          <BaseTooltip.Popup role="tooltip" render={<TooltipPopup />}>
            {content}
            {shortcut != null ? <TooltipShortcut>{shortcut}</TooltipShortcut> : null}
            <BaseTooltip.Arrow render={<TooltipArrow />} />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
