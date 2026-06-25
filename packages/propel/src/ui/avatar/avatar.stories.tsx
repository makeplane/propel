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

// UI-tier story: composes the ATOMIC avatar parts — `Avatar` (root) holding an
// `AvatarImage` and/or `AvatarFallback`. The components-tier `Avatar` story uses the
// ready-made avatar (`src` → initials → person icon), which assembles these parts.
const meta = {
  title: "UI/Avatar",
  component: Avatar,
  subcomponents: { AvatarImage, AvatarFallback, AvatarIcon },
  // `magnitude` is required on the ui `Avatar`; the per-story renders pass it explicitly, this just
  // satisfies the story arg type.
  args: { magnitude: "md" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding an image, with initials as the fallback while the image loads/fails. */
export const Default: Story = {
  args: { magnitude: "md" },
  render: (args) => (
    <Avatar {...args} role="img" aria-label="Ada Lovelace">
      <AvatarImage src="https://i.pravatar.cc/128?img=47" alt="" />
      <AvatarFallback tone="orange">AL</AvatarFallback>
    </Avatar>
  ),
};

/** Every avatar size (Figma 2xs 16px → 3xl 64px). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
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
  parameters: { controls: { disable: true } },
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

/** The three fallback states: image, initials, and the anonymous person icon (`tone="none"`). */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar magnitude="lg" role="img" aria-label="Image">
        <AvatarImage src="https://i.pravatar.cc/128?img=47" alt="" />
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar magnitude="lg" role="img" aria-label="Initials">
        <AvatarFallback tone="emerald">GH</AvatarFallback>
      </Avatar>
      <Avatar magnitude="lg" role="img" aria-label="Anonymous">
        <AvatarFallback tone="none">
          <AvatarIcon magnitude="lg">
            <User />
          </AvatarIcon>
        </AvatarFallback>
      </Avatar>
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
