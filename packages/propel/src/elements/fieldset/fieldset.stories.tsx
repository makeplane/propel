import { Field as BaseField } from "@base-ui/react/field";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Field, FieldLabel } from "../field/index";
import { Input } from "../input/index";
import { Fieldset, FieldsetBody, FieldsetDescription, FieldsetLegend } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// Fieldset behavior parts graft them via `render`. The Root and Legend behavior come straight from
// `@base-ui/react/fieldset`, wired with raw `Field` primitives for the contained controls.
const meta = {
  title: "Elements/Fieldset",
  component: FieldsetBody,
  subcomponents: { Fieldset, FieldsetLegend, FieldsetDescription },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FieldsetBody>;

export default meta;
type Story = StoryObj<typeof meta>;

function TextField({ name, label }: { name: string; label: string }) {
  return (
    <BaseField.Root name={name} render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
        {label}
      </BaseField.Label>
      <BaseField.Control placeholder={label} render={<Input magnitude="md" />} />
    </BaseField.Root>
  );
}

/** Fieldset groups related fields under one accessible legend. */
export const Default: Story = {
  render: () => (
    <BaseFieldset.Root render={<Fieldset bordered={false} />}>
      <BaseFieldset.Legend render={<FieldsetLegend magnitude="md" />}>
        Billing details
      </BaseFieldset.Legend>
      <FieldsetBody>
        <TextField name="company" label="Company" />
        <TextField name="taxId" label="Tax ID" />
      </FieldsetBody>
    </BaseFieldset.Root>
  ),
};

/** A bordered fieldset draws a visible boundary around the grouped controls. */
export const Bordered: Story = {
  render: () => (
    <BaseFieldset.Root render={<Fieldset bordered={true} />}>
      <BaseFieldset.Legend render={<FieldsetLegend magnitude="md" />}>
        Billing details
      </BaseFieldset.Legend>
      <FieldsetDescription>Enter your billing information below.</FieldsetDescription>
      <FieldsetBody>
        <TextField name="company" label="Company" />
        <TextField name="taxId" label="Tax ID" />
      </FieldsetBody>
    </BaseFieldset.Root>
  ),
};

export const GroupSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseFieldset.Root render={<Fieldset bordered={false} />}>
      <BaseFieldset.Legend render={<FieldsetLegend magnitude="md" />}>
        Shipping address
      </BaseFieldset.Legend>
      <FieldsetBody>
        <TextField name="city" label="City" />
      </FieldsetBody>
    </BaseFieldset.Root>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Shipping address" })).toBeInTheDocument();
    await expect(canvas.getByRole("textbox", { name: "City" })).toHaveAttribute("name", "city");
  },
};
