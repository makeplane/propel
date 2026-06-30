# Dismiss / close / clear → IconButton dedup — review list

`IconButton` (ui + the ready-made `components/icon-button`) is propel's canonical icon-only button:
`prominence` (primary/secondary/tertiary/ghost) · `tone` (neutral/danger) · `magnitude`
(**sm = 20px box / 14px glyph**, md = 24px / 16px, lg = 28px / 16px, xl = 32px / 20px); `aria-label`
required; glyph passed as `children`. Several dismiss/close/clear parts re-implement it instead of
composing it.

## Done

- **`BannerDismiss`** — removed. The `Banner` has no dismiss API (no `onDismiss`/`dismissLabel`); a
  dismiss is just a ghost `IconButton` the consumer renders in the `actions` slot.
- **`SearchClear`** — removed; `Search` / `ExpandableSearch` now render `IconButton` (ghost/neutral,
  sm → md by search size) for the clear action.

## To review next

These wrap a Base UI **behavior** (so they can't just be deleted) but their **styling** duplicates
`IconButton`. The fix is to strip the styling so each becomes a pure behavior wrapper (like
`DialogClose` already is) and graft it onto an `IconButton` via `render` —
`<IconButton … render={<ToastClose />}>`.

- **`ToastClose`** (`ui/toast`) — wraps `Toast.Close`. NOTE: the close button needs a **4px
  top/inline-end offset** (`inset-e-1 top-1`) in the toast corner — that positioning is toast layout,
  not the button, so the toast composition owns it.
- **`AutocompleteClear`** (`ui/autocomplete`) — wraps `Autocomplete.Clear` + a shared button cva.
- **`ComboboxClear`** (`ui/combobox`) — wraps `Combobox.Clear` + a shared button cva.
- **`BadgeDismiss`** (`ui/badge`) — a tiny inline dismiss (sized to the badge's `--node-size`,
  14–16px) — **below** `IconButton`'s 20px floor, so an `IconButton` won't fit an 18px badge. Needs a
  design call (shrink `IconButton`? keep `BadgeDismiss` as a distinct tiny control?).

## Keep as-is (already correct)

`DialogClose` / `DrawerClose` / `PopoverClose` / `AlertDialogClose` — pure Base UI behavior wrappers
with **no styling**; they are the intended `render` target of an `IconButton`
(`<IconButton render={<DialogClose />}>`). Not redundant.
