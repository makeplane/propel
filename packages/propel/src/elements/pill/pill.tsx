import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { pillButtonVariants, type PillButtonVariantProps } from "./variants";

export type { PillMagnitude } from "./variants";

export type PillButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  PillButtonVariantProps;

/**
 * The pill-shaped button container: a styled `<button>` with no baked content. Compose a
 * `PillLabel` and optional leading/trailing `PillIcon` (or `PillSpinner`) inside it.
 * Base-UI-agnostic — graft the Base UI `Button` behavior in `components` via `<BaseButton
 * render={<PillButton/>} />`.
 */
export function PillButton({ magnitude, render, ...props }: PillButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: pillButtonVariants({ magnitude }),
    type: "button",
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
