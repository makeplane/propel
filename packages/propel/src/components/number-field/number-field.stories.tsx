import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { IconButton } from "../icon-button";
import { NumberField } from "./index";

// Components-tier story: the ready-made `NumberField` — a numeric input flanked by
// −/+ buttons, wired for you. Drive it with `value`/`defaultValue`, bound it with
// `min`/`max`/`step`. The decrement/increment steppers are consumer-provided controls.
const meta = {
  title: "Components/NumberField",
  component: NumberField,
  args: {
    "aria-label": "Number of instances",
    decrement: (
      <IconButton prominence="ghost" tone="neutral" magnitude="xl" aria-label="Decrease">
        <Minus />
      </IconButton>
    ),
    increment: (
      <IconButton prominence="ghost" tone="neutral" magnitude="xl" aria-label="Increase">
        <Plus />
      </IconButton>
    ),
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A bounded numeric input with stepper buttons. */
export const Default: Story = {
  args: { defaultValue: 2, min: 1, max: 64, magnitude: "xl" },
};

/** Clicking the +/- buttons steps the value within `min`/`max`. */
export const IncrementAndDecrement: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { defaultValue: 2, min: 1, max: 64, magnitude: "xl" },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Number of instances" });
    await expect(input).toHaveDisplayValue("2");
    await userEvent.click(canvas.getByRole("button", { name: "Increase" }));
    await expect(input).toHaveDisplayValue("3");
    await userEvent.click(canvas.getByRole("button", { name: "Decrease" }));
    await expect(input).toHaveDisplayValue("2");
  },
};
