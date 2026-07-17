import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";
import * as React from "react";

export default function ControlledDemo() {
  const [value, setValue] = React.useState("medium");

  return (
    <RadioGroupField
      name="priority"
      label="Priority"
      description="Pick one default priority."
      density="comfortable"
      magnitude="md"
      value={value}
      onValueChange={(next) => setValue(next as string)}
      hint={`Selected: ${value}`}
    >
      <RadioGroupFieldOption value="low" label="Low" />
      <RadioGroupFieldOption value="medium" label="Medium" description="Recommended." />
      <RadioGroupFieldOption value="high" label="High" />
    </RadioGroupField>
  );
}
