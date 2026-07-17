import { SwitchField } from "@makeplane/propel/components/switch-field";

export default function BasicDemo() {
  return (
    <SwitchField
      name="restartOnFailure"
      label="Restart on failure"
      magnitude="md"
      description="Automatically restart the service after a crash."
      hint="You can change this later."
      defaultChecked
    />
  );
}
