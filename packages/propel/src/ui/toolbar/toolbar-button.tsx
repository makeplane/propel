import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { ToolbarDensityContext } from "./toolbar-context";
import { itemVariants } from "./variants";

export type ToolbarButtonProps = Omit<BaseToolbar.Button.Props, "className" | "style"> & {
  /** Accessible name for the icon button. */
  "aria-label": string;
};

/** A plain action button in the toolbar. */
export function ToolbarButton(props: ToolbarButtonProps) {
  const density = React.useContext(ToolbarDensityContext);
  return <BaseToolbar.Button className={itemVariants({ density })} {...props} />;
}
