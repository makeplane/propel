import { SwitchField } from "@makeplane/propel/components/switch-field";

export default function ErrorDemo() {
  return (
    <SwitchField
      name="requireTwoFactor"
      label="Require two-factor authentication"
      description="Every member must enable 2FA before joining."
      magnitude="md"
      error="Enable 2FA on your own account before enforcing it for the workspace."
    />
  );
}
