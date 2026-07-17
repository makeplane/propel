import {
  CheckboxGroupField,
  CheckboxGroupFieldOption,
} from "@makeplane/propel/components/checkbox-group-field";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <CheckboxGroupField
        name="notifications-md"
        label="md"
        description="Choose every update channel you want."
        density="comfortable"
        magnitude="md"
        defaultValue={["email"]}
      >
        <CheckboxGroupFieldOption value="email" label="Email" />
        <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
      </CheckboxGroupField>
      <CheckboxGroupField
        name="notifications-lg"
        label="lg"
        description="Choose every update channel you want."
        density="comfortable"
        magnitude="lg"
        defaultValue={["email"]}
      >
        <CheckboxGroupFieldOption value="email" label="Email" />
        <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
      </CheckboxGroupField>
      <CheckboxGroupField
        name="notifications-xl"
        label="xl"
        description="Choose every update channel you want."
        density="comfortable"
        magnitude="xl"
        defaultValue={["email"]}
      >
        <CheckboxGroupFieldOption value="email" label="Email" />
        <CheckboxGroupFieldOption value="slack" label="Slack" description="Workspace alerts." />
      </CheckboxGroupField>
    </div>
  );
}
