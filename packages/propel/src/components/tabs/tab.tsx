import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import {
  Tab as TabElement,
  TabUnderlineBar,
  TabUnderlineBarTrack,
  TabUnderlineLabel,
} from "../../elements/tabs";
import { TabsAppearanceContext } from "./tabs-context";

export type TabProps = Omit<BaseTabs.Tab.Props, "children" | "className" | "style"> & {
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Folder} />`. */
  icon?: React.ReactNode;
  /** Visible tab label. */
  label: React.ReactNode;
};

/**
 * The ready-made tab button: grafts the Base UI `Tabs.Tab` behavior onto the styled `elements/tabs`
 * tab (taking the set's `appearance` from context, so you don't pass it) and lays out an optional
 * `icon` with the label. The `underline` appearance additionally renders the sliding bar track
 * beneath the label.
 */
export function Tab({ icon, label, ...props }: TabProps) {
  const appearance = React.useContext(TabsAppearanceContext);

  if (appearance === "underline") {
    return (
      <BaseTabs.Tab render={<TabElement appearance={appearance} />} {...props}>
        <TabUnderlineLabel>
          {icon}
          {label}
        </TabUnderlineLabel>
        <TabUnderlineBarTrack>
          <TabUnderlineBar />
        </TabUnderlineBarTrack>
      </BaseTabs.Tab>
    );
  }

  return (
    <BaseTabs.Tab render={<TabElement appearance={appearance} />} {...props}>
      {icon}
      {label}
    </BaseTabs.Tab>
  );
}
