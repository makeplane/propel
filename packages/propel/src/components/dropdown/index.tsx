import { Menu } from "@base-ui/react/menu";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Check, ChevronRight, Search } from "lucide-react";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import { NodeSlot } from "../../internal/node-slot";
import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";
import { CheckboxVisual } from "../checkbox/index";

/**
 * The dropdown menu root — a Base UI `Menu.Root`. Holds open state and wires the trigger to the
 * content. Compose it with `DropdownTrigger` + `DropdownContent`:
 *
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger>Open</DropdownTrigger>
 *   <DropdownContent>
 *     <DropdownItem label="Edit" />
 *     <DropdownSeparator />
 *     <DropdownItem label="Delete" />
 *   </DropdownContent>
 * </Dropdown>;
 * ```
 */
type BaseMenuRootProps = React.ComponentProps<typeof Menu.Root>;

export type DropdownProps = Omit<
  BaseMenuRootProps,
  "open" | "defaultOpen" | "onOpenChange" | "modal" | "children"
> & {
  /** Whether the menu is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the menu is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the menu opens or closes. */
  onOpenChange?: BaseMenuRootProps["onOpenChange"];
  /**
   * Modal behavior while open: `true` locks page scroll and blocks outside pointer interaction.
   *
   * @default false
   */
  modal?: BaseMenuRootProps["modal"];
  /** The trigger and menu surface (`DropdownTrigger`, `DropdownContent`). */
  children?: React.ReactNode;
};

export function Dropdown(props: DropdownProps) {
  return <Menu.Root {...props} />;
}

export type DropdownTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "style"
>;

/**
 * The element that opens the menu. Renders a `<button>` by default; pass `render` to project the
 * trigger onto your own element (e.g. an icon button).
 */
export function DropdownTrigger(props: DropdownTriggerProps) {
  return <Menu.Trigger {...props} />;
}

// The menu surface is the shared `OverlayPanel`: the deeper `overlay` shadow at `lg`
// radius, capped at the available height, with the sticky search/footer outside the
// scroll and the `role="menu"` list (`Menu.Popup`) scrolling inside it. `OverlayPanel`
// wraps the menu in a `ScrollArea` as an ancestor, so `Menu.Popup`'s direct children
// stay menuitems and the surface is ARIA-valid.
type DropdownContentWidth = OverlayPanelWidth;

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
   * Fixed menu width. `anchor` matches the trigger; `sm`/`md`/`lg` are the picker widths from Figma
   * (256 / 288 / 384px). @default "anchor"
   */
  width?: DropdownContentWidth;
  /**
   * A sticky `DropdownSearch` pinned above the list, _outside_ the `role="menu"` element so the
   * menu only contains menu items (ARIA `aria-required-children`).
   */
  search?: React.ReactNode;
  /**
   * A sticky `DropdownFooter` pinned below the list, _outside_ the `role="menu"` element (same ARIA
   * reasoning as `search`).
   */
  footer?: React.ReactNode;
};

