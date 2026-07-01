import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect } from "storybook/test";

import { IconButton } from "../icon-button";
import { AutocompleteField } from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// An Autocomplete laid out as a field (Field + Autocomplete + label/helper). The clear/trigger
// controls are consumer-provided nodes carrying their own (localizable) aria-labels.
const meta = {
  title: "Components/AutocompleteField",
  component: AutocompleteField,
  args: {
    name: "containerImage",
    label: "Container image",
    description: "Type or choose an image tag.",
    clear: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="md"
        aria-label="Clear container image"
      >
        <X />
      </IconButton>
    ),
    trigger: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="md"
        aria-label="Open container image"
      >
        <ChevronsUpDown />
      </IconButton>
    ),
    empty: "No images found",
    magnitude: "md",
    items: IMAGES,
    placeholder: "e.g. node:22-slim",
  },
} satisfies Meta<typeof AutocompleteField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RendersInput: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox", { name: "Container image" })).toBeInTheDocument();
  },
};

/** Setting `error` marks the field invalid, which recolors the input group border to danger. */
export const Invalid: Story = {
  args: { error: "Enter a container image." },
};

/**
 * Interaction test: the invalid field marks the input `aria-invalid`/`data-invalid` and recolors
 * the group border. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const InvalidInteraction: Story = {
  ...Invalid,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Container image" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    const group = input.closest<HTMLElement>(":has([data-invalid])");
    await expect(group).toHaveClass("has-[[data-invalid]]:border-danger-strong");
  },
};
