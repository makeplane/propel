import { cva, cx, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";

// Magnitudes follow the Figma "Buttons" Size scale. Figma ships S/Base/L/XL; those
// map to sm/md/lg/xl by their px heights (20/24/28/32). `xs` is an extra smaller
// step (16px) extrapolated below the Figma scale for dense toolbars. Per Figma:
// S → text-12/leading-1.2/px-1.5; Base & L → text-13/leading-snug; XL → text-14.
const buttonVariants = cva(
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
        secondary: "border-strong shadow-raised-100",
        tertiary: "",
        ghost: "",
        link: "underline underline-offset-2",
      },
      // Neutral by default; `danger` swaps in the Figma "Error" palette.
      tone: {
        neutral: "",
        danger: "",
      },
      // Figma fill style. `solid` is a filled button, `outline` is a bordered
      // button on a layer surface, `soft` is a tinted fill with no border.
      emphasis: {
        solid: "",
        outline: "border-strong",
        soft: "",
      },
      magnitude: {
        xs: "h-4 min-w-7 px-1.5 text-11 leading-none",
        sm: "h-5 min-w-10 px-1.5 text-12 leading-none",
        md: "h-6 min-w-10 px-2 text-13 leading-snug",
        lg: "h-7 min-w-12 px-2 text-13 leading-snug",
        xl: "h-8 min-w-13 px-2 text-14 leading-snug",
      },
    },
    compoundVariants: [
      // ----- Neutral solid (Figma Type=Primary) -----
      {
        variant: "primary",
        tone: "neutral",
        emphasis: "solid",
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
          "border bg-layer-2 text-secondary",
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
      // ----- Neutral link (Figma Type=Link, Emphasis=Default) -----
      {
        variant: "link",
        tone: "neutral",
        className: cx(
          "min-w-0 px-0 text-link-primary hover:text-link-primary-hover",
          "disabled:text-disabled disabled:no-underline",
        ),
      },
      // Link size overrides: link has no chrome/height, so reset to inline text.
      { variant: "link", magnitude: "xs", className: "h-auto leading-snug" },
      { variant: "link", magnitude: "sm", className: "h-auto leading-snug" },
      { variant: "link", magnitude: "md", className: "h-auto" },
      { variant: "link", magnitude: "lg", className: "h-auto" },
      { variant: "link", magnitude: "xl", className: "h-auto" },
      // Subtle link emphasis (Figma Type=Link, Emphasis=Subtle) → secondary color.
      {
        variant: "link",
        tone: "neutral",
        emphasis: "soft",
        className: "text-link-secondary hover:text-link-primary-hover",
      },
      // ----- Danger solid (Figma Type=Error Fill) -----
      {
        variant: "primary",
        tone: "danger",
        emphasis: "solid",
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
          "hover:bg-danger-subtle active:bg-danger-subtle-active",
          "disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled disabled:shadow-none",
        ),
      },
    ],
    defaultVariants: {
      variant: "primary",
      tone: "neutral",
      emphasis: "solid",
      magnitude: "md",
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonTone = NonNullable<VariantProps<typeof buttonVariants>["tone"]>;
export type ButtonEmphasis = NonNullable<VariantProps<typeof buttonVariants>["emphasis"]>;
export type ButtonMagnitude = NonNullable<VariantProps<typeof buttonVariants>["magnitude"]>;

// Leading/trailing slot icon size per magnitude, straight from Figma's per-size
// icon values (14px up to Base, 16px from L up). 16px extra-small step uses 12px.
const iconSizeByMagnitude: Record<ButtonMagnitude, string> = {
  xs: "size-3", // 12px
  sm: "size-3.5", // 14px
  md: "size-3.5", // 14px
  lg: "size-4", // 16px
  xl: "size-4", // 16px
};

type ButtonOwnProps = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  emphasis?: ButtonEmphasis;
  magnitude?: ButtonMagnitude;
  /** Icon rendered before the label. Decorative — kept out of the accessible name. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label. Decorative — kept out of the accessible name. */
  trailingIcon?: React.ReactNode;
  /** Shows a spinner, sets `aria-busy`, and makes the button non-interactive. */
  loading?: boolean;
};

export type ButtonProps = Omit<React.ComponentProps<"button">, "className" | "style"> &
  ButtonOwnProps;

/**
 * A plain accessible button built on propel's design tokens. Pick a look with
 * `variant` (Figma Type), select the error palette with `tone`, and size it with
 * `magnitude`. `emphasis` distinguishes the solid/outline danger fills and the
 * subtle link. Content — `children`, `leadingIcon`/`trailingIcon`, `loading` — is
 * not a variant.
 */
export function Button({
  variant,
  tone,
  emphasis,
  magnitude = "md",
  leadingIcon,
  trailingIcon,
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
  const iconClass = iconSizeByMagnitude[magnitude];
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={buttonVariants({ variant, tone, emphasis, magnitude })}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden className={cx(iconClass, "animate-spin")} />
      ) : leadingIcon ? (
        <span aria-hidden className={cx("inline-flex shrink-0 [&_svg]:size-full", iconClass)}>
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {!loading && trailingIcon ? (
        <span aria-hidden className={cx("inline-flex shrink-0 [&_svg]:size-full", iconClass)}>
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
}

// Icon-only square sizes per magnitude. Figma's Base icon button is 24px square
// with a 16px glyph; the other steps mirror the text-button heights.
const iconButtonSizeByMagnitude: Record<ButtonMagnitude, string> = {
  xs: "size-4 p-0.5",
  sm: "size-5 p-1",
  md: "size-6 p-1",
  lg: "size-7 p-1",
  xl: "size-8 p-1.5",
};

export type IconButtonProps = Omit<ButtonProps, "leadingIcon" | "trailingIcon" | "children"> & {
  /** The single icon to render. Decorative — the name comes from `aria-label`. */
  icon: React.ReactNode;
  /** Required: icon-only buttons have no visible text, so they must be labeled. */
  "aria-label": string;
};

/**
 * The icon-only form of {@link Button}: a square button with a single glyph and
 * no label. It shares every styling axis (`variant`/`tone`/`emphasis`/`magnitude`)
 * and REQUIRES an `aria-label` for its accessible name.
 */
export function IconButton({
  icon,
  variant,
  tone,
  emphasis,
  magnitude = "md",
  loading = false,
  disabled,
  type = "button",
  onClick,
  ...props
}: IconButtonProps) {
  const iconClass = iconSizeByMagnitude[magnitude];
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={cx(
        buttonVariants({ variant, tone, emphasis, magnitude }),
        // Override the text-button box with a square, padding-driven one.
        "h-auto min-w-0 px-0",
        iconButtonSizeByMagnitude[magnitude],
      )}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden className={cx(iconClass, "animate-spin")} />
      ) : (
        <span aria-hidden className={cx("inline-flex shrink-0 [&_svg]:size-full", iconClass)}>
          {icon}
        </span>
      )}
    </button>
  );
}
