import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import {
  AnchorButton as AnchorButtonElement,
  AnchorButtonLabel,
  type AnchorButtonProps as AnchorButtonElementProps,
} from "../../elements/anchor-button";
import { Icon } from "../../internal/icon";
import { Spinner } from "../../internal/spinner";

export type AnchorButtonProps = AnchorButtonElementProps & {
  /** Node before the label (inline-start), sized to `--node-size`. Decorative. */
  startIcon?: React.ReactNode;
  /** Node after the label (inline-end), sized to `--node-size`. Decorative. */
  endIcon?: React.ReactNode;
  /**
   * Shows a spinner in place of the inline-start node and sets `aria-busy` while a navigation is
   * pending — drive it from your router's pending state (e.g. React Router's `useNavigation`),
   * since a link's destination can load before the page changes.
   */
  loading?: boolean;
};

/**
 * The ready-made `AnchorButton`: a button-looking navigation link that composes the atomic
 * `AnchorButton` with an optional `startIcon`/`endIcon` and a `loading` spinner for pending
 * navigations. Content — `children`, the inline nodes, `loading` — is not a variant.
 */
export function AnchorButton({
  startIcon,
  endIcon,
  loading = false,
  children,
  ...props
}: AnchorButtonProps) {
  return (
    <AnchorButtonElement aria-busy={loading ? true : undefined} {...props}>
      {loading ? (
        <Spinner>
          <LoaderCircle />
        </Spinner>
      ) : startIcon ? (
        <Icon>{startIcon}</Icon>
      ) : null}
      <AnchorButtonLabel>{children}</AnchorButtonLabel>
      {!loading && endIcon ? <Icon>{endIcon}</Icon> : null}
    </AnchorButtonElement>
  );
}
