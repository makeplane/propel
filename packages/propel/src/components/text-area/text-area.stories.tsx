import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import { TextArea, TextAreaGroup, type TextAreaMagnitude, type TextAreaResize } from "./index";

const MAGNITUDES: TextAreaMagnitude[] = ["sm", "md", "lg", "xl"];
const RESIZES: TextAreaResize[] = ["none", "vertical", "both"];

const RESIZE_COPY: Record<TextAreaResize, string> = {
  none: "No resize handle — the textarea keeps its size.",
  vertical: "Drag the corner handle to grow the textarea vertically.",
  both: "Drag the corner handle to grow the textarea in both directions.",
};

const meta = {
  title: "Components/TextArea",
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

/** Every text magnitude (sm/md/lg/xl) with the same content, framed by `TextAreaGroup`. */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each textarea for its value, so disable just those two
  // controls; the rest stay live and update every textarea at once.
  argTypes: { magnitude: { control: false }, "aria-label": { control: false } },
  args: {
    magnitude: "md",
    surface: "field",
    resize: "vertical",
    rows: 2,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <TextAreaGroup key={magnitude}>
          <TextArea
            {...args}
            magnitude={magnitude}
            aria-label={`Comment (${magnitude})`}
            defaultValue={`The ${magnitude} magnitude sizes the value text.`}
          />
        </TextAreaGroup>
      ))}
    </div>
  ),
};

/**
 * `surface` picks the control presentation: `field` pairs with the bordered `TextAreaGroup` frame,
 * `embedded` pads itself inside a composer frame that owns the chrome, and `inline` hugs its line
 * height for compact single-row composers.
 */
export const Surfaces: Story = {
  parameters: { controls: { disable: true } },
  args: { magnitude: "md", surface: "field", resize: "none" },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextAreaGroup>
        <TextArea
          {...args}
          surface="field"
          aria-label="Field comment"
          rows={2}
          defaultValue="The field surface sits inside the TextAreaGroup frame."
        />
      </TextAreaGroup>
      <div className="flex w-full flex-col overflow-clip rounded-xl border border-subtle-1 bg-layer-2">
        <TextArea
          {...args}
          surface="embedded"
          aria-label="Embedded comment"
          rows={2}
          defaultValue="The embedded surface pads itself inside a composer frame."
        />
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-subtle-1 bg-layer-2 px-3 py-2">
        <TextArea
          {...args}
          surface="inline"
          aria-label="Inline comment"
          rows={1}
          defaultValue="The inline surface hugs a compact row."
        />
      </div>
    </div>
  ),
};

/**
 * `resize` controls the native drag handle: `none` locks the size, `vertical` allows height
 * changes, `both` frees both axes.
 */
export const Resize: Story = {
  // Iterates `resize` and labels each textarea for its value, so disable just those two
  // controls; the rest stay live and update every textarea at once.
  argTypes: { resize: { control: false }, "aria-label": { control: false } },
  args: {
    magnitude: "md",
    surface: "field",
    resize: "vertical",
    rows: 2,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {RESIZES.map((resize) => (
        <TextAreaGroup key={resize}>
          <TextArea
            {...args}
            resize={resize}
            aria-label={`Comment (resize ${resize})`}
            defaultValue={RESIZE_COPY[resize]}
          />
        </TextAreaGroup>
      ))}
    </div>
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
      <TextAreaGroup>
        <TextArea {...args} placeholder="Leave a comment..." />
      </TextAreaGroup>
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
      <TextAreaGroup>
        <TextArea {...args} defaultValue="No" />
      </TextAreaGroup>
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
