import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { type FieldMagnitude, SelectField } from "./index";

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];

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

/**
 * Every magnitude (`md` / `lg` / `xl`) stacked. Magnitude steps the label and helper-text size; the
 * trigger scale follows it, with `xl` mapping onto the largest trigger (`lg`).
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each field with the magnitude name, so disable
  // just those two controls; the rest stay live and update every field at once.
  argTypes: { magnitude: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <SelectField key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  ),
};

export const RendersTrigger: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox", { name: "Server type" })).toBeInTheDocument();
  },
};
