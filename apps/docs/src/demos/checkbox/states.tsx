import { Checkbox } from "@makeplane/propel/components/checkbox";

export default function StatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Checkbox label="Watch project" />
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Select all members" indeterminate />
      <Checkbox label="Archived project" disabled />
      <Checkbox label="Workspace owner" disabled defaultChecked />
    </div>
  );
}
