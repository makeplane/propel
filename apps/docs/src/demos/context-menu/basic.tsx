import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@makeplane/propel/components/context-menu";
import { Icon } from "@makeplane/propel/components/icon";
import { Shortcut } from "@makeplane/propel/components/shortcut";
import { ClipboardPaste, Copy, Scissors, Trash2 } from "lucide-react";

export default function BasicDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<div />}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          tone="neutral"
          icon={<Icon icon={Scissors} />}
          aria-keyshortcuts="Meta+X"
          endContent={<Shortcut keys="⌘X" />}
          label="Cut"
        />
        <ContextMenuItem
          tone="neutral"
          icon={<Icon icon={Copy} />}
          aria-keyshortcuts="Meta+C"
          endContent={<Shortcut keys="⌘C" />}
          label="Copy"
        />
        <ContextMenuItem
          tone="neutral"
          icon={<Icon icon={ClipboardPaste} />}
          aria-keyshortcuts="Meta+V"
          endContent={<Shortcut keys="⌘V" />}
          label="Paste"
        />
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
      </ContextMenuContent>
    </ContextMenu>
  );
}
