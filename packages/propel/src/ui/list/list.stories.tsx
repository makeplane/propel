import type { Meta, StoryObj } from "@storybook/react-vite";
import { Inbox, LayoutGrid, Settings } from "lucide-react";
import { expect } from "storybook/test";

import { List, ListItem, ListItemIcon, ListItemLabel, ListItemLink } from "./index";

// `List` is role-flexible; this story uses `role="toolbar"` (the canonical roving-controls role) so
// axe passes while showing the chrome. The production role — navigation tree vs region — is the open
// a11y decision in the RFC, settled at composition time.
const meta = {
  title: "UI/List",
  component: List,
  subcomponents: { ListItem, ListItemLink, ListItemIcon, ListItemLabel },
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

    // One tab stop for the whole list; arrow keys roam the rows.
    inbox.focus();
    await expect(inbox).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(projects).toHaveFocus();
  },
};
