# @makeplane/propel

## 0.2.0

### Minor Changes

- ed3b525: Rework the button-family API (`Button`, `IconButton`, `SplitButton`, `ButtonGroup`,
  `AnchorButton`): merge `prominence` + `tone` into a single `variant` axis (`primary` /
  `secondary` / `tertiary` / `ghost` / `danger` / `danger-outline`), rename `magnitude` to `size`
  and `sizing` to `fillType`, replace `startIcon`/`endIcon` with one `icon` prop plus
  `iconPosition` (`"start"` default, `"end"` to trail — the `loading` spinner takes the same
  slot), and add explicit `disabled` and `type` (`"button"` default; `submit` / `reset`) props.
- 4dc5b95: Tighten component text props, add a decorative `Shortcut` component slot with `aria-keyshortcuts`
  examples on actionable controls, remove shortcut-specific menu element wrappers, and add an accent
  menu row tone for emphasized menu actions. Remove unused/story-only element exports, including
  group-label wrappers, popover anatomy wrappers, pass-through select scroll arrows, scroll-area
  content, tooltip shortcut, and the unused `initialsToneClass` avatar style-map export.

## 0.1.0

### Minor Changes

- c2f8888: First release of Plane's design system: styled `elements`, batteries-included `components` covering
  the full Base UI anatomy, and the design-token stylesheet. Built on Base UI and Tailwind CSS v4;
  every component ships with product-focused Storybook stories and behavior tests.
