import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Copy, Scissors, Trash2 } from "lucide-react";
import { expect, fireEvent, waitFor } from "storybook/test";

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuSubmenuTriggerIndicator,
  ContextMenuTrigger,
} from "./index";

// UI-tier story: assemble the ATOMIC context-menu parts by hand — Root › Trigger,
// then Portal › Positioner › Popup wrapping items composed from their region parts
// (icon, label, shortcut, indicator), separators and groups. The components-tier
// story uses the rich `ContextMenuItem` (icon + label) rows.
const meta = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  subcomponents: {
    ContextMenuTrigger,
    ContextMenuPortal,
    ContextMenuPositioner,
    ContextMenuPopup,
    ContextMenuItem,
    ContextMenuItemIcon,
    ContextMenuItemLabel,
    ContextMenuItemShortcut,
    ContextMenuItemIndicator,
    ContextMenuSubmenuTriggerIndicator,
    ContextMenuSeparator,
    ContextMenuGroup,
    ContextMenuGroupLabel,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerClass =
  "flex h-32 w-72 items-center justify-center rounded-lg border-sm border-dashed border-subtle text-13 text-tertiary select-none";

const renderDefault = () => (
  <ContextMenu>
    <ContextMenuTrigger render={<div className={triggerClass} />}>
      Right-click here
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuPositioner>
        <ContextMenuPopup>
          <ContextMenuGroup>
            <ContextMenuGroupLabel>Actions</ContextMenuGroupLabel>
            <ContextMenuItem tone="neutral">
              <ContextMenuItemIcon>
                <Scissors />
              </ContextMenuItemIcon>
              <ContextMenuItemLabel>Cut</ContextMenuItemLabel>
              <ContextMenuItemShortcut>⌘X</ContextMenuItemShortcut>
            </ContextMenuItem>
            <ContextMenuItem tone="neutral">
              <ContextMenuItemIcon>
                <Copy />
              </ContextMenuItemIcon>
              <ContextMenuItemLabel>Copy</ContextMenuItemLabel>
              <ContextMenuItemShortcut>⌘C</ContextMenuItemShortcut>
              <ContextMenuItemIndicator>
                <Check />
              </ContextMenuItemIndicator>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem tone="danger">
            <ContextMenuItemIcon>
              <Trash2 />
            </ContextMenuItemIcon>
            <ContextMenuItemLabel>Delete</ContextMenuItemLabel>
          </ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenuPositioner>
    </ContextMenuPortal>
  </ContextMenu>
);

/** Right-click (or long-press) the area to open the popup assembled from raw parts. */
export const Default: Story = {
  render: () => renderDefault(),
};

export const DefaultInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => renderDefault(),
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Actions");
    await expect(document.body).toHaveTextContent("Delete");
  },
};
