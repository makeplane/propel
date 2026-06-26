import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import { TextArea, TextAreaBox } from "./index";

const meta = {
  title: "Components/TextArea",
  component: TextArea,
  subcomponents: { TextAreaBox },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Styled textarea leaf framed by `TextAreaBox`. Uses the Base UI-backed primitive for Field wiring. */
export const Default: Story = {
  args: {
    magnitude: "md",
    surface: "field",
    resize: "vertical",
    "aria-label": "Comment",
    placeholder: "Leave a comment...",
    rows: 4,
  },
  render: (args) => (
    <TextAreaBox tone="neutral">
      <TextArea {...args} />
    </TextAreaBox>
  ),
};

export const FieldComposition: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", surface: "field", resize: "vertical", rows: 3 },
  render: (args) => (
    <Field name="comment">
      <FieldLabel magnitude="md" inset={false}>
        Comment
      </FieldLabel>
      <TextAreaBox tone="neutral">
        <TextArea {...args} placeholder="Leave a comment..." />
      </TextAreaBox>
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole<HTMLTextAreaElement>("textbox", { name: "Comment" });
    await userEvent.type(textarea, "Looks good");
    await expect(textarea).toHaveAttribute("name", "comment");
    await expect(textarea).toHaveValue("Looks good");
  },
};

export const FieldErrorAssociation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", surface: "field", resize: "vertical", rows: 3 },
  render: (args) => (
    <Field name="comment" invalid>
      <FieldLabel magnitude="md" inset={false}>
        Comment
      </FieldLabel>
      <TextAreaBox tone="danger">
        <TextArea {...args} defaultValue="No" />
      </TextAreaBox>
      <FieldError magnitude="md" match={true}>
        Add a little more detail.
      </FieldError>
    </Field>
  ),
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "Comment" });
    await expect(textarea).toHaveAttribute("aria-invalid", "true");
    await expect(textarea).toHaveAccessibleDescription("Add a little more detail.");
  },
};
