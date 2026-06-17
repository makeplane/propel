import { useRender } from "@base-ui/react/use-render";
import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import { nodeSlotClass } from "../../internal/node-slot";

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
   * Leading content at the inline-start (e.g. a lucide icon), sized to 16px and `aria-hidden` (the
   * label is the accessible name). Logical node slot, matching Button/IconButton's
   * `inlineStartNode`.
   */
  inlineStartNode?: React.ReactNode;
  /**
   * Optional trailing content at the inline-end — typically a `NavItemCount` and/or a
   * `NavItemChevron`. Logical node slot, matching Button's `inlineEndNode`.
   */
  inlineEndNode?: React.ReactNode;
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
  inlineStartNode,
  inlineEndNode,
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
          {inlineStartNode ? (
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
              {inlineStartNode}
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate leading-snug font-medium">{children}</span>
          {inlineEndNode ? (
            <span className="flex shrink-0 items-center gap-2">{inlineEndNode}</span>
          ) : null}
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

// The Figma "Nav item / Header" component (node 2487-3138 default, 2487-3137 hover) is
// a section-title row that sits above a group of nav items: an emphasized group-title
// label, a small disclosure chevron that toggles the group open/closed, and an optional
// trailing action (e.g. an "add" icon button) at the inline-end.
//
//   • height   — 32px, matching NavItem.
//   • padding  — 8px (`spacing/2`) all round, `radius/lg` (8px) corners.
//   • label    — `font/body-xs/semibold` (text/13, weight 600), `text/tertiary` tone;
//                truncates with an ellipsis when it overflows.
//   • chevron  — a 16px filled caret-down glyph (the Figma "Accordion-open" toggle, a
//                solid triangle — not a stroked chevron) in `icon/secondary`, pointing
//                down when the group is expanded. It is a real collapse toggle, so it sits
//                next to the label inside the toggle button.
//   • action   — an optional `inlineEndNode` at the row's inline-end, for an IconButton
//                like "add". Because that control is interactive and the label/chevron are
//                a toggle button, the two cannot nest (a button inside a button is a
//                `nested-interactive` a11y violation), so the row is a plain container that
//                holds the toggle button and the action as siblings.
//   • surface  — transparent by default; `background/layer/transparent-hover` on hover.
//
// The label/chevron toggle renders as a `<button>` carrying `aria-expanded`. It supports
// both controlled (`expanded` + `onExpandedChange`) and uncontrolled (`defaultExpanded`)
// use, like other disclosure widgets. The label is the accessible name; the chevron is
// `aria-hidden` and mirrors under RTL.

// The row container. It is NOT interactive itself — it only lays out the toggle button and
// the optional inline-end action side by side and owns the hover surface so hovering
// anywhere on the row (including over the action) tints the whole row, matching Figma.
const navItemHeaderVariants = cva(
  cx(
    "group/nav-item-header flex h-8 w-full items-center gap-1 rounded-lg ps-2 pe-1 text-start",
    "bg-layer-transparent text-tertiary transition-colors",
    "select-none",
    // Tint the row on hover — but not when the *toggle* is disabled, so a disabled
    // header doesn't look interactive. Scoped to the direct-child toggle `<button>`
    // (via `>button`) so a disabled `inlineEndNode` action doesn't suppress it too.
    "hover:bg-layer-transparent-hover",
    "has-[>button:disabled]:hover:bg-transparent has-[>button[aria-disabled=true]]:hover:bg-transparent",
  ),
);

// The toggle button inside the row: it carries the label and the chevron, grows to fill
// the row so the whole title area is clickable, and owns the focus ring + disabled chrome.
const navItemHeaderToggleClass = cx(
  "flex min-w-0 flex-1 items-center gap-1 rounded-md py-2 text-start outline-none",
  "cursor-pointer text-inherit select-none",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
  "disabled:pointer-events-none disabled:text-disabled aria-disabled:pointer-events-none aria-disabled:text-disabled",
);

export type NavItemHeaderProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style" | "children"
> & {
  /** The section title. Truncates with an ellipsis when it overflows. */
  children: React.ReactNode;
  /**
   * The disclosure chevron glyph, sized to 16px. Figma uses a filled caret-down (a solid triangle),
   * so pass that glyph rather than a stroked chevron. Points down when the section is expanded and
   * rotates to point at the inline-start when collapsed. Mirrored under RTL.
   */
  chevron: React.ReactNode;
  /**
   * Optional trailing action at the row's inline-end — typically an `IconButton` such as an "add"
   * control. Rendered as a sibling of the toggle button (never nested) so the interactive action
   * does not sit inside the toggle `<button>`. Logical node slot, matching Button's
   * `inlineEndNode`.
   */
  inlineEndNode?: React.ReactNode;
  /**
   * Whether the section is expanded (controlled). Drives `aria-expanded` and the chevron rotation.
   * Pair with `onExpandedChange`. Omit to run uncontrolled via `defaultExpanded`.
   */
  expanded?: boolean;
  /** Initial expanded state when uncontrolled. Defaults to `true` (sections start open). */
  defaultExpanded?: boolean;
  /** Called with the next expanded state when the header is toggled. */
  onExpandedChange?: (expanded: boolean) => void;
};

/**
 * A sidebar section header row — an emphasized group title, a disclosure chevron that collapses the
 * section below it, and an optional inline-end action (e.g. an "add" IconButton). The title +
 * chevron are a `<button>` with `aria-expanded` (controlled via `expanded` + `onExpandedChange`, or
 * uncontrolled via `defaultExpanded`); the action is a sibling so it never nests inside that
 * button. The title is the accessible name. Faithful to Figma node 2487-3138.
 */
export function NavItemHeader({
  children,
  chevron,
  inlineEndNode,
  expanded,
  defaultExpanded = true,
  onExpandedChange,
  onClick,
  ...props
}: NavItemHeaderProps) {
  const [isExpanded, setExpanded] = useControllableState<boolean>({
    value: expanded,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange,
  });

  return (
    // `--node-size` (16px) sizes any raw glyph dropped into the inline-end action slot, the
    // same channel Button/IconButton use.
    <div className={cx(navItemHeaderVariants(), "[--node-size:1rem]")}>
      <button
        {...props}
        type="button"
        aria-expanded={isExpanded}
        className={navItemHeaderToggleClass}
        onClick={(event) => {
          // `disabled` already blocks the pointer; `aria-disabled` does not stop
          // keyboard activation, so bail explicitly to keep the section from toggling.
          if (event.currentTarget.getAttribute("aria-disabled") === "true") return;
          onClick?.(event);
          if (event.defaultPrevented) return;
          setExpanded(!isExpanded);
        }}
      >
        <span className="min-w-0 truncate text-body-xs-semibold">{children}</span>
        <span
          aria-hidden
          data-expanded={isExpanded ? "" : undefined}
          className={cx(
            "flex size-4 shrink-0 items-center justify-center text-icon-secondary [&>svg]:size-full",
            // The Figma glyph is a filled caret-down. Collapsed rotates it a quarter turn
            // so it points at the inline-start; RTL mirrors so it still points inward.
            "rotate-90 transition-transform data-[expanded]:rotate-0 rtl:-rotate-90 rtl:data-[expanded]:rotate-0",
          )}
        >
          {chevron}
        </span>
      </button>
      {inlineEndNode != null ? (
        <span className={cx(nodeSlotClass, "text-icon-secondary")}>{inlineEndNode}</span>
      ) : null}
    </div>
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
