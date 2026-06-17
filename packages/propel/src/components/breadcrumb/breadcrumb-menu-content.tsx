import { DropdownContent, type DropdownContentProps } from "../dropdown/index";

export type BreadcrumbMenuContentProps = DropdownContentProps;

/** The menu surface for a `BreadcrumbMenu`. */
export function BreadcrumbMenuContent(props: BreadcrumbMenuContentProps) {
  return <DropdownContent {...props} />;
}
