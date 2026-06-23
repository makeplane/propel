import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { IconButton } from "../../components/icon-button";
import { Button } from "../button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC drawer parts by hand (Root › Trigger ›
// Portal › Backdrop › Viewport › Popup › Content, plus Title/Description/Close).
// The components-tier `DrawerPanel` ready-made composes the portal/backdrop/
// viewport/popup/content for you. Trigger/Close compose the `Button` (or
// `IconButton` for the corner close) primitive via Base UI's `render` prop — the
// styled primitive is the outer element so its look wins, the drawer part supplies
// the behavior.

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
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: trigger opens a right-edge sliding panel. */
export const Anatomy: Story = {
  render: () => (
    <Drawer>
      <Button variant="secondary" tone="neutral" magnitude="xl" render={<DrawerTrigger />}>
        Open drawer
      </Button>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent>
              {/*
               * Two layout groups, separated by DrawerContent's own gap: a header
               * (title + corner close) grouped with the description, then the body
               * region. Future anatomy surfaces — e.g. DrawerHeader and DrawerBody.
               */}
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <DrawerTitle>Work item details</DrawerTitle>
                  <IconButton
                    variant="ghost"
                    tone="neutral"
                    magnitude="lg"
                    aria-label="Close"
                    render={<DrawerClose />}
                  >
                    <X />
                  </IconButton>
                </div>
                <DrawerDescription>Edit the fields for this work item.</DrawerDescription>
              </div>
              <div className="text-14 text-secondary">Panel body content goes here.</div>
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

/** Open on mount via the root's `defaultOpen`, with no trigger present. */
export const DefaultOpen: Story = {
  render: () => (
    <Drawer defaultOpen>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent>
              <div className="flex flex-col gap-2">
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>This drawer started open.</DrawerDescription>
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  ),
};
