import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "../button/index";
import { Banner, type BannerTone } from "./index";

const TONES: BannerTone[] = ["neutral", "info", "accent", "warning", "danger"];

const meta = {
  title: "Components/Banner",
  component: Banner,
  tags: ["ai-generated"],
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
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-[640px] flex-col gap-3">
      {TONES.map((tone) => (
        <Banner key={tone} {...args} variant="inline" tone={tone} />
      ))}
    </div>
  ),
};

/** The two scopes (`variant`): the full-width page strip vs the rounded inline card. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-[640px] flex-col gap-4">
      <Banner {...args} variant="page" tone="info" />
      <Banner {...args} variant="inline" tone="info" />
    </div>
  ),
};

/**
 * The full page banner from Figma (see the meta's design link): a message with trailing
 * actions and a dismiss control. `actions` takes any nodes, so the banner composes propel
 * `Button`s, here a ghost, a secondary, and a primary, matching the three buttons plus
 * the close in the design.
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
 * Real interaction test: clicking the dismiss button invokes `onDismiss`. The spy
 * comes from a Storybook `fn()`; the button is queried by its `aria-label`. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it stays out of the sidebar, docs, and AI
 * manifest, but still runs under the default `test` tag.
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
