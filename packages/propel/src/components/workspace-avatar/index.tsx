export * from "./workspace-avatar";
// Re-export the magnitude type so consumers can size the avatar without dropping to the elements
// tier. Tone is intentionally NOT re-exported — the initials color is system-chosen, not a
// consumer prop.
export { type WorkspaceAvatarMagnitude } from "../../elements/workspace-avatar";
