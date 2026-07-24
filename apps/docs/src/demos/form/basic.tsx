import { Button } from "@makeplane/propel/components/button";
import {
  CheckboxGroupField,
  CheckboxGroupFieldOption,
} from "@makeplane/propel/components/checkbox-group-field";
import { Form, FormActions, FormBody } from "@makeplane/propel/components/form";
import { InputField } from "@makeplane/propel/components/input-field";
import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";
import { SelectField } from "@makeplane/propel/components/select-field";
import { SwitchField } from "@makeplane/propel/components/switch-field";
import * as React from "react";

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

export default function BasicDemo() {
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
        <Button fillType="hug" type="submit" variant="secondary" size="md" label="Submit" />
      </FormActions>
    </Form>
  );
}
