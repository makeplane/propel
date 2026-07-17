import { CheckboxField } from "@makeplane/propel/components/checkbox-field";

export default function InvalidDemo() {
  return (
    <div className="flex flex-col gap-4">
      <CheckboxField name="digest" value="enabled" label="Send me a weekly digest" magnitude="md" />
      <CheckboxField
        name="terms"
        value="accepted"
        label="Accept the workspace terms"
        magnitude="md"
        error="You must accept the terms to continue."
      />
    </div>
  );
}
