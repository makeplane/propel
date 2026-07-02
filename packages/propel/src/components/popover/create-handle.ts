import { Popover as BasePopover } from "@base-ui/react/popover";

/**
 * Base UI's detached-handle API, flattened to the family name: create a handle outside the React
 * tree, pass it to the root's `handle` prop, and drive the surface imperatively
 * (`handle.open(payload)`) — e.g. one popover shared by many launch points.
 */
export const createPopoverHandle = BasePopover.createHandle;

export type PopoverHandle = ReturnType<typeof createPopoverHandle>;
