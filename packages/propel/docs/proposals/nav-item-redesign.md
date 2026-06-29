# Proposal: introduce `List` / `ListItem`; absorb `nav-item`

Status: draft for design + engineering review
Affects: `@plane/propel` — new `ui/list` + `ui/list-item` (+ section label); removes/absorbs `ui/nav-item`
Author: (pending)

## Summary

`nav-item` models a sidebar row as a single polymorphic `useRender` **button** (`NavItem`) that bakes
in its icon, label, trailing content, an `open` chevron, and a custom `data-active`. Every real
design we have — workspace settings, the app sidebar in three states — shows a sidebar is an
**interactive list**: a `<ul>` of `<li>` rows, where a row _hosts_ a link (or a collapsible trigger)
plus optional sibling actions, and groups are `Collapsible`.

Base UI's _public_ primitives don't fit semantically (below), but its **`Composite`** engine — the
roving-focus base that `Toolbar` (`Toolbar.Button`/`Toolbar.Link`) and `Menu` (`Menu.Item`/
`Menu.LinkItem`) are built on — _is_ exactly the interactive-list pattern. So propel defines a generic
**`List` + `ListItem`** on top of `Composite`, and composes the sidebar from it. `nav-item`'s bespoke
pieces collapse onto that pattern + existing primitives; the genuinely-new part is the row chrome.

## Why it isn't `NavItem`/`navbar`/`NavigationMenu`

Base UI's nomenclature decides this:

- **`NavigationMenu`** (propel already wraps it) is the **floating flyout** menu-bar pattern —
  `Positioner`/`Popup`/`Portal`/`Viewport`/`Arrow`. Not a persistent sidebar.
- **`Menu`/`Menubar`** are dismissible **command popups** (`role="menu"`). A sidebar is persistent
  navigation, not a command surface.
- **`Toolbar`** is a button row.
- There is **no `List`, `Tree`, or `Sidebar`** in Base UI. `role="tree"` is explorer-style
  single-select keyboard nav — wrong for sidebar navigation.

What it is, semantically, is a `<ul role="list">` of `<li>` rows. "navbar" implies a horizontal bar;
this is a vertical list whose **primary** use is sidebars but which is reusable for any row list
(settings panels, command lists). So: **`List` + `ListItem`**, with navigation supplied by what you
compose inside (a link, the `<nav>` landmark).

## Built on Base UI `Composite` (the interactive-list engine)

Base UI _does_ ship this pattern — as the internal **`Composite`** primitive
(`@base-ui/react/internals/composite`: `CompositeRoot` + `CompositeItem`), the roving-tabindex engine
that **`Toolbar`** and **`Menu`** are built on. The element-per-item split we want is literally Base
UI's own convention:

|                     | `CompositeRoot` (one tab stop, arrow-key roving) | `CompositeItem` → `<button>` | `CompositeItem` → `<a>` |
| ------------------- | ------------------------------------------------ | ---------------------------- | ----------------------- |
| Toolbar             | `Toolbar.Root` (`role="toolbar"`)                | `Toolbar.Button`             | `Toolbar.Link`          |
| Menu                | `Menu`                                           | `Menu.Item`                  | `Menu.LinkItem`         |
| **List (proposed)** | **`List`**                                       | **`ListItemButton`**         | **`ListItemLink`**      |

So `List` builds on the same engine, and the link/button split (rule 6c) is Base UI's, not ours:

- **`List`** = a `CompositeRoot` (vertical, `loopFocus`) → roving-tabindex keyboard nav for free.
- **`ListItemLink`** = `CompositeItem` rendering `<a aria-current="page">` (render-capable for a
  router `<Link>`) — exactly `Toolbar.Link`/`Menu.LinkItem`.
- **`ListItemButton`** = `CompositeItem` rendering `<button>` — exactly `Toolbar.Button`/`Menu.Item`;
  this is what "More" uses.

**Tier placement.** `CompositeRoot`/`CompositeItem` live under `@base-ui/react/internals` (an exported
but lower-level path — it's what Base UI's own `Toolbar`/`Menu` import). So the `Composite` wrapper
belongs in propel's **`base`** tier (the slot for Base-UI-gap primitives, exposing `className`/
`render`), mirroring how `Toolbar.Root` wraps `CompositeRoot`; `ui/list` then styles it. Tradeoff to
flag: depending on `internals` is a less-stable surface than a top-level subpath.

