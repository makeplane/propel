import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "@makeplane/propel/components/autocomplete";

const GROUPED_LABELS = [
  { label: "Type", items: ["feature", "fix", "bug", "docs"] },
  { label: "Component", items: ["component: editor", "component: sidebar", "component: issues"] },
];

export default function GroupedDemo() {
  return (
    <Autocomplete items={GROUPED_LABELS}>
      <AutocompleteInputGroup magnitude="md" placeholder="e.g. feature" aria-label="Add label" />
      <AutocompleteContent>
        <AutocompleteEmpty>No matches</AutocompleteEmpty>
        <AutocompleteList>
          {(group: (typeof GROUPED_LABELS)[number]) => (
            <AutocompleteGroup key={group.label} items={group.items}>
              <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
              <AutocompleteCollection>
                {(label: string) => (
                  <AutocompleteItem key={label} value={label} magnitude="md">
                    {label}
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
