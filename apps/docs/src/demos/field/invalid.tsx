import { Field, FieldError, FieldLabel } from "@makeplane/propel/components/field";
import { Input } from "@makeplane/propel/components/input";

export default function InvalidDemo() {
  return (
    <Field name="workspaceSlug" invalid>
      <FieldLabel magnitude="md" inset={false}>
        Workspace slug
      </FieldLabel>
      <Input magnitude="md" defaultValue="Already taken" />
      <FieldError magnitude="md" match={true}>
        Choose a different workspace slug.
      </FieldError>
    </Field>
  );
}
