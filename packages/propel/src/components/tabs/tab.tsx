import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import {
  tabIconVariants,
  tabVariants,
  TabsVariantContext,
  underlineBarTrackVariants,
  underlineBarVariants,
  underlineLabelVariants,
} from "./tabs-context";

export type TabProps = Omit<
  React.ComponentProps<typeof BaseTabs.Tab>,
  "className" | "render" | "style"
> & {
  /**
   * Optional leading icon (e.g. a lucide icon), sized to 16px and tinted to the tab's text color.
   * Named `leadingIcon` to match Button/Input and leave room for a future `trailingIcon`.
   */
  leadingIcon?: React.ReactNode;
};

/** A single tab button. `value` ties it to the `TabsPanel` of the same `value`. */
export function Tab({ leadingIcon, children, ...props }: TabProps) {
  const variant = React.useContext(TabsVariantContext);
  const iconNode = leadingIcon ? (
    <span aria-hidden className={tabIconVariants()}>
      {leadingIcon}
    </span>
  ) : null;

  if (variant === "underline") {
    return (
      <BaseTabs.Tab className={tabVariants({ variant })} {...props}>
        <span className={underlineLabelVariants()}>
          {iconNode}
          {children}
        </span>
        <span className={underlineBarTrackVariants()}>
          <span aria-hidden className={underlineBarVariants()} />
        </span>
      </BaseTabs.Tab>
    );
  }

  return (
    <BaseTabs.Tab className={tabVariants({ variant })} {...props}>
      {iconNode}
      {children}
    </BaseTabs.Tab>
  );
}
