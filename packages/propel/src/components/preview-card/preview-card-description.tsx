import {
  OverlayDescription,
  type OverlayDescriptionProps,
} from "../../internal/overlay-description";

export type PreviewCardDescriptionProps = Omit<OverlayDescriptionProps, "magnitude">;

/**
 * Supporting description text beneath the title — the shared `internal/overlay-description` recipe
 * at the preview card's `md` size (13px secondary text). The size is fixed here (a `components`
 * default, rule 13).
 */
export function PreviewCardDescription(props: PreviewCardDescriptionProps) {
  return <OverlayDescription magnitude="md" {...props} />;
}
