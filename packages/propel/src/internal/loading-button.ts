import type * as React from "react";

// Shared "loading is a soft-disabled busy state" props for button-like components
// (Button, IconButton). Both render a native <button> where:
// - `disabled` is the hard, non-focusable native state — the only thing that sets
//   the real `disabled` attribute.
// - `loading` is the soft state: it shows a spinner and must NOT fire clicks, but
//   the button stays a real, focusable element so screen readers announce the busy
//   state. It maps to `aria-disabled` + `aria-busy` and guards `onClick`.
//
// This is NOT a component (no JSX): it only returns the shared loading button
// props each call site spreads onto its own <button>. The spinner markup stays
// in each component.
// It is internal: it lives outside `components/`/`hooks/`, so the build does not
// turn it into a published package subpath.

type LoadingButtonInput<E> = {
  /** Soft-disabled busy state: blocks clicks and sets `aria-busy`/`aria-disabled`. */
  loading: boolean;
  /** Hard, non-focusable native state: the only input that sets `disabled`. */
  disabled?: boolean;
  /** The consumer's click handler; suppressed while `loading`. */
  onClick?: React.MouseEventHandler<E>;
};

type LoadingButtonProps<E> = {
  disabled?: boolean;
  "aria-disabled": true | undefined;
  "aria-busy": true | undefined;
  onClick: React.MouseEventHandler<E> | undefined;
};

/**
 * Returns the four shared `<button>` attributes (`disabled`, `aria-disabled`,
 * `aria-busy`, `onClick`) used by Button and IconButton for the
 * loading/disabled/onClick behavior. `disabled` passes through to the native attribute;
 * `loading` adds `aria-disabled`/`aria-busy` and blocks `onClick` while keeping the
 * button focusable. Pure: it returns props to spread, never JSX.
 */
export function getLoadingButtonProps<E = HTMLButtonElement>({
  loading,
  disabled,
  onClick,
}: LoadingButtonInput<E>): LoadingButtonProps<E> {
  return {
    disabled,
    "aria-disabled": loading ? true : undefined,
    "aria-busy": loading ? true : undefined,
    onClick: loading ? undefined : onClick,
  };
}
