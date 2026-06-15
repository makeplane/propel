import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "class-variance-authority";
import { Search as SearchIcon, X } from "lucide-react";
import * as React from "react";

// The Figma "Search" component (node 1393-45336) is a single-line search field: a
// 32px-tall, 8px-radius box with a leading magnifier, the value, and a trailing clear
// (✕) button that appears once there's text. Built on Base UI `Input` (the text-input
// primitive). States are element-driven — hover darkens the fill, `:focus-within` swaps
// the border to `accent-strong` with a 2px accent ring and darkens the magnifier — not
// props, so the only inputs are the value + placeholder.

// The box chrome. `group/search` lets the magnifier react to `:focus-within`. The 2px
// accent ring is the Figma "active" treatment; hover darkens the fill while resting.
const searchBoxClass = cx(
  "group/search inline-flex h-8 w-full items-center gap-2 rounded-lg border-sm border-subtle-1 bg-layer-2 px-2",
  "transition-colors hover:bg-layer-2-hover",
  "focus-within:border-accent-strong focus-within:bg-layer-2 focus-within:ring-2 focus-within:ring-accent-strong/25",
  // Disabled: muted, no hover/ring (the Figma frame has no disabled state, but the
  // control is a real input and must degrade sensibly).
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-layer-2 has-[:disabled]:hover:bg-layer-2",
);

export type SearchProps = Omit<
  React.ComponentProps<typeof BaseInput>,
  "className" | "render" | "style" | "type" | "value" | "defaultValue" | "onValueChange"
> & {
  /** Current text. Controlled; pair with `onValueChange`. */
  value?: string;
  /** Initial text. Uncontrolled. */
  defaultValue?: string;
  /** Called with the new text on each change (and on clear, with `""`). */
  onValueChange?: (value: string) => void;
  /** Placeholder text. @default "Search" */
  placeholder?: string;
  /** Accessible name for the field. @default "Search" */
  "aria-label"?: string;
};

/**
 * A search field — a leading magnifier, a text input, and a clear (✕) button that
 * appears once there's text. Built on Base UI `Input`. Drive it with `value` +
 * `onValueChange` (controlled) or `defaultValue` (uncontrolled). It fills its
 * container's width; wrap it to constrain.
 */
export function Search({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search",
  disabled,
  "aria-label": ariaLabel = "Search",
  ...props
}: SearchProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const commit = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const hasValue = currentValue != null && currentValue !== "";

  return (
    <div className={searchBoxClass}>
      <SearchIcon
        aria-hidden
        className="size-4 shrink-0 text-icon-placeholder transition-colors group-focus-within/search:text-icon-secondary"
      />
      <BaseInput
        ref={inputRef}
        // `search` gives the field its searchbox role; the native WebKit clear glyph is
        // hidden in favor of propel's clear button.
        type="search"
        value={currentValue}
        onValueChange={(next) => commit(next)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cx(
          "min-w-0 flex-1 bg-transparent text-14 text-primary outline-none",
          "placeholder:text-placeholder disabled:cursor-not-allowed disabled:text-disabled",
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
        )}
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
          className={cx(
            "inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-icon-secondary outline-none",
            "transition-colors hover:bg-layer-transparent-hover",
            "focus-visible:ring-2 focus-visible:ring-accent-strong",
          )}
        >
          <X aria-hidden className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

// ExpandableSearch (Figma node 2509:6515) toggles between a collapsed 28px magnifier
// button and an expanded 204px input. It expands on click (focusing the field) and
// collapses again when the field is blurred while empty. Expanded it reads as a search
// box: an accent border + 1px accent ring on focus, a subtle border at rest with a
// value, and a clear (✕) button once there's text.
const expandableCollapsedClass = cx(
  "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-icon-secondary outline-none",
  "bg-layer-transparent transition-colors hover:bg-layer-transparent-hover",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
);

const expandableBoxClass = cx(
  "inline-flex h-7 w-[204px] items-center gap-2 rounded-md border-sm border-subtle-1 bg-layer-2 px-1.5",
  "transition-colors focus-within:border-accent-strong focus-within:ring-1 focus-within:ring-accent-strong/35",
);

export type ExpandableSearchProps = SearchProps;

/**
 * A search field that starts collapsed as a magnifier icon button and expands into a
 * full `Search`-style input on click — the toolbar/header pattern where search hides
 * until needed. Built on Base UI `Input`. It auto-collapses when blurred while empty,
 * and stays expanded while it has a value. Drive the value with `value` +
 * `onValueChange` (controlled) or `defaultValue` (uncontrolled).
 */
export function ExpandableSearch({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search",
  disabled,
  "aria-label": ariaLabel = "Search",
  ...props
}: ExpandableSearchProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue != null && currentValue !== "";
  // `expanded` is the user's open intent; the field also stays open whenever it has a
  // value, so a filled field never collapses out from under its text.
  const [expanded, setExpanded] = React.useState(hasValue);
  const showExpanded = expanded || hasValue;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const focusOnExpand = React.useRef(false);

  // Focus the input the moment it appears, but only when the user expanded it (not when
  // it opened because a controlled value arrived).
  React.useEffect(() => {
    if (showExpanded && focusOnExpand.current) {
      inputRef.current?.focus();
      focusOnExpand.current = false;
    }
  }, [showExpanded]);

  const commit = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  if (!showExpanded) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={false}
        disabled={disabled}
        onClick={() => {
          focusOnExpand.current = true;
          setExpanded(true);
        }}
        className={expandableCollapsedClass}
      >
        <SearchIcon aria-hidden className="size-4" />
      </button>
    );
  }

  return (
    <div className={expandableBoxClass}>
      <SearchIcon aria-hidden className="size-4 shrink-0 text-icon-secondary" />
      <BaseInput
        ref={inputRef}
        type="search"
        value={currentValue}
        onValueChange={(next) => commit(next)}
        // Collapse back to the icon when the field is left empty.
        onBlur={(event) => {
          if (event.target.value === "") setExpanded(false);
        }}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cx(
          "min-w-0 flex-1 bg-transparent text-14 text-primary outline-none",
          "placeholder:text-placeholder disabled:cursor-not-allowed disabled:text-disabled",
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
        )}
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
          className={cx(
            "inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-icon-secondary outline-none",
            "transition-colors hover:bg-layer-transparent-hover",
            "focus-visible:ring-2 focus-visible:ring-accent-strong",
          )}
        >
          <X aria-hidden className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}
