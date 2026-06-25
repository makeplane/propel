import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import { Button } from "../button/index";
import {
  CheckboxGroupField,
  CheckboxGroupFieldOption,
  InputField,
  RadioGroupField,
  RadioGroupFieldOption,
  SelectField,
  SwitchField,
} from "../field/index";
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

type ExampleFormProps = {
  onFormSubmit?: (values: LaunchServerValues) => void;
};

function ExampleForm({ onFormSubmit }: ExampleFormProps) {
  const [homepage, setHomepage] = React.useState("https://example.com");
  const [errors, setErrors] = React.useState<Record<string, string | string[]>>({});
  const homepageError = errors.homepage;

  return (
    <Form<LaunchServerValues>
      errors={errors}
      onFormSubmit={(values) => {
        if (values.homepage.includes("example.com")) {
          setErrors({ homepage: "The example domain is not allowed." });
          return;
        }

        setErrors({});
        onFormSubmit?.(values);
      }}
    >
      <FormBody layout="single">
        <InputField
          magnitude="md"
          tone={homepageError ? "danger" : "neutral"}
          orientation="vertical"
          name="homepage"
          label="Homepage"
          type="url"
          required
          placeholder="https://plane.so"
          value={homepage}
          onValueChange={(nextHomepage) => {
            setHomepage(nextHomepage);
            if (homepageError) {
              setErrors({});
            }
          }}
          error={Array.isArray(homepageError) ? homepageError.join(" ") : homepageError}
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
          <CheckboxGroupFieldOption tone="neutral" value="http" label="HTTP" />
          <CheckboxGroupFieldOption tone="neutral" value="https" label="HTTPS" />
          <CheckboxGroupFieldOption tone="neutral" value="ssh" label="SSH" />
        </CheckboxGroupField>
        <SwitchField
          name="restartOnFailure"
          label="Restart on failure"
          magnitude="md"
          defaultChecked
        />
      </FormBody>
      <FormActions layout="inline">
        <Button sizing="hug" type="submit" prominence="secondary" tone="neutral" magnitude="md">
          Submit
        </Button>
      </FormActions>
    </Form>
  );
}

/** Form coordinates field values and server-style field errors. */
export const Default: Story = {
  render: () => <ExampleForm />,
};

/** Submitting with the disallowed domain surfaces the server error on the homepage field. */
export const SubmitWithErrors: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => <ExampleForm onFormSubmit={fn()} />,
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
