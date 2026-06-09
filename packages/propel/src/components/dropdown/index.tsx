import { Menu } from "@base-ui/react/menu";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Check, ChevronRight, Search } from "lucide-react";
import * as React from "react";
import { CheckboxVisual } from "../checkbox/index";

/**
 * The dropdown menu root — a Base UI `Menu.Root`. Holds open state and wires the
 * trigger to the content. Compose it with `DropdownTrigger` + `DropdownContent`:
 *
 *   <Dropdown>
 *     <DropdownTrigger>Open</DropdownTrigger>
 *     <DropdownContent>
 *       <DropdownItem label="Edit" />
 *       <DropdownSeparator />
 *       <DropdownItem label="Delete" />
 *     </DropdownContent>
 *   </Dropdown>
 */
export const Dropdown = Menu.Root;
export type DropdownProps = React.ComponentProps<typeof Menu.Root>;

export type DropdownTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "style"
>;

/**
 * The element that opens the menu. Renders a `<button>` by default; pass `render`
 * to project the trigger onto your own element (e.g. an icon button).
 */
export function DropdownTrigger(props: DropdownTriggerProps) {
  return <Menu.Trigger {...props} />;
}

// The visible floating surface (`Positioner` child): white `surface-1`, overlay
// shadow, hairline border, small radius, and the scale/fade transition. The sticky
// search/footer and the scrollable `role="menu"` list (`Menu.Popup`) all live inside
// it, so non-menuitem chrome stays outside the menu role and the surface is
// ARIA-valid.
const dropdownSurfaceVariants = cva(
  cx(
    "flex max-h-(--available-height) flex-col overflow-hidden",
    "rounded-lg border border-subtle bg-surface-1 shadow-overlay-200 outline-none",
    "origin-(--transform-origin) transition-[transform,opacity]",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
  ),
  {
    variants: {
      // Fixed menu widths from the Figma demos: `anchor` matches the trigger
      // (`default`), the rest are the popup widths the design uses for picker menus.
      width: {
        anchor: "min-w-(--anchor-width)",
        sm: "w-64", // 256px — the standard picker menu (Status / Labels / …)
        md: "w-72", // 288px — display-options menus
        lg: "w-96", // 384px — the wide two-line "Description" menu
      },
    },
  },
);

type DropdownContentWidth = NonNullable<VariantProps<typeof dropdownSurfaceVariants>["width"]>;

export type DropdownContentProps = Omit<
  React.ComponentProps<typeof Menu.Popup>,
  "className" | "style"
> & {
  /** Which side of the trigger the menu opens toward. @default "bottom" */
  side?: React.ComponentProps<typeof Menu.Positioner>["side"];
  /** Distance in px between the trigger and the menu. @default 4 */
  sideOffset?: React.ComponentProps<typeof Menu.Positioner>["sideOffset"];
  /** Alignment of the menu relative to the trigger along `side`. @default "start" */
  align?: React.ComponentProps<typeof Menu.Positioner>["align"];
  /**
   * Fixed menu width. `anchor` matches the trigger; `sm`/`md`/`lg` are the picker
   * widths from Figma (256 / 288 / 384px). @default "anchor"
   */
  width?: DropdownContentWidth;
  /**
   * A sticky `DropdownSearch` pinned above the list, *outside* the `role="menu"`
   * element so the menu only contains menu items (ARIA `aria-required-children`).
   */
  search?: React.ReactNode;
  /**
   * A sticky `DropdownFooter` pinned below the list, *outside* the `role="menu"`
   * element (same ARIA reasoning as `search`).
   */
  footer?: React.ReactNode;
};

/**
 * The menu surface. Bundles Base UI's `Portal` + `Positioner` + `Popup` so the menu
 * renders in a portal, positioned against the trigger, with propel's popover styling.
 * Place `DropdownItem`/`DropdownCheckboxItem`/`DropdownSeparator`/`DropdownGroup` as
 * children — they become the `role="menu"` list. Non-menuitem chrome (a search input,
 * a footer note) must go through the `search`/`footer` props so it sits outside the
 * menu role and keeps the surface ARIA-valid.
 */
export function DropdownContent({
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  width,
  search,
  footer,
  ...props
}: DropdownContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} sideOffset={sideOffset} align={align} className="outline-none">
        <div className={dropdownSurfaceVariants({ width })}>
          {search}
          <Menu.Popup className="flex-1 overflow-y-auto p-1 outline-none" {...props}>
            {children}
          </Menu.Popup>
          {footer}
        </div>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

