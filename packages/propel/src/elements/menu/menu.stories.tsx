import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Check,
  ChevronDown,
  Circle,
  Copy,
  ExternalLink,
  FolderInput,
  Globe,
  Link2,
  Lock,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { expect } from "storybook/test";

import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import { Icon } from "../../internal/icon";
import { Shortcut } from "../../internal/shortcut";
import {
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuFooter,
  MenuItem,
  MenuItemContent,
  MenuItemControl,
  MenuItemDescription,
  MenuItemIndicator,
  MenuItemSecondaryText,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemEndContent,
  MenuLabel,
  MenuLabelMeta,
  MenuLabelTitle,
  MenuLinkItem,
  MenuPopup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSearch,
  MenuSearchInput,
  MenuSeparator,
  MenuSubmenuTrigger,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the menu semantics (`role="menu"`, `role="menuitem"`,
// `aria-checked`, …) and every visual state pinned statically via the `data-*` attributes Base UI's
// menu would set (`data-highlighted=""`, `data-disabled=""`, `data-popup-open=""`,
// `data-checked=""`/`data-unchecked=""` on the checkbox box, `data-selected=""` on the check
// indicator, `data-starting-style=""`/`data-ending-style=""` on the popup). The popup is just a
// styled div here, rendered inline instead of portaled/positioned. Grafting, keyboard, and aria
// behavior are demonstrated and tested in Components/Menu.
const meta = {
  title: "Elements/Menu",
  component: MenuPopup,
  subcomponents: {
    MenuItem,
    MenuItemContent,
    MenuItemTitleRow,
    MenuItemTitle,
    MenuItemSecondaryText,
    MenuItemDescription,
    MenuItemEndContent,
    MenuItemIndicator,
    MenuItemControl,
    MenuCheckboxItem,
    MenuCheckboxItemIndicator,
    MenuRadioItem,
    MenuRadioItemIndicator,
    MenuLinkItem,
    MenuSubmenuTrigger,
    MenuSeparator,
    MenuLabel,
    MenuLabelTitle,
    MenuLabelMeta,
    MenuSearch,
    MenuSearchInput,
    MenuFooter,
  },
  args: { elevation: "raised" },
} satisfies Meta<typeof MenuPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: `MenuPopup` › a labelled group (`MenuLabel` + `MenuItem`
 * rows of internal `Icon` + `MenuItemContent` › `MenuItemTitleRow` › `MenuItemTitle`), an
 * inline-end `MenuItemEndContent` shortcut, a `MenuSubmenuTrigger` row whose caret is the internal
 * `DisclosureIndicator` (`motion="pointEnd"`), `MenuSeparator` dividers, and a single-select row
 * whose inline-end check (`MenuItemIndicator`) shows via the pinned `data-selected=""`. The
 * "Duplicate" row pins `data-highlighted=""` — the state Base UI sets on the active row.
 */
export const Default: Story = {
  render: ({ elevation }) => (
    <div className="w-56">
      <MenuPopup elevation={elevation} role="menu">
        <div role="group" aria-labelledby="menu-elements-default-actions">
          <MenuLabel id="menu-elements-default-actions">
            <MenuLabelTitle>Actions</MenuLabelTitle>
          </MenuLabel>
          <MenuItem role="menuitem" layout="default" aria-keyshortcuts="Meta+E">
            <Icon tint="secondary">
              <Pencil />
            </Icon>
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Edit</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
            <MenuItemEndContent>
              <Shortcut aria-hidden>⌘E</Shortcut>
            </MenuItemEndContent>
          </MenuItem>
          <MenuItem role="menuitem" layout="default" data-highlighted="">
            <Icon tint="secondary">
              <Copy />
            </Icon>
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Duplicate</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
        </div>
        <MenuSeparator role="separator" />
        <MenuSubmenuTrigger role="menuitem" aria-haspopup="menu" aria-expanded={false}>
          <Icon tint="secondary">
            <FolderInput />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Move to</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
          <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </MenuSubmenuTrigger>
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Pinned</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
          <MenuItemIndicator data-selected="">
            <Check />
          </MenuItemIndicator>
        </MenuItem>
        <MenuSeparator role="separator" />
        <MenuItem role="menuitem" layout="default">
          <Icon tint="secondary">
            <Trash2 />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Delete</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
      </MenuPopup>
    </div>
  ),
};

/**
 * The popup's only variant axis — `elevation`. `raised` is the standalone surface: the shared
 * anchored-popup chrome (border, radius, `layer-1` fill, overlay shadow, animated transform origin)
 * plus the list padding and a minimum width. `flat` contributes only the padding — the variant the
 * components-tier `MenuContent` grafts inside its `OverlayPanel` shell, which already draws the
 * elevated, scrollable chrome; the bordered card here stands in for that shell.
 */
export const Elevations: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <MenuPopup elevation="raised" role="menu" aria-label="Raised elevation">
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Raised</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Standalone surface</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
      </MenuPopup>
      <div className="w-40 overflow-hidden rounded-lg border-sm border-subtle bg-layer-1 shadow-overlay-100">
        <MenuPopup elevation="flat" role="menu" aria-label="Flat elevation">
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Flat</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Padding only</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
        </MenuPopup>
      </div>
    </div>
  ),
};

