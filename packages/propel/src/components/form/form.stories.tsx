import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import { Button } from "../button/index";
import {
  AutocompleteField,
  CheckboxGroupField,
  CheckboxGroupFieldOption,
  ComboboxField,
  Field,
  FieldError,
  FieldLabel,
  InputField,
  RadioGroupField,
  RadioGroupFieldOption,
  SelectField,
  SwitchField,
} from "../field/index";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "../number-field/index";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "../slider/index";
import { Form } from "./index";

const meta = {
  title: "Components/Form",
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];
const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];
const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

type LaunchServerValues = {
  allowedProtocols: string[];
  containerImage: string;
  homepage: string;
  numOfInstances: number;
  region: string;
  restartOnFailure: boolean;
  scalingThreshold: number[];
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
      <ComboboxField
        name="region"
        label="Region"
        controlLabel="region"
        magnitude="md"
        items={REGIONS}
        defaultValue="us-central-1"
        required
        placeholder="Select region"
        description="Choose the closest deployment region."
        emptyLabel="No regions found."
      />
      <AutocompleteField
        name="containerImage"
        label="Container image"
        controlLabel="container image"
        magnitude="md"
        items={IMAGES}
        mode="both"
        defaultValue="nginx:1.29-alpine"
        required
        placeholder="Search images"
        description="Pick an image tag that already exists in the registry."
        emptyLabel="No images found."
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
      <Field name="numOfInstances">
        <NumberField defaultValue={2} min={1} max={64} required>
          <FieldLabel magnitude="md">Instances</FieldLabel>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease instances">
              <Minus aria-hidden className="size-4" />
            </NumberFieldDecrement>
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase instances">
              <Plus aria-hidden className="size-4" />
            </NumberFieldIncrement>
          </NumberFieldGroup>
          <FieldError magnitude="md" />
        </NumberField>
      </Field>
      <Field name="scalingThreshold">
        <Slider
          defaultValue={[0.2, 0.8]}
          min={0}
          max={1}
          step={0.01}
          format={{ style: "percent", maximumFractionDigits: 0 }}
        >
          <FieldLabel magnitude="md">Scaling threshold</FieldLabel>
          <SliderValue />
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Minimum threshold" />
              <SliderThumb aria-label="Maximum threshold" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </Field>
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
      <Button type="submit" variant="secondary" tone="neutral" magnitude="md">
        Submit
      </Button>
    </Form>
  );
}

/** Form coordinates field values and server-style field errors. */
export const Default: Story = {
  render: () => <ExampleForm />,
};

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
