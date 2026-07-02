import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { IconButton, IconButtonIcon } from "../icon-button";
import { NumberField, NumberFieldGroup, NumberFieldInput } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The steppers are pure behavior — rendered onto ghost
// `IconButton`s, so you own the glyphs and accessible names. The components-tier story shows the
// ready-made `NumberField` that wires the −/+ buttons for you.
const meta = {
  title: "Elements/NumberField",
  component: NumberField,
  subcomponents: {
    NumberFieldGroup,
    NumberFieldInput,
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding a group with decrement / input / increment. */
export const Default: Story = {
  render: () => (
    <BaseNumberField.Root
      defaultValue={2}
      min={1}
      max={64}
      aria-label="Number of instances"
      render={<NumberField />}
    >
      <BaseNumberField.Group render={<NumberFieldGroup />}>
        <BaseNumberField.Decrement
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
        <BaseNumberField.Input
          render={<NumberFieldInput magnitude="xl" />}
          aria-label="Number of instances"
        />
        <BaseNumberField.Increment
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
      </BaseNumberField.Group>
    </BaseNumberField.Root>
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
