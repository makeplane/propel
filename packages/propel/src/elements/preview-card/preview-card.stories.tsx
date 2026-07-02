import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Arrow } from "../../internal/arrow";
import { Backdrop } from "../../internal/backdrop";
import { OverlayDescription } from "../../internal/overlay-description";
import { OverlayTitle } from "../../internal/overlay-title";
import { Positioner } from "../../internal/positioner";
import { PreviewCardBody, PreviewCardImage, PreviewCardPopup } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, Trigger, Portal, positioner, backdrop, and
// arrow are behavior/shared roles (they live in `components`/`internal`), so this in-tier story
// wires them straight from `@base-ui/react` and the shared `internal/` primitives. The title and
// description use the shared `internal/overlay-*` recipes at the preview card's `md` size.

const meta = {
  title: "Elements/PreviewCard",
  component: PreviewCardPopup,
  subcomponents: {
    PreviewCardBody,
    PreviewCardImage,
  },
} satisfies Meta<typeof PreviewCardPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy wired by hand: a hovered link reveals a positioned preview popup with an arrow. */
export const Anatomy: Story = {
  render: () => (
    <p className="max-w-prose text-14 text-secondary">
      The open-source project tracker{" "}
      <BasePreviewCard.Root>
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
        <BasePreviewCard.Portal>
          <BasePreviewCard.Backdrop render={<Backdrop />} />
          <BasePreviewCard.Positioner side="top" sideOffset={4} render={<Positioner />}>
            <BasePreviewCard.Popup render={<PreviewCardPopup />}>
              <PreviewCardBody>
                <OverlayTitle magnitude="md">Plane</OverlayTitle>
                <OverlayDescription magnitude="md">
                  Open-source project management for issues, sprints, and roadmaps.
                </OverlayDescription>
              </PreviewCardBody>
              <BasePreviewCard.Arrow render={<Arrow />} />
            </BasePreviewCard.Popup>
          </BasePreviewCard.Positioner>
        </BasePreviewCard.Portal>
      </BasePreviewCard.Root>{" "}
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
