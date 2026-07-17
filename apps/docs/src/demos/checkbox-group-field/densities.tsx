import {
  CheckboxGroupField,
  CheckboxGroupFieldOption,
} from "@makeplane/propel/components/checkbox-group-field";

export default function DensitiesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <CheckboxGroupField
        name="notifications-comfortable"
        label="comfortable"
        description="Choose every update channel you want."
        density="comfortable"
        magnitude="md"
        defaultValue={["email"]}
      >
        <CheckboxGroupFieldOption value="email" label="Email" />
        <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
      </CheckboxGroupField>
      <CheckboxGroupField
        name="notifications-compact"
        label="compact"
        description="Choose every update channel you want."
        density="compact"
        magnitude="md"
        defaultValue={["email"]}
      >
        <CheckboxGroupFieldOption value="email" label="Email" />
        <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
      </CheckboxGroupField>
    </div>
  );
}
