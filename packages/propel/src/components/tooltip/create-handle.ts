import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

/**
 * Base UI's detached-handle API, flattened to the family name: create a handle outside the React
 * tree, pass it to the root's `handle` prop, and drive the surface imperatively
 * (`handle.open(payload)`) — e.g. one tooltip shared by many launch points.
 */
export const createTooltipHandle = BaseTooltip.createHandle;

export type TooltipHandle = ReturnType<typeof createTooltipHandle>;
