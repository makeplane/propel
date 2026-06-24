import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import { type ToolbarDensity, type ToolbarElevation } from "./toolbar-context";
import { toolbarVariants } from "./variants";

export type { ToolbarDensity, ToolbarElevation } from "./toolbar-context";

export type ToolbarProps = Omit<BaseToolbar.Root.Props, "className" | "style"> & {
  /** Whether the toolbar draws its own surface. */
  elevation: ToolbarElevation;
  /** How tightly the controls pack. */
  density: ToolbarDensity;
};

/**
 * A row of controls built on Base UI's `Toolbar` — a single element. The density-sharing behavior
 * (so the controls inside pick up the toolbar's `density`) is the ready-made `components/toolbar`,
 * which wraps this in the `ToolbarDensityContext` provider.
 */
export function Toolbar({ elevation, density, ...props }: ToolbarProps) {
  return <BaseToolbar.Root className={toolbarVariants({ density, elevation })} {...props} />;
}
