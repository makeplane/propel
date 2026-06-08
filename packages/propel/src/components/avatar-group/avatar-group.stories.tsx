import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Avatar } from "../avatar/index";
import { AvatarGroup, type AvatarGroupMagnitude } from "./index";

const MAGNITUDES: AvatarGroupMagnitude[] = ["2xs", "xs", "sm"];

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["ai-generated"],
  args: { magnitude: "sm" },
  argTypes: {
    magnitude: { control: "select", options: MAGNITUDES },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `magnitude` on the group sizes every avatar at once — the children don't set it. */
export const TwoMembers: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar alt="Ada" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
      <Avatar alt="Grace" fallback="GH" src="https://i.pravatar.cc/64?img=32" />
    </AvatarGroup>
  ),
};

export const ThreeMembers: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar alt="Ada" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
      <Avatar alt="Grace" fallback="GH" src="https://i.pravatar.cc/64?img=32" />
      <Avatar alt="Linus" fallback="LT" />
    </AvatarGroup>
  ),
  play: async ({ canvas }) => {
    // Each avatar exposes role="img"; querying by role proves all three rendered.
    const avatars = canvas.getAllByRole("img");
    await expect(avatars).toHaveLength(3);
    // The group's `magnitude="sm"` flows to every avatar (sm = 24px) even though
    // none set it themselves.
    await expect(avatars[0]).toHaveStyle({ width: "24px" });
  },
};
