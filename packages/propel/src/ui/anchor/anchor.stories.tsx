import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Anchor, type AnchorEmphasis, type AnchorMagnitude } from "./index";

const EMPHASES: AnchorEmphasis[] = ["solid", "subtle"];
const MAGNITUDES: AnchorMagnitude[] = ["sm", "md", "lg", "xl"];

// UI-tier story: the inline text link — a single styled `<a>` with `emphasis` (solid blue / subtle
// gray) and `magnitude` (text size). It is the correct element for what used to be the button
// `link` look. For a link that looks like a button, see `ButtonAnchor`.
const meta = {
  title: "UI/Anchor",
  component: Anchor,
  args: { children: "Anchor", href: "#", emphasis: "solid", magnitude: "md" },
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `emphasis`: `solid` is the blue primary link; `subtle` is the muted gray inline link. */
export const Emphases: Story = {
  argTypes: { emphasis: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {EMPHASES.map((emphasis) => (
        <Anchor key={emphasis} {...args} emphasis={emphasis}>
          {emphasis} link
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
