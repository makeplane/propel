import { Menu } from "@base-ui/react/menu";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";

// The Figma "Toolbar" component has a single `variant` axis describing where the
// toolbar is placed (Figma: Floater / Pages - Topbar / Comments bottom bar). The
// variants differ in two ways: their *surface* and their *density*. Only the
// floater is a self-contained surface — a white `surface-1` card with a subtle
// border, `radius/lg` corners and an `Overlay-100` shadow — so it can hover over
// content. Topbar and bottom-bar sit flush inside an existing bar, so they're flat
// (no surface, no shadow) and are therefore visually identical to each other.
//
// Density differs too: the floater packs controls tighter (24px hit targets, a
// 14px chevron) while the topbar/bottom-bar are roomier (28px hit targets, a 16px
// chevron). Every placement shares the root `p-1.5` (6px) padding and `gap-2` (8px)
// item gap; clusters inside `ToolbarGroup`/`ToolbarToggleGroup` keep a tight
// `gap-0.5` (2px).
const toolbarVariants = cva("flex w-fit items-center gap-2 p-1.5 text-secondary", {
  variants: {
    variant: {
      floater: "rounded-lg border-sm border-subtle bg-surface-1 shadow-overlay-100",
      topbar: "",
      "bottom-bar": "",
    },
  },
  defaultVariants: {
    variant: "floater",
  },
});

export type ToolbarVariant = NonNullable<VariantProps<typeof toolbarVariants>["variant"]>;

// The density of a toolbar follows its placement: the `floater` is compact (24px
// hit targets), while `topbar`/`bottom-bar` are comfortable (28px). It's derived
// from `variant` and shared with the child controls (buttons, toggles, dropdown
// trigger) through context so they size themselves to match the root.
type ToolbarDensity = "compact" | "comfortable";

const DENSITY_BY_VARIANT: Record<ToolbarVariant, ToolbarDensity> = {
  floater: "compact",
  topbar: "comfortable",
  "bottom-bar": "comfortable",
};

const ToolbarDensityContext = React.createContext<ToolbarDensity>("compact");

export type ToolbarProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Root>,
  "className" | "render" | "style"
> & {
  /**
   * Where the toolbar is placed, which controls its surface and density. `floater`
   * (default) is a self-contained card with a border + shadow that hovers over
   * content and packs its controls tightly (24px). `topbar` and `bottom-bar` are
   * flat, sit flush inside an existing bar, and use the roomier 28px density.
   */
  variant?: ToolbarVariant;
};

/**
 * A row of controls — toggle buttons, button groups, dropdowns — for acting on a
 * selection or document (e.g. a rich-text formatting toolbar). Built on Base UI's
 * `Toolbar`, so arrow keys roam between items as a single tab stop and the root
 * carries `role="toolbar"`. Compose it from `ToolbarGroup`, `ToolbarButton`,
 * `ToolbarToggle`, `ToolbarSeparator` and `ToolbarDropdown`.
 */
export function Toolbar({ variant = "floater", ...props }: ToolbarProps) {
  return (
    <ToolbarDensityContext.Provider value={DENSITY_BY_VARIANT[variant]}>
      <BaseToolbar.Root className={toolbarVariants({ variant })} {...props} />
    </ToolbarDensityContext.Provider>
  );
}

export type ToolbarGroupProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Group>,
  "className" | "render" | "style"
>;

/**
 * Groups related controls (e.g. bold / italic / underline) so they read as one
 * cluster, with a small gap between them. Disabling the group disables every
 * control inside it.
 */
export function ToolbarGroup(props: ToolbarGroupProps) {
  return <BaseToolbar.Group className="flex items-center gap-0.5" {...props} />;
}

// Shared item styling: a square hit target with the secondary icon color, a
// transparent default background that fills in on hover/active, and a selected
// (pressed) background for the "on" state. `data-pressed` is set by Base UI's
// Toggle; disabled items dim and stop reacting to the pointer. The square size and
// the icon size follow the toolbar's density — `compact` is 24px with a 14px icon,
// `comfortable` is 28px with a 16px icon (Figma).
const itemVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center rounded-md",
    "bg-layer-transparent text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-[pressed]:bg-layer-transparent-selected data-[pressed]:text-icon-accent-primary",
    "disabled:pointer-events-none disabled:text-icon-disabled",
    "[&_svg]:shrink-0",
  ),
  {
    variants: {
      density: {
        compact: "size-6 [&_svg]:size-3.5",
        comfortable: "size-7 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      density: "compact",
    },
  },
);

export type ToolbarButtonProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Button>,
  "className" | "render" | "style"
> & {
  /**
   * Accessible name for the button. Required because the button's content is an
   * icon (icons are `aria-hidden`), so the control is still named for assistive tech.
   */
  "aria-label": string;
};

/**
 * A plain action button in the toolbar (e.g. insert link, insert image). Holds an
 * icon and therefore requires an `aria-label`. For an on/off control use
 * `ToolbarToggle` instead.
 */
