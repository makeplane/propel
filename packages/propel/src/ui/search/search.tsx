import { Input as BaseInput } from "@base-ui/react/input";
import { Search as SearchIcon, X } from "lucide-react";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import {
  searchBoxVariants,
  searchClearButtonVariants,
  searchIconClass,
  searchInputVariants,
  type SearchMagnitude,
} from "./variants";

export type { SearchMagnitude };

export type SearchProps = Omit<
  BaseInput.Props,
  "className" | "style" | "type" | "value" | "defaultValue" | "onValueChange"
> & {
  /** Height + text + icon scale. */
  magnitude: SearchMagnitude;
  /** Current text. Controlled; pair with `onValueChange`. */
  value?: string;
  /** Initial text. Uncontrolled. */
  defaultValue?: string;
  /** Called with the new text on each change and on clear. */
  onValueChange?: (value: string) => void;
  /** Placeholder text. @default "Search" */
  placeholder?: string;
  /** Accessible name for the field. @default "Search" */
  "aria-label"?: string;
};

/** A search field with leading magnifier and trailing clear button. */
export function Search({
  magnitude,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search",
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SearchProps) {
  const [currentValue, commit] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? "",
    onValueChange,
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const hasValue = currentValue != null && currentValue !== "";
  const resolvedAriaLabel = ariaLabel ?? (ariaLabelledBy ? undefined : "Search");

  return (
    <label className={searchBoxVariants({ magnitude })}>
      <span aria-hidden className={searchIconClass}>
        <SearchIcon />
      </span>
      <BaseInput
        ref={inputRef}
        type="search"
        value={currentValue}
        onValueChange={(next) => commit(next)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={resolvedAriaLabel}
        aria-labelledby={ariaLabelledBy}
        className={searchInputVariants({ magnitude })}
        {...props}
      />
      {hasValue && !disabled ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            commit("");
            inputRef.current?.focus();
          }}
          className={searchClearButtonVariants({ magnitude })}
        >
          <X aria-hidden />
        </button>
      ) : null}
    </label>
  );
}
