import { Icon } from "@makeplane/propel/components/icon";
import { Menu, MenuContent, MenuItem, MenuSeparator } from "@makeplane/propel/components/menu";
import { Menubar, MenubarTrigger, MenubarTriggerLabel } from "@makeplane/propel/components/menubar";
import {
  Copy,
  FilePen,
  FilePlus,
  FolderOpen,
  Pencil,
  Redo2,
  Save,
  Scissors,
  Undo2,
} from "lucide-react";

export default function BasicDemo() {
  return (
    <Menubar>
      <Menu>
        <MenubarTrigger>
          <Icon icon={FilePen} tint="secondary" />
          <MenubarTriggerLabel>File</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<Icon icon={FilePlus} tint="secondary" />} label="New file" />
          <MenuItem icon={<Icon icon={FolderOpen} tint="secondary" />} label="Open…" />
          <MenuSeparator />
          <MenuItem icon={<Icon icon={Save} tint="secondary" />} label="Save" />
        </MenuContent>
      </Menu>
      <Menu>
        <MenubarTrigger>
          <Icon icon={Pencil} tint="secondary" />
          <MenubarTriggerLabel>Edit</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<Icon icon={Undo2} tint="secondary" />} label="Undo" />
          <MenuItem icon={<Icon icon={Redo2} tint="secondary" />} label="Redo" />
          <MenuSeparator />
          <MenuItem icon={<Icon icon={Scissors} tint="secondary" />} label="Cut" />
          <MenuItem icon={<Icon icon={Copy} tint="secondary" />} label="Copy" />
        </MenuContent>
      </Menu>
    </Menubar>
  );
}
