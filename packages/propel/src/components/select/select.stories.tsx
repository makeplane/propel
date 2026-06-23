import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldError } from "../field/index";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectTrigger,
  SelectValue,
} from "./index";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

// Components-tier story: the ready-made `SelectContent` collapses the
// portal/positioner/popup boilerplate into one element. The UI-tier `Select`
// story assembles those raw parts by hand.
const meta = {
  title: "Components/Select",
  component: Select,
  subcomponents: {
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectIcon,
    SelectContent,
    SelectList,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Trigger-based select using the ready-made `SelectContent` surface inside a `Field`. */
export const Default: Story = {
  args: { items: SERVER_TYPES, defaultValue: "general", required: true },
  render: (args) => (
    <Field name="serverType">
      <Select {...args}>
        <div className="flex w-fit flex-col gap-1.5">
          <SelectLabel>Server type</SelectLabel>
          <SelectTrigger magnitude="md">
            <SelectValue />
            <SelectIcon>
              <ChevronsUpDown />
            </SelectIcon>
          </SelectTrigger>
        </div>
        <SelectContent>
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
        </SelectContent>
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
