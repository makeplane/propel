import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { OTPField, type OTPFieldInputMagnitude } from "./index";

const MAGNITUDES: OTPFieldInputMagnitude[] = ["sm", "md", "lg"];

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

/** All box sizes (sm/md/lg) side by side, filled with a realistic code. */
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

/** `mask` obscures the entered characters. */
export const Masked: Story = {
  parameters: { controls: { disable: true } },
  args: { length: 6, mask: true, defaultValue: "123456" },
};

/** An invalid field shows danger borders on all boxes. */
export const Invalid: Story = {
  args: { error: "Code is invalid", defaultValue: "12" },
};
