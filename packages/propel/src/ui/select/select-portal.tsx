import { Select as BaseSelect } from "@base-ui/react/select";

export type SelectPortalProps = Omit<BaseSelect.Portal.Props, "className" | "style">;

export function SelectPortal(props: SelectPortalProps) {
  return <BaseSelect.Portal {...props} />;
}
