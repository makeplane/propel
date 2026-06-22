import {
  PreviewCardBackdrop,
  PreviewCardPopup,
  type PreviewCardPopupProps,
  PreviewCardPortal,
  PreviewCardPositioner,
  type PreviewCardPositionerProps,
} from "../../ui/preview-card";

export type PreviewCardContentProps = PreviewCardPopupProps & {
  /** Which side of the trigger the card opens toward. @default "bottom" */
  side?: PreviewCardPositionerProps["side"];
  /** Distance in px between the trigger and the card. @default 4 */
  sideOffset?: PreviewCardPositionerProps["sideOffset"];
  /** Alignment of the card relative to the trigger along `side`. @default "center" */
  align?: PreviewCardPositionerProps["align"];
};

/**
 * Convenience that composes the anchored preview card boilerplate — portal, backdrop, positioner,
 * and popup — so a consumer only writes the trigger and the card body. Pass `side`/`sideOffset`/
 * `align` through to the positioner.
 */
export function PreviewCardContent({
  side = "bottom",
  sideOffset = 4,
  align = "center",
  ...props
}: PreviewCardContentProps) {
  return (
    <PreviewCardPortal>
      <PreviewCardBackdrop />
      <PreviewCardPositioner side={side} sideOffset={sideOffset} align={align}>
        <PreviewCardPopup {...props} />
      </PreviewCardPositioner>
    </PreviewCardPortal>
  );
}
