import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import type { FieldMagnitude } from "../../elements/field/variants";
import type { CheckboxGroupDensity } from "../checkbox-group/index";
import { CheckboxGroupField, CheckboxGroupFieldOption } from "./index";

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];
const DENSITIES: CheckboxGroupDensity[] = ["comfortable", "compact"];

// A fieldset of checkbox options (Field + Fieldset + CheckboxGroup + option rows).
const meta = {
  title: "Components/CheckboxGroupField",
  component: CheckboxGroupField,
  subcomponents: { CheckboxGroupFieldOption },
  args: {
    name: "notifications",
    label: "Notifications",
    description: "Choose every update channel you want.",
    density: "comfortable",
    magnitude: "md",
    defaultValue: ["email"],
    children: (
      <>
        <CheckboxGroupFieldOption value="email" label="Email" />
        <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
      </>
    ),
  },
} satisfies Meta<typeof CheckboxGroupField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { hint: "At least one channel is recommended." } };

/** Legend, description, and option text at every magnitude (`md` / `lg` / `xl`). */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each group with the magnitude name, so disable those
  // controls (plus `name`, overridden per group); the rest stay live and update every group.
  argTypes: {
    magnitude: { control: false },
    label: { control: false },
    name: { control: false },
  },
  render: (args) => (
    <div className="flex items-start gap-10">
      {MAGNITUDES.map((magnitude) => (
        <CheckboxGroupField
          key={magnitude}
          {...args}
          magnitude={magnitude}
          label={magnitude}
          name={`notifications-${magnitude}`}
        />
      ))}
    </div>
  ),
};

/** Row spacing between options: `comfortable` keeps a gap, `compact` stacks them flush. */
export const Densities: Story = {
  // Iterates `density` and labels each group with the density name, so disable those
  // controls (plus `name`, overridden per group); the rest stay live and update every group.
  argTypes: {
    density: { control: false },
    label: { control: false },
    name: { control: false },
  },
  render: (args) => (
    <div className="flex items-start gap-10">
      {DENSITIES.map((density) => (
        <CheckboxGroupField
          key={density}
          {...args}
          density={density}
          label={density}
          name={`notifications-${density}`}
        />
      ))}
    </div>
  ),
};

/**
 * Setting `error` marks the whole group invalid. Base UI's `Field.Root` propagates that validity to
 * every checkbox box as `data-invalid`, so each option's border recolors to `danger` automatically
 * — no per-option `tone`.
 */
export const Invalid: Story = {
  args: { error: "Choose at least one channel." },
};

/**
 * Interaction test: every option's box propagates `data-invalid` and the danger border class.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const InvalidInteraction: Story = {
  ...Invalid,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    for (const box of canvas.getAllByRole("checkbox")) {
      await expect(box).toHaveAttribute("data-invalid");
      await expect(box).toHaveClass("data-invalid:border-danger-strong");
    }
  },
};

export const RendersGroup: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Email" })).toBeInTheDocument();
    await expect(canvas.getByRole("checkbox", { name: "Slack" })).toBeInTheDocument();
  },
};