export function ToolbarButton(props: ToolbarButtonProps) {
  const density = React.useContext(ToolbarDensityContext);
  return <BaseToolbar.Button className={itemVariants({ density })} {...props} />;
}

export type ToolbarToggleProps = Omit<
  React.ComponentProps<typeof Toggle>,
  "className" | "render" | "style"
> & {
  /**
   * Accessible name for the toggle. Required because toggles hold an icon
   * (`aria-hidden`); without it the control has no accessible name.
   */
  "aria-label": string;
};

/**
 * A two-state (pressed / not-pressed) button for formatting toggles like bold or
 * italic. Renders Base UI's `Toggle` inside a `Toolbar.Button`, so it both reports
 * `aria-pressed` and participates in toolbar keyboard navigation. Use `value` to
 * make it a member of a `ToolbarToggleGroup`.
 */
export function ToolbarToggle(props: ToolbarToggleProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button render={<Toggle />} className={itemVariants({ density })} {...props} />
  );
}

export type ToolbarToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroup>,
  "className" | "render" | "style"
> & {
  /** Allow more than one toggle in the group to be pressed at once. */
  multiple?: boolean;
};

/**
 * A set of `ToolbarToggle`s that share state — e.g. text-alignment where only one
 * of left / center / right is active at a time. Pass `multiple` to allow several
 * to be pressed simultaneously.
 */
export function ToolbarToggleGroup(props: ToolbarToggleGroupProps) {
  return <ToggleGroup className="flex items-center gap-0.5" {...props} />;
}

export type ToolbarSeparatorProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Separator>,
  "className" | "render" | "style"
>;

/**
 * A thin vertical rule that visually divides one cluster of controls from the
 * next (Figma `border/subtle-1`). Decorative; Base UI gives it the right role.
 */
export function ToolbarSeparator(props: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      className="mx-1 h-5 w-0 shrink-0 border-l-sm border-subtle-1"
      {...props}
    />
  );
}

// The dropdown trigger height and chevron size also follow the toolbar's density:
// `compact` is a 24px trigger with a 14px chevron, `comfortable` is a 28px trigger
// with a 16px chevron (Figma).
const dropdownTriggerVariants = cva(
  cx(
    "inline-flex shrink-0 items-center gap-1 rounded-md px-2",
    "bg-layer-transparent text-13 text-secondary outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-[popup-open]:bg-layer-transparent-selected",
    "disabled:pointer-events-none disabled:text-disabled",
  ),
  {
    variants: {
      density: {
        compact: "h-6",
        comfortable: "h-7",
      },
    },
    defaultVariants: {
      density: "compact",
    },
  },
);

const dropdownChevronVariants = cva("shrink-0 text-icon-secondary", {
  variants: {
    density: {
      compact: "size-3.5",
      comfortable: "size-4",
    },
  },
  defaultVariants: {
    density: "compact",
  },
});

export type ToolbarDropdownItem = {
  /** Stable identifier passed to `onValueChange` when this row is chosen. */
  value: string;
  /** Visible label for the row (e.g. "Heading 1", "Paragraph"). */
  label: React.ReactNode;
};

export type ToolbarDropdownProps = {
  /** Trigger content — typically a short label like "Text" or "Aa". */
  label: React.ReactNode;
  /** The selectable rows shown in the popup. */
  items: ToolbarDropdownItem[];
  /** Called with an item's `value` when it is chosen. */
  onValueChange?: (value: string) => void;
  /** Accessible name for the trigger button when `label` isn't descriptive enough. */
  "aria-label"?: string;
  /** Disable the trigger. */
  disabled?: boolean;
};

/**
 * A label + chevron trigger that opens a menu of choices — the Figma "Text" / "Aa"
 * style pickers. Built on Base UI's `Menu` with the trigger wired through
 * `Toolbar.Button` so it stays part of the toolbar's keyboard navigation.
 */
export function ToolbarDropdown({
  label,
  items,
  onValueChange,
  disabled,
  ...props
}: ToolbarDropdownProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <Menu.Root>
      <BaseToolbar.Button
        render={<Menu.Trigger />}
        disabled={disabled}
        className={dropdownTriggerVariants({ density })}
        {...props}
      >
        {label}
        <ChevronDown aria-hidden className={dropdownChevronVariants({ density })} />
      </BaseToolbar.Button>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6} className="z-50 outline-none">
          <Menu.Popup
            className={cx(
              "min-w-36 rounded-lg border-sm border-subtle bg-surface-1 p-1",
              "text-13 text-secondary shadow-overlay-100 outline-none",
            )}
          >
            {items.map((item) => (
              <Menu.Item
                key={item.value}
                onClick={() => onValueChange?.(item.value)}
                className={cx(
                  "flex cursor-default items-center rounded-md px-2 py-1.5 outline-none",
                  "data-[highlighted]:bg-layer-transparent-hover",
                )}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
