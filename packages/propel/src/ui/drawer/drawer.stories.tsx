import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

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
// viewport/popup/content for you.
const triggerClass =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

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
      <DrawerTrigger render={<button type="button" className={triggerClass} />}>
        Open drawer
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent>
              <div className="flex items-start justify-between gap-4">
                <DrawerTitle>Work item details</DrawerTitle>
                <DrawerClose
                  render={
                    <button type="button" aria-label="Close" className="size-7">
                      <X aria-hidden className="size-4" />
                    </button>
                  }
                />
              </div>
              <DrawerDescription>Edit the fields for this work item.</DrawerDescription>
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
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>This drawer started open.</DrawerDescription>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  ),
};
