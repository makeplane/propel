// Ready-made banner: composes the atomic parts behind convenience props (tone icon, title, actions,
// dismiss). Drop down to `@makeplane/propel/elements/banner` for the lower-level parts.
export * from "./banner";
// Re-export the atomic parts so a fully custom banner is importable from this convenience.
export {
  BannerActions,
  type BannerActionsProps,
  BannerBody,
  type BannerBodyProps,
  BannerDescription,
  type BannerDescriptionProps,
  BannerIcon,
  type BannerIconProps,
  BannerTitle,
  type BannerTitleProps,
} from "../../elements/banner";
