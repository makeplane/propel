import { Menu as BaseMenu } from "@base-ui/react/menu";

/**
 * Base UI's detached-handle API, flattened to the family name: create a handle outside the React
 * tree, pass it to the root's `handle` prop, and drive the surface imperatively
 * (`handle.open(payload)`) — e.g. one menu shared by many launch points.
 */
export const createMenuHandle = BaseMenu.createHandle;

export type MenuHandle = ReturnType<typeof createMenuHandle>;
