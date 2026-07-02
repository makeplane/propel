import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { OTPField, OTPFieldInput, OTPFieldLabel, OTPFieldSeparator } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// OTPField behavior parts graft them via `render`. The root is a styled container, so it grafts
// onto `OTPFieldPreview.Root`; each slot grafts onto `OTPFieldPreview.Input`. The components-tier
// story shows the ready-made `OTPField` that emits `length` inputs for you.
const meta = {
  title: "Elements/OTPField",
  component: OTPField,
  subcomponents: { OTPFieldInput, OTPFieldLabel, OTPFieldSeparator },
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base UI ignores `aria-label` on the first OTP slot and names it from `aria-labelledby` instead,
// so a visually-hidden label backs the first slot while the rest carry an `aria-label`. Without
// this the slot inputs fail axe's "Form elements must have labels".
const FIRST_SLOT_LABEL_ID = "otp-first-slot-label";

/** A six-slot code, each slot an atomic input. */
export const Default: Story = {
  render: () => (
    <BaseOTPField.Root length={6} render={<OTPField />} aria-label="Verification code">
      <OTPFieldLabel id={FIRST_SLOT_LABEL_ID}>Character 1</OTPFieldLabel>
      {Array.from({ length: 6 }, (_, index) =>
        index === 0 ? (
          <BaseOTPField.Input
            key={index}
            render={<OTPFieldInput magnitude="lg" />}
            aria-labelledby={FIRST_SLOT_LABEL_ID}
          />
        ) : (
          <BaseOTPField.Input
            key={index}
            render={<OTPFieldInput magnitude="lg" />}
            aria-label={`Character ${index + 1}`}
          />
        ),
      )}
    </BaseOTPField.Root>
  ),
};

/**
 * Interaction test: the six slots each expose a textbox. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
  },
};

/** A separator splits the slots into groups, e.g. `123-456`. */
export const Grouped: Story = {
  render: () => (
    <BaseOTPField.Root length={6} render={<OTPField />} aria-label="Verification code">
      <OTPFieldLabel id={FIRST_SLOT_LABEL_ID}>Character 1</OTPFieldLabel>
      <BaseOTPField.Input
        render={<OTPFieldInput magnitude="lg" />}
        aria-labelledby={FIRST_SLOT_LABEL_ID}
      />
      <BaseOTPField.Input render={<OTPFieldInput magnitude="lg" />} aria-label="Character 2" />
      <BaseOTPField.Input render={<OTPFieldInput magnitude="lg" />} aria-label="Character 3" />
      <BaseOTPField.Separator render={<OTPFieldSeparator />}>-</BaseOTPField.Separator>
      <BaseOTPField.Input render={<OTPFieldInput magnitude="lg" />} aria-label="Character 4" />
      <BaseOTPField.Input render={<OTPFieldInput magnitude="lg" />} aria-label="Character 5" />
      <BaseOTPField.Input render={<OTPFieldInput magnitude="lg" />} aria-label="Character 6" />
    </BaseOTPField.Root>
  ),
};

/**
 * Interaction test: the grouped slots each expose a textbox. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const GroupedInteraction: Story = {
  ...Grouped,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
  },
};

/** All boxes show the danger border when the code is invalid. */
export const Invalid: Story = {
  render: () => (
    <BaseOTPField.Root length={6} render={<OTPField />} aria-label="Verification code">
      <OTPFieldLabel id={FIRST_SLOT_LABEL_ID}>Character 1</OTPFieldLabel>
      {Array.from({ length: 6 }, (_, index) =>
        index === 0 ? (
          <BaseOTPField.Input
            key={index}
            render={<OTPFieldInput magnitude="lg" data-invalid />}
            aria-labelledby={FIRST_SLOT_LABEL_ID}
          />
        ) : (
          <BaseOTPField.Input
            key={index}
            render={<OTPFieldInput magnitude="lg" data-invalid />}
            aria-label={`Character ${index + 1}`}
          />
        ),
      )}
    </BaseOTPField.Root>
  ),
};

/**
 * Interaction test: the invalid slots each expose a textbox. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const InvalidInteraction: Story = {
  ...Invalid,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
  },
};
