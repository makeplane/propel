import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Avatar } from "../avatar/index";
import { AvatarGroup } from "./index";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Compose `AvatarGroup` from equally-sized `Avatar`s; the group adds the
 * overlap and the white separating ring. */
export const TwoMembers: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" alt="Ada" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
      <Avatar magnitude="sm" alt="Grace" fallback="GH" src="https://i.pravatar.cc/64?img=32" />
    </AvatarGroup>
  ),
};

export const ThreeMembers: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" alt="Ada" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
      <Avatar magnitude="sm" alt="Grace" fallback="GH" src="https://i.pravatar.cc/64?img=32" />
      <Avatar magnitude="sm" alt="Linus" fallback="LT" />
    </AvatarGroup>
  ),
  play: async ({ canvas }) => {
    // Each avatar exposes role="img"; querying by role proves all three rendered.
    await expect(canvas.getAllByRole("img")).toHaveLength(3);
  },
};
