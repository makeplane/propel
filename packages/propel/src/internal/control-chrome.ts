import { cva, cx, type VariantProps } from "class-variance-authority";

/**
 * The control chrome shared by the button-look surfaces built on Figma's button tokens — `Button`
 * and `IconButton` (both default to `<button>`; either can render as `<a>` via `render` +
 * `nativeButton={false}`). It owns the shared behavior base (focus ring, disabled affordance,
 * shape, transition) and the neutral/danger fill + border + text palette per `prominence`. Each
 * surface's geometry (label padding vs square box) is its own local concern. Compose this with a
 * surface's local cva via `composeVariants`.
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
          "aria-disabled:bg-layer-disabled aria-disabled:text-on-color-disabled",
          "aria-busy:bg-layer-disabled aria-busy:text-on-color-disabled",
        ),
      },
      {
        prominence: "secondary",
        tone: "neutral",
        className: cx(
          "border border-strong bg-layer-2 text-secondary",
          "hover:bg-layer-2-hover active:bg-layer-2-active",
          // Figma: outlined pill stays. Use `border-subtle` (not `border-disabled`) — disabled
          // token is the same as `--bg-canvas`, so the stroke vanishes on the Storybook/page canvas.
          "disabled:border-subtle disabled:bg-layer-2 disabled:text-disabled disabled:shadow-none",
          "aria-disabled:border-subtle aria-disabled:bg-layer-2 aria-disabled:text-disabled aria-disabled:shadow-none",
          "aria-busy:border-subtle aria-busy:bg-layer-2 aria-busy:text-disabled aria-busy:shadow-none",
        ),
      },
      {
        prominence: "tertiary",
        tone: "neutral",
        className: cx(
          "bg-layer-3 text-secondary",
          "hover:bg-layer-3-hover active:bg-layer-3-active",
          // Figma: disabled/loading drop the fill entirely — transparent + muted text.
          "disabled:bg-transparent disabled:text-disabled",
          "aria-disabled:bg-transparent aria-disabled:text-disabled",
          "aria-busy:bg-transparent aria-busy:text-disabled",
        ),
      },
      {
        prominence: "ghost",
        tone: "neutral",
        className: cx(
          // Figma: transparent rest; hover/active use the same solid light-grey ramp as tertiary
          // (not `layer-transparent-hover` — 4%/6% black alpha reads as “no fill” on white).
          "bg-layer-transparent text-secondary",
          "hover:bg-layer-3 active:bg-layer-3-hover",
          "disabled:bg-transparent disabled:text-disabled",
          "aria-disabled:bg-transparent aria-disabled:text-disabled",
          "aria-busy:bg-transparent aria-busy:text-disabled",
        ),
      },
      {
        prominence: "primary",
        tone: "danger",
        className: cx(
          "bg-danger-primary text-on-color",
          "hover:bg-danger-primary-hover active:bg-danger-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
          "aria-disabled:bg-layer-disabled aria-disabled:text-on-color-disabled",
          "aria-busy:bg-layer-disabled aria-busy:text-on-color-disabled",
        ),
      },
      {
        prominence: "secondary",
        tone: "danger",
        className: cx(
          // Figma outline error: transparent rest, soft fill on hover/active; border stays danger.
          "border border-danger-strong bg-transparent text-danger-secondary",
          "hover:bg-danger-subtle active:bg-danger-subtle-active",
          // Same canvas clash as neutral secondary — `border-subtle` keeps the outline visible.
          "disabled:border-subtle disabled:bg-transparent disabled:text-disabled disabled:shadow-none",
          "aria-disabled:border-subtle aria-disabled:bg-transparent aria-disabled:text-disabled aria-disabled:shadow-none",
          "aria-busy:border-subtle aria-busy:bg-transparent aria-busy:text-disabled aria-busy:shadow-none",
        ),
      },
    ],
  },
);

/**
 * Valid prominence × tone pairs for control chrome. Figma only defines danger on primary (fill) and
 * secondary (outline); tertiary/ghost have no danger palette — those combos would render unstyled
 * base chrome, so they are unrepresentable here.
 */
export type ControlChromePair =
  | { prominence: "primary" | "secondary"; tone: "neutral" | "danger" }
  | { prominence: "tertiary" | "ghost"; tone: "neutral" };

/**
 * Re-pair `prominence`/`tone` after destructuring a `ControlChromePair` union (TS widens the fields
 * independently). Pass the result into elements that take `ControlChromePair`.
 */
export function controlChromePair(props: ControlChromePair): ControlChromePair {
  if (props.prominence === "tertiary" || props.prominence === "ghost") {
    return { prominence: props.prominence, tone: "neutral" };
  }
  return { prominence: props.prominence, tone: props.tone };
}

export type ControlChromeVariantProps = VariantProps<typeof controlChromeVariants>;
