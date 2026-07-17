import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectTrigger,
  type SelectTriggerMagnitude,
} from "@makeplane/propel/components/select";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

const MAGNITUDES: SelectTriggerMagnitude[] = ["sm", "md", "lg"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Select key={magnitude} items={SERVER_TYPES} defaultValue="general">
          <SelectField>
            <SelectLabel>{magnitude}</SelectLabel>
            <SelectTrigger magnitude={magnitude} />
          </SelectField>
          <SelectContent>
            <SelectList>
              {SERVER_TYPES.map(({ label, value }) => (
                <SelectItem key={value} value={value} magnitude={magnitude} label={label} />
              ))}
            </SelectList>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
