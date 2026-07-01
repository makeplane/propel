import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBackdrop,
  PreviewCardBody,
  PreviewCardDescription,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTitle,
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
    PreviewCardBody,
    PreviewCardTitle,
    PreviewCardDescription,
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
          render={
            // Real external href for link semantics, but cancel navigation: the Vitest
            // browser runner shares one page across story files, so a real navigation
            // tears down the iframe and fails unrelated stories.
            <a
              href="https://plane.so"
              className="text-accent-strong underline"
              onClick={(event) => event.preventDefault()}
            />
          }
        >
          Plane
        </PreviewCardTrigger>
        <PreviewCardPortal>
          <PreviewCardBackdrop />
          <PreviewCardPositioner side="top" sideOffset={4}>
            <PreviewCardPopup>
              <PreviewCardBody>
                <PreviewCardTitle>Plane</PreviewCardTitle>
                <PreviewCardDescription>
                  Open-source project management for issues, sprints, and roadmaps.
                </PreviewCardDescription>
              </PreviewCardBody>
              <PreviewCardArrow />
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>{" "}
      makes planning simple.
    </p>
  ),
};

export const AnatomyInteraction: Story = {
  ...Anatomy,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("link", { name: "Plane" }));
    await waitFor(() =>
      expect(within(document.body).getByText(/Open-source project management/)).toBeInTheDocument(),
    );
  },
};
