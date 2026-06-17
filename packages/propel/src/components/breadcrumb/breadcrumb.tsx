import { Menu } from "@base-ui/react/menu";
import { cva, cx } from "class-variance-authority";
import { ChevronRight, Ellipsis } from "lucide-react";
import * as React from "react";

import { OverlayPanel } from "../../internal/overlay-panel";
import {
  Dropdown,
  DropdownContent,
  type DropdownContentProps,
  DropdownItem,
  type DropdownItemProps,
  type DropdownProps,
} from "../dropdown/index";

// A breadcrumb crumb is a small pill: 14px medium label on the neutral
// `text/tertiary` token, 4px horizontal padding, 6px radius, and a transparent
// background that fills with `background/layer/transparent-hover` on hover. The
// current page swaps the label to the stronger `text/primary` token. These map
// 1:1 to the Figma "Breadcrumb components" item (default / hover / current).
// The crumb is a single-line flex row of [icon] label [chevron]. Figma's text style
// carries a 1.54 line-height, but applying that here inflates the text's line box and
// floats the glyphs above the icon/chevron centers, so they read as misaligned. On a
// single-line flex row the box should hug the glyphs (`leading-none`) and `items-center`
// does the vertical centering; `py-0.5` restores the crumb/hover-pill height.
const crumbVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-14 leading-none font-medium text-tertiary",
  {
    variants: {
      // The hoverable crumbs (links, dropdown trigger) get the transparent-hover
      // background + stronger text on hover; the static current page does not.
      interactive: {
        true: "transition-colors hover:bg-layer-transparent-hover hover:text-primary",
        false: "",
      },
    },
  },
);

export type BreadcrumbProps = Omit<React.ComponentProps<"nav">, "className" | "style">;

/**
 * Breadcrumb trail: a `<nav aria-label="Breadcrumb">` wrapping an ordered list. Compose the trail
 * from `BreadcrumbItem`s — the number of crumbs is content the consumer provides, not a prop.
 */
export function Breadcrumb({ children, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" {...props}>
      <ol className="flex items-center gap-0.5">{children}</ol>
    </nav>
  );
}

export type BreadcrumbItemProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/** One step in the trail: a list item holding a link, page, or dropdown crumb. */
export function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li className="inline-flex items-center" {...props} />;
}

export type BreadcrumbLinkProps = Omit<React.ComponentProps<"a">, "className" | "style">;

/** A navigable crumb — renders an anchor styled as a hoverable pill. */
export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return <a className={cx(crumbVariants({ interactive: true }))} {...props} />;
}

export type BreadcrumbPageProps = Omit<React.ComponentProps<"span">, "className" | "style">;

/**
 * The current page — the last, non-navigable crumb. Marked `aria-current="page"` so assistive tech
 * announces it, and styled with the stronger `text/primary` token.
 */
export function BreadcrumbPage(props: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cx(crumbVariants({ interactive: false }), "text-primary")}
      {...props}
    />
  );
}

export type BreadcrumbSeparatorProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/**
 * The visual divider between crumbs — a decorative `ChevronRight`. It's
 * `aria-hidden`/presentational so it isn't announced as a list item.
 */
export function BreadcrumbSeparator({ children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      aria-hidden
      role="presentation"
      className="flex items-center px-1 text-icon-tertiary"
      {...props}
    >
      {children ?? <ChevronRight className="size-3.5 rtl:-scale-x-100" />}
    </li>
  );
}

export type BreadcrumbDropdownProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "render" | "style"
> & {
  /** The collapsed crumbs shown in the menu — typically `BreadcrumbDropdownItem`s. */
  children?: React.ReactNode;
  /** Accessible name for the trigger. Defaults to "Show more breadcrumbs". */
  label?: string;
};

/**
 * A collapsed/overflow crumb: an ellipsis trigger that opens a menu of the crumbs hidden to save
 * space. Built on Base UI's `Menu` so it's keyboard- and screen-reader-accessible out of the box.
 */
