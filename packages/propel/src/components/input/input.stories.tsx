import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import { expect, userEvent } from "storybook/test";

import { InputGroup } from "../../elements/input/index";
import { Icon } from "../../internal/icon";
import { Field, FieldError, FieldLabel } from "../field/index";
import { Input, type InputMagnitude } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

const meta = {
  title: "Components/Input",
  component: Input,
  subcomponents: { InputGroup },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single native input element. Compose it with `Field` for labels, names, and validation. */
export const Default: Story = {
  args: {
    magnitude: "md",
    "aria-label": "Name",
    placeholder: "Ada Lovelace",
  },
  render: (args) => (
    <div className="w-72">
      <InputGroup magnitude={args.magnitude}>
        <Input {...args} />
      </InputGroup>
    </div>
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
    <div className="flex w-72 flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <InputGroup key={magnitude} magnitude={magnitude}>
          <Input {...args} magnitude={magnitude} aria-label={magnitude} placeholder={magnitude} />
        </InputGroup>
      ))}
    </div>
  ),
};

/** Leading and trailing icon addons frame the control via the shared `Icon` slot. */
export const WithIcons: Story = {
  args: {
    magnitude: "md",
    "aria-label": "Search",
    placeholder: "Search people",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="w-72">
      <InputGroup magnitude={args.magnitude}>
        <Icon tint="secondary" magnitude="md">
          <Search />
        </Icon>
        <Input {...args} />
        <Icon tint="secondary" magnitude="md">
          <Mail />
        </Icon>
      </InputGroup>
    </div>
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
      <div className="w-72">
        <InputGroup magnitude={args.magnitude}>
          <Input {...args} placeholder="Ada Lovelace" />
        </InputGroup>
      </div>
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
      <div className="w-72">
        <InputGroup magnitude={args.magnitude}>
          <Input {...args} defaultValue="not-an-email" />
        </InputGroup>
      </div>
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
