import { SelectField } from "@makeplane/propel/components/select-field";
import * as React from "react";

const PRIORITIES = [
  { label: "Urgent", value: "urgent" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export default function ControlledDemo() {
  const [value, setValue] = React.useState<string | null>("medium");
  return (
    <SelectField
      name="priority"
      label="Priority"
      description={`Selected: ${value ?? "none"}`}
      magnitude="md"
      options={PRIORITIES}
      value={value}
      onValueChange={setValue}
    />
  );
}
