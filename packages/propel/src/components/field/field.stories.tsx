import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { RadioGroup } from "../radio/index";
import {
  AutocompleteField,
  CheckboxField,
  CheckboxFieldControl,
  CheckboxGroupField,
  CheckboxGroupFieldOption,
  ComboboxField,
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  InputField,
  InputFieldControl,
  RadioFieldControl,
  RadioGroupField,
  RadioGroupFieldOption,
  SelectField,
  SwitchField,
  SwitchFieldControl,
  TextAreaField,
  TextAreaFieldControl,
} from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];
const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];
const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

const meta = {
  title: "Components/Field",
  component: Field,
  subcomponents: {
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldItem,
    InputField,
    CheckboxField,
    CheckboxFieldControl,
    CheckboxGroupField,
    CheckboxGroupFieldOption,
    ComboboxField,
    AutocompleteField,
    InputFieldControl,
    RadioFieldControl,
    RadioGroupField,
    RadioGroupFieldOption,
    SelectField,
    SwitchField,
    SwitchFieldControl,
    TextAreaField,
    TextAreaFieldControl,
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Field composes the Base UI labeling, description, and validation parts. */
export const Default: Story = {
  render: () => (
    <Field name="displayName">
      <FieldLabel magnitude="md" required>
        Display name
      </FieldLabel>
      <InputFieldControl magnitude="md" required placeholder="Ada Lovelace" />
      <FieldDescription magnitude="md">Shown anywhere your profile is visible.</FieldDescription>
    </Field>
  ),
};

/** Invalid fields expose `aria-invalid` and announce the matching error as a description. */
export const Invalid: Story = {
  render: () => (
    <Field name="workspaceSlug" invalid>
      <FieldLabel magnitude="md">Workspace slug</FieldLabel>
      <InputFieldControl magnitude="md" defaultValue="Already taken" />
      <FieldError magnitude="md" match={true}>
        Choose a different workspace slug.
      </FieldError>
    </Field>
  ),
};

/** Field-owned control subclasses provide Propel's text-entry styling for custom compositions. */
export const ControlSubclasses: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Field name="title">
        <FieldLabel magnitude="md">Title</FieldLabel>
        <InputFieldControl magnitude="md" placeholder="Issue title" />
      </Field>
      <Field name="description">
        <FieldLabel magnitude="md">Description</FieldLabel>
        <TextAreaFieldControl
          magnitude="md"
          surface="embedded"
          resize="none"
          placeholder="Add details"
          rows={3}
        />
      </Field>
    </div>
  ),
};

/** Field-owned choice control subclasses let custom layouts keep Propel styling. */
export const ChoiceControlSubclasses: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Field name="emailUpdates">
        <FieldLabel magnitude="md">
          <CheckboxFieldControl tone="neutral" value="email" />
          Email updates
        </FieldLabel>
      </Field>
      <Field name="priority">
        <RadioGroup density="comfortable" defaultValue="high">
          <FieldLabel magnitude="md">
            <RadioFieldControl value="high" />
            High priority
          </FieldLabel>
        </RadioGroup>
      </Field>
      <Field name="restartOnFailure">
        <FieldLabel magnitude="md">
          <SwitchFieldControl magnitude="md" defaultChecked />
          Restart on failure
        </FieldLabel>
      </Field>
    </div>
  ),
};

/** Ready-to-use choice fields compose the field root, label, control, and helper text. */
export const ReadyMadeChoiceFields: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <CheckboxField
        name="emailUpdates"
        label="Email updates"
        description="Send a message when the deployment status changes."
        hint="You can change this later."
        magnitude="md"
        tone="neutral"
        value="enabled"
        defaultChecked
      />
      <SwitchField
        name="restartOnFailure"
        label="Restart on failure"
        description="Automatically restart the service after a crash."
        magnitude="md"
        defaultChecked
      />
    </div>
  ),
};

/** Ready-to-use group fields compose labels, helper text, options, and Base UI group behavior. */
export const ReadyMadeGroupFields: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <CheckboxGroupField
        name="notifications"
        label="Notifications"
        description="Choose every update channel you want."
        hint="At least one channel is recommended."
        density="comfortable"
        magnitude="md"
        defaultValue={["email"]}
      >
        <CheckboxGroupFieldOption value="email" label="Email" tone="neutral" />
        <CheckboxGroupFieldOption
          value="slack"
          label="Slack"
          description="Workspace alerts."
          tone="neutral"
        />
      </CheckboxGroupField>
      <RadioGroupField
        name="priority"
        label="Priority"
        description="Pick one default priority."
        density="comfortable"
        magnitude="md"
        defaultValue="medium"
      >
        <RadioGroupFieldOption value="low" label="Low" />
        <RadioGroupFieldOption value="medium" label="Medium" description="Recommended." />
        <RadioGroupFieldOption value="high" label="High" />
      </RadioGroupField>
    </div>
  ),
};

/** Ready-to-use popup fields compose the field chrome with the Base UI popup primitives. */
export const ReadyMadePopupFields: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <SelectField
        name="serverType"
        label="Server type"
        description="Choose the machine class."
        magnitude="md"
        options={SERVER_TYPES}
        defaultValue="general"
      />
      <ComboboxField
        name="region"
        label="Region"
        description="Filter the deployment region."
        controlLabel="region"
        emptyLabel="No regions found"
        magnitude="md"
        items={REGIONS}
        placeholder="e.g. eu-central-1"
      />
      <AutocompleteField
        name="containerImage"
        label="Container image"
        description="Type or choose an image tag."
        controlLabel="container image"
        emptyLabel="No images found"
        magnitude="md"
        items={IMAGES}
        placeholder="e.g. node:22-slim"
      />
    </div>
  ),
};

export const LabelAndDescription: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="customField">
      <FieldLabel magnitude="md" required>
        Custom field
      </FieldLabel>
      <InputFieldControl magnitude="md" placeholder="Custom value" required />
      <FieldDescription magnitude="md">Use this for custom form controls.</FieldDescription>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Custom field" });
    await expect(input).toBeRequired();
    await expect(input).toHaveAttribute("name", "customField");
    await expect(input).toHaveAccessibleDescription("Use this for custom form controls.");
  },
};

export const ErrorAssociation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="email" invalid>
      <FieldLabel magnitude="md">Email</FieldLabel>
      <InputFieldControl magnitude="md" defaultValue="not-an-email" />
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

export const TypingUpdatesValue: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="nickname">
      <FieldLabel magnitude="md">Nickname</FieldLabel>
      <InputFieldControl magnitude="md" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Nickname" });
    await userEvent.type(input, "Grace");
    await expect(input).toHaveValue("Grace");
  },
};
