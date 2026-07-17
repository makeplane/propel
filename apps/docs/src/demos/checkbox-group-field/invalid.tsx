import {
  CheckboxGroupField,
  CheckboxGroupFieldOption,
} from "@makeplane/propel/components/checkbox-group-field";

export default function InvalidDemo() {
  return (
    <CheckboxGroupField
      name="notifications"
      label="Notifications"
      description="Choose every update channel you want."
      density="comfortable"
      magnitude="md"
      error="Choose at least one channel."
    >
      <CheckboxGroupFieldOption value="email" label="Email" />
      <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
    </CheckboxGroupField>
  );
}
