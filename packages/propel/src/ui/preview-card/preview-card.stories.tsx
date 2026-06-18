import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBackdrop,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC preview-card parts by hand (Root › Trigger ›
// Portal › Backdrop › Positioner › Popup, plus the optional Arrow). The
// components-tier `PreviewCardContent` ready-made composes the portal/backdrop/
// positioner/popup for you. The trigger renders an inline `<a>` and the card opens
// on hover/focus.

const meta = {
  title: "UI/PreviewCard",
  component: PreviewCard,
  subcomponents: {
    PreviewCardTrigger,
    PreviewCardPortal,
    PreviewCardBackdrop,
    PreviewCardPositioner,
    PreviewCardViewport,
    PreviewCardPopup,
    PreviewCardArrow,
  },
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: a hovered link reveals a positioned preview popup with an arrow. */
export const Anatomy: Story = {
  render: () => (
    <p className="max-w-prose text-14 text-secondary">
      The open-source project tracker{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={<a href="https://plane.so" className="text-accent-strong underline" />}
        >
          Plane
        </PreviewCardTrigger>
        <PreviewCardPortal>
          <PreviewCardBackdrop />
          <PreviewCardPositioner side="top" sideOffset={4}>
            <PreviewCardPopup>
              <div className="flex w-56 flex-col gap-1">
                <span className="text-14 font-semibold text-primary">Plane</span>
                <span className="text-13 text-secondary">
                  Open-source project management for issues, sprints, and roadmaps.
                </span>
              </div>
              <PreviewCardArrow />
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>{" "}
      makes planning simple.
    </p>
  ),
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("link", { name: "Plane" }));
    await waitFor(() =>
      expect(within(document.body).getByText(/Open-source project management/)).toBeInTheDocument(),
    );
  },
};
