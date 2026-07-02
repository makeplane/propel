import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  AnchorButton as AnchorButtonElement,
  AnchorButtonIcon,
  AnchorButtonLabel,
  type AnchorButtonProps as AnchorButtonElementProps,
  AnchorButtonSpinner,
} from "../../elements/anchor-button";

export type AnchorButtonProps = AnchorButtonElementProps & {
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
 * The ready-made `AnchorButton`: a button-looking navigation link that composes the atomic
 * `AnchorButton` with an optional `inlineStartNode`/`inlineEndNode` and a `loading` spinner for
 * pending navigations. Content — `children`, the inline nodes, `loading` — is not a variant.
 */
export function AnchorButton({
  inlineStartNode,
  inlineEndNode,
  loading = false,
  children,
  ...props
}: AnchorButtonProps) {
  return (
    <AnchorButtonElement aria-busy={loading ? true : undefined} {...props}>
      {loading ? (
        <AnchorButtonSpinner>
          <LoaderCircle />
        </AnchorButtonSpinner>
      ) : inlineStartNode ? (
        <AnchorButtonIcon>{inlineStartNode}</AnchorButtonIcon>
      ) : null}
      <AnchorButtonLabel>{children}</AnchorButtonLabel>
      {!loading && inlineEndNode ? <AnchorButtonIcon>{inlineEndNode}</AnchorButtonIcon> : null}
    </AnchorButtonElement>
  );
}
