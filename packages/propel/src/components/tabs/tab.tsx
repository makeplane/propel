import * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  Tab as TabRoot,
  type TabProps as TabRootProps,
  TabUnderlineBar,
  TabUnderlineLabel,
} from "../../ui/tabs";
import { TabsVariantContext } from "./tabs-context";

export type TabProps = Omit<TabRootProps, "variant"> & {
  /**
   * Node rendered before the label (inline-start). Sized to the tab's `--node-size` (16px) and
   * tinted to the tab's text color. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
};

/**
 * The ready-made tab button: composes the atomic `Tab` (taking the set's `variant` from context, so
 * you don't pass it) and lays out an optional `inlineStartNode` with the label. The `underline`
 * variant additionally renders the sliding bar track beneath the label.
 */
export function Tab({ inlineStartNode, children, ...props }: TabProps) {
  const variant = React.useContext(TabsVariantContext);
  const iconNode = inlineStartNode ? <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot> : null;

  if (variant === "underline") {
    return (
      <TabRoot variant={variant} {...props}>
        <TabUnderlineLabel>
          {iconNode}
          {children}
        </TabUnderlineLabel>
        <TabUnderlineBar />
      </TabRoot>
    );
  }

  return (
    <TabRoot variant={variant} {...props}>
      {iconNode}
      {children}
    </TabRoot>
  );
}
