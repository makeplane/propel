import { cva, cx } from "class-variance-authority";

/**
 * The shared chrome for a list row's primary interactive element — the part that fills the row and
 * makes its content area click through. `ListItemLink` (`<a>`) and `ListItemButton` (`<button>`)
 * are different elements (rule 6c) but wear identical chrome, so it lives here (rule 4). A
 * transparent `::after` covers its own box; sibling actions/counts sit outside that box and keep
 * their own clicks. No own outline — the wrapping `ListItem` shows the focus ring. Inherits the
 * row's text.
 */
export const listItemPrimaryVariants = cva(
  cx(
    "relative flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-start outline-none",
    "after:absolute after:inset-0",
  ),
);
