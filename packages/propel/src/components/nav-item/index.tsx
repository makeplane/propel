import { useRender } from "@base-ui/react/use-render";
import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

// The Figma "Nav item" component (node 1329-396) is a single clickable sidebar row:
// a leading icon, a flexible label that truncates, and an optional trailing slot
// (a count chip and/or a disclosure chevron). It has three axes:
//
//   • magnitude — the Figma `magnitude` axis. `lg` uses text/14 (the default sidebar
//     row); `md` uses text/13 (the compact variant). Both are 32px tall.
//   • level     — the Figma `Level` axis (1–5): the nesting depth, which only adds
//     inline-start padding so children indent under their parent (8px per level).
//   • active    — the Figma `Selected` state, driven as a boolean prop rather than a
//     variant because it is a runtime selection, not a static style.
//
// The remaining Figma states are interaction states, expressed with CSS, not props:
//   - Default  → transparent surface, `text/secondary` label, `icon/placeholder` icons
//   - Hover    → `background/layer/transparent-hover`
//   - Pressed  → `background/layer/transparent-active`, `text/primary`
//   - Selected → `background/layer/transparent-selected`, `text/primary` (the `active` prop)
//
// It is polymorphic: it renders a `<button>` by default but accepts `render` (Base UI's
// `useRender`) so it can be an `<a>` link while staying accessible. The selected row is
// marked with `aria-current="page"`.

const navItemVariants = cva(
  cx(
    "group/nav-item flex h-8 w-full items-center gap-2 rounded-lg ps-2 pe-2 text-start",
    "bg-layer-transparent text-secondary transition-colors outline-none",
    "cursor-pointer select-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active active:text-primary",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    // Selected (Figma "Selected" state): filled surface + primary text.
    "data-[active]:bg-layer-transparent-selected data-[active]:text-primary",
    // Disabled: dimmed and non-interactive.
    "disabled:pointer-events-none disabled:text-disabled aria-disabled:pointer-events-none aria-disabled:text-disabled",
  ),
  {
    variants: {
      // The Figma `magnitude` axis. Only the label type size changes (lg 14px / md
      // 13px); both rows keep the 32px height and 8px spacing.
      magnitude: {
        lg: "text-14",
        md: "text-13",
      },
      // The Figma `Level` axis. Deeper levels add inline-start padding (8px per level)
      // so nested rows indent under their parent. Level 1 keeps the base `ps-2` (8px).
      level: {
        1: "",
        2: "ps-4", // 16px
        3: "ps-6", // 24px
        4: "ps-8", // 32px
        5: "ps-10", // 40px
      },
    },
  },
);

export type NavItemMagnitude = NonNullable<VariantProps<typeof navItemVariants>["magnitude"]>;
export type NavItemLevel = NonNullable<VariantProps<typeof navItemVariants>["level"]>;

export type NavItemProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> & {
  /** The row label. Truncates with an ellipsis when it overflows. */
  children: React.ReactNode;
  /** Size of the row label: `lg` (14px, default sidebar) or `md` (13px, compact). */
  magnitude: NavItemMagnitude;
  /**
   * Nesting depth (1–5). Higher levels indent the row further from the inline-start so children sit
   * under their parent. Defaults to `1`.
   */
  level?: NavItemLevel;
  /**
   * Whether this row is the current/selected item. Applies the selected surface and marks the
   * element with `aria-current="page"` for assistive tech.
   */
  active?: boolean;
  /**
   * Leading icon (e.g. a lucide icon), shown at the inline-start. Sized to 16px and `aria-hidden`
   * (the label is the accessible name). Named `leadingIcon` (not `icon`) to match Button/Input;
   * `trailing` already covers the inline-end.
   */
  leadingIcon?: React.ReactNode;
  /**
   * Optional trailing content placed after the label — typically a `NavItemCount` and/or a
   * `NavItemChevron`. Sits at the inline-end. A generic content slot (not just an icon), so it
   * stays `trailing` rather than `trailingIcon`.
   */
  trailing?: React.ReactNode;
};

/**
 * A single sidebar navigation row — a leading icon, a label, and an optional trailing slot (count /
 * chevron). Renders a `<button>` by default; pass `render={<a href=… />}` to make it a link while
 * keeping it keyboard- and screen-reader-accessible. Mark the current page with `active` (sets
 * `aria-current="page"`). Faithful to Figma node 1329-396.
 */
export function NavItem({
  children,
  magnitude,
  level = 1,
  active = false,
  leadingIcon,
  trailing,
  render,
  ...props
}: NavItemProps) {
  return useRender({
    render: render ?? <button type="button" />,
    props: {
      ...props,
      "aria-current": active ? "page" : undefined,
      className: navItemVariants({ magnitude, level }),
      children: (
        <>
          {leadingIcon ? (
            <span
              aria-hidden
              className={cx(
                "flex size-4 shrink-0 items-center justify-center text-icon-placeholder [&>svg]:size-full",
                // Selected/pressed pull the leading icon up to the primary tone.
                "group-active/nav-item:text-icon-primary group-data-[active]/nav-item:text-icon-primary",
                // Disabled dims the icon to match the dimmed label.
                "group-disabled/nav-item:text-icon-disabled group-aria-disabled/nav-item:text-icon-disabled",
              )}
            >
              {leadingIcon}
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate leading-snug font-medium">{children}</span>
          {trailing ? <span className="flex shrink-0 items-center gap-2">{trailing}</span> : null}
        </>
      ),
    },
    // The `active` prop is surfaced as `data-active` so the variants above (and the
    // leading-icon tone) can react to the selected state.
    state: { active },
    stateAttributesMapping: {
      active: (value) => (value ? { "data-active": "" } : null),
    },
  });
}

/**
 * A small count chip for a nav row's trailing slot (e.g. unread / item counts). Uses the Figma
 * count style: `layer-3` surface, `radius/sm` corners, `text/11`.
 */
export function NavItemCount({
  children,
  ...props
}: Omit<React.ComponentProps<"span">, "className" | "style">) {
  return (
    <span
      className={cx(
        "inline-flex min-w-4 items-center justify-center rounded-sm px-0.5",
        "bg-layer-3 text-11 leading-tight text-secondary",
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * The disclosure chevron for an expandable nav row. Decorative (`aria-hidden`); mirror any
 * directional rotation with the writing direction via the `open` prop. As a directional glyph it is
 * flipped under RTL with `rtl:-scale-x-100`.
 */
export function NavItemChevron({
  open = false,
  icon,
}: {
  /** Whether the row is expanded; rotates the chevron 180° when true. */
  open?: boolean;
  /** The chevron glyph (e.g. a lucide `ChevronDown`), sized to 16px. */
  icon: React.ReactNode;
}) {
  return (
    <span
      aria-hidden
      data-open={open ? "" : undefined}
      className={cx(
        "flex size-4 shrink-0 items-center justify-center text-icon-placeholder [&>svg]:size-full",
        "transition-transform data-[open]:rotate-180 rtl:-scale-x-100",
      )}
    >
      {icon}
    </span>
  );
}
