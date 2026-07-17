import { Field, FieldDescription, FieldLabel } from "@makeplane/propel/components/field";
import { Input } from "@makeplane/propel/components/input";

export default function BasicDemo() {
  return (
    <Field name="displayName">
      <FieldLabel magnitude="md" inset={false} required>
        Display name
      </FieldLabel>
      <Input magnitude="md" placeholder="Ada Lovelace" required />
      <FieldDescription magnitude="md">Shown anywhere your profile is visible.</FieldDescription>
    </Field>
  );
}
