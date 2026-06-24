import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { OTPField, OTPFieldInput, OTPFieldLabel, OTPFieldSeparator } from "./index";

// UI-tier story: composes the atomic parts (root + per-slot input, optionally with a
// separator). Each `OTPFieldInput` resolves its slot index from the root context, so
// you render one per slot. The components-tier story shows the ready-made `OTPField`
// that emits `length` inputs for you.
const meta = {
  title: "UI/OTPField",
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
  args: { length: 6 },
  render: (args) => (
    <OTPField {...args} aria-label="Verification code">
      <OTPFieldLabel id={FIRST_SLOT_LABEL_ID}>Character 1</OTPFieldLabel>
      {Array.from({ length: args.length }, (_, index) =>
        index === 0 ? (
          <OTPFieldInput
            key={index}
            magnitude="md"
            tone="neutral"
            aria-labelledby={FIRST_SLOT_LABEL_ID}
          />
        ) : (
          <OTPFieldInput
            key={index}
            magnitude="md"
            tone="neutral"
            aria-label={`Character ${index + 1}`}
          />
        ),
      )}
    </OTPField>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
  },
};

/** A separator splits the slots into groups, e.g. `123-456`. */
export const Grouped: Story = {
  args: { length: 6 },
  render: (args) => (
    <OTPField {...args} aria-label="Verification code">
      <OTPFieldLabel id={FIRST_SLOT_LABEL_ID}>Character 1</OTPFieldLabel>
      <OTPFieldInput magnitude="md" tone="neutral" aria-labelledby={FIRST_SLOT_LABEL_ID} />
      <OTPFieldInput magnitude="md" tone="neutral" aria-label="Character 2" />
      <OTPFieldInput magnitude="md" tone="neutral" aria-label="Character 3" />
      <OTPFieldSeparator>-</OTPFieldSeparator>
      <OTPFieldInput magnitude="md" tone="neutral" aria-label="Character 4" />
      <OTPFieldInput magnitude="md" tone="neutral" aria-label="Character 5" />
      <OTPFieldInput magnitude="md" tone="neutral" aria-label="Character 6" />
    </OTPField>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
  },
};

/** All boxes show the danger border when the code is invalid. */
export const Error: Story = {
  args: { length: 6 },
  render: (args) => (
    <OTPField {...args} aria-label="Verification code">
      <OTPFieldLabel id={FIRST_SLOT_LABEL_ID}>Character 1</OTPFieldLabel>
      {Array.from({ length: args.length }, (_, index) =>
        index === 0 ? (
          <OTPFieldInput
            key={index}
            magnitude="md"
            tone="danger"
            aria-labelledby={FIRST_SLOT_LABEL_ID}
          />
        ) : (
          <OTPFieldInput
            key={index}
            magnitude="md"
            tone="danger"
            aria-label={`Character ${index + 1}`}
          />
        ),
      )}
    </OTPField>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
  },
};
