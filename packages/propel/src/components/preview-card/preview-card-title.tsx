import { OverlayTitle, type OverlayTitleProps } from "../../internal/overlay-title";

export type PreviewCardTitleProps = Omit<OverlayTitleProps, "magnitude">;

/**
 * The card's primary heading — the shared `internal/overlay-title` recipe at the preview card's
 * `md` size (semibold 14px primary text). The size is fixed here (a `components` default, rule
 * 13).
 */
export function PreviewCardTitle(props: PreviewCardTitleProps) {
  return <OverlayTitle magnitude="md" {...props} />;
}
