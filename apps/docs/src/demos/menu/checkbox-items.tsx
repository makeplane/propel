import { Button } from "@makeplane/propel/components/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuSearch,
  MenuTrigger,
} from "@makeplane/propel/components/menu";
import * as React from "react";

const PROPERTIES = [
  { key: "assignee", label: "Assignee" },
  { key: "priority", label: "Priority" },
  { key: "due_date", label: "Due date" },
  { key: "labels", label: "Labels" },
  { key: "start_date", label: "Start date" },
] as const;

export default function CheckboxItemsDemo() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    assignee: true,
    priority: true,
  });
  const [query, setQuery] = React.useState("");
  const visible = PROPERTIES.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <Menu>
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="md"
        render={<MenuTrigger />}
        label="Display properties"
      />
      <MenuContent
        sizing="sm"
        search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
      >
        {visible.map((p) => (
          <MenuCheckboxItem
            key={p.key}
            checked={Boolean(checked[p.key])}
            onCheckedChange={(next) => setChecked((c) => ({ ...c, [p.key]: next }))}
            label={p.label}
          />
        ))}
      </MenuContent>
    </Menu>
  );
}
