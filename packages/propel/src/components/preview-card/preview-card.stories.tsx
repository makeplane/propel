import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardTitle,
} from "./index";

// Components-tier story: uses the ready-made `PreviewCardContent`, which composes
// the portal/backdrop/positioner/popup so a consumer only writes the trigger and
// the card body (and may drop in the re-exported `PreviewCardArrow`). The trigger is
// Base UI's `PreviewCard.Trigger` (no propel styling), wired straight from Base UI.

const meta = {
  title: "Components/PreviewCard",
  component: PreviewCard,
  subcomponents: {
    PreviewCardContent,
    PreviewCardArrow,
    PreviewCardBody,
    PreviewCardTitle,
    PreviewCardDescription,
  },
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A hovered link reveals a rich preview card. `PreviewCardContent` handles the overlay plumbing. */
export const Default: Story = {
  render: () => (
    <p className="max-w-prose text-14 text-secondary">
      The open-source project tracker{" "}
      <PreviewCard>
        <BasePreviewCard.Trigger
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
        </BasePreviewCard.Trigger>
        <PreviewCardContent side="top">
          <PreviewCardBody>
            <PreviewCardTitle>Plane</PreviewCardTitle>
            <PreviewCardDescription>
              Open-source project management for issues, sprints, and roadmaps.
            </PreviewCardDescription>
          </PreviewCardBody>
          <PreviewCardArrow />
        </PreviewCardContent>
      </PreviewCard>{" "}
      makes planning simple.
    </p>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("link", { name: "Plane" }));
    await waitFor(() =>
      expect(within(document.body).getByText(/Open-source project management/)).toBeInTheDocument(),
    );
  },
};
