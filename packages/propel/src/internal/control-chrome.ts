import { cva, cx, type VariantProps } from "class-variance-authority";

/**
 * The control chrome shared by the button-look surfaces built on Figma's button tokens — `Button`
 * (`<button>`), `AnchorButton` (`<a>`), and `IconButton`. It owns the shared behavior base (focus
 * ring, disabled affordance, shape, transition) and the neutral/danger fill + border + text palette
 * per `prominence`. Each surface's geometry (label padding vs square box) is its own local concern.
 * Compose this with a surface's local cva via `composeVariants`.
 */
export const controlChromeVariants = cva(
  cx(
    "group relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md",
    "transition-all duration-200 ease-out outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "aria-busy:cursor-default",
  ),
  {
    variants: {
      prominence: { primary: "", secondary: "shadow-raised-100", tertiary: "", ghost: "" },
      tone: { neutral: "", danger: "" },
    },
    compoundVariants: [
      {
        prominence: "primary",
        tone: "neutral",
        className: cx(
          "bg-accent-primary text-inverse",
          "hover:bg-accent-primary-hover active:bg-accent-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      {
        prominence: "secondary",
        tone: "neutral",
        className: cx(
          "border border-strong bg-layer-2 text-secondary",
          "hover:bg-layer-2-hover active:bg-layer-2-active",
          "disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled disabled:shadow-none",
        ),
      },
      {
        prominence: "tertiary",
        tone: "neutral",
        className: cx(
          "bg-layer-3 text-secondary",
          "hover:bg-layer-3-hover active:bg-layer-3-active",
          "disabled:bg-layer-disabled disabled:text-disabled",
        ),
      },
      {
        prominence: "ghost",
        tone: "neutral",
        className: cx(
          "bg-layer-transparent text-secondary",
          "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
          "disabled:bg-transparent disabled:text-disabled",
        ),
      },
      {
        prominence: "primary",
        tone: "danger",
        className: cx(
          "bg-danger-primary text-on-color",
          "hover:bg-danger-primary-hover active:bg-danger-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      {
        prominence: "secondary",
        tone: "danger",
        className: cx(
          "border border-danger-strong bg-layer-2 text-danger-secondary",
          "hover:bg-danger-subtle active:border-danger-subtle active:bg-danger-subtle-active",
          "disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled disabled:shadow-none",
        ),
      },
    ],
  },
);

export type ControlChromeVariantProps = VariantProps<typeof controlChromeVariants>;
