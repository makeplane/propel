import { Select as BaseSelect } from "@base-ui/react/select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown } from "lucide-react";
import { expect, within } from "storybook/test";

import { ListboxItem } from "../../internal/listbox-item";
import { Field, FieldError } from "../field/index";
import {
  Select,
  SelectContent,
  SelectField,
  SelectIcon,
  SelectItemIndicator,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./index";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

// Components-tier story: the ready-made `SelectContent` collapses the portal/positioner/popup
// boilerplate into one element, and Base UI behavior parts graft Propel's styled parts via `render`.
const meta = {
  title: "Components/Select",
  component: Select,
  subcomponents: {
    SelectField,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectIcon,
    SelectContent,
    ListboxItem,
    SelectItemIndicator,
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
        <SelectField>
          <BaseSelect.Label render={<SelectLabel />}>Server type</BaseSelect.Label>
          <BaseSelect.Trigger render={<SelectTrigger magnitude="md" />}>
            <BaseSelect.Value render={<SelectValue />} />
            <SelectIcon>
              <ChevronsUpDown />
            </SelectIcon>
          </BaseSelect.Trigger>
        </SelectField>
        <SelectContent>
          <BaseSelect.List>
            {SERVER_TYPES.map(({ label, value }) => (
              <BaseSelect.Item
                key={value}
                value={value}
                render={<ListboxItem layout="indicator" magnitude="md" />}
              >
                <BaseSelect.ItemIndicator keepMounted render={<SelectItemIndicator />}>
                  <Check />
                </BaseSelect.ItemIndicator>
                <BaseSelect.ItemText>{label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.List>
        </SelectContent>
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
