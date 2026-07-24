import {
  ButtonGroup as ButtonGroupElement,
  type ButtonGroupButtonSize,
  type ButtonGroupProps as ButtonGroupElementProps,
} from "../../elements/button-group";
import { ButtonGroupContext } from "./button-group-context";

export type ButtonGroupProps = ButtonGroupElementProps & {
  /** Size applied to every `ButtonGroupButton` in the group (each can still override it). */
  size: ButtonGroupButtonSize;
};

/**
 * The ready-made connected button group: a `group`-role container that shares `size` with every
 * `ButtonGroupButton` inside via context (an item's own `size` still wins). There is no Base UI
 * button-group primitive — the items are independent Base UI `Button`s; the group contributes only
 * the shared chrome and the `group` role. Name the group for assistive tech via `aria-label`.
 */
export function ButtonGroup({ size, ...props }: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={size}>
      <ButtonGroupElement role="group" {...props} />
    </ButtonGroupContext.Provider>
  );
}