/**
 * `MenuItem`'s `layout` axis and the row's text anatomy. `default` is the 34px single-line row:
 * `MenuItemTitleRow` baseline-aligns the `MenuItemTitle` with optional inline
 * `MenuItemSecondaryText`, and the inline-end holds a muted shortcut or a free-form
 * `MenuItemEndContent` slot. `with-description` is the taller, top-aligned row that stacks a
 * `MenuItemDescription` beneath the title (the components-tier ready-made derives this layout from
 * its `description` prop rather than exposing it).
 */
export const ItemLayouts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-72">
      <MenuPopup elevation="raised" role="menu" aria-label="Row layouts">
        <MenuItem role="menuitem" layout="default" aria-keyshortcuts="Meta+L">
          <Icon tint="secondary">
            <Link2 />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Copy link</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
          <MenuItemEndContent>
            <Shortcut aria-hidden>⌘L</Shortcut>
          </MenuItemEndContent>
        </MenuItem>
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Español</MenuItemTitle>
              <MenuItemSecondaryText>Spanish</MenuItemSecondaryText>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Assignees</MenuItemTitle>
              <MenuItemSecondaryText>5</MenuItemSecondaryText>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
        <MenuSeparator role="separator" />
        <MenuItem role="menuitem" layout="with-description">
          <Icon tint="secondary">
            <Lock />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Private</MenuItemTitle>
            </MenuItemTitleRow>
            <MenuItemDescription>Accessible only by invite</MenuItemDescription>
          </MenuItemContent>
          <MenuItemIndicator data-selected="">
            <Check />
          </MenuItemIndicator>
        </MenuItem>
        <MenuItem role="menuitem" layout="with-description">
          <Icon tint="secondary">
            <Globe />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Public</MenuItemTitle>
            </MenuItemTitleRow>
            <MenuItemDescription>
              Anyone in the workspace except Guests can join
            </MenuItemDescription>
          </MenuItemContent>
        </MenuItem>
      </MenuPopup>
    </div>
  ),
};

