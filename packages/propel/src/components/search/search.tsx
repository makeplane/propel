import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "class-variance-authority";
import { Search as SearchIcon, X } from "lucide-react";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import { searchBoxClass, searchClearButtonClass, searchInputClass } from "./search-styles";

export type SearchProps = Omit<
  React.ComponentProps<typeof BaseInput>,
  "className" | "render" | "style" | "type" | "value" | "defaultValue" | "onValueChange"
> & {
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
    <label className={searchBoxClass}>
      <SearchIcon
        aria-hidden
        className="size-4 shrink-0 text-icon-placeholder transition-colors group-focus-within/search:text-icon-secondary"
      />
      <BaseInput
        ref={inputRef}
        type="search"
        value={currentValue}
        onValueChange={(next) => commit(next)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={resolvedAriaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cx(searchInputClass)}
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
          className={searchClearButtonClass}
        >
          <X aria-hidden className="size-3.5" />
        </button>
      ) : null}
    </label>
  );
}
