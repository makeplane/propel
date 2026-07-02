import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import type { FieldMagnitude } from "../../elements/field/variants";
import type { RadioGroupDensity } from "../radio/index";
import { RadioGroupField, RadioGroupFieldOption } from "./index";

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];
const DENSITIES: RadioGroupDensity[] = ["comfortable", "compact"];

// A fieldset of radio options (Field + Fieldset + RadioGroup + option rows).
const meta = {
  title: "Components/RadioGroupField",
  component: RadioGroupField,
  subcomponents: { RadioGroupFieldOption },
  args: {
    name: "priority",
    label: "Priority",
    description: "Pick one default priority.",
    density: "comfortable",
    magnitude: "md",
    defaultValue: "medium",
    children: (
      <>
        <RadioGroupFieldOption value="low" label="Low" />
        <RadioGroupFieldOption value="medium" label="Medium" description="Recommended." />
        <RadioGroupFieldOption value="high" label="High" />
      </>
    ),
  },
} satisfies Meta<typeof RadioGroupField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Legend, description, and option text at every magnitude (`md` / `lg` / `xl`). */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each group with the magnitude name, so disable those
  // controls (plus `name`, overridden per group); the rest stay live and update every group.
  argTypes: {
    magnitude: { control: false },
    label: { control: false },
    name: { control: false },
  },
  render: (args) => (
    <div className="flex items-start gap-10">
      {MAGNITUDES.map((magnitude) => (
        <RadioGroupField
          key={magnitude}
          {...args}
          magnitude={magnitude}
          label={magnitude}
          name={`priority-${magnitude}`}
        />
      ))}
    </div>
  ),
};

/** Row spacing between options: `comfortable` keeps a gap, `compact` stacks them flush. */
export const Densities: Story = {
  // Iterates `density` and labels each group with the density name, so disable those
  // controls (plus `name`, overridden per group); the rest stay live and update every group.
  argTypes: {
    density: { control: false },
    label: { control: false },
    name: { control: false },
  },
  render: (args) => (
    <div className="flex items-start gap-10">
      {DENSITIES.map((density) => (
        <RadioGroupField
          key={density}
          {...args}
          density={density}
          label={density}
          name={`priority-${density}`}
        />
      ))}
    </div>
  ),
};

export const RendersRadios: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radio", { name: "Low" })).toBeInTheDocument();
    await expect(canvas.getByRole("radio", { name: "High" })).toBeInTheDocument();
  },
};
