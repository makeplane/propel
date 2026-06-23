import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../../ui/button";
import { IconButton } from "../icon-button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

// Components-tier story: uses the ready-made `DrawerPanel`, which composes the
// portal/backdrop/edge-viewport/sliding-popup/padded-content so a consumer only
// writes the trigger and the panel body. Trigger/Close compose the `Button` (or
// `IconButton` for the corner close) primitive via Base UI's `render` prop — the
// styled primitive is the outer element so its look wins, the drawer part supplies
// the behavior.

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  subcomponents: { DrawerTrigger, DrawerPanel, DrawerTitle, DrawerDescription, DrawerClose },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A right-edge panel: title, dismiss button, and body. Opens from the trigger and slides in. */
export const Default: Story = {
  render: () => (
    <Drawer>
      <Button variant="secondary" tone="neutral" magnitude="xl" render={<DrawerTrigger />}>
        Open details
      </Button>
      <DrawerPanel>
        {/*
         * Two layout groups, separated by the panel's own gap: a header (title +
         * corner close) grouped with the description, then the body region.
         * Future anatomy surfaces — e.g. DrawerHeader and DrawerBody.
         */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <DrawerTitle>Work item details</DrawerTitle>
            <IconButton
              variant="ghost"
              tone="neutral"
              magnitude="lg"
              aria-label="Close"
              render={<DrawerClose />}
            >
              <X />
            </IconButton>
          </div>
          <DrawerDescription>Edit the fields for this work item.</DrawerDescription>
        </div>
        <div className="text-14 text-secondary">Panel body content goes here.</div>
      </DrawerPanel>
    </Drawer>
  ),
  play: async ({ canvas, step }) => {
    await step("open the drawer", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Open details" }));
      const dialog = await within(document.body).findByRole("dialog");
      await expect(within(dialog).getByText("Work item details")).toBeInTheDocument();
    });
    await step("close it with the dismiss button", async () => {
      const dialog = within(document.body).getByRole("dialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
      );
    });
  },
};

/**
 * Keyboard ARIA pattern: `Escape` closes the drawer and restores focus to the trigger. Tagged out
 * of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const EscapeCloses: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Drawer>
      <Button variant="secondary" tone="neutral" magnitude="xl" render={<DrawerTrigger />}>
        Open filters
      </Button>
      <DrawerPanel>
        <DrawerTitle>Filters</DrawerTitle>
        <DrawerDescription>Press Escape to dismiss.</DrawerDescription>
      </DrawerPanel>
    </Drawer>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Open filters" });
    await userEvent.click(trigger);
    await within(document.body).findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
  },
};
