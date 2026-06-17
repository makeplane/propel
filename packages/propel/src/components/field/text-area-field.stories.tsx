import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

import { type InputMagnitude, TextAreaField } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

const meta = {
  title: "Components/TextAreaField",
  component: TextAreaField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1582-168",
    },
  },
} satisfies Meta<typeof TextAreaField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Ready-to-go multi-line field built from Field, label/helper parts, and TextAreaFieldControl. */
export const Default: Story = {
  args: {
    magnitude: "md",
    tone: "neutral",
    label: "Comment",
    placeholder: "Leave a comment...",
    description: "Share your thoughts on the proposal.",
    hint: "Markdown is supported.",
  },
  render: (args) => (
    <div className="w-80">
      <TextAreaField {...args} />
    </div>
  ),
};

/**
 * `TextAreaField` across every magnitude (`md` / `lg` / `xl`). Magnitude steps the value font-size
 * and the field min-height; padding and radius stay fixed.
 */
export const Magnitudes: Story = {
  args: { magnitude: "md", tone: "neutral", label: "Comment", placeholder: "Leave a comment..." },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <TextAreaField
          key={magnitude}
          magnitude={magnitude}
          tone="neutral"
          label={magnitude}
          placeholder="Leave a comment..."
        />
      ))}
    </div>
  ),
};

/**
 * Overflowing `TextAreaField` content scrolls with a native scrollbar only once the text exceeds
 * the field box, rather than reserving a permanent gutter.
 */
export const Scroll: Story = {
  args: { magnitude: "md", tone: "neutral", label: "Comment" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-80">
      <TextAreaField
        magnitude="md"
        tone="neutral"
        label="Comment"
        defaultValue={Array.from({ length: 12 }, (_, i) => `Line ${i + 1} of a long comment.`).join(
          "\n",
        )}
      />
    </div>
  ),
};

/** The error treatment: danger border, danger helper text, and `aria-invalid`. */
export const Error: Story = {
  args: {
    magnitude: "md",
    tone: "danger",
    label: "Comment",
    defaultValue: "No",
    error: "Add a little more detail.",
    required: true,
  },
  render: (args) => (
    <div className="w-80">
      <TextAreaField {...args} />
    </div>
  ),
};

/** Typing into the textarea updates its value and fires the native change handler. */
export const TypingUpdatesValue: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    tone: "neutral",
    label: "Comment",
    placeholder: "Leave a comment...",
    onChange: fn(),
  },
  render: (args) => (
    <div className="w-80">
      <TextAreaField {...args} />
    </div>
  ),
  play: async ({ args, canvas, userEvent }) => {
    const textarea = canvas.getByRole<HTMLTextAreaElement>("textbox", { name: "Comment" });
    await userEvent.type(textarea, "Looks good");
    await expect(textarea).toHaveValue("Looks good");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/** `tone="danger"` sets `aria-invalid` and renders the announced error text. */
export const ErrorAnnouncesInvalid: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    tone: "danger",
    label: "Comment",
    defaultValue: "No",
    error: "Add a little more detail.",
  },
  render: (args) => (
    <div className="w-80">
      <TextAreaField {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "Comment" });
    await expect(textarea).toHaveAttribute("aria-invalid", "true");
    await expect(textarea).toHaveAccessibleDescription("Add a little more detail.");
  },
};
