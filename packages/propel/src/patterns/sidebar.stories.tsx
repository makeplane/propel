import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChevronDown,
  Code,
  Ellipsis,
  Folder,
  Home,
  Inbox,
  LayoutGrid,
  Palette,
} from "lucide-react";
import { expect } from "storybook/test";

import { Badge } from "../components/badge/index";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsiblePanelContent,
  CollapsibleTrigger,
  CollapsibleTriggerIndicator,
  CollapsibleTriggerTitle,
} from "../ui/collapsible/index";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemLabel,
  ListItemLink,
} from "../ui/list/index";

// App-level demo (not a shipped primitive): an app sidebar assembled from `ui/list` +
// `ui/collapsible` + `Badge`. Proves the List primitives cover the real design — flat rows, a count,
// collapsible sections, an action row — without a bespoke navigation component.
//
// v1 keyboard model: each `List` is one roving group (arrow keys within); the section triggers are
// their own tab stops. `role="toolbar"` is a placeholder so axe passes — the production role
// (navigation tree vs region) is the open a11y decision in the RFC. The section-header *look* reuses
// the generic `CollapsibleTrigger` and is bolder than Figma's gray heading — flagged for design.
const meta = {
  title: "Patterns/Sidebar",
  component: List,
  parameters: { layout: "padded" },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceSidebar: Story = {
  render: () => (
    <nav aria-label="Acme workspace" className="w-64">
      <List role="toolbar" aria-label="Primary">
        <ListItem>
          <ListItemLink href="#home">
            <ListItemIcon>
              <Home aria-hidden />
            </ListItemIcon>
            <ListItemLabel>Home</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#inbox">
            <ListItemIcon>
              <Inbox aria-hidden />
            </ListItemIcon>
            <ListItemLabel>Inbox</ListItemLabel>
            <Badge tone="neutral" magnitude="sm">
              6
            </Badge>
          </ListItemLink>
        </ListItem>
      </List>

      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <CollapsibleTriggerTitle>Workspace</CollapsibleTriggerTitle>
          <CollapsibleTriggerIndicator>
            <ChevronDown aria-hidden />
          </CollapsibleTriggerIndicator>
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <CollapsiblePanelContent>
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
                <ListItemLink href="#views">
                  <ListItemIcon>
                    <Folder aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Views</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Ellipsis aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>More</ListItemLabel>
                </ListItemButton>
              </ListItem>
            </List>
          </CollapsiblePanelContent>
        </CollapsiblePanel>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <CollapsibleTriggerTitle>Teams</CollapsibleTriggerTitle>
          <CollapsibleTriggerIndicator>
            <ChevronDown aria-hidden />
          </CollapsibleTriggerIndicator>
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <CollapsiblePanelContent>
            <List role="toolbar" aria-label="Teams">
              <ListItem>
                <ListItemLink href="#design">
                  <ListItemIcon>
                    <Palette aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Design</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#engineering">
                  <ListItemIcon>
                    <Code aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Engineering</ListItemLabel>
                </ListItemLink>
              </ListItem>
            </List>
          </CollapsiblePanelContent>
        </CollapsiblePanel>
      </Collapsible>
    </nav>
  ),
  play: async ({ canvas, userEvent }) => {
    // The current page is a real link with aria-current.
    await expect(canvas.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    // An action row is a button, not a link.
    await expect(canvas.getByRole("button", { name: "More" })).toBeInTheDocument();

    // Arrow keys roam within a list (one tab stop).
    const home = canvas.getByRole("link", { name: "Home" });
    home.focus();
    await userEvent.keyboard("{ArrowDown}");
    // The count badge is inside the link, so its name is "Inbox 6".
    await expect(canvas.getByRole("link", { name: /Inbox/ })).toHaveFocus();

    // A section header toggles its panel (Base UI Collapsible).
    const workspace = canvas.getByRole("button", { name: "Workspace" });
    await expect(workspace).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(workspace);
    await expect(workspace).toHaveAttribute("aria-expanded", "false");
  },
};
