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

## To review next

Strip the styling to a pure behavior wrapper and compose with `IconButton` using the right render
direction (above).

- **`ComboboxClear`** (`ui/combobox`) — wraps `Combobox.Clear` (managed visibility, like Autocomplete)
  → **behavior-outer**. Check for a sibling `ComboboxTrigger` sharing the same cva (same treatment).
- **`ToastClose`** (`ui/toast`) — wraps `Toast.Close` (always present → **IconButton-outer**). NOTE:
  the close button needs a **4px top/inline-end offset** (`inset-e-1 top-1`) in the toast corner —
  that positioning is toast layout, not the button, so the toast composition owns it.
- **`BadgeDismiss`** (`ui/badge`) — a tiny inline dismiss (sized to the badge's `--node-size`,
  14–16px) — **below** `IconButton`'s 20px floor, so an `IconButton` won't fit an 18px badge. Needs a
  design call (shrink `IconButton`? keep `BadgeDismiss` as a distinct tiny control?).

## Keep as-is (already correct)

`DialogClose` / `DrawerClose` / `PopoverClose` / `AlertDialogClose` — pure Base UI behavior wrappers
with **no styling**; the intended IconButton-outer `render` target
(`<IconButton render={<DialogClose />}>`). Not redundant.
