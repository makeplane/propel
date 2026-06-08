import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { AVATAR_TONES, Avatar, type AvatarMagnitude } from "./index";

const MAGNITUDES: AvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["ai-generated"],
  args: {
    magnitude: "md",
    alt: "Ada Lovelace",
    fallback: "AL",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Magnitudes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Avatar key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </div>
  ),
};

/**
 * The initials background follows `tone`. When `tone` is omitted it's derived
 * from `alt`, so every person gets a stable color automatically.
 */
export const Tones: Story = {
  args: { src: undefined },
  render: (args) => (
    <div className="flex items-center gap-3">
      {AVATAR_TONES.map((tone) => (
        <Avatar key={tone} {...args} tone={tone} magnitude="lg" fallback={tone[0]?.toUpperCase()} />
      ))}
    </div>
  ),
};

/** The three states side by side: image, initials, and the anonymous person icon. */
export const States: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} magnitude="lg" src="https://i.pravatar.cc/128?img=47" />
      <Avatar {...args} magnitude="lg" src={undefined} />
      <Avatar {...args} magnitude="lg" src={undefined} fallback={undefined} />
    </div>
  ),
};

/**
 * The single project-wide CSS check: an `md` avatar is `size-7` (28px) and the
 * tone utility resolves to a real color. Concrete computed values prove the shared
 * preview actually compiled Tailwind + propel's tokens — a plain render would pass
 * even with no styles loaded.
 */
export const CssCheck: Story = {
  args: { magnitude: "md", src: undefined },
  play: async ({ canvas }) => {
    // Query by role (typed `HTMLElement`, no cast) and assert the computed size.
    await expect(canvas.getByRole("img", { name: "Ada Lovelace" })).toHaveStyle({ width: "28px" });
    // And that the `bg-label-*-bg-strong` tone utility compiled to a real color.
    const initials = canvas.getByText("AL");
    await expect(getComputedStyle(initials).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
