import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { ComboboxField } from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

// A Combobox laid out as a field (Field + Combobox + label/helper).
const meta = {
  title: "Components/ComboboxField",
  component: ComboboxField,
  args: {
    name: "region",
    label: "Region",
    description: "Filter the deployment region.",
    controlLabel: "region",
    emptyLabel: "No regions found",
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
