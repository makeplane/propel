import { Search as SearchIconGlyph, X } from "lucide-react";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import {
  Search as SearchElement,
  SearchIcon,
  SearchInput,
  type SearchInputProps,
  type SearchMagnitude,
} from "../../ui/search";
import { IconButton } from "../icon-button";

export type { SearchMagnitude };

export type SearchProps = Omit<
  SearchInputProps,
  "magnitude" | "value" | "defaultValue" | "onValueChange"
> & {
  /** Height + text + icon scale. */
  magnitude: SearchMagnitude;
  /** Current text. Controlled; pair with `onValueChange`. */
  value?: string;
  /** Initial text. Uncontrolled. */
  defaultValue?: string;
  /** Called with the new text on each change and on clear. */
  onValueChange?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /**
   * Accessible name for the field. The consumer must supply this (or `aria-labelledby`) to name the
   * field.
   */
  "aria-label"?: string;
  /** Accessible name for the clear button. */
  clearLabel: string;
};

/** A search field with leading magnifier and trailing clear button. */
export function Search({
  magnitude,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  clearLabel,
  ...props
}: SearchProps) {
  const [currentValue, commit] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? "",
    onValueChange,
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const hasValue = currentValue != null && currentValue !== "";

  return (
    <SearchElement magnitude={magnitude}>
      <SearchIcon>
        <SearchIconGlyph />
      </SearchIcon>
      <SearchInput
        ref={inputRef}
        magnitude={magnitude}
        value={currentValue}
        onValueChange={(next) => commit(next)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      />
      {hasValue && !disabled ? (
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude={magnitude === "lg" ? "md" : "sm"}
          aria-label={clearLabel}
          onClick={() => {
            commit("");
            inputRef.current?.focus();
          }}
        >
          <X aria-hidden />
        </IconButton>
      ) : null}
    </SearchElement>
  );
}
