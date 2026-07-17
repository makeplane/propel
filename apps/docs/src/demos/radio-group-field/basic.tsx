import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";

export default function BasicDemo() {
  return (
    <RadioGroupField
      name="priority"
      label="Priority"
      description="Pick one default priority."
      density="comfortable"
      magnitude="md"
      defaultValue="medium"
      hint="You can change this later."
    >
      <RadioGroupFieldOption value="low" label="Low" />
      <RadioGroupFieldOption value="medium" label="Medium" description="Recommended." />
      <RadioGroupFieldOption value="high" label="High" />
    </RadioGroupField>
  );
}
