import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Copy, Scissors, Trash2 } from "lucide-react";
import { expect, fireEvent, waitFor } from "storybook/test";

import { Icon } from "../../internal/icon";
import {
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  ContextMenuPopup,
  ContextMenuSeparator,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, Trigger, Portal and Positioner are behavior-only
// (they live in `components`/`internal`), so this in-tier story wires them straight from
// `@base-ui/react` — the positioner bare (its shared styling lives in `internal`).
const meta = {
  title: "Elements/ContextMenu",
  component: ContextMenuPopup,
  subcomponents: {
    ContextMenuItem,
    ContextMenuItemLabel,
    ContextMenuItemShortcut,
    ContextMenuItemIndicator,
    ContextMenuSeparator,
    ContextMenuGroupLabel,
  },
} satisfies Meta<typeof ContextMenuPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerClass =
  "flex h-32 w-72 items-center justify-center rounded-lg border-sm border-dashed border-subtle text-13 text-tertiary select-none";

/** Right-click (or long-press) the area to open the popup assembled from raw parts. */
export const Default: Story = {
  render: () => (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger render={<div className={triggerClass} />}>
        Right-click here
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner>
          <BaseContextMenu.Popup render={<ContextMenuPopup />}>
            <BaseContextMenu.Group>
              <BaseContextMenu.GroupLabel render={<ContextMenuGroupLabel />}>
                Actions
              </BaseContextMenu.GroupLabel>
              <BaseContextMenu.Item render={<ContextMenuItem tone="neutral" />}>
                <Icon>
                  <Scissors />
                </Icon>
                <ContextMenuItemLabel>Cut</ContextMenuItemLabel>
                <ContextMenuItemShortcut>⌘X</ContextMenuItemShortcut>
              </BaseContextMenu.Item>
              <BaseContextMenu.Item render={<ContextMenuItem tone="neutral" />}>
                <Icon>
                  <Copy />
                </Icon>
                <ContextMenuItemLabel>Copy</ContextMenuItemLabel>
                <ContextMenuItemShortcut>⌘C</ContextMenuItemShortcut>
                <ContextMenuItemIndicator>
                  <Check />
                </ContextMenuItemIndicator>
              </BaseContextMenu.Item>
            </BaseContextMenu.Group>
            <BaseContextMenu.Separator render={<ContextMenuSeparator />} />
            <BaseContextMenu.Item render={<ContextMenuItem tone="danger" />}>
              <Icon>
                <Trash2 />
              </Icon>
              <ContextMenuItemLabel>Delete</ContextMenuItemLabel>
            </BaseContextMenu.Item>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await fireEvent.contextMenu(canvas.getByText("Right-click here"));
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Actions");
    await expect(document.body).toHaveTextContent("Delete");
  },
};
