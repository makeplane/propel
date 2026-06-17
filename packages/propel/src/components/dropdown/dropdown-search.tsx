import { Search } from "lucide-react";
import type * as React from "react";

export type DropdownSearchProps = Omit<
  React.ComponentProps<"input">,
  "className" | "style" | "onChange" | "value" | "type"
> & {
  /** Current search text. */
  value?: string;
  /** Called with the new text on each keystroke. */
  onValueChange?: (value: string) => void;
  /** Placeholder text. @default "Search" */
  placeholder?: string;
};

/** A sticky search input pinned above a `DropdownContent` menu popup. */
export function DropdownSearch({
  value,
  onValueChange,
  placeholder = "Search",
  ...props
}: DropdownSearchProps) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-subtle bg-surface-1 px-3 py-2">
      <Search className="size-4 shrink-0 text-icon-tertiary" aria-hidden="true" />
      <input
        type="text"
        onKeyDown={(event) => event.stopPropagation()}
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-13 text-secondary outline-none placeholder:text-placeholder"
        {...props}
      />
    </div>
  );
}
