import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "class-variance-authority";
import { Search as SearchIcon, X } from "lucide-react";
import * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";

// The Figma "Search" component (node 1393-45336) is a single-line search field: a
// 32px-tall, 8px-radius box with a leading magnifier, the value, and a trailing clear
// (✕) button that appears once there's text. Built on Base UI `Input` (the text-input
// primitive). States are element-driven — hover darkens the fill, `:focus-within` swaps
// the border to `accent-strong` with a 2px accent ring and darkens the magnifier — not
// props, so the only inputs are the value + placeholder.

// The box chrome. `group/search` lets the magnifier react to `:focus-within`. The 2px
// accent ring is the Figma "active" treatment; hover darkens the fill while resting.
// The ring opacity is 25% per the Search frame (rgba(0,99,153,0.25)) — Input uses 20%,
// so this difference is intentional, not drift.
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
 * A search field — a leading magnifier, a text input, and a clear (✕) button that appears once
 * there's text. Built on Base UI `Input`. Drive it with `value` + `onValueChange` (controlled) or
 * `defaultValue` (uncontrolled). It fills its container's width; wrap it to constrain.
 */
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
    onChange: onValueChange,
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const hasValue = currentValue != null && currentValue !== "";
  // Only default to "Search" when the consumer gives the field no name of its own. An
  // `aria-label` would override an `aria-labelledby`, so skip it when one is provided.
  const resolvedAriaLabel = ariaLabel ?? (ariaLabelledBy ? undefined : "Search");

  return (
    // A `<label>` forwards clicks anywhere in the box (magnifier, padding) to the input;
    // the trailing clear button keeps its own onClick. It carries no text, so it adds
    // association without an accessible name — the input's aria-label still names it.
    <label className={searchBoxClass}>
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
        aria-label={resolvedAriaLabel}
        aria-labelledby={ariaLabelledBy}
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
    </label>
  );
}

// ExpandableSearch (Figma node 2509:6515) is a search field that collapses to a 28px
// magnifier to save space and expands to a 204px input on demand — the toolbar/header
// pattern where search hides until needed. It expands while the field is focused (and
// whenever it holds a value, so a filled field never collapses out from under its text)
// and collapses again when blurred empty. Expanded it reads as a search box: an accent
// border + 1px accent ring on focus, a subtle border at rest with a value, and a clear
// (✕) button once there's text.
//
// There is no separate toggle control: the `<input>` itself is the single focusable
// element, so keyboard and screen-reader users always land on a real `searchbox` (the
// magnifier is a decorative `aria-hidden` glyph) and pointer users focus it by clicking
// anywhere in the box. Focus drives the open state, so the collapse/expand never adds a
// dangling `aria-expanded` or a control that swaps roles mid-interaction.
//
// The open/close is animated, not an instant swap: the box stays mounted and transitions
// its `width` between the 28px icon and the 204px field. It is pinned to the inline-end
// of a fixed 28px wrapper and grows toward the inline-start, so it opens leftward (LTR) /
// rightward (RTL) into the space beside it without reflowing its neighbors. `overflow-
// hidden` clips the field while it grows, so the leading magnifier slides out with the
// growing edge. Width, border, and fill transition together (and not at all under
// `prefers-reduced-motion`).

// Fixed collapsed footprint: the animated box is absolutely positioned within it, so
// expanding overflows this 28px box instead of pushing siblings.
const expandableWrapperClass = "relative inline-flex size-7 shrink-0";

const expandableBoxClass = cx(
  "group/search absolute end-0 top-0 inline-flex h-7 w-7 items-center gap-2 overflow-hidden rounded-md px-1.5",
  "border-sm border-transparent bg-layer-transparent",
  "transition-[width,border-color,background-color] duration-200 ease-out motion-reduce:transition-none",
  // Collapsed it reads as an icon button (hover fill). It never rests focused — focusing
  // the field expands it — so the focus ring lives on the expanded chrome below.
  "not-data-[expanded]:hover:bg-layer-transparent-hover",
  // Expanded: widen to the full field and show the search-box chrome (subtle border +
  // layer-2 fill at rest, accent border + 1px accent ring on focus).
  "data-[expanded]:w-[204px] data-[expanded]:border-subtle-1 data-[expanded]:bg-layer-2",
  "data-[expanded]:focus-within:border-accent-strong data-[expanded]:focus-within:ring-1 data-[expanded]:focus-within:ring-accent-strong/35",
);

export type ExpandableSearchProps = SearchProps;

/**
 * A search field that collapses to a magnifier icon and expands into a full `Search`-style input
 * while focused — the toolbar/header pattern where search hides until needed. Built on Base UI
 * `Input`. The input itself is the only control (no separate toggle button), so it stays a real
 * `searchbox` for keyboard and screen-reader users; pointer users focus it by clicking the
 * magnifier. It collapses when blurred empty (or on `Escape`) and stays expanded while it has a
 * value. Drive the value with `value` + `onValueChange` (controlled) or `defaultValue`
 * (uncontrolled).
 */
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
  // Only default to "Search" when the consumer gives the field no name of its own. An
  // `aria-label` would override an `aria-labelledby`, so skip it when one is provided.
  const resolvedAriaLabel = ariaLabel ?? (ariaLabelledBy ? undefined : "Search");
  // Focus is the open trigger; the field also stays open whenever it has a value, so a
  // filled field never collapses out from under its text.
  const [focused, setFocused] = React.useState(false);
  const showExpanded = focused || hasValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={expandableWrapperClass}>
      {/* The box animates its width between the icon and the field. A `<label>` forwards
          clicks anywhere in the box (magnifier, padding) to the input; the trailing clear
          button keeps its own onClick. It carries no text, so it adds association without
          an accessible name — the input's aria-label still names it. */}
      <label className={expandableBoxClass} data-expanded={showExpanded ? "" : undefined}>
        <SearchIcon aria-hidden className="size-4 shrink-0 text-icon-secondary" />
        <BaseInput
          ref={inputRef}
          type="search"
          value={currentValue}
          onValueChange={(next) => commit(next)}
          // Focus opens the field; blurring it empty collapses it back to the icon.
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // Escape clears the field, then (when already empty) blurs it shut — an explicit
          // keyboard close to mirror the pointer affordance.
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
      </label>
    </div>
  );
}
