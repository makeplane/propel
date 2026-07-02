import { Popover as BasePopover } from "@base-ui/react/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import {
  PopoverActions,
  PopoverArrow,
  PopoverBody,
  PopoverClose,
  PopoverIntro,
  PopoverPopup,
} from "./index";

// elements-tier story (rule 2b): the styled popover parts are Base-UI-agnostic `useRender` elements; Base
// UI's behavior parts graft them via `render`, behavior part outer. The Root, Trigger, Portal,
// Positioner, Backdrop, Viewport, Title, and Description are behavior-only or shared `internal`
// primitives (they live in `components`/`internal`), so this in-tier story wires them straight from
// `@base-ui/react`. The components-tier `PopoverContent` ready-made composes the panel surface.
const meta = {
  title: "Elements/Popover",
  component: PopoverPopup,
  subcomponents: {
    PopoverBody,
    PopoverIntro,
    PopoverActions,
    PopoverArrow,
    PopoverClose,
  },
} satisfies Meta<typeof PopoverPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: trigger opens an anchored popup with title, body, and arrow. */
export const Anatomy: Story = {
  render: () => (
    <BasePopover.Root>
      <BasePopover.Trigger
        render={<Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl" />}
      >
        About
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner side="bottom" sideOffset={8}>
          <BasePopover.Popup render={<PopoverPopup />}>
            <BasePopover.Viewport>
              <PopoverBody>
                <PopoverIntro>
                  <BasePopover.Title>Keyboard shortcuts</BasePopover.Title>
                  <BasePopover.Description>
                    Press <kbd>?</kbd> anywhere to see the full list.
                  </BasePopover.Description>
                </PopoverIntro>
              </PopoverBody>
            </BasePopover.Viewport>
            <BasePopover.Arrow render={<PopoverArrow />} />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  ),
};

export const AnatomyInteraction: Story = {
  ...Anatomy,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "About" }));
    await waitFor(() =>
      expect(within(document.body).getByText("Keyboard shortcuts")).toBeInTheDocument(),
    );
  },
};

/**
 * `modal` renders a `Backdrop` and traps focus, so the popover behaves like a lightweight dialog
 * and a `PopoverClose`-behavior control dismisses it.
 */
export const Modal: Story = {
  render: () => (
    <BasePopover.Root modal>
      <BasePopover.Trigger
        render={<Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl" />}
      >
        Open menu
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Backdrop />
        <BasePopover.Positioner side="bottom" sideOffset={8}>
          <BasePopover.Popup render={<PopoverPopup />}>
            {/*
             * Two layout regions, separated by the body's gap (never a margin on a
             * child): a `PopoverIntro` (title + description) and a `PopoverActions`
             * row. `PopoverBody` owns the padding + column layout.
             */}
            <PopoverBody>
              <PopoverIntro>
                <BasePopover.Title>Confirm</BasePopover.Title>
                <BasePopover.Description>
                  Focus is trapped while this is open.
                </BasePopover.Description>
              </PopoverIntro>
              <PopoverActions>
                <BasePopover.Close
                  render={
                    <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="xl" />
                  }
                >
                  Close
                </BasePopover.Close>
              </PopoverActions>
            </PopoverBody>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  ),
};

export const ModalInteraction: Story = {
  ...Modal,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }));
    const close = await within(document.body).findByRole("button", { name: "Close" });
    await userEvent.click(close);
    await waitFor(() =>
      expect(within(document.body).queryByText("Focus is trapped while this is open.")).toBeNull(),
    );
  },
};
