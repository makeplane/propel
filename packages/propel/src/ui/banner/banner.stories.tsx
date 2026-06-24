import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, X } from "lucide-react";
import { expect, fn } from "storybook/test";

import { Button } from "../button/index";
import {
  Banner,
  BannerActions,
  BannerBody,
  BannerDescription,
  BannerDismiss,
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
    BannerDismiss,
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
  args: { variant: "page", tone: "neutral" },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon variant={args.variant} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody variant={args.variant} tone={args.tone}>
        <BannerTitle>There is something that needs your attention</BannerTitle>
      </BannerBody>
    </Banner>
  ),
};

/** Every intent (`tone`) side by side — the soft surface + foreground color per meaning. */
export const Tones: Story = {
  args: { variant: "inline", tone: "neutral" },
  argTypes: { tone: { control: false }, variant: { control: false } },
  render: () => (
    <div className="flex w-160 flex-col gap-3">
      {TONES.map((tone) => (
        <Banner key={tone} variant="inline" tone={tone}>
          <BannerIcon variant="inline" tone={tone}>
            <Info />
          </BannerIcon>
          <BannerBody variant="inline" tone={tone}>
            <BannerTitle>There is something that needs your attention</BannerTitle>
          </BannerBody>
        </Banner>
      ))}
    </div>
  ),
};

/** The two scopes (`variant`): the full-width page strip vs the rounded inline card. */
export const Variants: Story = {
  args: { variant: "page", tone: "info" },
  argTypes: { variant: { control: false }, tone: { control: false } },
  render: () => (
    <div className="flex w-160 flex-col gap-4">
      {(["page", "inline"] as const).map((variant) => (
        <Banner key={variant} variant={variant} tone="info">
          <BannerIcon variant={variant} tone="info">
            <Info />
          </BannerIcon>
          <BannerBody variant={variant} tone="info">
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
 * banner composes propel `Button`s — a ghost, a secondary, and a primary, plus the `BannerDismiss`
 * close.
 */
export const WithActions: Story = {
  args: { variant: "page", tone: "neutral" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon variant={args.variant} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody variant={args.variant} tone={args.tone}>
        <BannerTitle>There is something that needs your attention</BannerTitle>
      </BannerBody>
      <BannerActions>
        <Button emphasis="solid" sizing="hug" variant="ghost" tone="neutral" magnitude="sm">
          Remind me later
        </Button>
        <Button emphasis="solid" sizing="hug" variant="secondary" tone="neutral" magnitude="sm">
          Learn more
        </Button>
        <Button emphasis="solid" sizing="hug" variant="primary" tone="neutral" magnitude="sm">
          Update now
        </Button>
      </BannerActions>
      <BannerDismiss onClick={fn()}>
        <X aria-hidden />
      </BannerDismiss>
    </Banner>
  ),
};

/**
 * Real interaction test: clicking the `BannerDismiss` button invokes its handler. The spy comes
 * from a Storybook `fn()`; the button is queried by its `aria-label`. Tagged out of the
 * sidebar/docs/manifest but still run under the default `test` tag.
 */
export const DismissCallsHandler: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { variant: "inline", tone: "info" },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon variant={args.variant} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody variant={args.variant} tone={args.tone}>
        <BannerTitle>There is something that needs your attention</BannerTitle>
      </BannerBody>
      <BannerDismiss onClick={dismissSpy}>
        <X aria-hidden />
      </BannerDismiss>
    </Banner>
  ),
  play: async ({ canvas, userEvent }) => {
    dismissSpy.mockClear();
    const button = canvas.getByRole("button", { name: "Dismiss" });
    await userEvent.click(button);
    await expect(dismissSpy).toHaveBeenCalledTimes(1);
  },
};
