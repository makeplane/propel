import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
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

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// `Avatar` behavior/context grafts them via `render` (behavior part outer). The components-tier
// `Avatar` story uses the ready-made avatar (`src` → initials → person icon), which assembles these
// parts. `meta.component` is the no-variant `AvatarImage` so no props are forced into story args.
const meta = {
  title: "Elements/Avatar",
  component: AvatarImage,
  subcomponents: { Avatar, AvatarFallback, AvatarIcon },
} satisfies Meta<typeof AvatarImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding an image, with initials as the fallback while the image loads/fails. */
export const Default: Story = {
  render: () => (
    <BaseAvatar.Root render={<Avatar magnitude="md" />} role="img" aria-label="Ada Lovelace">
      <BaseAvatar.Image render={<AvatarImage />} src="https://i.pravatar.cc/128?img=47" alt="" />
      <BaseAvatar.Fallback render={<AvatarFallback tone="orange" />}>AL</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  ),
};

/** Every avatar size (Figma 2xs 16px → 3xl 64px). */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <BaseAvatar.Root
          key={magnitude}
          render={<Avatar magnitude={magnitude} />}
          role="img"
          aria-label={magnitude}
        >
          <BaseAvatar.Fallback render={<AvatarFallback tone="indigo" />}>AL</BaseAvatar.Fallback>
        </BaseAvatar.Root>
      ))}
    </div>
  ),
};

/** The fallback's `tone` colors the initials surface — one swatch per Figma avatar tone. */
export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {AVATAR_TONES.map((tone) => (
        <BaseAvatar.Root key={tone} render={<Avatar magnitude="lg" />} role="img" aria-label={tone}>
          <BaseAvatar.Fallback render={<AvatarFallback tone={tone} />}>
            {tone[0]?.toUpperCase()}
          </BaseAvatar.Fallback>
        </BaseAvatar.Root>
      ))}
    </div>
  ),
};

/** The three fallback states: image, initials, and the anonymous person icon (the icon slot). */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <BaseAvatar.Root render={<Avatar magnitude="lg" />} role="img" aria-label="Image">
        <BaseAvatar.Image render={<AvatarImage />} src="https://i.pravatar.cc/128?img=47" alt="" />
        <BaseAvatar.Fallback render={<AvatarFallback tone="orange" />}>AL</BaseAvatar.Fallback>
      </BaseAvatar.Root>
      <BaseAvatar.Root render={<Avatar magnitude="lg" />} role="img" aria-label="Initials">
        <BaseAvatar.Fallback render={<AvatarFallback tone="emerald" />}>GH</BaseAvatar.Fallback>
      </BaseAvatar.Root>
      <BaseAvatar.Root render={<Avatar magnitude="lg" />} role="img" aria-label="Anonymous">
        <BaseAvatar.Fallback render={<AvatarIcon magnitude="lg" />}>
          <User />
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
    </div>
  ),
};

/**
 * The single project-wide CSS check: an `md` avatar is `size-7` (28px) and the tone utility
 * resolves to a real color. Tagged out of the sidebar/docs/manifest but still runs under `test`.
 */
export const CssCheck: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseAvatar.Root render={<Avatar magnitude="md" />} role="img" aria-label="Ada Lovelace">
      <BaseAvatar.Fallback render={<AvatarFallback tone="indigo" />}>AL</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Ada Lovelace" })).toHaveStyle({ width: "28px" });
    const initials = canvas.getByText("AL");
    await expect(getComputedStyle(initials).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
