import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, Search as SearchGlyph, X } from "lucide-react";
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
  AutocompleteIcon,
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
    AutocompleteIcon,
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
        <AutocompleteInputGroup magnitude="md">
          <AutocompleteInput magnitude="md" placeholder="e.g. docker.io/library/node:latest" />
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
 * The autocomplete dressed as a search box: a leading `AutocompleteIcon` magnifier + input + clear,
 * and no chevron trigger. Same parts as `Default` — this is the styling target for folding `Search`
 * into `Autocomplete`.
 */
export const Search: Story = {
  args: { items: IMAGES, mode: "both" },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInputGroup magnitude="md">
        <AutocompleteIcon>
          <SearchGlyph />
        </AutocompleteIcon>
        <AutocompleteInput magnitude="md" placeholder="Search images" aria-label="Search images" />
        <AutocompleteClear
          render={
            <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear search">
              <X />
            </IconButton>
          }
        />
      </AutocompleteInputGroup>
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
    </Autocomplete>
  ),
};
