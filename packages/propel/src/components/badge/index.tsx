export * from "./badge";
// Re-export the atomic parts so a full badge is composable from this convenience.
export {
  BadgeIcon,
  type BadgeIconProps,
  BadgeLabel,
  type BadgeLabelProps,
  type BadgeMagnitude,
  type BadgeTone,
} from "../../elements/badge";
