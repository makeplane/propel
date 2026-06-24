import { Button as BaseButton } from "@base-ui/react/button";

import { pillButtonVariants, type PillMagnitude } from "./variants";

export type { PillMagnitude } from "./variants";

export type PillButtonProps = Omit<BaseButton.Props, "className" | "style"> & {
  /** Box scale. `sm` 20px / `md` 24px / `lg` 28px. */
  magnitude: PillMagnitude;
};

/**
 * The pill-shaped button container. Renders a single Base UI `Button`; compose a `PillLabel` and
 * optional leading/trailing `PillIcon` (or `PillSpinner`) inside it.
 */
export function PillButton({ magnitude, type = "button", ...props }: PillButtonProps) {
  return <BaseButton type={type} className={pillButtonVariants({ magnitude })} {...props} />;
}