export function BreadcrumbDropdown({
  children,
  label = "Show more breadcrumbs",
  ...props
}: BreadcrumbDropdownProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={label}
        className={cx(
          crumbVariants({ interactive: true }),
          "cursor-default data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
        )}
        {...props}
      >
        <Ellipsis className="size-3.5" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="start" sideOffset={4}>
          <OverlayPanel elevation="raised" radius="md" width="auto">
            <Menu.Popup className="p-1 outline-none">{children}</Menu.Popup>
          </OverlayPanel>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export type BreadcrumbDropdownItemProps = Omit<
  React.ComponentProps<typeof Menu.Item>,
  "className" | "style"
>;

/**
 * A single item inside `BreadcrumbDropdown` — a thin wrapper over Base UI's `Menu.Item` with
 * propel's menu-row styling. Render a link inside it (or pass `render`) to make the collapsed crumb
 * navigable.
 */
export function BreadcrumbDropdownItem(props: BreadcrumbDropdownItemProps) {
  return (
    <Menu.Item
      className="flex cursor-default items-center rounded-sm px-2 py-1 text-14 leading-[1.54] text-secondary outline-none select-none data-highlighted:bg-layer-transparent-hover data-highlighted:text-primary"
      {...props}
    />
  );
}

/**
 * A breadcrumb crumb that opens a dropdown menu — the Figma "Dropdown" property of a breadcrumb
 * crumb (default / hover / current). Unlike `BreadcrumbDropdown` (the overflow ellipsis that hides
 * middle crumbs), this is a _real_ crumb in the trail whose menu lets the user switch the current
 * step between sibling pages or contexts — e.g. jumping between projects, sub-pages, or views
 * without leaving the breadcrumb. It composes propel's `Dropdown`, so the portaled menu is
 * keyboard- and screen-reader-accessible.
 *
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbMenu>
 *     <BreadcrumbMenuTrigger icon={<Layers />}>Plane Design</BreadcrumbMenuTrigger>
 *     <BreadcrumbMenuContent>
 *       <BreadcrumbMenuItem render={<a href="#" />}>Plane Mobile</BreadcrumbMenuItem>
 *       <BreadcrumbMenuItem render={<a href="#" />}>Plane Web</BreadcrumbMenuItem>
 *     </BreadcrumbMenuContent>
 *   </BreadcrumbMenu>
 * </BreadcrumbItem>;
 * ```
 */
export const BreadcrumbMenu = Dropdown;
export type BreadcrumbMenuProps = DropdownProps;

export type BreadcrumbMenuTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "render" | "style"
> & {
  /** Leading content, typically a work-item/page icon. Rendered before the label. */
  icon?: React.ReactNode;
  /** The crumb label. */
  children?: React.ReactNode;
};

/**
 * The crumb that opens the menu: a hoverable pill (icon + label) with a trailing chevron. That
 * chevron IS the breadcrumb chevron (the same glyph as `BreadcrumbSeparator`): it points right when
 * closed and rotates down (`data-[popup-open]`) while the menu is open, matching the Figma
 * "Dropdown" crumb's default and hover/open states. Because it already serves as the divider to the
 * next crumb, do NOT place a `BreadcrumbSeparator` after a menu crumb, or it renders a second,
 * redundant arrow. It's the `Dropdown`/`Menu` trigger `<button>`, so it keeps the menu's keyboard
 * a11y (Enter / ArrowDown to open) out of the box.
 */
export function BreadcrumbMenuTrigger({ icon, children, ...props }: BreadcrumbMenuTriggerProps) {
  return (
    <Menu.Trigger
      className={cx(
        crumbVariants({ interactive: true }),
        "group/trigger cursor-default data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
      )}
      {...props}
    >
      {icon != null ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-tertiary">
          {icon}
        </span>
      ) : null}
      {children}
      {/* Chevron points right when closed; when the menu is open it rotates 90° to
          point down (the Figma "Dropdown" hover/open state). RTL mirrors only the
          *closed* chevron so it points left along the mirrored trail — the open
          (rotated-down) chevron must not be mirrored, or it would point up. */}
      <ChevronRight
        className="size-3.5 shrink-0 text-icon-tertiary transition-transform group-data-popup-open/trigger:rotate-90 rtl:not-group-data-popup-open/trigger:-scale-x-100"
        aria-hidden="true"
      />
    </Menu.Trigger>
  );
}

export type BreadcrumbMenuContentProps = DropdownContentProps;

/**
 * The menu surface for a `BreadcrumbMenu` — propel's `DropdownContent`, portaled and positioned
 * under the crumb. Place `BreadcrumbMenuItem`s inside it.
 */
export function BreadcrumbMenuContent(props: BreadcrumbMenuContentProps) {
  return <DropdownContent {...props} />;
}

export type BreadcrumbMenuItemProps = DropdownItemProps;

/**
 * A row in a `BreadcrumbMenu` — propel's `DropdownItem`. Render a link inside it (via `render`) to
 * make the sibling crumb navigable. `variant` is required (the Dropdown row layout axis); use
 * `"default"` for the single-line sibling list.
 */
export function BreadcrumbMenuItem(props: BreadcrumbMenuItemProps) {
  return <DropdownItem {...props} />;
}
