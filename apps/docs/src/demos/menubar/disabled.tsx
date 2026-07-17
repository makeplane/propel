import { Icon } from "@makeplane/propel/components/icon";
import { Menu, MenuContent, MenuItem, MenuSeparator } from "@makeplane/propel/components/menu";
import { Menubar, MenubarTrigger, MenubarTriggerLabel } from "@makeplane/propel/components/menubar";
import { FilePlus, FolderOpen, Save } from "lucide-react";

export default function DisabledDemo() {
  return (
    <Menubar>
      <Menu>
        <MenubarTrigger>
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<Icon icon={FilePlus} tint="secondary" />} label="New file" />
          <MenuItem icon={<Icon icon={FolderOpen} tint="secondary" />} label="Open…" />
          <MenuSeparator />
          <MenuItem icon={<Icon icon={Save} tint="secondary" />} label="Save" />
        </MenuContent>
      </Menu>
      <Menu disabled>
        <MenubarTrigger>
          <MenubarTriggerLabel>Help</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem label="Documentation" />
          <MenuItem label="Keyboard shortcuts" />
        </MenuContent>
      </Menu>
    </Menubar>
  );
}
