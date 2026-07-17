import { InputField } from "@makeplane/propel/components/input-field";

export default function InvalidDemo() {
  return (
    <InputField
      magnitude="md"
      orientation="vertical"
      label="Email"
      required
      defaultValue="not-an-email"
      error="Enter a valid email address."
    />
  );
}
