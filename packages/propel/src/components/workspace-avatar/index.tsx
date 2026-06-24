export { WorkspaceAvatar, type WorkspaceAvatarProps } from "./workspace-avatar";
// Re-export the avatar tone palette + the workspace magnitude type so the components-tier
// story (and consumers) can reach them without dropping to the ui tier.
export { AVATAR_TONES, type AvatarTone } from "../../ui/avatar";
export { type WorkspaceAvatarMagnitude } from "../../ui/workspace-avatar";
