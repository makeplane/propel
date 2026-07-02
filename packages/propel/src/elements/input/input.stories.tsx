import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import type * as React from "react";
import { expect, userEvent } from "storybook/test";

import { Icon } from "../../internal/icon";
import { Field, FieldError, FieldLabel } from "../field/index";
import { Input, InputGroup, type InputMagnitude } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

// elements-tier story (rule 2b): `Input` is a Base-UI-agnostic styled `<input>`; Base UI's `Input`
// grafts the Field-control behavior onto it via `render`. `InputGroup` frames the control and
// the shared internal `Icon` slot adds inline adornments — all composed from `elements/input` + `elements/field`, with no raw
// box styling of the story's own.
const meta = {
  title: "Elements/Input",
  component: Input,
  args: { magnitude: "md" },
  subcomponents: { Input, InputGroup },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

function InputSurface({
  children,
  magnitude = "md",
}: {
  children: React.ReactNode;
  magnitude?: InputMagnitude;
}) {
  return (
    <div className="w-72">
      <InputGroup magnitude={magnitude}>{children}</InputGroup>
    </div>
  );
}

/** Base UI's `Input` grafts the Field-control behavior onto the styled `elements` `Input` element. */
export const Default: Story = {
  render: () => (
    <InputSurface>
      <BaseInput render={<Input magnitude="md" />} aria-label="Name" placeholder="Ada Lovelace" />
    </InputSurface>
  ),
};

/** Every input text magnitude. */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <InputSurface key={magnitude} magnitude={magnitude}>
          <BaseInput
            render={<Input magnitude={magnitude} />}
            aria-label={magnitude}
            placeholder={magnitude}
          />
        </InputSurface>
      ))}
    </div>
  ),
};

/** Leading and trailing icon addons frame the control via the shared `Icon` slot. */
export const WithIcons: Story = {
  render: () => (
    <InputSurface>
      <Icon tint="secondary" magnitude="md">
        <Search />
      </Icon>
      <BaseInput
        render={<Input magnitude="md" />}
        aria-label="Search"
        placeholder="Search people"
      />
      <Icon tint="secondary" magnitude="md">
        <Mail />
      </Icon>
    </InputSurface>
  ),
};

export const FieldComposition: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseField.Root name="displayName" render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>
        Display name
      </BaseField.Label>
      <InputSurface>
        <BaseInput render={<Input magnitude="md" />} placeholder="Ada Lovelace" />
      </InputSurface>
    </BaseField.Root>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Display name" });
    await userEvent.type(input, "Grace");
    await expect(input).toHaveAttribute("name", "displayName");
    await expect(input).toHaveValue("Grace");
  },
};

export const FieldErrorAssociation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseField.Root name="email" invalid render={<Field />}>
      <BaseField.Label render={<FieldLabel magnitude="md" inset={false} />}>Email</BaseField.Label>
      <InputSurface>
        <BaseInput render={<Input magnitude="md" />} defaultValue="not-an-email" />
      </InputSurface>
      <BaseField.Error match={true} render={<FieldError magnitude="md" />}>
        Enter a valid email address.
      </BaseField.Error>
    </BaseField.Root>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Enter a valid email address.");
  },
};
