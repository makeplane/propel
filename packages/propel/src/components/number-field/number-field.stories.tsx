import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { NumberField, type NumberFieldMagnitude } from "./index";

const MAGNITUDES: NumberFieldMagnitude[] = ["sm", "md", "lg", "xl"];

// Components-tier story: the ready-made `NumberField` — a numeric input flanked by
// −/+ buttons, wired for you. Drive it with `value`/`defaultValue`, bound it with
// `min`/`max`/`step`. The decrement/increment steppers are consumer-provided controls.
const meta = {
  title: "Components/NumberField",
  component: NumberField,
  args: {
    "aria-label": "Number of instances",
    decrement: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="xl"
        aria-label="Decrease"
        icon={<Icon icon={Minus} />}
      />
    ),
    increment: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="xl"
        aria-label="Increase"
        icon={<Icon icon={Plus} />}
      />
    ),
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A bounded numeric input with stepper buttons. */
export const Default: Story = {
  args: { defaultValue: 2, min: 1, max: 64, magnitude: "xl" },
};

/**
 * All sizes (sm/md/lg/xl) side by side. The input height matches the stepper button square, so each
 * field's decrement/increment `IconButton`s carry the same `magnitude` as the field — that is what
 * keeps the group container flush.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude`, building magnitude-matched steppers and a distinct accessible name per
  // field, so disable those controls; the rest stay live and update every field at once.
  argTypes: {
    magnitude: { control: false },
    decrement: { control: false },
    increment: { control: false },
    "aria-label": { control: false },
  },
  args: { defaultValue: 2, min: 1, max: 64, magnitude: "xl" },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <NumberField
          key={magnitude}
          {...args}
          magnitude={magnitude}
          aria-label={`Number of instances (${magnitude})`}
          decrement={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude={magnitude}
              aria-label={`Decrease (${magnitude})`}
              icon={<Icon icon={Minus} />}
            />
          }
          increment={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude={magnitude}
              aria-label={`Increase (${magnitude})`}
              icon={<Icon icon={Plus} />}
            />
          }
        />
      ))}
    </div>
  ),
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
