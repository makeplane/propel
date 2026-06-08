import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cx } from "class-variance-authority";
import * as React from "react";

/**
 * Shares a single open/close delay across every tooltip beneath it, so that once
 * one tooltip has opened, moving to an adjacent trigger shows its tooltip instantly
 * (the usual "tooltip group" feel). Optional — a `Tooltip` works on its own — but
 * wrap an app or a toolbar in it when you want that grouped timing. Thin re-export
 * of Base UI's provider so consumers don't reach into `@base-ui/react` directly.
 */
export const TooltipProvider = BaseTooltip.Provider;

export type TooltipProps = Omit<
  React.ComponentProps<typeof BaseTooltip.Root>,
  "children" | "className" | "render" | "style"
> & {
  /** The text (or rich content) shown inside the tooltip popup. */
  content: React.ReactNode;
  /**
   * Optional keyboard-shortcut hint shown to the right of `content`, dimmed
   * (e.g. `"⌘ K"`). Maps to the Figma "Cmd + K" slot — omit it for a plain tooltip.
   */
  shortcut?: React.ReactNode;
  /**
   * The element the tooltip is attached to. Base UI renders the trigger as a
   * `<button>` by default; pass a single element and it is used as the trigger via
   * the `render` prop, so any focusable element (a real button, an icon button)
   * can anchor the tooltip.
   */
  children: React.ReactElement;
  /**
   * Which side of the trigger to place the popup on. May flip automatically to
   * stay in view.
   * @default "top"
   */
  side?: React.ComponentProps<typeof BaseTooltip.Positioner>["side"];
  /**
   * Gap in pixels between the trigger and the popup. Leaves room for the arrow.
   * @default 8
   */
  sideOffset?: number;
  /**
   * How long to wait (ms) before opening on hover. Focus opens immediately.
   * @default 600
   */
  delay?: number;
};

/**
 * A small popup that describes the element it is attached to. Appears on hover or
 * keyboard focus of the trigger and is dismissed on blur, pointer-leave, or `Esc`.
 *
 * Built on Base UI's tooltip, so it's accessible by default: the popup is exposed
 * as `role="tooltip"` and wired to the trigger. Pass the trigger as `children`, the
 * label as `content`, and an optional `shortcut` for a dimmed keyboard hint.
 *
 * Colors come from propel's adaptive surface tokens (`bg-layer-2` / `text-primary`
 * / `border-subtle-1`), so the tooltip is light on light themes and dark on dark
 * themes, matching the Figma "Tooltip" component (node 1144-3159).
 */
export function Tooltip({
  content,
  shortcut,
  children,
  side = "top",
  sideOffset = 8,
  delay = 600,
  ...rootProps
}: TooltipProps) {
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

/**
 * The little notch that points from the popup back to the trigger. A rotated square
 * sharing the popup's surface (`bg-layer-2`) and border (`border-subtle-1`), so it
 * matches the popup in every theme. Base UI positions it against the active edge and
 * sets `data-side`; the per-side rules tuck the square half-under the popup so only
 * its two outer faces (the triangle) show, with the inner faces hidden behind the
 * popup body. Only surface/border tokens are used — no arbitrary colors.
 */
function TooltipArrow() {
  return (
    <BaseTooltip.Arrow
      className={cx(
        "size-2 rotate-45 border-sm border-subtle-1 bg-layer-2",
        // Pull the square halfway across the popup edge for each side and clip the
        // adjacent borders so the visible part reads as a clean triangle.
        "data-[side=bottom]:top-[-3px] data-[side=bottom]:[clip-path:polygon(0_0,100%_0,0_100%)]",
        "data-[side=top]:bottom-[-3px] data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
        "data-[side=left]:right-[-3px] data-[side=left]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
        "data-[side=right]:left-[-3px] data-[side=right]:[clip-path:polygon(0_0,100%_0,0_100%)]",
      )}
    />
  );
}
