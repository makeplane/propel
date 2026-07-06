import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { ComboboxField, type ComboboxFieldProps } from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];
const MAGNITUDES: ComboboxFieldProps["magnitude"][] = ["md", "lg", "xl"];

// A Combobox laid out as a field (Field + Combobox + label/helper). The clear/trigger controls are
// consumer-provided nodes carrying their own (localizable) aria-labels.
const meta = {
  title: "Components/ComboboxField",
  component: ComboboxField,
  args: {
    name: "region",
    label: "Region",
    description: "Filter the deployment region.",
    clear: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="md"
        aria-label="Clear region"
        icon={<Icon icon={X} />}
      />
    ),
    trigger: (
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="md"
        aria-label="Open region"
        icon={<Icon icon={ChevronsUpDown} />}
      />
    ),
    empty: "No regions found",
    magnitude: "md",
    items: REGIONS,
    placeholder: "e.g. eu-central-1",
  },
} satisfies Meta<typeof ComboboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RendersInput: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox", { name: "Region" })).toBeInTheDocument();
  },
};

/**
 * Every magnitude (`md` / `lg` / `xl`) stacked. Magnitude steps the label, description, and
 * helper-text sizes; the input group itself stays fixed.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each field with the magnitude name, so disable just those
  // two controls; the rest stay live and update every field at once.
  argTypes: { magnitude: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <ComboboxField key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  ),
};

/** Setting `error` marks the field invalid, which recolors the input group border to danger. */
export const Invalid: Story = {
  args: { error: "Choose a deployment region." },
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
    const input = canvas.getByRole("combobox", { name: "Region" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    const group = input.closest<HTMLElement>(":has([data-invalid])");
    await expect(group).toHaveClass("has-[[data-invalid]]:border-danger-strong");
  },
};
