import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

/** Props for {@link Tooltip} (the Base UI `Tooltip.Root`). */
export type TooltipProps = Omit<BaseTooltip.Root.Props, "className" | "style">;

/**
 * The atomic `Tooltip.Root` — maps 1:1 to Base UI's `Tooltip.Root`. It renders no DOM of its own;
 * it just groups the tooltip parts (`TooltipTrigger` + `TooltipPortal` → `TooltipPositioner` →
 * `TooltipPopup`) and owns the open/close state.
 *
 * For the ready-made tooltip (label + optional shortcut + arrow), use the `Tooltip` from
 * `@plane/propel/components/tooltip`.
 */
export function Tooltip(props: TooltipProps) {
  return <BaseTooltip.Root {...props} />;
}
