import type { Meta, StoryObj } from "@storybook/react-vite";
import { User } from "lucide-react";
import { expect } from "storybook/test";

import {
  Avatar,
  AVATAR_TONES,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
  type AvatarMagnitude,
} from "./index";

const MAGNITUDES: AvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

// An inline-SVG "photo" so the image state renders deterministically with no network.
const PHOTO_SRC = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#7dd3fc"/><circle cx="44" cy="18" r="8" fill="#fde047"/><path d="M0 64 24 34l14 16 10-10 16 24Z" fill="#16a34a"/></svg>',
)}`;

// elements-tier story (rule 2b): a pure UI-configuration showcase — the styled parts render
// DIRECTLY, with no Base UI grafts. The avatar cvas key off no `data-*`/aria state, so each visual
// state is simply which child renders (image / initials / icon). Image-load fallback and the
// `delay` behavior are demonstrated AND tested in Components/Avatar. `meta.component` is the
// no-variant `AvatarImage` so no props are forced into story args.
const meta = {
  title: "Elements/Avatar",
  component: AvatarImage,
  subcomponents: { Avatar, AvatarFallback, AvatarIcon },
} satisfies Meta<typeof AvatarImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding a loaded image. `role="img"` + `aria-label` give the avatar its accessible name. */
export const Default: Story = {
  render: () => (
    <Avatar magnitude="md" role="img" aria-label="Ada Lovelace">
      <AvatarImage src={PHOTO_SRC} alt="" />
    </Avatar>
  ),
};

/** Every avatar size (Figma 2xs 16px → 3xl 64px). */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Avatar key={magnitude} magnitude={magnitude} role="img" aria-label={magnitude}>
          <AvatarFallback tone="indigo">AL</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** The fallback's `tone` colors the initials surface — one swatch per Figma avatar tone. */
export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {AVATAR_TONES.map((tone) => (
        <Avatar key={tone} magnitude="lg" role="img" aria-label={tone}>
          <AvatarFallback tone={tone}>{tone[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/**
 * `AvatarIcon` sizes the anonymous person glyph per magnitude — Figma's explicit icon px values,
 * not a fixed fraction of the avatar.
 */
export const IconMagnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Avatar key={magnitude} magnitude={magnitude} role="img" aria-label={magnitude}>
          <AvatarIcon magnitude={magnitude}>
            <User />
          </AvatarIcon>
        </Avatar>
      ))}
    </div>
  ),
};

/** The three content states: image, initials, and the anonymous person icon (the icon slot). */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar magnitude="lg" role="img" aria-label="Image">
        <AvatarImage src={PHOTO_SRC} alt="" />
      </Avatar>
      <Avatar magnitude="lg" role="img" aria-label="Initials">
        <AvatarFallback tone="emerald">GH</AvatarFallback>
      </Avatar>
      <Avatar magnitude="lg" role="img" aria-label="Anonymous">
        <AvatarIcon magnitude="lg">
          <User />
        </AvatarIcon>
      </Avatar>
    </div>
  ),
};

/**
 * The single project-wide CSS check (the allowed rule-2b canary): an `md` avatar is `size-7` (28px)
 * and the tone utility resolves to a real color. Tagged out of the sidebar/docs/manifest but still
 * runs under `test`.
 */
export const CssCheck: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Avatar magnitude="md" role="img" aria-label="Ada Lovelace">
      <AvatarFallback tone="indigo">AL</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Ada Lovelace" })).toHaveStyle({ width: "28px" });
    const initials = canvas.getByText("AL");
    await expect(getComputedStyle(initials).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
