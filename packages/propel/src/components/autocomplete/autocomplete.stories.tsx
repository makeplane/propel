import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, Search as SearchGlyph, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldDescription, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// Components-tier story: the ready-mades already carry the Base UI behavior, so the whole
// autocomplete composes without any Base UI import.
const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  subcomponents: {
    AutocompleteInputGroup,
    AutocompleteContent,
    AutocompleteList,
    AutocompleteItem,
    AutocompleteEmpty,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A free-form searchable input laid out as a form field, with clear and open controls. */
export const Default: Story = {
  args: { items: IMAGES, mode: "both", required: true },
  render: (args) => (
    <Field name="containerImage">
      <Autocomplete {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Container image
        </FieldLabel>
        <AutocompleteInputGroup
          magnitude="md"
          placeholder="e.g. docker.io/library/node:latest"
          clear={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Clear container image"
            >
              <X />
            </IconButton>
          }
          trigger={
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
        <FieldDescription magnitude="md">Enter a registry URL with optional tags.</FieldDescription>
        <AutocompleteContent>
          <AutocompleteEmpty>No matches</AutocompleteEmpty>
          <AutocompleteList>
            {(image: string) => (
              <AutocompleteItem key={image} value={image} magnitude="md">
                {image}
              </AutocompleteItem>
            )}
          </AutocompleteList>
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
    // Base UI filters the list to the query: matches stay, everything else drops out.
    await expect(within(document.body).getByText("node:22-slim")).toBeInTheDocument();
    await expect(within(document.body).queryByText("postgres:18")).not.toBeInTheDocument();
  },
};

/** The autocomplete dressed as a search box: a leading magnifier `icon` + input + clear. */
export const Search: Story = {
  args: { items: IMAGES, mode: "both" },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInputGroup
        magnitude="md"
        icon={<SearchGlyph />}
        placeholder="Search images"
        aria-label="Search images"
        clear={
          <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear search">
            <X />
          </IconButton>
        }
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No matches</AutocompleteEmpty>
        <AutocompleteList>
          {(image: string) => (
            <AutocompleteItem key={image} value={image} magnitude="md">
              {image}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  ),
};

export const SearchInteraction: Story = {
  ...Search,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Search images" }), "redis");
    await expect(within(document.body).getByText("redis:8.2.2-alpine")).toBeInTheDocument();
  },
};
