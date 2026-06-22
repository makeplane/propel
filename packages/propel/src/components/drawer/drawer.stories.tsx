import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

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
// writes the trigger and the panel body.
const triggerClass =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

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
      <DrawerTrigger render={<button type="button" className={triggerClass} />}>
        Open details
      </DrawerTrigger>
      <DrawerPanel>
        {/*
         * Two layout groups, separated by the panel's own gap: a header (title +
         * corner close) grouped with the description, then the body region.
         * Future anatomy surfaces — e.g. DrawerHeader and DrawerBody.
         */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <DrawerTitle>Work item details</DrawerTitle>
            <DrawerClose
              render={
                <button type="button" aria-label="Close" className="size-7">
                  <X aria-hidden className="size-4" />
                </button>
              }
            />
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
      <DrawerTrigger render={<button type="button" className={triggerClass} />}>
        Open filters
      </DrawerTrigger>
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
