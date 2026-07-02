import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { AvatarGroup } from "./index";

// elements-tier story: the `AvatarGroup` elements primitive is just the styled overlapping-stack container (a
// single `<div>`); each `Avatar` inside sets its own size. The components-tier `AvatarGroup` adds
// the shared-`magnitude` context so the whole group sizes at once.
const meta = {
  title: "Elements/AvatarGroup",
  component: AvatarGroup,
  subcomponents: { Avatar, AvatarImage, AvatarFallback },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The overlapping stack; each avatar sets its own `magnitude`. */
export const TwoMembers: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" role="img" aria-label="Ada">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Grace">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
        <AvatarFallback tone="indigo">GH</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

/** Three avatars, the last one initials-only (no image). */
export const ThreeMembers: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" role="img" aria-label="Ada">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Grace">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
        <AvatarFallback tone="indigo">GH</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Linus">
        <AvatarFallback tone="emerald">LT</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

/**
 * Interaction test: the group renders three avatars, each sized `sm` (24px). Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const ThreeMembersInteraction: Story = {
  ...ThreeMembers,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const avatars = canvas.getAllByRole("img");
    await expect(avatars).toHaveLength(3);
    // Each avatar is `sm` (24px).
    await expect(avatars[0]).toHaveStyle({ width: "24px" });
  },
};

/** Overflow pattern: a few member images, then a final avatar whose fallback shows a "+N" count. */
export const OverflowCount: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" role="img" aria-label="Ada Lovelace">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Grace Hopper">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
        <AvatarFallback tone="indigo">GH</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Linus Torvalds">
        <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="" />
        <AvatarFallback tone="emerald">LT</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="4 more members">
        <AvatarFallback tone="purple">+4</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};
