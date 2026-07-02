import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, Search as SearchGlyph, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { ListboxItem } from "../../internal/listbox-item";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteIcon,
} from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// Components-tier story: Base UI behavior parts graft Propel's styled parts via `render`.
const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  subcomponents: {
    AutocompleteInputGroup,
    AutocompleteIcon,
    AutocompleteInput,
    AutocompleteContent,
    ListboxItem,
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
        <BaseAutocomplete.InputGroup render={<AutocompleteInputGroup magnitude="md" />}>
          <BaseAutocomplete.Input
            render={<AutocompleteInput magnitude="md" />}
            placeholder="e.g. docker.io/library/node:latest"
          />
          <BaseAutocomplete.Clear
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
          <BaseAutocomplete.Trigger
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
        </BaseAutocomplete.InputGroup>
        <FieldDescription magnitude="md">Enter a registry URL with optional tags.</FieldDescription>
        <AutocompleteContent>
          <BaseAutocomplete.Empty render={<AutocompleteEmpty />}>No matches</BaseAutocomplete.Empty>
          <BaseAutocomplete.List>
            {IMAGES.map((image) => (
              <BaseAutocomplete.Item
                key={image}
                value={image}
                render={<ListboxItem layout="plain" magnitude="md" />}
              >
                {image}
              </BaseAutocomplete.Item>
            ))}
          </BaseAutocomplete.List>
        </AutocompleteContent>
        <FieldError magnitude="md" />
      </Autocomplete>
    </Field>
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

/** The autocomplete dressed as a search box: a leading `AutocompleteIcon` magnifier + input + clear. */
export const Search: Story = {
  args: { items: IMAGES, mode: "both" },
  render: (args) => (
    <Autocomplete {...args}>
      <BaseAutocomplete.InputGroup render={<AutocompleteInputGroup magnitude="md" />}>
        <AutocompleteIcon>
          <SearchGlyph />
        </AutocompleteIcon>
        <BaseAutocomplete.Input
          render={<AutocompleteInput magnitude="md" />}
          placeholder="Search images"
          aria-label="Search images"
        />
        <BaseAutocomplete.Clear
          render={
            <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear search">
              <X />
            </IconButton>
          }
        />
      </BaseAutocomplete.InputGroup>
      <AutocompleteContent>
        <BaseAutocomplete.Empty render={<AutocompleteEmpty />}>No matches</BaseAutocomplete.Empty>
        <BaseAutocomplete.List>
          {IMAGES.map((image) => (
            <BaseAutocomplete.Item
              key={image}
              value={image}
              render={<ListboxItem layout="plain" magnitude="md" />}
            >
              {image}
            </BaseAutocomplete.Item>
          ))}
        </BaseAutocomplete.List>
      </AutocompleteContent>
    </Autocomplete>
  ),
};
