import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { pillSpinnerVariants } from "./variants";

export type PillSpinnerProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The busy spinner shown in place of a leading/trailing node while a pill is loading. A node-slot:
 * it sizes and spins its single child (the ready-made pills pass a `LoaderCircle`), sized to the
 * pill's inherited `--node-size`. Decorative, so it is `aria-hidden`.
 */
export function PillSpinner({ render, ...props }: PillSpinnerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: pillSpinnerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
