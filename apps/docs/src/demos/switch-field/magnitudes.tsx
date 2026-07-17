import { SwitchField } from "@makeplane/propel/components/switch-field";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <SwitchField
        name="autoArchiveSm"
        label="Auto-archive done items"
        magnitude="sm"
        defaultChecked
      />
      <SwitchField
        name="autoArchiveMd"
        label="Auto-archive done items"
        magnitude="md"
        defaultChecked
      />
      <SwitchField
        name="autoArchiveLg"
        label="Auto-archive done items"
        magnitude="lg"
        defaultChecked
      />
    </div>
  );
}
