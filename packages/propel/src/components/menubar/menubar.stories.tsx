import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Copy,
  FileOutput,
  FilePlus,
  FilePen,
  FolderOpen,
  LayoutGrid,
  Pencil,
  Printer,
  Redo2,
  Save,
  Scissors,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Icon } from "../../internal/icon";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
} from "../menu/index";
import { Menubar, MenubarTrigger, MenubarTriggerLabel } from "./index";

// Components-tier story: the `Menubar` container hosts a row of `Menu` roots, each
// using the ready-made `MenubarTrigger` (Base UI's `Menu.Trigger` behavior already
// grafted) plus the `MenuContent` surface and the rich `MenuItem` rows (icon + label).
// Each trigger composes its anatomy — a leading `MenubarTriggerIcon` (the designer's
// "whether items have icons" axis) and a `MenubarTriggerLabel`. The elements-tier
// story assembles the popup parts by hand.
const meta = {
  title: "Components/Menubar",
  component: Menubar,
  subcomponents: {
    MenubarTrigger,
    MenubarTriggerLabel,
    Menu,
    MenuContent,
    MenuItem,
    MenuSeparator,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuSubmenuContent,
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A row of menus, each opening a ready-made `MenuContent` of icon rows. */
export const Default: Story = {
  parameters: {
    a11y: {
      // With a menu open, Base UI's Menubar treats each menu as a submenu and emits a
      // visually-hidden `aria-owns` owner `<span>` to reparent the portaled popup into
      // the correct place in the accessibility tree. In the DOM that span lands inside
      // the `role="menubar"`, which axe's aria-required-children flags as a disallowed
      // child — a static-analysis false-positive (same as the Menu Submenu story; see
      // dequelabs/axe-core#4048 and floating-ui/floating-ui#3424). Suppress just this rule.
      config: { rules: [{ id: "aria-required-children", enabled: false }] },
    },
  },
  render: () => (
    <Menubar>
      <Menu>
        <MenubarTrigger>
          <Icon tint="secondary">
            <FilePen />
          </Icon>
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<FilePlus />}>New file</MenuItem>
          <MenuItem icon={<FolderOpen />}>Open…</MenuItem>
          <MenuSeparator />
          <MenuItem icon={<Save />}>Save</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenubarTrigger>
          <Icon tint="secondary">
            <Pencil />
          </Icon>
          <MenubarTriggerLabel>Edit</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<Undo2 />}>Undo</MenuItem>
          <MenuItem icon={<Redo2 />}>Redo</MenuItem>
          <MenuSeparator />
          <MenuItem icon={<Scissors />}>Cut</MenuItem>
          <MenuItem icon={<Copy />}>Copy</MenuItem>
        </MenuContent>
      </Menu>
    </Menubar>
  ),
};

/**
 * Interaction test: a menubar trigger is a `role="menuitem"` and clicking it opens its menu. Tagged
 * out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // Inside a Menubar, each menu trigger is a `role="menuitem"` (not a plain button).
    await userEvent.click(canvas.getByRole("menuitem", { name: "Edit" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Undo");
    await expect(document.body).toHaveTextContent("Redo");
  },
};

/**
 * A menubar menu nests submenus like a document editor's: the File menu's Export row and the View
 * menu's Layout row (built on `MenuSubmenu`) each open a nested `MenuSubmenuContent` of options.
 */
