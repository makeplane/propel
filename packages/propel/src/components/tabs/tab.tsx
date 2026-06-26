import * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  Tab as TabElement,
  type TabProps as TabElementProps,
  TabUnderlineBar,
  TabUnderlineBarTrack,
  TabUnderlineLabel,
} from "../../ui/tabs";
import { TabsAppearanceContext } from "./tabs-context";

export type TabProps = Omit<TabElementProps, "appearance"> & {
  /**
   * Node rendered before the label (inline-start). Sized to the tab's `--node-size` (16px) and
   * tinted to the tab's text color. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
};

/**
 * The ready-made tab button: composes the atomic `Tab` (taking the set's `appearance` from context,
 * so you don't pass it) and lays out an optional `inlineStartNode` with the label. The `underline`
 * appearance additionally renders the sliding bar track beneath the label.
 */
export function Tab({ inlineStartNode, children, ...props }: TabProps) {
  const appearance = React.useContext(TabsAppearanceContext);
  const iconNode = inlineStartNode ? <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot> : null;

  if (appearance === "underline") {
    return (
      <TabElement appearance={appearance} {...props}>
        <TabUnderlineLabel>
          {iconNode}
          {children}
        </TabUnderlineLabel>
        <TabUnderlineBarTrack>
          <TabUnderlineBar />
        </TabUnderlineBarTrack>
      </TabElement>
    );
  }

  return (
    <TabElement appearance={appearance} {...props}>
      {iconNode}
      {children}
    </TabElement>
  );
}
