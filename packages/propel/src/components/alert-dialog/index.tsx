export * from "./alert-dialog";
export * from "./alert-dialog-content";
export * from "./alert-dialog-description";
export * from "./alert-dialog-title";
// Re-export propel's STYLED alert-dialog parts so a full alert dialog can be assembled from one
// entry. The behavior-only parts (`Trigger`, `Portal`) are Base UI's — no propel styling — so
// compose them from `@base-ui/react/alert-dialog` directly at the call site.
export {
  AlertDialogActions,
  type AlertDialogActionsProps,
  AlertDialogClose,
  type AlertDialogCloseProps,
  AlertDialogHeader,
  type AlertDialogHeaderProps,
  AlertDialogIcon,
  type AlertDialogIconProps,
  type AlertDialogIconTone,
  AlertDialogIntro,
  type AlertDialogIntroProps,
} from "../../elements/alert-dialog";
