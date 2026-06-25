import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";
import { expect } from "storybook/test";

import {
  ButtonAnchor,
  ButtonAnchorIcon,
  ButtonAnchorLabel,
  ButtonAnchorSpinner,
  type ButtonAnchorMagnitude,
  type ButtonAnchorProminence,
} from "./index";

const PROMINENCES: ButtonAnchorProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: ButtonAnchorMagnitude[] = ["sm", "md", "lg", "xl"];

// UI-tier story: the ATOMIC button-anchor — a single `<a>` wearing the shared control chrome, with
// `prominence` / `tone` / `magnitude` / `sizing`. Same look as `Button` but it navigates. The
// ready-made `ButtonAnchor` (Components/ButtonAnchor) lays out its icon/label slots.
const meta = {
  title: "UI/ButtonAnchor",
  component: ButtonAnchor,
  subcomponents: { ButtonAnchorIcon, ButtonAnchorLabel, ButtonAnchorSpinner },
  args: {
    children: "Link",
    href: "#",
    prominence: "primary",
    tone: "neutral",
    magnitude: "md",
    sizing: "hug",
  },
} satisfies Meta<typeof ButtonAnchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every prominence (Figma "Type") side by side. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <ButtonAnchor key={prominence} {...args} prominence={prominence}>
          {prominence}
        </ButtonAnchor>
      ))}
    </div>
  ),
};

/** Tone selects the palette: `neutral` or `danger`. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <ButtonAnchor {...args} tone="neutral" prominence="primary">
        Neutral
      </ButtonAnchor>
      <ButtonAnchor {...args} tone="danger" prominence="primary">
        Danger fill
      </ButtonAnchor>
      <ButtonAnchor {...args} tone="danger" prominence="secondary">
        Danger outline
      </ButtonAnchor>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <ButtonAnchor key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </ButtonAnchor>
      ))}
    </div>
  ),
};

/**
 * Composed by hand from named parts: `ButtonAnchorIcon` sizes a decorative node to `--node-size`,
 * `ButtonAnchorLabel` holds the text. The ready-made `ButtonAnchor` lays these out for you.
 */
export const Anatomy: Story = {
  args: { children: undefined },
  argTypes: { children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <ButtonAnchor {...args}>
        <ButtonAnchorIcon>
          <Plus />
        </ButtonAnchorIcon>
        <ButtonAnchorLabel>With icon</ButtonAnchorLabel>
      </ButtonAnchor>
      <ButtonAnchor {...args} prominence="secondary">
        <ButtonAnchorLabel>Learn more</ButtonAnchorLabel>
        <ButtonAnchorIcon>
          <ArrowRight />
        </ButtonAnchorIcon>
      </ButtonAnchor>
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
