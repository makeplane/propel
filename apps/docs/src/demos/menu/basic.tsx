import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@makeplane/propel/components/menu";
import { Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";

export default function BasicDemo() {
  return (
    <Menu>
      <Button
        fillType="hug"
        variant="secondary"
        size="md"
        render={<MenuTrigger />}
        label="Actions"
      />
      <MenuContent sizing="sm">
        <MenuItem icon={<Icon icon={Pencil} tint="secondary" />} label="Edit" />
        <MenuItem icon={<Icon icon={Copy} tint="secondary" />} label="Make a copy" />
        <MenuItem icon={<Icon icon={ExternalLink} tint="secondary" />} label="Open in new tab" />
        <MenuSeparator />
        <MenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
      </MenuContent>
    </Menu>
  );
}
