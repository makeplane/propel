import { Field as BaseField } from "@base-ui/react/field";
import { Form as BaseForm } from "@base-ui/react/form";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { Button } from "../button/index";
import { Field, FieldError, FieldLabel } from "../field/index";
import { Input } from "../input/index";
import { Form, FormActions, FormBody } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// consolidated form behavior grafts onto the styled `Form` `<form>` via `render`. This composes the
// atomic `Form` parts — `FormBody` (the field stack, with its single/multi-column `layout` axis)
// and `FormActions` (the bottom actions bar) — with raw `Field` primitives (label + control +
// error). The ready-made labeled-field conveniences (InputField, SelectField, …) live in the
// components tier — see the `Components/Form` story.
const meta = {
  title: "Elements/Form",
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
    <BaseForm {...args} render={<Form />}>
      <FormBody layout="single">
        <BaseField.Root name="email" render={<Field />}>
          <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
            Email
          </BaseField.Label>
          <BaseField.Control
            type="email"
            required
            placeholder="you@example.com"
            render={<Input magnitude="md" />}
          />
          <BaseField.Error render={<FieldError magnitude="md" />} />
        </BaseField.Root>
      </FormBody>
      <FormActions layout="inline">
        <Button sizing="hug" type="submit" prominence="primary" tone="neutral" magnitude="md">
          Submit
        </Button>
      </FormActions>
    </BaseForm>
  ),
};

/**
 * Interaction test: native constraint validation — submitting an empty required field shows the
 * error. Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const ValidationInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onSubmit: fn((e) => e.preventDefault()) },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(canvas.getByRole("textbox", { name: "Email" })).toBeInvalid();
  },
};
