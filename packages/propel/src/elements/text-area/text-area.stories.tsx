import { Field as BaseField } from "@base-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import { TextArea } from "./index";
import { TextAreaGroup } from "./text-area-group";

// elements-tier story: composes the atomic text-area parts — the bordered `TextAreaGroup` frame
// (border/radius/padding/focus + error treatments) wrapping the `TextArea` leaf, so the box
// holds the chrome and the leaf holds no frame styling.
const meta = {
  title: "Elements/TextArea",
  component: TextArea,
  subcomponents: { TextAreaGroup },
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

/**
 * Styled textarea leaf framed by `TextAreaGroup`. Uses the Base UI-backed primitive for Field
 * wiring.
 */
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
    <TextAreaGroup>
      <TextArea {...args} />
    </TextAreaGroup>
  ),
};

export const FieldComposition: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", surface: "field", resize: "vertical", rows: 3 },
  render: (args) => (
    <BaseField.Root name="comment" render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
        Comment
      </BaseField.Label>
      <TextAreaGroup>
        <BaseField.Control render={<TextArea {...args} placeholder="Leave a comment..." />} />
      </TextAreaGroup>
    </BaseField.Root>
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
    <BaseField.Root name="comment" invalid render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
        Comment
      </BaseField.Label>
      <TextAreaGroup>
        <BaseField.Control render={<TextArea {...args} defaultValue="No" />} />
      </TextAreaGroup>
      <BaseField.Error match={true} render={<FieldError magnitude="md" />}>
        Add a little more detail.
      </BaseField.Error>
    </BaseField.Root>
  ),
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "Comment" });
    await expect(textarea).toHaveAttribute("aria-invalid", "true");
    await expect(textarea).toHaveAccessibleDescription("Add a little more detail.");
  },
};
