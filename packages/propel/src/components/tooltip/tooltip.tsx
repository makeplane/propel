import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { TooltipRoot } from "@base-ui/react/tooltip";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { TooltipArrow } from "./tooltip-arrow";

export type TooltipProps<Payload = unknown> = Omit<
  TooltipRoot.Props<Payload>,
  "children" | "className" | "render" | "style"
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
  side?: React.ComponentProps<typeof BaseTooltip.Positioner>["side"];
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
 * Colors come from propel's adaptive surface tokens (`bg-layer-2` / `text-primary` /
 * `border-subtle-1`), so the tooltip is light on light themes and dark on dark themes, matching the
 * Figma "Tooltip" component (node 1144-3159).
 */
export function Tooltip<Payload = unknown>({
  content,
  shortcut,
  children,
  side = "top",
  sideOffset = 8,
  delay = 600,
  ...rootProps
}: TooltipProps<Payload>) {
  return (
    <BaseTooltip.Root {...rootProps}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
          <BaseTooltip.Popup
            // Base UI wires the popup to the trigger via `aria-describedby` but does
            // not set a role; declare `role="tooltip"` so the popup matches the ARIA
            // tooltip pattern and is queryable as one by assistive tech and tests.
            role="tooltip"
            // Inverse-adaptive surface: the popup uses `layer/2` + `text/primary`
            // + `border/subtle-1`, which resolve to a light card on light themes and
            // a dark card on dark themes (Figma's light/dark "Tooltip" modes).
            // `caption-md/regular` text; `radius/md`; overlay shadow; padding
            // 6px/8px and a 12px gap to the shortcut — all straight from the spec.
            className={cx(
              "flex items-center gap-3 rounded-md border-sm border-subtle-1 bg-layer-2 px-2 py-1.5",
              "text-caption-md-regular text-primary shadow-overlay-200",
            )}
          >
            {content}
            {shortcut != null ? (
              // The keyboard-shortcut hint: dimmed `text/disabled` at the smaller
              // `caption-sm/regular` scale (Figma "Cmd + K" treatment).
              <span className="text-caption-sm-regular text-disabled">{shortcut}</span>
            ) : null}
            <TooltipArrow />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
