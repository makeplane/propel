import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Field, FieldError } from "../field/index";
import {
  Select,
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
        <div className="flex w-fit flex-col gap-1.5">
          <SelectLabel>Server type</SelectLabel>
          <SelectTrigger>
            <SelectValue />
            <SelectIcon />
          </SelectTrigger>
        </div>
        <SelectPortal>
          <SelectPositioner>
            <SelectPopup>
              <SelectList>
                {SERVER_TYPES.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <SelectItemIndicator />
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
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Server type" }));
    const popup = within(document.body);
    await expect(
      await popup.findByRole("option", { name: "Compute optimized" }),
    ).toBeInTheDocument();
  },
};
