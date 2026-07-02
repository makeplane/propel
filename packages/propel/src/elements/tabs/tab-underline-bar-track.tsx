import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { underlineBarTrackVariants } from "./variants";

export type TabUnderlineBarTrackProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The padded track that holds an `underline`-appearance tab's sliding bar. Compose a
 * `<TabUnderlineBar />` inside it; owns the styled `<span>` so the underline track cva stays
 * internal.
 */
export function TabUnderlineBarTrack({ render, ...props }: TabUnderlineBarTrackProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: underlineBarTrackVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
