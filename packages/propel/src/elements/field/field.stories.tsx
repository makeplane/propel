import { Field as BaseField } from "@base-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Input } from "../input/index";
import { Field, FieldDescription, FieldError, FieldLabel, FieldLabelRequiredMarker } from "./index";

// elements-tier story: composes the ATOMIC styled field parts, grafting the Base UI `Field` behavior onto
// each via `render` (rule 2b — a elements story wires Base UI directly). `BaseField.Root` is the
// labeling/validation shell; `BaseField.Label` names the control, `BaseField.Control` is the styled
// text input, `BaseField.Description` is helper text, and `BaseField.Error` announces the validation
// message (shown when `match` is true / the field is `invalid`). The ready-made fields (InputField,
// choice/group/popup fields) live in `components/field`.
const meta = {
  title: "Elements/Field",
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
 * A labeled input with helper text, assembled from the atomic parts. The `FieldLabel` slot names
 * the control; the `RequiredMarker` story shows how to append the `FieldLabelRequiredMarker` slot.
 */
export const Default: Story = {
  render: () => (
    <BaseField.Root name="displayName" render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
        Display name
      </BaseField.Label>
      <BaseField.Control required placeholder="Ada Lovelace" render={<Input magnitude="md" />} />
      <BaseField.Description render={<FieldDescription magnitude="md" />}>
        Shown anywhere your profile is visible.
      </BaseField.Description>
    </BaseField.Root>
  ),
};

/**
 * Interaction test: the control is required and exposes its helper text as the accessible
 * description. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
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
    <BaseField.Root name="displayName" render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
        Display name
        <FieldLabelRequiredMarker>*</FieldLabelRequiredMarker>
      </BaseField.Label>
      <BaseField.Control required placeholder="Ada Lovelace" render={<Input magnitude="md" />} />
    </BaseField.Root>
  ),
};

/** An invalid field: the control exposes `aria-invalid` and announces the `FieldError` text. */
export const Invalid: Story = {
  render: () => (
    <BaseField.Root name="workspaceSlug" invalid render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
        Workspace slug
      </BaseField.Label>
      <BaseField.Control defaultValue="Already taken" render={<Input magnitude="md" />} />
      <BaseField.Error match render={<FieldError magnitude="md" />}>
        Choose a different workspace slug.
      </BaseField.Error>
    </BaseField.Root>
  ),
};

/**
 * Interaction test: the control exposes `aria-invalid` and announces the `FieldError` text as its
 * accessible description. Tagged out of the sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const InvalidInteraction: Story = {
  ...Invalid,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Workspace slug" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Choose a different workspace slug.");
  },
};
