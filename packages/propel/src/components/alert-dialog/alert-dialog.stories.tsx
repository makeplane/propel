import type { Meta, StoryObj } from "@storybook/react-vite";
import { TriangleAlert } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogHeading,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "../menu";
import { TextArea, TextAreaGroup } from "../text-area";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogIntro,
  AlertDialogTitle,
  AlertDialogTrigger,
  createAlertDialogHandle,
} from "./index";

// Components-tier story: uses the ready-made `AlertDialogContent`, which composes the
// portal/backdrop/centering-viewport/popup so a consumer only writes the trigger and the popup
// body. Trigger/Close compose the `Button` primitive via Base UI's `render` prop — the styled
// primitive is the outer element so its styling wins, while the dialog part it renders supplies
// the open/close behavior.

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  subcomponents: {
    AlertDialogTrigger,
    AlertDialogContent,
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

/** A destructive confirmation: it is modal and only closes through an explicit Cancel/Delete. */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <Button
        sizing="hug"
        prominence="primary"
        tone="danger"
        magnitude="xl"
        render={<AlertDialogTrigger />}
        label="Delete project"
      />
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
            render={<AlertDialogClose />}
            label="Cancel"
          />
          <Button
            sizing="hug"
            prominence="primary"
            tone="danger"
            magnitude="xl"
            render={<AlertDialogClose />}
            label="Delete"
          />
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

/**
 * A destructive action inside an actions menu: choosing “Delete project…” opens the confirmation.
 * The alert dialog is controlled (`open`/`onOpenChange`) because a menu item — not an
 * `AlertDialogTrigger` — opens it.
 */
export const OpenFromMenu: Story = {
  render: function Render() {
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    return (
      <>
        <Menu>
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            render={<MenuTrigger />}
            label="Project options"
          />
          <MenuContent sizing="sm">
            <MenuItem label="Rename" />
            <MenuItem label="Duplicate" />
            <MenuItem onClick={() => setConfirmOpen(true)} label="Delete project…" />
          </MenuContent>
        </Menu>
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogIcon tone="danger">
                <TriangleAlert />
              </AlertDialogIcon>
              <AlertDialogIntro>
                <AlertDialogTitle>Delete project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the project and all of its work items. This action
                  can&apos;t be undone.
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
                label="Cancel"
              />
              <Button
                sizing="hug"
                prominence="primary"
                tone="danger"
                magnitude="xl"
                render={<AlertDialogClose />}
                label="Delete"
              />
            </AlertDialogActions>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

/**
 * Interaction test: the menu item opens the controlled alert dialog (closing the menu), and Delete
 * closes it. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const OpenFromMenuInteraction: Story = {
  ...OpenFromMenu,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("the destructive menu item opens the confirmation", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Project options" }));
      const menu = await within(document.body).findByRole("menu");
      await userEvent.click(within(menu).getByRole("menuitem", { name: /Delete project/ }));
      const dialog = await within(document.body).findByRole("alertdialog");
      await expect(within(dialog).getByText(/permanently removes/)).toBeInTheDocument();
      await waitFor(() =>
        expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument(),
      );
    });
    await step("Delete closes the controlled dialog", async () => {
      const dialog = within(document.body).getByRole("alertdialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Delete" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument(),
      );
    });
  },
};

/**
 * A close confirmation: the alert dialog is nested inside a `Dialog` composer and guards its close.
 * While the draft has text, any attempt to close routes through the confirmation instead of
 * discarding silently — “Keep writing” returns to the intact draft, “Discard” closes both.
 */
export const CloseConfirmation: Story = {
  render: function Render() {
    const [composerOpen, setComposerOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [draft, setDraft] = React.useState("");
    return (
      <Dialog
        open={composerOpen}
        onOpenChange={(open) => {
          // Closing with unsaved text asks for confirmation instead.
          if (!open && draft.trim() !== "") {
            setConfirmOpen(true);
            return;
          }
          setComposerOpen(open);
        }}
      >
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<DialogTrigger />}
          label="Write a comment"
        />
        <DialogContent magnitude="md">
          <DialogHeader>
            <DialogHeading>
              <DialogTitle>New comment</DialogTitle>
            </DialogHeading>
          </DialogHeader>
          <DialogBody>
            <TextAreaGroup>
              <TextArea
                magnitude="md"
                surface="field"
                resize="none"
                rows={4}
                aria-label="Comment"
                placeholder="Leave a comment…"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </TextAreaGroup>
          </DialogBody>
          <DialogActions>
            <Button
              sizing="hug"
              prominence="secondary"
              tone="neutral"
              magnitude="xl"
              render={<DialogClose />}
              label="Close"
            />
          </DialogActions>
          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogIcon tone="warning">
                  <TriangleAlert />
                </AlertDialogIcon>
                <AlertDialogIntro>
                  <AlertDialogTitle>Discard draft?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your comment hasn&apos;t been posted. Closing now discards it.
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
                  label="Keep writing"
                />
                <Button
                  sizing="hug"
                  prominence="primary"
                  tone="danger"
                  magnitude="xl"
                  onClick={() => {
                    setConfirmOpen(false);
                    setComposerOpen(false);
                    setDraft("");
                  }}
                  label="Discard"
                />
              </AlertDialogActions>
            </AlertDialogContent>
          </AlertDialog>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * Interaction test: closing with a draft asks for confirmation, “Keep writing” preserves the draft,
 * “Discard” closes both, and a clean composer closes without asking. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const CloseConfirmationInteraction: Story = {
  ...CloseConfirmation,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open the composer and write a draft", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Write a comment" }));
      const dialog = await within(document.body).findByRole("dialog");
      await userEvent.type(within(dialog).getByRole("textbox"), "Ship it next sprint");
    });
    await step("closing with unsaved text asks for confirmation", async () => {
      const dialog = within(document.body).getByRole("dialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
      await within(document.body).findByRole("alertdialog");
      // The composer stays open behind the confirmation. Queried via the DOM (not the a11y tree)
      // because the parent dialog sits behind the modal confirmation.
      await expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
    });
    await step("Keep writing returns to the intact draft", async () => {
      const alert = within(document.body).getByRole("alertdialog");
      await userEvent.click(within(alert).getByRole("button", { name: "Keep writing" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument(),
      );
      await expect(within(document.body).getByRole("textbox")).toHaveValue("Ship it next sprint");
    });
    await step("Discard closes both and drops the draft", async () => {
      const dialog = within(document.body).getByRole("dialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
      const alert = await within(document.body).findByRole("alertdialog");
      await userEvent.click(within(alert).getByRole("button", { name: "Discard" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
      );
    });
    await step("a clean composer closes without asking", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Write a comment" }));
      const dialog = await within(document.body).findByRole("dialog");
      await expect(within(dialog).getByRole("textbox")).toHaveValue("");
      await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
      );
    });
  },
};

// One shared confirmation driven by detached triggers: `createAlertDialogHandle` connects
// triggers to a root defined elsewhere in the tree, and each trigger passes the project it acts
// on as its `payload` (Base UI's documented module-scope handle pattern).
const deleteProjectHandle = createAlertDialogHandle();

/**
 * Multiple detached triggers sharing one alert dialog through `createAlertDialogHandle`: each
 * trigger passes the project it acts on as its `payload`, and the root’s render-function children
 * read that payload to personalize the confirmation copy.
 */
export const MultipleTriggers: Story = {
  render: () => (
    <>
      <div className="flex gap-2">
        {["Mobile app", "Design system"].map((project) => (
          <Button
            key={project}
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            render={<AlertDialogTrigger handle={deleteProjectHandle} payload={project} />}
            label={`Delete ${project}`}
          />
        ))}
      </div>
      <AlertDialog handle={deleteProjectHandle}>
        {({ payload }: { payload: unknown }) => (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogIcon tone="danger">
                <TriangleAlert />
              </AlertDialogIcon>
              <AlertDialogIntro>
                <AlertDialogTitle>
                  Delete {typeof payload === "string" ? payload : "this project"}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the project and all of its work items. This action
                  can&apos;t be undone.
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
                label="Cancel"
              />
              <Button
                sizing="hug"
                prominence="primary"
                tone="danger"
                magnitude="xl"
                render={<AlertDialogClose />}
                label="Delete"
              />
            </AlertDialogActions>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  ),
};

/**
 * Interaction test: each detached trigger opens the shared dialog with its own payload in the
 * title. Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const MultipleTriggersInteraction: Story = {
  ...MultipleTriggers,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("the first trigger opens the dialog with its payload", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Delete Mobile app" }));
      const dialog = await within(document.body).findByRole("alertdialog");
      await expect(
        within(dialog).getByRole("heading", { name: "Delete Mobile app?" }),
      ).toBeInTheDocument();
      await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument(),
      );
    });
    await step("the second trigger reuses the same dialog with a different payload", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Delete Design system" }));
      const dialog = await within(document.body).findByRole("alertdialog");
      await expect(
        within(dialog).getByRole("heading", { name: "Delete Design system?" }),
      ).toBeInTheDocument();
      await userEvent.click(within(dialog).getByRole("button", { name: "Delete" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument(),
      );
    });
  },
};
