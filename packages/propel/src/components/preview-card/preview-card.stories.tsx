import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button/index";
import {
  createPreviewCardHandle,
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardImage,
  PreviewCardTitle,
  PreviewCardTrigger,
} from "./index";

// Components-tier story: uses the ready-made `PreviewCardContent`, which composes
// the portal/backdrop/positioner/popup so a consumer only writes the trigger and
// the card body (and may drop in the re-exported `PreviewCardArrow`). The trigger is
// `PreviewCardTrigger` — propel's behavior passthrough of Base UI's `PreviewCard.Trigger`.

const meta = {
  title: "Components/PreviewCard",
  component: PreviewCard,
  subcomponents: {
    PreviewCardTrigger,
    PreviewCardContent,
    PreviewCardArrow,
    PreviewCardBody,
    PreviewCardImage,
    PreviewCardTitle,
    PreviewCardDescription,
  },
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Real external hrefs keep link semantics, but navigation is cancelled: the Vitest
// browser runner shares one page across story files, so a real navigation tears down
// the iframe and fails unrelated stories.
function triggerAnchor(href: string) {
  return (
    <a
      href={href}
      className="text-accent-strong underline"
      onClick={(event) => event.preventDefault()}
    />
  );
}

/** A hovered link reveals a rich preview card. `PreviewCardContent` handles the overlay plumbing. */
export const Default: Story = {
  render: () => (
    <p className="max-w-prose text-14 text-secondary">
      The open-source project tracker{" "}
      <PreviewCard>
        <PreviewCardTrigger render={triggerAnchor("https://plane.so")}>Plane</PreviewCardTrigger>
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

/**
 * A link preview with a thumbnail: `PreviewCardImage` sits above the text body and bakes in the
 * clip + cover-fit treatment, so the consumer only supplies `src`/`alt` and the intrinsic
 * dimensions.
 */
export const WithImage: Story = {
  render: () => (
    <p className="max-w-prose text-14 text-secondary">
      Skim the{" "}
      <PreviewCard>
        <PreviewCardTrigger render={triggerAnchor("https://plane.so/brand")}>
          brand guidelines
        </PreviewCardTrigger>
        <PreviewCardContent sideOffset={8}>
          <PreviewCardImage
            src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
            alt="Station signage set in large, high-contrast lettering"
            width={320}
            height={214}
          />
          <PreviewCardBody>
            <PreviewCardTitle>Brand guidelines</PreviewCardTitle>
            <PreviewCardDescription>
              Typography, color, and logo usage for everything Plane ships.
            </PreviewCardDescription>
          </PreviewCardBody>
          <PreviewCardArrow />
        </PreviewCardContent>
      </PreviewCard>{" "}
      before shipping the new landing page.
    </p>
  ),
};

export const WithImageInteraction: Story = {
  ...WithImage,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("link", { name: "brand guidelines" }));
    await waitFor(
      () =>
        expect(
          within(document.body).getByRole("img", { name: /station signage/i }),
        ).toBeInTheDocument(),
      { timeout: 3000 },
    );
  },
};

// Per-trigger payload body: the card resolves its body from the string payload the
// active trigger passed, so one card serves several launch points.
const topics: Record<string, { title: string; description: string }> = {
  cycles: {
    title: "Cycles",
    description: "Time-boxed iterations for planning and shipping work in focused sprints.",
  },
  modules: {
    title: "Modules",
    description: "Larger bodies of related work items tracked together across cycles.",
  },
};

// One handle shared by several launch points: created OUTSIDE the React tree with
// `createPreviewCardHandle()` and passed to both the detached triggers and the root.
const topicPreviewCard = createPreviewCardHandle();

/**
 * One card serving several detached triggers. The triggers are rendered outside the `PreviewCard`
 * root and linked to it through a shared `createPreviewCardHandle()` handle — and each passes a
 * `payload` that the card reads through the root's function-as-children to show trigger-specific
 * content.
 */
export const DetachedTriggers: Story = {
  render: () => (
    <>
      <p className="max-w-prose text-14 text-secondary">
        Plan sprint work with{" "}
        <PreviewCardTrigger
          handle={topicPreviewCard}
          payload="cycles"
          render={triggerAnchor("https://docs.plane.so/core-concepts/cycles")}
        >
          cycles
        </PreviewCardTrigger>{" "}
        and group feature work with{" "}
        <PreviewCardTrigger
          handle={topicPreviewCard}
          payload="modules"
          render={triggerAnchor("https://docs.plane.so/core-concepts/modules")}
        >
          modules
        </PreviewCardTrigger>
        .
      </p>
      <PreviewCard handle={topicPreviewCard}>
        {({ payload }) => {
          const topic = typeof payload === "string" ? topics[payload] : undefined;
          return (
            <PreviewCardContent sideOffset={8}>
              {topic === undefined ? null : (
                <PreviewCardBody>
                  <PreviewCardTitle>{topic.title}</PreviewCardTitle>
                  <PreviewCardDescription>{topic.description}</PreviewCardDescription>
                </PreviewCardBody>
              )}
              <PreviewCardArrow />
            </PreviewCardContent>
          );
        }}
      </PreviewCard>
    </>
  ),
};

export const DetachedTriggersInteraction: Story = {
  ...DetachedTriggers,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    const body = within(document.body);
    await step("hovering the cycles link opens its preview", async () => {
      await userEvent.hover(canvas.getByRole("link", { name: "cycles" }));
      await waitFor(() => expect(body.getByText(/focused sprints/)).toBeInTheDocument(), {
        timeout: 3000,
      });
    });
    await step("the modules link reuses the same card with its own payload", async () => {
      await userEvent.unhover(canvas.getByRole("link", { name: "cycles" }));
      await userEvent.hover(canvas.getByRole("link", { name: "modules" }));
      await waitFor(
        () => expect(body.getByText(/tracked together across cycles/)).toBeInTheDocument(),
        { timeout: 3000 },
      );
    });
  },
};

