import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  ButtonAnchor as ButtonAnchorElement,
  ButtonAnchorIcon,
  ButtonAnchorLabel,
  type ButtonAnchorProps as ButtonAnchorElementProps,
  ButtonAnchorSpinner,
} from "../../ui/button-anchor";

export type ButtonAnchorProps = ButtonAnchorElementProps & {
  /** Node before the label (inline-start), sized to `--node-size`. Decorative. */
  inlineStartNode?: React.ReactNode;
  /** Node after the label (inline-end), sized to `--node-size`. Decorative. */
  inlineEndNode?: React.ReactNode;
  /**
   * Shows a spinner in place of the inline-start node and sets `aria-busy` while a navigation is
   * pending — drive it from your router's pending state (e.g. React Router's `useNavigation`),
   * since a link's destination can load before the page changes.
   */
  loading?: boolean;
};

/**
 * The ready-made `ButtonAnchor`: a button-looking navigation link that composes the atomic
 * `ButtonAnchor` with an optional `inlineStartNode`/`inlineEndNode` and a `loading` spinner for
 * pending navigations. Content — `children`, the inline nodes, `loading` — is not a variant.
 */
export function ButtonAnchor({
  inlineStartNode,
  inlineEndNode,
  loading = false,
  children,
  ...props
}: ButtonAnchorProps) {
  return (
    <ButtonAnchorElement aria-busy={loading ? true : undefined} {...props}>
      {loading ? (
        <ButtonAnchorSpinner>
          <LoaderCircle />
        </ButtonAnchorSpinner>
      ) : inlineStartNode ? (
        <ButtonAnchorIcon>{inlineStartNode}</ButtonAnchorIcon>
      ) : null}
      <ButtonAnchorLabel>{children}</ButtonAnchorLabel>
      {!loading && inlineEndNode ? <ButtonAnchorIcon>{inlineEndNode}</ButtonAnchorIcon> : null}
    </ButtonAnchorElement>
  );
}
