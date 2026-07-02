import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, waitFor } from "storybook/test";

import { Form } from "../form";
import { OTPField, type OTPFieldInputMagnitude } from "./index";

const MAGNITUDES: OTPFieldInputMagnitude[] = ["md", "lg", "xl"];

// Components-tier story: the ready-made `OTPField` — pass `length`, `magnitude`, and
// `tone`; it renders that many slots, owning focus movement, paste, and completion.
// The elements-tier story shows how to compose the parts (e.g. a grouped `123-456` layout
// with a separator).
const meta = {
  title: "Components/OTPField",
  component: OTPField,
  args: { length: 6, magnitude: "md", "aria-label": "Verification code" },
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A six-digit verification code. */
export const Default: Story = {};

/** All box sizes (md/lg/xl) side by side, filled with a realistic code. */
export const Magnitudes: Story = {
  // Iterates `magnitude`, so disable just that control; the rest stay live and
  // update every field at once.
  argTypes: { magnitude: { control: false } },
  args: { defaultValue: "123456" },
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {MAGNITUDES.map((magnitude) => (
        <OTPField key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </div>
  ),
};

const Interaction: Story = {
  ...Default,
};

/**
 * Interaction test: the field renders six slots. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Interaction,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
  },
};

/** Typing fills slots left to right and advances focus. */
export const TypingFillsSlots: Story = {
  ...Interaction,
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { length: 4 },
  play: async ({ canvas, userEvent }) => {
    const inputs = canvas.getAllByRole("textbox");
    await expect(inputs).toHaveLength(4);
    await userEvent.click(inputs[0]);
    await userEvent.keyboard("12");
    await expect(inputs[0]).toHaveDisplayValue("1");
    await expect(inputs[1]).toHaveDisplayValue("2");
  },
};

/** `validationType="alphanumeric"` accepts recovery codes that mix letters and numbers. */
export const Alphanumeric: Story = {
  args: { validationType: "alphanumeric", defaultValue: "A7C9XZ", "aria-label": "Recovery code" },
};

/**
 * Interaction test: an alphanumeric field accepts letters that the default numeric validation would
 * reject. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const AlphanumericInteraction: Story = {
  ...Alphanumeric,
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { ...Alphanumeric.args, defaultValue: "" },
  play: async ({ canvas, userEvent }) => {
    const inputs = canvas.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    await userEvent.keyboard("X7");
    await expect(inputs[0]).toHaveDisplayValue("X");
    await expect(inputs[1]).toHaveDisplayValue("7");
  },
};

/**
 * `normalizeValue` rewrites accepted characters (here uppercasing a recovery code), while
 * characters the validation rejects surface through `onValueInvalid` — fed back to the user via the
 * `error` line until the next valid keystroke clears it.
 */
export const Normalized: Story = {
  args: { validationType: "alphanumeric", "aria-label": "Recovery code" },
  render: function Render(args) {
    const [error, setError] = React.useState<React.ReactNode>(null);
    return (
      <OTPField
        {...args}
        normalizeValue={(value) => value.toUpperCase()}
        onValueChange={() => setError(null)}
        onValueInvalid={() => setError("Only letters and numbers are allowed")}
        error={error}
      />
    );
  },
};

/**
 * Interaction test: typed characters are normalized to uppercase, and a rejected character raises
 * the invalid feedback while leaving the value unchanged. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const NormalizedInteraction: Story = {
  ...Normalized,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const inputs = canvas.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    await userEvent.keyboard("a7");
    await expect(inputs[0]).toHaveDisplayValue("A");
    await expect(inputs[1]).toHaveDisplayValue("7");
    await userEvent.keyboard("!");
    await expect(canvas.getByText("Only letters and numbers are allowed")).toBeInTheDocument();
    await expect(inputs[2]).toHaveDisplayValue("");
  },
};

/**
 * Inside a `Form`, `autoSubmit` submits the owning form the moment the last slot is filled — no
 * separate confirm button needed. (`onValueComplete` is the alternative for reacting to completion
 * without a form.)
 */
export const FormIntegration: Story = {
  args: { autoSubmit: true, name: "code" },
  render: function Render(args) {
    const [submitted, setSubmitted] = React.useState(false);
    return (
      <div className="flex flex-col items-start gap-3">
        <Form onFormSubmit={() => setSubmitted(true)}>
          <OTPField {...args} />
        </Form>
        <output className="text-13 text-secondary">
          {submitted ? "Code submitted — signing you in…" : null}
        </output>
      </div>
    );
  },
};

/**
 * Interaction test: filling the last slot auto-submits the owning `Form`, which reports through
 * `onFormSubmit`. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const FormIntegrationInteraction: Story = {
  ...FormIntegration,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const inputs = canvas.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    await userEvent.keyboard("123456");
    await waitFor(async () => {
      await expect(canvas.getByText("Code submitted — signing you in…")).toBeInTheDocument();
    });
  },
};

/** `mask` obscures the entered characters. */
export const Masked: Story = {
  parameters: { controls: { disable: true } },
  args: { length: 6, mask: true, defaultValue: "123456" },
};

/** An invalid field shows danger borders on all boxes. */
export const Invalid: Story = {
  args: { error: "Code is invalid", defaultValue: "12" },
};

/**
 * Interaction test: `error` renders the message and flips every slot to the invalid state —
 * `Field.Root invalid` propagates `data-invalid` to each of the six textboxes. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const InvalidInteraction: Story = {
  ...Invalid,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole("textbox");
    await expect(inputs).toHaveLength(6);
    for (const input of inputs) {
      await expect(input).toHaveAttribute("data-invalid");
    }
    await expect(canvas.getByText("Code is invalid")).toBeInTheDocument();
  },
};

/** `groups={[3, 3]}` splits the run with a separator — the 123-456 verification-code shape. */
export const Grouped: Story = {
  args: { length: 6, magnitude: "md", groups: [3, 3] },
};

/**
 * Interaction test: grouped slots still expose all six textboxes with the separator between the
 * halves. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const GroupedInteraction: Story = {
  ...Grouped,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")).toHaveLength(6);
    await expect(canvas.getByText("-")).toBeInTheDocument();
  },
};
