import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { IconButton } from "../../components/icon-button";
import { Button } from "../button";
import {
  Dialog,
  DialogActions,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogHeading,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC dialog parts (Root › Trigger › Portal ›
// Backdrop › Viewport › Popup, plus Header/Body/Actions/Title/Description/Close).
// The components-tier `DialogContent` ready-made composes the portal/backdrop/
// viewport/popup for you; here you wire that boilerplate by hand.
// Trigger/Close compose the `Button` (or `IconButton` for the corner close)
// primitive via Base UI's `render` prop — the styled primitive is the outer
// element so its look wins, the dialog part supplies the behavior.

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  subcomponents: {
    DialogTrigger,
    DialogPortal,
    DialogBackdrop,
    DialogViewport,
    DialogPopup,
    DialogHeader,
    DialogHeading,
    DialogBody,
    DialogActions,
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
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<DialogTrigger />}
      >
        Open dialog
      </Button>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup magnitude="sm">
            <DialogHeader>
              <DialogHeading>
                <DialogTitle>Delete project</DialogTitle>
              </DialogHeading>
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                aria-label="Close"
                render={<DialogClose />}
              >
                <X />
              </IconButton>
            </DialogHeader>
            <DialogBody>
              <DialogDescription>
                This permanently removes the project and all of its work items.
              </DialogDescription>
            </DialogBody>
            <DialogActions>
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                render={<DialogClose />}
              >
                Cancel
              </Button>
            </DialogActions>
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
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<DialogTrigger />}
      >
        Open locked dialog
      </Button>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup magnitude="sm">
            <DialogHeader>
              <DialogHeading>
                <DialogTitle>Unsaved changes</DialogTitle>
              </DialogHeading>
            </DialogHeader>
            <DialogBody>
              <DialogDescription>
                Choose an action — clicking outside won&apos;t dismiss.
              </DialogDescription>
            </DialogBody>
            <DialogActions>
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                render={<DialogClose />}
              >
                Discard
              </Button>
            </DialogActions>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  ),
};
