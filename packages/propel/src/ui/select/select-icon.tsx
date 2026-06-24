import { Select as BaseSelect } from "@base-ui/react/select";

import { selectIconVariants } from "./variants";

export type SelectIconProps = Omit<BaseSelect.Icon.Props, "className" | "style">;

/**
 * The trailing chevron slot inside a trigger. Renders whatever svg you pass as `children` (sized to
 * the trigger's `--node-size`). Decorative — the trigger carries the a11y state.
 */
export function SelectIcon(props: SelectIconProps) {
  return <BaseSelect.Icon className={selectIconVariants()} {...props} />;
}
