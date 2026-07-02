export * from "./avatar";
// Re-export the avatar tone palette + magnitude type so the components-tier story (and
// consumers) can reach them without dropping to `elements/avatar`.
export { AVATAR_TONES, type AvatarMagnitude, type AvatarTone } from "../../elements/avatar";
