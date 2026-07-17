import { Button as BaseButton } from "@base-ui/react/button";
import * as React from "react";

import {
  ButtonGroupButton as ButtonGroupButtonElement,
  type ButtonGroupButtonMagnitude,
  type ButtonGroupButtonProps as ButtonGroupButtonElementProps,
} from "../../elements/button-group";
import { ButtonGroupContext } from "./button-group-context";

export type ButtonGroupButtonProps = Omit<
  ButtonGroupButtonElementProps,
  "children" | "magnitude"
> & {
  /**
   * Set `false` when `render` swaps the underlying tag away from `<button>` (e.g. an `<a>`): Base
   * UI then adds `role="button"`, tab focus, and Enter/Space activation.
   */
  nativeButton?: boolean;
  /**
   * Size override. Inside a `ButtonGroup` the group's `magnitude` is used (so you can omit it);
   * standalone it defaults to `md`.
   */
  magnitude?: ButtonGroupButtonMagnitude;
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Plus} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={ArrowRight} />`. */
  endIcon?: React.ReactNode;
  /** Visible button label. */
  label: string;
};

/**
 * The ready-made group segment: grafts Base UI's `Button` behavior onto the styled
 * `ButtonGroupButton` (behavior outer, the styled button as the render target), lays out an
 * optional `startIcon`/`endIcon` beside the label, and takes its `magnitude` from the surrounding
 * `ButtonGroup` via context.
 */
export function ButtonGroupButton({
  magnitude,
  startIcon,
  endIcon,
  label,
  render,
  nativeButton,
  ...props
}: ButtonGroupButtonProps) {
  const groupMagnitude = React.useContext(ButtonGroupContext);
  return (
    <BaseButton
      {...props}
      nativeButton={nativeButton}
      render={
        <ButtonGroupButtonElement
          magnitude={magnitude ?? groupMagnitude ?? "md"}
          // The consumer's render swaps the underlying element; the styled part stays the
          // className owner (behavior part outer, styled part as the render target, rule 1a).
          render={render}
        />
      }
    >
      {startIcon}
      {label}
      {endIcon}
    </BaseButton>
  );
}
