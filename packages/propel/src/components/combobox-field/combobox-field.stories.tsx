import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect } from "storybook/test";

import { IconButton } from "../icon-button";
import { ComboboxField } from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

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
      <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear region">
        <X />
      </IconButton>
    ),
    trigger: (
      <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
        <ChevronsUpDown />
      </IconButton>
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
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox", { name: "Region" })).toBeInTheDocument();
  },
};

/** Setting `error` marks the field invalid, which recolors the input group border to danger. */
export const Invalid: Story = {
  args: { error: "Choose a deployment region." },
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Region" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    const group = input.closest<HTMLElement>(":has([data-invalid])");
    await expect(group).toHaveClass("has-[[data-invalid]]:border-danger-strong");
  },
};
