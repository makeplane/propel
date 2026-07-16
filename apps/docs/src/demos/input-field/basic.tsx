import { InputField } from "@makeplane/propel/components/input-field";

export default function BasicDemo() {
  return (
    <InputField
      magnitude="md"
      orientation="vertical"
      label="Email"
      placeholder="you@example.com"
      description="We'll use this to send you receipts."
      hint="We'll never share your email."
    />
  );
}
