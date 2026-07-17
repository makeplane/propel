import { Icon } from "@makeplane/propel/components/icon";
import {
  List,
  ListItem,
  ListItemLink,
  ListSectionHeading,
} from "@makeplane/propel/components/list";
import { Bell, User, Users } from "lucide-react";

export default function SectionHeadingDemo() {
  return (
    <div className="flex flex-col gap-1">
      <ListSectionHeading>Members</ListSectionHeading>
      <List role="toolbar" aria-label="Members">
        <ListItem>
          <ListItemLink
            href="#profile"
            aria-current="page"
            icon={<Icon icon={User} magnitude="md" />}
            label="Profile"
          />
        </ListItem>
        <ListItem>
          <ListItemLink href="#teams" icon={<Icon icon={Users} magnitude="md" />} label="Teams" />
        </ListItem>
        <ListItem>
          <ListItemLink
            href="#notifications"
            icon={<Icon icon={Bell} magnitude="md" />}
            label="Notifications"
          />
        </ListItem>
      </List>
    </div>
  );
}
