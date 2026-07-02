export * from "./navigation-menu";
export * from "./navigation-menu-panel";
// Re-export propel's STYLED navigation-menu parts so a full menu can be assembled from one entry.
// The structural parts (`Item`, `Content`, `Portal`) are Base UI's — no propel styling — so compose
// them from `@base-ui/react/navigation-menu` directly at the call site. `Popup` is composed by the
// ready-made `NavigationMenuPanel`, so it is not re-exported here.
export {
  NavigationMenuContentList,
  type NavigationMenuContentListProps,
  NavigationMenuIcon,
  type NavigationMenuIconProps,
  NavigationMenuLink,
  type NavigationMenuLinkProps,
  NavigationMenuLinkDescription,
  type NavigationMenuLinkDescriptionProps,
  NavigationMenuLinkTitle,
  type NavigationMenuLinkTitleProps,
  NavigationMenuList,
  type NavigationMenuListProps,
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  NavigationMenuTriggerLabel,
  type NavigationMenuTriggerLabelProps,
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
} from "../../elements/navigation-menu";
