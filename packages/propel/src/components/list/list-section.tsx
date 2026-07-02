import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { CollapsiblePanel, CollapsiblePanelContent } from "../../elements/collapsible";
import { ListSectionTrigger, ListSectionTriggerIndicator } from "../../elements/list";

export type ListSectionProps = Omit<BaseCollapsible.Root.Props, "className" | "style"> & {
  /** The section heading shown in the toggle. */
  label: React.ReactNode;
  /** The section body — typically a `List` of rows. */
  children: React.ReactNode;
  /** Whether to show the rotating disclosure chevron at the heading's inline-end. */
  indicator: boolean;
};

/**
 * A ready-made collapsible list section: a muted heading that toggles its body, with the disclosure
 * chevron (points inline-end while collapsed, rotates down when open). Pass `label` for the heading
 * and `children` for the body (typically a `List` of rows); forward `defaultOpen` (uncontrolled) or
 * `open` + `onOpenChange` (controlled) to drive it. Set `indicator={false}` to omit the chevron.
 */
export function ListSection({ label, children, indicator, ...props }: ListSectionProps) {
  return (
    <BaseCollapsible.Root {...props}>
      <ListSectionTrigger render={<BaseCollapsible.Trigger />}>
        {label}
        {indicator ? (
          <ListSectionTriggerIndicator>
            <ChevronDown />
          </ListSectionTriggerIndicator>
        ) : null}
      </ListSectionTrigger>
      <BaseCollapsible.Panel render={<CollapsiblePanel />}>
        <CollapsiblePanelContent>{children}</CollapsiblePanelContent>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
