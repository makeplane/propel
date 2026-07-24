import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { AutocompleteField, type FieldMagnitude } from "./index";

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];

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
        variant="ghost"
        size="md"
        aria-label="Clear container image"
        icon={<Icon icon={X} />}
      />
    ),
    trigger: (
      <IconButton
        variant="ghost"
        size="md"
        aria-label="Open container image"
        icon={<Icon icon={ChevronsUpDown} />}
      />
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

/**
 * Every magnitude (`md` / `lg` / `xl`) stacked. Magnitude steps the label, description, and
 * helper-text size; the input group keeps its own fixed scale.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each field with the magnitude name, so disable
  // just those two controls; the rest stay live and update every field at once.
  argTypes: { magnitude: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <AutocompleteField key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  ),
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
