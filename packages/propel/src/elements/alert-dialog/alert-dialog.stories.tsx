import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TriangleAlert } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import {
  AlertDialogActions,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogIntro,
  AlertDialogPopup,
  AlertDialogViewport,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, Trigger, Portal, Backdrop, Title, and
// Description are behavior-only or shared `internal` primitives (they live in `components`), so this
// in-tier story wires them straight from `@base-ui/react` — bare, without propel styling. Trigger
// and Close compose the `Button` primitive via `render` (Button is the styled outer element).
const meta = {
  title: "Elements/AlertDialog",
  component: AlertDialogPopup,
  subcomponents: {
    AlertDialogViewport,
    AlertDialogHeader,
    AlertDialogIcon,
    AlertDialogIntro,
    AlertDialogActions,
  },
} satisfies Meta<typeof AlertDialogPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: a destructive confirmation requiring an explicit choice. */
export const Anatomy: Story = {
  render: () => (
    <BaseAlertDialog.Root>
      <Button
        sizing="hug"
        prominence="primary"
        tone="danger"
        magnitude="xl"
        render={<BaseAlertDialog.Trigger />}
      >
        Delete account
      </Button>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop />
        <BaseAlertDialog.Viewport render={<AlertDialogViewport />}>
          <BaseAlertDialog.Popup render={<AlertDialogPopup />}>
            <AlertDialogHeader>
              <AlertDialogIcon tone="danger">
                <TriangleAlert />
              </AlertDialogIcon>
              <AlertDialogIntro>
                <BaseAlertDialog.Title>Delete account?</BaseAlertDialog.Title>
                <BaseAlertDialog.Description>
                  This permanently deletes your account and cannot be undone.
                </BaseAlertDialog.Description>
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
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  ),
};

/**
 * Interaction test: opening it, then Cancel closes it. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag — so a browsing user never sees the dialog flash
 * open and then close.
 */
export const CancelCloses: Story = {
  ...Anatomy,
  tags: ["!dev", "!autodocs", "!manifest"],
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