/**
 * A controlled card shared by several in-root triggers: `open` + `onOpenChange` own the visibility,
 * and `triggerId` (paired with each trigger's `id`) selects which trigger anchors the card — read
 * back from `eventDetails.trigger` on hover, or set programmatically to open the card from
 * application code.
 */
export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [triggerId, setTriggerId] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col items-start gap-4">
        <PreviewCard
          open={open}
          triggerId={triggerId}
          onOpenChange={(nextOpen, eventDetails) => {
            setOpen(nextOpen);
            setTriggerId(eventDetails.trigger?.id ?? null);
          }}
        >
          {({ payload }) => {
            const topic = typeof payload === "string" ? topics[payload] : undefined;
            return (
              <>
                <p className="max-w-prose text-14 text-secondary">
                  Group sprint work into{" "}
                  <PreviewCardTrigger
                    id="cycles-trigger"
                    payload="cycles"
                    render={triggerAnchor("https://docs.plane.so/core-concepts/cycles")}
                  >
                    cycles
                  </PreviewCardTrigger>{" "}
                  or feature work into{" "}
                  <PreviewCardTrigger
                    id="modules-trigger"
                    payload="modules"
                    render={triggerAnchor("https://docs.plane.so/core-concepts/modules")}
                  >
                    modules
                  </PreviewCardTrigger>
                  .
                </p>
                <PreviewCardContent sideOffset={8}>
                  {topic === undefined ? null : (
                    <PreviewCardBody>
                      <PreviewCardTitle>{topic.title}</PreviewCardTitle>
                      <PreviewCardDescription>{topic.description}</PreviewCardDescription>
                    </PreviewCardBody>
                  )}
                  <PreviewCardArrow />
                </PreviewCardContent>
              </>
            );
          }}
        </PreviewCard>
        <Button
          prominence="secondary"
          tone="neutral"
          magnitude="lg"
          sizing="hug"
          onClick={() => {
            setTriggerId("modules-trigger");
            setOpen(true);
          }}
          label="Preview modules"
        />
      </div>
    );
  },
};

export const ControlledInteraction: Story = {
  ...Controlled,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    const body = within(document.body);
    await step("the button opens the card programmatically at the modules trigger", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Preview modules" }));
      await waitFor(() =>
        expect(body.getByText(/tracked together across cycles/)).toBeInTheDocument(),
      );
    });
    await step("Escape closes it through onOpenChange", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(body.queryByText(/tracked together across cycles/)).not.toBeInTheDocument(),
      );
    });
  },
};
