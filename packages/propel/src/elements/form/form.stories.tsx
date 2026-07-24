import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, ButtonLabel } from "../button/index";
import { Field, FieldLabel } from "../field/index";
import { Input, InputGroup } from "../input/index";
import { Form, FormActions, FormBody } from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. `Form`, `FormBody`, and
// `FormActions` are Base-UI-agnostic styled elements rendered DIRECTLY — no Base UI graft. The
// parts are pure layout (their cvas key off no state attributes), so the showcase covers the two
// layout axes: `FormBody` single- vs multi-column field stacking and `FormActions` inline vs
// stretch actions. Base UI's consolidated form behavior (submission, constraint validation, error
// wiring) is grafted AND tested in the ready-made Form (Components/Form).
const meta = {
  title: "Elements/Form",
  component: Form,
  subcomponents: { FormBody, FormActions },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A form assembled from `Form` › `FormBody layout="single"` (the one-column field stack) +
 * `FormActions layout="inline"` (actions right-aligned at the inline end).
 */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Form>
        <FormBody layout="single">
          <Field>
            <FieldLabel magnitude="md" inset={false} htmlFor="form-default-name">
              Name
            </FieldLabel>
            <InputGroup magnitude="md">
              <Input id="form-default-name" magnitude="md" placeholder="Ada Lovelace" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel magnitude="md" inset={false} htmlFor="form-default-email">
              Email
            </FieldLabel>
            <InputGroup magnitude="md">
              <Input
                id="form-default-email"
                magnitude="md"
                type="email"
                placeholder="you@example.com"
              />
            </InputGroup>
          </Field>
        </FormBody>
        <FormActions layout="inline">
          <Button type="button" fillType="hug" variant="ghost" size="md">
            <ButtonLabel>Cancel</ButtonLabel>
          </Button>
          <Button type="button" fillType="hug" variant="primary" size="md">
            <ButtonLabel>Submit</ButtonLabel>
          </Button>
        </FormActions>
      </Form>
    </div>
  ),
};

/** `FormBody layout="multi"`: a wrapping row that arranges side-by-side field pairs. */
export const MultiColumnBody: Story = {
  render: () => (
    <div className="w-96">
      <Form>
        <FormBody layout="multi">
          <Field>
            <FieldLabel magnitude="md" inset={false} htmlFor="form-multi-first-name">
              First name
            </FieldLabel>
            <InputGroup magnitude="md">
              <Input id="form-multi-first-name" magnitude="md" placeholder="Ada" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel magnitude="md" inset={false} htmlFor="form-multi-last-name">
              Last name
            </FieldLabel>
            <InputGroup magnitude="md">
              <Input id="form-multi-last-name" magnitude="md" placeholder="Lovelace" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel magnitude="md" inset={false} htmlFor="form-multi-city">
              City
            </FieldLabel>
            <InputGroup magnitude="md">
              <Input id="form-multi-city" magnitude="md" placeholder="London" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel magnitude="md" inset={false} htmlFor="form-multi-postal-code">
              Postal code
            </FieldLabel>
            <InputGroup magnitude="md">
              <Input id="form-multi-postal-code" magnitude="md" placeholder="EC1A 1BB" />
            </InputGroup>
          </Field>
        </FormBody>
        <FormActions layout="inline">
          <Button type="button" fillType="hug" variant="primary" size="md">
            <ButtonLabel>Submit</ButtonLabel>
          </Button>
        </FormActions>
      </Form>
    </div>
  ),
};

/** `FormActions layout="stretch"`: the actions stack and stretch to fill the row (full-width). */
export const StretchActions: Story = {
  render: () => (
    <div className="w-80">
      <Form>
        <FormBody layout="single">
          <Field>
            <FieldLabel magnitude="md" inset={false} htmlFor="form-stretch-email">
              Email
            </FieldLabel>
            <InputGroup magnitude="md">
              <Input
                id="form-stretch-email"
                magnitude="md"
                type="email"
                placeholder="you@example.com"
              />
            </InputGroup>
          </Field>
        </FormBody>
        <FormActions layout="stretch">
          <Button type="button" fillType="fill" variant="primary" size="md">
            <ButtonLabel>Create account</ButtonLabel>
          </Button>
          <Button type="button" fillType="fill" variant="secondary" size="md">
            <ButtonLabel>Cancel</ButtonLabel>
          </Button>
        </FormActions>
      </Form>
    </div>
  ),
};
