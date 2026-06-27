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
    resize: "vertical",
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
  args: {
    magnitude: "md",
    resize: "vertical",
    label: "Comment",
    placeholder: "Leave a comment...",
  },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <TextAreaField
          key={magnitude}
          magnitude={magnitude}
          resize="vertical"
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
  args: { magnitude: "md", resize: "vertical", label: "Comment" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-80">
      <TextAreaField
        magnitude="md"
        resize="vertical"
        label="Comment"
        defaultValue={Array.from({ length: 12 }, (_, i) => `Line ${i + 1} of a long comment.`).join(
          "\n",
        )}
      />
    </div>
  ),
};

/** The error treatment: danger border, danger helper text, and `aria-invalid`. */
export const Invalid: Story = {
  args: {
    magnitude: "md",
    resize: "vertical",
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
    resize: "vertical",
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

/** Setting `error` marks the field invalid (`aria-invalid`) and renders the announced error text. */
export const ErrorAnnouncesInvalid: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    resize: "vertical",
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

/**
 * Setting `error` marks the field invalid; Base UI's `Field.Root` propagates that validity to the
 * control as `data-invalid`, and the wrapping `TextAreaBox` recolors its border to `danger` via
 * `:has([data-invalid])` — no `tone` prop. A resting field is shown alongside so the danger border
 * is assertably different.
 */
export const InvalidShowsDangerBorder: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: { controls: { disable: true } },
  args: { magnitude: "md", resize: "vertical", label: "Comment" },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <TextAreaField magnitude="md" resize="vertical" label="Resting" placeholder="Resting" />
      <TextAreaField
        magnitude="md"
        resize="vertical"
        label="Invalid"
        defaultValue="No"
        error="Add a little more detail."
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const resting = canvas.getByRole<HTMLTextAreaElement>("textbox", { name: "Resting" });
    const invalid = canvas.getByRole<HTMLTextAreaElement>("textbox", { name: "Invalid" });
    await expect(invalid).toHaveAttribute("aria-invalid", "true");
    // The box is the textarea's wrapping `div`; danger keys off `:has([data-invalid])` on it.
    const restingBox = resting.parentElement;
    const invalidBox = invalid.parentElement;
    // `Error` is shadowed by this file's `Error` story, so reach for the global constructor.
    if (restingBox == null || invalidBox == null) {
      throw new Error("expected a TextAreaBox wrapper");
    }
    await expect(invalidBox).toHaveClass("has-[[data-invalid]]:border-danger-strong");
    // ...and the danger border actually renders: its color differs from the resting box's border.
    await expect(getComputedStyle(invalidBox).borderColor).not.toBe(
      getComputedStyle(restingBox).borderColor,
    );
  },
};
