import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { Button } from "../button/index";
import { Field, FieldError, FieldLabel, InputFieldControl } from "../field/index";
import { Form } from "./index";

// UI-tier story: composes the atomic `Form` with raw `Field` primitives (label +
// control + error). The ready-made labeled-field conveniences (InputField,
// SelectField, …) live in the components tier — see the `Components/Form` story.
const meta = {
  title: "UI/Form",
  component: Form,
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

/** A form assembled from `Form` + `Field`/`FieldLabel`/`InputFieldControl`/`FieldError`. */
export const Default: Story = {
  args: { layout: "single" },
  render: (args) => (
    <Form {...args}>
      <Field name="email">
        <FieldLabel magnitude="md">Email</FieldLabel>
        <InputFieldControl magnitude="md" type="email" required placeholder="you@example.com" />
        <FieldError magnitude="md" />
      </Field>
      <Button type="submit" variant="primary" tone="neutral" magnitude="md">
        Submit
      </Button>
    </Form>
  ),
};

/** Native constraint validation: submitting an empty required field shows the error. */
export const Validation: Story = {
  args: { layout: "single", onSubmit: fn((e) => e.preventDefault()) },
  render: (args) => (
    <Form {...args}>
      <Field name="email">
        <FieldLabel magnitude="md">Email</FieldLabel>
        <InputFieldControl magnitude="md" type="email" required placeholder="you@example.com" />
        <FieldError magnitude="md" />
      </Field>
      <Button type="submit" variant="primary" tone="neutral" magnitude="md">
        Submit
      </Button>
    </Form>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(canvas.getByRole("textbox", { name: "Email" })).toBeInvalid();
  },
};
