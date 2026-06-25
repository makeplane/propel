import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

import { ButtonAnchor, type ButtonAnchorMagnitude, type ButtonAnchorProminence } from "./index";

const PROMINENCES: ButtonAnchorProminence[] = ["primary", "secondary"];
const MAGNITUDES: ButtonAnchorMagnitude[] = ["sm", "md", "lg", "xl"];

// UI-tier story: a `<button>` (an action) wearing the inline-link look. Same appearance as `Anchor`,
// but it acts (onClick) instead of navigating. For a nav `<a>` that looks like a button, see `AnchorButton`.
const meta = {
  title: "UI/ButtonAnchor",
  component: ButtonAnchor,
  args: { children: "Show more", prominence: "primary", magnitude: "md" },
} satisfies Meta<typeof ButtonAnchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `prominence`: `primary` is the blue link; `secondary` is the muted gray inline link. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {PROMINENCES.map((prominence) => (
        <ButtonAnchor key={prominence} {...args} prominence={prominence}>
          {prominence} action
        </ButtonAnchor>
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
        <ButtonAnchor key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </ButtonAnchor>
      ))}
    </div>
  ),
};

/** It is a real `<button>` (an action) — clicking fires `onClick`, not navigation. */
export const ActsNotNavigates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
