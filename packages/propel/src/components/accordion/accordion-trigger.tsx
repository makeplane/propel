import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cx } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

export type AccordionTriggerProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Trigger>,
  "className" | "render" | "style"
> & {
  /**
   * Optional icon shown before the label, matching the Figma header icon. Named `leadingIcon` (not
   * `icon`) to match Button/Input, so a `trailingIcon` can be added later without a breaking
   * rename.
   */
  leadingIcon?: React.ReactNode;
};

/**
 * The clickable control that opens and closes its panel. Base UI sets `aria-expanded` and
 * `aria-controls` for you.
 */
export function AccordionTrigger({ leadingIcon, children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      className={cx(
        "group flex flex-1 items-center gap-2 p-3 text-start",
        "text-14 font-medium text-primary",
        "bg-layer-transparent hover:bg-layer-transparent-hover",
        "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
        "disabled:cursor-not-allowed disabled:opacity-60",
      )}
      {...props}
    >
      {leadingIcon ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-secondary">
          {leadingIcon}
        </span>
      ) : null}
      <span className="flex-1">{children}</span>
      <ChevronDown
        aria-hidden
        className="size-3.5 shrink-0 text-icon-secondary transition-transform duration-200 group-data-panel-open:rotate-180"
      />
    </BaseAccordion.Trigger>
  );
}
