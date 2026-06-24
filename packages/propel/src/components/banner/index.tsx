// Ready-made banner: composes the atomic parts behind convenience props (tone icon, title, actions,
// dismiss). Drop down to `@plane/propel/ui/banner` for the lower-level parts.
export { Banner, type BannerProps, type BannerTone, type BannerVariant } from "./banner";
// Re-export the atomic parts so a fully custom banner is importable from this convenience.
export {
  BannerActions,
  type BannerActionsProps,
  BannerBody,
  type BannerBodyProps,
  BannerDescription,
  type BannerDescriptionProps,
  BannerDismiss,
  type BannerDismissProps,
  BannerIcon,
  type BannerIconProps,
  BannerTitle,
  type BannerTitleProps,
} from "../../ui/banner";
