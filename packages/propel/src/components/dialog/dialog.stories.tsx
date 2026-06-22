import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../../ui/button";
import { IconButton } from "../../ui/icon-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./index";

// Components-tier story: uses the ready-made `DialogContent`, which composes the
// portal/backdrop/centering-viewport/popup so a consumer only writes the trigger
// and the popup body. Trigger/Close compose the `Button` (or `IconButton` for the
// corner close) primitive via Base UI's `render` prop — the styled primitive is the
// outer element so its look wins, the dialog part supplies the behavior.

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  subcomponents: { DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A confirmation dialog: title, description, and a footer of cancel / confirm actions. */
export const Default: Story = {
  render: () => (
    <Dialog>
      <Button variant="secondary" tone="neutral" magnitude="xl" render={<DialogTrigger />}>
        Delete project
      </Button>
      <DialogContent>
        {/*
         * Layout groups separated by the parent's gap (never a margin on a child):
         * a header (title + corner close) grouped with the description, then the
         * actions row. Future anatomy surfaces — e.g. DialogHeader and DialogActions.
         */}
        <div className="flex w-80 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle>Delete project</DialogTitle>
              <IconButton
                variant="ghost"
                tone="neutral"
                magnitude="lg"
                aria-label="Close"
                render={<DialogClose />}
              >
                <X />
              </IconButton>
            </div>
            <DialogDescription>
              This permanently removes the project and all of its work items. This action can&apos;t
              be undone.
            </DialogDescription>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" tone="neutral" magnitude="xl" render={<DialogClose />}>
              Cancel
            </Button>
            <Button variant="primary" tone="danger" magnitude="xl" render={<DialogClose />}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas, step }) => {
    await step("open the dialog", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Delete project" }));
      const dialog = await within(document.body).findByRole("dialog");
      await expect(within(dialog).getByText(/permanently removes/)).toBeInTheDocument();
    });
    await step("Cancel closes the dialog", async () => {
      const dialog = within(document.body).getByRole("dialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
      );
    });
  },
};

/**
 * Keyboard ARIA pattern: opening the dialog moves focus into it and `Escape` closes it, restoring
 * focus to the trigger. Tagged out of the sidebar/docs/manifest while still running under `test`.
 */
export const EscapeCloses: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Dialog>
      <Button variant="secondary" tone="neutral" magnitude="xl" render={<DialogTrigger />}>
        Open settings
      </Button>
      <DialogContent>
        <div className="flex w-80 flex-col gap-2">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Press Escape to dismiss.</DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Open settings" });
    await userEvent.click(trigger);
    await within(document.body).findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
  },
};
