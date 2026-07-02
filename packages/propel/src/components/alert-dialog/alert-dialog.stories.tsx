import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TriangleAlert } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../../elements/button";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogIntro,
  AlertDialogTitle,
} from "./index";

// Components-tier story: uses the ready-made `AlertDialogContent`, which composes the
// portal/backdrop/centering-viewport/popup so a consumer only writes the trigger and the popup
// body. Trigger and Close are behavior-only Base UI parts; the styled `Button` primitive composes
// them via `render` (Button is the styled outer element so its styling wins, while the dialog part
// it renders supplies the open/close behavior).

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  subcomponents: {
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogIcon,
    AlertDialogIntro,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogActions,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A destructive confirmation: it is modal and only closes through an explicit Cancel/Delete. */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <Button
        sizing="hug"
        prominence="primary"
        tone="danger"
        magnitude="xl"
        render={<BaseAlertDialog.Trigger />}
      >
        Delete project
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogIcon tone="danger">
            <TriangleAlert />
          </AlertDialogIcon>
          <AlertDialogIntro>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the project and all of its work items. This action can&apos;t
              be undone.
            </AlertDialogDescription>
          </AlertDialogIntro>
        </AlertDialogHeader>
        <AlertDialogActions>
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            render={<BaseAlertDialog.Close />}
          >
            Cancel
          </Button>
          <Button
            sizing="hug"
            prominence="primary"
            tone="danger"
            magnitude="xl"
            render={<BaseAlertDialog.Close />}
          >
            Delete
          </Button>
        </AlertDialogActions>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * Interaction test: it opens, an outside click does NOT dismiss it (always modal), and Cancel
 * closes it. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag — so a browsing user never sees the dialog flash open and then close.
 */
export const ModalDismissal: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open the alert dialog", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Delete project" }));
      const dialog = await within(document.body).findByRole("alertdialog");
      await expect(within(dialog).getByText(/permanently removes/)).toBeInTheDocument();
    });
    await step("an outside click does NOT dismiss (always modal)", async () => {
      await userEvent.click(document.body);
      await expect(within(document.body).getByRole("alertdialog")).toBeInTheDocument();
    });
    await step("Cancel closes it", async () => {
      const dialog = within(document.body).getByRole("alertdialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument(),
      );
    });
  },
};
