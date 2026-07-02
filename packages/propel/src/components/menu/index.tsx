export * from "./menu";
export * from "./menu-checkbox-item";
export * from "./menu-content";
export * from "./menu-footer";
export * from "./menu-item";
export * from "./menu-label";
export * from "./menu-link-item";
export * from "./menu-search";
export * from "./menu-submenu";
export * from "./menu-submenu-content";
export * from "./menu-submenu-trigger";
// Re-export propel's STYLED menu parts so a full menu can be assembled from one entry. The
// behavior/structural roles (`Menu` Root, `Trigger`, `Group`, `RadioGroup`, `Portal`, `Positioner`,
// `Arrow`, `Viewport`, `Backdrop`) are Base UI's — no propel styling — so compose them from
// `@base-ui/react/menu` (and the shared `internal/` primitives) directly at the call site. Names
// with a ready-made here (`MenuItem`, `MenuCheckboxItem`, `MenuLabel`, `MenuLinkItem`,
// `MenuSubmenuTrigger`, `MenuSearch`, `MenuFooter`) are deliberately NOT re-exported from `elements`.
export {
  MenuCheckboxItemIndicator,
  type MenuCheckboxItemIndicatorProps,
  MenuGroupLabel,
  type MenuGroupLabelProps,
  MenuItemContent,
  type MenuItemContentProps,
  MenuItemControl,
  type MenuItemControlProps,
  MenuItemDescription,
  type MenuItemDescriptionProps,
  MenuItemIcon,
  type MenuItemIconProps,
  MenuItemMeta,
  type MenuItemMetaProps,
  MenuItemSecondaryText,
  type MenuItemSecondaryTextProps,
  MenuItemIndicator,
  type MenuItemSelectedIndicatorProps,
  MenuSubmenuTriggerIndicator,
  type MenuItemSubmenuIndicatorProps,
  MenuItemTitle,
  type MenuItemTitleProps,
  MenuItemTitleRow,
  type MenuItemTitleRowProps,
  MenuItemTrailing,
  type MenuItemTrailingProps,
  MenuLabelMeta,
  type MenuLabelMetaProps,
  MenuLabelTitle,
  type MenuLabelTitleProps,
  MenuPopup,
  type MenuPopupProps,
  MenuRadioItem,
  type MenuRadioItemProps,
  MenuRadioItemIndicator,
  type MenuRadioItemIndicatorProps,
  MenuSearchIcon,
  type MenuSearchIconProps,
  MenuSearchInput,
  type MenuSearchInputProps,
  MenuSeparator,
  type MenuSeparatorProps,
} from "../../elements/menu";
