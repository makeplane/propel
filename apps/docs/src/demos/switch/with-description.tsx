import { SwitchField } from "@makeplane/propel/components/switch-field";

export default function WithDescriptionDemo() {
  return (
    <SwitchField
      name="restartOnFailure"
      label="Restart on failure"
      description="Automatically restart the service after a crash."
      magnitude="md"
      defaultChecked
    />
  );
}
