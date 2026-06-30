import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import { expect } from "storybook/test";

import { Button } from "../components/button/index";
import { IconButton } from "../components/icon-button/index";
import { Collapsible, CollapsiblePanel, CollapsiblePanelContent } from "../ui/collapsible/index";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemLabel,
  ListItemLink,
  ListSectionTrigger,
  ListSectionTriggerIndicator,
} from "../ui/list/index";
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
// "navbar". Header actions are `IconButton`s, the create action is a `Button`; the glyphs are Plane's
// own Foundations icons (copied verbatim from Figma as SVG in sidebar-icons.tsx — Plane uses its own
// set, not lucide, and propel doesn't ship it yet), and project glyphs are emoji. Rows/sections are
// `ui/list` + `ui/collapsible`; the only new primitive the frame implied was `ListSectionTrigger`.
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
          <IconButton prominence="ghost" tone="neutral" magnitude="sm" aria-label="Filter">
            <PreferencesIcon aria-hidden />
          </IconButton>
          <IconButton prominence="ghost" tone="neutral" magnitude="sm" aria-label="Toggle sidebar">
            <SidePeekIcon aria-hidden />
          </IconButton>
        </div>
      </div>

      <Button
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        sizing="fill"
        inlineStartNode={<AddWorkItemIcon aria-hidden />}
      >
        New work item
      </Button>

      <List role="toolbar" aria-label="Primary">
        <ListItem>
          <ListItemLink href="#home">
            <ListItemIcon>
              <HomeIcon aria-hidden />
            </ListItemIcon>
            <ListItemLabel>Home</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#stickers">
            <ListItemIcon>
              <StickersIcon aria-hidden />
            </ListItemIcon>
            <ListItemLabel>Stickers</ListItemLabel>
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="#your-work">
            <ListItemIcon>
              <YourWorkIcon aria-hidden />
            </ListItemIcon>
            <ListItemLabel>Your work</ListItemLabel>
          </ListItemLink>
        </ListItem>
      </List>

      <Collapsible defaultOpen>
        <ListSectionTrigger>
          Workspace
          <ListSectionTriggerIndicator>
            <ChevronDown aria-hidden />
          </ListSectionTriggerIndicator>
        </ListSectionTrigger>
        <CollapsiblePanel>
          <CollapsiblePanelContent>
            <List role="toolbar" aria-label="Workspace">
              <ListItem>
                <ListItemLink href="#projects" aria-current="page">
                  <ListItemIcon>
                    <ProjectsIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Projects</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#work-graph">
                  <ListItemIcon>
                    <YourWorkIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Work graph</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#initiatives">
                  <ListItemIcon>
                    <InitiativesIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Initiatives</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#analytics">
                  <ListItemIcon>
                    <AnalyticsIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Analytics</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#releases">
                  <ListItemIcon>
                    <ReleasesIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Releases</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <MoreIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>More</ListItemLabel>
                </ListItemButton>
              </ListItem>
            </List>
          </CollapsiblePanelContent>
        </CollapsiblePanel>
      </Collapsible>

      <Collapsible defaultOpen>
        <ListSectionTrigger>
          Projects
          <ListSectionTriggerIndicator>
            <ChevronDown aria-hidden />
          </ListSectionTriggerIndicator>
        </ListSectionTrigger>
        <CollapsiblePanel>
          <CollapsiblePanelContent>
            <List role="toolbar" aria-label="Projects">
              <ListItem>
                <ListItemLink href="#acme">
                  <ListItemIcon aria-hidden>🚜</ListItemIcon>
                  <ListItemLabel>Acme Inc.</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#web-development">
                  <ListItemIcon aria-hidden>🧩</ListItemIcon>
                  <ListItemLabel>Web Development</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#plane-pro">
                  <ListItemIcon aria-hidden>🚗</ListItemIcon>
                  <ListItemLabel>Plane Pro</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#discover">
                  <ListItemIcon aria-hidden>📞</ListItemIcon>
                  <ListItemLabel>Discover</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <MoreIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>More</ListItemLabel>
                </ListItemButton>
              </ListItem>
            </List>
          </CollapsiblePanelContent>
        </CollapsiblePanel>
      </Collapsible>

      <Collapsible defaultOpen>
        <ListSectionTrigger>
          Try
          <ListSectionTriggerIndicator>
            <ChevronDown aria-hidden />
          </ListSectionTriggerIndicator>
        </ListSectionTrigger>
        <CollapsiblePanel>
          <CollapsiblePanelContent>
            <List role="toolbar" aria-label="Try">
              <ListItem>
                <ListItemLink href="#github">
                  <ListItemIcon>
                    <GithubIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Connect to GitHub</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#slack">
                  <ListItemIcon>
                    <SlackIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Connect to Slack</ListItemLabel>
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#plane-ai">
                  <ListItemIcon>
                    <PlaneAiIcon aria-hidden />
                  </ListItemIcon>
                  <ListItemLabel>Try Plane AI</ListItemLabel>
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
