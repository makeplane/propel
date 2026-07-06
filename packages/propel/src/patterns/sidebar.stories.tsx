import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Button } from "../components/button/index";
import { IconButton } from "../components/icon-button/index";
import { Icon } from "../components/icon/index";
import {
  List,
  ListItem,
  ListItemButton,
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
// the ready-made `ListSection`, and rows are `List` + `ListItem`(+`Link`/`Button` label/icon slots)
// — all from `components/list`. The glyphs are Plane's own Foundations icons (copied verbatim from
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
          <ListItemLink href="#home" icon={<Icon icon={HomeIcon} magnitude="md" />} label="Home" />
        </ListItem>
        <ListItem>
          <ListItemLink
            href="#stickers"
            icon={<Icon icon={StickersIcon} magnitude="md" />}
            label="Stickers"
          />
        </ListItem>
        <ListItem>
          <ListItemLink
            href="#your-work"
            icon={<Icon icon={YourWorkIcon} magnitude="md" />}
            label="Your work"
          />
        </ListItem>
      </List>

      <ListSection label="Workspace" indicator defaultOpen>
        <List role="toolbar" aria-label="Workspace">
          <ListItem>
            <ListItemLink
              href="#projects"
              aria-current="page"
              icon={<Icon icon={ProjectsIcon} magnitude="md" />}
              label="Projects"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#work-graph"
              icon={<Icon icon={YourWorkIcon} magnitude="md" />}
              label="Work graph"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#initiatives"
              icon={<Icon icon={InitiativesIcon} magnitude="md" />}
              label="Initiatives"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#analytics"
              icon={<Icon icon={AnalyticsIcon} magnitude="md" />}
              label="Analytics"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#releases"
              icon={<Icon icon={ReleasesIcon} magnitude="md" />}
              label="Releases"
            />
          </ListItem>
          <ListItem>
            <ListItemButton icon={<Icon icon={MoreIcon} magnitude="md" />} label="More" />
          </ListItem>
        </List>
      </ListSection>

      <ListSection label="Projects" indicator defaultOpen>
        <List role="toolbar" aria-label="Projects">
          <ListItem>
            <ListItemLink href="#acme" icon={<Icon icon="🚜" magnitude="md" />} label="Acme Inc." />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#web-development"
              icon={<Icon icon="🧩" magnitude="md" />}
              label="Web Development"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#plane-pro"
              icon={<Icon icon="🚗" magnitude="md" />}
              label="Plane Pro"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#discover"
              icon={<Icon icon="📞" magnitude="md" />}
              label="Discover"
            />
          </ListItem>
          <ListItem>
            <ListItemButton icon={<Icon icon={MoreIcon} magnitude="md" />} label="More" />
          </ListItem>
        </List>
      </ListSection>

      <ListSection label="Try" indicator defaultOpen>
        <List role="toolbar" aria-label="Try">
          <ListItem>
            <ListItemLink
              href="#github"
              icon={<Icon icon={GithubIcon} magnitude="md" />}
              label="Connect to GitHub"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#slack"
              icon={<Icon icon={SlackIcon} magnitude="md" />}
              label="Connect to Slack"
            />
          </ListItem>
          <ListItem>
            <ListItemLink
              href="#plane-ai"
              icon={<Icon icon={PlaneAiIcon} magnitude="md" />}
              label="Try Plane AI"
            />
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
