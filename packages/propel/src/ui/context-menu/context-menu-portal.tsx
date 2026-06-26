import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuPortalProps = Omit<BaseContextMenu.Portal.Props, "className" | "style">;

/** Portals the popup out to `<body>` by default. Re-exports `ContextMenu.Portal` 1:1. */
export function ContextMenuPortal(props: ContextMenuPortalProps) {
  return <BaseContextMenu.Portal {...props} />;
}
