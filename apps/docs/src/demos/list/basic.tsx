import { Icon } from "@makeplane/propel/components/icon";
import { List, ListItem, ListItemButton, ListItemLink } from "@makeplane/propel/components/list";
import { Ellipsis, Inbox, LayoutGrid, Settings } from "lucide-react";

export default function BasicDemo() {
  return (
    <List role="toolbar" aria-label="Workspace">
      <ListItem>
        <ListItemLink href="#inbox" icon={<Icon icon={Inbox} magnitude="md" />} label="Inbox" />
      </ListItem>
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
      <ListItem>
        <ListItemButton icon={<Icon icon={Ellipsis} magnitude="md" />} label="More" />
      </ListItem>
    </List>
  );
}
