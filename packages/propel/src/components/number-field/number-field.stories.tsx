import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "./index";

const meta = {
  title: "Components/NumberField",
  component: NumberField,
  subcomponents: { NumberFieldGroup, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** NumberField composes inside Field.Root so labels, errors, and native validation work. */
export const Default: Story = {
  args: { defaultValue: 2, min: 1, max: 64, required: true },
  render: (args) => (
    <Field name="instances">
      <NumberField {...args}>
        <FieldLabel magnitude="md">Number of instances</FieldLabel>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease instances">
            <Minus aria-hidden className="size-4" />
          </NumberFieldDecrement>
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase instances">
            <Plus aria-hidden className="size-4" />
          </NumberFieldIncrement>
        </NumberFieldGroup>
        <FieldError magnitude="md" />
      </NumberField>
    </Field>
  ),
};

export const IncrementAndDecrement: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { defaultValue: 2, min: 1, max: 64 },
  render: (args) => (
    <Field name="instances">
      <NumberField {...args}>
        <FieldLabel magnitude="md">Number of instances</FieldLabel>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease instances">
            <Minus aria-hidden className="size-4" />
          </NumberFieldDecrement>
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase instances">
            <Plus aria-hidden className="size-4" />
          </NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberField>
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Number of instances" });
    await expect(input).toHaveDisplayValue("2");
    await userEvent.click(canvas.getByRole("button", { name: "Increase instances" }));
    await expect(input).toHaveDisplayValue("3");
    await userEvent.click(canvas.getByRole("button", { name: "Decrease instances" }));
    await expect(input).toHaveDisplayValue("2");
  },
};
