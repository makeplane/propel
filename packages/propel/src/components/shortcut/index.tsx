import {
  Shortcut as ShortcutSlot,
  type ShortcutMagnitude,
  type ShortcutProps as ShortcutSlotProps,
} from "../../internal/shortcut";

export type { ShortcutMagnitude };

export type ShortcutProps = Omit<ShortcutSlotProps, "children" | "render"> & {
  /** Keyboard shortcut text, e.g. `"⌘ K"`. */
  keys: string;
};

/**
 * Public shortcut text slot. It is a visual hint by default; put the canonical `aria-keyshortcuts`
 * value on the actionable item or trigger.
 */
export function Shortcut({ keys, "aria-hidden": ariaHidden = true, ...props }: ShortcutProps) {
  return (
    <ShortcutSlot aria-hidden={ariaHidden} {...props}>
      {keys}
    </ShortcutSlot>
  );
}
