import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIntro,
  AlertDialogTitle,
} from "../alert-dialog";
import { Button } from "../button";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { TextArea } from "../text-area";
import {
  createDrawerHandle,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

// Components-tier story: uses the ready-made `DrawerPanel`, which composes the
// portal/backdrop/edge-viewport/sliding-popup/padded-content so a consumer only
// writes the trigger and the panel body. The header/body/footer layout is supplied
// by the `DrawerHeader`/`DrawerBody`/`DrawerFooter` anatomy parts, and the
// `DrawerTitle`/`DrawerDescription` grafts wrap the shared overlay heading pair — no
// layout `className` lives here. `DrawerTrigger`/`DrawerClose` are the behavior
// passthroughs grafted onto the `Button` (or `IconButton` for the corner close) via
// `render` — the styled primitive is the render target so its look wins, the drawer
// part supplies behavior.

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  subcomponents: {
    DrawerTrigger,
    DrawerPanel,
    DrawerHeader,
    DrawerHeaderContent,
    DrawerBody,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A right-edge panel: header (title + dismiss), body, and footer actions. Slides in from the end. */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger
        render={
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            label="Open details"
          />
        }
      />
      <DrawerPanel side="end">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Work item details</DrawerTitle>
            <DrawerDescription>Edit the fields for this work item.</DrawerDescription>
          </DrawerHeaderContent>
          <DrawerClose
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                aria-label="Close"
                icon={<Icon icon={X} />}
              />
            }
          />
        </DrawerHeader>
        <DrawerBody>Panel body content goes here.</DrawerBody>
        <DrawerFooter>
          <DrawerClose
            render={
              <Button
                sizing="hug"
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                label="Cancel"
              />
            }
          />
          <Button sizing="hug" prominence="primary" tone="neutral" magnitude="lg" label="Save" />
        </DrawerFooter>
      </DrawerPanel>
    </Drawer>
  ),
};

/**
 * Interaction test: opening the drawer, then the dismiss button closes it. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the drawer flash open and then close.
 */
export const CloseButtonDismisses: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open the drawer", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Open details" }));
      const dialog = await within(document.body).findByRole("dialog");
      await expect(within(dialog).getByText("Work item details")).toBeInTheDocument();
    });
    await step("close it with the dismiss button", async () => {
      const dialog = within(document.body).getByRole("dialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
      );
    });
  },
};

/** A left-edge panel: same anatomy, anchored to the inline-start edge and slides in from the left. */
export const StartSide: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger
        render={
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            label="Open navigation"
          />
        }
      />
      <DrawerPanel side="start">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeaderContent>
          <DrawerClose
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                aria-label="Close"
                icon={<Icon icon={X} />}
              />
            }
          />
        </DrawerHeader>
        <DrawerBody>Navigation links go here.</DrawerBody>
      </DrawerPanel>
    </Drawer>
  ),
};

/**
 * Interaction test: opening the start-edge drawer, then the dismiss button closes it. Tagged out of
 * the sidebar/docs/manifest while still running under the default `test` tag — so a browsing user
 * never sees the drawer flash open and then close.
 */
export const StartSideDismisses: Story = {
  ...StartSide,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open the drawer", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Open navigation" }));
      const dialog = await within(document.body).findByRole("dialog");
      await expect(within(dialog).getByText("Navigation")).toBeInTheDocument();
    });
    await step("close it with the dismiss button", async () => {
      const dialog = within(document.body).getByRole("dialog");
      await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
      await waitFor(() =>
        expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
      );
    });
  },
};

