import { cva, cx } from "class-variance-authority";

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

/**
 * The row's primary link. A transparent `::after` covers its own flex box, so clicking anywhere in
 * the row's content area follows the link; any sibling actions or count sit outside that box and
 * keep their own clicks. No own outline — the wrapper shows the focus ring. Inherits the row's
 * text.
 */
export const listItemLinkVariants = cva(
  cx(
    "relative flex min-w-0 flex-1 items-center gap-2 text-start outline-none",
    "after:absolute after:inset-0",
  ),
);
export type ListItemLinkVariantProps = StrictVariantProps<typeof listItemLinkVariants>;

/** The row's icon slot — holds an icon or an Avatar, sized to `--node-size`. */
export const listItemIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center [--node-size:1rem] [&>svg]:size-4",
);
export type ListItemIconVariantProps = StrictVariantProps<typeof listItemIconVariants>;

/** The row label — fills the remaining width and truncates. */
export const listItemLabelVariants = cva("min-w-0 flex-1 truncate");
export type ListItemLabelVariantProps = StrictVariantProps<typeof listItemLabelVariants>;
