import { Input as BaseInput } from "@base-ui/react/input";
import { Search as SearchIcon, X } from "lucide-react";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import type { SearchProps } from "./search";
import {
  expandableBoxClass,
  expandableWrapperClass,
  searchClearButtonClass,
  searchInputClass,
} from "./search-context";

export type ExpandableSearchProps = SearchProps;

/** A search field that collapses to a magnifier icon and expands while focused or filled. */
export function ExpandableSearch({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search",
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: ExpandableSearchProps) {
  const [currentValue, commit] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });
  const hasValue = currentValue != null && currentValue !== "";
  const resolvedAriaLabel = ariaLabel ?? (ariaLabelledBy ? undefined : "Search");
  const [focused, setFocused] = React.useState(false);
  const showExpanded = focused || hasValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={expandableWrapperClass}>
      <label className={expandableBoxClass} data-expanded={showExpanded ? "" : undefined}>
        <SearchIcon aria-hidden className="size-4 shrink-0 text-icon-secondary" />
        <BaseInput
          ref={inputRef}
          type="search"
          value={currentValue}
          onValueChange={(next) => commit(next)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              if (hasValue) commit("");
              else inputRef.current?.blur();
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={resolvedAriaLabel}
          aria-labelledby={ariaLabelledBy}
          className={searchInputClass}
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
    </div>
  );
}
