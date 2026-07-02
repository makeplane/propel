import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { ToolbarButton as ToolbarButtonElement, type ToolbarDensity } from "../../elements/toolbar";
import { Icon } from "../../internal/icon";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarLinkProps = Omit<BaseToolbar.Link.Props, "className" | "style"> & {
  /** Size override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
};

/**
 * A toolbar item that navigates — Base UI's `Toolbar.Link` (`<a>` in the roving tab order) grafted
 * onto the toolbar item chrome, wrapping bare svg children in the shared glyph slot like
 * `ToolbarButton` does.
 */
export function ToolbarLink({ density, children, ...props }: ToolbarLinkProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Link
      render={<ToolbarButtonElement density={density ?? toolbarDensity} />}
      {...props}
    >
      <Icon>{children}</Icon>
    </BaseToolbar.Link>
  );
}
