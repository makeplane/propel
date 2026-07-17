import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "@makeplane/propel/components/autocomplete";
import { Icon } from "@makeplane/propel/components/icon";
import { Search } from "lucide-react";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// A subsequence matcher: every query character must appear in the item, in order — so partial or
// skipped-letter queries ("ngx", "pstgrs") still find their item.
function fuzzyMatch(item: string, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle === "") {
    return true;
  }
  let matched = 0;
  for (const char of item.toLowerCase()) {
    if (char === needle[matched]) {
      matched += 1;
    }
    if (matched === needle.length) {
      return true;
    }
  }
  return false;
}

export default function FuzzyMatchingDemo() {
  return (
    <Autocomplete items={IMAGES} filter={fuzzyMatch}>
      <AutocompleteInputGroup
        magnitude="md"
        icon={<Icon icon={Search} tint="placeholder" />}
        placeholder="Search images"
        aria-label="Search images"
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
