import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { RadioFieldControl, RadioGroupField, RadioGroupFieldOption } from "./index";

// A fieldset of radio options (Field + Fieldset + RadioGroup + option rows).
const meta = {
  title: "Components/RadioGroupField",
  component: RadioGroupField,
  subcomponents: { RadioGroupFieldOption, RadioFieldControl },
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

export const RendersRadios: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radio", { name: "Low" })).toBeInTheDocument();
    await expect(canvas.getByRole("radio", { name: "High" })).toBeInTheDocument();
  },
};