/**
 * Every pinnable state side by side:
 *
 * - **Row states** — resting; `data-highlighted=""` (the pointer/keyboard highlight);
 *   `data-disabled=""` + `aria-disabled` (dimmed, pointer-events off — the row's `group/item`
 *   marker also dims its `MenuItemSecondaryText` through `group-data-disabled/item`); a
 *   `MenuItemIndicator` with `data-selected=""` (the visible accent check) next to one without it
 *   (the check hides via `not-data-selected:invisible` but the slot keeps the gutter, matching Base
 *   UI's `keepMounted` graft).
 * - **Submenu trigger states** — closed; `data-popup-open=""` (the row keeps the hover fill while its
 *   submenu is open); disabled, where the `group/item` marker dims the caret.
 * - **Popup transition endpoints** — sibling popups pinned at `data-starting-style=""` and
 *   `data-ending-style=""` sit at the scaled/faded endpoint of the raised surface's open/close
 *   transition, so they render invisible on purpose.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="w-56">
        <MenuPopup elevation="raised" role="menu" aria-label="Row states">
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Resting</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
          <MenuItem role="menuitem" layout="default" data-highlighted="">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Highlighted</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
          <MenuItem role="menuitem" layout="default" data-disabled="" aria-disabled="true">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Disabled</MenuItemTitle>
                <MenuItemSecondaryText>Admins only</MenuItemSecondaryText>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Selected</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
            <MenuItemIndicator data-selected="">
              <Check />
            </MenuItemIndicator>
          </MenuItem>
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Unselected</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
            <MenuItemIndicator>
              <Check />
            </MenuItemIndicator>
          </MenuItem>
          <MenuSeparator role="separator" />
          <MenuSubmenuTrigger role="menuitem" aria-haspopup="menu" aria-expanded={false}>
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Submenu closed</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
            <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
              <ChevronDown />
            </DisclosureIndicator>
          </MenuSubmenuTrigger>
          <MenuSubmenuTrigger role="menuitem" aria-haspopup="menu" aria-expanded data-popup-open="">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Submenu open</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
            <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
              <ChevronDown />
            </DisclosureIndicator>
          </MenuSubmenuTrigger>
          <MenuSubmenuTrigger
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={false}
            data-disabled=""
            aria-disabled="true"
          >
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Submenu disabled</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
            <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
              <ChevronDown />
            </DisclosureIndicator>
          </MenuSubmenuTrigger>
        </MenuPopup>
      </div>
      <MenuPopup elevation="raised" role="menu" aria-label="Entering" data-starting-style="">
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Entering</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
      </MenuPopup>
      <MenuPopup elevation="raised" role="menu" aria-label="Exiting" data-ending-style="">
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Exiting</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
      </MenuPopup>
    </div>
  ),
};

/**
 * The selection row kinds. `MenuCheckboxItem` (`role="menuitemcheckbox"` + `aria-checked`) leads
 * with a `MenuItemControl` gutter holding the kept-mounted `MenuCheckboxItemIndicator` — the shared
 * 16px checkbox box: pinned `data-unchecked=""` it stays an empty bordered square (its glyph hides
 * via `data-unchecked:[&>*]:invisible`), pinned `data-checked=""` it fills with the accent, and
 * `data-disabled=""` (on the row and the box) flattens the fill. `MenuRadioItem` rows
 * (`role="menuitemradio"`, inside the plain `role="group"` Base UI's `RadioGroup` renders) show the
 * accent `MenuRadioItemIndicator` dot only while selected — Base UI unmounts the indicator
 * otherwise, so the unselected row renders the bare control slot.
 */
export const SelectionItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-56">
      <MenuPopup elevation="raised" role="menu">
        <div role="group" aria-labelledby="menu-elements-selection-notify">
          <MenuLabel id="menu-elements-selection-notify">
            <MenuLabelTitle>Notify me about</MenuLabelTitle>
          </MenuLabel>
          <MenuCheckboxItem role="menuitemcheckbox" aria-checked="true">
            <MenuItemControl>
              <MenuCheckboxItemIndicator data-checked="">
                <Check aria-hidden />
              </MenuCheckboxItemIndicator>
            </MenuItemControl>
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Comments</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuCheckboxItem>
          <MenuCheckboxItem role="menuitemcheckbox" aria-checked="false" data-highlighted="">
            <MenuItemControl>
              <MenuCheckboxItemIndicator data-unchecked="">
                <Check aria-hidden />
              </MenuCheckboxItemIndicator>
            </MenuItemControl>
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Mentions</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuCheckboxItem>
          <MenuCheckboxItem
            role="menuitemcheckbox"
            aria-checked="true"
            data-disabled=""
            aria-disabled="true"
          >
            <MenuItemControl>
              <MenuCheckboxItemIndicator data-checked="" data-disabled="">
                <Check aria-hidden />
              </MenuCheckboxItemIndicator>
            </MenuItemControl>
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Updates</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuCheckboxItem>
        </div>
        <MenuSeparator role="separator" />
        <div role="group" aria-labelledby="menu-elements-selection-layout">
          <MenuLabel id="menu-elements-selection-layout">
            <MenuLabelTitle>Layout</MenuLabelTitle>
          </MenuLabel>
          <MenuRadioItem role="menuitemradio" aria-checked="true">
            <MenuItemControl>
              <MenuRadioItemIndicator>
                <Circle aria-hidden />
              </MenuRadioItemIndicator>
            </MenuItemControl>
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>List</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuRadioItem>
          <MenuRadioItem role="menuitemradio" aria-checked="false">
            <MenuItemControl />
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Board</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuRadioItem>
        </div>
      </MenuPopup>
    </div>
  ),
};