export const Submenu: Story = {
  parameters: {
    a11y: {
      // Same axe static-analysis false-positive as `Default` (Base UI's `aria-owns` owner
      // `<span>` inside `role="menubar"`/`role="menu"`; dequelabs/axe-core#4048,
      // floating-ui/floating-ui#3424). Suppress just this rule.
      config: { rules: [{ id: "aria-required-children", enabled: false }] },
    },
  },
  render: () => (
    <Menubar>
      <Menu>
        <MenubarTrigger>
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<FilePlus />}>New file</MenuItem>
          <MenuItem icon={<FolderOpen />}>Open…</MenuItem>
          <MenuSeparator />
          <MenuSubmenu>
            <MenuSubmenuTrigger icon={<FileOutput />}>Export</MenuSubmenuTrigger>
            <MenuSubmenuContent sizing="sm">
              <MenuItem>PDF</MenuItem>
              <MenuItem>PNG</MenuItem>
              <MenuItem>SVG</MenuItem>
            </MenuSubmenuContent>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem icon={<Printer />}>Print…</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenubarTrigger>
          <MenubarTriggerLabel>View</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<ZoomIn />}>Zoom in</MenuItem>
          <MenuItem icon={<ZoomOut />}>Zoom out</MenuItem>
          <MenuSeparator />
          <MenuSubmenu>
            <MenuSubmenuTrigger icon={<LayoutGrid />}>Layout</MenuSubmenuTrigger>
            <MenuSubmenuContent sizing="sm">
              <MenuItem>Single page</MenuItem>
              <MenuItem>Two pages</MenuItem>
              <MenuItem>Continuous</MenuItem>
            </MenuSubmenuContent>
          </MenuSubmenu>
        </MenuContent>
      </Menu>
    </Menubar>
  ),
};

/**
 * Interaction test: the Export row inside a menubar menu is a submenu trigger
 * (`aria-haspopup="menu"`) and activating it opens the nested menu of formats.
 */
export const SubmenuInteraction: Story = {
  ...Submenu,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const body = within(document.body);
    // Open the File menu from the bar (its trigger is a `role="menuitem"`).
    await userEvent.click(canvas.getByRole("menuitem", { name: "File" }));
    const exportRow = await body.findByRole("menuitem", { name: "Export" });
    await expect(exportRow).toHaveAttribute("aria-haspopup", "menu");
    // Activating the row opens the nested submenu alongside the parent menu.
    await userEvent.click(exportRow);
    await body.findByRole("menuitem", { name: "PDF" });
    await waitFor(() =>
      expect(document.body.querySelectorAll('[role="menu"]').length).toBeGreaterThan(1),
    );
  },
};

/**
 * A whole menu can be disabled via `disabled` on its `Menu` root — its trigger stays in the bar for
 * layout stability but is grayed out and cannot open, like a Help menu that has no content yet.
 */
export const DisabledMenu: Story = {
  parameters: {
    a11y: {
      // Same axe static-analysis false-positive as `Default` (Base UI's `aria-owns` owner
      // `<span>` inside `role="menubar"`; dequelabs/axe-core#4048,
      // floating-ui/floating-ui#3424). Suppress just this rule.
      config: { rules: [{ id: "aria-required-children", enabled: false }] },
    },
  },
  render: () => (
    <Menubar>
      <Menu>
        <MenubarTrigger>
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<FilePlus />}>New file</MenuItem>
          <MenuItem icon={<FolderOpen />}>Open…</MenuItem>
          <MenuSeparator />
          <MenuItem icon={<Save />}>Save</MenuItem>
        </MenuContent>
      </Menu>
      <Menu disabled>
        <MenubarTrigger>
          <MenubarTriggerLabel>Help</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem>Documentation</MenuItem>
          <MenuItem>Keyboard shortcuts</MenuItem>
        </MenuContent>
      </Menu>
    </Menubar>
  ),
};

/**
 * Interaction test: disabling a `Menu` root lands the disabled state on its menubar trigger
 * (`data-disabled`, so it cannot open its menu) while sibling menus keep working.
 */
export const DisabledMenuInteraction: Story = {
  ...DisabledMenu,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // The disabled state lands on the real rendered trigger, which the bar styles inert.
    const help = canvas.getByRole("menuitem", { name: "Help" });
    await expect(help).toHaveAttribute("data-disabled");
    await expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument();
    // Sibling menus stay fully functional.
    await userEvent.click(canvas.getByRole("menuitem", { name: "File" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("New file");
  },
};
