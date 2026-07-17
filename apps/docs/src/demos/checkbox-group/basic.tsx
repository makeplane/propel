import { Checkbox } from "@makeplane/propel/components/checkbox";
import { CheckboxGroup } from "@makeplane/propel/components/checkbox-group";
import * as React from "react";

export default function BasicDemo() {
  const [value, setValue] = React.useState<string[]>(["email"]);

  return (
    <CheckboxGroup
      density="comfortable"
      value={value}
      onValueChange={setValue}
      aria-label="Notification channels"
    >
      <Checkbox value="email" label="Email" />
      <Checkbox value="push" label="Push notifications" />
      <Checkbox value="sms" label="SMS" />
    </CheckboxGroup>
  );
}
