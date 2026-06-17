import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { ScrollArea } from "../components/scroll-area/index";
import { surfaceVariants, type SurfaceVariantProps } from "./surface";

// The shared scrollable-overlay shell. Dropdown menus, the popover panel, the
// breadcrumb overflow menu and the toolbar picker all render the same thing: an
// elevated surface capped at the positioner's available height, whose body scrolls
// inside a `ScrollArea` while optional sticky chrome (a search header, a footer)
// stays pinned outside the scroll. This bundles that composition so each call site
// only supplies its positioner + a Base UI popup, and never re-derives the
// surface / max-height / overflow / scroll classes (they had drifted across five
// call sites). It pairs with `internal/surface` (the card tokens) the same way.
//
// This is a component, but an internal one: it lives outside `components/` and
// `hooks/` (the only folders the build turns into published subpaths), so it is not
// part of the package's public API.
//
// The scrollable Base UI popup is passed as `children`, so the `ScrollArea` is an
// ancestor of it — a `Menu.Popup`'s menuitems stay its direct children and the
// surface is ARIA-valid. Non-menuitem chrome goes through `header` / `footer`, which
// sit outside that popup.
const overlayPanelVariants = cva(
  cx(
    // Cap at the height the positioner measured, and lay the sticky header / scroll
    // body / sticky footer out as a clipped column.
    "flex max-h-(--available-height) flex-col overflow-hidden outline-none",
    // Open animation. `--transform-origin` is set on the Base UI positioner and
    // inherits down to here (it is a CSS variable, so unlike `data-starting-style` —
    // which Base UI only sets on the popup, not this surface — it crosses elements).
    // Use the native `@starting-style` (`starting:`) entry so the whole card scales
    // and fades in from the trigger corner on mount, independent of the popup's own
    // transition state.
    "origin-(--transform-origin) transition-[transform,opacity] duration-150 ease-out",
    "starting:scale-95 starting:opacity-0",
  ),
  {
    variants: {
      // `anchor` matches the trigger width; `sm`/`md`/`lg` are the fixed Figma picker
      // widths; `auto` hugs its content with a small floor for compact menus.
      width: {
        anchor: "min-w-(--anchor-width)",
        auto: "min-w-36",
        sm: "w-64", // 256px
        md: "w-72", // 288px
        lg: "w-96", // 384px
      },
    },
  },
);

export type OverlayPanelWidth = NonNullable<VariantProps<typeof overlayPanelVariants>["width"]>;

export type OverlayPanelProps = {
  /** Surface shadow depth (see `internal/surface`). */
  elevation: SurfaceVariantProps["elevation"];
  /** Surface corner radius (see `internal/surface`). */
  radius: SurfaceVariantProps["radius"];
  /**
   * Panel width. `anchor` matches the trigger, `sm`/`md`/`lg` are the fixed picker widths, `auto`
   * hugs content with a floor. Omit for content width with no floor.
   */
  width?: OverlayPanelWidth;
  /** Sticky content pinned above the scroll body (e.g. a `DropdownSearch`). */
  header?: React.ReactNode;
  /** Sticky content pinned below the scroll body (e.g. a `DropdownFooter`). */
  footer?: React.ReactNode;
  /** The scrollable region — a Base UI `Menu.Popup` / `Popover.Popup` or content. */
  children: React.ReactNode;
};

export function OverlayPanel({
  elevation,
  radius,
  width,
  header,
  footer,
  children,
}: OverlayPanelProps) {
  return (
    <div className={cx(surfaceVariants({ elevation, radius }), overlayPanelVariants({ width }))}>
      {header}
      <ScrollArea orientation="vertical">{children}</ScrollArea>
      {footer}
    </div>
  );
}
