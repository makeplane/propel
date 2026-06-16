import { Menu } from "@base-ui/react/menu";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { nodeSlotClass } from "../../internal/node-slot";
import { surfaceVariants } from "../../internal/surface";
import {
  Dropdown,
  DropdownContent,
  type DropdownContentProps,
  DropdownItem,
  type DropdownItemProps,
  type DropdownProps,
  DropdownSeparator,
  type DropdownSeparatorProps,
} from "../dropdown/index";

// A toolbar is described by two orthogonal axes — `elevation` and `density` — named
// for what they actually express rather than where the toolbar is placed (placement
// is the consumer's job, not a primitive's). The Figma "Toolbar" component models
// these as placements (Floater / Pages - Topbar / Comments bottom bar), but those
// collapse to combinations of the two axes here.
//
// `elevation`: whether the toolbar draws its own surface. `raised` is a
// self-contained card — a white `surface-1` fill with a subtle border, `radius/lg`
// corners and an `Overlay-100` shadow — so it can hover over content (the Figma
// floater). `flat` draws no surface and sits flush inside an existing bar (the Figma
// topbar / bottom-bar, which were visually identical).
const toolbarVariants = cva("flex w-fit items-center gap-2 p-1.5 text-secondary", {
  variants: {
    elevation: {
      raised: surfaceVariants({ elevation: "raised", radius: "lg" }),
      flat: "",
    },
  },
});

export type ToolbarElevation = NonNullable<VariantProps<typeof toolbarVariants>["elevation"]>;

// `density`: how tightly the controls pack. `compact` is 24px hit targets (a 14px
// chevron), `comfortable` is 28px (a 16px chevron). It's shared with the child
// controls (buttons, toggles, dropdown trigger) through context so they size
// themselves to match the root. Both axes share the root `p-1.5` (6px) padding and
// `gap-2` (8px) item gap; clusters inside `ToolbarGroup`/`ToolbarToggleGroup` keep a
// tight `gap-0.5` (2px).
export type ToolbarDensity = "compact" | "comfortable";

const ToolbarDensityContext = React.createContext<ToolbarDensity>("compact");

export type ToolbarProps = Omit<
  React.ComponentProps<typeof BaseToolbar.Root>,
  "className" | "render" | "style"
> & {
  /**
   * Whether the toolbar draws its own surface. `raised` is a self-contained card
   * with a border + shadow that hovers over content; `flat` draws no surface and
   * sits flush inside an existing bar. Independent of `density`.
   */
  elevation: ToolbarElevation;
  /**
   * How tightly the controls pack. `compact` is 24px hit targets, `comfortable` is
   * 28px. Independent of `elevation`, so a flat bar can still be compact.
   */
  density: ToolbarDensity;
};

/**
 * A row of controls — toggle buttons, button groups, dropdowns — for acting on a
 * selection or document (e.g. a rich-text formatting toolbar). Built on Base UI's
 * `Toolbar`, so arrow keys roam between items as a single tab stop and the root
 * carries `role="toolbar"`. Compose it from `ToolbarGroup`, `ToolbarButton`,
 * `ToolbarToggle`, `ToolbarSeparator` and `ToolbarDropdown`.
 */
