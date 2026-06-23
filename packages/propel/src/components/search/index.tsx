export { ExpandableSearch, type ExpandableSearchProps } from "./expandable-search";
export { Search, type SearchMagnitude, type SearchProps } from "./search";
// Re-export the atomic ui parts so a custom search is composable from this convenience.
export {
  SearchClear,
  type SearchClearProps,
  SearchExpandable,
  type SearchExpandableProps,
  SearchExpandableViewport,
  type SearchExpandableViewportProps,
  SearchIcon,
  type SearchIconProps,
  SearchInput,
  type SearchInputProps,
} from "../../ui/search";
