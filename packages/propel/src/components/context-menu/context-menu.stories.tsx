import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardPaste, Copy, Scissors, Trash2 } from "lucide-react";
import { expect, fireEvent, waitFor } from "storybook/test";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "./index";

// Components-tier story: the ready-made `ContextMenu` root and `ContextMenuContent` surface graft
// Base UI's portal/positioner/popup, and the rich `ContextMenuItem` lays out an icon + label + a
// trailing shortcut. The Trigger and Separator are Base UI behavior parts grafted onto propel
// styling via `render`. The elements-tier story composes the raw `ContextMenuItem` rows by hand.
const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  subcomponents: {
    ContextMenuContent,
    ContextMenuItem,
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
      <BaseContextMenu.Trigger render={<div className={triggerClass} />}>
        Right-click here
      </BaseContextMenu.Trigger>
      <ContextMenuContent>
        <ContextMenuItem tone="neutral" inlineStartNode={<Scissors />} inlineEndNode="⌘X">
          Cut
        </ContextMenuItem>
        <ContextMenuItem tone="neutral" inlineStartNode={<Copy />} inlineEndNode="⌘C">
          Copy
        </ContextMenuItem>
        <ContextMenuItem tone="neutral" inlineStartNode={<ClipboardPaste />} inlineEndNode="⌘V">
          Paste
        </ContextMenuItem>
        <BaseContextMenu.Separator render={<ContextMenuSeparator />} />
        <ContextMenuItem tone="danger" inlineStartNode={<Trash2 />}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Copy");
    await expect(document.body).toHaveTextContent("Delete");
  },
};
