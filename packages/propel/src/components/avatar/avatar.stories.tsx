import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Avatar, type AvatarMagnitude } from "./index";

const MAGNITUDES: AvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs", "ai-generated"],
  args: {
    alt: "Ada Lovelace",
    fallback: "AL",
  },
  argTypes: {
    magnitude: { control: "select", options: MAGNITUDES },
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
    // Proves the `fallback` prop is rendered when there is no image.
    await expect(canvas.getByText("AL")).toBeVisible();
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
 * The single project-wide CSS check: an `md` avatar is `size-7` (28px). A
 * concrete computed width proves the shared preview actually compiled Tailwind +
 * propel's tokens — a plain render would pass even with no styles loaded.
 */
export const CssCheck: Story = {
  args: { magnitude: "md", src: undefined },
  play: async ({ canvasElement }) => {
    const root = canvasElement.firstElementChild as HTMLElement;
    await expect(getComputedStyle(root).width).toBe("28px");
  },
};
