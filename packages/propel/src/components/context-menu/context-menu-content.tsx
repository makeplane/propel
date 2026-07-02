import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import {
  ContextMenuPopup,
  type ContextMenuPopupProps,
} from "../../elements/context-menu/context-menu-popup";
import { Positioner } from "../../internal/positioner";

export type ContextMenuContentProps = ContextMenuPopupProps & {
  /** Which side of the anchor the popup opens toward. Defaults to Base UI's pointer anchoring. */
  side?: BaseContextMenu.Positioner.Props["side"];
  /** Distance in px between the anchor and the popup. */
  sideOffset?: BaseContextMenu.Positioner.Props["sideOffset"];
  /** Alignment of the popup relative to the anchor along `side`. */
  align?: BaseContextMenu.Positioner.Props["align"];
};

/** The context-menu surface: Base UI portal + positioner + popup grafted onto Propel styling. */
export function ContextMenuContent({ side, sideOffset, align, ...props }: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <BaseContextMenu.Popup {...props} render={<ContextMenuPopup />} />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}
