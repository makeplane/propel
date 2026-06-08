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
  argTypes: {
    magnitude: { control: "select", options: MAGNITUDES },
    tone: { control: "select", options: AVATAR_TONES },
    src: { control: "text" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/128?img=47" },
};

/** With no `src` (or while the image loads/fails), the fallback initials show. */
export const Fallback: Story = {
  args: { src: undefined },
  play: async ({ canvas }) => {
    // Queried by role so the assertion survives DOM refactors and also checks the
    // accessible name; getByText confirms the `fallback` initials render.
    await expect(canvas.getByRole("img", { name: "Ada Lovelace" })).toBeVisible();
    const initials = canvas.getByText("AL");
    await expect(initials).toBeVisible();
    // Proves the `bg-label-*-bg-strong` tone utility actually compiled to a color
    // (not just that the class string was emitted).
    await expect(getComputedStyle(initials).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};

/** No image and no initials → the anonymous person-icon state. */
export const Anonymous: Story = {
  args: { src: undefined, fallback: undefined },
};

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
 * The single project-wide CSS check: an `md` avatar is `size-7` (28px). A
 * concrete computed width proves the shared preview actually compiled Tailwind +
 * propel's tokens — a plain render would pass even with no styles loaded.
 */
export const CssCheck: Story = {
  args: { magnitude: "md", src: undefined },
  play: async ({ canvas }) => {
    // Query by role (typed `HTMLElement`, no cast) and assert the computed size.
    await expect(canvas.getByRole("img", { name: "Ada Lovelace" })).toHaveStyle({ width: "28px" });
  },
};
