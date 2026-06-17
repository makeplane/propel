import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { CheckboxGroupField, CheckboxGroupFieldOption, Field } from "../field/index";
import { Fieldset, FieldsetLegend } from "../fieldset/index";
import { CheckboxGroup } from "./index";

const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  subcomponents: { CheckboxGroupField, CheckboxGroupFieldOption },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A checkbox group composed through Fieldset so the group has one accessible legend. */
export const Default: Story = {
  args: {
    density: "comfortable",
    defaultValue: ["https"],
  },
  render: (args) => (
    <Field name="allowedProtocols">
      <Fieldset render={<CheckboxGroup {...args} />}>
        <FieldsetLegend magnitude="md">Allowed network protocols</FieldsetLegend>
        <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="http" label="HTTP" />
        <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="https" label="HTTPS" />
        <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="ssh" label="SSH" />
      </Fieldset>
    </Field>
  ),
};

/** The ready-to-use field composition owns the legend, options, and helper text. */
export const FieldComposition: Story = {
  args: {
    density: "comfortable",
    defaultValue: ["https"],
  },
  render: (args) => (
    <CheckboxGroupField
      {...args}
      name="allowedProtocols"
      label="Allowed network protocols"
      magnitude="md"
      hint="Select every protocol this service can use."
    >
      <CheckboxGroupFieldOption tone="neutral" value="http" label="HTTP" />
      <CheckboxGroupFieldOption tone="neutral" value="https" label="HTTPS" />
      <CheckboxGroupFieldOption tone="neutral" value="ssh" label="SSH" />
    </CheckboxGroupField>
  ),
};

/** Options can include descriptions; each option remains individually labelled. */
export const WithDescriptions: Story = {
  args: {
    density: "comfortable",
    defaultValue: ["daily"],
  },
  render: (args) => (
    <Field name="backupSchedule">
      <Fieldset render={<CheckboxGroup {...args} />}>
        <FieldsetLegend magnitude="md">Backup schedule</FieldsetLegend>
        <CheckboxGroupFieldOption
          magnitude="md"
          tone="neutral"
          value="daily"
          label="Daily"
          description="Runs at 00:00."
        />
        <CheckboxGroupFieldOption
          magnitude="md"
          tone="neutral"
          value="weekly"
          label="Weekly"
          description="Runs every Monday."
        />
      </Fieldset>
    </Field>
  ),
};

export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    density: "comfortable",
    defaultValue: [],
  },
  render: (args) => (
    <Field name="allowedProtocols">
      <Fieldset render={<CheckboxGroup {...args} />}>
        <FieldsetLegend magnitude="md">Allowed network protocols</FieldsetLegend>
        <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="http" label="HTTP" />
        <CheckboxGroupFieldOption magnitude="md" tone="neutral" value="https" label="HTTPS" />
      </Fieldset>
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    const http = canvas.getByRole("checkbox", { name: "HTTP" });
    const https = canvas.getByRole("checkbox", { name: "HTTPS" });

    await expect(http).toHaveAttribute("aria-checked", "false");
    await expect(https).toHaveAttribute("aria-checked", "false");

    await userEvent.click(http);
    await expect(http).toHaveAttribute("aria-checked", "true");
    await expect(https).toHaveAttribute("aria-checked", "false");

    await userEvent.click(https);
    await expect(http).toHaveAttribute("aria-checked", "true");
    await expect(https).toHaveAttribute("aria-checked", "true");
  },
};
