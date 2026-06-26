import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { Button } from "../button/index";
import { Field, FieldError, FieldLabel } from "../field/index";
import { Input } from "../input/index";
import { Form, FormActions, FormBody } from "./index";

// UI-tier story: composes the atomic `Form` parts — `FormBody` (the field stack, with
// its single/multi-column `layout` axis) and `FormActions` (the bottom actions bar) —
// with raw `Field` primitives (label + control + error). The ready-made labeled-field
// conveniences (InputField, SelectField, …) live in the components tier — see the
// `Components/Form` story.
const meta = {
  title: "UI/Form",
  component: Form,
  subcomponents: { FormBody, FormActions },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A form assembled from `Form` › `FormBody` (`Field`…) + `FormActions`. */
export const Default: Story = {
  render: (args) => (
    <Form {...args}>
      <FormBody layout="single">
        <Field name="email">
          <FieldLabel magnitude="md" inset={false}>
            Email
          </FieldLabel>
          <Input magnitude="md" type="email" required placeholder="you@example.com" />
          <FieldError magnitude="md" />
        </Field>
      </FormBody>
      <FormActions layout="inline">
        <Button sizing="hug" type="submit" prominence="primary" tone="neutral" magnitude="md">
          Submit
        </Button>
      </FormActions>
    </Form>
  ),
};

/** Native constraint validation: submitting an empty required field shows the error. */
export const Validation: Story = {
  args: { onSubmit: fn((e) => e.preventDefault()) },
  render: (args) => (
    <Form {...args}>
      <FormBody layout="single">
        <Field name="email">
          <FieldLabel magnitude="md" inset={false}>
            Email
          </FieldLabel>
          <Input magnitude="md" type="email" required placeholder="you@example.com" />
          <FieldError magnitude="md" />
        </Field>
      </FormBody>
      <FormActions layout="inline">
        <Button sizing="hug" type="submit" prominence="primary" tone="neutral" magnitude="md">
          Submit
        </Button>
      </FormActions>
    </Form>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(canvas.getByRole("textbox", { name: "Email" })).toBeInvalid();
  },
};
