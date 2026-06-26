import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../../ui/button";
import { IconButton } from "../icon-button";
import {
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
// by the `DrawerHeader`/`DrawerBody`/`DrawerFooter` anatomy parts — no layout
// `className` lives here. Trigger/Close compose the `Button` (or `IconButton` for
// the corner close) primitive via Base UI's `render` prop — the styled primitive is
// the outer element so its look wins, the drawer part supplies the behavior.

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

// Shared render: the end-edge details panel, reused by the visible display story and its hidden
// interaction twin so a browsing user never sees the drawer flash open and then close.
const renderDetailsDrawer = () => (
  <Drawer>
    <Button
      sizing="hug"
      prominence="secondary"
      tone="neutral"
      magnitude="xl"
      render={<DrawerTrigger />}
    >
      Open details
    </Button>
    <DrawerPanel side="end">
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
    </DrawerPanel>
  </Drawer>
);

/** A right-edge panel: header (title + dismiss), body, and footer actions. Slides in from the end. */
export const Default: Story = {
  render: renderDetailsDrawer,
};

/**
 * Interaction test: opening the drawer, then the dismiss button closes it. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the drawer flash open and then close.
 */
export const CloseButtonDismisses: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: renderDetailsDrawer,
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

// Shared render: the start-edge navigation panel, reused by the visible display story and its
// hidden interaction twin so a browsing user never sees the drawer flash open and then close.
const renderNavDrawer = () => (
  <Drawer>
    <Button
      sizing="hug"
      prominence="secondary"
      tone="neutral"
      magnitude="xl"
      render={<DrawerTrigger />}
    >
      Open navigation
    </Button>
    <DrawerPanel side="start">
      <DrawerHeader>
        <DrawerHeaderContent>
          <DrawerTitle>Navigation</DrawerTitle>
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
      <DrawerBody>Navigation links go here.</DrawerBody>
    </DrawerPanel>
  </Drawer>
);

/** A left-edge panel: same anatomy, anchored to the inline-start edge and slides in from the left. */
export const StartSide: Story = {
  render: renderNavDrawer,
};

/**
 * Interaction test: opening the start-edge drawer, then the dismiss button closes it. Tagged out of
 * the sidebar/docs/manifest while still running under the default `test` tag — so a browsing user
 * never sees the drawer flash open and then close.
 */
export const StartSideDismisses: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: renderNavDrawer,
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
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<DrawerTrigger />}
      >
        Open filters
      </Button>
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
