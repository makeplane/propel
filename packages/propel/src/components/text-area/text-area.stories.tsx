import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { expect } from "storybook/test";

import { textAreaFieldBoxVariants } from "../field/field-styles";
import { Field, FieldError, FieldLabel } from "../field/index";
import { TextArea } from "./index";

const meta = {
  title: "Components/TextArea",
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

function TextAreaSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-80">
      <div className={textAreaFieldBoxVariants({ tone: "neutral" })}>{children}</div>
    </div>
  );
}

/** Styled textarea leaf. It uses the internal Base UI-backed textarea primitive for Field wiring. */
export const Default: Story = {
  args: {
    magnitude: "md",
    surface: "field",
    "aria-label": "Comment",
    placeholder: "Leave a comment...",
    rows: 4,
  },
  render: (args) => (
    <TextAreaSurface>
      <TextArea {...args} />
    </TextAreaSurface>
  ),
};

export const FieldComposition: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", surface: "field", rows: 3 },
  render: (args) => (
    <Field name="comment">
      <FieldLabel magnitude="md">Comment</FieldLabel>
      <TextAreaSurface>
        <TextArea {...args} placeholder="Leave a comment..." />
      </TextAreaSurface>
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
  args: { magnitude: "md", surface: "field", rows: 3 },
  render: (args) => (
    <Field name="comment" invalid>
      <FieldLabel magnitude="md">Comment</FieldLabel>
      <TextAreaSurface>
        <TextArea {...args} defaultValue="No" />
      </TextAreaSurface>
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
