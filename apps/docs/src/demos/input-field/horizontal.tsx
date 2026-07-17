import { InputField } from "@makeplane/propel/components/input-field";

export default function HorizontalDemo() {
  return (
    <InputField
      magnitude="md"
      orientation="horizontal"
      label="Workspace name"
      placeholder="Acme Inc."
      hint="Shown across your projects."
    />
  );
}
