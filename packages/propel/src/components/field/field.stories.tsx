import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import {
  CheckboxFieldControl,
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  InputFieldControl,
  TextAreaFieldControl,
} from "./index";

// Components-tier story: the GENERIC field shell — `Field` (Base UI labeling/validation) composed by
// hand with the field control subclasses (`InputFieldControl`, `TextAreaFieldControl`,
// `CheckboxFieldControl`). The ready-made per-control fields each live in their own folder
// (Components/InputField, Components/TextAreaField, Components/SelectField, …).
const meta = {
  title: "Components/Field",
  component: Field,
  subcomponents: {
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldItem,
    InputFieldControl,
    TextAreaFieldControl,
    CheckboxFieldControl,
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Field composes the Base UI labeling, description, and validation parts. */
export const Default: Story = {
  render: () => (
    <Field name="displayName">
      <FieldLabel magnitude="md" required>
        Display name
      </FieldLabel>
      <InputFieldControl magnitude="md" required placeholder="Ada Lovelace" />
      <FieldDescription magnitude="md">Shown anywhere your profile is visible.</FieldDescription>
    </Field>
  ),
};

/** Invalid fields expose `aria-invalid` and announce the matching error as a description. */
export const Invalid: Story = {
  render: () => (
    <Field name="workspaceSlug" invalid>
      <FieldLabel magnitude="md">Workspace slug</FieldLabel>
      <InputFieldControl magnitude="md" defaultValue="Already taken" />
      <FieldError magnitude="md" match={true}>
        Choose a different workspace slug.
      </FieldError>
    </Field>
  ),
};

/** The field-owned text control subclasses provide Propel's text-entry styling for custom layouts. */
export const ControlSubclasses: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Field name="title">
        <FieldLabel magnitude="md">Title</FieldLabel>
        <InputFieldControl magnitude="md" placeholder="Issue title" />
      </Field>
      <Field name="description">
        <FieldLabel magnitude="md">Description</FieldLabel>
        <TextAreaFieldControl
          magnitude="md"
          surface="embedded"
          resize="none"
          placeholder="Add details"
          rows={3}
        />
      </Field>
    </div>
  ),
};

/**
 * The bare `CheckboxFieldControl` lets a custom field row keep Propel styling. The ready-made
 * `CheckboxField` (Components/CheckboxField) wires this up for you.
 */
export const ChoiceControlSubclass: Story = {
  render: () => (
    <Field name="emailUpdates">
      <FieldLabel magnitude="md">
        <CheckboxFieldControl tone="neutral" value="email" />
        Email updates
      </FieldLabel>
    </Field>
  ),
};

export const LabelAndDescription: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="customField">
      <FieldLabel magnitude="md" required>
        Custom field
      </FieldLabel>
      <InputFieldControl magnitude="md" placeholder="Custom value" required />
      <FieldDescription magnitude="md">Use this for custom form controls.</FieldDescription>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Custom field" });
    await expect(input).toBeRequired();
    await expect(input).toHaveAttribute("name", "customField");
    await expect(input).toHaveAccessibleDescription("Use this for custom form controls.");
  },
};

export const ErrorAssociation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="email" invalid>
      <FieldLabel magnitude="md">Email</FieldLabel>
      <InputFieldControl magnitude="md" defaultValue="not-an-email" />
      <FieldError magnitude="md" match={true}>
        Enter a valid email address.
      </FieldError>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Enter a valid email address.");
  },
};

export const TypingUpdatesValue: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="nickname">
      <FieldLabel magnitude="md">Nickname</FieldLabel>
      <InputFieldControl magnitude="md" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Nickname" });
    await userEvent.type(input, "Grace");
    await expect(input).toHaveValue("Grace");
  },
};
