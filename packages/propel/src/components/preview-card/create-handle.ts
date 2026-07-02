import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

/**
 * Base UI's detached-handle API, flattened to the family name: create a handle outside the React
 * tree, pass it to the root's `handle` prop, and drive the surface imperatively
 * (`handle.open(payload)`) — e.g. one previewcard shared by many launch points.
 */
export const createPreviewCardHandle = BasePreviewCard.createHandle;

export type PreviewCardHandle = ReturnType<typeof createPreviewCardHandle>;
