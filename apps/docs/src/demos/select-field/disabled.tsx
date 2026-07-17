import { SelectField } from "@makeplane/propel/components/select-field";

const PLANS = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

export default function DisabledDemo() {
  return (
    <SelectField
      name="plan"
      label="Workspace plan"
      description="Contact an admin to change your plan."
      magnitude="md"
      options={PLANS}
      defaultValue="pro"
      disabled
    />
  );
}
