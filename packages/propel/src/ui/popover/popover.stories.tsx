import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import {
  Popover,
  PopoverActions,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverClose,
  PopoverDescription,
  PopoverIntro,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC popover parts by hand (Root › Trigger ›
// Portal › Positioner › Popup, plus Viewport/Body/Intro/Actions/Title/Description/
// Arrow/Close). The components-tier `PopoverContent` ready-made composes the
// portal/positioner/panel surface for you. Trigger/Close compose the `Button`
// primitive via Base UI's `render` prop — the styled primitive is the outer element
// so its look wins, the popover part supplies the behavior.

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
    PopoverBody,
    PopoverIntro,
    PopoverActions,
    PopoverTitle,
    PopoverDescription,
    PopoverArrow,
    PopoverClose,
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Shared render for the Anatomy twins.
const renderAnatomy = () => (
  <Popover>
    <Button
      sizing="hug"
      prominence="secondary"
      tone="neutral"
      magnitude="xl"
      render={<PopoverTrigger />}
    >
      About
    </Button>
    <PopoverPortal>
      <PopoverPositioner side="bottom" sideOffset={8}>
        <PopoverPopup>
          <PopoverViewport>
            <PopoverBody>
              <PopoverIntro>
                <PopoverTitle>Keyboard shortcuts</PopoverTitle>
                <PopoverDescription>
                  Press <kbd>?</kbd> anywhere to see the full list.
                </PopoverDescription>
              </PopoverIntro>
            </PopoverBody>
          </PopoverViewport>
          <PopoverArrow />
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
  </Popover>
);

/** The full anatomy wired by hand: trigger opens an anchored popup with title, body, and arrow. */
export const Anatomy: Story = {
  render: () => renderAnatomy(),
};

export const AnatomyInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => renderAnatomy(),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "About" }));
    await waitFor(() =>
      expect(within(document.body).getByText("Keyboard shortcuts")).toBeInTheDocument(),
    );
  },
};

// Shared render for the Modal twins. `modal` stays on so the popover behaves like a
// dialog;
const renderModal = () => (
  <Popover modal>
    <Button
      sizing="hug"
      prominence="secondary"
      tone="neutral"
      magnitude="xl"
      render={<PopoverTrigger />}
    >
      Open menu
    </Button>
    <PopoverPortal>
      <PopoverBackdrop />
      <PopoverPositioner side="bottom" sideOffset={8}>
        <PopoverPopup>
          {/*
           * Two layout regions, separated by the body's gap (never a margin on a
           * child): a `PopoverIntro` (title + description) and a `PopoverActions`
           * row. `PopoverBody` owns the padding + column layout.
           */}
          <PopoverBody>
            <PopoverIntro>
              <PopoverTitle>Confirm</PopoverTitle>
              <PopoverDescription>Focus is trapped while this is open.</PopoverDescription>
            </PopoverIntro>
            <PopoverActions>
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                render={<PopoverClose />}
              >
                Close
              </Button>
            </PopoverActions>
          </PopoverBody>
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
  </Popover>
);

/**
 * `modal` renders a `PopoverBackdrop` and traps focus, so the popover behaves like a lightweight
 * dialog and `PopoverClose` dismisses it.
 */
export const Modal: Story = {
  render: () => renderModal(),
};

export const ModalInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => renderModal(),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }));
    const close = await within(document.body).findByRole("button", { name: "Close" });
    await userEvent.click(close);
    await waitFor(() =>
      expect(within(document.body).queryByText("Focus is trapped while this is open.")).toBeNull(),
    );
  },
};
