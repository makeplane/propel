import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { pillButtonVariants, type PillButtonVariantProps } from "./variants";

export type { PillButtonEmphasis, PillMagnitude } from "./variants";

export type PillButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  PillButtonVariantProps;

/**
 * The pill-shaped button container: a styled `<button>` with no baked content. Compose a
 * `PillLabel` and optional leading/trailing `Icon` (or `Spinner` while busy) inside it.
 * Base-UI-agnostic — graft the Base UI `Button` behavior in `components` via `<BaseButton
 * render={<PillButton/>} />`.
 */
export function PillButton({ magnitude, emphasis, render, ...props }: PillButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: pillButtonVariants({ magnitude, emphasis }),
    type: "button",
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
