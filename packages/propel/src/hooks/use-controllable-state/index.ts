import * as React from "react";

export type UseControllableStateParams<T> = {
  /**
   * The controlled value. When provided (not `undefined`), the hook is controlled and this value is
   * always returned; internal state is never used.
   */
  value?: T;
  /** The initial value when uncontrolled. Seeds the internal state. */
  defaultValue?: T;
  /** Called with the next value on every change, in both controlled and uncontrolled mode. */
  onValueChange?: (next: T) => void;
};

/**
 * Manages a value that may be either controlled (a `value` prop is supplied) or uncontrolled
 * (seeded from `defaultValue` and tracked internally). It returns the current value and a setter:
 * the setter updates internal state only when uncontrolled and always calls `onValueChange`, so the
 * consumer can mirror the value regardless of which mode it is in. A `value` of `undefined` is
 * treated as uncontrolled.
 *
 * ```tsx
 * function Toggle({ pressed, defaultPressed, onPressedChange }: ToggleProps) {
 *   const [isPressed, setPressed] = useControllableState({
 *     value: pressed,
 *     defaultValue: defaultPressed ?? false,
 *     onValueChange: onPressedChange,
 *   });
 *   return <button aria-pressed={isPressed} onClick={() => setPressed(!isPressed)} />;
 * }
 * ```
 */
// When a `defaultValue` (or controlled `value`) is supplied, the current value is
// guaranteed to be `T`. Without either, an uncontrolled hook starts at `undefined`,
// so the current value is `T | undefined`.
export function useControllableState<T>(
  params: UseControllableStateParams<T> & ({ value: T } | { defaultValue: T }),
): [T, (next: T) => void];
export function useControllableState<T>(
  params: UseControllableStateParams<T>,
): [T | undefined, (next: T) => void];
export function useControllableState<T>({
  value,
  defaultValue,
  onValueChange,
}: UseControllableStateParams<T>): [T | undefined, (next: T) => void] {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const current = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return [current, setValue];
}
