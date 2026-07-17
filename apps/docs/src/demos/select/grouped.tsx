import {
  Select,
  SelectContent,
  SelectField,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectTrigger,
} from "@makeplane/propel/components/select";

const REGION_GROUPS = [
  {
    label: "Americas",
    items: [
      { label: "US Central 1", value: "us-central-1" },
      { label: "US East 1", value: "us-east-1" },
    ],
  },
  {
    label: "Europe",
    items: [
      { label: "EU Central 1", value: "eu-central-1" },
      { label: "EU West 1", value: "eu-west-1" },
    ],
  },
];

export default function GroupedDemo() {
  return (
    <Select items={REGION_GROUPS.flatMap((group) => group.items)} defaultValue="us-central-1">
      <SelectField>
        <SelectLabel>Region</SelectLabel>
        <SelectTrigger magnitude="md" />
      </SelectField>
      <SelectContent>
        <SelectList>
          {REGION_GROUPS.map((group) => (
            <SelectGroup key={group.label}>
              <SelectGroupLabel>{group.label}</SelectGroupLabel>
              {group.items.map(({ label, value }) => (
                <SelectItem key={value} value={value} magnitude="md" label={label} />
              ))}
            </SelectGroup>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}
