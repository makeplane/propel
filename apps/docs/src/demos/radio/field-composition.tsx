import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";

export default function FieldCompositionDemo() {
  return (
    <RadioGroupField
      name="priority"
      label="Priority"
      magnitude="md"
      density="comfortable"
      defaultValue="low"
      hint="Only one priority can be active."
    >
      <RadioGroupFieldOption value="low" label="Low" />
      <RadioGroupFieldOption value="medium" label="Medium" />
      <RadioGroupFieldOption value="high" label="High" />
    </RadioGroupField>
  );
}
