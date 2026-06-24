import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";

import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
} from "../menu/index";
import { Menubar, MenubarTrigger, MenubarTriggerLabel } from "./index";

// UI-tier story: the `Menubar` container hosts a row of atomic `Menu` roots, each
// assembled from raw parts (Trigger › Portal › Positioner › Popup › Item). Each
// trigger composes its own anatomy (`MenubarTriggerLabel`, plus an optional
// `MenubarTriggerIcon`). The components-tier story swaps the popup assembly for the
// ready-made `MenuContent`.
const meta = {
  title: "UI/Menubar",
  component: Menubar,
  subcomponents: {
    MenubarTrigger,
    MenubarTriggerLabel,
    Menu,
    MenuPortal,
    MenuPositioner,
    MenuPopup,
    MenuItem,
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A row of menus sharing arrow-key navigation and single-open behavior. */
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
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup surface="raised">
              <MenuItem emphasis="default" variant="default">
                New file
              </MenuItem>
              <MenuItem emphasis="default" variant="default">
                Open…
              </MenuItem>
              <MenuSeparator />
              <MenuItem emphasis="default" variant="default">
                Save
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      <Menu>
        <MenubarTrigger>
          <MenubarTriggerLabel>Edit</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup surface="raised">
              <MenuItem emphasis="default" variant="default">
                Undo
              </MenuItem>
              <MenuItem emphasis="default" variant="default">
                Redo
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  ),
  play: async ({ canvas }) => {
    // Inside a Menubar, each menu trigger is a `role="menuitem"` (not a plain button).
    await userEvent.click(canvas.getByRole("menuitem", { name: "File" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("New file");
  },
};
