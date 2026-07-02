import { Button as BaseButton } from "@base-ui/react/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

import { ButtonAnchor, type ButtonAnchorMagnitude, type ButtonAnchorProminence } from "./index";

const PROMINENCES: ButtonAnchorProminence[] = ["primary", "secondary"];
const MAGNITUDES: ButtonAnchorMagnitude[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): `ButtonAnchor` is a Base-UI-agnostic styled `<button>` wearing the
// inline-link look; Base UI's `Button` grafts the action behavior onto it via `render` (behavior
// part outer, styled part the render target) — the same wiring the `components` ready-made composes.
// For a nav `<a>` styled as a button see `AnchorButton`; for a real inline link, `Anchor`.
const meta = {
  title: "Elements/ButtonAnchor",
  component: ButtonAnchor,
  args: { children: "Show more", prominence: "primary", magnitude: "md" },
  render: ({ prominence, magnitude, children, onClick }) => (
    <BaseButton
      onClick={onClick}
      render={<ButtonAnchor prominence={prominence} magnitude={magnitude} />}
    >
      {children}
    </BaseButton>
  ),
} satisfies Meta<typeof ButtonAnchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `prominence`: `primary` is the blue link; `secondary` is the muted gray inline link. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: ({ magnitude }) => (
    <div className="flex items-center gap-4">
      {PROMINENCES.map((prominence) => (
        <BaseButton
          key={prominence}
          render={<ButtonAnchor prominence={prominence} magnitude={magnitude} />}
        >
          {prominence} action
        </BaseButton>
      ))}
    </div>
  ),
};

/** Text sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: ({ prominence }) => (
    <div className="flex items-center gap-4">
      {MAGNITUDES.map((magnitude) => (
        <BaseButton
          key={magnitude}
          render={<ButtonAnchor prominence={prominence} magnitude={magnitude} />}
        >
          {magnitude}
        </BaseButton>
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
