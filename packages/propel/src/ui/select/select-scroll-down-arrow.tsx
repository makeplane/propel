import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectScrollDownArrowProps = Omit<
  BaseSelect.ScrollDownArrow.Props,
  "className" | "style"
>;

export function SelectScrollDownArrow(props: SelectScrollDownArrowProps) {
  return <BaseSelect.ScrollDownArrow {...props} />;
}
