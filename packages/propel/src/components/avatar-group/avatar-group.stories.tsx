import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Avatar } from "../avatar/index";
import { AvatarGroup, type AvatarGroupMagnitude } from "./index";

const MAGNITUDES: AvatarGroupMagnitude[] = ["2xs", "xs", "sm"];

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  // AvatarGroup is composed of Avatars, so document Avatar's props alongside it
  // (adds an Avatar tab to the args table + records the relationship in the manifest).
  subcomponents: { Avatar },
  args: { magnitude: "sm" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=40-46",
    },
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
};

/**
 * Interaction test: all three avatars render and the group's `magnitude` flows to each. Tagged out
 * of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const ThreeMembersInteraction: Story = {
  ...ThreeMembers,
  tags: ["!dev", "!autodocs", "!manifest"],
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
 * All group sizes side by side (Figma Small/Base/Large map to 2xs/xs/sm — 16/20/24px). The group's
 * `magnitude` sizes every member at once.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude`, the group's only arg, so disable its control.
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {MAGNITUDES.map((magnitude) => (
        <AvatarGroup key={magnitude} {...args} magnitude={magnitude}>
          <Avatar alt="Ada" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
          <Avatar alt="Grace" fallback="GH" src="https://i.pravatar.cc/64?img=32" />
          <Avatar alt="Linus" fallback="LT" />
        </AvatarGroup>
      ))}
    </div>
  ),
};

/**
 * Overflow pattern: show a few members as images, then a final avatar with a "+N" count for the
 * rest. The counter is just an `Avatar` with a `fallback`.
 */
export const OverflowCount: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar alt="Ada Lovelace" src="https://i.pravatar.cc/64?img=47" />
      <Avatar alt="Grace Hopper" src="https://i.pravatar.cc/64?img=32" />
      <Avatar alt="Linus Torvalds" src="https://i.pravatar.cc/64?img=12" />
      <Avatar alt="4 more members" fallback="+4" />
    </AvatarGroup>
  ),
};
