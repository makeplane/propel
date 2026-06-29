import { cva, cx } from "class-variance-authority";

import { listItemPrimaryVariants } from "../../internal/list-item-primary";
import { type StrictVariantProps } from "../../internal/variant-props";

/** The list container — a vertical stack of rows. Role/aria are supplied by the consumer. */
export const listVariants = cva("flex w-full flex-col gap-0.5");
export type ListVariantProps = StrictVariantProps<typeof listVariants>;

/**
 * A row wrapper. It owns the chrome (hover + selected fill + focus ring) and the layout, but is not
 * itself the focusable target — that's the `ListItemLink`/`ListItemButton` it wraps. Selected and
 * focus are read off descendants via `:has`, so the whole row reacts to its primary's state.
 */
export const listItemVariants = cva(
  cx(
    "group/list-item relative flex h-8 w-full items-center gap-2 rounded-lg px-2",
    "text-13 text-secondary transition-colors",
    "hover:bg-layer-transparent-hover",
    "has-[[aria-current=page]]:bg-layer-transparent-selected has-[[aria-current=page]]:text-primary",
    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-strong",
  ),
);
export type ListItemVariantProps = StrictVariantProps<typeof listItemVariants>;

// A row's primary — `ListItemLink` (`<a>`) and `ListItemButton` (`<button>`) — wears the shared
// row-primary chrome from `internal/list-item-primary` (rule 4); they differ only in the element
// they render (rule 6c).
export const listItemLinkVariants = listItemPrimaryVariants;
export type ListItemLinkVariantProps = StrictVariantProps<typeof listItemLinkVariants>;

export const listItemButtonVariants = listItemPrimaryVariants;
export type ListItemButtonVariantProps = StrictVariantProps<typeof listItemButtonVariants>;

/** The row's icon slot — holds an icon or an Avatar, sized to `--node-size`. */
export const listItemIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center [--node-size:1rem] [&>svg]:size-4",
);
export type ListItemIconVariantProps = StrictVariantProps<typeof listItemIconVariants>;

/** The row label — fills the remaining width and truncates. */
export const listItemLabelVariants = cva("min-w-0 flex-1 truncate");
export type ListItemLabelVariantProps = StrictVariantProps<typeof listItemLabelVariants>;

/**
 * A collapsible section's header — a small, muted heading that toggles the section, with the
 * chevron pushed to the inline-end edge of the row. Styled `Collapsible.Trigger`; carries the
 * `group` so a `CollapsibleTriggerIndicator` inside rotates off its `data-panel-open`.
 */
export const listSectionTriggerVariants = cva(
  cx(
    "group flex w-full items-center justify-between gap-1 rounded-md px-2 py-1 [--node-size:0.875rem]",
    "text-12 font-medium text-tertiary transition-colors",
    "cursor-pointer outline-none hover:text-secondary",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);
export type ListSectionTriggerVariantProps = StrictVariantProps<typeof listSectionTriggerVariants>;