**Open a11y decision.** `Composite` is role-agnostic (`Toolbar` layers `role="toolbar"` on top). A
collapsible, nested sidebar with roving focus is closest to an ARIA **tree** (`tree`/`treeitem`/
`group`); a flat settings list is closer to a `navigation` region of links. Which role(s) `List`
carries — and whether trailing actions are their own composite stops — needs an a11y pass.

## What the designs show

Four contexts, one anatomy:

| Context                 | Sections                                       | Row contents                       | States                              |
| ----------------------- | ---------------------------------------------- | ---------------------------------- | ----------------------------------- |
| Workspace settings      | **static** label groups + dividers             | icon + label                       | selected                            |
| App sidebar (default)   | **collapsible** (`Workspace`/`Projects`/`Try`) | icon/avatar + label, "… More" rows | —                                   |
| App sidebar (collapsed) | a section collapsed (chevron rotated)          | —                                  | **selected** row (filled)           |
| App sidebar (hover)     | —                                              | —                                  | row reveals a trailing **× action** |

Two facts decide the design:

1. **A row hosts more than one interactive thing.** The hover `×` sits _beside_ the label — invalid
   inside a single `<a>`/`<button>`. The row is a **container** with siblings. (`NavItemHeader`
   already proves this — it "holds a `NavItemHeaderToggle` … and an action **as siblings**".)
2. **Sections are `Collapsible`-or-static, same rows inside.**

## Principle

Translate the design's states to standard attributes (`aria-current`, `data-panel-open`,
`data-disabled`) and its pieces to existing primitives (`Collapsible`, `Anchor`, `Badge`, `Avatar`,
`IconButton`, `Separator`). Build only what's missing — here, the list container + the row chrome.

## Proposed anatomy

```
<nav aria-label="…">                       ← landmark supplied by the consumer/app
  header / "New work item"                 ← title + IconButton / Button — NOT list parts

  List  = CompositeRoot (roving vertical focus, loopFocus) — base wrapper over @base-ui/react/internals/composite
    │
    ├─ ListItem  (row wrapper, position:relative — chrome: hover + selected fill via :has, indent; not focusable)
    │     ├─ primary CompositeItem, STRETCHED (::after overlay covers the row → whole row clicks):
    │     │     ListItemLink   → <a aria-current="page"> (router <Link>)   like Toolbar.Link / Menu.LinkItem
    │     │     …or ListItemButton → <button>                              like Toolbar.Button / Menu.Item ("More")
    │     │     holds: one leading slot (icon OR Avatar) + label
    │     └─ trailing CompositeItem(s), FOREGROUND (z above the overlay, own their click area):
    │           IconButton (× / add) • Badge (count, non-interactive)
    │
    ├─ Collapsible                          ← every section; non-collapsible = degenerate (no trigger)
    │     CollapsibleTrigger → ListItem(section label + chevron ↻ data-panel-open  [+ IconButton action])
    │     CollapsiblePanel   → List → ListItem…   (nested)
    │
    └─ Separator                            ← divider
```

A non-collapsible section (settings today) is the same `Collapsible` shape without a trigger — so
settings can adopt collapse as it scales without a structural change.

### State → attribute (no custom props)

| State        | Today                                               | Proposed                                                                                 |
| ------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| current page | `active` → custom `data-active` (+ `aria-current`)  | `aria-current="page"` on the `Anchor`; `ListItem` fill via `:has([aria-current="page"])` |
| section open | `NavItemChevron` `open` prop + hand-set `data-open` | `Collapsible`'s `data-panel-open`; chevron rotates off it                                |
| hover        | the row button                                      | the `ListItem` container; trailing actions via `group-hover`                             |
| disabled     | —                                                   | `data-disabled` when needed                                                              |

## `nav-item` → `List`/`ListItem` mapping

