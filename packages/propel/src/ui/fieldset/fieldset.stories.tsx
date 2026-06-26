import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Field, FieldLabel } from "../field/index";
import { Input } from "../input/index";
import { Fieldset, FieldsetBody, FieldsetDescription, FieldsetLegend } from "./index";

// UI-tier story: composes the atomic `Fieldset` + `FieldsetLegend` + `FieldsetBody` with raw
// `Field` primitives. The ready-made field conveniences (InputField, RadioGroupFieldOption…)
// live in the components tier — see the `Components/Fieldset` story.
const meta = {
  title: "UI/Fieldset",
  component: Fieldset,
  subcomponents: { FieldsetLegend, FieldsetDescription, FieldsetBody },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

function TextField({ name, label }: { name: string; label: string }) {
  return (
    <Field name={name}>
      <FieldLabel magnitude="md" inset={false}>
        {label}
      </FieldLabel>
      <Input magnitude="md" placeholder={label} />
    </Field>
  );
}

/** Fieldset groups related fields under one accessible legend. */
export const Default: Story = {
  args: { bordered: false },
  render: () => (
    <Fieldset bordered={false}>
      <FieldsetLegend magnitude="md">Billing details</FieldsetLegend>
      <FieldsetBody>
        <TextField name="company" label="Company" />
        <TextField name="taxId" label="Tax ID" />
      </FieldsetBody>
    </Fieldset>
  ),
};

/** A bordered fieldset draws a visible boundary around the grouped controls. */
export const Bordered: Story = {
  args: { bordered: true },
  render: () => (
    <Fieldset bordered={true}>
      <FieldsetLegend magnitude="md">Billing details</FieldsetLegend>
      <FieldsetDescription>Enter your billing information below.</FieldsetDescription>
      <FieldsetBody>
        <TextField name="company" label="Company" />
        <TextField name="taxId" label="Tax ID" />
      </FieldsetBody>
    </Fieldset>
  ),
};

export const GroupSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { bordered: false },
  render: () => (
    <Fieldset bordered={false}>
      <FieldsetLegend magnitude="md">Shipping address</FieldsetLegend>
      <FieldsetBody>
        <TextField name="city" label="City" />
      </FieldsetBody>
    </Fieldset>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Shipping address" })).toBeInTheDocument();
    await expect(canvas.getByRole("textbox", { name: "City" })).toHaveAttribute("name", "city");
  },
};
