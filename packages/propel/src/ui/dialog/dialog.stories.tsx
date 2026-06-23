import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { IconButton } from "../../components/icon-button";
import { Button } from "../button";
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
// here you wire that boilerplate by hand. Trigger/Close compose the `Button` (or
// `IconButton` for the corner close) primitive via Base UI's `render` prop — the
// styled primitive is the outer element so its look wins, the dialog part supplies
// the behavior.

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
      <Button variant="secondary" tone="neutral" magnitude="xl" render={<DialogTrigger />}>
        Open dialog
      </Button>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
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
                  This permanently removes the project and all of its work items.
                </DialogDescription>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" tone="neutral" magnitude="xl" render={<DialogClose />}>
                  Cancel
                </Button>
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
      <Button variant="secondary" tone="neutral" magnitude="xl" render={<DialogTrigger />}>
        Open locked dialog
      </Button>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <div className="flex w-80 flex-col gap-4">
              <div className="flex flex-col gap-2">
                <DialogTitle>Unsaved changes</DialogTitle>
                <DialogDescription>
                  Choose an action — clicking outside won&apos;t dismiss.
                </DialogDescription>
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" tone="neutral" magnitude="xl" render={<DialogClose />}>
                  Discard
                </Button>
              </div>
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  ),
};
