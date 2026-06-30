import { Search as SearchIconGlyph, X } from "lucide-react";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import {
  SearchClear,
  SearchExpandable,
  SearchExpandableViewport,
  SearchIcon,
  SearchInput,
} from "../../ui/search";
import type { SearchProps } from "./search";

export type ExpandableSearchProps = SearchProps;

/** A search field that collapses to a magnifier icon and expands while focused or filled. */
export function ExpandableSearch({
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
}: ExpandableSearchProps) {
  const [currentValue, commit] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? "",
    onValueChange,
  });
  const hasValue = currentValue != null && currentValue !== "";
  const resolvedAriaLabel = ariaLabel;
  const [focused, setFocused] = React.useState(false);
  const showExpanded = focused || hasValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <SearchExpandableViewport magnitude={magnitude}>
      <SearchExpandable magnitude={magnitude} data-expanded={showExpanded ? "" : undefined}>
        <SearchIcon>
          <SearchIconGlyph />
        </SearchIcon>
        <SearchInput
          ref={inputRef}
          magnitude={magnitude}
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
          {...props}
        />
        {hasValue && !disabled ? (
          <SearchClear
            magnitude={magnitude}
            aria-label={clearLabel}
            onClick={() => {
              commit("");
              inputRef.current?.focus();
            }}
          >
            <X aria-hidden />
          </SearchClear>
        ) : null}
      </SearchExpandable>
    </SearchExpandableViewport>
  );
}
