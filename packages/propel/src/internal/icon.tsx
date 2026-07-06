import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "./node-slot";
import { type StrictVariantProps } from "./variant-props";

/**
 * The shared decorative glyph slot (rule 4a): an `aria-hidden` `<span>` that sizes its single svg
 * child to the inherited `--node-size`. Before this, seventeen families each kept a byte-identical
 * `<Family>Icon` part differing only in tint or a local node size — those are gone; `components`
 * ready-mades and stories compose this one. A family keeps its OWN icon part only when its styling
 * is genuinely distinct (toast/banner/alert-dialog tones, avatar's magnitude scale, the
 * autocomplete/combobox focus-brightening, navigation-menu's Base-UI-named rotating `Icon`).
 *
 * Both axes carry a real default (`inherit` — rule 12's sanctioned mechanism): an icon slot's size
 * and color normally come from its container's `--node-size` and `currentColor`.
 */
const iconDefaultVariants = {
  tint: "inherit",
  magnitude: "inherit",
} as const;

export const iconVariants = cva(nodeSlotClass, {
  variants: {
    tint: {
      inherit: "",
      danger: "text-danger-primary",
      placeholder:
        "text-icon-placeholder transition-colors group-focus-within/control:text-icon-secondary",
      secondary: "text-icon-secondary",
      tertiary: "text-icon-tertiary",
    },
    magnitude: {
      inherit: "",
      sm: "[--node-size:0.875rem]",
      md: "[--node-size:1rem]",
    },
  },
  defaultVariants: iconDefaultVariants,
});

type IconVariantConfig = VariantProps<typeof iconVariants>;
export type IconTint = NonNullable<IconVariantConfig["tint"]>;
export type IconMagnitude = NonNullable<IconVariantConfig["magnitude"]>;

export type IconVariantProps = StrictVariantProps<
  typeof iconVariants,
  keyof typeof iconDefaultVariants
>;

export type IconProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  IconVariantProps;

export function Icon({ tint, magnitude, render, ...props }: IconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: iconVariants({ tint, magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
