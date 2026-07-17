import { Icon } from "@makeplane/propel/components/icon";
import { List, ListItem, ListItemLink, ListSection } from "@makeplane/propel/components/list";
import { LayoutGrid, Settings } from "lucide-react";
import * as React from "react";

export default function ControlledDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <ListSection label="Workspace" indicator open={open} onOpenChange={(next) => setOpen(next)}>
      <List role="toolbar" aria-label="Workspace">
        <ListItem>
          <ListItemLink
            href="#projects"
            aria-current="page"
            icon={<Icon icon={LayoutGrid} magnitude="md" />}
            label="Projects"
          />
        </ListItem>
        <ListItem>
          <ListItemLink
            href="#settings"
            icon={<Icon icon={Settings} magnitude="md" />}
            label="Settings"
          />
        </ListItem>
      </List>
    </ListSection>
  );
}