/**
 * Navigation rows: `MenuLinkItem` renders a real `<a>` (`href`/`target` are native attributes)
 * wearing the same single-line row chrome as `MenuItem`, so destinations sit beside action rows.
 * The second link pins `data-highlighted=""`.
 */
export const LinkItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-56">
      <MenuPopup elevation="raised" role="menu">
        <MenuLinkItem role="menuitem" href="#work-item" target="_blank" rel="noopener noreferrer">
          <Icon tint="secondary">
            <ExternalLink />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Open in new tab</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuLinkItem>
        <MenuLinkItem role="menuitem" href="#activity" data-highlighted="">
          <Icon tint="secondary">
            <Link2 />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Go to activity</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuLinkItem>
        <MenuSeparator role="separator" />
        <MenuItem role="menuitem" layout="default" aria-keyshortcuts="Meta+C">
          <Icon tint="secondary">
            <Copy />
          </Icon>
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Copy link</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
          <MenuItemEndContent>
            <Shortcut aria-hidden>⌘C</Shortcut>
          </MenuItemEndContent>
        </MenuItem>
      </MenuPopup>
    </div>
  ),
};

/**
 * Heading rows plus the divider. `MenuLabel` lays a growing `MenuLabelTitle` against an inline-end
 * `MenuLabelMeta` (the components-tier `MenuLabel` fills it from its `meta` prop). `MenuSeparator`
 * spans the popup padding between the sections.
 */
export const Sections: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-56">
      <MenuPopup elevation="raised" role="menu">
        <div role="group" aria-labelledby="menu-elements-sections-sort">
          <MenuLabel id="menu-elements-sections-sort">
            <MenuLabelTitle>Sort</MenuLabelTitle>
          </MenuLabel>
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Date created</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Name</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
        </div>
        <MenuSeparator role="separator" />
        <div role="group" aria-labelledby="menu-elements-sections-recent">
          <MenuLabel id="menu-elements-sections-recent">
            <MenuLabelTitle>Recently viewed</MenuLabelTitle>
            <MenuLabelMeta>3</MenuLabelMeta>
          </MenuLabel>
          <MenuItem role="menuitem" layout="default">
            <MenuItemContent>
              <MenuItemTitleRow>
                <MenuItemTitle>Mobile app rollout</MenuItemTitle>
              </MenuItemTitleRow>
            </MenuItemContent>
          </MenuItem>
        </div>
      </MenuPopup>
    </div>
  ),
};

/**
 * The sticky chrome around the list: `MenuSearch` (the bordered search row — an internal `Icon`
 * glyph + the borderless `MenuSearchInput`) pins above the popup and `MenuFooter` below it. Both
 * sit OUTSIDE the `role="menu"` list, exactly as the components-tier `MenuContent` mounts them as
 * its shell's header/footer around a `flat` popup; the bordered card here stands in for that
 * `OverlayPanel` shell.
 */
