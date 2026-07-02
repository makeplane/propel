export * from "./dialog";
export * from "./dialog-close";
export * from "./dialog-content";
export * from "./dialog-description";
export * from "./dialog-title";
export * from "./dialog-trigger";
export * from "./create-handle";
// Re-export propel's STYLED structural dialog parts so a full dialog can be assembled from one
// entry. The Popup/Viewport/Backdrop boilerplate is composed by `DialogContent`, so those parts are
// not re-exported here.
export {
  DialogActions,
  type DialogActionsProps,
  DialogBody,
  type DialogBodyProps,
  DialogHeader,
  type DialogHeaderProps,
  DialogHeading,
  type DialogHeadingProps,
} from "../../elements/dialog";
