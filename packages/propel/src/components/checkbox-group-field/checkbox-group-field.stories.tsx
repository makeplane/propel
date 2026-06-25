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
        <CheckboxGroupFieldOption value="email" label="Email" tone="neutral" />
        <CheckboxGroupFieldOption
          value="slack"
          label="Slack"
          description="Workspace alerts."
          tone="neutral"
        />
      </>
    ),
  },
} satisfies Meta<typeof CheckboxGroupField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { hint: "At least one channel is recommended." } };

export const RendersGroup: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Email" })).toBeInTheDocument();
    await expect(canvas.getByRole("checkbox", { name: "Slack" })).toBeInTheDocument();
  },
};
