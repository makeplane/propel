import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";

export type ToolbarSeparatorProps = Omit<BaseToolbar.Separator.Props, "className" | "style">;

/** A thin vertical rule that visually divides one cluster of controls from the next. */
export function ToolbarSeparator(props: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      className="mx-1 h-5 w-0 shrink-0 border-s-sm border-subtle-1"
      {...props}
    />
  );
}
