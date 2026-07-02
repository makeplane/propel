// The per-axis `density` type stays public from this entry (an explicit cross-tier re-export — a
// `components` index never `export *`s from `elements`, rule: index re-exports).
export type { CheckboxGroupDensity } from "../../elements/checkbox-group/index";
export * from "./checkbox-group";
