import { Button } from "@makeplane/propel/components/button";
import { Form, FormActions, FormBody } from "@makeplane/propel/components/form";
import { InputField } from "@makeplane/propel/components/input-field";
import * as React from "react";

type ProfileValues = {
  name: string;
  age: string;
};

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

export default function SchemaValidationDemo() {
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
}
