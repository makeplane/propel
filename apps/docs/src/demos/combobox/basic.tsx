import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
} from "@makeplane/propel/components/combobox";
import { Field, FieldLabel } from "@makeplane/propel/components/field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ChevronsUpDown, X } from "lucide-react";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

export default function BasicDemo() {
  return (
    <Field name="region">
      <Combobox items={REGIONS}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup
          magnitude="md"
          placeholder="e.g. eu-central-1"
          clear={
            <IconButton
              variant="ghost"
              size="md"
              aria-label="Clear region"
              icon={<Icon icon={X} />}
            />
          }
          trigger={
            <IconButton
              variant="ghost"
              size="md"
              aria-label="Open region"
              icon={<Icon icon={ChevronsUpDown} />}
            />
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {(region: string) => (
              <ComboboxItem key={region} value={region} magnitude="md" label={region} />
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
