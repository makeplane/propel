import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
} from "@makeplane/propel/components/context-menu";
import { Icon } from "@makeplane/propel/components/icon";
import { Copy, FolderInput, PencilLine, Trash2 } from "lucide-react";

export default function SubmenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<div />}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem tone="neutral" icon={<Icon icon={PencilLine} />} label="Rename" />
        <ContextMenuItem tone="neutral" icon={<Icon icon={Copy} />} label="Duplicate" />
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger
            tone="neutral"
            icon={<Icon icon={FolderInput} />}
            label="Move to"
          />
          <ContextMenuContent>
            <ContextMenuItem tone="neutral" label="Mobile app" />
            <ContextMenuItem tone="neutral" label="Web app" />
            <ContextMenuItem tone="neutral" label="Design system" />
          </ContextMenuContent>
        </ContextMenuSubmenu>
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
      </ContextMenuContent>
    </ContextMenu>
  );
}