/**
 * The menu surface. Bundles Base UI's `Portal` + `Positioner` + `Popup` so the menu renders in a
 * portal, positioned against the trigger, with propel's popover styling. Place
 * `DropdownItem`/`DropdownCheckboxItem`/`DropdownSeparator`/`DropdownGroup` as children — they
 * become the `role="menu"` list. Non-menuitem chrome (a search input, a footer note) must go
 * through the `search`/`footer` props so it sits outside the menu role and keeps the surface
 * ARIA-valid.
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
        <OverlayPanel elevation="overlay" radius="lg" width={width} header={search} footer={footer}>
          <Menu.Popup className="p-1 outline-none" {...props}>
            {children}
          </Menu.Popup>
        </OverlayPanel>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

// One row. `variant` is the Figma layout axis: `default` is a single line and
// `with-description` stacks a muted second line. `selected`/`disabled` are primitive
// state, not variants. Hover & keyboard-highlight share the subtle transparent
// overlay; disabled fades the row.
const dropdownItemVariants = cva(
  cx(
    // Items are 34px tall (Figma); `rounded-md` radius per design. `--node-size` sizes
    // the icons dropped into the inline-start/end node slots (16px), like Button.
    "group/item flex w-full gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "text-secondary",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      variant: {
        // Single-line rows: fixed 34px, content vertically centered.
        default: "h-[34px] items-center",
        // Two-line rows: 6px top padding (Figma) with the inline-start icon top-aligned
        // (align-start) so it sits with the first line; the row grows for the
        // description and keeps a matching 6px bottom.
        "with-description": "min-h-[34px] items-start py-1.5",
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
   * Row layout (required). `default` is a single line; `with-description` stacks a muted second
   * line under the label. Selected/disabled are state props, not variants.
   */
  variant: DropdownItemVariant;
  /**
   * Leading content before the label — an icon (sized to 16px), or a full-size control such as a
   * `Checkbox`, `Radio`, `Avatar`, or a color swatch. Single-select rows should use `selected`
   * instead. (Logical node slot, like Button's `inlineStartNode`.)
   */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Muted secondary line under the label (use with `variant="with-description"`). */
  description?: React.ReactNode;
  /**
   * Muted text shown inline after the label (e.g. a language's English name). Sits between the
   * label and the inline-end node, on the same line as the label.
   */
  secondaryText?: React.ReactNode;
  /**
   * Trailing content after the label — a `Badge` count, a keyboard shortcut, value text, or an icon
   * (sized to 16px). (Logical node slot, like Button's `inlineEndNode`.)
   */
  inlineEndNode?: React.ReactNode;
  /**
   * Single-select selected state: keeps the row's own icon and marks the selection with an
   * inline-end checkmark (the row's icon is never replaced). Distinct from the multi-select
   * `DropdownCheckboxItem`, which shows a `Checkbox` on every row.
   */
  selected?: boolean;
  /**
   * Row emphasis. `default` is a normal selectable row (highlights on hover/keyboard focus). `link`
   * is a "View all"-style affordance — a pointer cursor and no hover background. @default
   * "default"
   */
  emphasis?: DropdownItemEmphasis;
};

/**
 * A selectable menu row: an optional `inlineStartNode` (icon or full-size control) + label (+
 * optional description / inline secondary text / `inlineEndNode`) — all of it content, laid out by
 * `variant`. Closes the menu when clicked (Base UI default). Pass `selected` for the single-select
 * inline-end checkmark pattern.
 */
