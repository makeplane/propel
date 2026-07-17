import { Field, FieldDescription, FieldLabel } from "@makeplane/propel/components/field";
import { TextArea, TextAreaGroup } from "@makeplane/propel/components/text-area";

export default function WithDescriptionDemo() {
  return (
    <Field name="summary">
      <FieldLabel magnitude="md" inset={false}>
        Project summary
      </FieldLabel>
      <TextAreaGroup>
        <TextArea
          magnitude="md"
          surface="field"
          resize="vertical"
          rows={3}
          placeholder="Describe what this project is about..."
        />
      </TextAreaGroup>
      <FieldDescription magnitude="md">Visible to everyone in the workspace.</FieldDescription>
    </Field>
  );
}
