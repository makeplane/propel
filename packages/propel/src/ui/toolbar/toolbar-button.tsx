import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import { type ToolbarDensity, toolbarItemVariants } from "./variants";

export type ToolbarButtonProps = Omit<BaseToolbar.Button.Props, "className" | "style"> & {
  /** Accessible name for the icon button. */
  "aria-label": string;
  /** Control sizing, matching the toolbar's density. */
  density: ToolbarDensity;
};

/** A plain action button in the toolbar. */
export function ToolbarButton({ density, ...props }: ToolbarButtonProps) {
  return <BaseToolbar.Button className={toolbarItemVariants({ density })} {...props} />;
}
