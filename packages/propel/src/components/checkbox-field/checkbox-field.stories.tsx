import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { CheckboxField } from "./index";

// A single checkbox laid out as a field row (Field + CheckboxFieldControl + label/helper).
const meta = {
  title: "Components/CheckboxField",
  component: CheckboxField,
  args: {
    name: "emailUpdates",
    label: "Email updates",
    magnitude: "md",
    tone: "neutral",
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

export const RendersCheckbox: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "Email updates" })).toBeInTheDocument();
  },
};
