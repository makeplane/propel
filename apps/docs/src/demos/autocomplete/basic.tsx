import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "@makeplane/propel/components/autocomplete";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@makeplane/propel/components/field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ChevronsUpDown, X } from "lucide-react";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

export default function BasicDemo() {
  return (
    <Field name="containerImage">
      <Autocomplete items={IMAGES} mode="both" required>
        <FieldLabel magnitude="md" inset={false}>
          Container image
        </FieldLabel>
        <AutocompleteInputGroup
          magnitude="md"
          placeholder="e.g. docker.io/library/node:latest"
          clear={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Clear container image"
              icon={<Icon icon={X} />}
            />
          }
          trigger={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Open container image"
              icon={<Icon icon={ChevronsUpDown} />}
            />
          }
        />
        <FieldDescription magnitude="md">Enter a registry URL with optional tags.</FieldDescription>
        <AutocompleteContent>
          <AutocompleteEmpty>No matches</AutocompleteEmpty>
          <AutocompleteList>
            {(image: string) => (
              <AutocompleteItem key={image} value={image} magnitude="md">
                {image}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
        <FieldError magnitude="md" />
      </Autocomplete>
    </Field>
  );
}
