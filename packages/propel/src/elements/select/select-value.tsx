import { useRender } from "@base-ui/react/use-render";

export type SelectValueProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled selected-value display inside a trigger. Base-UI-agnostic — graft the value behavior
 * in `components` via `<BaseSelect.Value render={<SelectValue/>} />`.
 */
export function SelectValue({ render, ...props }: SelectValueProps) {
  return useRender({ defaultTagName: "span", render, props });
}
