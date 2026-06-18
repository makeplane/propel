import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

/** Portals the popup out to `<body>` by default. Re-exports `ContextMenu.Portal` 1:1. */
export const ContextMenuPortal = BaseContextMenu.Portal;
