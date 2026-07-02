import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, cx, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "./variant-props";

/**
 * The shared listbox option row, grafted onto any Base UI `*.Item` behavior in `components`
 * (`<BaseAutocomplete.Item render={<ListboxItem magnitude="md" />} value={…} />`). A grid row with
 * a leading indicator column, highlight/disabled states, and a magnitude axis for height + text
 * size.
 *
 * Byte-identical chrome across the `autocomplete`, `combobox`, and `select` families, so it lives
 * here rather than being copied per family (rule 4a). `autocomplete` and `combobox` were fixed at
 * the `md` step (`min-h-8` + `text-14`); `select` factors min-h/text to a magnitude axis. This
 * primitive keeps `md` equal to autocomplete's exact string and takes `sm`/`lg` from select.
 */
export const listboxItemVariants = cva(
  cx(
    "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm px-2 text-primary outline-none",
    "data-highlighted:bg-layer-transparent-hover data-highlighted:text-primary",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
  {
    variants: {
      // Figma "Size" axis: three row heights with matching text sizes. `md` reproduces the
      // autocomplete/combobox row exactly; `sm`/`lg` come from select's per-magnitude values.
      magnitude: {
        sm: "min-h-7 text-13",
        md: "min-h-8 text-14",
        lg: "min-h-9 text-14",
      },
    },
  },
);

export type ListboxItemMagnitude = NonNullable<
  VariantProps<typeof listboxItemVariants>["magnitude"]
>;

export type ListboxItemVariantProps = StrictVariantProps<typeof listboxItemVariants>;

export type ListboxItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ListboxItemVariantProps;

export function ListboxItem({ magnitude, render, ...props }: ListboxItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: listboxItemVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
