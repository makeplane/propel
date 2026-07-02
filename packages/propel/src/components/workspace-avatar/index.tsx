export * from "./workspace-avatar";
// Re-export the avatar tone palette + the workspace magnitude type so the components-tier
// story (and consumers) can reach them without dropping to the elements tier.
export { AVATAR_TONES, type AvatarTone } from "../../elements/avatar";
export { type WorkspaceAvatarMagnitude } from "../../elements/workspace-avatar";
