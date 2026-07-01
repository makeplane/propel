import { Search } from "lucide-react";
import type * as React from "react";

import { MenuSearch as MenuSearchElement, MenuSearchIcon, MenuSearchInput } from "../../ui/menu";

export type MenuSearchProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "style" | "onChange" | "value" | "type"
> & {
  /** Current search text. */
  value?: string;
  /** Called with the new text on each keystroke. */
  onValueChange?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
};

/** A sticky search input pinned above a `MenuContent` menu popup. */
export function MenuSearch({ value, onValueChange, placeholder, ...props }: MenuSearchProps) {
  return (
    <MenuSearchElement>
      <MenuSearchIcon>
        <Search />
      </MenuSearchIcon>
      <MenuSearchInput
        type="text"
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </MenuSearchElement>
  );
}
