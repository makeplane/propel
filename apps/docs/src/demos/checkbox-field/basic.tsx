import { CheckboxField } from "@makeplane/propel/components/checkbox-field";

export default function BasicDemo() {
  return (
    <CheckboxField
      name="emailUpdates"
      value="enabled"
      label="Email updates"
      magnitude="md"
      description="Send a message when the deployment status changes."
      hint="You can change this later."
      defaultChecked
    />
  );
}
