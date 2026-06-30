import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";
import { expect, fn } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { Button } from "../button/index";
import { Banner, type BannerTone } from "./index";

const TONES: BannerTone[] = ["neutral", "info", "accent", "warning", "danger"];

const meta = {
  title: "Components/Banner",
  component: Banner,
  argTypes: { inlineStartNode: iconControl },
  args: {
    title: "There is something that needs your attention",
    placement: "page",
    tone: "neutral",
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

export const Default: Story = {};

/** Every intent (`tone`) side by side — the soft surface + foreground color per meaning. */
export const Tones: Story = {
  argTypes: { tone: { control: false }, placement: { control: false } },
  render: (args) => (
    <div className="flex w-160 flex-col gap-3">
      {TONES.map((tone) => (
        <Banner key={tone} {...args} placement="inline" tone={tone} />
      ))}
    </div>
  ),
};

/** The two scopes (`placement`): the full-width page strip vs the rounded inline card. */
export const Placements: Story = {
  argTypes: { placement: { control: false }, tone: { control: false } },
  render: (args) => (
    <div className="flex w-160 flex-col gap-4">
      <Banner {...args} placement="page" tone="info" />
      <Banner {...args} placement="inline" tone="info" />
    </div>
  ),
};

/**
 * The full page banner from Figma: a message with trailing actions and a dismiss control. `actions`
 * composes propel `Button`s — a ghost, a secondary, and a primary.
 */
export const WithActions: Story = {
  parameters: { controls: { disable: true } },
  args: {
    placement: "page",
    tone: "neutral",
    onDismiss: fn(),
    dismissLabel: "Dismiss",
    actions: (
      <>
        <Button sizing="hug" prominence="ghost" tone="neutral" magnitude="sm">
          Remind me later
        </Button>
        <Button sizing="hug" prominence="secondary" tone="neutral" magnitude="sm">
          Learn more
        </Button>
        <Button sizing="hug" prominence="primary" tone="neutral" magnitude="sm">
          Update now
        </Button>
      </>
    ),
  },
};

/** A dismissible inline banner. Clicking the dismiss button calls `onDismiss`. */
export const Dismissible: Story = {
  args: {
    placement: "inline",
    tone: "info",
    onDismiss: fn(),
    dismissLabel: "Dismiss",
  },
};

/**
 * Real interaction test: clicking the dismiss button invokes `onDismiss`. Tagged out of the
 * sidebar/docs/manifest but still run under the default `test` tag.
 */
export const DismissCallsHandler: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    placement: "inline",
    tone: "info",
    onDismiss: fn(),
    dismissLabel: "Dismiss",
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Dismiss" });
    await userEvent.click(button);
    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
  },
};

/**
 * Optional content branches: consumers can hide the icon, pass a custom icon, render body-only
 * content, and warning/danger tones use assertive `alert` semantics.
 */
export const OptionalContentSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex w-160 flex-col gap-3">
      <Banner placement="inline" tone="warning" inlineStartNode={null}>
        Maintenance starts at 6 PM.
      </Banner>
      <Banner
        placement="inline"
        tone="info"
        title="Custom icon"
        inlineStartNode={<Info data-testid="custom-banner-icon" />}
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const warning = canvas.getByRole("alert");
    await expect(warning).toHaveTextContent("Maintenance starts at 6 PM.");
    await expect(warning.querySelector("svg")).not.toBeInTheDocument();
    await expect(canvas.getByTestId("custom-banner-icon")).toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent("Custom icon");
  },
};
