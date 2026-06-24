import type * as React from "react";

import {
  ButtonAnchor as ButtonAnchorElement,
  ButtonAnchorIcon,
  ButtonAnchorLabel,
  type ButtonAnchorProps as ButtonAnchorElementProps,
} from "../../ui/button-anchor";

export type ButtonAnchorProps = ButtonAnchorElementProps & {
  /** Node before the label (inline-start), sized to `--node-size`. Decorative. */
  inlineStartNode?: React.ReactNode;
  /** Node after the label (inline-end), sized to `--node-size`. Decorative. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made `ButtonAnchor`: a button-looking navigation link that composes the atomic
 * `ButtonAnchor` with an optional `inlineStartNode`/`inlineEndNode` beside the label. Content —
 * `children`, the inline nodes — is not a variant.
 */
export function ButtonAnchor({
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: ButtonAnchorProps) {
  return (
    <ButtonAnchorElement {...props}>
      {inlineStartNode ? <ButtonAnchorIcon>{inlineStartNode}</ButtonAnchorIcon> : null}
      <ButtonAnchorLabel>{children}</ButtonAnchorLabel>
      {inlineEndNode ? <ButtonAnchorIcon>{inlineEndNode}</ButtonAnchorIcon> : null}
    </ButtonAnchorElement>
  );
}