export function Toolbar({ elevation, density, ...props }: ToolbarProps) {
  return (
    <ToolbarDensityContext.Provider value={density}>
      <BaseToolbar.Root className={toolbarVariants({ elevation })} {...props} />
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
// the icon node slot's `--node-size` follow the toolbar's density — `compact` is
// 24px with a 14px icon, `comfortable` is 28px with a 16px icon (Figma).
const itemVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center rounded-md",
    "bg-layer-transparent text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-[pressed]:bg-layer-transparent-selected data-[pressed]:text-icon-accent-primary",
    "disabled:pointer-events-none disabled:text-icon-disabled",
  ),
  {
    variants: {
      density: {
        compact: "size-6 [--node-size:0.875rem]",
        comfortable: "size-7 [--node-size:1rem]",
      },
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
export function ToolbarButton({ children, ...props }: ToolbarButtonProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button className={itemVariants({ density })} {...props}>
      <span aria-hidden className={nodeSlotClass}>
        {children}
      </span>
    </BaseToolbar.Button>
  );
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
export function ToolbarToggle({ children, ...props }: ToolbarToggleProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button render={<Toggle />} className={itemVariants({ density })} {...props}>
      <span aria-hidden className={nodeSlotClass}>
        {children}
      </span>
    </BaseToolbar.Button>
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
      className="mx-1 h-5 w-0 shrink-0 border-s-sm border-subtle-1"
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
    "bg-layer-transparent text-body-xs-regular text-secondary outline-none",
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
  },
);

const dropdownChevronVariants = cva("shrink-0 text-icon-secondary", {
  variants: {
    density: {
      compact: "size-3.5",
      comfortable: "size-4",
    },
  },
});

/**
 * The dropdown menu in a toolbar — the Figma "Text" / "Aa" style pickers. It IS
 * propel's `Dropdown` (Base UI `Menu`), so it composes from parts instead of a closed
 * `items[]` config: a `ToolbarDropdownTrigger` plus a `ToolbarDropdownContent` of
 * `ToolbarDropdownItem`s. That means a toolbar menu can do everything a `Dropdown`
 * can — per-row icons, selected/disabled rows, separators, submenus — and the trigger
 * renders through `Toolbar.Button`, so it stays part of the toolbar's roving keyboard
 * navigation.
 *
 * ```tsx
 * <ToolbarDropdown>
 *   <ToolbarDropdownTrigger aria-label="Text style">Text</ToolbarDropdownTrigger>
 *   <ToolbarDropdownContent>
 *     <ToolbarDropdownItem variant="default" onClick={() => setBlock("h1")}>Heading 1</ToolbarDropdownItem>
 *     <ToolbarDropdownItem variant="default" onClick={() => setBlock("p")}>Paragraph</ToolbarDropdownItem>
 *   </ToolbarDropdownContent>
 * </ToolbarDropdown>
 * ```
 */
export const ToolbarDropdown = Dropdown;
export type ToolbarDropdownProps = DropdownProps;

export type ToolbarDropdownTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "render" | "style"
>;

/**
 * The trigger that opens a `ToolbarDropdown`: a label + chevron. It renders through
 * `Toolbar.Button` (so it keeps the toolbar's roving focus) and `Menu.Trigger` (so it
 * opens the menu), and sizes to the toolbar's density. Pass an `aria-label` when the
 * label isn't descriptive on its own (e.g. the "Aa" font picker).
 */
export function ToolbarDropdownTrigger({ children, ...props }: ToolbarDropdownTriggerProps) {
  const density = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Button
      render={<Menu.Trigger />}
      className={dropdownTriggerVariants({ density })}
      {...props}
    >
      {children}
      <ChevronDown aria-hidden className={dropdownChevronVariants({ density })} />
    </BaseToolbar.Button>
  );
}

/**
 * The menu surface for a `ToolbarDropdown` — propel's `DropdownContent`, portaled and
 * positioned under the trigger. Place `ToolbarDropdownItem`s inside it.
 */
export const ToolbarDropdownContent = DropdownContent;
export type ToolbarDropdownContentProps = DropdownContentProps;

/**
 * A selectable row in a `ToolbarDropdown` — propel's `DropdownItem`. `variant` is
 * required (the row layout axis); use `"default"` for the single-line picker rows.
 */
export const ToolbarDropdownItem = DropdownItem;
export type ToolbarDropdownItemProps = DropdownItemProps;

/** A divider between groups of `ToolbarDropdownItem`s — propel's `DropdownSeparator`. */
export const ToolbarDropdownSeparator = DropdownSeparator;
export type ToolbarDropdownSeparatorProps = DropdownSeparatorProps;
