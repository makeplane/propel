import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  useFilter,
} from "@makeplane/propel/components/combobox";
import { Field, FieldLabel } from "@makeplane/propel/components/field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

const MEMBERS = ["Aaditya Kapoor", "Bianca Ferreira", "Marcus Chen", "Priya Nair", "Rohan Sharma"];

export default function AsyncSearchDemo() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  const [pending, setPending] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { contains } = useFilter();

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const trimmed = query.trim();
  const status = pending ? "Searching…" : trimmed === "" ? "Start typing to search members" : null;

  return (
    <Field name="reviewer">
      <Combobox
        items={results}
        // Built-in filtering is off: the (fake) server already returns only the matches.
        filter={null}
        onInputValueChange={(nextQuery, { reason }) => {
          setQuery(nextQuery);
          if (reason === "item-press") {
            return;
          }
          clearTimeout(timeoutRef.current);
          const trimmedQuery = nextQuery.trim();
          if (trimmedQuery === "") {
            setResults([]);
            setPending(false);
            return;
          }
          setPending(true);
          // Deterministic stand-in for a server search: resolves after a short delay.
          timeoutRef.current = setTimeout(() => {
            setResults(MEMBERS.filter((member) => contains(member, trimmedQuery)));
            setPending(false);
          }, 300);
        }}
      >
        <FieldLabel magnitude="md" inset={false}>
          Reviewer
        </FieldLabel>
        <ComboboxInputGroup
          magnitude="md"
          placeholder="e.g. Priya"
          clear={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Clear reviewer"
              icon={<Icon icon={X} />}
            />
          }
          trigger={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Open reviewer"
              icon={<Icon icon={ChevronsUpDown} />}
            />
          }
        />
        <ComboboxContent>
          <ComboboxStatus>{status}</ComboboxStatus>
          <ComboboxEmpty>{!pending && trimmed !== "" ? "No members match" : null}</ComboboxEmpty>
          <ComboboxList>
            {(member: string) => (
              <ComboboxItem key={member} value={member} magnitude="md" label={member} />
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
