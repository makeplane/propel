import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldDescription, FieldError, FieldLabel } from "../field/index";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteTrigger,
} from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

const meta = {
  title: "UI/Autocomplete",
  component: Autocomplete,
  subcomponents: {
    AutocompleteInputGroup,
    AutocompleteInput,
    AutocompleteClear,
    AutocompleteTrigger,
    AutocompletePortal,
    AutocompletePositioner,
    AutocompletePopup,
    AutocompleteList,
    AutocompleteItem,
    AutocompleteEmpty,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Autocomplete composes with Field labels and descriptions for free-form searchable input. */
export const Default: Story = {
  args: { items: IMAGES, mode: "both", required: true },
  render: (args) => (
    <Field name="containerImage">
      <Autocomplete {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Container image
        </FieldLabel>
        <AutocompleteInputGroup>
          <AutocompleteInput placeholder="e.g. docker.io/library/node:latest" />
          <AutocompleteClear>
            <X aria-hidden />
          </AutocompleteClear>
          <AutocompleteTrigger>
            <ChevronsUpDown aria-hidden />
          </AutocompleteTrigger>
        </AutocompleteInputGroup>
        <FieldDescription magnitude="md">Enter a registry URL with optional tags.</FieldDescription>
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>No matches</AutocompleteEmpty>
              <AutocompleteList>
                {IMAGES.map((image) => (
                  <AutocompleteItem key={image} value={image}>
                    {image}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
        <FieldError magnitude="md" />
      </Autocomplete>
    </Field>
  ),
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
  args: { items: IMAGES, mode: "both", required: true },
  render: (args) => (
    <Field name="containerImage" invalid>
      <Autocomplete {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Container image
        </FieldLabel>
        <AutocompleteInputGroup>
          <AutocompleteInput placeholder="e.g. docker.io/library/node:latest" />
          <AutocompleteClear>
            <X aria-hidden />
          </AutocompleteClear>
          <AutocompleteTrigger>
            <ChevronsUpDown aria-hidden />
          </AutocompleteTrigger>
        </AutocompleteInputGroup>
        <FieldError magnitude="md" match={true}>
          Enter a container image.
        </FieldError>
      </Autocomplete>
    </Field>
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
