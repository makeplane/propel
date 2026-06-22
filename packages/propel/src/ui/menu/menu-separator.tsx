import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuSeparatorProps = Omit<BaseMenu.Separator.Props, "className" | "style">;

/** A thin divider between groups of items. */
export function MenuSeparator(props: MenuSeparatorProps) {
  return <BaseMenu.Separator className="-mx-1 my-1 border-t border-subtle" {...props} />;
}
