import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, waitFor } from "storybook/test";

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./index";

// UI-tier story: assemble the ATOMIC context-menu parts by hand — Root › Trigger,
// then Portal › Positioner › Popup wrapping items, separators and groups. The
// components-tier story uses the rich `ContextMenuItem` (icon + label) rows.
const meta = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  subcomponents: {
    ContextMenuTrigger,
    ContextMenuPortal,
    ContextMenuPositioner,
    ContextMenuPopup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuGroup,
    ContextMenuGroupLabel,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerClass =
  "flex h-32 w-72 items-center justify-center rounded-lg border-sm border-dashed border-subtle text-13 text-tertiary select-none";

/** Right-click (or long-press) the area to open the popup assembled from raw parts. */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger render={<div className={triggerClass} />}>
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>
            <ContextMenuGroup>
              <ContextMenuGroupLabel>Actions</ContextMenuGroupLabel>
              <ContextMenuItem>Cut</ContextMenuItem>
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuItem>Paste</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  ),
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Actions");
    await expect(document.body).toHaveTextContent("Delete");
  },
};
