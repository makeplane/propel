import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@makeplane/propel/components/context-menu";
import { Icon } from "@makeplane/propel/components/icon";
import { Shortcut } from "@makeplane/propel/components/shortcut";
import { Copy, ExternalLink, Link2 } from "lucide-react";

export default function LinkItemsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<div />}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLinkItem
          tone="neutral"
          icon={<Icon icon={ExternalLink} />}
          href="#work-item"
          target="_blank"
          rel="noopener noreferrer"
          label="Open in new tab"
        />
        <ContextMenuLinkItem
          tone="neutral"
          icon={<Icon icon={Link2} />}
          href="#activity"
          label="Go to activity"
        />
        <ContextMenuSeparator />
        <ContextMenuItem
          tone="neutral"
          icon={<Icon icon={Copy} />}
          aria-keyshortcuts="Meta+C"
          endContent={<Shortcut keys="⌘C" />}
          label="Copy link"
        />
      </ContextMenuContent>
    </ContextMenu>
  );
}
