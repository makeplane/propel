import { Menu } from "@base-ui/react/menu";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import * as React from "react";

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

// The floating surface: Base UI `Popup` on white `surface-1` with the overlay
// shadow, a subtle hairline border, and a small radius — the Figma menu container.
// `origin-(--transform-origin)` + the open/closed data attributes drive a quick
// scale/fade so the menu grows from the side it's anchored to.
const dropdownContentVariants = cva(
  cx(
    "min-w-(--anchor-width) max-h-(--available-height) overflow-y-auto",
    "rounded-md border border-subtle bg-surface-1 p-1 shadow-overlay-200 outline-none",
    "origin-(--transform-origin) transition-[transform,opacity]",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
  ),
);

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
};

/**
 * The menu surface. Bundles Base UI's `Portal` + `Positioner` + `Popup` so the
 * menu renders in a portal, is positioned against the trigger, and carries propel's
 * popover styling. Place `DropdownItem`/`DropdownCheckboxItem`/`DropdownSeparator`/
 * `DropdownLabel` as children.
 */
export function DropdownContent({
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: DropdownContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} sideOffset={sideOffset} align={align} className="outline-none">
        <Menu.Popup className={dropdownContentVariants()} {...props}>
          {children}
        </Menu.Popup>
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
    "group/item flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 text-13 outline-none",
    "text-secondary",
    "data-highlighted:bg-layer-transparent-hover",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      variant: {
        default: "h-8",
        "with-description": "py-1.5",
        "with-value": "h-8",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type DropdownItemVariant = NonNullable<VariantProps<typeof dropdownItemVariants>["variant"]>;

export type DropdownItemProps = Omit<
  React.ComponentProps<typeof Menu.Item>,
  "className" | "style"
> & {
  /**
   * Row layout. `default` is a single line; `with-description` stacks a muted
   * second line under the label; `with-value` reserves a trailing value slot.
   * Selected/disabled are state props, not variants.
   * @default "default"
   */
  variant?: DropdownItemVariant;
  /** Leading content, typically an icon. Rendered before the label. */
  icon?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Muted secondary line under the label (use with `variant="with-description"`). */
  description?: React.ReactNode;
  /** Trailing value text (use with `variant="with-value"`). */
  value?: React.ReactNode;
  /** Trailing content after the value slot, typically an icon or shortcut. */
  endIcon?: React.ReactNode;
};

/**
 * A selectable menu row. Closes the menu when clicked (Base UI default). An item is
 * an optional leading icon + label (+ optional description / trailing value / end
 * icon) — all of it content, laid out by `variant`.
 */
export function DropdownItem({
  variant = "default",
  icon,
  label,
  description,
  value,
  endIcon,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <Menu.Item className={dropdownItemVariants({ variant })} {...props}>
      {icon ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-secondary group-data-disabled/item:text-icon-disabled">
          {icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">{label ?? children}</span>
        {description != null ? (
          <span className="truncate text-12 text-tertiary group-data-disabled/item:text-disabled">
            {description}
          </span>
        ) : null}
      </span>
      {value != null ? <span className="shrink-0 text-12 text-placeholder">{value}</span> : null}
      {endIcon ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-secondary group-data-disabled/item:text-icon-disabled">
          {endIcon}
        </span>
      ) : null}
    </Menu.Item>
  );
}

export type DropdownCheckboxItemProps = Omit<
  React.ComponentProps<typeof Menu.CheckboxItem>,
  "className" | "style"
> & {
  /** Leading content shown after the checkbox, typically an icon. */
  icon?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing value text. */
  value?: React.ReactNode;
};

/**
 * A toggleable menu row with a leading checkbox indicator. Use for multi-select
 * menus; it stays open on click (Base UI's checkbox-item default). Control it with
 * `checked` + `onCheckedChange`, or leave it uncontrolled with `defaultChecked`.
 */
export function DropdownCheckboxItem({
  icon,
  label,
  value,
  children,
  ...props
}: DropdownCheckboxItemProps) {
  return (
    <Menu.CheckboxItem
      className={cx(
        "group/item flex h-8 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 text-13 outline-none",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      {...props}
    >
      <span className="flex size-4 shrink-0 items-center justify-center text-icon-accent-primary group-data-disabled/item:text-icon-disabled">
        <Menu.CheckboxItemIndicator>
          <Check className="size-4" aria-hidden="true" />
        </Menu.CheckboxItemIndicator>
      </span>
      {icon ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-secondary group-data-disabled/item:text-icon-disabled">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {value != null ? <span className="shrink-0 text-12 text-placeholder">{value}</span> : null}
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
>;

/**
 * A non-interactive heading for a group of items. Must be rendered inside a
 * `DropdownGroup`, as the first child, to label the items that follow it.
 */
export function DropdownLabel(props: DropdownLabelProps) {
  return (
    <Menu.GroupLabel
      className="px-2 py-1.5 text-11 font-medium uppercase tracking-wide text-tertiary"
      {...props}
    />
  );
}
