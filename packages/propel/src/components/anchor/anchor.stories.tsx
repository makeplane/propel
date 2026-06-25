import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Anchor, type AnchorMagnitude, type AnchorProminence } from "./index";

const PROMINENCES: AnchorProminence[] = ["primary", "secondary"];
const MAGNITUDES: AnchorMagnitude[] = ["sm", "md", "lg", "xl"];

// The inline text link. For a button-styled nav link use `AnchorButton`; for a link-styled action
// use `ButtonAnchor`.
const meta = {
  title: "Components/Anchor",
  component: Anchor,
  args: { children: "Anchor", href: "#", prominence: "primary", magnitude: "md" },
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `prominence`: `primary` is the blue link; `secondary` the muted gray inline link. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {PROMINENCES.map((prominence) => (
        <Anchor key={prominence} {...args} prominence={prominence}>
          {prominence} link
        </Anchor>
      ))}
    </div>
  ),
};

/** Text sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {MAGNITUDES.map((magnitude) => (
        <Anchor key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </Anchor>
      ))}
    </div>
  ),
};

/** It renders a real `<a>` carrying the given `href`. */
export const RendersAnchor: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { href: "https://example.com" },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Anchor" });
    await expect(link).toHaveAttribute("href", "https://example.com");
  },
};
