import { Menu } from "@base-ui/react/menu";
import { cva, cx } from "class-variance-authority";
import { ChevronRight, Ellipsis } from "lucide-react";
import * as React from "react";

// A breadcrumb crumb is a small pill: 14px medium label on the neutral
// `text/tertiary` token, 4px horizontal padding, 6px radius, and a transparent
// background that fills with `background/layer/transparent-hover` on hover. The
// current page swaps the label to the stronger `text/primary` token. These map
// 1:1 to the Figma "Breadcrumb components" item (default / hover / current).
const crumbVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-1 text-14 font-medium leading-[1.54] text-tertiary",
  {
    variants: {
      // The hoverable crumbs (links, dropdown trigger) get the transparent-hover
      // background + stronger text on hover; the static current page does not.
      interactive: {
        true: "transition-colors hover:bg-layer-transparent-hover hover:text-primary",
        false: "",
      },
    },
    defaultVariants: { interactive: false },
  },
);

export type BreadcrumbProps = Omit<React.ComponentProps<"nav">, "className" | "style">;

/**
 * Breadcrumb trail: a `<nav aria-label="Breadcrumb">` wrapping an ordered list.
 * Compose the trail from `BreadcrumbItem`s — the number of crumbs is content the
 * consumer provides, not a prop.
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
 * The current page — the last, non-navigable crumb. Marked `aria-current="page"`
 * so assistive tech announces it, and styled with the stronger `text/primary` token.
 */
export function BreadcrumbPage(props: BreadcrumbPageProps) {
  return <span aria-current="page" className={cx(crumbVariants(), "text-primary")} {...props} />;
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
      {children ?? <ChevronRight className="size-3.5" />}
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
 * A collapsed/overflow crumb: an ellipsis trigger that opens a menu of the
 * crumbs hidden to save space. Built on Base UI's `Menu` so it's keyboard- and
 * screen-reader-accessible out of the box.
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
          "cursor-default data-[popup-open]:bg-layer-transparent-hover data-[popup-open]:text-primary",
        )}
        {...props}
      >
        <Ellipsis className="size-3.5" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="start" sideOffset={4}>
          <Menu.Popup className="min-w-32 rounded-md border-sm border-subtle bg-surface-2 p-1 text-14 text-secondary shadow-overlay-100 outline-none">
            {children}
          </Menu.Popup>
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
 * A single item inside `BreadcrumbDropdown` — a thin wrapper over Base UI's
 * `Menu.Item` with propel's menu-row styling. Render a link inside it (or pass
 * `render`) to make the collapsed crumb navigable.
 */
export function BreadcrumbDropdownItem(props: BreadcrumbDropdownItemProps) {
  return (
    <Menu.Item
      className="flex cursor-default items-center rounded-sm px-2 py-1 leading-[1.54] text-secondary outline-none select-none data-[highlighted]:bg-layer-transparent-hover data-[highlighted]:text-primary"
      {...props}
    />
  );
}
