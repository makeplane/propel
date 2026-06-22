import { cva } from "class-variance-authority";

// Overlapping stack of avatars — mirrors the Figma "Avatar groups" -6px overlap.
// `-space-x-1.5` is the negative margin between siblings; each `Avatar`'s own
// `border-subtle` is the single ring that separates them.
export const avatarGroupVariants = cva("inline-flex items-center -space-x-1.5");
