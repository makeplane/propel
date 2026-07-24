---
"@makeplane/propel": minor
---

Rework the button-family API (`Button`, `IconButton`, `SplitButton`, `ButtonGroup`,
`AnchorButton`): merge `prominence` + `tone` into a single `variant` axis (`primary` /
`secondary` / `tertiary` / `ghost` / `danger` / `danger-outline`), rename `magnitude` to `size`
and `sizing` to `fillType`, replace `startIcon`/`endIcon` with one `icon` prop plus
`iconPosition` (`"start"` default, `"end"` to trail — the `loading` spinner takes the same
slot), and add explicit `disabled` and `type` (`"button"` default; `submit` / `reset`) props.
