/**
 * Chrome shared verbatim by the Avatar and WorkspaceAvatar families (rule 4a). The two stay
 * discrete `components` — a person vs a workspace — and differ in shape (circle vs squared steps),
 * but the photo treatment and the centered fallback layout are one design.
 */
export const avatarImageClass = "size-full object-cover";
export const avatarFallbackClass = "flex size-full items-center justify-center leading-none";

/**
 * The shared fallback tone map — Avatar and WorkspaceAvatar carry the exact same six label hues
 * (there is no neutral "none" tone: an avatar with no initials shows its icon slot over the root's
 * `layer-1` backdrop instead).
 */
export const avatarTones = {
  orange: "bg-label-orange-bg-strong text-on-color",
  indigo: "bg-label-indigo-bg-strong text-on-color",
  emerald: "bg-label-emerald-bg-strong text-on-color",
  crimson: "bg-label-crimson-bg-strong text-on-color",
  pink: "bg-label-pink-bg-strong text-on-color",
  purple: "bg-label-purple-bg-strong text-on-color",
} as const;
