import { cva, cx, type VariantProps } from "class-variance-authority";

// The label-button geometry shared by surfaces that wear the control chrome with a text label:
// `Button` (`<button>`) and `AnchorButton` (`<a>`). Owns the label row (gap/font), the per-magnitude
// height/min-width/padding/text + `--node-size` glyph scale (Figma "Buttons" Size), and full-width
// `sizing`. Compose with `controlChromeVariants` via `composeVariants`.
export const buttonGeometryVariants = cva(cx("gap-1 font-medium whitespace-nowrap"), {
  variants: {
    magnitude: {
      sm: "h-5 min-w-10 px-1.5 text-12 leading-none [--node-size:0.875rem]",
      md: "h-6 min-w-10 px-2 text-13 leading-none [--node-size:0.875rem]",
      lg: "h-7 min-w-12 px-2 text-13 leading-none [--node-size:1rem]",
      xl: "h-8 min-w-13 px-2 text-14 leading-none [--node-size:1rem]",
    },
    sizing: { hug: "", fill: "w-full" },
  },
});

export type ButtonGeometryVariantProps = VariantProps<typeof buttonGeometryVariants>;
