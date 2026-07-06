import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Button } from "../components/button/index";
import { IconButton } from "../components/icon-button/index";
import { Icon } from "../components/icon/index";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemLabel,
  ListItemLink,
  ListSection,
} from "../components/list/index";
import {
  AddWorkItemIcon,
  AnalyticsIcon,
  GithubIcon,
  HomeIcon,
  InitiativesIcon,
  MoreIcon,
  PlaneAiIcon,
  PreferencesIcon,
  ProjectsIcon,
  ReleasesIcon,
  SidePeekIcon,
  SlackIcon,
  StickersIcon,
  YourWorkIcon,
} from "./sidebar-icons";

// App-level demo (not a shipped primitive): the Plane workspace sidebar assembled entirely from
// existing propel components — proving the design frame distills into the system with no bespoke
// "navbar". Header actions are `IconButton`s, the create action is a `Button`; collapsible groups are
// the ready-made `ListSection`, and rows are `List` + `ListItem`(+`Link`/`Button`/`Icon`/`Label`) —
// all from `components/list`. The glyphs are Plane's own Foundations icons (copied verbatim from
// Figma as SVG in sidebar-icons.tsx — Plane uses its own set, not lucide, and propel doesn't ship it
// yet); project glyphs are emoji.
//
// v1 keyboard model: each `List` is one roving group (arrow keys within); the section triggers are
// their own tab stops. `role="toolbar"` is a placeholder so axe passes — the production role
// (navigation tree vs region) is the open a11y decision in the RFC.
const meta = {
  title: "Patterns/Sidebar",
  component: List,
  parameters: { layout: "padded" },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceSidebar: Story = {
  render: () => (
    <nav
      aria-label="Acme workspace"
      className="flex w-64 flex-col gap-2 rounded-l-lg border border-subtle bg-surface-1 p-3"
    >
      <div className="flex items-center justify-between px-2">
        <span className="text-15 font-semibold text-primary">Projects</span>
        <div className="flex items-center gap-0.5">
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Filter"
            icon={<Icon icon={PreferencesIcon} />}
          />
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Toggle sidebar"
            icon={<Icon icon={SidePeekIcon} />}
          />
        </div>
      </div>

      <Button
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        sizing="fill"
        startIcon={<Icon icon={AddWorkItemIcon} />}
        label="New work item"
      />

      <List role="toolbar" aria-label="Primary">
        <ListItem>
          <ListItemLink href="#home">
            <Icon icon={HomeIcon} magnitude="md" />
            <ListItemLabel>Home</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#stickers">
            <Icon icon={StickersIcon} magnitude="md" />
            <ListItemLabel>Stickers</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#your-work">
            <Icon icon={YourWorkIcon} magnitude="md" />
            <ListItemLabel>Your work</ListItemLabel>
          </ListItemLink>
        </ListItem>
      </List>

      <ListSection label="Workspace" indicator defaultOpen>
        <List role="toolbar" aria-label="Workspace">
          <ListItem>
            <ListItemLink href="#projects" aria-current="page">
              <Icon icon={ProjectsIcon} magnitude="md" />
              <ListItemLabel>Projects</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#work-graph">
              <Icon icon={YourWorkIcon} magnitude="md" />
              <ListItemLabel>Work graph</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#initiatives">
              <Icon icon={InitiativesIcon} magnitude="md" />
              <ListItemLabel>Initiatives</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#analytics">
              <Icon icon={AnalyticsIcon} magnitude="md" />
              <ListItemLabel>Analytics</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#releases">
              <Icon icon={ReleasesIcon} magnitude="md" />
              <ListItemLabel>Releases</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Icon icon={MoreIcon} magnitude="md" />
              <ListItemLabel>More</ListItemLabel>
            </ListItemButton>
          </ListItem>
        </List>
      </ListSection>

      <ListSection label="Projects" indicator defaultOpen>
        <List role="toolbar" aria-label="Projects">
          <ListItem>
            <ListItemLink href="#acme">
              <Icon icon="🚜" magnitude="md" />
              <ListItemLabel>Acme Inc.</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#web-development">
              <Icon icon="🧩" magnitude="md" />
              <ListItemLabel>Web Development</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#plane-pro">
              <Icon icon="🚗" magnitude="md" />
              <ListItemLabel>Plane Pro</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#discover">
              <Icon icon="📞" magnitude="md" />
              <ListItemLabel>Discover</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Icon icon={MoreIcon} magnitude="md" />
              <ListItemLabel>More</ListItemLabel>
            </ListItemButton>
          </ListItem>
        </List>
      </ListSection>

      <ListSection label="Try" indicator defaultOpen>
        <List role="toolbar" aria-label="Try">
          <ListItem>
            <ListItemLink href="#github">
              <Icon icon={GithubIcon} magnitude="md" />
              <ListItemLabel>Connect to GitHub</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#slack">
              <Icon icon={SlackIcon} magnitude="md" />
              <ListItemLabel>Connect to Slack</ListItemLabel>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#plane-ai">
              <Icon icon={PlaneAiIcon} magnitude="md" />
              <ListItemLabel>Try Plane AI</ListItemLabel>
            </ListItemLink>
          </ListItem>
        </List>
      </ListSection>
    </nav>
  ),
  play: async ({ canvas, userEvent }) => {
    // The current page is a real link with aria-current.
    await expect(canvas.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    // The action rows ("More") are buttons, not links.
    await expect(canvas.getAllByRole("button", { name: "More" }).length).toBeGreaterThan(0);

    // Arrow keys roam within a list (one tab stop).
    const home = canvas.getByRole("link", { name: "Home" });
    home.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("link", { name: "Stickers" })).toHaveFocus();

    // A section header toggles its panel (Base UI Collapsible).
    const workspace = canvas.getByRole("button", { name: "Workspace" });
    await expect(workspace).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(workspace);
    await expect(workspace).toHaveAttribute("aria-expanded", "false");
    // Re-open and drop focus so the resting view shows every section expanded, no focus ring.
    await userEvent.click(workspace);
    await expect(workspace).toHaveAttribute("aria-expanded", "true");
    workspace.blur();
  },
};
