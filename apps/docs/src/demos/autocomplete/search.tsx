import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "@makeplane/propel/components/autocomplete";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Search, X } from "lucide-react";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

export default function SearchDemo() {
  return (
    <Autocomplete items={IMAGES} mode="both">
      <AutocompleteInputGroup
        magnitude="md"
        icon={<Icon icon={Search} tint="placeholder" />}
        placeholder="Search images"
        aria-label="Search images"
        clear={
          <IconButton
            variant="ghost"
            size="md"
            aria-label="Clear search"
            icon={<Icon icon={X} />}
          />
        }
      />
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
    </Autocomplete>
  );
}
