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

/** The full anatomy wired by hand: trigger opens an end-edge sliding panel. */
export const Anatomy: Story = {
  render: () => (
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
  ),
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

/**
 * Open on mount via the root's `defaultOpen`, with no trigger present. Rendered in an isolated
 * iframe on the docs page (`docs.story.inline: false`) — the portaled backdrop/popup are fixed to
 * the viewport, so inline rendering would cover the whole docs page instead of staying boxed.
 */
export const DefaultOpen: Story = {
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  render: () => (
    <Drawer defaultOpen>
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
