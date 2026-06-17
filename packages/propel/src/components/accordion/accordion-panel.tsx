import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cx } from "class-variance-authority";
import type * as React from "react";

export type AccordionPanelProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Panel>,
  "className" | "render" | "style"
>;

/**
 * The collapsible content region for an item. Animates open/closed using Base UI's
 * `--accordion-panel-height` so the height transitions smoothly.
 */
export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={cx(
        "h-(--accordion-panel-height) overflow-hidden",
        "text-14 text-secondary",
        "transition-[height] duration-200 ease-out",
        "data-ending-style:h-0 data-starting-style:h-0",
      )}
      {...props}
    >
      <div className="px-3 pb-3">{children}</div>
    </BaseAccordion.Panel>
  );
}
