import { Collapsible } from "@base-ui/react/collapsible";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Ellipsis, Inbox, LayoutGrid, Settings } from "lucide-react";
import { expect } from "storybook/test";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemLabel,
  ListItemLink,
  ListSectionTrigger,
  ListSectionTriggerIndicator,
} from "./index";

// `List` is role-flexible; this story uses `role="toolbar"` (the canonical roving-controls role) so
// axe passes while showing the chrome. The production role — navigation tree vs region — is the open
// a11y decision in the RFC, settled at composition time.
const meta = {
  title: "UI/List",
  component: List,
  subcomponents: {
    ListItem,
    ListItemLink,
    ListItemButton,
    ListItemIcon,
    ListItemLabel,
    ListSectionTrigger,
    ListSectionTriggerIndicator,
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

/** A navigation list; the current page carries `aria-current="page"` and its row reads as selected. */
export const Navigation: Story = {
  render: () => (
    <List role="toolbar" aria-label="Workspace">
      <ListItem>
        <ListItemLink href="#inbox">
          <ListItemIcon>
            <Inbox aria-hidden />
          </ListItemIcon>
          <ListItemLabel>Inbox</ListItemLabel>
        </ListItemLink>
      </ListItem>
      <ListItem>
        <ListItemLink href="#projects" aria-current="page">
          <ListItemIcon>
            <LayoutGrid aria-hidden />
          </ListItemIcon>
          <ListItemLabel>Projects</ListItemLabel>
        </ListItemLink>
      </ListItem>
      <ListItem>
        <ListItemLink href="#settings">
          <ListItemIcon>
            <Settings aria-hidden />
          </ListItemIcon>
          <ListItemLabel>Settings</ListItemLabel>
        </ListItemLink>
      </ListItem>
      <ListItem>
        {/* An action row (not navigation) — a button that shares the row chrome. */}
        <ListItemButton>
          <ListItemIcon>
            <Ellipsis aria-hidden />
          </ListItemIcon>
          <ListItemLabel>More</ListItemLabel>
        </ListItemButton>
      </ListItem>
    </List>
  ),
  play: async ({ canvas, userEvent }) => {
    const inbox = canvas.getByRole("link", { name: "Inbox" });
    const projects = canvas.getByRole("link", { name: "Projects" });

    // The current page is exposed via aria-current, and its row reads as selected.
    await expect(projects).toHaveAttribute("aria-current", "page");
    const selectedRow = projects.parentElement;
    const restingRow = inbox.parentElement;
    if (!selectedRow || !restingRow) throw new Error("expected each link to sit in a ListItem row");
    await expect(getComputedStyle(selectedRow).backgroundColor).not.toBe(
      getComputedStyle(restingRow).backgroundColor,
    );

    // One tab stop for the whole list; arrow keys roam the rows — links and the action button alike.
    inbox.focus();
    await expect(inbox).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(projects).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await expect(canvas.getByRole("button", { name: "More" })).toHaveFocus();
  },
};

/**
 * A collapsible section. `ListSectionTrigger` is a plain styled button; the disclosure behavior is
 * grafted by rendering it as a `Collapsible.Trigger` (the styled button stays the outer element),
 * and `ListSectionTriggerIndicator` rotates the chevron off the trigger's `data-panel-open` —
 * pointing inline-end while collapsed, down when open.
 */
export const Section: Story = {
  render: () => (
    <Collapsible.Root defaultOpen>
      <ListSectionTrigger render={<Collapsible.Trigger />}>
        Workspace
        <ListSectionTriggerIndicator>
          <ChevronDown aria-hidden />
        </ListSectionTriggerIndicator>
      </ListSectionTrigger>
      <Collapsible.Panel>
        <List role="toolbar" aria-label="Workspace">
          <ListItem>
            <ListItemLink href="#projects" aria-current="page">
              <ListItemIcon>
                <LayoutGrid aria-hidden />
              </ListItemIcon>
              <ListItemLabel>Projects</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#settings">
              <ListItemIcon>
                <Settings aria-hidden />
              </ListItemIcon>
              <ListItemLabel>Settings</ListItemLabel>
            </ListItemLink>
          </ListItem>
        </List>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
  play: async ({ canvas, userEvent }) => {
    // The plain trigger gets its disclosure behavior from the Collapsible.Trigger it renders as.
    const trigger = canvas.getByRole("button", { name: "Workspace" });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    trigger.blur();
  },
};
