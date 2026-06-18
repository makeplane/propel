import { MenuContent, type MenuContentProps } from "../menu/index";

export type BreadcrumbMenuContentProps = MenuContentProps;

/** The menu surface for a `BreadcrumbMenu`. */
export function BreadcrumbMenuContent(props: BreadcrumbMenuContentProps) {
  return <MenuContent {...props} />;
}
