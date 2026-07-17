import {
  CheckboxGroupField,
  CheckboxGroupFieldOption,
} from "@makeplane/propel/components/checkbox-group-field";

export default function BasicDemo() {
  return (
    <CheckboxGroupField
      name="notifications"
      label="Notifications"
      description="Choose every update channel you want."
      density="comfortable"
      magnitude="md"
      defaultValue={["email"]}
      hint="At least one channel is recommended."
    >
      <CheckboxGroupFieldOption value="email" label="Email" />
      <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
    </CheckboxGroupField>
  );
}
