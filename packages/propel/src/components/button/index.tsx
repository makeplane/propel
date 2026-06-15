import { cva, cx, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";
import { nodeSlotClass } from "../../internal/node-slot";

// Magnitudes follow the Figma "Buttons" Size scale. Figma ships S/Base/L/XL; those
// map to sm/md/lg/xl by their px heights (20/24/28/32). Per Figma:
// S -> text-12/px-1.5; Base & L -> text-13; XL -> text-14. All chrome'd magnitudes
// use leading-none so the flex-centered label sits dead-center in the fixed height.
export const buttonVariants = cva(
  // Shared chrome: inline flex row, centered, focus-visible ring on the brand
  // accent token, real disabled affordance, and a snug medium label.
  cx(
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md font-medium",
    "whitespace-nowrap outline-none transition-colors",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:cursor-not-allowed aria-busy:cursor-default",
  ),
  {
    variants: {
      // Figma "Type". Primary/secondary/tertiary/ghost are the neutral fills; link
      // is the inline text affordance. The danger palette is selected via `tone`.
      variant: {
        primary: "",
        // No border color here: the border color is owned by the tone compounds
        // below (neutral -> border-strong, danger -> border-danger-strong), because
        // a base color would be order-fragile against the tone color under cx.
        secondary: "shadow-raised-100",
        tertiary: "",
        ghost: "",
        link: "underline underline-offset-2",
      },
      // Neutral by default; `danger` swaps in the Figma "Error" palette.
      tone: {
        neutral: "",
        danger: "",
      },
      // Link-only axis (Figma "Emphasis"). `solid` is the blue `link/primary`
      // affordance; `subtle` is the muted gray inline link. It only changes the
      // appearance of `variant="link"`; every other variant ignores it.
      emphasis: {
        solid: "",
        subtle: "",
      },
      // `leading-none` collapses each label's line box to the glyph height so
      // the flex `items-center` truly centers it inside the fixed-height button;
      // any larger line-height (e.g. `leading-snug`) inflates the line box and
      // makes the top/bottom padding read as uneven. Link overrides below opt
      // back into a taller line-height since inline link text may wrap.
      // Each magnitude also sets `--node-size`, the size every leading/trailing node
      // (icon, avatar, ...) renders at. Per Figma's per-size icon values: 14px up to
      // Base, 16px from L up. The slots and the loading spinner read this variable, so
      // the button owns its node sizing in one place.
      magnitude: {
        sm: "h-5 min-w-10 px-1.5 text-12 leading-none [--node-size:0.875rem]",
        md: "h-6 min-w-10 px-2 text-13 leading-none [--node-size:0.875rem]",
        lg: "h-7 min-w-12 px-2 text-13 leading-none [--node-size:1rem]",
        xl: "h-8 min-w-13 px-2 text-14 leading-none [--node-size:1rem]",
      },
    },
    compoundVariants: [
      // ----- Neutral solid (Figma Type=Primary) -----
      {
        variant: "primary",
        tone: "neutral",
        className: cx(
          "bg-accent-primary text-on-color",
          "hover:bg-accent-primary-hover active:bg-accent-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      // ----- Neutral outline (Figma Type=Secondary) -----
      {
        variant: "secondary",
        tone: "neutral",
        className: cx(
          "border border-strong bg-layer-2 text-secondary",
          "hover:bg-layer-2-hover active:bg-layer-2-active",
          "disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled disabled:shadow-none",
        ),
      },
      // ----- Neutral soft (Figma Type=Tertiary) -----
      {
        variant: "tertiary",
        tone: "neutral",
        className: cx(
          "bg-layer-3 text-secondary",
          "hover:bg-layer-3-hover active:bg-layer-3-active",
          "disabled:bg-layer-disabled disabled:text-disabled",
        ),
      },
      // ----- Neutral ghost (Figma Type=Ghost) -----
      {
        variant: "ghost",
        tone: "neutral",
        className: cx(
          "bg-layer-transparent text-secondary",
          "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
          "disabled:bg-transparent disabled:text-disabled",
        ),
      },
      // ----- Neutral link, solid (Figma Type=Link, Emphasis=solid) -----
      // The blue `link/primary` affordance.
      {
        variant: "link",
        tone: "neutral",
        emphasis: "solid",
        className: cx(
          "min-w-0 px-0 text-link-primary hover:text-link-primary-hover",
          "disabled:text-disabled disabled:no-underline",
        ),
      },
      // ----- Neutral link, subtle (Figma Type=Link, Emphasis=subtle) -----
      // The muted gray inline link. Uses `text-secondary` (#4e5355) to match
      // Figma and clear AA contrast — NOT the lighter `link-secondary` token.
      {
        variant: "link",
        tone: "neutral",
        emphasis: "subtle",
        className: cx(
          "min-w-0 px-0 text-secondary hover:text-primary",
          "disabled:text-disabled disabled:no-underline",
        ),
      },
      // Link size overrides: link has no chrome/height, so reset to inline text.
      { variant: "link", magnitude: "sm", className: "h-auto leading-snug" },
      { variant: "link", magnitude: "md", className: "h-auto" },
      { variant: "link", magnitude: "lg", className: "h-auto" },
      { variant: "link", magnitude: "xl", className: "h-auto" },
      // ----- Danger solid (Figma Type=Error Fill) -----
      {
        variant: "primary",
        tone: "danger",
        className: cx(
          "bg-danger-primary text-on-color",
          "hover:bg-danger-primary-hover active:bg-danger-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      // ----- Danger outline (Figma Type=Error Outline) -----
      {
        variant: "secondary",
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

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonTone = NonNullable<VariantProps<typeof buttonVariants>["tone"]>;
export type ButtonMagnitude = NonNullable<VariantProps<typeof buttonVariants>["magnitude"]>;
export type ButtonEmphasis = NonNullable<VariantProps<typeof buttonVariants>["emphasis"]>;

type ButtonOwnProps = {
  variant: ButtonVariant;
  tone: ButtonTone;
  magnitude: ButtonMagnitude;
  /**
   * Link-only: picks the `link` look. `solid` is the blue `link/primary` style;
   * `subtle` is the muted gray inline link. Optional and additive — it only
   * affects `variant="link"`, so it has no default and every other `variant`
   * ignores it.
   */
  emphasis?: ButtonEmphasis;
  /**
   * Node rendered before the label (inline-start). An icon, avatar, or any node;
   * it is sized to the button's `--node-size`. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
  /**
   * Node rendered after the label (inline-end). An icon, avatar, or any node; it is
   * sized to the button's `--node-size`. Decorative, kept out of the name.
   */
  inlineEndNode?: React.ReactNode;
  /** Shows a spinner, sets `aria-busy`, and makes the button non-interactive. */
  loading?: boolean;
};

export type ButtonProps = Omit<React.ComponentProps<"button">, "className" | "style"> &
  ButtonOwnProps;

/**
 * A plain accessible button built on propel's design tokens. Pick a look with
 * `variant` (Figma Type), select the error palette with `tone`, and size it with
 * `magnitude` — all required, so consumers choose explicitly. For
 * `variant="link"` only, optionally choose `solid` (blue) or `subtle` (gray)
 * with `emphasis`. Content — `children`, `inlineStartNode`/`inlineEndNode`,
 * `loading` — is not a variant.
 */
export function Button({
  variant,
  tone,
  magnitude,
  emphasis,
  inlineStartNode,
  inlineEndNode,
  loading = false,
  disabled,
  type = "button",
  children,
  onClick,
  ...props
}: ButtonProps) {
  // `loading` is a soft-disabled state: it shows a spinner and must not fire
  // clicks, but stays a real (focusable) button so screen readers announce the
  // busy state via `aria-busy` + `aria-disabled`. `disabled` is the hard,
  // non-focusable state and is the only thing that sets the native attribute.
  // The spinner and both node slots size to the button's `--node-size`.
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={buttonVariants({ variant, tone, magnitude, emphasis })}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden className="size-[var(--node-size)] animate-spin" />
      ) : inlineStartNode ? (
        <span aria-hidden className={nodeSlotClass}>
          {inlineStartNode}
        </span>
      ) : null}
      {children}
      {!loading && inlineEndNode ? (
        <span aria-hidden className={nodeSlotClass}>
          {inlineEndNode}
        </span>
      ) : null}
    </button>
  );
}
