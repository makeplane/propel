import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC popover parts by hand (Root › Trigger ›
// Portal › Positioner › Popup, plus Viewport/Title/Description/Arrow/Close). The
// components-tier `PopoverContent` ready-made composes the portal/positioner/panel
// surface for you.
const triggerClass =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

const meta = {
  title: "UI/Popover",
  component: Popover,
  subcomponents: {
    PopoverTrigger,
    PopoverPortal,
    PopoverBackdrop,
    PopoverPositioner,
    PopoverViewport,
    PopoverPopup,
    PopoverTitle,
    PopoverDescription,
    PopoverArrow,
    PopoverClose,
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: trigger opens an anchored popup with title, body, and arrow. */
export const Anatomy: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<button type="button" className={triggerClass} />}>
        About
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner side="bottom" sideOffset={8}>
          <PopoverPopup>
            <PopoverViewport>
              <div className="flex w-56 flex-col gap-1 p-2">
                <PopoverTitle>Keyboard shortcuts</PopoverTitle>
                <PopoverDescription>
                  Press <kbd>?</kbd> anywhere to see the full list.
                </PopoverDescription>
              </div>
            </PopoverViewport>
            <PopoverArrow />
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "About" }));
    await waitFor(() =>
      expect(within(document.body).getByText("Keyboard shortcuts")).toBeInTheDocument(),
    );
  },
};

/**
 * `modal` renders a `PopoverBackdrop` and traps focus, so the popover behaves like a lightweight
 * dialog and `PopoverClose` dismisses it.
 */
export const Modal: Story = {
  render: () => (
    <Popover modal>
      <PopoverTrigger render={<button type="button" className={triggerClass} />}>
        Open menu
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverBackdrop />
        <PopoverPositioner side="bottom" sideOffset={8}>
          <PopoverPopup>
            {/*
             * Two layout groups, separated by the parent's gap (never a margin on a
             * child): an "intro" (title + description) and the "actions" row. Future
             * anatomy surfaces — e.g. PopoverIntro and PopoverActions.
             */}
            <div className="flex w-56 flex-col gap-2 p-2">
              <div className="flex flex-col gap-2">
                <PopoverTitle>Confirm</PopoverTitle>
                <PopoverDescription>Focus is trapped while this is open.</PopoverDescription>
              </div>
              <div className="flex justify-end">
                <PopoverClose render={<button type="button" className={triggerClass} />}>
                  Close
                </PopoverClose>
              </div>
            </div>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }));
    const close = await within(document.body).findByRole("button", { name: "Close" });
    await userEvent.click(close);
    await waitFor(() =>
      expect(within(document.body).queryByText("Focus is trapped while this is open.")).toBeNull(),
    );
  },
};
