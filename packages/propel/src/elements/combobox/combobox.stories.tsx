import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Field as BaseField } from "@base-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Icon } from "../../internal/icon";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Field, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItemIndicator,
} from "./index";

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
    ComboboxChips,
    ComboboxChip,
    ComboboxChipRemove,
    ComboboxItemIndicator,
    ListboxItem,
    ComboboxEmpty,
  },
} satisfies Meta<typeof ListboxPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

const clearButton = (
  <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear region">
    <Icon>
      <X />
    </Icon>
  </IconButton>
);
const triggerButton = (
  <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
    <Icon>
      <ChevronsUpDown />
    </Icon>
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
        <BaseCombobox.InputGroup render={<ComboboxInputGroup magnitude="md" />}>
          <BaseCombobox.Input render={<ComboboxInput />} placeholder="e.g. eu-central-1" />
          <BaseCombobox.Clear render={clearButton} />
          <BaseCombobox.Trigger render={triggerButton} />
        </BaseCombobox.InputGroup>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner>
            <BaseCombobox.Popup render={<ListboxPopup />}>
              <BaseCombobox.Empty render={<ComboboxEmpty />}>No matches</BaseCombobox.Empty>
              <BaseCombobox.List>
                {(region: string) => (
                  <BaseCombobox.Item
                    key={region}
                    value={region}
                    render={<ListboxItem layout="indicator" magnitude="md" />}
                  >
                    <BaseCombobox.ItemIndicator keepMounted render={<ComboboxItemIndicator />}>
                      <Check aria-hidden />
                    </BaseCombobox.ItemIndicator>
                    <span>{region}</span>
                  </BaseCombobox.Item>
                )}
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
        <BaseCombobox.InputGroup render={<ComboboxInputGroup magnitude="md" />}>
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

/**
 * `multiple` swaps the input frame for `ComboboxChips`: each selected value renders as a
 * `ComboboxChip` (label + `ComboboxChipRemove`) ahead of the inline input, wrapping onto new rows
 * as the selection grows. Arrow keys move focus across chips; Backspace removes.
 */
export const Multiple: Story = {
  render: () => (
    <BaseField.Root name="regions" render={<Field />}>
      <BaseCombobox.Root multiple items={REGIONS} defaultValue={["us-east-1", "eu-central-1"]}>
        <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
          Regions
        </BaseField.Label>
        <BaseCombobox.Chips render={<ComboboxChips magnitude="md" />}>
          <BaseCombobox.Value>
            {(regions: string[]) => (
              <>
                {regions.map((region) => (
                  <BaseCombobox.Chip key={region} render={<ComboboxChip />} aria-label={region}>
                    {region}
                    <BaseCombobox.ChipRemove
                      render={<ComboboxChipRemove />}
                      aria-label={`Remove ${region}`}
                    >
                      <X aria-hidden />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                ))}
                <BaseCombobox.Input render={<ComboboxInput />} placeholder="Add a region" />
              </>
            )}
          </BaseCombobox.Value>
        </BaseCombobox.Chips>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner>
            <BaseCombobox.Popup render={<ListboxPopup />}>
              <BaseCombobox.Empty render={<ComboboxEmpty />}>No matches</BaseCombobox.Empty>
              <BaseCombobox.List>
                {(region: string) => (
                  <BaseCombobox.Item
                    key={region}
                    value={region}
                    render={<ListboxItem layout="indicator" magnitude="md" />}
                  >
                    <BaseCombobox.ItemIndicator keepMounted render={<ComboboxItemIndicator />}>
                      <Check aria-hidden />
                    </BaseCombobox.ItemIndicator>
                    <span>{region}</span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </BaseField.Root>
  ),
};

/**
 * Interaction test: both preselected values render as chips, a chip's remove button drops just that
 * value, and picking another item appends a chip. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const MultipleInteraction: Story = {
  ...Multiple,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("us-east-1")).toBeInTheDocument();
    await expect(canvas.getByText("eu-central-1")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Remove us-east-1" }));
    await expect(canvas.queryByText("us-east-1")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("combobox", { name: "Regions" }));
    const popup = within(document.body);
    await userEvent.click(await popup.findByRole("option", { name: "ap-west-1" }));
    await expect(canvas.getByText("ap-west-1")).toBeInTheDocument();
    await expect(canvas.getByText("eu-central-1")).toBeInTheDocument();
  },
};
