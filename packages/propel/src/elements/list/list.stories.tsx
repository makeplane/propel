import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Ellipsis, Inbox, LayoutGrid, Settings } from "lucide-react";
import { expect } from "storybook/test";

import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import { Icon } from "../../internal/icon";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemLabel,
  ListItemLink,
  ListSectionHeading,
  ListSectionTrigger,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled list parts render
// DIRECTLY — no Composite roving-tabindex graft, no Collapsible disclosure graft — with every
// visual state pinned statically via the attributes the cvas key off: `aria-current="page"` on a
// row's primary (the `ListItem` reads it via `:has` for the selected fill), `data-panel-open=""`
// on a `ListSectionTrigger` (the internal `DisclosureIndicator` rotates off the trigger's `group`),
// and the pseudo-states addon for hover/focus-visible. The parts carry no role of their own —
// role/aria wiring (toolbar, roving tabindex) is settled by the ready-made List
// (Components/List), where the grafting, keyboard, and aria behavior are demonstrated AND tested.
const meta = {
  title: "Elements/List",
  component: List,
  subcomponents: {
    ListItem,
    ListItemLink,
    ListItemButton,
    ListItemLabel,
    ListSectionHeading,
    ListSectionTrigger,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: `List` › `ListItem` rows, each holding a primary
 * `ListItemLink` (or `ListItemButton` for an action row — same chrome, different element) with an
 * internal `Icon` and a truncating `ListItemLabel`. The current page is pinned via
 * `aria-current="page"` on its link; the wrapping row reads it through `:has` for the selected
 * fill.
 */
export const Default: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemLink href="#inbox">
          <Icon magnitude="md">
            <Inbox />
          </Icon>
          <ListItemLabel>Inbox</ListItemLabel>
        </ListItemLink>
      </ListItem>
      <ListItem>
        <ListItemLink href="#projects" aria-current="page">
          <Icon magnitude="md">
            <LayoutGrid />
          </Icon>
          <ListItemLabel>Projects</ListItemLabel>
        </ListItemLink>
      </ListItem>
      <ListItem>
        <ListItemLink href="#settings">
          <Icon magnitude="md">
            <Settings />
          </Icon>
          <ListItemLabel>Settings</ListItemLabel>
        </ListItemLink>
      </ListItem>
      <ListItem>
        {/* An action row (not navigation) — a button that shares the row chrome. */}
        <ListItemButton>
          <Icon magnitude="md">
            <Ellipsis />
          </Icon>
          <ListItemLabel>More</ListItemLabel>
        </ListItemButton>
      </ListItem>
    </List>
  ),
};

/**
 * A collapsible section pinned open: `ListSectionTrigger` is a plain styled button carrying
 * `group`; pinning `data-panel-open=""` (the attribute Base UI's `Collapsible.Trigger` would set)
 * rotates the internal `DisclosureIndicator`'s chevron from inline-end to down. The rows below
 * stand in for the expanded panel — a closed section renders no rows. The ready-made `ListSection`
 * (Components/List) grafts the real disclosure behavior.
 */
export const Section: Story = {
  render: () => (
    <div>
      <ListSectionTrigger aria-expanded data-panel-open="">
        Workspace
        <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
          <ChevronDown />
        </DisclosureIndicator>
      </ListSectionTrigger>
      <List>
        <ListItem>
          <ListItemLink href="#projects" aria-current="page">
            <Icon magnitude="md">
              <LayoutGrid />
            </Icon>
            <ListItemLabel>Projects</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#settings">
            <Icon magnitude="md">
              <Settings />
            </Icon>
            <ListItemLabel>Settings</ListItemLabel>
          </ListItemLink>
        </ListItem>
      </List>
    </div>
  ),
};

/**
 * The static sibling of `ListSectionTrigger`: `ListSectionHeading` titles a group of rows with no
 * button affordance (no hover/focus/cursor) — for settings-style sidebars whose sections don't
 * collapse.
 */
