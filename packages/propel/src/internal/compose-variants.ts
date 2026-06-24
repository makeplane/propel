import { cx, type VariantProps } from "class-variance-authority";

type VariantFn = (...args: never[]) => string;

/**
 * Compose a shared (internal) cva with a component's local cva into one className function —
 * `cx(shared(props), local(props))`. The result's variant props are the **intersection** of both,
 * so a local cva that omits or narrows an axis (e.g. IconButton's `variant` has no `link`, and it
 * has no `emphasis`/`sizing`) narrows that axis out of the composed props. Pair with
 * `StrictVariantProps<typeof composed>` to get exactly the axes the surface supports, all
 * required.
 */
export function composeVariants<Shared extends VariantFn, Local extends VariantFn>(
  shared: Shared,
  local: Local,
): (props: VariantProps<Shared> & VariantProps<Local>) => string {
  return (props) => cx(shared(props as never), local(props as never));
}
