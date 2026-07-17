import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
} from "@makeplane/propel/components/combobox";
import { Field, FieldLabel } from "@makeplane/propel/components/field";

const GROUPED_REGIONS = [
  { label: "Americas", items: ["us-central-1", "us-east-1", "sa-east-1"] },
  { label: "Europe", items: ["eu-central-1", "eu-west-1"] },
  { label: "Asia Pacific", items: ["ap-west-1", "ap-southeast-2"] },
];

export default function GroupedDemo() {
  return (
    <Field name="region">
      <Combobox items={GROUPED_REGIONS}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup magnitude="md" placeholder="e.g. eu-central-1" />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof GROUPED_REGIONS)[number]) => (
              <ComboboxGroup key={group.label} items={group.items}>
                <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(region: string) => (
                    <ComboboxItem key={region} value={region} magnitude="md" label={region} />
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
