import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Backdrop } from "../../internal/backdrop";
import { OverlayDescription } from "../../internal/overlay-description";
import { OverlayTitle } from "../../internal/overlay-title";
import { Button } from "../button";
import { IconButton, IconButtonIcon } from "../icon-button";
import {
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPopup,
  DrawerViewport,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, Portal, Trigger, and Close are behavior-only
// (they live in `components` or are used raw), so this in-tier story wires them straight from
// `@base-ui/react`. The dimmed backdrop and the title/description heading pair are the shared
// `internal/` overlay surfaces (Backdrop / OverlayTitle / OverlayDescription), grafted here too.
const meta = {
  title: "Elements/Drawer",
  component: DrawerContent,
  subcomponents: {
    DrawerViewport,
    DrawerPopup,
    DrawerHeader,
    DrawerHeaderContent,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
  },
} satisfies Meta<typeof DrawerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: trigger opens an end-edge sliding panel. */
export const Anatomy: Story = {
  render: () => (
    <BaseDrawer.Root>
      <BaseDrawer.Trigger
        render={
          <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl">
            Open drawer
          </Button>
        }
      />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop render={<Backdrop />} />
        <BaseDrawer.Viewport render={<DrawerViewport />}>
          <BaseDrawer.Popup render={<DrawerPopup side="end" />}>
            <BaseDrawer.Content render={<DrawerContent />}>
              <DrawerHeader>
                <DrawerHeaderContent>
                  <BaseDrawer.Title render={<OverlayTitle magnitude="lg" />}>
                    Work item details
                  </BaseDrawer.Title>
                  <BaseDrawer.Description render={<OverlayDescription magnitude="lg" />}>
                    Edit the fields for this work item.
                  </BaseDrawer.Description>
                </DrawerHeaderContent>
                <BaseDrawer.Close
                  render={
                    <IconButton prominence="ghost" tone="neutral" magnitude="lg" aria-label="Close">
                      <IconButtonIcon>
                        <X />
                      </IconButtonIcon>
                    </IconButton>
                  }
                />
              </DrawerHeader>
              <DrawerBody>Panel body content goes here.</DrawerBody>
              <DrawerFooter>
                <BaseDrawer.Close
                  render={
                    <Button sizing="hug" prominence="ghost" tone="neutral" magnitude="lg">
                      Cancel
                    </Button>
                  }
                />
                <Button sizing="hug" prominence="primary" tone="neutral" magnitude="lg">
                  Save
                </Button>
              </DrawerFooter>
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  ),
};

/**
 * Interaction test: opening the drawer, then the dismiss button closes it. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the drawer flash open and then close.
 */
export const CloseButtonDismisses: Story = {
  ...Anatomy,
  tags: ["!dev", "!autodocs", "!manifest"],
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
    <BaseDrawer.Root defaultOpen>
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop render={<Backdrop />} />
        <BaseDrawer.Viewport render={<DrawerViewport />}>
          <BaseDrawer.Popup render={<DrawerPopup side="end" />}>
            <BaseDrawer.Content render={<DrawerContent />}>
              <DrawerHeader>
                <DrawerHeaderContent>
                  <BaseDrawer.Title render={<OverlayTitle magnitude="lg" />}>
                    Filters
                  </BaseDrawer.Title>
                  <BaseDrawer.Description render={<OverlayDescription magnitude="lg" />}>
                    This drawer started open.
                  </BaseDrawer.Description>
                </DrawerHeaderContent>
              </DrawerHeader>
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  ),
};
