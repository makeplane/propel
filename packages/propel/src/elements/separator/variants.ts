import { cva } from "class-variance-authority";

// Separator is a structural divider — Base UI drives its `orientation` (and the
// matching `role`/`aria-orientation`) from the native `orientation` prop and
// reflects it as `[data-orientation]`, so styling keys off that single source of
// truth rather than a duplicate styling axis. Uses the Figma `border/subtle` rule.
export const separatorVariants = cva(
  "shrink-0 border-subtle data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-t-sm data-[orientation=vertical]:w-0 data-[orientation=vertical]:self-stretch data-[orientation=vertical]:border-s-sm",
);
