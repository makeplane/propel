import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { AccordionRoot } from "@base-ui/react/accordion";

// Accordion is a structural component: the Figma "Accordion" spec only defines the
// collapsed/hover/expanded states (which Base UI drives as state, not props) — so
// there are no styling axes (variant/tone/magnitude) to expose. The header row uses
// `border/subtle` divider, `spacing/3` padding, `spacing/2` gap, `text/14`
// medium `text/primary` label, a `background/layer/transparent` surface that goes to
// `background/layer/transparent-hover` on hover, and an `icon/placeholder` chevron.

export type AccordionProps<Value = string> = Omit<
  AccordionRoot.Props<Value>,
  "className" | "render" | "style"
>;

/**
 * Groups a set of `AccordionItem`s. Single-open by default; pass `multiple` to allow several panels
 * open at once. Use `defaultValue` (uncontrolled) or `value` + `onValueChange` (controlled) to
 * drive which items are expanded.
 */
export function Accordion<Value = string>(props: AccordionProps<Value>) {
  return <BaseAccordion.Root className="flex w-full flex-col" {...props} />;
}
