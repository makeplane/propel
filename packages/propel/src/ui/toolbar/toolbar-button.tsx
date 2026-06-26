import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

import { type ToolbarItemVariantProps, toolbarItemVariants } from "./variants";

export type ToolbarButtonProps = Omit<BaseToolbar.Button.Props, "className" | "style"> &
  ToolbarItemVariantProps & {
    /** Accessible name for the icon button. */
    "aria-label": string;
  };

/** A plain action button in the toolbar. */
export function ToolbarButton({ density, ...props }: ToolbarButtonProps) {
  return <BaseToolbar.Button className={toolbarItemVariants({ density })} {...props} />;
}
