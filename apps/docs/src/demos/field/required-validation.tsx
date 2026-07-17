import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@makeplane/propel/components/field";
import { Input } from "@makeplane/propel/components/input";

export default function RequiredValidationDemo() {
  return (
    <Field name="fullName" validationMode="onBlur">
      <FieldLabel magnitude="md" inset={false} required>
        Full name
      </FieldLabel>
      <Input magnitude="md" placeholder="Ada Lovelace" required />
      <FieldError magnitude="md" match="valueMissing">
        Enter your full name.
      </FieldError>
      <FieldDescription magnitude="md">Visible on your profile.</FieldDescription>
    </Field>
  );
}
