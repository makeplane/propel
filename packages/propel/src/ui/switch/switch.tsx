import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { type VariantProps } from "class-variance-authority";

import { trackVariants } from "./variants";

export type SwitchMagnitude = NonNullable<VariantProps<typeof trackVariants>["magnitude"]>;

export type SwitchProps = Omit<BaseSwitch.Root.Props, "className" | "style"> & {
  /** Track size, from the Figma "Toggle" Size scale: `lg` 30×18, `md` 27×16, `sm` 23×14. */
  magnitude: SwitchMagnitude;
};

/**
 * The switch track (Base UI `Switch.Root`). A switch toggles a single setting on or off; the Root
 * carries `role="switch"` and full keyboard/form support. Maps to Figma's "Toggle" component.
 * Render a `SwitchThumb` (with the same `magnitude`) as its child.
 *
 * On/off, `disabled`, and `readOnly` are control state from the primitive, not variants — pass them
 * as props (`checked`/`defaultChecked`, `disabled`, `readOnly`). Only the size axis (`magnitude`)
 * is a visual variant.
 */
export function Switch({ magnitude, ...props }: SwitchProps) {
  return <BaseSwitch.Root className={trackVariants({ magnitude })} {...props} />;
}
