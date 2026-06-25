import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuPortalProps = Omit<BaseMenu.Portal.Props, "className" | "style">;

/** Portals the popup out to `<body>` by default. Re-exports `Menu.Portal` 1:1. */
export function MenuPortal(props: MenuPortalProps) {
  return <BaseMenu.Portal {...props} />;
}
