import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";
import { expect } from "storybook/test";

import {
  AnchorButton,
  AnchorButtonIcon,
  AnchorButtonLabel,
  AnchorButtonSpinner,
  type AnchorButtonMagnitude,
  type AnchorButtonProminence,
} from "./index";

const PROMINENCES: AnchorButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: AnchorButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// elements-tier story: the ATOMIC anchor-button — a single `<a>` wearing the shared control chrome, with
// `prominence` / `tone` / `magnitude` / `sizing`. Same look as `Button` but it navigates. The
// ready-made `AnchorButton` (Components/AnchorButton) lays out its icon/label slots.
const meta = {
  title: "Elements/AnchorButton",
  component: AnchorButton,
  subcomponents: { AnchorButtonIcon, AnchorButtonLabel, AnchorButtonSpinner },
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

/** Every prominence (Figma "Type") side by side. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <AnchorButton key={prominence} {...args} prominence={prominence}>
          {prominence}
        </AnchorButton>
      ))}
    </div>
  ),
};

/** Tone selects the palette: `neutral` or `danger`. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <AnchorButton {...args} tone="neutral" prominence="primary">
        Neutral
      </AnchorButton>
      <AnchorButton {...args} tone="danger" prominence="primary">
        Danger fill
      </AnchorButton>
      <AnchorButton {...args} tone="danger" prominence="secondary">
        Danger outline
      </AnchorButton>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <AnchorButton key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </AnchorButton>
      ))}
    </div>
  ),
};

/**
 * Composed by hand from named parts: `AnchorButtonIcon` sizes a decorative node to `--node-size`,
 * `AnchorButtonLabel` holds the text. The ready-made `AnchorButton` lays these out for you.
 */
export const Anatomy: Story = {
  args: { children: undefined },
  argTypes: { children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <AnchorButton {...args}>
        <AnchorButtonIcon>
          <Plus />
        </AnchorButtonIcon>
        <AnchorButtonLabel>With icon</AnchorButtonLabel>
      </AnchorButton>
      <AnchorButton {...args} prominence="secondary">
        <AnchorButtonLabel>Learn more</AnchorButtonLabel>
        <AnchorButtonIcon>
          <ArrowRight />
        </AnchorButtonIcon>
      </AnchorButton>
    </div>
  ),
};

/** It renders a real `<a>` carrying the given `href`. */
export const RendersAnchor: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { href: "https://example.com" },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Link" });
    await expect(link).toHaveAttribute("href", "https://example.com");
  },
};
