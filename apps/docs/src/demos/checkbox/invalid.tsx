import { Checkbox } from "@makeplane/propel/components/checkbox";
import { Field } from "@makeplane/propel/components/field";

export default function InvalidDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Checkbox label="Notify me" />
      <Field invalid>
        <Checkbox label="Accept workspace terms" />
      </Field>
      <Field invalid>
        <Checkbox label="Accept workspace terms" defaultChecked />
      </Field>
    </div>
  );
}
