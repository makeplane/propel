import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, waitFor } from "storybook/test";

import { Button } from "../button/index";
import { CheckboxGroupField, CheckboxGroupFieldOption } from "../checkbox-group-field/index";
import { InputField } from "../input-field/index";
import { RadioGroupField, RadioGroupFieldOption } from "../radio-group-field/index";
import { SelectField } from "../select-field/index";
import { SwitchField } from "../switch-field/index";
import { Form, FormActions, FormBody } from "./index";

// Components-tier story: the ready-made `Form` composed with same-tier field controls,
// using the `FormBody` (field stack) and `FormActions` (bottom actions bar) parts.
const meta = {
  title: "Components/Form",
  component: Form,
  subcomponents: { FormBody, FormActions },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

type LaunchServerValues = {
  allowedProtocols: string[];
  homepage: string;
  restartOnFailure: boolean;
  serverType: string;
  storageType: string;
};

type CreateAccountValues = {
  username: string;
};

// Deterministic stand-in for a server check: resolves after a short in-story delay.
function checkUsernameAvailability(username: string): Promise<{ error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username === "admin" ? { error: "This username is already taken." } : {});
    }, 300);
  });
}

type ReserveUsernameState = {
  serverErrors?: Record<string, string | string[]>;
};

// Deterministic stand-in for a Server Function (`"use server"` in a supporting framework):
// resolves after a short in-story delay.
async function reserveUsername(
  _previousState: ReserveUsernameState,
  formData: FormData,
): Promise<ReserveUsernameState> {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  if (formData.get("username") === "admin") {
    return { serverErrors: { username: "'admin' is reserved for system use." } };
  }

  return {};
}

type ProfileValues = {
  name: string;
  age: string;
};

// Hand-rolled stand-in for a schema library's `safeParse` (e.g. Zod): one parse of the submitted
// values yields per-field error arrays keyed by field `name`, shaped like
// `z.flattenError(result.error).fieldErrors`.
function parseProfile(values: ProfileValues): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  if (values.name.length === 0) {
    fieldErrors.name = ["Name is required"];
  }

  const age = Number(values.age);
  if (Number.isNaN(age)) {
    fieldErrors.age = ["Age must be a number"];
  } else if (age <= 0) {
    fieldErrors.age = ["Age must be a positive number"];
  }

  return fieldErrors;
}

/** Form coordinates field values and server-style field errors. */
export const Default: Story = {
  render: function Render() {
    const [homepage, setHomepage] = React.useState("https://example.com");
    const [errors, setErrors] = React.useState<Record<string, string | string[]>>({});

    return (
      <Form<LaunchServerValues>
        errors={errors}
        onFormSubmit={(values) => {
          if (values.homepage.includes("example.com")) {
            setErrors({ homepage: "The example domain is not allowed." });
            return;
          }

          setErrors({});
        }}
      >
        <FormBody layout="single">
          <InputField
            magnitude="md"
            orientation="vertical"
            name="homepage"
            label="Homepage"
            type="url"
            required
            placeholder="https://plane.so"
            value={homepage}
            onValueChange={(nextHomepage) => {
              setHomepage(nextHomepage);
              if (errors.homepage) {
                setErrors({});
              }
            }}
          />
          <SelectField
            name="serverType"
            label="Server type"
            magnitude="md"
            options={SERVER_TYPES}
            defaultValue="general"
            required
            description="Select the resource profile for this server."
          />
          <RadioGroupField
            name="storageType"
            label="Storage type"
            magnitude="md"
            density="comfortable"
            defaultValue="ssd"
            required
          >
            <RadioGroupFieldOption value="ssd" label="SSD" />
            <RadioGroupFieldOption value="hdd" label="HDD" />
          </RadioGroupField>
          <CheckboxGroupField
            name="allowedProtocols"
            label="Allowed protocols"
            magnitude="md"
            density="comfortable"
            defaultValue={["https"]}
          >
            <CheckboxGroupFieldOption value="http" label="HTTP" />
            <CheckboxGroupFieldOption value="https" label="HTTPS" />
            <CheckboxGroupFieldOption value="ssh" label="SSH" />
          </CheckboxGroupField>
          <SwitchField
            name="restartOnFailure"
            label="Restart on failure"
            magnitude="md"
            defaultChecked
          />
        </FormBody>
        <FormActions layout="inline">
          <Button
            sizing="hug"
            type="submit"
            prominence="secondary"
            tone="neutral"
            magnitude="md"
            label="Submit"
          />
        </FormActions>
      </Form>
    );
  },
};

/** Submitting with the disallowed domain surfaces the server error on the homepage field. */
export const SubmitWithErrors: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Homepage" });
    const hdd = canvas.getByRole("radio", { name: "HDD" });
    const ssh = canvas.getByRole("checkbox", { name: "SSH" });
    const submit = canvas.getByRole("button", { name: "Submit" });

    await userEvent.click(hdd);
    await userEvent.click(ssh);
    await userEvent.click(submit);
    await expect(input).toHaveAccessibleDescription("The example domain is not allowed.");

    await userEvent.clear(input);
    await userEvent.type(input, "https://plane.so");
    await userEvent.click(submit);

    await waitFor(async () => {
      await expect(input).not.toHaveAccessibleDescription("The example domain is not allowed.");
    });
  },
};

/**
 * Native constraint validation: submitting an empty required field marks it invalid — no custom
 * `errors` wiring needed.
 */
