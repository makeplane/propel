export * from "./drawer";
export * from "./drawer-provider";
export * from "./drawer-indent";
export * from "./drawer-indent-background";
export * from "./drawer-swipe-area";
export * from "./drawer-backdrop";
export * from "./drawer-title";
export * from "./drawer-description";
export * from "./drawer-panel";
// Re-export the styled `elements` parts so a full drawer can be assembled from one entry. The
// behavior-only roles (`Portal`, `Trigger`) carry no propel styling, so compose them from
// `@base-ui/react/drawer` directly at the call site.
export {
  DrawerBody,
  type DrawerBodyProps,
  DrawerClose,
  type DrawerCloseProps,
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
