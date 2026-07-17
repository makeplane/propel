import { Field, FieldLabel } from "@makeplane/propel/components/field";
import { RadioGroup } from "@makeplane/propel/components/radio";
import { RadioGroupFieldOption } from "@makeplane/propel/components/radio-group-field";
import * as React from "react";

export default function ControlledDemo() {
  const [priority, setPriority] = React.useState("low");

  return (
    <div className="flex flex-col gap-3">
      <Field name="priority">
        <FieldLabel magnitude="md" inset={false}>
          Priority
        </FieldLabel>
        <RadioGroup
          density="comfortable"
          value={priority}
          onValueChange={(value) => setPriority(String(value))}
        >
          <RadioGroupFieldOption magnitude="md" value="low" label="Low" />
          <RadioGroupFieldOption magnitude="md" value="medium" label="Medium" />
          <RadioGroupFieldOption magnitude="md" value="high" label="High" />
        </RadioGroup>
      </Field>
      <output className="text-13 text-secondary">Selected: {priority}</output>
    </div>
  );
}
