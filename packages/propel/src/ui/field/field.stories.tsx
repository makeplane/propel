import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Input } from "../input/index";
import { Field, FieldDescription, FieldError, FieldLabel, FieldLabelRequiredMarker } from "./index";

// UI-tier story: composes the ATOMIC field parts. `Field` (Base UI `Field.Root`) is the
// labeling/validation shell; `FieldLabel` names the control, `InputFieldControl` is the
// field-styled text input, `FieldDescription` is helper text, and `FieldError` announces the
// validation message (shown when `match` is true / the field is `invalid`). The ready-made
// fields (InputField, choice/group/popup fields) live in `components/field`.
const meta = {
  title: "UI/Field",
  component: Field,
  subcomponents: {
    FieldLabel,
    FieldLabelRequiredMarker,
    Input,
    FieldDescription,
    FieldError,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A labeled input with helper text, assembled from the atomic parts. `FieldLabel required` appends
 * the `FieldLabelRequiredMarker` slot, passing the asterisk glyph in as its child.
 */
export const Default: Story = {
  render: () => (
    <Field name="displayName">
      <FieldLabel magnitude="md" required>
        Display name
      </FieldLabel>
      <Input magnitude="md" required placeholder="Ada Lovelace" />
      <FieldDescription magnitude="md">Shown anywhere your profile is visible.</FieldDescription>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Display name" });
    await expect(input).toBeRequired();
    await expect(input).toHaveAccessibleDescription("Shown anywhere your profile is visible.");
  },
};

/**
 * The required marker is a bare slot that bakes no glyph: the consumer passes the marker (here, the
 * conventional asterisk) as `children`.
 */
export const RequiredMarker: Story = {
  render: () => (
    <Field name="displayName">
      <FieldLabel magnitude="md">
        Display name
        <FieldLabelRequiredMarker>*</FieldLabelRequiredMarker>
      </FieldLabel>
      <Input magnitude="md" required placeholder="Ada Lovelace" />
    </Field>
  ),
};

/** An invalid field: the control exposes `aria-invalid` and announces the `FieldError` text. */
export const Invalid: Story = {
  render: () => (
    <Field name="workspaceSlug" invalid>
      <FieldLabel magnitude="md">Workspace slug</FieldLabel>
      <Input magnitude="md" defaultValue="Already taken" />
      <FieldError magnitude="md" match={true}>
        Choose a different workspace slug.
      </FieldError>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Workspace slug" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Choose a different workspace slug.");
  },
};
