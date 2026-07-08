import { cx } from "class-variance-authority";

/**
 * The disclosure trigger core shared by accordion and collapsible (rule 4a): a `group`-carrying row
 * (its `DisclosureIndicator` reads the open state) with the shared type treatment, focus ring, and
 * disabled dimming. Families add their own geometry (accordion's padding + hover fill,
 * collapsible's full width). `disclosureTriggerTitleClass` is the growing, wrapping label beside
 * the caret.
 */
export const disclosureTriggerClass = cx(
  "group flex items-center gap-2 text-start [--node-size:1rem]",
  "text-14 font-medium text-primary",
  "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
  // Dim + block the cursor for BOTH disabled spellings: the native `disabled` attribute (used when a
  // trigger is disabled directly) and Base UI's `data-disabled`/`aria-disabled` (set when the
  // enclosing accordion/collapsible item is disabled — those keep the trigger focusable, so no
  // native `disabled` attribute lands and `:disabled` alone would never match).
  "disabled:cursor-not-allowed disabled:opacity-60",
  "data-disabled:cursor-not-allowed data-disabled:opacity-60",
);
export const disclosureTriggerTitleClass = "min-w-0 flex-1 text-start";
