import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { CheckboxGroup } from "../checkbox-group/index";
import { CheckboxGroupFieldOption, Field, InputField, RadioGroupFieldOption } from "../field/index";
import { RadioGroup } from "../radio/index";
import { Fieldset, FieldsetLegend } from "./index";

const meta = {
  title: "Components/Fieldset",
  component: Fieldset,
  subcomponents: { FieldsetLegend },
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fieldset groups related fields under one accessible legend. */
export const Default: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend magnitude="md">Billing details</FieldsetLegend>
      <div className="flex w-80 flex-col gap-4">
        <InputField
          magnitude="md"
          tone="neutral"
          orientation="vertical"
          name="company"
          label="Company"
          placeholder="Acme Inc."
        />
        <InputField
          magnitude="md"
          tone="neutral"
          orientation="vertical"
          name="taxId"
          label="Tax ID"
          placeholder="US-123"
        />
      </div>
    </Fieldset>
  ),
};

export const GroupSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Fieldset>
      <FieldsetLegend magnitude="md">Shipping address</FieldsetLegend>
      <div className="w-80">
        <InputField magnitude="md" tone="neutral" orientation="vertical" name="city" label="City" />
      </div>
    </Fieldset>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Shipping address" })).toBeInTheDocument();
    await expect(canvas.getByRole("textbox", { name: "City" })).toHaveAttribute("name", "city");
  },
};

/** Fieldset can render a Base UI group root while keeping one shared legend. */
export const WithControlGroups: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <Field name="storageType">
        <Fieldset render={<RadioGroup density="comfortable" defaultValue="ssd" />}>
          <FieldsetLegend magnitude="md">Storage type</FieldsetLegend>
          <RadioGroupFieldOption magnitude="md" value="ssd" label="SSD" />
          <RadioGroupFieldOption magnitude="md" value="hdd" label="HDD" />
        </Fieldset>
      </Field>
      <Field name="allowedProtocols">
        <Fieldset render={<CheckboxGroup density="comfortable" defaultValue={["https"]} />}>
          <FieldsetLegend magnitude="md">Allowed protocols</FieldsetLegend>
          <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="http" label="HTTP" />
          <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="https" label="HTTPS" />
          <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="ssh" label="SSH" />
        </Fieldset>
      </Field>
    </div>
  ),
};
