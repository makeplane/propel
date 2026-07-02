import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import * as React from "react";

import { type ToolbarDensity, ToolbarInput as ToolbarInputElement } from "../../elements/toolbar";
import { ToolbarDensityContext } from "./toolbar-context";

export type ToolbarInputProps = Omit<BaseToolbar.Input.Props, "className" | "style"> & {
  /** Size override; defaults to the surrounding `Toolbar`'s density. */
  density?: ToolbarDensity;
};

/**
 * An inline text input in the toolbar's roving tab order (e.g. a filter box) — Base UI's
 * `Toolbar.Input` grafted onto the styled miniature field, its height tracking the toolbar's
 * density. Give it an `aria-label` naming what it filters or searches.
 */
export function ToolbarInput({ density, ...props }: ToolbarInputProps) {
  const toolbarDensity = React.useContext(ToolbarDensityContext);
  return (
    <BaseToolbar.Input
      {...props}
      render={<ToolbarInputElement density={density ?? toolbarDensity} />}
    />
  );
}
