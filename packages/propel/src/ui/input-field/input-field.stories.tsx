import type { Meta, StoryObj } from "@storybook/react-vite";

import { FieldLabel } from "../field/index";
import { Input } from "../input/index";
import { InputField } from "./index";

// UI-tier story: the input field's orientation-aware root (`Field.Root` + layout). The ready-made
// `InputField` (Components/InputField) composes this with the box, control, and helper text; here it
// just frames a label + control to show the `vertical` / `horizontal` layout.
const meta = {
  title: "UI/InputField",
  component: InputField,
  args: { name: "displayName", orientation: "vertical" },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <InputField {...args}>
      <FieldLabel magnitude="md" inset={false}>
        Display name
      </FieldLabel>
      <Input magnitude="md" placeholder="Ada Lovelace" />
    </InputField>
  ),
};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: Default.render,
};