| Today (13 `nav-item` parts)                             | Disposition                                                                   |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `NavItem` (`useRender` `<button>`)                      | **→ `ListItem`** (`<li>` container) + an `Anchor` child for the link          |
| `NavItemIcon`, `NavItemLabel`                           | **→ `ListItem` slots** (`ListItemIcon`/`ListItemLabel`)                       |
| `NavItemTrailing`                                       | **→ `ListItem` trailing slot** (now a real sibling region)                    |
| `NavItemCount`                                          | **drop → `Badge`** (confirmed in review)                                      |
| `NavItemChevron` (manual `open`)                        | **drop →** one chevron part riding `data-panel-open`                          |
| `NavItemGroup` / `NavItemPanel` / `NavItemHeaderToggle` | **drop →** Base UI `Collapsible` / `CollapsiblePanel` / `CollapsibleTrigger`  |
| `NavItemHeader`                                         | **→** the `CollapsibleTrigger`/static section header row (a `ListItem` shape) |
| `NavItemHeaderLabel`                                    | **→ section-label** part (serves both collapsible + static)                   |
| `NavItemHeaderIndicator`                                | **keep as the chevron** — already rides `data-panel-open` (the model)         |
| `NavItemHeaderAction`                                   | **→** a trailing `IconButton` sibling (same role for row hover actions)       |

### New vs reused

- **New:** `List` (`<ul>`), `ListItem` (`<li>` row chrome, `position:relative`), a section-label
  part, and the **stretched primary** — a row link/action carrying the leading slot + label, with an
  `::after` overlay covering the row. Per rule 6c the link and the action are two elements (`<a>` vs
  `<button>`), so the stretch + row-fill chrome lives in `internal/` and both depend on it; the link
  is built like `Anchor`/`AnchorButton` (default `<a>`, render-capable for the router `<Link>`) but
  carries the row's text, not the inline-link palette.
- **Reused as-is:** `Collapsible`, `Badge`, `Avatar`, `IconButton`, `Separator`, `Button`.

## Scope boundary

propel ships the **`List` primitives**. The full "Sidebar" region (header/footer, collapse-to-rail)
is app-level composition (propel's no-app-components stance) — propel may demo it in `patterns` and
stories, but does not ship a `Sidebar` component.

## Impact

- Breaking: `NavItem`\* parts are replaced by `List`/`ListItem` + Base UI `Collapsible` + existing
  primitives. Only in-repo consumers are stories, so migration is contained.
- a11y improves: real `aria-current` link; `aria-expanded` from `Collapsible`; hover actions are
  focusable siblings, not trapped in a button.

## Design decisions (from review)

1. **Whole-row click; buttons restrict their own area.** The entire row is the navigation target;
   where a row carries icon buttons (add, ×) that sub-area belongs to the button. → **stretched-link
   pattern**: `ListItem`'s primary element stretches (an `::after` overlay covering the row) so the
   whole row navigates, and trailing `IconButton`s are **foreground** (`z` above the overlay) and
   capture their own clicks.
2. **Count = `Badge`.** Drop `NavItemCount`, reuse `Badge` as-is.
3. **Sections may collapse — including settings — as it scales.** So **don't** build a separate
   "static section": model every section as a `Collapsible` (header `Trigger` + `Panel`); a
   non-collapsible section is the degenerate case (no trigger), built the same way, so settings can
   adopt collapse with no rebuild.
4. **"More" is a list row, "New work item" is a `Button`.** "More" opens the extended sidebar and is
   styled as a row, so it's a **`ListItem` whose primary element is a `<button>`** (an action, not a
   link) — same row chrome as nav rows (rule 6c: different element/semantics, same look). It is _not_
   a standalone Ghost `Button`: a Ghost button has button geometry (hug + its own padding) and
   wouldn't sit flush with the full-width, indented nav rows. "New work item" is a separate `Button`
   above the list.
5. **One leading slot, two ways.** A single `ListItemIcon` leading slot holds either a monochrome
   icon or an `Avatar`; the cva sizes it. No second slot.

Net new wrinkle from #1 + #4: `ListItem`'s primary clickable element is **either an `Anchor`
(`<a>`, navigation, `aria-current`) or a `Button` (`<button>`, action like "More")** — two elements
per rule 6c, sharing the stretched-row chrome, so that chrome goes to `internal/`.

## Next step

On sign-off: build `ui/list`, `ui/list-item` (+ the link/section-label parts), then a
`components` layer that composes the collapsible/static section shapes, and port the `nav-item`
stories onto it. Chevron, count, groups, panels, and active/open all resolve to existing primitives

- standard attributes.