export function DropdownItem({
  variant,
  emphasis = "default",
  inlineStartNode,
  label,
  description,
  secondaryText,
  inlineEndNode,
  selected,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <Menu.Item className={dropdownItemVariants({ variant, emphasis })} {...props}>
      {/* The node slots size icons to `--node-size` (16px) and let full-size controls
          (Checkbox/Avatar/swatch) size themselves; the row's text color cascades. */}
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
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
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      {/* Selection is marked with an inline-end check — the row's own node is kept. */}
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
   * Leading content shown after the checkbox — an icon (16px), a color swatch, an `Avatar`, or a
   * priority glyph (Avatar for assignees, swatch for labels, etc.). (Logical node slot, like
   * Button's `inlineStartNode`.)
   */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content — typically value text or a count. (Logical node slot.) */
  inlineEndNode?: React.ReactNode;
};

/**
 * A toggleable multi-select menu row. The inline-start control is the propel `Checkbox` component
 * (driven by this row's Base UI checkbox-item state, so the box reflects
 * `checked`/`indeterminate`/`disabled` without owning its own state). The row keeps the
 * `role="menuitemcheckbox"` a11y semantics and stays open on click. Control it with `checked` +
 * `onCheckedChange`, or leave it uncontrolled with `defaultChecked`.
 */
export function DropdownCheckboxItem({
  inlineStartNode,
  label,
  inlineEndNode,
  checked,
  defaultChecked,
  onCheckedChange,
  children,
  ...props
}: DropdownCheckboxItemProps) {
  // Mirror the row's checked state so the visual propel Checkbox stays in sync for
  // both controlled (`checked`) and uncontrolled (`defaultChecked`) usage. The
  // shared `useControllableState` hook tracks the value internally only when
  // uncontrolled. Base UI's change event carries an extra `details` argument, so we
  // forward `onCheckedChange` straight from that handler (where both `next` and
  // `details` are in scope) and use the hook purely to mirror the visual state.
  const [isChecked, setChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
  });

  return (
    <Menu.CheckboxItem
      className={cx(
        "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(next, details) => {
        setChecked(next);
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
        <CheckboxVisual tone="neutral" checked={isChecked} disabled={props.disabled} />
      </span>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? (
        <span className="shrink-0 text-12 text-tertiary">{inlineEndNode}</span>
      ) : null}
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
 * Groups related items so a `DropdownLabel` can title them with the correct accessibility
 * relationship. Place a `DropdownLabel` first, then the items.
 */
export function DropdownGroup(props: DropdownGroupProps) {
  return <Menu.Group {...props} />;
}

export type DropdownLabelProps = Omit<
  React.ComponentProps<typeof Menu.GroupLabel>,
  "className" | "style"
> & {
  /**
   * Optional inline-end content on the heading row — e.g. a "View all" link or a count. Sits at the
   * end of the label line (the Figma "Dropdown header" inline-end slot).
   */
  inlineEndNode?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * A non-interactive section heading for a group of items (the Figma "Dropdown header": `text/12`,
 * `text/tertiary`, title-case). Must be rendered inside a `DropdownGroup`, as the first child, to
 * label the items that follow it. Pass `inlineEndNode` for an inline-end "View all" link or count.
 */
export function DropdownLabel({ inlineEndNode, children, ...props }: DropdownLabelProps) {
  return (
    <Menu.GroupLabel
      className="flex items-center gap-1.5 px-2 py-1.5 text-12 text-tertiary"
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {inlineEndNode != null ? <span className="shrink-0">{inlineEndNode}</span> : null}
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
 * A sticky search input pinned to the top of a `DropdownContent`. Use it as the first child of the
 * content for filterable menus (Status, Labels, Assignees, …). It keeps focus inside the menu and
 * does not steal Base UI's typeahead because it is a real text input. Drive filtering with `value`
 * + `onValueChange`.
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
 * A non-interactive footer pinned to the bottom of a `DropdownContent` — e.g. "Type to add a new
 * label." Render it as the last child of the content.
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
 * A submenu root. Wrap a `DropdownSubTrigger` + `DropdownSubContent` in it to nest a second menu
 * that opens from a row. Built on Base UI `Menu.SubmenuRoot`.
 */
type BaseSubmenuRootProps = React.ComponentProps<typeof Menu.SubmenuRoot>;

export type DropdownSubProps = Omit<
  BaseSubmenuRootProps,
  "open" | "defaultOpen" | "onOpenChange" | "children"
> & {
  /** Whether the submenu is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the submenu is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the submenu opens or closes. */
  onOpenChange?: BaseSubmenuRootProps["onOpenChange"];
  /** The submenu's trigger and nested content (`DropdownSubTrigger`, `DropdownSubContent`). */
  children?: React.ReactNode;
};

export function DropdownSub(props: DropdownSubProps) {
  return <Menu.SubmenuRoot {...props} />;
}

export type DropdownSubTriggerProps = Omit<
  React.ComponentProps<typeof Menu.SubmenuTrigger>,
  "className" | "style" | "label"
> & {
  /** Leading content before the label — an icon (16px) or control. (Logical node slot.) */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content before the chevron — e.g. a `Badge` count. (Logical node slot.) */
  inlineEndNode?: React.ReactNode;
};

/**
 * The row that opens a submenu. Looks like a `DropdownItem` with an inline-end chevron; pass
 * `inlineEndNode` for a count `Badge` before the chevron. Must be rendered inside a `DropdownSub`,
 * paired with a `DropdownSubContent`.
 */
export function DropdownSubTrigger({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: DropdownSubTriggerProps) {
  return (
    <Menu.SubmenuTrigger
      className={cx(
        "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      {...props}
    >
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      <ChevronRight
        className="size-4 shrink-0 text-icon-tertiary group-data-disabled/item:text-icon-disabled rtl:-scale-x-100"
        aria-hidden="true"
      />
    </Menu.SubmenuTrigger>
  );
}

/**
 * The floating surface for a submenu. Same styling as `DropdownContent` but defaults to opening to
 * the right (`side="right"`). Place submenu items inside it.
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
        <OverlayPanel elevation="overlay" radius="lg" width={width} header={search} footer={footer}>
          <Menu.Popup className="p-1 outline-none" {...props}>
            {children}
          </Menu.Popup>
        </OverlayPanel>
      </Menu.Positioner>
    </Menu.Portal>
  );
}
