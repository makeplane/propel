import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { IconButton } from "../../components/icon-button";
import { Button } from "../button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC drawer parts by hand (Root › Trigger ›
// Portal › Backdrop › Viewport › Popup › Content, with the Header/Body/Footer
// layout regions and Title/Description/Close inside). The components-tier
// `DrawerPanel` ready-made composes the portal/backdrop/viewport/popup/content for
// you. Trigger/Close compose the `Button` (or `IconButton` for the corner close)
// primitive via Base UI's `render` prop — the styled primitive is the outer element
// so its look wins, the drawer part supplies the behavior.

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  subcomponents: {
    DrawerTrigger,
    DrawerPortal,
    DrawerBackdrop,
    DrawerViewport,
    DrawerPopup,
    DrawerContent,
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

// Shared render: the hand-wired anatomy, reused by the visible display story and its hidden
// interaction twin so a browsing user never sees the drawer flash open and then close.
const renderDrawerAnatomy = () => (
  <Drawer>
    <Button
      sizing="hug"
      prominence="secondary"
      tone="neutral"
      magnitude="xl"
      render={<DrawerTrigger />}
    >
      Open drawer
    </Button>
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport>
        <DrawerPopup side="end">
          <DrawerContent>
            <DrawerHeader>
              <DrawerHeaderContent>
                <DrawerTitle>Work item details</DrawerTitle>
                <DrawerDescription>Edit the fields for this work item.</DrawerDescription>
              </DrawerHeaderContent>
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                aria-label="Close"
                render={<DrawerClose />}
              >
                <X />
              </IconButton>
            </DrawerHeader>
            <DrawerBody>Panel body content goes here.</DrawerBody>
            <DrawerFooter>
              <Button
                sizing="hug"
                prominence="ghost"
                tone="neutral"
                magnitude="lg"
                render={<DrawerClose />}
              >
                Cancel
              </Button>
              <Button sizing="hug" prominence="primary" tone="neutral" magnitude="lg">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPopup>
      </DrawerViewport>
    </DrawerPortal>
  </Drawer>
);

/** The full anatomy wired by hand: trigger opens an end-edge sliding panel. */
export const Anatomy: Story = {
  render: renderDrawerAnatomy,
};

/**
 * Interaction test: opening the drawer, then the dismiss button closes it. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the drawer flash open and then close.
 */
export const CloseButtonDismisses: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: renderDrawerAnatomy,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open drawer" }));
    const dialog = await within(document.body).findByRole("dialog");
    await expect(within(dialog).getByText("Work item details")).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Drawer>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup side="end">
            <DrawerContent>
              <DrawerHeader>
                <DrawerHeaderContent>
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerDescription>This drawer started open.</DrawerDescription>
                </DrawerHeaderContent>
              </DrawerHeader>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  ),
};
