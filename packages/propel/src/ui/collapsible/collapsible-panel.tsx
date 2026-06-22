import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

import { collapsiblePanelVariants } from "./variants";

export type CollapsiblePanelProps = Omit<BaseCollapsible.Panel.Props, "className" | "style">;

/**
 * The collapsible content region. Animates open/closed using Base UI's `--collapsible-panel-height`
 * so the height transitions smoothly. Maps 1:1 to `Collapsible.Panel`.
 */
export function CollapsiblePanel(props: CollapsiblePanelProps) {
  return <BaseCollapsible.Panel className={collapsiblePanelVariants()} {...props} />;
}
