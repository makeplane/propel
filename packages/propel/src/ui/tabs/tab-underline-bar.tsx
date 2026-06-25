import { underlineBarTrackVariants, underlineBarVariants } from "./variants";

/**
 * The sliding underline beneath an `underline`-appearance tab's label: a padded track containing
 * the decorative bar that tints on hover and goes transparent when active (the shared
 * `TabsIndicator` takes over). Owns both styled `<span>`s so the underline cva stays internal.
 */
export function TabUnderlineBar() {
  return (
    <span className={underlineBarTrackVariants()}>
      <span aria-hidden className={underlineBarVariants()} />
    </span>
  );
}
