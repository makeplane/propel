import { Field, FieldLabel } from "@makeplane/propel/components/field";
import { RadioGroup } from "@makeplane/propel/components/radio";
import { RadioGroupFieldOption } from "@makeplane/propel/components/radio-group-field";

export default function BasicDemo() {
  return (
    <Field name="priority">
      <FieldLabel magnitude="md" inset={false}>
        Priority
      </FieldLabel>
      <RadioGroup density="comfortable" defaultValue="low">
        <RadioGroupFieldOption magnitude="md" value="low" label="Low" />
        <RadioGroupFieldOption magnitude="md" value="medium" label="Medium" />
        <RadioGroupFieldOption magnitude="md" value="high" label="High" />
      </RadioGroup>
    </Field>
  );
}
