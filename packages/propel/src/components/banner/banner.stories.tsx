import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, X } from "lucide-react";
import { expect, fn } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { Button } from "../button/index";
import { Icon } from "../icon";
import { IconButton } from "../icon-button/index";
import { Banner, type BannerTone } from "./index";

const TONES: BannerTone[] = ["neutral", "info", "accent", "warning", "danger"];

const dismissSpy = fn();

const meta = {
  title: "Components/Banner",
  component: Banner,
  argTypes: { icon: iconControl },
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

export const Default: Story = {};

/** Every intent (`tone`) side by side — the soft surface + foreground color per meaning. */
export const Tones: Story = {
  argTypes: { tone: { control: false }, placement: { control: false } },
  render: (args) => (
    <>
      {TONES.map((tone) => (
        <Banner key={tone} {...args} placement="inline" tone={tone} />
      ))}
    </>
  ),
};

/** The two scopes (`placement`): the full-width page strip vs the rounded inline card. */
export const Placements: Story = {
  argTypes: { placement: { control: false }, tone: { control: false } },
  render: (args) => (
    <>
      <Banner {...args} placement="page" tone="info" />
      <Banner {...args} placement="inline" tone="info" />
    </>
  ),
};

/**
 * The full page banner from Figma: a message with trailing `actions`. A dismiss is just one of
 * those actions — a ghost `IconButton` — so it lives in `actions` alongside the `Button`s.
 */
export const WithActions: Story = {
  parameters: { controls: { disable: true } },
  args: {
    placement: "page",
    tone: "neutral",
    actions: (
      <>
        <Button
          sizing="hug"
          prominence="ghost"
          tone="neutral"
          magnitude="sm"
          label="Remind me later"
        />
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="sm"
          label="Learn more"
        />
        <Button
          sizing="hug"
          prominence="primary"
          tone="neutral"
          magnitude="sm"
          label="Update now"
        />
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="sm"
          aria-label="Dismiss"
          onClick={fn()}
          icon={<Icon icon={X} />}
        />
      </>
    ),
  },
};

/** A dismissible inline banner — the dismiss is just an `IconButton` rendered in `actions`. */
export const Dismissible: Story = {
  args: {
    placement: "inline",
    tone: "info",
    actions: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="sm"
        aria-label="Dismiss"
        onClick={fn()}
        icon={<Icon icon={X} />}
      />
    ),
  },
};

/**
 * Hidden interaction twin of `Dismissible`: clicking the dismiss `IconButton` rendered in `actions`
 * invokes its handler. Tagged out of the sidebar/docs/manifest but still run under the default
 * `test` tag.
 */
export const DismissibleInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    placement: "inline",
    tone: "info",
    actions: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="sm"
        aria-label="Dismiss"
        onClick={dismissSpy}
        icon={<Icon icon={X} />}
      />
    ),
  },
  play: async ({ canvas, userEvent }) => {
    dismissSpy.mockClear();
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(dismissSpy).toHaveBeenCalledTimes(1);
  },
};

/**
 * Optional content branches: consumers can hide the icon, pass a custom icon, render body-only
 * content, and warning/danger tones use assertive `alert` semantics.
 */
export const OptionalContentSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <>
      <Banner
        placement="inline"
        tone="warning"
        icon={null}
        description="Maintenance starts at 6 PM."
      />
      <Banner
        placement="inline"
        tone="info"
        title="Custom icon"
        icon={<Icon icon={<Info data-testid="custom-banner-icon" />} />}
      />
    </>
  ),
  play: async ({ canvas }) => {
    const warning = canvas.getByRole("alert");
    await expect(warning).toHaveTextContent("Maintenance starts at 6 PM.");
    await expect(warning.querySelector("svg")).not.toBeInTheDocument();
    await expect(canvas.getByTestId("custom-banner-icon")).toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent("Custom icon");
  },
};
