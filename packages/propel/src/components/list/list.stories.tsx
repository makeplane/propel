import type { Meta, StoryObj } from "@storybook/react-vite";
import { Ellipsis, Inbox, LayoutGrid, Settings } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../icon";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemLabel,
  ListItemLink,
  ListSection,
  ListSectionHeading,
  ListSectionTrigger,
} from "./index";

// Components-tier story: the ready-made `List`/`ListItemLink`/`ListItemButton` already carry the
// roving-tabindex `Composite` behavior, and `ListSection` bundles the collapsible section — so the
// story composes the public API only, no Base UI wiring. `List` is role-flexible; these stories use
// `role="toolbar"` (the canonical roving-controls role) so axe passes while showing the chrome.
const meta = {
  title: "Components/List",
  component: List,
  subcomponents: {
    ListItem,
    ListItemLink,
    ListItemButton,
    ListItemLabel,
    ListSection,
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
 * A navigation list: `ListItemLink` rows (plus one `ListItemButton` action row sharing the chrome).
 * The current page carries `aria-current="page"` and its row reads as selected.
 */
export const Default: Story = {
  render: () => (
    <List role="toolbar" aria-label="Workspace">
      <ListItem>
        <ListItemLink href="#inbox" icon={<Icon icon={Inbox} magnitude="md" />} label="Inbox" />
      </ListItem>
      <ListItem>
        <ListItemLink
          href="#projects"
          aria-current="page"
          icon={<Icon icon={LayoutGrid} magnitude="md" />}
          label="Projects"
        />
      </ListItem>
      <ListItem>
        <ListItemLink
          href="#settings"
          icon={<Icon icon={Settings} magnitude="md" />}
          label="Settings"
        />
      </ListItem>
      <ListItem>
        {/* An action row (not navigation) — a button that shares the row chrome. */}
        <ListItemButton icon={<Icon icon={Ellipsis} magnitude="md" />} label="More" />
      </ListItem>
    </List>
  ),
};

/**
 * Roving tabindex: one tab stop for the whole list (the active row is `tabindex="0"`, the rest
 * `-1`), and ArrowDown moves focus between the rows — links and the action button alike.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const inbox = canvas.getByRole("link", { name: "Inbox" });
    const projects = canvas.getByRole("link", { name: "Projects" });
    const settings = canvas.getByRole("link", { name: "Settings" });
    const more = canvas.getByRole("button", { name: "More" });

    // The current page is exposed via aria-current.
    await expect(projects).toHaveAttribute("aria-current", "page");

    // Single tab stop: only the active row is in the tab order.
    await expect(inbox).toHaveAttribute("tabindex", "0");
    await expect(projects).toHaveAttribute("tabindex", "-1");
    await expect(settings).toHaveAttribute("tabindex", "-1");
    await expect(more).toHaveAttribute("tabindex", "-1");

    // ArrowDown roams focus through the rows.
    inbox.focus();
    await expect(inbox).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(projects).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(settings).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(more).toHaveFocus();
  },
};

/**
 * A collapsible section: `ListSection` renders the muted heading with the rotating disclosure
 * chevron and toggles its body — pass the heading as `label` and a `List` of rows as `children`.
 */
export const Section: Story = {
  render: () => (
    <ListSection label="Workspace" indicator defaultOpen>
      <List role="toolbar" aria-label="Workspace">
        <ListItem>
          <ListItemLink
            href="#projects"
            aria-current="page"
            icon={<Icon icon={LayoutGrid} magnitude="md" />}
            label="Projects"
          />
        </ListItem>
        <ListItem>
          <ListItemLink
            href="#settings"
            icon={<Icon icon={Settings} magnitude="md" />}
            label="Settings"
          />
        </ListItem>
      </List>
    </ListSection>
  ),
};

/**
 * Disclosure: the `ListSection` trigger exposes `aria-expanded` and toggles the section body on
 * click.
 */
export const SectionInteraction: Story = {
  ...Section,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Workspace" });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    trigger.blur();
  },
};
