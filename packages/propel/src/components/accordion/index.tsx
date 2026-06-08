import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cx } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

// Accordion is a structural component: the Figma "Accordion" spec only defines the
// collapsed/hover/expanded states (which Base UI drives as state, not props) — so
// there are no styling axes (variant/tone/magnitude) to expose. The header row uses
// `border/subtle` divider, `spacing/3` padding, `spacing/2` gap, `text/14`
// medium `text/primary` label, a `background/layer/transparent` surface that goes to
// `background/layer/transparent-hover` on hover, and an `icon/placeholder` chevron.

export type AccordionProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Root>,
  "className" | "render" | "style"
>;

/**
 * Groups a set of `AccordionItem`s. Single-open by default; pass `multiple` to allow
 * several panels open at once. Use `defaultValue` (uncontrolled) or `value` +
 * `onValueChange` (controlled) to drive which items are expanded.
 */
export function Accordion(props: AccordionProps) {
  return <BaseAccordion.Root className="flex w-full flex-col" {...props} />;
}

export type AccordionItemProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Item>,
  "className" | "render" | "style"
>;

/** A single collapsible section: pairs an `AccordionTrigger` with an `AccordionPanel`. */
export function AccordionItem(props: AccordionItemProps) {
  return <BaseAccordion.Item className="border-b border-subtle" {...props} />;
}

export type AccordionTriggerProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Trigger>,
  "className" | "render" | "style"
>;

/**
 * The clickable header that opens and closes its panel. Renders the label plus a
 * chevron that rotates when the panel is open. Base UI sets `aria-expanded` and
 * `aria-controls` for you.
 */
export function AccordionTrigger({ children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        className={cx(
          "group flex flex-1 items-center gap-2 p-3 text-left",
          "text-14 font-medium text-primary",
          "bg-layer-transparent hover:bg-layer-transparent-hover",
          "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        <ChevronDown
          aria-hidden
          className="size-3.5 shrink-0 text-icon-secondary transition-transform duration-200 group-data-[panel-open]:rotate-180"
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

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
        "h-[var(--accordion-panel-height)] overflow-hidden",
        "text-14 text-secondary",
        "transition-[height] duration-200 ease-out",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
      )}
      {...props}
    >
      <div className="px-3 pb-3">{children}</div>
    </BaseAccordion.Panel>
  );
}
