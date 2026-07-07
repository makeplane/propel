import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleDot } from "lucide-react";
import { expect } from "storybook/test";

import { OverlayDescription } from "../../internal/overlay-description";
import { OverlayTitle } from "../../internal/overlay-title";
import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
import {
  PreviewCardBody,
  PreviewCardIcon,
  PreviewCardImage,
  PreviewCardMeta,
  PreviewCardPopup,
  PreviewCardPropertyGroup,
  PreviewCardTitleRow,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the popup laid out inline (it is just a styled div; Base UI
// only positions it) and its transition poses pinned statically via the `data-starting-style`/
// `data-ending-style` attributes Base UI's preview card would set. The Root, Trigger, and Portal
// are behavior-only roles (they live in `components`); the positioner and arrow are shared
// `internal/` chrome grafted there too — no backdrop, since a preview card is non-modal (rule 4a's
// shared `Backdrop` is for genuinely modal overlays only). The title and description compose the
// shared `internal/overlay-*` recipes at the preview card's `md` size. Hover-open, dismissal, and
// aria behavior are demonstrated AND tested in the components-tier story (Components/PreviewCard).

const meta = {
  title: "Elements/PreviewCard",
  component: PreviewCardPopup,
  subcomponents: {
    PreviewCardBody,
    PreviewCardIcon,
    PreviewCardImage,
    PreviewCardMeta,
    PreviewCardPropertyGroup,
    PreviewCardTitleRow,
  },
} satisfies Meta<typeof PreviewCardPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically, as Base UI would lay it out while open: the
 * `PreviewCardPopup` card surface (a bare `max-w-80` popup surface — the padding lives on the body
 * so a full-bleed image could sit edge-to-edge) holding a `PreviewCardBody` that stacks the shared
 * `OverlayTitle` above the shared `OverlayDescription`, both at the preview card's `md` size.
 */
export const Default: Story = {
  render: () => (
    <PreviewCardPopup>
      <PreviewCardBody>
        <OverlayTitle magnitude="md">Plane</OverlayTitle>
        <OverlayDescription magnitude="md">
          Open-source project management for issues, sprints, and roadmaps.
        </OverlayDescription>
      </PreviewCardBody>
    </PreviewCardPopup>
  ),
};

/**
 * The thumbnail configuration: `PreviewCardImage` sits above the text body and bakes in the clip +
 * cover-fit treatment (`overflow-hidden`, `object-cover`, self-rounding so the popup needs no
 * `overflow-hidden` that would clip an arrow); the consumer supplies only `src`/`alt` and the
 * intrinsic dimensions.
 */
export const WithImage: Story = {
  render: () => (
    <PreviewCardPopup>
      <PreviewCardImage
        src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
        alt="Station signage set in large, high-contrast lettering"
        width={320}
        height={214}
      />
      <PreviewCardBody>
        <OverlayTitle magnitude="md">Brand guidelines</OverlayTitle>
        <OverlayDescription magnitude="md">
          Typography, color, and logo usage for everything Plane ships.
        </OverlayDescription>
      </PreviewCardBody>
    </PreviewCardPopup>
  ),
};

/**
 * A work-item-style link preview: `PreviewCardIcon` sits beside the title in a
 * `PreviewCardTitleRow` (compose the row only when there's a leading icon),
 * `PreviewCardPropertyGroup` holds a wrapping row of the consumer's own chips (here `Badge` for
 * status/priority and `Avatar` for the assignee — the part supplies only the row layout), and
 * `PreviewCardMeta` closes the card with a muted caption. Every new region is optional and
 * independent — a card can add just one.
 */
export const RichAnatomy: Story = {
  render: () => (
    <PreviewCardPopup>
      <PreviewCardBody>
        <PreviewCardTitleRow>
          <PreviewCardIcon>
            <CircleDot />
          </PreviewCardIcon>
          <OverlayTitle magnitude="md">Redesign the pricing page</OverlayTitle>
        </PreviewCardTitleRow>
        <OverlayDescription magnitude="md">
          Rework the tiered layout to highlight the annual plan discount.
        </OverlayDescription>
        <PreviewCardPropertyGroup>
          <Badge tone="warning" magnitude="sm">
            In Progress
          </Badge>
          <Badge tone="danger" magnitude="sm">
            High priority
          </Badge>
          <Avatar magnitude="xs" role="img" aria-label="Priya Sharma">
            <AvatarFallback tone="indigo">P</AvatarFallback>
          </Avatar>
        </PreviewCardPropertyGroup>
        <PreviewCardMeta>WEB-142 · Updated 2 days ago</PreviewCardMeta>
      </PreviewCardBody>
    </PreviewCardPopup>
  ),
};

/**
 * The popup's transition poses, pinned statically:
 *
 * - **Resting** — the open pose: full opacity, natural scale.
 * - **Entering** — `data-starting-style=""` pins the pre-open endpoint of the transition (`opacity-0
 *   scale-95`), so the card is intentionally invisible while holding its layout.
 * - **Exiting** — `data-ending-style=""` pins the same faded, scaled-down endpoint on the way closed.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Resting</p>
        <PreviewCardPopup id="preview-card-popup-resting">
          <PreviewCardBody>
            <OverlayTitle magnitude="md">Resting</OverlayTitle>
            <OverlayDescription magnitude="md">The open pose.</OverlayDescription>
          </PreviewCardBody>
        </PreviewCardPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Entering (data-starting-style) — invisible</p>
        <PreviewCardPopup id="preview-card-popup-entering" data-starting-style="">
          <PreviewCardBody>
            <OverlayTitle magnitude="md">Entering</OverlayTitle>
            <OverlayDescription magnitude="md">Pinned at opacity-0 scale-95.</OverlayDescription>
          </PreviewCardBody>
        </PreviewCardPopup>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <p className="text-13 text-secondary">Exiting (data-ending-style) — invisible</p>
        <PreviewCardPopup id="preview-card-popup-exiting" data-ending-style="">
          <PreviewCardBody>
            <OverlayTitle magnitude="md">Exiting</OverlayTitle>
            <OverlayDescription magnitude="md">Pinned at opacity-0 scale-95.</OverlayDescription>
          </PreviewCardBody>
        </PreviewCardPopup>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-starting-style`/`data-ending-style` popups compute to opacity 0 while the resting popup
 * stays fully opaque. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const popup = (id: string) => {
      const el = canvasElement.querySelector(`#${id}`);
      if (!(el instanceof HTMLElement)) throw new Error(`missing #${id} popup`);
      return el;
    };
    // The compiled `data-starting-style:opacity-0` / `data-ending-style:opacity-0` selectors pin
    // the transition endpoints; the resting popup carries neither attribute.
    await expect(getComputedStyle(popup("preview-card-popup-resting")).opacity).toBe("1");
    await expect(getComputedStyle(popup("preview-card-popup-entering")).opacity).toBe("0");
    await expect(getComputedStyle(popup("preview-card-popup-exiting")).opacity).toBe("0");
  },
};
