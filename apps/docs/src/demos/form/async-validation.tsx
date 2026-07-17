import { Button } from "@makeplane/propel/components/button";
import { Form, FormActions, FormBody } from "@makeplane/propel/components/form";
import { InputField } from "@makeplane/propel/components/input-field";
import * as React from "react";

type CreateAccountValues = {
  username: string;
};

function checkUsernameAvailability(username: string): Promise<{ error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username === "admin" ? { error: "This username is already taken." } : {});
    }, 300);
  });
}

export default function AsyncValidationDemo() {
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
}
