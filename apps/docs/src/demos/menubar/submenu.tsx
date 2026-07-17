import { Icon } from "@makeplane/propel/components/icon";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
} from "@makeplane/propel/components/menu";
import { Menubar, MenubarTrigger, MenubarTriggerLabel } from "@makeplane/propel/components/menubar";
import {
  FileOutput,
  FilePlus,
  FolderOpen,
  LayoutGrid,
  Printer,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function SubmenuDemo() {
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
          <MenuSubmenu>
            <MenuSubmenuTrigger icon={<Icon icon={FileOutput} tint="secondary" />} label="Export" />
            <MenuSubmenuContent sizing="sm">
              <MenuItem label="PDF" />
              <MenuItem label="PNG" />
              <MenuItem label="SVG" />
            </MenuSubmenuContent>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem icon={<Icon icon={Printer} tint="secondary" />} label="Print…" />
        </MenuContent>
      </Menu>
      <Menu>
        <MenubarTrigger>
          <MenubarTriggerLabel>View</MenubarTriggerLabel>
        </MenubarTrigger>
        <MenuContent sizing="sm">
          <MenuItem icon={<Icon icon={ZoomIn} tint="secondary" />} label="Zoom in" />
          <MenuItem icon={<Icon icon={ZoomOut} tint="secondary" />} label="Zoom out" />
          <MenuSeparator />
          <MenuSubmenu>
            <MenuSubmenuTrigger icon={<Icon icon={LayoutGrid} tint="secondary" />} label="Layout" />
            <MenuSubmenuContent sizing="sm">
              <MenuItem label="Single page" />
              <MenuItem label="Two pages" />
              <MenuItem label="Continuous" />
            </MenuSubmenuContent>
          </MenuSubmenu>
        </MenuContent>
      </Menu>
    </Menubar>
  );
}
