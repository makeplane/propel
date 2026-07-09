export * from "./avatar";
// Re-export the magnitude type so consumers can size an avatar without dropping to
// `elements/avatar`. Tone is intentionally NOT re-exported — the initials color is system-chosen,
// not a consumer prop.
export { type AvatarMagnitude } from "../../elements/avatar";