export const ConstraintValidationInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <FormBody layout="single">
        <InputField
          magnitude="md"
          orientation="vertical"
          name="email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
        />
      </FormBody>
      <FormActions layout="inline">
        <Button
          sizing="hug"
          type="submit"
          prominence="primary"
          tone="neutral"
          magnitude="md"
          label="Submit"
        />
      </FormActions>
    </Form>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(canvas.getByRole("textbox", { name: "Email" })).toBeInvalid();
  },
};

/** Async submission: the submit button shows its pending state while a server-style check resolves. */
export const AsyncValidation: Story = {
  render: function Render() {
    const [pending, setPending] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string | string[]>>({});

    return (
      <Form<CreateAccountValues>
        errors={errors}
        onFormSubmit={async (values) => {
          setPending(true);
          const { error } = await checkUsernameAvailability(values.username);
          setPending(false);

          if (error) {
            setErrors({ username: error });
            return;
          }

          setErrors({});
        }}
      >
        <FormBody layout="single">
          <InputField
            magnitude="md"
            orientation="vertical"
            name="username"
            label="Username"
            required
            defaultValue="admin"
            placeholder="e.g. alice"
          />
        </FormBody>
        <FormActions layout="inline">
          <Button
            sizing="hug"
            type="submit"
            prominence="primary"
            tone="neutral"
            magnitude="md"
            loading={pending}
            label="Create account"
          />
        </FormActions>
      </Form>
    );
  },
};

/** Submitting a taken username surfaces the async server error; a free one clears it. */
export const AsyncValidationInteraction: Story = {
  ...AsyncValidation,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Username" });
    const submit = canvas.getByRole("button", { name: "Create account" });

    await userEvent.click(submit);
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await waitFor(async () => {
      await expect(input).toHaveAccessibleDescription("This username is already taken.");
    });

    await userEvent.clear(input);
    await userEvent.type(input, "alice");
    await userEvent.click(submit);

    await waitFor(async () => {
      await expect(input).not.toHaveAccessibleDescription("This username is already taken.");
    });
  },
};

/** Submission through the form `action` with `React.useActionState`, as with a Server Function. */
export const ServerFunction: Story = {
  render: function Render() {
    const [state, formAction, pending] = React.useActionState(reserveUsername, {});

    return (
      <Form action={formAction} errors={state.serverErrors}>
        <FormBody layout="single">
          <InputField
            magnitude="md"
            orientation="vertical"
            name="username"
            label="Username"
            required
            defaultValue="admin"
            placeholder="e.g. alice"
          />
        </FormBody>
        <FormActions layout="inline">
          <Button
            sizing="hug"
            type="submit"
            prominence="primary"
            tone="neutral"
            magnitude="md"
            loading={pending}
            label="Reserve username"
          />
        </FormActions>
      </Form>
    );
  },
};

/** The action's returned errors surface on the matching field; a free username clears them. */
export const ServerFunctionInteraction: Story = {
  ...ServerFunction,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Username" });
    const submit = canvas.getByRole("button", { name: "Reserve username" });

    await userEvent.click(submit);
    await waitFor(async () => {
      await expect(input).toHaveAccessibleDescription("'admin' is reserved for system use.");
    });

    await userEvent.clear(input);
    await userEvent.type(input, "alice");
    await userEvent.click(submit);

    await waitFor(async () => {
      await expect(input).not.toHaveAccessibleDescription("'admin' is reserved for system use.");
    });
  },
};

/** One schema-style parse maps consolidated `fieldErrors` onto every field by `name`. */
export const SchemaValidation: Story = {
  render: function Render() {
    const [errors, setErrors] = React.useState<Record<string, string | string[]>>({});

    return (
      <Form<ProfileValues>
        errors={errors}
        onFormSubmit={(values) => {
          const fieldErrors = parseProfile(values);

          if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            return;
          }

          setErrors({});
        }}
      >
        <FormBody layout="single">
          <InputField
            magnitude="md"
            orientation="vertical"
            name="name"
            label="Name"
            placeholder="Enter name"
          />
          <InputField
            magnitude="md"
            orientation="vertical"
            name="age"
            label="Age"
            placeholder="Enter age"
          />
        </FormBody>
        <FormActions layout="inline">
          <Button
            sizing="hug"
            type="submit"
            prominence="primary"
            tone="neutral"
            magnitude="md"
            label="Submit"
          />
        </FormActions>
      </Form>
    );
  },
};

/** An invalid submit errors both fields at once; valid values clear them on the next submit. */
export const SchemaValidationInteraction: Story = {
  ...SchemaValidation,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const name = canvas.getByRole<HTMLInputElement>("textbox", { name: "Name" });
    const age = canvas.getByRole<HTMLInputElement>("textbox", { name: "Age" });
    const submit = canvas.getByRole("button", { name: "Submit" });

    await userEvent.click(submit);
    await expect(name).toHaveAccessibleDescription("Name is required");
    await expect(age).toHaveAccessibleDescription("Age must be a positive number");

    await userEvent.type(name, "Ada Lovelace");
    await userEvent.type(age, "36");
    await userEvent.click(submit);

    await waitFor(async () => {
      await expect(name).not.toHaveAccessibleDescription("Name is required");
    });
    await expect(age).not.toHaveAccessibleDescription("Age must be a positive number");
  },
};
