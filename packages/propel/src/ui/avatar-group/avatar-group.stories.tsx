import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { AvatarGroup } from "./index";

// UI-tier story: composes the ATOMIC avatar parts (`Avatar` root + `AvatarImage` +
// `AvatarFallback`). The components-tier `AvatarGroup` story uses the ready-made
// `Avatar` (image → initials → person icon) instead.
const meta = {
  title: "UI/AvatarGroup",
  component: AvatarGroup,
  subcomponents: { Avatar, AvatarImage, AvatarFallback },
  args: { magnitude: "sm" },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `magnitude` on the group sizes every avatar at once — the children don't set it. */
export const TwoMembers: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar role="img" aria-label="Ada">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar role="img" aria-label="Grace">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
        <AvatarFallback tone="indigo">GH</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

/** Three avatars, the last one initials-only (no image). */
export const ThreeMembers: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar role="img" aria-label="Ada">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar role="img" aria-label="Grace">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
        <AvatarFallback tone="indigo">GH</AvatarFallback>
      </Avatar>
      <Avatar role="img" aria-label="Linus">
        <AvatarFallback tone="emerald">LT</AvatarFallback>
      </Avatar>
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

/**
 * Overflow pattern: a few member images, then a final avatar whose fallback shows a "+N" count for
 * the rest.
 */
export const OverflowCount: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar role="img" aria-label="Ada Lovelace">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar role="img" aria-label="Grace Hopper">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
        <AvatarFallback tone="indigo">GH</AvatarFallback>
      </Avatar>
      <Avatar role="img" aria-label="Linus Torvalds">
        <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="" />
        <AvatarFallback tone="emerald">LT</AvatarFallback>
      </Avatar>
      <Avatar role="img" aria-label="4 more members">
        <AvatarFallback tone="purple">+4</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};
