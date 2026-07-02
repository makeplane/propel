export * from "./drawer";
export * from "./drawer-trigger";
export * from "./drawer-close";
export * from "./drawer-provider";
export * from "./drawer-indent";
export * from "./drawer-indent-background";
export * from "./drawer-swipe-area";
export * from "./drawer-backdrop";
export * from "./drawer-title";
export * from "./drawer-description";
export * from "./drawer-panel";
// Re-export the styled `elements` parts so a full drawer can be assembled from one entry. The
// behavior-only roles need no Base UI at the call site: `DrawerTrigger`/`DrawerClose` above are
// the passthroughs, and `DrawerPanel` composes the `Portal`. The styled bare close control stays
// in `elements/drawer` — the `DrawerClose` behavior part replaces its re-export here.
export {
  DrawerBody,
  type DrawerBodyProps,
  DrawerContent,
  type DrawerContentProps,
  DrawerFooter,
  type DrawerFooterProps,
  DrawerHeader,
  type DrawerHeaderProps,
  DrawerHeaderContent,
  type DrawerHeaderContentProps,
  DrawerPopup,
  type DrawerPopupProps,
  type DrawerPopupSide,
  DrawerViewport,
  type DrawerViewportProps,
} from "../../elements/drawer";
