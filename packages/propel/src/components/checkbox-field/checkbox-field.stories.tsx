import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { CheckboxField, type FieldMagnitude } from "./index";

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];

// A single checkbox laid out as a field row (Field + CheckboxFieldControl + label/helper).
const meta = {
  title: "Components/CheckboxField",
  component: CheckboxField,
  args: {
    name: "emailUpdates",
    label: "Email updates",
    magnitude: "md",
    value: "enabled",
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Send a message when the deployment status changes.",
    hint: "You can change this later.",
    defaultChecked: true,
  },
};

/**
 * Every `magnitude` (`md` / `lg` / `xl`) stacked. Magnitude scales the label, description, and
 * helper text; the checkbox box itself keeps one size.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each field with the magnitude name, so disable those two
  // controls (plus the per-instance `name`/`value`); the rest stay live and update every field
  // at once.
  argTypes: {
    magnitude: { control: false },
    label: { control: false },
    name: { control: false },
    value: { control: false },
  },
  args: {
    description: "Send a message when the deployment status changes.",
    hint: "You can change this later.",
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <CheckboxField
          key={magnitude}
          {...args}
          magnitude={magnitude}
          label={magnitude}
          name={magnitude}
          value={magnitude}
        />
      ))}
    </div>
  ),
};

/**
 * Setting `error` marks the field invalid. Base UI's `Field.Root` propagates that validity to the
 * checkbox box as `data-invalid`, and the box recolors its border to `danger` — no `tone` prop. A
 * resting field is shown alongside so the danger border is visibly (and assertably) different.
 */
export const Invalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <CheckboxField name="resting" label="Resting" magnitude="md" value="a" />
      <CheckboxField
        name="terms"
        label="Accept the terms"
        magnitude="md"
        value="b"
        error="You must accept the terms to continue."
      />
    </div>
  ),
};

/**
 * Interaction test: the invalid field propagates `data-invalid` and renders a different border
 * color than the resting field. Tagged out of the sidebar/docs/manifest while still running under
 * the default `test` tag.
 */
export const InvalidInteraction: Story = {
  ...Invalid,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const [resting, invalid] = canvas.getAllByRole("checkbox");
    // The error-free field leaves the box in its resting (non-invalid) state.
    await expect(resting).not.toHaveAttribute("data-invalid");
    // The invalid field propagates `data-invalid` onto the box (Base UI Field -> Checkbox.Root).
    await expect(invalid).toHaveAttribute("data-invalid");
    await expect(invalid).toHaveClass("data-invalid:border-danger-strong");
    // ...and the danger border actually renders: its color differs from the resting box's border.
    await expect(getComputedStyle(invalid).borderColor).not.toBe(
      getComputedStyle(resting).borderColor,
    );
  },
};

export const RendersCheckbox: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Email updates" })).toBeInTheDocument();
  },
};
