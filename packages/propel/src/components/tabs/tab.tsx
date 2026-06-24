import * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  Tab as TabElement,
  type TabProps as TabElementProps,
  TabUnderlineBar,
  TabUnderlineLabel,
} from "../../ui/tabs";
import { TabsVariantContext } from "./tabs-context";

export type TabProps = Omit<TabElementProps, "variant"> & {
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
      <TabElement variant={variant} {...props}>
        <TabUnderlineLabel>
          {iconNode}
          {children}
        </TabUnderlineLabel>
        <TabUnderlineBar />
      </TabElement>
    );
  }

  return (
    <TabElement variant={variant} {...props}>
      {iconNode}
      {children}
    </TabElement>
  );
}
