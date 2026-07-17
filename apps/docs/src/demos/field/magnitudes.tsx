import {
  Field,
  FieldDescription,
  FieldLabel,
  type FieldMagnitude,
} from "@makeplane/propel/components/field";
import { Input } from "@makeplane/propel/components/input";

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      {MAGNITUDES.map((magnitude) => (
        <Field key={magnitude} name={`displayName-${magnitude}`}>
          <FieldLabel magnitude={magnitude} inset={false} required>
            Display name ({magnitude})
          </FieldLabel>
          <Input magnitude={magnitude} placeholder="Ada Lovelace" required />
          <FieldDescription magnitude={magnitude}>
            Shown anywhere your profile is visible.
          </FieldDescription>
        </Field>
      ))}
    </div>
  );
}