/**
 * Keyboard ARIA pattern: `Escape` closes the drawer and restores focus to the trigger. Tagged out
 * of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const EscapeCloses: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Drawer>
      <DrawerTrigger
        render={
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            label="Open filters"
          />
        }
      />
      <DrawerPanel side="end">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>Press Escape to dismiss.</DrawerDescription>
          </DrawerHeaderContent>
        </DrawerHeader>
      </DrawerPanel>
    </Drawer>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Open filters" });
    await userEvent.click(trigger);
    await within(document.body).findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
  },
};

/** A drawer drilling into a second, nested drawer stacked over it. */
export const Nested: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger
        render={
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            label="Open settings"
          />
        }
      />
      <DrawerPanel side="end">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Workspace-wide preferences.</DrawerDescription>
          </DrawerHeaderContent>
        </DrawerHeader>
        <DrawerBody>
          <Drawer>
            <DrawerTrigger
              render={
                <Button
                  sizing="hug"
                  prominence="secondary"
                  tone="neutral"
                  magnitude="lg"
                  label="Advanced options"
                />
              }
            />
            <DrawerPanel side="end">
              <DrawerHeader>
                <DrawerHeaderContent>
                  <DrawerTitle>Advanced options</DrawerTitle>
                </DrawerHeaderContent>
              </DrawerHeader>
              <DrawerBody>Nested drawer content.</DrawerBody>
            </DrawerPanel>
          </Drawer>
        </DrawerBody>
      </DrawerPanel>
    </Drawer>
  ),
};

/**
 * Interaction test: Escape closes only the topmost drawer; a second Escape closes the outer one.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const NestedEscapeClosesTopmost: Story = {
  ...Nested,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    const body = within(document.body);
    await step("open both drawers", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Open settings" }));
      const outer = await body.findByRole("dialog");
      await userEvent.click(within(outer).getByRole("button", { name: "Advanced options" }));
      await body.findByRole("dialog", { name: "Advanced options" });
    });
    await step("Escape closes only the topmost drawer", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(body.queryByRole("dialog", { name: "Advanced options" })).not.toBeInTheDocument(),
      );
      await expect(body.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
    });
    await step("Escape again closes the outer drawer", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    });
  },
};

// A handle shared by triggers that live far from the drawer they open — the same details panel
// launched from unrelated corners of the UI, with no lifted state.
const detailsDrawer = createDrawerHandle();

/**
 * Detached triggers: `createDrawerHandle()` links `DrawerTrigger`s to a `Drawer` defined elsewhere
 * in the tree; each trigger passes a `payload` the drawer renders through function-as-children.
 */
export const DetachedTriggers: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <DrawerTrigger
        handle={detailsDrawer}
        payload="WEB-101"
        render={
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            label="WEB-101"
          />
        }
      />
      <DrawerTrigger
        handle={detailsDrawer}
        payload="WEB-202"
        render={
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            label="WEB-202"
          />
        }
      />
      <Drawer handle={detailsDrawer}>
        {({ payload }) => (
          <DrawerPanel side="end">
            <DrawerHeader>
              <DrawerHeaderContent>
                <DrawerTitle>{typeof payload === "string" ? payload : "Details"}</DrawerTitle>
                <DrawerDescription>Work item details.</DrawerDescription>
              </DrawerHeaderContent>
            </DrawerHeader>
          </DrawerPanel>
        )}
      </Drawer>
    </div>
  ),
};

/**
 * Interaction test: each detached trigger opens the shared drawer titled by its own payload. Tagged
 * out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DetachedTriggersOpenWithPayload: Story = {
  ...DetachedTriggers,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    const body = within(document.body);
    await step("the first trigger opens with its payload", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "WEB-101" }));
      await body.findByRole("dialog", { name: "WEB-101" });
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
      await waitFor(() => expect(document.querySelector("[data-ending-style]")).toBeNull());
    });
    await step("the second trigger reuses the same drawer with its payload", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "WEB-202" }));
      await body.findByRole("dialog", { name: "WEB-202" });
    });
  },
};

/**
 * Close confirmation: dismissing while a draft exists is cancelled through `eventDetails.cancel()`,
 * and an `AlertDialog` asks before discarding.
 */
