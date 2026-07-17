import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";

export default function ErrorDemo() {
  return (
    <RadioGroupField
      name="visibility"
      label="Project visibility"
      description="Controls who can find and open this project."
      density="comfortable"
      magnitude="md"
      error="Select a visibility before creating the project."
    >
      <RadioGroupFieldOption value="private" label="Private" description="Only invited members." />
      <RadioGroupFieldOption
        value="workspace"
        label="Workspace"
        description="Everyone in the workspace."
      />
      <RadioGroupFieldOption value="public" label="Public" description="Anyone with the link." />
    </RadioGroupField>
  );
}
