export * from "./icon-pill";
export * from "./pill";
export * from "./pill-switch";
// Re-export the atomic elements parts so a fully custom pill is importable from this convenience.
export {
  PillIcon,
  type PillIconProps,
  PillLabel,
  type PillLabelProps,
  type PillMagnitude,
  PillSpinner,
} from "../../elements/pill";
