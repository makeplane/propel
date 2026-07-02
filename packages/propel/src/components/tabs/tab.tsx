import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import {
  Tab as TabElement,
  TabUnderlineBar,
  TabUnderlineBarTrack,
  TabUnderlineLabel,
} from "../../elements/tabs";
import { NodeSlot } from "../../internal/node-slot";
import { TabsAppearanceContext } from "./tabs-context";

export type TabProps = Omit<BaseTabs.Tab.Props, "className" | "style"> & {
  /**
   * Node rendered before the label (inline-start). Sized to the tab's `--node-size` (16px) and
   * tinted to the tab's text color. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
};

/**
 * The ready-made tab button: grafts the Base UI `Tabs.Tab` behavior onto the styled `elements/tabs`
 * tab (taking the set's `appearance` from context, so you don't pass it) and lays out an optional
 * `inlineStartNode` with the label. The `underline` appearance additionally renders the sliding bar
 * track beneath the label.
 */
export function Tab({ inlineStartNode, children, ...props }: TabProps) {
  const appearance = React.useContext(TabsAppearanceContext);
  const iconNode = inlineStartNode ? <NodeSlot aria-hidden>{inlineStartNode}</NodeSlot> : null;

  if (appearance === "underline") {
    return (
      <BaseTabs.Tab render={<TabElement appearance={appearance} />} {...props}>
        <TabUnderlineLabel>
          {iconNode}
          {children}
        </TabUnderlineLabel>
        <TabUnderlineBarTrack>
          <TabUnderlineBar />
        </TabUnderlineBarTrack>
      </BaseTabs.Tab>
    );
  }

  return (
    <BaseTabs.Tab render={<TabElement appearance={appearance} />} {...props}>
      {iconNode}
      {children}
    </BaseTabs.Tab>
  );
}
