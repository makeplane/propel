import { cx } from "class-variance-authority";

export const searchBoxClass = cx(
  "group/search inline-flex h-8 w-full items-center gap-2 rounded-lg border-sm border-subtle-1 bg-layer-2 px-2",
  "transition-colors hover:bg-layer-2-hover",
  "focus-within:border-accent-strong focus-within:bg-layer-2 focus-within:ring-2 focus-within:ring-accent-strong/25",
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-layer-2 has-[:disabled]:hover:bg-layer-2",
);

export const searchInputClass = cx(
  "min-w-0 flex-1 bg-transparent text-14 text-primary outline-none",
  "placeholder:text-placeholder disabled:cursor-not-allowed disabled:text-disabled",
  "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
);

export const searchClearButtonClass = cx(
  "inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-icon-secondary outline-none",
  "transition-colors hover:bg-layer-transparent-hover",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
);

export const expandableWrapperClass = "relative inline-flex size-7 shrink-0";

export const expandableBoxClass = cx(
  "group/search absolute inset-e-0 top-0 inline-flex h-7 w-7 items-center gap-2 overflow-hidden rounded-md px-1.5",
  "border-sm border-transparent bg-layer-transparent",
  "transition-[width,border-color,background-color] duration-200 ease-out motion-reduce:transition-none",
  "not-data-expanded:hover:bg-layer-transparent-hover",
  "data-expanded:w-51 data-expanded:border-subtle-1 data-expanded:bg-layer-2",
  "data-expanded:focus-within:border-accent-strong data-expanded:focus-within:ring-1 data-expanded:focus-within:ring-accent-strong/35",
);
