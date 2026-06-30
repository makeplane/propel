import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { searchVariants, type SearchVariantProps } from "./variants";

export type SearchProps = Omit<useRender.ComponentProps<"label">, "className" | "style"> &
  SearchVariantProps;

/**
 * The search field box: a `<label>` wrapping the leading `SearchIcon`, the `SearchInput`, and an
 * optional trailing clear control (a ghost `IconButton`). Holds the border, radius, focus ring, and
 * `--node-size` that sizes the glyphs. Clicking anywhere in the box focuses the input.
 */
export function Search({ magnitude, render, ...props }: SearchProps) {
  const defaultProps: useRender.ElementProps<"label"> = {
    className: searchVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "label", render, props: mergeProps(defaultProps, props) });
}
