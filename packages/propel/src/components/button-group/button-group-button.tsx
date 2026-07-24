import { Button as BaseButton } from "@base-ui/react/button";
import * as React from "react";

import {
  ButtonGroupButton as ButtonGroupButtonElement,
  type ButtonGroupButtonProps as ButtonGroupButtonElementProps,
  type ButtonGroupButtonSize,
} from "../../elements/button-group";
import { ButtonGroupContext } from "./button-group-context";

export type ButtonGroupButtonProps = Omit<ButtonGroupButtonElementProps, "children" | "size"> & {
  /**
   * Set `false` when `render` swaps the underlying tag away from `<button>` (e.g. an `<a>`): Base
   * UI then adds `role="button"`, tab focus, and Enter/Space activation.
   */
  nativeButton?: boolean;
  /**
   * Size override. Inside a `ButtonGroup` the group's `size` is used (so you can omit it);
   * standalone it defaults to `md`.
   */
  size?: ButtonGroupButtonSize;
  /** Icon rendered beside the label (inline-start by default), e.g. `<Icon icon={Plus} />`. */
  icon?: React.ReactNode;
  /**
   * Which side of the label the icon sits on.
   *
   * @default "start"
   */
  iconPosition?: "start" | "end";
  /** Visible button label. */
  label: string;
  /**
   * The button's form behavior.
   *
   * @default "button"
   */
  type?: "submit" | "reset" | "button";
};

/**
 * The ready-made group segment: grafts Base UI's `Button` behavior onto the styled
 * `ButtonGroupButton` (behavior outer, the styled button as the render target), lays out an
 * optional `icon` beside the label (`iconPosition`), and takes its `size` from the surrounding
 * `ButtonGroup` via context.
 */
export function ButtonGroupButton({
  size,
  icon,
  iconPosition = "start",
  label,
  type = "button",
  render,
  nativeButton,
  ...props
}: ButtonGroupButtonProps) {
  const groupSize = React.useContext(ButtonGroupContext);
  return (
    <BaseButton
      {...props}
      type={type}
      nativeButton={nativeButton}
      render={
        <ButtonGroupButtonElement
          size={size ?? groupSize ?? "md"}
          // The consumer's render swaps the underlying element; the styled part stays the
          // className owner (behavior part outer, styled part as the render target, rule 1a).
          render={render}
        />
      }
    >
      {iconPosition === "start" ? icon : null}
      {label}
      {iconPosition === "end" ? icon : null}
    </BaseButton>
  );
}
