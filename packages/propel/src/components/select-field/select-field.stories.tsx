import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { SelectField } from "./index";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

// A Select laid out as a field (Field + Select + label/helper).
const meta = {
  title: "Components/SelectField",
  component: SelectField,
  args: {
    name: "serverType",
    label: "Server type",
    description: "Choose the machine class.",
    magnitude: "md",
    options: SERVER_TYPES,
    defaultValue: "general",
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RendersTrigger: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox", { name: "Server type" })).toBeInTheDocument();
  },
};
