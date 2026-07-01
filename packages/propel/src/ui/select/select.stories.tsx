import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldError } from "../field/index";
import {
  Select,
  SelectField,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
  SelectValue,
} from "./index";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

const meta = {
  title: "UI/Select",
  component: Select,
  subcomponents: {
    SelectField,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectIcon,
    SelectPortal,
    SelectPositioner,
    SelectPopup,
    SelectList,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectScrollUpArrow,
    SelectScrollDownArrow,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Trigger-based select control composed inside Field.Root for names and validation. */
export const Default: Story = {
  args: { items: SERVER_TYPES, defaultValue: "general", required: true },
  render: (args) => (
    <Field name="serverType">
      <Select {...args}>
        <SelectField>
          <SelectLabel>Server type</SelectLabel>
          <SelectTrigger magnitude="md">
            <SelectValue />
            <SelectIcon>
              <ChevronsUpDown />
            </SelectIcon>
          </SelectTrigger>
        </SelectField>
        <SelectPortal>
          <SelectPositioner>
            <SelectPopup>
              <SelectList>
                {SERVER_TYPES.map(({ label, value }) => (
                  <SelectItem key={value} value={value} magnitude="md">
                    <SelectItemIndicator>
                      <Check />
                    </SelectItemIndicator>
                    <SelectItemText>{label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
        <FieldError magnitude="md" />
      </Select>
    </Field>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Server type" }));
    const popup = within(document.body);
    await expect(
      await popup.findByRole("option", { name: "Compute optimized" }),
    ).toBeInTheDocument();
  },
};
