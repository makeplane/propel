import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { AnchorButton, AnchorButtonIcon, AnchorButtonLabel, AnchorButtonSpinner } from "./index";

// The ready-made button-looking link: a navigation `<a>` with the control chrome plus optional
// inline-start/inline-end nodes beside the label. Same surface as the ready-made `Button`, but it
// navigates (`href`) instead of acting.
const meta = {
  title: "Components/AnchorButton",
  component: AnchorButton,
  subcomponents: { AnchorButtonIcon, AnchorButtonLabel, AnchorButtonSpinner },
  argTypes: { inlineStartNode: iconControl, inlineEndNode: iconControl },
  args: {
    children: "Link",
    href: "#",
    prominence: "primary",
    tone: "neutral",
    magnitude: "md",
    sizing: "hug",
  },
} satisfies Meta<typeof AnchorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Inline-start and inline-end nodes sit beside the label and are decorative. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <AnchorButton {...args} inlineStartNode={<Plus />}>
        New page
      </AnchorButton>
      <AnchorButton {...args} prominence="secondary" inlineEndNode={<ArrowRight />}>
        Learn more
      </AnchorButton>
    </div>
  ),
};

/**
 * `loading` shows a spinner + sets `aria-busy` while a navigation is pending (e.g. a router's
 * pending state).
 */
export const Loading: Story = { args: { loading: true } };

/** It renders a real `<a>` carrying the given `href`, so it navigates rather than acts. */
export const RendersAnchor: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { href: "https://example.com" },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Link" });
    await expect(link).toHaveAttribute("href", "https://example.com");
  },
};
