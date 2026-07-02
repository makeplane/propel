export * from "./toast";
export * from "./toast-status-icon";
export * from "./toast-list";
export * from "./toast-provider";
export { useToastManager } from "./manager";

// Re-export propel's STYLED toast parts so a custom toast can be assembled from one entry point if
// the ready-made `Toast` doesn't fit. The behavior-only roles (`Provider`, `Portal`, `Close`) are
// Base UI's — no propel styling — so compose them from `@base-ui/react/toast` directly at the call
// site.
export {
  Toast as ToastElement,
  type ToastProps as ToastElementProps,
  ToastAction as ToastActionPart,
  type ToastActionProps,
  ToastActionButton,
  type ToastActionButtonProps,
  ToastActionGroup,
  type ToastActionGroupProps,
  ToastActions,
  type ToastActionsProps,
  ToastCloseGroup,
  type ToastCloseGroupProps,
  ToastContent,
  type ToastContentProps,
  ToastDescription,
  type ToastDescriptionProps,
  ToastTextGroup,
  type ToastTextGroupProps,
  ToastTitle,
  type ToastTitleProps,
  ToastViewport,
  type ToastViewportProps,
} from "../../elements/toast/index";
