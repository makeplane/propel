import { Button as BaseButton } from "@base-ui/react/button";
import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { buttonVariants } from "./variants";

// Re-exported so `buttonVariants` stays part of the button entry's public surface
// (e.g. `icon-button` composes it).
export { buttonVariants } from "./variants";

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonTone = NonNullable<VariantProps<typeof buttonVariants>["tone"]>;
export type ButtonMagnitude = NonNullable<VariantProps<typeof buttonVariants>["magnitude"]>;
export type ButtonEmphasis = NonNullable<VariantProps<typeof buttonVariants>["emphasis"]>;

type ButtonOwnProps = {
  variant: ButtonVariant;
  tone: ButtonTone;
  magnitude: ButtonMagnitude;
  /**
   * Link-only: picks the `link` look. `solid` is the blue `link/primary` style; `subtle` is the
   * muted gray inline link. Optional and additive — it only affects `variant="link"`, so it has no
   * default and every other `variant` ignores it.
   */
  emphasis?: ButtonEmphasis;
};

export type ButtonProps = Omit<React.ComponentProps<typeof BaseButton>, "className" | "style"> &
  ButtonOwnProps;

/**
 * A plain accessible button built on propel's design tokens. Pick a look with `variant` (Figma
 * Type), select the error palette with `tone`, and size it with `magnitude` — all required, so
 * consumers choose explicitly. For `variant="link"` only, optionally choose `solid` (blue) or
 * `subtle` (gray) with `emphasis`. `children` is passed through; it is not a variant.
 */
export function Button({
  variant,
  tone,
  magnitude,
  emphasis,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      className={buttonVariants({ variant, tone, magnitude, emphasis })}
      {...props}
    >
      {children}
    </BaseButton>
  );
}
