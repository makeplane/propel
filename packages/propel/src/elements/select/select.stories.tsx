import { Field as BaseField } from "@base-ui/react/field";
import { Select as BaseSelect } from "@base-ui/react/select";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown } from "lucide-react";
import { expect, within } from "storybook/test";

import { Icon } from "../../internal/icon";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Field, FieldError } from "../field/index";
import { SelectField, SelectItemIndicator, SelectLabel, SelectTrigger, SelectValue } from "./index";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, portal, and positioner are behavior-only (they
// live in `components`), so this in-tier story wires them straight from `@base-ui/react`; the popup
// and item rows use the shared `internal` listbox primitives.
const meta = {
  title: "Elements/Select",
  component: ListboxPopup,
  subcomponents: {
    SelectField,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    ListboxItem,
    SelectItemIndicator,
  },
} satisfies Meta<typeof ListboxPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Trigger-based select control composed inside Field.Root for names and validation. */
export const Default: Story = {
  render: () => (
    <BaseField.Root name="serverType" render={<Field />}>
      <BaseSelect.Root items={SERVER_TYPES} defaultValue="general" required>
        <SelectField>
          <BaseSelect.Label render={<SelectLabel />}>Server type</BaseSelect.Label>
          <BaseSelect.Trigger render={<SelectTrigger magnitude="md" />}>
            <BaseSelect.Value render={<SelectValue />} />
            <Icon tint="secondary">
              <ChevronsUpDown />
            </Icon>
          </BaseSelect.Trigger>
        </SelectField>
        <BaseSelect.Portal>
          <BaseSelect.Positioner>
            <BaseSelect.Popup render={<ListboxPopup />}>
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
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
        <BaseField.Error render={<FieldError magnitude="md" />} />
      </BaseSelect.Root>
    </BaseField.Root>
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
