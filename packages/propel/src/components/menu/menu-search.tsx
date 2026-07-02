import { Search } from "lucide-react";
import type * as React from "react";

import {
  MenuSearch as MenuSearchElement,
  MenuSearchIcon,
  MenuSearchInput,
} from "../../elements/menu";

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

/**
 * A sticky search input pinned above a `MenuContent` menu popup. Stops keydown from bubbling so
 * typing does not trigger the menu's own type-ahead navigation (behavior owned by `components`).
 */
export function MenuSearch({
  value,
  onValueChange,
  placeholder,
  onKeyDown,
  ...props
}: MenuSearchProps) {
  return (
    <MenuSearchElement>
      <MenuSearchIcon>
        <Search />
      </MenuSearchIcon>
      <MenuSearchInput
        type="text"
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        onKeyDown={(event) => {
          event.stopPropagation();
          onKeyDown?.(event);
        }}
        placeholder={placeholder}
        {...props}
      />
    </MenuSearchElement>
  );
}
