import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldLabelRequiredMarkerVariants } from "./variants";

export type FieldLabelRequiredMarkerProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The required marker slot shown after a `FieldLabel`'s text. Decorative (the control's `required`
 * attribute carries the semantics), so it is `aria-hidden`. Bakes no glyph: pass the marker (e.g.
 * an asterisk) as `children`.
 */
export function FieldLabelRequiredMarker({ render, ...props }: FieldLabelRequiredMarkerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: fieldLabelRequiredMarkerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
