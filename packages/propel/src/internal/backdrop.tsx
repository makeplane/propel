import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

/**
 * The shared overlay backdrop surface, grafted onto any Base UI `*.Backdrop` behavior in
 * `components` (`<BaseDialog.Backdrop render={<Backdrop />}>`). Dims the page behind a MODAL
 * overlay and fades with the overlay's open/close transition. Byte-identical across every modal
 * family — alert-dialog, dialog, drawer — so it lives here rather than being copied per family
 * (rule 4a). No styling axes.
 *
 * Reach for this only when the overlay is genuinely modal (traps focus, blocks the rest of the
 * page). A non-modal, hover/focus-triggered surface — preview-card, popover, tooltip, menu,
 * context-menu — has no business dimming the page just because it's open; it doesn't graft a
 * `*.Backdrop` behavior at all, styled or not.
 */
export const backdropVariants = cva(
  "fixed inset-0 bg-backdrop transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
);

export type BackdropProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

export function Backdrop({ render, ...props }: BackdropProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: backdropVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
