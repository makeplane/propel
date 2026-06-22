import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC alert-dialog parts by hand (Root › Trigger ›
// Portal › Backdrop › Viewport › Popup, plus Title/Description/Close). The
// components-tier `AlertDialogContent` ready-made composes the portal/backdrop/
// viewport/popup for you. AlertDialog is always modal and non-dismissible, so it
// requires an explicit Close response. Trigger and Close compose the `Button`
// primitive via Base UI's `render` prop rather than raw `<button>` elements.

const meta = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  subcomponents: {
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogBackdrop,
    AlertDialogViewport,
    AlertDialogPopup,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogClose,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: a destructive confirmation requiring an explicit choice. */
export const Anatomy: Story = {
  render: () => (
    <AlertDialog>
      <Button variant="primary" tone="danger" magnitude="xl" render={<AlertDialogTrigger />}>
        Delete account
      </Button>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            {/*
             * Two layout groups, separated by the parent's gap (never a margin on a
             * child): an "intro" (title + description) and the "actions" row. These
             * boundaries are the future anatomy surfaces — e.g. AlertDialogIntro and
             * AlertDialogActions — so define them correctly here before hardening.
             */}
            <div className="flex w-80 flex-col gap-4">
              <div className="flex flex-col gap-2">
                <AlertDialogTitle>Delete account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently deletes your account and cannot be undone.
                </AlertDialogDescription>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  tone="neutral"
                  magnitude="xl"
                  render={<AlertDialogClose />}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  tone="danger"
                  magnitude="xl"
                  render={<AlertDialogClose />}
                >
                  Delete
                </Button>
              </div>
            </div>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Delete account" }));
    const dialog = await within(document.body).findByRole("alertdialog");
    await expect(within(dialog).getByText("Delete account?")).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  },
};
