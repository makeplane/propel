import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { CheckboxGroupField, CheckboxGroupFieldOption } from "./index";

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
