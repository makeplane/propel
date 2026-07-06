import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { ToolbarLink as ToolbarLinkElement, type ToolbarDensity } from "../../elements/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarLinkProps = Omit<BaseToolbar.Link.Props, "children" | "className" | "style"> & {
  /** Size override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
  /** Icon element rendered inside the toolbar link. */
  icon: React.ReactNode;
};

/**
 * A toolbar item that navigates — Base UI's `Toolbar.Link` (`<a>` in the roving tab order) grafted
 * onto the toolbar item chrome. Pass an icon element, e.g. `<Icon icon={ExternalLink} />`.
 */
export function ToolbarLink({ density, icon, ...props }: ToolbarLinkProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Link
      render={<ToolbarLinkElement density={density ?? toolbarDensity} />}
      {...props}
    >
      {icon}
    </BaseToolbar.Link>
  );
}
