import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { IconButton, IconButtonIcon } from "../icon-button";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "./index";

// UI-tier story: composes the atomic parts (root + group + decrement + input +
// increment). The steppers are pure behavior wrappers, rendered as ghost `IconButton`s — you own
// the glyphs and accessible names. The components-tier story shows the ready-made `NumberField`
// that wires the −/+ buttons for you.
const meta = {
  title: "UI/NumberField",
  component: NumberField,
  subcomponents: {
    NumberFieldGroup,
    NumberFieldInput,
    NumberFieldDecrement,
    NumberFieldIncrement,
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding a group with decrement / input / increment. */
export const Default: Story = {
  args: { defaultValue: 2, min: 1, max: 64 },
  render: (args) => (
    <NumberField {...args} aria-label="Number of instances">
      <NumberFieldGroup>
        <NumberFieldDecrement
          render={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="xl"
              aria-label="Decrease instances"
            >
              <IconButtonIcon>
                <Minus />
              </IconButtonIcon>
            </IconButton>
          }
        />
        <NumberFieldInput magnitude="xl" aria-label="Number of instances" />
        <NumberFieldIncrement
          render={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="xl"
              aria-label="Increase instances"
            >
              <IconButtonIcon>
                <Plus />
              </IconButtonIcon>
            </IconButton>
          }
        />
      </NumberFieldGroup>
    </NumberField>
  ),
};

/** The +/- buttons step the value within `min`/`max`. */
export const IncrementAndDecrement: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Number of instances" });
    await expect(input).toHaveDisplayValue("2");
    await userEvent.click(canvas.getByRole("button", { name: "Increase instances" }));
    await expect(input).toHaveDisplayValue("3");
    await userEvent.click(canvas.getByRole("button", { name: "Decrease instances" }));
    await expect(input).toHaveDisplayValue("2");
  },
};
