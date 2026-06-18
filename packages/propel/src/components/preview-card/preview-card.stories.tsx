import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { PreviewCard, PreviewCardArrow, PreviewCardContent, PreviewCardTrigger } from "./index";

// Components-tier story: uses the ready-made `PreviewCardContent`, which composes
// the portal/backdrop/positioner/popup so a consumer only writes the trigger and
// the card body (and may drop in the re-exported `PreviewCardArrow`).

const meta = {
  title: "Components/PreviewCard",
  component: PreviewCard,
  subcomponents: { PreviewCardTrigger, PreviewCardContent, PreviewCardArrow },
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A hovered link reveals a rich preview card. `PreviewCardContent` handles the overlay plumbing. */
export const Default: Story = {
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
        <PreviewCardContent side="top">
          <div className="flex w-56 flex-col gap-1">
            <span className="text-14 font-semibold text-primary">Plane</span>
            <span className="text-13 text-secondary">
              Open-source project management for issues, sprints, and roadmaps.
            </span>
          </div>
          <PreviewCardArrow />
        </PreviewCardContent>
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
