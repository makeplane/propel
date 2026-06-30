import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, X } from "lucide-react";
import { expect, fn } from "storybook/test";

import { Button } from "../button/index";
import { IconButton } from "../icon-button";
import {
  Banner,
  BannerActions,
  BannerBody,
  BannerDescription,
  BannerIcon,
  type BannerTone,
  BannerTitle,
} from "./index";

// UI-tier story: composes the ATOMIC banner parts (each renders a single element) — the
// leading icon, the message body (title + description), the trailing actions, and the
// dismiss control. The components-tier `Banner` story shows the ready-made banner that
// takes content via convenience props instead of assembling the parts.
const TONES: BannerTone[] = ["neutral", "info", "accent", "warning", "danger"];

const dismissSpy = fn();

const meta = {
  title: "UI/Banner",
  component: Banner,
  subcomponents: {
    BannerIcon,
    BannerBody,
    BannerTitle,
    BannerDescription,
    BannerActions,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1838-14322",
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the atomic parts: Root › Icon › Body (Title + Description). */
export const Default: Story = {
  args: { placement: "page", tone: "neutral" },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon placement={args.placement} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody placement={args.placement} tone={args.tone}>
        <BannerTitle>There is something that needs your attention</BannerTitle>
      </BannerBody>
    </Banner>
  ),
};

/** Every intent (`tone`) side by side — the soft surface + foreground color per meaning. */
export const Tones: Story = {
  args: { placement: "inline", tone: "neutral" },
  argTypes: { tone: { control: false }, placement: { control: false } },
  render: () => (
    <div className="flex w-160 flex-col gap-3">
      {TONES.map((tone) => (
        <Banner key={tone} placement="inline" tone={tone}>
          <BannerIcon placement="inline" tone={tone}>
            <Info />
          </BannerIcon>
          <BannerBody placement="inline" tone={tone}>
            <BannerTitle>There is something that needs your attention</BannerTitle>
          </BannerBody>
        </Banner>
      ))}
    </div>
  ),
};

/** The two scopes (`placement`): the full-width page strip vs the rounded inline card. */
export const Placements: Story = {
  args: { placement: "page", tone: "info" },
  argTypes: { placement: { control: false }, tone: { control: false } },
  render: () => (
    <div className="flex w-160 flex-col gap-4">
      {(["page", "inline"] as const).map((placement) => (
        <Banner key={placement} placement={placement} tone="info">
          <BannerIcon placement={placement} tone="info">
            <Info />
          </BannerIcon>
          <BannerBody placement={placement} tone="info">
            <BannerTitle>There is something that needs your attention</BannerTitle>
          </BannerBody>
        </Banner>
      ))}
    </div>
  ),
};

/**
 * The full page banner from Figma (see the meta's design link): a message with trailing actions and
 * a dismiss control, assembled from the atomic parts. `BannerActions` takes any nodes, so the
 * banner composes propel `Button`s — a ghost, a secondary, and a primary, plus a ghost `IconButton`
 * close.
 */
export const WithActions: Story = {
  args: { placement: "page", tone: "neutral" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon placement={args.placement} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody placement={args.placement} tone={args.tone}>
        <BannerTitle>There is something that needs your attention</BannerTitle>
      </BannerBody>
      <BannerActions>
        <Button sizing="hug" prominence="ghost" tone="neutral" magnitude="sm">
          Remind me later
        </Button>
        <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="sm">
          Learn more
        </Button>
        <Button sizing="hug" prominence="primary" tone="neutral" magnitude="sm">
          Update now
        </Button>
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="md"
          aria-label="Dismiss"
          onClick={fn()}
        >
          <X />
        </IconButton>
      </BannerActions>
    </Banner>
  ),
};

/**
 * Real interaction test: clicking the dismiss button invokes its handler. The spy comes from a
 * Storybook `fn()`; the button is queried by its `aria-label`. Tagged out of the
 * sidebar/docs/manifest but still run under the default `test` tag.
 */
export const DismissCallsHandler: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { placement: "inline", tone: "info" },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon placement={args.placement} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody placement={args.placement} tone={args.tone}>
        <BannerTitle>There is something that needs your attention</BannerTitle>
      </BannerBody>
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="md"
        aria-label="Dismiss"
        onClick={dismissSpy}
      >
        <X />
      </IconButton>
    </Banner>
  ),
  play: async ({ canvas, userEvent }) => {
    dismissSpy.mockClear();
    const button = canvas.getByRole("button", { name: "Dismiss" });
    await userEvent.click(button);
    await expect(dismissSpy).toHaveBeenCalledTimes(1);
  },
};
