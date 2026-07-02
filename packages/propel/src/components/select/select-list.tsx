import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectListProps = Omit<BaseSelect.List.Props, "className" | "style">;

/**
 * The container for the select items — Base UI's `Select.List`, unstyled (the popup surface is
 * `SelectContent`; the rows are `SelectItem`s). A passthrough so consumers never import
 * `@base-ui/react/select` themselves.
 */
export function SelectList(props: SelectListProps) {
  return <BaseSelect.List {...props} />;
}
