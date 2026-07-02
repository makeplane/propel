import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { formVariants } from "./variants";

export type FormProps = Omit<useRender.ComponentProps<"form">, "className" | "style">;

/**
 * The styled form frame: a native `<form>` that lays out its regions (`FormBody`, `FormActions`)
 * with a consistent vertical rhythm; field spacing and the actions-bar treatment live on those
 * parts. Base-UI-agnostic — graft Base UI's consolidated form behavior in `components` via
 * `<BaseForm render={<Form/>} />`.
 */
export function Form({ render, ...props }: FormProps) {
  const defaultProps: useRender.ElementProps<"form"> = { className: formVariants() };
  return useRender({ defaultTagName: "form", render, props: mergeProps(defaultProps, props) });
}
