import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import { IconButton, IconButtonIcon } from "../icon-button";
import {
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogHeading,
  DialogPopup,
  DialogViewport,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, Portal, Trigger, and Close are behavior-only
// (they live in `components`), and the Backdrop/Title/Description are shared `internal/` chrome, so
// this in-tier story wires them straight from `@base-ui/react`. Trigger/Close compose the styled
// `Button`/`IconButton` — the styled primitive is the outer element so its look wins, the dialog
// part supplies the behavior.
const meta = {
  title: "Elements/Dialog",
  component: DialogViewport,
  subcomponents: {
    DialogPopup,
    DialogHeader,
    DialogHeading,
    DialogBody,
    DialogActions,
  },
} satisfies Meta<typeof DialogViewport>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: trigger opens a portaled, backdropped, centered popup. */
export const Anatomy: Story = {
  render: () => (
    <BaseDialog.Root>
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<BaseDialog.Trigger />}
      >
        Open dialog
      </Button>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop />
        <BaseDialog.Viewport render={<DialogViewport />}>
          <BaseDialog.Popup render={<DialogPopup magnitude="sm" />}>
            <DialogHeader>
              <DialogHeading>
                <BaseDialog.Title>Delete project</BaseDialog.Title>
              </DialogHeading>
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                aria-label="Close"
                render={<BaseDialog.Close />}
              >
                <IconButtonIcon>
                  <X />
                </IconButtonIcon>
              </IconButton>
            </DialogHeader>
            <DialogBody>
              <BaseDialog.Description>
                This permanently removes the project and all of its work items.
              </BaseDialog.Description>
            </DialogBody>
            <DialogActions>
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                render={<BaseDialog.Close />}
              >
                Cancel
              </Button>
            </DialogActions>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  ),
};

/**
 * Interaction test: opening the dialog, then Cancel closes it. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the dialog flash open and then close.
 */
export const CancelCloses: Story = {
  ...Anatomy,
  tags: ["!dev", "!autodocs", "!manifest"],
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
 * only closes via an explicit `Dialog.Close`.
 */
export const NonDismissable: Story = {
  render: () => (
    <BaseDialog.Root disablePointerDismissal>
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<BaseDialog.Trigger />}
      >
        Open locked dialog
      </Button>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop />
        <BaseDialog.Viewport render={<DialogViewport />}>
          <BaseDialog.Popup render={<DialogPopup magnitude="sm" />}>
            <DialogHeader>
              <DialogHeading>
                <BaseDialog.Title>Unsaved changes</BaseDialog.Title>
              </DialogHeading>
            </DialogHeader>
            <DialogBody>
              <BaseDialog.Description>
                Choose an action — clicking outside won&apos;t dismiss.
              </BaseDialog.Description>
            </DialogBody>
            <DialogActions>
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                render={<BaseDialog.Close />}
              >
                Discard
              </Button>
            </DialogActions>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  ),
};
