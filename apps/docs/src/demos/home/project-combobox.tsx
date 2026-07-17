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

const PROJECT_GROUPS = [
  { label: "Engineering", items: ["Propel", "API platform", "Mobile app"] },
  { label: "Design", items: ["Design system", "Website refresh"] },
  { label: "Operations", items: ["Onboarding", "Quarterly planning"] },
];

export default function ProjectComboboxDemo() {
  return (
    <div className="w-full max-w-64">
      <Field name="project">
        <Combobox items={PROJECT_GROUPS}>
          <FieldLabel magnitude="md" inset={false}>
            Project
          </FieldLabel>
          <ComboboxInputGroup magnitude="md" placeholder="Search projects…" />
          <ComboboxContent>
            <ComboboxEmpty>No matches</ComboboxEmpty>
            <ComboboxList>
              {(group: (typeof PROJECT_GROUPS)[number]) => (
                <ComboboxGroup key={group.label} items={group.items}>
                  <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(project: string) => (
                      <ComboboxItem key={project} value={project} magnitude="md" label={project} />
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  );
}
