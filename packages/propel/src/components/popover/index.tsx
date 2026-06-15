import { Popover as BasePopover } from "@base-ui/react/popover";
import * as React from "react";
import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";

/**
 * The popover root — a Base UI `Popover.Root`. Holds open state and wires the trigger
 * to the floating panel. Compose it with `PopoverTrigger` + `PopoverContent`:
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Display</PopoverTrigger>
 *   <PopoverContent>
 *     <RadioGroup>…</RadioGroup>
 *     <Checkbox label="Show empty groups" />
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * Unlike `Dropdown`, the surface is a generic floating panel (NOT a `role="menu"`), so
 * it can host arbitrary settings-panel content — radios, checkboxes, pills, forms — as
 * valid children. Reach for `Dropdown` when you need an actual ARIA menu of actions.
 */
type BasePopoverRootProps = React.ComponentProps<typeof BasePopover.Root>;

export type PopoverProps = Omit<
  BasePopoverRootProps,
  "open" | "defaultOpen" | "onOpenChange" | "modal" | "children"
> & {
  /** Whether the popover is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the popover is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the popover opens or closes. */
  onOpenChange?: BasePopoverRootProps["onOpenChange"];
  /**
   * Modal behavior while open: `true` locks page scroll and blocks outside pointer
   * interaction; `'trap-focus'` only traps focus. @default false
   */
  modal?: BasePopoverRootProps["modal"];
  /** The popover's trigger and panel (`PopoverTrigger`, `PopoverContent`). */
  children?: React.ReactNode;
};

export function Popover(props: PopoverProps) {
  return <BasePopover.Root {...props} />;
}

export type PopoverTriggerProps = Omit<
  React.ComponentProps<typeof BasePopover.Trigger>,
  "className" | "style"
>;

/**
 * The element that opens the popover. Renders a `<button>` by default; pass `render`
 * to project the trigger onto your own element (e.g. an icon button).
 */
export function PopoverTrigger(props: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} />;
}

// The panel surface is the shared `OverlayPanel` — the same `overlay` shadow at `lg`
// radius the dropdown uses, capped at the available height, with its body scrolling
// inside a `ScrollArea` — so popovers read as the same family of overlays.
type PopoverContentWidth = OverlayPanelWidth;

export type PopoverContentProps = Omit<
  React.ComponentProps<typeof BasePopover.Popup>,
  "className" | "style"
> & {
  /** Which side of the trigger the panel opens toward. @default "bottom" */
  side?: React.ComponentProps<typeof BasePopover.Positioner>["side"];
  /** Distance in px between the trigger and the panel. @default 4 */
  sideOffset?: React.ComponentProps<typeof BasePopover.Positioner>["sideOffset"];
  /** Alignment of the panel relative to the trigger along `side`. @default "start" */
  align?: React.ComponentProps<typeof BasePopover.Positioner>["align"];
  /**
   * Fixed panel width. `anchor` matches the trigger; `sm`/`md`/`lg` are the panel
   * widths from Figma (256 / 288 / 384px). @default "anchor"
   */
  width?: PopoverContentWidth;
};

/**
 * The floating panel surface. Bundles Base UI's `Portal` + `Positioner` + `Popup` so the
 * panel renders in a portal, positioned against the trigger, with propel's overlay
 * styling. Place arbitrary content inside — radios, checkboxes, pills, forms — it is a
 * generic container (no `role="menu"`), so those controls are valid children and the
 * surface stays ARIA-clean. Give it an accessible name with `aria-label` /
 * `aria-labelledby` when the panel needs one.
 *
 * Base UI handles the a11y wiring: focus moves into the panel on open and returns to the
 * trigger on close, `Esc` and outside-clicks dismiss it, and the positioner uses logical
 * sides so it is RTL-safe out of the box.
 */
export function PopoverContent({
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  width = "anchor",
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="outline-none"
      >
        <OverlayPanel elevation="overlay" radius="lg" width={width}>
          <BasePopover.Popup className="p-1 outline-none" {...props}>
            {children}
          </BasePopover.Popup>
        </OverlayPanel>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
