import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, X } from "lucide-react";

import { Icon } from "../../internal/icon";
import { Button, ButtonLabel } from "../button/index";
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

// elements-tier story (rule 2b): a pure UI-configuration showcase of the atomic banner parts,
// rendered directly — the strip/card root, the leading icon, the message body (title +
// description), and the trailing actions. The banner cvas key off no `data-*`/aria state
// attributes, so `placement` × `tone` is the entire configuration space and nothing needs
// pinning. Behavior (e.g. a dismiss action's click) is demonstrated and tested in
// Components/Banner, which composes these parts behind convenience props.
const TONES: BannerTone[] = ["neutral", "info", "accent", "warning", "danger"];

const meta = {
  title: "Elements/Banner",
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
  decorators: [
    (Story) => (
      <div className="flex w-180 flex-col gap-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the atomic parts: Root › Icon › Body (Title). */
export const Default: Story = {
  args: { placement: "page", tone: "neutral" },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon placement={args.placement} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody placement={args.placement} tone={args.tone}>
        <BannerTitle placement={args.placement}>
          There is something that needs your attention
        </BannerTitle>
      </BannerBody>
    </Banner>
  ),
};

/** Every intent (`tone`) side by side — the soft surface + foreground color per meaning. */
export const Tones: Story = {
  args: { placement: "inline", tone: "neutral" },
  argTypes: { tone: { control: false }, placement: { control: false } },
  render: () => (
    <>
      {TONES.map((tone) => (
        <Banner key={tone} placement="inline" tone={tone}>
          <BannerIcon placement="inline" tone={tone}>
            <Info />
          </BannerIcon>
          <BannerBody placement="inline" tone={tone}>
            <BannerTitle placement="inline">
              There is something that needs your attention
            </BannerTitle>
          </BannerBody>
        </Banner>
      ))}
    </>
  ),
};

/** The two scopes (`placement`): the full-width page strip vs the rounded inline card. */
export const Placements: Story = {
  args: { placement: "page", tone: "info" },
  argTypes: { placement: { control: false }, tone: { control: false } },
  render: () => (
    <>
      {(["page", "inline"] as const).map((placement) => (
        <Banner key={placement} placement={placement} tone="info">
          <BannerIcon placement={placement} tone="info">
            <Info />
          </BannerIcon>
          <BannerBody placement={placement} tone="info">
            <BannerTitle placement={placement}>
              There is something that needs your attention
            </BannerTitle>
          </BannerBody>
        </Banner>
      ))}
    </>
  ),
};

/**
 * The full anatomy from Figma (see the meta's design link): Icon › Body (Title + Description) ›
 * Actions. `BannerActions` takes any nodes, so the banner composes the styled `Button` and
 * `IconButton` elements — a ghost, a secondary, and a primary, plus a ghost dismiss control. Pure
 * chrome here; the dismiss click behavior lives in Components/Banner.
 */
export const Anatomy: Story = {
  args: { placement: "page", tone: "neutral" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon placement={args.placement} tone={args.tone}>
        <Info />
      </BannerIcon>
      <BannerBody placement={args.placement} tone={args.tone}>
        <BannerTitle placement={args.placement}>
          There is something that needs your attention
        </BannerTitle>
        <BannerDescription>Review the details and pick an action to continue.</BannerDescription>
      </BannerBody>
      <BannerActions>
        <Button sizing="hug" prominence="ghost" tone="neutral" magnitude="sm">
          <ButtonLabel>Remind me later</ButtonLabel>
        </Button>
        <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="sm">
          <ButtonLabel>Learn more</ButtonLabel>
        </Button>
        <Button sizing="hug" prominence="primary" tone="neutral" magnitude="sm">
          <ButtonLabel>Update now</ButtonLabel>
        </Button>
        <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Dismiss">
          <Icon>
            <X />
          </Icon>
        </IconButton>
      </BannerActions>
    </Banner>
  ),
};