export const SectionHeading: Story = {
  render: () => (
    <div>
      <ListSectionHeading>Workspace</ListSectionHeading>
      <List>
        <ListItem>
          <ListItemLink href="#members">
            <Icon magnitude="md">
              <Settings />
            </Icon>
            <ListItemLabel>Members</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#billing">
            <Icon magnitude="md">
              <LayoutGrid />
            </Icon>
            <ListItemLabel>Billing</ListItemLabel>
          </ListItemLink>
        </ListItem>
      </List>
    </div>
  ),
};

/**
 * Every pinnable state side by side.
 *
 * Rows (`ListItem` owns the chrome and reads its primary's state via `:has`):
 *
 * - **Resting** — the plain row.
 * - **Hover** — `hover:` fill on the row, forced by the pseudo-states addon.
 * - **Selected** — `aria-current="page"` pinned on the link recolors and fills the row.
 * - **Focus ring** — focus-visible forced on the link (the primary has no outline of its own; the row
 *   shows the ring via `has-[:focus-visible]`).
 *
 * Section triggers (the caret reads the trigger's `group`):
 *
 * - **Closed** — the caret points inline-end (`-rotate-90`, RTL-mirrored).
 * - **Open** — `data-panel-open=""` pinned on the trigger rotates the caret down.
 * - **Hover / Focus** — pseudo-classes forced by the addon (text brightens; ring shows).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#list-item-hover", "#list-section-trigger-hover"],
      focusVisible: ["#list-item-focus-primary", "#list-section-trigger-focus"],
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <List>
        <ListItem>
          <ListItemLink href="#resting">
            <Icon magnitude="md">
              <Inbox />
            </Icon>
            <ListItemLabel>Resting</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem id="list-item-hover">
          <ListItemLink href="#hover">
            <Icon magnitude="md">
              <Inbox />
            </Icon>
            <ListItemLabel>Hover</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#selected" aria-current="page">
            <Icon magnitude="md">
              <LayoutGrid />
            </Icon>
            <ListItemLabel>Selected</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink id="list-item-focus-primary" href="#focus">
            <Icon magnitude="md">
              <Settings />
            </Icon>
            <ListItemLabel>Focus ring</ListItemLabel>
          </ListItemLink>
        </ListItem>
      </List>
      <div className="flex flex-col gap-1">
        <ListSectionTrigger aria-expanded={false}>
          Closed
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
            <ChevronDown />
          </DisclosureIndicator>
        </ListSectionTrigger>
        <ListSectionTrigger aria-expanded data-panel-open="">
          Open
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
            <ChevronDown />
          </DisclosureIndicator>
        </ListSectionTrigger>
        <ListSectionTrigger id="list-section-trigger-hover" aria-expanded={false}>
          Hover
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
            <ChevronDown />
          </DisclosureIndicator>
        </ListSectionTrigger>
        <ListSectionTrigger id="list-section-trigger-focus" aria-expanded={false}>
          Focus
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
            <ChevronDown />
          </DisclosureIndicator>
        </ListSectionTrigger>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the row holding
 * the `aria-current="page"` link computes a different background from the resting row (the
 * `has-[[aria-current=page]]` fill), and the `data-panel-open` trigger rotates its caret relative
 * to the closed one. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // The compiled `has-[[aria-current=page]]:bg-layer-transparent-selected` selector fills the
    // selected row.
    const selectedRow = canvas.getByRole("link", { name: "Selected" }).parentElement;
    const restingRow = canvas.getByRole("link", { name: "Resting" }).parentElement;
    if (!selectedRow || !restingRow) throw new Error("expected each link to sit in a ListItem row");
    await expect(getComputedStyle(selectedRow).backgroundColor).not.toBe(
      getComputedStyle(restingRow).backgroundColor,
    );

    // The compiled `group-data-panel-open:rotate-0` selector rotates the open trigger's caret away
    // from the closed caret's resting `-rotate-90`.
    const caretRotate = (name: string) => {
      const caret = canvas.getByRole("button", { name }).querySelector("[aria-hidden]");
      if (!(caret instanceof HTMLElement)) throw new Error(`missing caret in "${name}" trigger`);
      return getComputedStyle(caret).rotate;
    };
    await expect(caretRotate("Open")).not.toBe(caretRotate("Closed"));
  },
};
