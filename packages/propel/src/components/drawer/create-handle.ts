import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

/**
 * Base UI's detached-handle API, flattened to the family name: create a handle outside the React
 * tree, pass it to the root's `handle` prop, and drive the surface imperatively
 * (`handle.open(payload)`) — e.g. one drawer shared by many launch points.
 */
export const createDrawerHandle = BaseDrawer.createHandle;

export type DrawerHandle = ReturnType<typeof createDrawerHandle>;
