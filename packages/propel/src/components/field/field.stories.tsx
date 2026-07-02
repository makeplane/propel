import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";

import { Input } from "../input/index";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  type FieldMagnitude,
} from "./index";

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];

// Components-tier story: the GENERIC field shell — `Field` (Base UI labeling/validation) wrapping a
// control. The ready-made per-control fields each live in their own folder (Components/InputField,
// Components/SelectField, …) and are the primitives you reach for; this just exercises the shell.
const meta = {
  title: "Components/Field",
  component: Field,
  subcomponents: { FieldLabel, FieldDescription, FieldError, FieldItem },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Field composes the Base UI labeling, description, and validation parts. */
export const Default: Story = {
  render: () => (
    <Field name="displayName">
      <FieldLabel magnitude="md" required inset={false}>
        Display name
      </FieldLabel>
      <Input magnitude="md" required placeholder="Ada Lovelace" />
      <FieldDescription magnitude="md">Shown anywhere your profile is visible.</FieldDescription>
    </Field>
  ),
};

/**
 * Every field text magnitude side by side: the label, control, and description scale together
 * (md/lg/xl). Pass the same `magnitude` to each part of a field.
 */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-8">
      {MAGNITUDES.map((magnitude) => (
        <Field key={magnitude} name={`displayName-${magnitude}`}>
          <FieldLabel magnitude={magnitude} required inset={false}>
            Display name ({magnitude})
          </FieldLabel>
          <Input magnitude={magnitude} required placeholder="Ada Lovelace" />
          <FieldDescription magnitude={magnitude}>
            Shown anywhere your profile is visible.
          </FieldDescription>
        </Field>
      ))}
    </div>
  ),
};

/** Invalid fields expose `aria-invalid` and announce the matching error as a description. */
export const Invalid: Story = {
  render: () => (
    <Field name="workspaceSlug" invalid>
      <FieldLabel magnitude="md" inset={false}>
        Workspace slug
      </FieldLabel>
      <Input magnitude="md" defaultValue="Already taken" />
      <FieldError magnitude="md" match={true}>
        Choose a different workspace slug.
      </FieldError>
    </Field>
  ),
};

/**
 * Constraint validation: the control's native `required` validity drives `FieldError` through
 * `match="valueMissing"` — with `validationMode="onBlur"` the message appears when the user leaves
 * the field empty and clears once a value is committed. The description stays as the resting hint.
 */
export const RequiredValidation: Story = {
  render: () => (
    <Field name="fullName" validationMode="onBlur">
      <FieldLabel magnitude="md" required inset={false}>
        Full name
      </FieldLabel>
      <Input magnitude="md" required placeholder="Ada Lovelace" />
      <FieldError magnitude="md" match="valueMissing">
        Enter your full name.
      </FieldError>
      <FieldDescription magnitude="md">Visible on your profile.</FieldDescription>
    </Field>
  ),
};

/**
 * Interaction test: blurring the empty required field surfaces the `valueMissing` error and marks
 * the control invalid; committing a value clears both. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const RequiredValidationInteraction: Story = {
  ...RequiredValidation,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Full name" });
    await step("tabbing through untouched does not flag the field", async () => {
      await userEvent.click(input);
      await userEvent.tab();
      await expect(input).not.toHaveAttribute("aria-invalid");
    });
    await step("emptying a dirty required field shows the valueMissing error on blur", async () => {
      await userEvent.type(input, "A");
      await userEvent.clear(input);
      await userEvent.tab();
      const error = await canvas.findByText("Enter your full name.");
      await expect(error).toBeVisible();
      await expect(input).toHaveAttribute("aria-invalid", "true");
    });
    await step("committing a value clears the error", async () => {
      await userEvent.type(input, "Ada Lovelace");
      await userEvent.tab();
      await waitFor(() =>
        expect(canvas.queryByText("Enter your full name.")).not.toBeInTheDocument(),
      );
      await expect(input).not.toHaveAttribute("aria-invalid", "true");
    });
  },
};

export const LabelAndDescription: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="customField">
      <FieldLabel magnitude="md" required inset={false}>
        Custom field
      </FieldLabel>
      <Input magnitude="md" placeholder="Custom value" required />
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
      <FieldLabel magnitude="md" inset={false}>
        Email
      </FieldLabel>
      <Input magnitude="md" defaultValue="not-an-email" />
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
      <FieldLabel magnitude="md" inset={false}>
        Nickname
      </FieldLabel>
      <Input magnitude="md" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Nickname" });
    await userEvent.type(input, "Grace");
    await expect(input).toHaveValue("Grace");
  },
};
