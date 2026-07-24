import { cva, cx, type VariantProps } from "class-variance-authority";

/**
 * The control chrome shared by the button-look surfaces built on Figma's button tokens — `Button`
 * and `IconButton` (both default to `<button>`; either can render as `<a>` via `render` +
 * `nativeButton={false}`). It owns the shared behavior base (focus ring, disabled affordance,
 * shape, transition) and the neutral/danger fill + border + text palette per `variant`. Each
 * surface's geometry (label padding vs square box) is its own local concern. Compose this with a
 * surface's local cva via `composeVariants`.
 *
 * `variant` folds Figma's Type (primary·secondary·tertiary·ghost) and the Error tone into one axis:
 * `danger` is the filled danger button (Figma primary Error), `danger-outline` the bordered one
 * (Figma secondary Error). Figma defines no danger palette for tertiary/ghost, so those pairs don't
 * exist here.
 *
 * Disabled / loading (Figma): filled primary (and filled danger) swap to the solid `layer-disabled`
 * pill; secondary / outline keep their surface and only mute border+text; tertiary / ghost drop the
 * fill entirely (transparent + muted text). Soft-disabled loading (`focusableWhenDisabled`) lands
 * `aria-disabled`/`aria-busy`, not native `disabled`, so every disabled palette key is mirrored on
 * those attrs too.
 */
export const controlChromeVariants = cva(
  cx(
    "group relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md",
    "transition-all duration-200 ease-out outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed",
    "aria-busy:pointer-events-none aria-busy:cursor-default",
  ),
  {
    variants: {
      variant: {
        primary: cx(
          "bg-accent-primary text-inverse",
          "hover:bg-accent-primary-hover active:bg-accent-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
          "aria-disabled:bg-layer-disabled aria-disabled:text-on-color-disabled",
          "aria-busy:bg-layer-disabled aria-busy:text-on-color-disabled",
        ),
        secondary: cx(
          "shadow-raised-100",
          "border border-strong bg-layer-2 text-secondary",
          "hover:bg-layer-2-hover active:bg-layer-2-active",
          // Figma: outlined pill stays but the fill drops to transparent when disabled (a leftover
          // `bg-layer-2` reads as a filled chip on non-canvas surfaces). Use `border-subtle` (not
          // `border-disabled`) — disabled token equals `--bg-canvas`, so the stroke would vanish on
          // the Storybook/page canvas.
          "disabled:border-subtle disabled:bg-transparent disabled:text-disabled disabled:shadow-none",
          "aria-disabled:border-subtle aria-disabled:bg-transparent aria-disabled:text-disabled aria-disabled:shadow-none",
          "aria-busy:border-subtle aria-busy:bg-transparent aria-busy:text-disabled aria-busy:shadow-none",
        ),
        tertiary: cx(
          "bg-layer-3 text-secondary",
          "hover:bg-layer-3-hover active:bg-layer-3-active",
          // Figma: disabled/loading drop the fill entirely — transparent + muted text.
          "disabled:bg-transparent disabled:text-disabled",
          "aria-disabled:bg-transparent aria-disabled:text-disabled",
          "aria-busy:bg-transparent aria-busy:text-disabled",
        ),
        ghost: cx(
          // Figma: transparent rest; hover/active use the transparent-alpha overlays so the fill
          // stays surface-agnostic (black alpha on light, white alpha on dark) instead of a solid
          // grey that only reads correctly on a light canvas.
          "bg-layer-transparent text-secondary",
          "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
          "disabled:bg-transparent disabled:text-disabled",
          "aria-disabled:bg-transparent aria-disabled:text-disabled",
          "aria-busy:bg-transparent aria-busy:text-disabled",
        ),
        danger: cx(
          "bg-danger-primary text-on-color",
          "hover:bg-danger-primary-hover active:bg-danger-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
          "aria-disabled:bg-layer-disabled aria-disabled:text-on-color-disabled",
          "aria-busy:bg-layer-disabled aria-busy:text-on-color-disabled",
        ),
        "danger-outline": cx(
          "shadow-raised-100",
          // Figma outline error: transparent rest, soft fill on hover/active; border stays danger.
          "border border-danger-strong bg-transparent text-danger-secondary",
          "hover:bg-danger-subtle active:bg-danger-subtle-active",
          // Same canvas clash as neutral secondary — `border-subtle` keeps the outline visible.
          "disabled:border-subtle disabled:bg-transparent disabled:text-disabled disabled:shadow-none",
          "aria-disabled:border-subtle aria-disabled:bg-transparent aria-disabled:text-disabled aria-disabled:shadow-none",
          "aria-busy:border-subtle aria-busy:bg-transparent aria-busy:text-disabled aria-busy:shadow-none",
        ),
      },
    },
  },
);

export type ControlChromeVariantProps = VariantProps<typeof controlChromeVariants>;

/**
 * The closed control-chrome variant set. Figma only defines danger on primary (fill) and secondary
 * (outline); tertiary/ghost have no danger palette — those combos would render unstyled base
 * chrome, so they are unrepresentable here.
 */
export type ControlChromeVariant = NonNullable<ControlChromeVariantProps["variant"]>;