// One row. `variant` is the Figma layout axis: `default` is a single line,
// `with-description` stacks a muted second line, `with-value` reserves a trailing
// value column. `selected`/`disabled` are primitive state, not variants. Hover &
// keyboard-highlight share the subtle transparent overlay; disabled fades the row.
const dropdownItemVariants = cva(
  cx(
    // Items are 34px tall (Figma); `rounded-md` radius per design.
    "group/item flex w-full select-none gap-2 rounded-md px-2 text-13 outline-none",
    "text-secondary",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      variant: {
        // Single-line rows: fixed 34px, content vertically centered.
        default: "h-[34px] items-center",
        // Two-line rows: 6px top padding (Figma) with the leading icon top-aligned
        // (align-start) so it sits with the first line; the row grows for the
        // description and keeps a matching 6px bottom.
        "with-description": "min-h-[34px] items-start py-1.5",
        "with-value": "h-[34px] items-center",
      },
      // `default` is a normal selectable row (highlight on hover/keyboard). `link`
      // is a "View all"-style affordance: a pointer cursor and no hover background.
      emphasis: {
        default: "cursor-default data-highlighted:bg-layer-transparent-hover",
        link: "cursor-pointer",
      },
    },
  },
);

type DropdownItemVariant = NonNullable<VariantProps<typeof dropdownItemVariants>["variant"]>;
type DropdownItemEmphasis = NonNullable<VariantProps<typeof dropdownItemVariants>["emphasis"]>;

export type DropdownItemProps = Omit<
  React.ComponentProps<typeof Menu.Item>,
  "className" | "style" | "label"
> & {
  /**
   * Row layout (required). `default` is a single line; `with-description` stacks a
   * muted second line under the label; `with-value` reserves a trailing value slot.
   * Selected/disabled are state props, not variants.
   */
  variant: DropdownItemVariant;
  /** Leading content, typically an icon. Rendered before the label. */
  icon?: React.ReactNode;
  /**
   * Leading control rendered *before* the icon at full size (no icon box) — use
   * for a composed propel control such as a `Checkbox`, `Radio`, `Avatar`, or a
   * color swatch. Single-select rows should use `selected` instead.
   */
  leading?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Muted secondary line under the label (use with `variant="with-description"`). */
  description?: React.ReactNode;
  /**
   * Muted text shown inline after the label (e.g. a language's English name). Sits
   * between the label and any trailing value, on the same line.
   */
  secondaryText?: React.ReactNode;
  /** Trailing value text (use with `variant="with-value"`). */
  value?: React.ReactNode;
  /**
   * Trailing content after the value slot (e.g. a `Badge` count, a chevron, or a
   * keyboard shortcut). Use instead of (or alongside) `value` for rich content.
   */
  trailing?: React.ReactNode;
  /** Trailing content after the value slot, typically an icon or shortcut. */
  endIcon?: React.ReactNode;
  /**
   * Single-select selected state: keeps the row's own icon and marks the selection
   * with a trailing checkmark (the row's icon is never replaced). Distinct from the
   * multi-select `DropdownCheckboxItem`, which shows a `Checkbox` on every row.
   */
  selected?: boolean;
  /**
   * Row emphasis. `default` is a normal selectable row (highlights on hover/keyboard
   * focus). `link` is a "View all"-style affordance — a pointer cursor and no hover
   * background. @default "default"
   */
  emphasis?: DropdownItemEmphasis;
};

/**
 * A selectable menu row. Closes the menu when clicked (Base UI default). An item is
 * an optional leading control/icon + label (+ optional description / inline
 * secondary text / trailing value / badge / end icon) — all of it content, laid out
 * by `variant`. Pass `selected` for the single-select leading-checkmark pattern.
 */
