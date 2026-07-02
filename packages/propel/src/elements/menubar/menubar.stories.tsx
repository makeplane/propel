import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";

import { MenuItem, MenuPopup, MenuSeparator } from "../menu/index";
import { Menubar, MenubarTrigger, MenubarTriggerLabel } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior grafts onto them via `render`. The `Menubar` container's menu-bar behavior (arrow-key
// navigation, single-open) is behavior-only (it lives in `components`), so this in-tier story
// grafts it straight from `@base-ui/react` — `<BaseMenubar render={<Menubar/>}>` — around a row of
// atomic `Menu` roots (Trigger › Portal › Positioner › Popup › Item). Each trigger composes its own
// anatomy (`MenubarTriggerLabel`, plus an optional `MenubarTriggerIcon`). The components-tier story
// swaps the popup assembly for the ready-made `MenuContent`.
const meta = {
  title: "Elements/Menubar",
  component: Menubar,
  subcomponents: {
    MenubarTrigger,
    MenubarTriggerLabel,
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
    <BaseMenubar render={<Menubar />}>
      <BaseMenu.Root>
        <MenubarTrigger render={<BaseMenu.Trigger />}>
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={4}>
            <BaseMenu.Popup render={<MenuPopup elevation="raised" />}>
              <BaseMenu.Item render={<MenuItem layout="default" />}>New file</BaseMenu.Item>
              <BaseMenu.Item render={<MenuItem layout="default" />}>Open…</BaseMenu.Item>
              <BaseMenu.Separator render={<MenuSeparator />} />
              <BaseMenu.Item render={<MenuItem layout="default" />}>Save</BaseMenu.Item>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
      <BaseMenu.Root>
        <MenubarTrigger render={<BaseMenu.Trigger />}>
          <MenubarTriggerLabel>Edit</MenubarTriggerLabel>
        </MenubarTrigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={4}>
            <BaseMenu.Popup render={<MenuPopup elevation="raised" />}>
              <BaseMenu.Item render={<MenuItem layout="default" />}>Undo</BaseMenu.Item>
              <BaseMenu.Item render={<MenuItem layout="default" />}>Redo</BaseMenu.Item>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    </BaseMenubar>
  ),
  play: async ({ canvas }) => {
    // Inside a Menubar, each menu trigger is a `role="menuitem"` (not a plain button).
    await userEvent.click(canvas.getByRole("menuitem", { name: "File" }));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("New file");
  },
};
