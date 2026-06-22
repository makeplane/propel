import { cva } from "class-variance-authority";

// ToggleGroup is a layout container around `Toggle`s; Base UI handles selection
// state and roving focus. Orientation is driven by the native `orientation` prop
// and reflected as `[data-orientation]`, so the row/column flip keys off that.
export const toggleGroupVariants = cva(
  "inline-flex items-center gap-1 data-[orientation=vertical]:flex-col",
);
