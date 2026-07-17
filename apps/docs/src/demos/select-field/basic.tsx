import { SelectField } from "@makeplane/propel/components/select-field";

const ROLES = [
  { label: "Admin", value: "admin" },
  { label: "Member", value: "member" },
  { label: "Guest", value: "guest" },
];

export default function BasicDemo() {
  return (
    <SelectField
      name="role"
      label="Member role"
      description="Choose the default role for new members."
      magnitude="md"
      options={ROLES}
      defaultValue="member"
      hint="You can change this later."
    />
  );
}
