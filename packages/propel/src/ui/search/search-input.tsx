import { Input as BaseInput } from "@base-ui/react/input";

import { searchInputVariants, type SearchInputVariantProps } from "./variants";

export type SearchInputProps = Omit<BaseInput.Props, "className" | "style" | "type"> &
  SearchInputVariantProps;

/**
 * The text field itself — a `type="search"` input that fills the box row. Placeholder and disabled
 * colors live here; the box (`Search` / `SearchExpandable`) owns the chrome.
 */
export function SearchInput({ magnitude, ...props }: SearchInputProps) {
  return <BaseInput type="search" className={searchInputVariants({ magnitude })} {...props} />;
}
