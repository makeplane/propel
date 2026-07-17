import { Button } from "@makeplane/propel/components/button";
import { Form, FormActions, FormBody } from "@makeplane/propel/components/form";
import { InputField } from "@makeplane/propel/components/input-field";
import * as React from "react";

type ReserveUsernameState = {
  serverErrors?: Record<string, string | string[]>;
};

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

export default function ServerFunctionDemo() {
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
}
