import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Field as BaseField } from "@base-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Field, FieldError, FieldLabel } from "../field/index";
import { IconButton, IconButtonIcon } from "../icon-button";
import { ComboboxEmpty, ComboboxInput, ComboboxInputGroup, ComboboxItemIndicator } from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, portal, and positioner are behavior-only (they
// live in `components`), so this in-tier story wires them straight from `@base-ui/react`.
const meta = {
  title: "Elements/Combobox",
  component: ListboxPopup,
  subcomponents: {
    ComboboxInputGroup,
    ComboboxInput,
    ComboboxItemIndicator,
    ListboxItem,
    ComboboxEmpty,
  },
} satisfies Meta<typeof ListboxPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

const clearButton = (
  <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear region">
    <IconButtonIcon>
      <X />
    </IconButtonIcon>
  </IconButton>
);
const triggerButton = (
  <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
    <IconButtonIcon>
      <ChevronsUpDown />
    </IconButtonIcon>
  </IconButton>
);

/** Combobox owns the input and popup composition for choosing from filterable items. */
export const Default: Story = {
  render: () => (
    <BaseField.Root name="region" render={<Field />}>
      <BaseCombobox.Root items={REGIONS} required>
        <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
          Region
        </BaseField.Label>
        <BaseCombobox.InputGroup render={<ComboboxInputGroup />}>
          <BaseCombobox.Input render={<ComboboxInput />} placeholder="e.g. eu-central-1" />
          <BaseCombobox.Clear render={clearButton} />
          <BaseCombobox.Trigger render={triggerButton} />
        </BaseCombobox.InputGroup>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner>
            <BaseCombobox.Popup render={<ListboxPopup />}>
              <BaseCombobox.Empty render={<ComboboxEmpty />}>No matches</BaseCombobox.Empty>
              <BaseCombobox.List>
                {REGIONS.map((region) => (
                  <BaseCombobox.Item
                    key={region}
                    value={region}
                    render={<ListboxItem magnitude="md" />}
                  >
                    <BaseCombobox.ItemIndicator render={<ComboboxItemIndicator />}>
                      <Check aria-hidden />
                    </BaseCombobox.ItemIndicator>
                    <span>{region}</span>
                  </BaseCombobox.Item>
                ))}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
        <BaseField.Error render={<FieldError magnitude="md" />} />
      </BaseCombobox.Root>
    </BaseField.Root>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    await expect(within(document.body).getByText("eu-central-1")).toBeInTheDocument();
  },
};

/**
 * An invalid field: `Field.Root invalid` propagates `data-invalid` to the input, and the input
 * group recolors its border to `danger` off `:has([data-invalid])` — no `tone` prop required.
 */
export const Invalid: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseField.Root name="region" invalid render={<Field />}>
      <BaseCombobox.Root items={REGIONS} required>
        <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
          Region
        </BaseField.Label>
        <BaseCombobox.InputGroup render={<ComboboxInputGroup />}>
          <BaseCombobox.Input render={<ComboboxInput />} placeholder="e.g. eu-central-1" />
          <BaseCombobox.Clear render={clearButton} />
          <BaseCombobox.Trigger render={triggerButton} />
        </BaseCombobox.InputGroup>
        <BaseField.Error match={true} render={<FieldError magnitude="md" />}>
          Choose a deployment region.
        </BaseField.Error>
      </BaseCombobox.Root>
    </BaseField.Root>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Region" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    // The wrapping input group recolors its border off `:has([data-invalid])`.
    const group = input.closest<HTMLElement>(":has([data-invalid])");
    await expect(group).toHaveClass("has-[[data-invalid]]:border-danger-strong");
  },
};
