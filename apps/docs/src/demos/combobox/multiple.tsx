import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@makeplane/propel/components/combobox";
import { Field, FieldLabel } from "@makeplane/propel/components/field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { X } from "lucide-react";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

export default function MultipleDemo() {
  return (
    <Field name="regions">
      <Combobox multiple items={REGIONS} defaultValue={["us-east-1", "eu-central-1"]}>
        <FieldLabel magnitude="md" inset={false}>
          Regions
        </FieldLabel>
        <ComboboxChips magnitude="md" placeholder="Add a region">
          {(region: string) => (
            <ComboboxChip
              key={region}
              label={region}
              remove={
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label={`Remove ${region}`}
                  icon={<Icon icon={X} />}
                />
              }
            />
          )}
        </ComboboxChips>
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
