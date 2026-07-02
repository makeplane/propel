import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentType, Fragment, type SVGProps } from "react";
import { expect } from "storybook/test";

import { Badge } from "../components/badge/index";
import {
  List,
  ListItem,
  ListItemLabel,
  ListItemLink,
  ListSectionHeading,
} from "../components/list/index";
import { Separator } from "../components/separator/index";
import { WorkspaceAvatar } from "../components/workspace-avatar/index";
import { Icon } from "../internal/icon";
import {
  AccessAndRolesIcon,
  BillingsIcon,
  CustomersIcon,
  ExportIcon,
  GeneralIcon,
  GroupSyncIcon,
  ImportsIcon,
  InitiativeIcon,
  IntegrationsIcon,
  LabelsIcon,
  MembersIcon,
  MultiTagIcon,
  PlaneAiIcon,
  ProjectsIcon,
  RelationsIcon,
  ScriptsIcon,
  StateIcon,
  TeamspacesIcon,
  TemplatesIcon,
  TimeInStateIcon,
  TimeTrackingIcon,
  WebhooksIcon,
  WikiIcon,
  WorkItemsIcon,
  WorkspaceIcon,
} from "./workspace-settings-icons";

// App-level demo (not a shipped primitive): the Plane workspace-settings sidebar assembled entirely
// from existing propel components. The settings sections are STATIC groups — each is a
// `ListSectionHeading` (a plain, non-interactive label, unlike the collapsible `ListSection`) over a
// `List` of `ListItemLink` rows, with a `Separator` dividing consecutive groups. The header pairs a
// `WorkspaceAvatar` with the workspace name/role and a plan `Badge`. The glyphs are Plane's own
// Foundations icons (copied verbatim from Figma as SVG in workspace-settings-icons.tsx — Plane uses
// its own set, not lucide, and propel doesn't ship it yet).
//
// v1 keyboard model: each `List` is one roving group (arrow keys move within it). `role="toolbar"`
// is a placeholder so axe passes — the production role (navigation tree vs region) is the open a11y
// decision in the RFC.

type SettingsRow = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type SettingsSection = {
  label: string;
  rows: SettingsRow[];
};

const sections: SettingsSection[] = [
  {
    label: "Administration",
    rows: [
      { label: "General", href: "#general", icon: GeneralIcon },
      { label: "Members", href: "#members", icon: MembersIcon },
      { label: "Billings and Plans", href: "#billings", icon: BillingsIcon },
      { label: "Imports", href: "#imports", icon: ImportsIcon },
      { label: "Exports", href: "#exports", icon: ExportIcon },
      { label: "Worklogs", href: "#worklogs", icon: TimeTrackingIcon },
      { label: "Group syncing", href: "#group-syncing", icon: GroupSyncIcon },
      { label: "Audit logs", href: "#audit-logs", icon: AccessAndRolesIcon },
    ],
  },
  {
    label: "Roles and Permissions",
    rows: [
      { label: "Project roles & schemes", href: "#project-roles", icon: ProjectsIcon },
      { label: "Workspace roles & schemes", href: "#workspace-roles", icon: WorkspaceIcon },
    ],
  },
  {
    label: "Products",
    rows: [
      { label: "Wiki", href: "#wiki", icon: WikiIcon },
      { label: "Plane AI", href: "#plane-ai", icon: PlaneAiIcon },
    ],
  },
  {
    label: "Work structure",
    rows: [
      { label: "States", href: "#states", icon: StateIcon },
      { label: "Labels", href: "#labels", icon: LabelsIcon },
      { label: "Work item types", href: "#work-item-types", icon: WorkItemsIcon },
    ],
  },
  {
    label: "Features",
    rows: [
      { label: "Projects", href: "#projects", icon: ProjectsIcon },
      { label: "Teamspaces", href: "#teamspaces", icon: TeamspacesIcon },
      { label: "Initiatives", href: "#initiatives", icon: InitiativeIcon },
      { label: "Customers", href: "#customers", icon: CustomersIcon },
      { label: "Templates", href: "#templates", icon: TemplatesIcon },
      { label: "Relations", href: "#relations", icon: RelationsIcon },
      { label: "Time in state", href: "#time-in-state", icon: TimeInStateIcon },
      { label: "Integrations", href: "#integrations", icon: IntegrationsIcon },
      { label: "Page labels", href: "#page-labels", icon: MultiTagIcon },
    ],
  },
  {
    label: "Developers",
    rows: [
      { label: "Webhooks", href: "#webhooks", icon: WebhooksIcon },
      { label: "Scripts", href: "#scripts", icon: ScriptsIcon },
    ],
  },
];

const meta = {
  title: "Patterns/Workspace Settings Sidebar",
  component: List,
  parameters: { layout: "padded" },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceSettings: Story = {
  render: () => (
    <nav
      aria-label="Workspace settings"
      className="flex w-64 flex-col gap-2 rounded-l-lg border-y border-l border-subtle bg-surface-1 p-3"
    >
      <div className="sticky top-0 z-10 bg-surface-1 px-2 py-1">
        <span className="text-15 font-medium text-primary">Workspace settings</span>
      </div>

      <div className="flex items-center gap-2 px-2">
        <WorkspaceAvatar magnitude="md" alt="Acme Inc." fallback="A" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-14 font-medium text-primary">Acme Inc.</span>
          <span className="text-12 text-tertiary">Admin</span>
        </div>
        <Badge tone="brand" magnitude="sm">
          Business
        </Badge>
      </div>

      {sections.map((section, index) => (
        <Fragment key={section.label}>
          {index > 0 ? <Separator orientation="horizontal" decorative /> : null}
          <div className="flex flex-col">
            <ListSectionHeading>{section.label}</ListSectionHeading>
            <List role="toolbar" aria-label={section.label}>
              {section.rows.map((row) => {
                const RowIcon = row.icon;
                return (
                  <ListItem key={row.href}>
                    <ListItemLink href={row.href}>
                      <Icon magnitude="md">
                        <RowIcon aria-hidden />
                      </Icon>
                      <ListItemLabel>{row.label}</ListItemLabel>
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Fragment>
      ))}
    </nav>
  ),
  play: async ({ canvas, userEvent }) => {
    // Rows resolve as real links by accessible name (icons are aria-hidden).
    await expect(canvas.getByRole("link", { name: "General" })).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Webhooks" })).toBeInTheDocument();

    // Arrow keys roam within a single section's list (one tab stop).
    const general = canvas.getByRole("link", { name: "General" });
    general.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("link", { name: "Members" })).toHaveFocus();
    // Drop focus so the resting view shows no focus ring.
    canvas.getByRole("link", { name: "Members" }).blur();
  },
};
