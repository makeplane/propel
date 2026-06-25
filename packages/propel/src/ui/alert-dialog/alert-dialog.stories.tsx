import type { Meta, StoryObj } from "@storybook/react-vite";
import { TriangleAlert } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogIntro,
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
    AlertDialogHeader,
    AlertDialogIcon,
    AlertDialogIntro,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogActions,
    AlertDialogClose,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: a destructive confirmation requiring an explicit choice. */
export const Anatomy: Story = {
  render: () => (
    <AlertDialog>
      <Button
        sizing="hug"
        prominence="primary"
        tone="danger"
        magnitude="xl"
        render={<AlertDialogTrigger />}
      >
        Delete account
      </Button>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogHeader>
              <AlertDialogIcon tone="danger">
                <TriangleAlert />
              </AlertDialogIcon>
              <AlertDialogIntro>
                <AlertDialogTitle>Delete account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently deletes your account and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogIntro>
            </AlertDialogHeader>
            <AlertDialogActions>
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                render={<AlertDialogClose />}
              >
                Cancel
              </Button>
              <Button
                sizing="hug"
                prominence="primary"
                tone="danger"
                magnitude="xl"
                render={<AlertDialogClose />}
              >
                Delete
              </Button>
            </AlertDialogActions>
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