export function DropdownItem({
  variant,
  emphasis = "default",
  icon,
  leading,
  label,
  description,
  secondaryText,
  value,
  trailing,
  endIcon,
  selected,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <Menu.Item className={dropdownItemVariants({ variant, emphasis })} {...props}>
      {leading != null ? <span className="flex shrink-0 items-center">{leading}</span> : null}
      {icon ? (
        // 16px icon centered in a 20px-tall box so it aligns with the first text line
        // even when the row is align-start (top-aligned) for a two-line layout.
        <span className="flex h-5 w-4 shrink-0 items-center justify-center text-icon-secondary group-data-disabled/item:text-icon-disabled">
          {icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate">{label ?? children}</span>
          {secondaryText != null ? (
            <span className="shrink-0 truncate text-12 text-tertiary group-data-disabled/item:text-disabled">
              {secondaryText}
            </span>
          ) : null}
        </span>
        {description != null ? (
          <span className="truncate text-12 text-tertiary group-data-disabled/item:text-disabled">
            {description}
          </span>
        ) : null}
      </span>
      {value != null ? <span className="shrink-0 text-12 text-tertiary">{value}</span> : null}
      {trailing != null ? <span className="flex shrink-0 items-center">{trailing}</span> : null}
      {endIcon ? (
        <span className="flex h-5 w-4 shrink-0 items-center justify-center text-icon-secondary group-data-disabled/item:text-icon-disabled">
          {endIcon}
        </span>
      ) : null}
      {/* Selection is marked with a trailing check — the row's own icon is kept. */}
      {selected ? (
        <span className="flex h-5 w-4 shrink-0 items-center justify-center">
          <Check className="size-4 text-icon-accent-primary" aria-hidden="true" />
        </span>
      ) : null}
    </Menu.Item>
  );
}

export type DropdownCheckboxItemProps = Omit<
  React.ComponentProps<typeof Menu.CheckboxItem>,
  "className" | "style" | "label"
> & {
  /**
   * Leading content shown after the checkbox — typically an icon, a color swatch,
   * an `Avatar`, or a priority glyph. Use it to compose the propel components a
   * multi-select demo calls for (Avatar for assignees, swatch for labels, etc.).
   */
  icon?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing value text. */
  value?: React.ReactNode;
};

/**
 * A toggleable multi-select menu row. The leading control is the propel `Checkbox`
 * component (driven by this row's Base UI checkbox-item state, so the box reflects
 * `checked`/`indeterminate`/`disabled` without owning its own state). The row keeps
 * the `role="menuitemcheckbox"` a11y semantics and stays open on click. Control it
 * with `checked` + `onCheckedChange`, or leave it uncontrolled with `defaultChecked`.
 */
export function DropdownCheckboxItem({
  icon,
  label,
  value,
  checked,
  defaultChecked,
  onCheckedChange,
  children,
  ...props
}: DropdownCheckboxItemProps) {
  // Mirror the row's checked state so the visual propel Checkbox stays in sync for
  // both controlled (`checked`) and uncontrolled (`defaultChecked`) usage. When
  // controlled, the prop is the source of truth; when uncontrolled, we track it
  // locally and forward changes through `onCheckedChange`.
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isChecked = isControlled ? checked : internalChecked;

  return (
    <Menu.CheckboxItem
      className={cx(
        "group/item flex h-[34px] w-full cursor-default select-none items-center gap-2 rounded-md px-2 text-13 outline-none",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(next, details) => {
        if (!isControlled) setInternalChecked(next);
        onCheckedChange?.(next, details);
      }}
      {...props}
    >
      {/*
        Compose the propel Checkbox *appearance* via its presentational sibling
        `CheckboxVisual` (a non-interactive `<span>`), so the row keeps a single
        interactive control (`role="menuitemcheckbox"`) and stays ARIA-valid — a real
        Checkbox here would be a `nested-interactive` violation. The row owns the
        toggle; the box just mirrors `isChecked`.
      */}
      <span className="flex shrink-0 items-center">
        <CheckboxVisual checked={isChecked} disabled={props.disabled} />
      </span>
      {icon ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-secondary group-data-disabled/item:text-icon-disabled">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {value != null ? <span className="shrink-0 text-12 text-tertiary">{value}</span> : null}
    </Menu.CheckboxItem>
  );
}

export type DropdownSeparatorProps = Omit<
  React.ComponentProps<typeof Menu.Separator>,
  "className" | "style"
>;

/** A thin divider between groups of items. */
export function DropdownSeparator(props: DropdownSeparatorProps) {
  return <Menu.Separator className="-mx-1 my-1 border-t border-subtle" {...props} />;
}

export type DropdownGroupProps = Omit<
  React.ComponentProps<typeof Menu.Group>,
  "className" | "style"
>;

/**
 * Groups related items so a `DropdownLabel` can title them with the correct
 * accessibility relationship. Place a `DropdownLabel` first, then the items.
 */
export function DropdownGroup(props: DropdownGroupProps) {
  return <Menu.Group {...props} />;
}

export type DropdownLabelProps = Omit<
  React.ComponentProps<typeof Menu.GroupLabel>,
  "className" | "style"
> & {
  /**
   * Optional trailing slot on the heading row — e.g. a "View all" link or a count.
   * Sits at the end of the label line (the Figma "Dropdown header" trailing slot).
   */
  action?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * A non-interactive section heading for a group of items (the Figma "Dropdown
 * header": `text/12`, `text/tertiary`, title-case). Must be rendered inside a
 * `DropdownGroup`, as the first child, to label the items that follow it. Pass
 * `action` for a trailing "View all" link or count.
 */
export function DropdownLabel({ action, children, ...props }: DropdownLabelProps) {
  return (
    <Menu.GroupLabel
      className="flex items-center gap-1.5 px-2 py-1.5 text-12 text-tertiary"
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {action != null ? <span className="shrink-0">{action}</span> : null}
    </Menu.GroupLabel>
  );
}

// A sticky search header for filterable menus — the Figma "Search-Dropdown" row.
// Pinned to the top of the popup (so it stays put while the list scrolls) on the
// surface-1 background with a hairline bottom border. Owns no state; pass `value`
// + `onValueChange` to filter the list in the parent story/component.
export type DropdownSearchProps = Omit<
  React.ComponentProps<"input">,
  "className" | "style" | "onChange" | "value" | "type"
> & {
  /** Current search text. */
  value?: string;
  /** Called with the new text on each keystroke. */
  onValueChange?: (value: string) => void;
  /** Placeholder text. @default "Search" */
  placeholder?: string;
};

/**
 * A sticky search input pinned to the top of a `DropdownContent`. Use it as the
 * first child of the content for filterable menus (Status, Labels, Assignees, …).
 * It keeps focus inside the menu and does not steal Base UI's typeahead because it
 * is a real text input. Drive filtering with `value` + `onValueChange`.
 */
export function DropdownSearch({
  value,
  onValueChange,
  placeholder = "Search",
  ...props
}: DropdownSearchProps) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-subtle bg-surface-1 px-3 py-2">
      <Search className="size-4 shrink-0 text-icon-tertiary" aria-hidden="true" />
      <input
        type="text"
        // Stop arrow/typeahead keys from being hijacked by the menu while typing,
        // but let Escape bubble so the menu can still close.
        onKeyDown={(event) => event.stopPropagation()}
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-13 text-secondary outline-none placeholder:text-placeholder"
        {...props}
      />
    </div>
  );
}

export type DropdownFooterProps = Omit<React.ComponentProps<"div">, "className" | "style">;

/**
 * A non-interactive footer pinned to the bottom of a `DropdownContent` — e.g.
 * "Type to add a new label." Render it as the last child of the content.
 */
export function DropdownFooter(props: DropdownFooterProps) {
  return (
    <div
      className="shrink-0 border-t border-subtle bg-layer-2 px-3 py-2 text-12 text-tertiary"
      {...props}
    />
  );
}

/**
 * A submenu root. Wrap a `DropdownSubTrigger` + `DropdownSubContent` in it to nest
 * a second menu that opens from a row. Built on Base UI `Menu.SubmenuRoot`.
 */
export const DropdownSub = Menu.SubmenuRoot;
export type DropdownSubProps = React.ComponentProps<typeof Menu.SubmenuRoot>;

export type DropdownSubTriggerProps = Omit<
  React.ComponentProps<typeof Menu.SubmenuTrigger>,
  "className" | "style" | "label"
> & {
  /** Leading content, typically an icon. */
  icon?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content before the chevron — e.g. a `Badge` count. */
  trailing?: React.ReactNode;
};

/**
 * The row that opens a submenu. Looks like a `DropdownItem` with a trailing chevron;
 * pass `trailing` for a count `Badge` before the chevron. Must be rendered inside a
 * `DropdownSub`, paired with a `DropdownSubContent`.
 */
export function DropdownSubTrigger({
  icon,
  label,
  trailing,
  children,
  ...props
}: DropdownSubTriggerProps) {
  return (
    <Menu.SubmenuTrigger
      className={cx(
        "group/item flex h-[34px] w-full cursor-default select-none items-center gap-2 rounded-md px-2 text-13 outline-none",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      {...props}
    >
      {icon ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-secondary group-data-disabled/item:text-icon-disabled">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {trailing != null ? <span className="flex shrink-0 items-center">{trailing}</span> : null}
      <ChevronRight
        className="size-4 shrink-0 text-icon-tertiary group-data-disabled/item:text-icon-disabled rtl:-scale-x-100"
        aria-hidden="true"
      />
    </Menu.SubmenuTrigger>
  );
}

/**
 * The floating surface for a submenu. Same styling as `DropdownContent` but defaults
 * to opening to the right (`side="right"`). Place submenu items inside it.
 */
export function DropdownSubContent({
  children,
  side = "right",
  sideOffset = 4,
  align = "start",
  width,
  search,
  footer,
  ...props
}: DropdownContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} sideOffset={sideOffset} align={align} className="outline-none">
        <div className={dropdownSurfaceVariants({ width })}>
          {search}
          <Menu.Popup className="flex-1 overflow-y-auto p-1 outline-none" {...props}>
            {children}
          </Menu.Popup>
          {footer}
        </div>
      </Menu.Positioner>
    </Menu.Portal>
  );
}
