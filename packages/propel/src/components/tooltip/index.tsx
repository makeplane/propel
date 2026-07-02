export * from "./tooltip";
export * from "./tooltip-provider";
// Re-export propel's STYLED tooltip parts so a full tooltip can be assembled from one entry. The
// behavior/structural parts (`Root`, `Trigger`, `Portal`, `Positioner`) are Base UI's — no propel
// styling — so compose them from `@base-ui/react/tooltip` directly at the call site.
export {
  TooltipArrow,
  type TooltipArrowProps,
  TooltipPopup,
  type TooltipPopupProps,
  TooltipShortcut,
  type TooltipShortcutProps,
} from "../../elements/tooltip";
