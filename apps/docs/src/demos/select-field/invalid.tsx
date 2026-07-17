import { SelectField } from "@makeplane/propel/components/select-field";

const MEMBERS = [
  { label: "Unassigned", value: "unassigned" },
  { label: "Ana Silva", value: "ana" },
  { label: "Ravi Kumar", value: "ravi" },
];

export default function InvalidDemo() {
  return (
    <SelectField
      name="lead"
      label="Project lead"
      magnitude="md"
      options={MEMBERS}
      defaultValue="unassigned"
      error="A project lead is required before publishing."
    />
  );
}
