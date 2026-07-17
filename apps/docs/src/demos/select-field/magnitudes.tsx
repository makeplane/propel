import { SelectField } from "@makeplane/propel/components/select-field";

const VISIBILITY = [
  { label: "Private", value: "private" },
  { label: "Workspace", value: "workspace" },
  { label: "Public", value: "public" },
];

const MAGNITUDES = ["md", "lg", "xl"] as const;

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <SelectField
          key={magnitude}
          name={`visibility-${magnitude}`}
          label={magnitude}
          magnitude={magnitude}
          options={VISIBILITY}
          defaultValue="workspace"
        />
      ))}
    </div>
  );
}
