import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
  useFilter,
} from "@makeplane/propel/components/autocomplete";
import { Icon } from "@makeplane/propel/components/icon";
import { Search } from "lucide-react";
import * as React from "react";

const PROJECTS = ["Design system", "Marketing site", "Mobile app", "Platform API"];

export default function AsyncSearchDemo() {
  const [value, setValue] = React.useState("");
  const [results, setResults] = React.useState<readonly string[]>([]);
  const [searching, setSearching] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { contains } = useFilter();

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <Autocomplete
      items={results}
      value={value}
      filter={null}
      onValueChange={(nextValue) => {
        setValue(nextValue);
        clearTimeout(timeoutRef.current);
        if (nextValue === "") {
          setSearching(false);
          setResults([]);
          return;
        }
        setSearching(true);
        timeoutRef.current = setTimeout(() => {
          setResults(PROJECTS.filter((project) => contains(project, nextValue)));
          setSearching(false);
        }, 300);
      }}
    >
      <AutocompleteInputGroup
        magnitude="md"
        icon={<Icon icon={Search} tint="placeholder" />}
        placeholder="Search projects"
        aria-label="Search projects"
      />
      <AutocompleteContent>
        <AutocompleteStatus>
          {searching
            ? "Searching…"
            : value !== "" && `${results.length} result${results.length === 1 ? "" : "s"}`}
        </AutocompleteStatus>
        <AutocompleteList>
          {(project: string) => (
            <AutocompleteItem key={project} value={project} magnitude="md">
              {project}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
