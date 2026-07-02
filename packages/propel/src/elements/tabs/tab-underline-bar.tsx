import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tabUnderlineBarVariants } from "./variants";

export type TabUnderlineBarProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The decorative bar beneath an `underline`-appearance tab's label: tints on hover and goes
 * transparent when active (the shared `TabsIndicator` takes over). Sits inside a
 * `TabUnderlineBarTrack`. Owns the styled `<span>` so the underline cva stays internal.
 */
export function TabUnderlineBar({ render, ...props }: TabUnderlineBarProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: tabUnderlineBarVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
