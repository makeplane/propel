import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

import { type ListSectionTriggerVariantProps, listSectionTriggerVariants } from "./variants";

export type ListSectionTriggerProps = Omit<BaseCollapsible.Trigger.Props, "className" | "style"> &
  ListSectionTriggerVariantProps;

/**
 * The header of a collapsible list section — a small, muted heading that toggles its panel. Place
 * it inside a `Collapsible`, with the section label as `children` and a
 * `CollapsibleTriggerIndicator` (the chevron) beside it; the `CollapsiblePanel` holds the section's
 * `List`. A `Collapsible.Trigger`, so Base UI wires `aria-expanded`/`data-panel-open`.
 */
export function ListSectionTrigger(props: ListSectionTriggerProps) {
  return <BaseCollapsible.Trigger className={listSectionTriggerVariants()} {...props} />;
}
