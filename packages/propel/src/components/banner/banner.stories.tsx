import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Banner, type BannerTone } from "./index";

const TONES: BannerTone[] = ["neutral", "info", "accent", "warning", "danger"];

const meta = {
  title: "Components/Banner",
  component: Banner,
  tags: ["ai-generated"],
  args: {
    title: "There is something that needs your attention",
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
