import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";
import { expect, fn } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { Button } from "../../ui/button/index";
import { Banner, type BannerTone } from "./index";

const TONES: BannerTone[] = ["neutral", "info", "accent", "warning", "danger"];

const meta = {
  title: "UI/Banner",
  component: Banner,
  // Icon picker control for the leading icon (None keeps the default tone icon).
  argTypes: { inlineStartNode: iconControl },
  args: {
    title: "There is something that needs your attention",
    variant: "page",
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
  // Iterates `tone` (and pins `variant` to inline for the showcase), so disable those
  // controls; the rest stay live and update every banner at once.
  argTypes: { tone: { control: false }, variant: { control: false } },
  render: (args) => (
    <div className="flex w-160 flex-col gap-3">
      {TONES.map((tone) => (
        <Banner key={tone} {...args} variant="inline" tone={tone} />
      ))}
    </div>
  ),
};

/** The two scopes (`variant`): the full-width page strip vs the rounded inline card. */
export const Variants: Story = {
  // Iterates `variant` (and pins `tone` to info for the comparison), so disable those
  // controls; the rest stay live and update both banners at once.
  argTypes: { variant: { control: false }, tone: { control: false } },
  render: (args) => (
    <div className="flex w-160 flex-col gap-4">
      <Banner {...args} variant="page" tone="info" />
      <Banner {...args} variant="inline" tone="info" />
    </div>
  ),
};

/**
 * The full page banner from Figma (see the meta's design link): a message with trailing actions and
 * a dismiss control. `actions` takes any nodes, so the banner composes propel `Button`s, here a
 * ghost, a secondary, and a primary, matching the three buttons plus the close in the design.
 */
export const WithActions: Story = {
  parameters: { controls: { disable: true } },
  args: {
    variant: "page",
    tone: "neutral",
    onDismiss: fn(),
    actions: (
      <>
        <Button variant="ghost" tone="neutral" magnitude="sm">
          Remind me later
        </Button>
        <Button variant="secondary" tone="neutral" magnitude="sm">
          Learn more
        </Button>
        <Button variant="primary" tone="neutral" magnitude="sm">
          Update now
        </Button>
      </>
    ),
  },
};

/** A dismissible inline banner. Clicking the dismiss button calls `onDismiss`. */
export const Dismissible: Story = {
  args: {
    variant: "inline",
    tone: "info",
    onDismiss: fn(),
  },
};

/**
 * Real interaction test: clicking the dismiss button invokes `onDismiss`. The spy comes from a
 * Storybook `fn()`; the button is queried by its `aria-label`. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it stays out of the sidebar, docs, and AI manifest, but still
 * runs under the default `test` tag.
 */
export const DismissCallsHandler: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    variant: "inline",
    tone: "info",
    onDismiss: fn(),
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
      <Banner variant="inline" tone="warning" inlineStartNode={null}>
        Maintenance starts at 6 PM.
      </Banner>
      <Banner
        variant="inline"
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
