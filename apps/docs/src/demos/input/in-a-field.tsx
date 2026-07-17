import { Field, FieldError, FieldLabel } from "@makeplane/propel/components/field";
import { Input, InputGroup } from "@makeplane/propel/components/input";

export default function InAFieldDemo() {
  return (
    <Field name="email" invalid>
      <FieldLabel magnitude="md" inset={false}>
        Work email
      </FieldLabel>
      <InputGroup magnitude="md">
        <Input magnitude="md" defaultValue="not-an-email" />
      </InputGroup>
      <FieldError magnitude="md" match={true}>
        Enter a valid email address.
      </FieldError>
    </Field>
  );
}
