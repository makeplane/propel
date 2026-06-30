# Dismiss / close / clear → IconButton dedup — review list

`IconButton` (ui + the ready-made `components/icon-button`) is propel's canonical icon-only button:
`prominence` (primary/secondary/tertiary/ghost) · `tone` (neutral/danger) · `magnitude`
(**sm = 20px box / 14px glyph**, md = 24px / 16px, lg = 28px / 16px, xl = 32px / 20px); `aria-label`
required; glyph passed as `children`. Several dismiss/close/clear parts re-implement it instead of
composing it.

## Two render directions (important)

Whether `IconButton` is the **outer** element or the `render` **target** depends on whether the Base
UI behavior **manages its own focusability/visibility**:

- **Always-present behavior** (Dialog/Drawer/Popover/AlertDialog `Close`) → **IconButton outer**:
  `<IconButton render={<DialogClose />}>`. The styled primitive's className wins; nothing to preserve.
- **Managed-visibility behavior** (Autocomplete/Combobox `Clear` — sets `aria-hidden` and drops out
  of the tab order when the input is empty) → **behavior outer**:
  `<AutocompleteClear render={<IconButton …/>} />`. The behavior stays the element so Base UI's
  managed `aria-hidden`/`tabindex` survive; `IconButton` only customizes the look. The other way makes
  the empty-state Clear a focusable `aria-hidden` button → axe `aria-hidden-focus` failure.

## Done

- **`BannerDismiss`** — removed. The `Banner` has no dismiss API (no `onDismiss`/`dismissLabel`); a
  dismiss is just a ghost `IconButton` the consumer renders in the `actions` slot.
- **`SearchClear`** — removed; `Search` / `ExpandableSearch` now render `IconButton` (ghost/neutral,
  sm → md by search size) for the clear action.
- **`AutocompleteClear` / `AutocompleteTrigger`** — destyled to pure behavior wrappers; the field +
  stories render them behavior-outer (`<AutocompleteClear render={<IconButton …/>} />`,
  ghost/neutral/md). `autocompleteButtonVariants` and the obsolete components-tier wrappers deleted.
- **`ComboboxClear` / `ComboboxTrigger`** — same as autocomplete (behavior-outer, ghost/neutral/md).
  `comboboxButtonVariants` and the obsolete components-tier wrappers deleted.
- **`NumberFieldIncrement` / `NumberFieldDecrement`** — destyled to behavior wrappers; the stepper
  renders `IconButton` behavior-outer (magnitude passed through, `−`/`+` glyphs). `numberFieldButtonVariants`
  and the `NumberFieldButtonIcon` slot deleted.
- **`ToastClose`** — destyled to a behavior wrapper; the close is now an `IconButton` (ghost/neutral/sm,
  IconButton-outer). Its `absolute inset-e-1 top-1` **4px corner offset** moved to a new `ToastCloseSlot`
  ui part (position is toast layout; chrome is the IconButton). `toastCloseVariants` deleted.

## Deleted

- **`BadgeDismiss`** (`ui/badge`) — removed as non-canonical. The badge spec is two symmetric node
  slots (`inlineStartNode` / `inlineEndNode`), not a dismiss button — so the part, its
  `badgeDismissVariants` cva, the exports, and the UI/Badge `WithDismiss` story are all gone.

## Keep as-is (already correct)

`DialogClose` / `DrawerClose` / `PopoverClose` / `AlertDialogClose` — pure Base UI behavior wrappers
with **no styling**; the intended IconButton-outer `render` target
(`<IconButton render={<DialogClose />}>`). Not redundant.
