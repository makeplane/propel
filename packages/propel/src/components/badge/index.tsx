export * from "./badge";
// Re-export the atomic parts so a full badge is composable from this convenience.
export {
  BadgeDismiss,
  type BadgeDismissProps,
  BadgeIcon,
  type BadgeIconProps,
  BadgeLabel,
  type BadgeLabelProps,
  type BadgeMagnitude,
  type BadgeTone,
  type BadgeVariant,
} from "../../ui/badge";
