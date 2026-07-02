import { Field as BaseField } from "@base-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FieldLabel } from "../field/index";
import { Input } from "../input/index";
import { InputField } from "./index";

// elements-tier story (rule 2b): `InputField` is a Base-UI-agnostic `useRender` layout frame; Base UI's
// `Field.Root` grafts its behavior via `render`. `Field.Root` is behavior-only (it lives in
// `components`), so this in-tier story wires it straight from `@base-ui/react`. The ready-made
// `InputField` (Components/InputField) composes this frame with the box, control, and helper text;
// here it just frames a label + control to show the `vertical` / `horizontal` layout.
const meta = {
  title: "Elements/InputField",
  component: InputField,
  args: { orientation: "vertical" },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ orientation }) => (
    <BaseField.Root name="displayName" render={<InputField orientation={orientation} />}>
      <FieldLabel magnitude="md" inset={false}>
        Display name
      </FieldLabel>
      <Input magnitude="md" placeholder="Ada Lovelace" />
    </BaseField.Root>
  ),
};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: Default.render,
};
