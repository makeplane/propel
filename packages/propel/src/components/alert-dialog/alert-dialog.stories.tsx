import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./index";

// Components-tier story: uses the ready-made `AlertDialogContent`, which composes
// the portal/backdrop/centering-viewport/popup so a consumer only writes the
// trigger and the popup body.
const neutralButton =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";
const dangerButton =
  "inline-flex h-8 items-center rounded-md bg-danger-primary px-3 text-13 text-on-color outline-none";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  subcomponents: {
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogClose,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A destructive confirmation: it is modal and only closes through an explicit Cancel/Delete. */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<button type="button" className={dangerButton} />}>
        Delete project
      </AlertDialogTrigger>
      <AlertDialogContent>
        {/*
         * Two layout groups, separated by the parent's gap (never a margin on a
         * child): an "intro" (title + description) and the "actions" row. These
         * boundaries are the future anatomy surfaces — e.g. AlertDialogIntro and
         * AlertDialogActions — so define them correctly here before hardening.
         */}
        <div className="flex w-80 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the project and all of its work items. This action can&apos;t
              be undone.
            </AlertDialogDescription>
          </div>
          <div className="flex justify-end gap-2">
            <AlertDialogClose render={<button type="button" className={neutralButton} />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose render={<button type="button" className={dangerButton} />}>
              Delete
            </AlertDialogClose>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
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
