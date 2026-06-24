import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardPaste, Copy, Scissors, Trash2 } from "lucide-react";
import { expect, fireEvent, waitFor } from "storybook/test";

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./index";

// Components-tier story: the rich `ContextMenuItem` lays out an icon + label + a
// trailing shortcut, plus a single-select check. The UI-tier story composes the
// raw `ContextMenuItem` rows by hand.
const meta = {
  title: "Components/ContextMenu",
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
    ContextMenuSeparator,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerClass =
  "flex h-32 w-72 items-center justify-center rounded-lg border-sm border-dashed border-subtle text-13 text-tertiary select-none";

/** Right-click the area to open a ready-made menu of icon + label rows. */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger render={<div className={triggerClass} />}>
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>
            <ContextMenuItem tone="neutral" inlineStartNode={<Scissors />} inlineEndNode="⌘X">
              Cut
            </ContextMenuItem>
            <ContextMenuItem tone="neutral" inlineStartNode={<Copy />} inlineEndNode="⌘C">
              Copy
            </ContextMenuItem>
            <ContextMenuItem tone="neutral" inlineStartNode={<ClipboardPaste />} inlineEndNode="⌘V">
              Paste
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem tone="danger" inlineStartNode={<Trash2 />}>
              Delete
            </ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  ),
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Copy");
    await expect(document.body).toHaveTextContent("Delete");
  },
};
