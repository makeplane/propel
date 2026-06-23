import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, FilePlus, FolderOpen, Redo2, Save, Scissors, Undo2 } from "lucide-react";
import { expect, userEvent, waitFor } from "storybook/test";

import { Menu, MenuContent, MenuItem, MenuSeparator } from "../menu/index";
import { Menubar, MenubarTrigger } from "./index";

// Components-tier story: the `Menubar` container hosts a row of `Menu` roots, each
// using the ready-made `MenuContent` surface plus the rich `MenuItem` rows
// (icon + label). The UI-tier story assembles the popup parts by hand.
const meta = {
  title: "Components/Menubar",
  component: Menubar,
  subcomponents: { MenubarTrigger, Menu, MenuContent, MenuItem },
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
        <MenubarTrigger>File</MenubarTrigger>
        <MenuContent width="sm">
          <MenuItem variant="default" inlineStartNode={<FilePlus />} label="New file" />
          <MenuItem variant="default" inlineStartNode={<FolderOpen />} label="Open…" />
          <MenuSeparator />
          <MenuItem variant="default" inlineStartNode={<Save />} label="Save" />
        </MenuContent>
      </Menu>
      <Menu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenuContent width="sm">
          <MenuItem variant="default" inlineStartNode={<Undo2 />} label="Undo" />
          <MenuItem variant="default" inlineStartNode={<Redo2 />} label="Redo" />
          <MenuSeparator />
          <MenuItem variant="default" inlineStartNode={<Scissors />} label="Cut" />
          <MenuItem variant="default" inlineStartNode={<Copy />} label="Copy" />
        </MenuContent>
      </Menu>
    </Menubar>
  ),
  play: async ({ canvas }) => {
    // Inside a Menubar, each menu trigger is a `role="menuitem"` (not a plain button).
    await userEvent.click(canvas.getByRole("menuitem", { name: "Edit" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Undo");
    await expect(document.body).toHaveTextContent("Redo");
  },
};
