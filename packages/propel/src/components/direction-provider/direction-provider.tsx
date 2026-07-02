import { DirectionProvider as BaseDirectionProvider } from "@base-ui/react/direction-provider";

export type DirectionProviderProps = BaseDirectionProvider.Props;

/**
 * Base UI's reading-direction context, re-exported so RTL apps compose entirely from propel. Wrap
 * the app (or a subtree) with `direction="rtl"` so portaled surfaces — popups, tooltips, menus —
 * position and mirror correctly; pair it with `dir="rtl"` on `<html>` for the CSS logical
 * properties.
 */
export function DirectionProvider(props: DirectionProviderProps) {
  return <BaseDirectionProvider {...props} />;
}
