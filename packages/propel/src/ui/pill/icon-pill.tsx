import { Button as BaseButton } from "@base-ui/react/button";

import { iconPillVariants, type IconPillVariantProps } from "./variants";

export type IconPillProps = Omit<BaseButton.Props, "className" | "style"> &
  IconPillVariantProps & {
    /** Accessible name — required because the content is an icon. */
    "aria-label": string;
  };

/**
 * The icon-only square pill container. Renders a single Base UI `Button`; compose a `PillIcon` (or
 * `PillSpinner`) inside it. Requires an `aria-label` for the name.
 */
export function IconPill({ magnitude, type = "button", ...props }: IconPillProps) {
  return <BaseButton type={type} className={iconPillVariants({ magnitude })} {...props} />;
}
