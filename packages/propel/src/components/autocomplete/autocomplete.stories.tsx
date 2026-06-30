import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldDescription, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteTrigger,
} from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// Components-tier story: the ready-made `AutocompleteContent` collapses the
// portal/positioner/popup boilerplate into one element. The UI-tier `Autocomplete`
// story assembles those raw parts by hand.
const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  subcomponents: {
    AutocompleteInputGroup,
    AutocompleteInput,
    AutocompleteClear,
    AutocompleteTrigger,
    AutocompleteContent,
    AutocompleteList,
    AutocompleteItem,
    AutocompleteEmpty,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Autocomplete using the ready-made `AutocompleteContent` surface for free-form searchable input. */
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
          <AutocompleteClear
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label="Clear container image"
              >
                <X />
              </IconButton>
            }
          />
          <AutocompleteTrigger
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label="Open container image"
              >
                <ChevronsUpDown />
              </IconButton>
            }
          />
        </AutocompleteInputGroup>
        <FieldDescription magnitude="md">Enter a registry URL with optional tags.</FieldDescription>
        <AutocompleteContent>
          <AutocompleteEmpty>No matches</AutocompleteEmpty>
          <AutocompleteList>
            {IMAGES.map((image) => (
              <AutocompleteItem key={image} value={image}>
                {image}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        </AutocompleteContent>
        <FieldError magnitude="md" />
      </Autocomplete>
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Container image" }), "node");
    await expect(within(document.body).getByText("node:22-slim")).toBeInTheDocument();
  },
};
