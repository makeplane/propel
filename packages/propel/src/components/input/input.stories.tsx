import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import type * as React from "react";
import { expect, userEvent } from "storybook/test";

import { InputGroup, InputIcon } from "../../elements/input/index";
import { Field, FieldError, FieldLabel } from "../field/index";
import { type InputMagnitude } from "./index";
import { Input } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

const meta = {
  title: "Components/Input",
  component: Input,
  subcomponents: { InputGroup, InputIcon },
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

/** Single native input element. Compose it with `Field` for labels, names, and validation. */
export const Default: Story = {
  args: {
    magnitude: "md",
    "aria-label": "Name",
    placeholder: "Ada Lovelace",
  },
  render: (args) => (
    <InputSurface>
      <Input {...args} />
    </InputSurface>
  ),
};

/** Every input text magnitude. */
export const Magnitudes: Story = {
  args: {
    magnitude: "md",
    "aria-label": "Name",
    placeholder: "Ada Lovelace",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <InputSurface key={magnitude} magnitude={magnitude}>
          <Input {...args} magnitude={magnitude} aria-label={magnitude} placeholder={magnitude} />
        </InputSurface>
      ))}
    </div>
  ),
};

/** Leading and trailing icon addons frame the control via `InputIcon`. */
export const WithIconSlots: Story = {
  args: {
    magnitude: "md",
    "aria-label": "Search",
    placeholder: "Search people",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <InputSurface>
      <InputIcon>
        <Search />
      </InputIcon>
      <Input {...args} />
      <InputIcon>
        <Mail />
      </InputIcon>
    </InputSurface>
  ),
};

export const FieldComposition: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md" },
  render: (args) => (
    <Field name="displayName">
      <FieldLabel magnitude="md" inset={false}>
        Display name
      </FieldLabel>
      <InputSurface>
        <Input {...args} placeholder="Ada Lovelace" />
      </InputSurface>
    </Field>
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
  args: { magnitude: "md" },
  render: (args) => (
    <Field name="email" invalid>
      <FieldLabel magnitude="md" inset={false}>
        Email
      </FieldLabel>
      <InputSurface>
        <Input {...args} defaultValue="not-an-email" />
      </InputSurface>
      <FieldError magnitude="md" match={true}>
        Enter a valid email address.
      </FieldError>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Enter a valid email address.");
  },
};
