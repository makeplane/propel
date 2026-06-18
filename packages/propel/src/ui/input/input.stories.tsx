import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { expect, userEvent } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import { inputFieldBoxVariants, type InputMagnitude } from "../field/variants";
import { Input } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

const meta = {
  title: "UI/Input",
  component: Input,
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
      <div className={inputFieldBoxVariants({ magnitude, tone: "neutral" })}>{children}</div>
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

export const FieldComposition: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md" },
  render: (args) => (
    <Field name="displayName">
      <FieldLabel magnitude="md">Display name</FieldLabel>
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
      <FieldLabel magnitude="md">Email</FieldLabel>
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
