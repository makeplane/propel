import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

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
// requires an explicit Close response.
const neutralButton =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";
const dangerButton =
  "inline-flex h-8 items-center rounded-md bg-danger-primary px-3 text-13 text-on-color outline-none";

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
      <AlertDialogTrigger render={<button type="button" className={dangerButton} />}>
        Delete account
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <div className="flex w-80 flex-col gap-2">
              <AlertDialogTitle>Delete account?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently deletes your account and cannot be undone.
              </AlertDialogDescription>
              <div className="mt-2 flex justify-end gap-2">
                <AlertDialogClose render={<button type="button" className={neutralButton} />}>
                  Cancel
                </AlertDialogClose>
                <AlertDialogClose render={<button type="button" className={dangerButton} />}>
                  Delete
                </AlertDialogClose>
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