export const SearchAndFooter: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-56 flex-col overflow-hidden rounded-lg border-sm border-subtle bg-layer-1 shadow-overlay-100">
      <MenuSearch>
        <Icon tint="tertiary" magnitude="md">
          <Search />
        </Icon>
        <MenuSearchInput type="text" aria-label="Search" placeholder="Search" />
      </MenuSearch>
      <MenuPopup elevation="flat" role="menu" aria-label="Statuses">
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Backlog</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
        <MenuItem role="menuitem" layout="default" data-highlighted="">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>Todo</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
        <MenuItem role="menuitem" layout="default">
          <MenuItemContent>
            <MenuItemTitleRow>
              <MenuItemTitle>In Progress</MenuItemTitle>
            </MenuItemTitleRow>
          </MenuItemContent>
        </MenuItem>
      </MenuPopup>
      <MenuFooter>Type to add another item.</MenuFooter>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-highlighted` row gains the hover fill, the `data-disabled` row swaps to the disabled text
 * color, `data-popup-open` keeps the submenu trigger filled, the `not-data-selected:invisible`
 * indicator hides only the unselected check, and the `data-starting-style`/`data-ending-style`
 * popups compute to opacity 0. Tagged out of the sidebar/docs/manifest while still running under
 * the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, canvasElement }) => {
    const rowStyle = (label: string) => {
      const row = canvas.getByText(label).closest('[role="menuitem"]');
      if (!(row instanceof HTMLElement)) throw new Error(`missing "${label}" row`);
      return getComputedStyle(row);
    };
    const indicatorStyle = (label: string) => {
      const indicator = canvas
        .getByText(label)
        .closest('[role="menuitem"]')
        ?.querySelector("[aria-hidden]");
      if (!(indicator instanceof HTMLElement)) throw new Error(`missing "${label}" indicator`);
      return getComputedStyle(indicator);
    };

    // `data-highlighted:bg-layer-transparent-hover` fills the highlighted row (and the
    // `data-popup-open` submenu trigger) away from the resting row's transparent background.
    await expect(rowStyle("Highlighted").backgroundColor).not.toBe(
      rowStyle("Resting").backgroundColor,
    );
    await expect(rowStyle("Submenu open").backgroundColor).not.toBe(
      rowStyle("Submenu closed").backgroundColor,
    );

    // `data-disabled:text-disabled` swaps the row's text color.
    await expect(rowStyle("Disabled").color).not.toBe(rowStyle("Resting").color);

    // `not-data-selected:invisible` hides only the indicator without `data-selected`.
    await expect(indicatorStyle("Selected").visibility).toBe("visible");
    await expect(indicatorStyle("Unselected").visibility).toBe("hidden");

    // `data-starting-style`/`data-ending-style` pin the popup at the faded transition endpoint.
    for (const selector of ["[data-starting-style]", "[data-ending-style]"]) {
      const popup = canvasElement.querySelector(selector);
      if (!(popup instanceof HTMLElement)) throw new Error(`missing pinned ${selector} popup`);
      await expect(getComputedStyle(popup).opacity).toBe("0");
    }
  },
};

/**
 * CSS canary (rule 2b): asserts the checkbox-box state selectors compiled — the `data-checked=""`
 * box paints the accent fill away from the `data-unchecked=""` box's transparent square, and the
 * unchecked box hides its glyph (`data-unchecked:[&>*]:invisible`). Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const SelectionItemsCanary: Story = {
  ...SelectionItems,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const box = (label: string) => {
      const el = canvas
        .getByText(label)
        .closest('[role="menuitemcheckbox"]')
        ?.querySelector("[data-checked], [data-unchecked]");
      if (!(el instanceof HTMLElement)) throw new Error(`missing "${label}" checkbox box`);
      return el;
    };

    // `data-checked:bg-accent-primary` fills the checked box away from the unchecked one.
    await expect(getComputedStyle(box("Comments")).backgroundColor).not.toBe(
      getComputedStyle(box("Mentions")).backgroundColor,
    );

    // `data-unchecked:[&>*]:invisible` hides the unchecked box's glyph.
    const glyph = box("Mentions").firstElementChild;
    if (glyph == null) throw new Error("missing unchecked glyph");
    await expect(getComputedStyle(glyph).visibility).toBe("hidden");
  },
};