export const CloseConfirmation: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [draft, setDraft] = React.useState("");
    return (
      <>
        <Drawer
          open={open}
          onOpenChange={(nextOpen, eventDetails) => {
            if (!nextOpen && draft.trim() !== "") {
              // Block the dismissal and ask for confirmation while a draft exists.
              eventDetails.cancel();
              setConfirmOpen(true);
              return;
            }
            setOpen(nextOpen);
          }}
        >
          <DrawerTrigger
            render={
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                label="Add comment"
              />
            }
          />
          <DrawerPanel side="end">
            <DrawerHeader>
              <DrawerHeaderContent>
                <DrawerTitle>New comment</DrawerTitle>
                <DrawerDescription>Share feedback on this work item.</DrawerDescription>
              </DrawerHeaderContent>
              <DrawerClose
                render={
                  <IconButton
                    prominence="ghost"
                    tone="neutral"
                    magnitude="lg"
                    aria-label="Close"
                    icon={<Icon icon={X} />}
                  />
                }
              />
            </DrawerHeader>
            <DrawerBody>
              <TextArea
                magnitude="lg"
                surface="field"
                resize="none"
                rows={4}
                aria-label="Comment"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </DrawerBody>
          </DrawerPanel>
        </Drawer>
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogIntro>
                <AlertDialogTitle>Discard comment?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your draft will be lost if you close the panel now.
                </AlertDialogDescription>
              </AlertDialogIntro>
            </AlertDialogHeader>
            <AlertDialogActions>
              <Button
                sizing="hug"
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                onClick={() => setConfirmOpen(false)}
                label="Keep editing"
              />
              <Button
                sizing="hug"
                prominence="primary"
                tone="danger"
                magnitude="lg"
                onClick={() => {
                  setConfirmOpen(false);
                  setOpen(false);
                  setDraft("");
                }}
                label="Discard"
              />
            </AlertDialogActions>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

/**
 * Interaction test: dismissing with a draft raises the confirmation; Keep editing returns to the
 * draft; Discard closes both. Tagged out of the sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const CloseConfirmationInterceptsDismiss: Story = {
  ...CloseConfirmation,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    const body = within(document.body);
    await step("open the drawer and type a draft", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Add comment" }));
      const drawer = await body.findByRole("dialog", { name: "New comment" });
      await userEvent.type(
        within(drawer).getByRole("textbox", { name: "Comment" }),
        "Ship the release notes",
      );
    });
    await step("dismissing asks for confirmation instead of closing", async () => {
      const drawer = body.getByRole("dialog", { name: "New comment" });
      await userEvent.click(within(drawer).getByRole("button", { name: "Close" }));
      await body.findByRole("alertdialog", { name: "Discard comment?" });
      // The drawer stays mounted beneath, but Base UI makes it inert (out of the a11y tree)
      // while the nested confirmation is open — assert DOM presence, not a role.
      await expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    });
    await step("Keep editing returns to the draft", async () => {
      const confirmation = body.getByRole("alertdialog", { name: "Discard comment?" });
      await userEvent.click(within(confirmation).getByRole("button", { name: "Keep editing" }));
      await waitFor(() => expect(body.queryByRole("alertdialog")).not.toBeInTheDocument());
      const drawer = body.getByRole("dialog", { name: "New comment" });
      await expect(within(drawer).getByRole("textbox", { name: "Comment" })).toHaveValue(
        "Ship the release notes",
      );
    });
    await step("Discard closes the confirmation and the drawer", async () => {
      const drawer = body.getByRole("dialog", { name: "New comment" });
      await userEvent.click(within(drawer).getByRole("button", { name: "Close" }));
      const confirmation = await body.findByRole("alertdialog", { name: "Discard comment?" });
      await userEvent.click(within(confirmation).getByRole("button", { name: "Discard" }));
      await waitFor(() => {
        void expect(body.queryByRole("alertdialog")).not.toBeInTheDocument();
        void expect(body.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};
