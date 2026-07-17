import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";

export default function WithDescriptionDemo() {
  return (
    <RadioGroupField
      name="visibility"
      label="Project visibility"
      magnitude="md"
      density="comfortable"
      defaultValue="private"
    >
      <RadioGroupFieldOption
        value="private"
        label="Private"
        description="Only invited members can view this project."
      />
      <RadioGroupFieldOption
        value="workspace"
        label="Workspace"
        description="Everyone in the workspace can find and open it."
      />
      <RadioGroupFieldOption
        value="public"
        label="Public"
        description="Anyone with the link can view the project."
      />
    </RadioGroupField>
  );
}
