import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import type * as React from "react";
import { expect, userEvent } from "storybook/test";

import { Field, FieldError, FieldLabel, InputFieldBox, InputFieldIconSlot } from "../field/index";
import type { InputMagnitude, InputTone } from "../field/variants";
import { Input } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

// UI-tier story: the bare `Input` is a single native element. To frame it with a border
// and inline icon addons we compose the single-element `InputFieldBox` / `InputFieldIconSlot`
// parts from `ui/field` — the story holds no raw box styling of its own.
const meta = {
  title: "UI/Input",
  component: Input,
  subcomponents: { InputFieldBox, InputFieldIconSlot },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

function InputSurface({
  children,
  magnitude = "md",
  tone = "neutral",
}: {
  children: React.ReactNode;
  magnitude?: InputMagnitude;
  tone?: InputTone;
}) {
  return (
    <div className="w-72">
      <InputFieldBox magnitude={magnitude} tone={tone}>
        {children}
      </InputFieldBox>
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

/** Leading and trailing icon addons frame the control via `InputFieldIconSlot`. */
export const WithIconSlots: Story = {
  args: {
    magnitude: "md",
    "aria-label": "Search",
    placeholder: "Search people",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <InputSurface>
      <InputFieldIconSlot>
        <Search />
      </InputFieldIconSlot>
      <Input {...args} />
      <InputFieldIconSlot>
        <Mail />
      </InputFieldIconSlot>
    </InputSurface>
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
      <InputSurface tone="danger">
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
