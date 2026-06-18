import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { NumberField } from "./index";

// Components-tier story: the ready-made `NumberField` — a numeric input flanked by
// −/+ buttons, wired for you. Drive it with `value`/`defaultValue`, bound it with
// `min`/`max`/`step`. The UI-tier story shows how to compose the parts with custom
// button icons or labels.
const meta = {
  title: "Components/NumberField",
  component: NumberField,
  args: { "aria-label": "Number of instances" },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A bounded numeric input with stepper buttons. */
export const Default: Story = {
  args: { defaultValue: 2, min: 1, max: 64 },
};

/** Clicking the +/- buttons steps the value within `min`/`max`. */
export const IncrementAndDecrement: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { defaultValue: 2, min: 1, max: 64 },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Number of instances" });
    await expect(input).toHaveDisplayValue("2");
    await userEvent.click(canvas.getByRole("button", { name: "Increase" }));
    await expect(input).toHaveDisplayValue("3");
    await userEvent.click(canvas.getByRole("button", { name: "Decrease" }));
    await expect(input).toHaveDisplayValue("2");
  },
};
