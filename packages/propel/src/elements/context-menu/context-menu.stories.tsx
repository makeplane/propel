import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Check,
  ChevronDown,
  ClipboardPaste,
  Copy,
  Dot,
  ExternalLink,
  FolderInput,
  Link2,
  Scissors,
  Trash2,
} from "lucide-react";
import { expect } from "storybook/test";

import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import { Icon } from "../../internal/icon";
import {
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  ContextMenuLinkItem,
  ContextMenuPopup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuSeparator,
  ContextMenuSubmenuTrigger,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the menu semantics (`role="menu"`, `role="menuitem"`,
// `aria-checked`, …) and every visual state pinned statically via the `data-*` attributes Base UI's
// context menu would set (`data-highlighted=""`, `data-disabled=""`, `data-popup-open=""`,
// `data-selected=""` on indicators, `data-starting-style=""`/`data-ending-style=""` on the popup).
// The popup is just a styled div here, rendered inline instead of portaled/positioned. Grafting,
// keyboard, and aria behavior are demonstrated and tested in Components/ContextMenu.
const meta = {
  title: "Elements/ContextMenu",
  component: ContextMenuPopup,
  subcomponents: {
    ContextMenuItem,
    ContextMenuItemLabel,
    ContextMenuItemShortcut,
    ContextMenuItemIndicator,
    ContextMenuCheckboxItem,
    ContextMenuCheckboxItemIndicator,
    ContextMenuRadioItem,
    ContextMenuRadioItemIndicator,
    ContextMenuLinkItem,
    ContextMenuSubmenuTrigger,
    ContextMenuSeparator,
    ContextMenuGroupLabel,
  },
} satisfies Meta<typeof ContextMenuPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: `ContextMenuPopup` › a labelled group
 * (`ContextMenuGroupLabel` + `ContextMenuItem` rows of internal `Icon` + `ContextMenuItemLabel` +
 * `ContextMenuItemShortcut`), a `ContextMenuSubmenuTrigger` row whose trailing caret is the
 * internal `DisclosureIndicator` (`motion="pointEnd"`), `ContextMenuSeparator` dividers, a
 * single-select row whose trailing check (`ContextMenuItemIndicator`) shows via the pinned
 * `data-selected=""`, and a `tone="danger"` row. The "Copy" row pins `data-highlighted=""` — the
 * state Base UI sets on the row under the pointer.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: true },
    a11y: {
      // Pinning hover/disabled state attributes makes axe evaluate visuals it never sees live
      // (it does not test :hover, and WCAG 1.4.3 exempts disabled controls). The tertiary-text-
      // on-hover-fill contrast is a design-token question flagged for the design pass, not a
      // story bug.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
  render: () => (
    <ContextMenuPopup role="menu">
      <div role="group" aria-labelledby="context-menu-elements-default-actions">
        <ContextMenuGroupLabel id="context-menu-elements-default-actions">
          Actions
        </ContextMenuGroupLabel>
        <ContextMenuItem role="menuitem" tone="neutral">
          <Icon>
            <Scissors />
          </Icon>
          <ContextMenuItemLabel>Cut</ContextMenuItemLabel>
          <ContextMenuItemShortcut>⌘X</ContextMenuItemShortcut>
        </ContextMenuItem>
        <ContextMenuItem role="menuitem" tone="neutral" data-highlighted="">
          <Icon>
            <Copy />
          </Icon>
          <ContextMenuItemLabel>Copy</ContextMenuItemLabel>
          <ContextMenuItemShortcut>⌘C</ContextMenuItemShortcut>
        </ContextMenuItem>
        <ContextMenuItem role="menuitem" tone="neutral">
          <Icon>
            <ClipboardPaste />
          </Icon>
          <ContextMenuItemLabel>Paste</ContextMenuItemLabel>
          <ContextMenuItemShortcut>⌘V</ContextMenuItemShortcut>
        </ContextMenuItem>
      </div>
      <ContextMenuSeparator role="separator" />
      <ContextMenuSubmenuTrigger
        role="menuitem"
        tone="neutral"
        aria-haspopup="menu"
        aria-expanded={false}
      >
        <Icon>
          <FolderInput />
        </Icon>
        <ContextMenuItemLabel>Move to</ContextMenuItemLabel>
        <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
          <ChevronDown />
        </DisclosureIndicator>
      </ContextMenuSubmenuTrigger>
      <ContextMenuItem role="menuitem" tone="neutral">
        <ContextMenuItemLabel>Pinned</ContextMenuItemLabel>
        <ContextMenuItemIndicator data-selected="">
          <Check />
        </ContextMenuItemIndicator>
      </ContextMenuItem>
      <ContextMenuSeparator role="separator" />
      <ContextMenuItem role="menuitem" tone="danger">
        <Icon>
          <Trash2 />
        </Icon>
        <ContextMenuItemLabel>Delete</ContextMenuItemLabel>
      </ContextMenuItem>
    </ContextMenuPopup>
  ),
};

const TONES = ["neutral", "danger"] as const;

/**
 * The only variant axis: `tone`, on both row parts (`ContextMenuItem` and
 * `ContextMenuSubmenuTrigger`). `neutral` rows use the standard text hierarchy; `danger` rows use
 * the error palette. Each popup pins the same three row states so the tones compare like for like:
 * resting, `data-highlighted=""`, and `data-disabled=""` (which collapses both tones to the
 * disabled color).
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {TONES.map((tone) => (
        <ContextMenuPopup key={tone} role="menu" aria-label={`${tone} tone`}>
          <ContextMenuItem role="menuitem" tone={tone}>
            <ContextMenuItemLabel>Resting</ContextMenuItemLabel>
          </ContextMenuItem>
          <ContextMenuItem role="menuitem" tone={tone} data-highlighted="">
            <ContextMenuItemLabel>Highlighted</ContextMenuItemLabel>
          </ContextMenuItem>
          <ContextMenuItem role="menuitem" tone={tone} data-disabled="" aria-disabled="true">
            <ContextMenuItemLabel>Disabled</ContextMenuItemLabel>
          </ContextMenuItem>
          <ContextMenuSeparator role="separator" />
          <ContextMenuSubmenuTrigger
            role="menuitem"
            tone={tone}
            aria-haspopup="menu"
            aria-expanded={false}
          >
            <ContextMenuItemLabel>Submenu trigger</ContextMenuItemLabel>
            <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
              <ChevronDown />
            </DisclosureIndicator>
          </ContextMenuSubmenuTrigger>
        </ContextMenuPopup>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state side by side:
 *
 * - **Row states** — resting; `data-highlighted=""` (the pointer/keyboard highlight);
 *   `data-disabled=""` + `aria-disabled` (dimmed, pointer-events off); a `ContextMenuItemIndicator`
 *   with `data-selected=""` (visible accent check) next to one without it (the check hides via
 *   `not-data-selected:invisible` but the slot keeps the gutter, matching Base UI's
 *   `keepMounted`).
 * - **Submenu trigger states** — closed; `data-popup-open=""` (the row keeps the highlight chrome
 *   while its submenu is open); disabled, where the trigger's `group/item` marker dims the caret
 *   through `group-data-disabled/item`.
 * - **Popup transition endpoints** — sibling popups pinned at `data-starting-style=""` and
 *   `data-ending-style=""` sit at the scaled/faded endpoint of the open/close transition, so they
 *   render invisible on purpose.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <ContextMenuPopup role="menu" aria-label="Row states">
        <ContextMenuItem role="menuitem" tone="neutral">
          <ContextMenuItemLabel>Resting</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuItem role="menuitem" tone="neutral" data-highlighted="">
          <ContextMenuItemLabel>Highlighted</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuItem role="menuitem" tone="neutral" data-disabled="" aria-disabled="true">
          <ContextMenuItemLabel>Disabled</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuItem role="menuitem" tone="neutral">
          <ContextMenuItemLabel>Selected</ContextMenuItemLabel>
          <ContextMenuItemIndicator data-selected="">
            <Check />
          </ContextMenuItemIndicator>
        </ContextMenuItem>
        <ContextMenuItem role="menuitem" tone="neutral">
          <ContextMenuItemLabel>Unselected</ContextMenuItemLabel>
          <ContextMenuItemIndicator>
            <Check />
          </ContextMenuItemIndicator>
        </ContextMenuItem>
        <ContextMenuSeparator role="separator" />
        <ContextMenuSubmenuTrigger
          role="menuitem"
          tone="neutral"
          aria-haspopup="menu"
          aria-expanded={false}
        >
          <ContextMenuItemLabel>Submenu closed</ContextMenuItemLabel>
          <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </ContextMenuSubmenuTrigger>
        <ContextMenuSubmenuTrigger
          role="menuitem"
          tone="neutral"
          aria-haspopup="menu"
          aria-expanded
          data-popup-open=""
        >
          <ContextMenuItemLabel>Submenu open</ContextMenuItemLabel>
          <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </ContextMenuSubmenuTrigger>
        <ContextMenuSubmenuTrigger
          role="menuitem"
          tone="neutral"
          aria-haspopup="menu"
          aria-expanded={false}
          data-disabled=""
          aria-disabled="true"
        >
          <ContextMenuItemLabel>Submenu disabled</ContextMenuItemLabel>
          <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </ContextMenuSubmenuTrigger>
      </ContextMenuPopup>
      <ContextMenuPopup role="menu" aria-label="Entering" data-starting-style="">
        <ContextMenuItem role="menuitem" tone="neutral">
          <ContextMenuItemLabel>Entering</ContextMenuItemLabel>
        </ContextMenuItem>
      </ContextMenuPopup>
      <ContextMenuPopup role="menu" aria-label="Exiting" data-ending-style="">
        <ContextMenuItem role="menuitem" tone="neutral">
          <ContextMenuItemLabel>Exiting</ContextMenuItemLabel>
        </ContextMenuItem>
      </ContextMenuPopup>
    </div>
  ),
};

/**
 * The selection row kinds: `ContextMenuCheckboxItem` (`role="menuitemcheckbox"` + `aria-checked`)
 * with its `ContextMenuCheckboxItemIndicator`, and `ContextMenuRadioItem` (`role="menuitemradio"`)
 * rows inside the plain `role="group"` Base UI's `RadioGroup` renders, with their
 * `ContextMenuRadioItemIndicator`s. The indicators pin `data-selected=""` on the checked rows; the
 * unchecked indicators stay mounted so the leading gutter column holds, exactly like the
 * `keepMounted` grafts.
 */
export const SelectionItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ContextMenuPopup role="menu">
      <div role="group" aria-labelledby="context-menu-elements-selection-display">
        <ContextMenuGroupLabel id="context-menu-elements-selection-display">
          Display
        </ContextMenuGroupLabel>
        <ContextMenuCheckboxItem role="menuitemcheckbox" aria-checked="true" tone="neutral">
          <ContextMenuCheckboxItemIndicator data-selected="">
            <Check />
          </ContextMenuCheckboxItemIndicator>
          <ContextMenuItemLabel>Show sub-issues</ContextMenuItemLabel>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem role="menuitemcheckbox" aria-checked="false" tone="neutral">
          <ContextMenuCheckboxItemIndicator>
            <Check />
          </ContextMenuCheckboxItemIndicator>
          <ContextMenuItemLabel>Show empty groups</ContextMenuItemLabel>
        </ContextMenuCheckboxItem>
      </div>
      <ContextMenuSeparator role="separator" />
      <div role="group" aria-labelledby="context-menu-elements-selection-order">
        <ContextMenuGroupLabel id="context-menu-elements-selection-order">
          Order by
        </ContextMenuGroupLabel>
        <ContextMenuRadioItem role="menuitemradio" aria-checked="true" tone="neutral">
          <ContextMenuRadioItemIndicator data-selected="">
            <Dot />
          </ContextMenuRadioItemIndicator>
          <ContextMenuItemLabel>Manual</ContextMenuItemLabel>
        </ContextMenuRadioItem>
        <ContextMenuRadioItem role="menuitemradio" aria-checked="false" tone="neutral">
          <ContextMenuRadioItemIndicator>
            <Dot />
          </ContextMenuRadioItemIndicator>
          <ContextMenuItemLabel>Created date</ContextMenuItemLabel>
        </ContextMenuRadioItem>
        <ContextMenuRadioItem role="menuitemradio" aria-checked="false" tone="neutral">
          <ContextMenuRadioItemIndicator>
            <Dot />
          </ContextMenuRadioItemIndicator>
          <ContextMenuItemLabel>Priority</ContextMenuItemLabel>
        </ContextMenuRadioItem>
      </div>
    </ContextMenuPopup>
  ),
};

/**
 * Navigation rows: `ContextMenuLinkItem` renders a real `<a>` (href/target are native attributes)
 * styled identically to `ContextMenuItem`, so destinations sit beside action rows. The second link
 * pins `data-highlighted=""`.
 */
export const LinkItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ContextMenuPopup role="menu">
      <ContextMenuLinkItem
        role="menuitem"
        tone="neutral"
        href="#work-item"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon>
          <ExternalLink />
        </Icon>
        <ContextMenuItemLabel>Open in new tab</ContextMenuItemLabel>
      </ContextMenuLinkItem>
      <ContextMenuLinkItem role="menuitem" tone="neutral" href="#activity" data-highlighted="">
        <Icon>
          <Link2 />
        </Icon>
        <ContextMenuItemLabel>Go to activity</ContextMenuItemLabel>
      </ContextMenuLinkItem>
      <ContextMenuSeparator role="separator" />
      <ContextMenuItem role="menuitem" tone="neutral">
        <Icon>
          <Copy />
        </Icon>
        <ContextMenuItemLabel>Copy link</ContextMenuItemLabel>
        <ContextMenuItemShortcut>⌘C</ContextMenuItemShortcut>
      </ContextMenuItem>
    </ContextMenuPopup>
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
