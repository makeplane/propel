import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { Field as BaseField } from "@base-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field/index";
import { IconButton, IconButtonIcon } from "../icon-button";
import { AutocompleteEmpty, AutocompleteInput, AutocompleteInputGroup } from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, portal, and positioner are behavior-only (they
// live in `components`), so this in-tier story wires them straight from `@base-ui/react`.
const meta = {
  title: "Elements/Autocomplete",
  component: ListboxPopup,
  subcomponents: {
    AutocompleteInputGroup,
    AutocompleteInput,
    ListboxItem,
    AutocompleteEmpty,
  },
} satisfies Meta<typeof ListboxPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

const clearButton = (
  <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear container image">
    <IconButtonIcon>
      <X />
    </IconButtonIcon>
  </IconButton>
);
const triggerButton = (
  <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open container image">
    <IconButtonIcon>
      <ChevronsUpDown />
    </IconButtonIcon>
  </IconButton>
);

/** Autocomplete composes with Field labels and descriptions for free-form searchable input. */
export const Default: Story = {
  render: () => (
    <BaseField.Root name="containerImage" render={<Field />}>
      <BaseAutocomplete.Root items={IMAGES} mode="both" required>
        <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
          Container image
        </BaseField.Label>
        <BaseAutocomplete.InputGroup render={<AutocompleteInputGroup magnitude="md" />}>
          <BaseAutocomplete.Input
            render={<AutocompleteInput magnitude="md" />}
            placeholder="e.g. docker.io/library/node:latest"
          />
          <BaseAutocomplete.Clear render={clearButton} />
          <BaseAutocomplete.Trigger render={triggerButton} />
        </BaseAutocomplete.InputGroup>
        <BaseField.Description render={<FieldDescription magnitude="md" />}>
          Enter a registry URL with optional tags.
        </BaseField.Description>
        <BaseAutocomplete.Portal>
          <BaseAutocomplete.Positioner>
            <BaseAutocomplete.Popup render={<ListboxPopup />}>
              <BaseAutocomplete.Empty render={<AutocompleteEmpty />}>
                No matches
              </BaseAutocomplete.Empty>
              <BaseAutocomplete.List>
                {IMAGES.map((image) => (
                  <BaseAutocomplete.Item
                    key={image}
                    value={image}
                    render={<ListboxItem magnitude="md" />}
                  >
                    {image}
                  </BaseAutocomplete.Item>
                ))}
              </BaseAutocomplete.List>
            </BaseAutocomplete.Popup>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
        <BaseField.Error render={<FieldError magnitude="md" />} />
      </BaseAutocomplete.Root>
    </BaseField.Root>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Container image" }), "node");
    await expect(within(document.body).getByText("node:22-slim")).toBeInTheDocument();
  },
};

/**
 * An invalid field: `Field.Root invalid` propagates `data-invalid` to the input, and the input
 * group recolors its border to `danger` off `:has([data-invalid])` — no `tone` prop required.
 */
export const Invalid: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseField.Root name="containerImage" invalid render={<Field />}>
      <BaseAutocomplete.Root items={IMAGES} mode="both" required>
        <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
          Container image
        </BaseField.Label>
        <BaseAutocomplete.InputGroup render={<AutocompleteInputGroup magnitude="md" />}>
          <BaseAutocomplete.Input
            render={<AutocompleteInput magnitude="md" />}
            placeholder="e.g. docker.io/library/node:latest"
          />
          <BaseAutocomplete.Clear render={clearButton} />
          <BaseAutocomplete.Trigger render={triggerButton} />
        </BaseAutocomplete.InputGroup>
        <BaseField.Error match={true} render={<FieldError magnitude="md" />}>
          Enter a container image.
        </BaseField.Error>
      </BaseAutocomplete.Root>
    </BaseField.Root>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Container image" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    // The wrapping input group recolors its border off `:has([data-invalid])`.
    const group = input.closest<HTMLElement>(":has([data-invalid])");
    await expect(group).toHaveClass("has-[[data-invalid]]:border-danger-strong");
  },
};
