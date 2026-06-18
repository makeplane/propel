import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC dialog parts (Root › Trigger › Portal ›
// Backdrop › Viewport › Popup, plus Title/Description/Close). The components-tier
// `DialogContent` ready-made composes the portal/backdrop/viewport/popup for you;
// here you wire that boilerplate by hand.
const triggerClass =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  subcomponents: {
    DialogTrigger,
    DialogPortal,
    DialogBackdrop,
    DialogViewport,
    DialogPopup,
    DialogTitle,
    DialogDescription,
    DialogClose,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: trigger opens a portaled, backdropped, centered popup. */
export const Anatomy: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<button type="button" className={triggerClass} />}>
        Open dialog
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <div className="flex w-80 flex-col gap-2">
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
                This permanently removes the project and all of its work items.
              </DialogDescription>
              <div className="mt-2 flex justify-end gap-2">
                <DialogClose render={<button type="button" className={triggerClass} />}>
                  Cancel
                </DialogClose>
              </div>
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }));
    const dialog = await within(document.body).findByRole("dialog");
    await expect(within(dialog).getByText("Delete project")).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

/**
 * `disablePointerDismissal` on the root keeps the dialog open when the backdrop is clicked, so it
 * only closes via an explicit `DialogClose`.
 */
export const NonDismissable: Story = {
  render: () => (
    <Dialog disablePointerDismissal>
      <DialogTrigger render={<button type="button" className={triggerClass} />}>
        Open locked dialog
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <div className="flex w-80 flex-col gap-2">
              <DialogTitle>Unsaved changes</DialogTitle>
              <DialogDescription>
                Choose an action — clicking outside won&apos;t dismiss.
              </DialogDescription>
              <div className="mt-2 flex justify-end">
                <DialogClose render={<button type="button" className={triggerClass} />}>
                  Discard
                </DialogClose>
              </div>
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  ),
};
