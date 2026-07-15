import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectTrigger,
} from "@makeplane/propel/components/select";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

export default function BasicDemo() {
  return (
    <Select items={SERVER_TYPES} defaultValue="general">
      <SelectField>
        <SelectLabel>Server type</SelectLabel>
        <SelectTrigger magnitude="md" />
      </SelectField>
      <SelectContent>
        <SelectList>
          {SERVER_TYPES.map(({ label, value }) => (
            <SelectItem key={value} value={value} magnitude="md" label={label} />
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}
