import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

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
// and the popup body.
const triggerClass =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

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
      <DialogTrigger render={<button type="button" className={triggerClass} />}>
        Delete project
      </DialogTrigger>
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
              <DialogClose
                render={
                  <button type="button" aria-label="Close" className="size-7">
                    <X aria-hidden className="size-4" />
                  </button>
                }
              />
            </div>
            <DialogDescription>
              This permanently removes the project and all of its work items. This action can&apos;t
              be undone.
            </DialogDescription>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose render={<button type="button" className={triggerClass} />}>
              Cancel
            </DialogClose>
            <DialogClose
              render={
                <button
                  type="button"
                  className="inline-flex h-8 items-center rounded-md bg-danger-primary px-3 text-13 text-on-color outline-none"
                />
              }
            >
              Delete
            </DialogClose>
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
      <DialogTrigger render={<button type="button" className={triggerClass} />}>
        Open settings
      </DialogTrigger>
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
