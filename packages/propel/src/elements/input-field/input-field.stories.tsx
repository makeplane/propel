import type { Meta, StoryObj } from "@storybook/react-vite";

import { FieldLabel } from "../field/index";
import { Input, InputGroup } from "../input/index";
import { InputField } from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. `InputField` is the
// Base-UI-agnostic layout frame for a labeled control — rendered DIRECTLY with a label + boxed
// input, no Base UI graft. The showcase covers its one axis: `orientation` (label above vs
// beside). Field behavior (name registration, validation, error wiring) is grafted AND tested in
// the ready-made `InputField` (Components/InputField).
const meta = {
  title: "Elements/InputField",
  component: InputField,
  args: { orientation: "vertical" },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `orientation="vertical"`: the label stacks above the control. */
export const Default: Story = {
  render: ({ orientation }) => (
    <div className="w-80">
      <InputField orientation={orientation}>
        <FieldLabel magnitude="md" inset={false} htmlFor="input-field-vertical">
          Display name
        </FieldLabel>
        <InputGroup magnitude="md">
          <Input id="input-field-vertical" magnitude="md" placeholder="Ada Lovelace" />
        </InputGroup>
      </InputField>
    </div>
  ),
};

/** `orientation="horizontal"`: the label sits beside the control. */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: ({ orientation }) => (
    <div className="w-96">
      <InputField orientation={orientation}>
        <FieldLabel magnitude="md" inset htmlFor="input-field-horizontal">
          Display name
        </FieldLabel>
        <InputGroup magnitude="md">
          <Input id="input-field-horizontal" magnitude="md" placeholder="Ada Lovelace" />
        </InputGroup>
      </InputField>
    </div>
  ),
};
