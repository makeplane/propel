import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Avatar, AvatarFallback, AvatarImage, type AvatarMagnitude } from "../avatar/index";
import { AvatarGroup } from "./index";

// Figma's "Avatar groups" defines three sizes (Small/Base/Large = 16/20/24px).
const GROUP_MAGNITUDES: AvatarMagnitude[] = ["2xs", "xs", "sm"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The `AvatarGroup` elements
// primitive is just the styled overlapping-stack container (a single `<div>` with the Figma -6px
// overlap); each `Avatar` inside sets its own size and is pinned to its RESOLVED content state —
// image OR initials, one child — since the image/fallback swap is Base UI behavior, demonstrated
// and tested in the components-tier story (which also adds the shared-`magnitude` context).
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
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Grace">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
      </Avatar>
    </AvatarGroup>
  ),
};

/** Three avatars, the last one pinned to the initials state (no image). */
export const ThreeMembers: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" role="img" aria-label="Ada">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Grace">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Linus">
        <AvatarFallback tone="emerald">LT</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

/**
 * The stack at every Figma group size (Small/Base/Large map to 2xs/xs/sm — 16/20/24px); at this
 * tier each avatar carries its own `magnitude` (the components ready-made shares it via context).
 */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {GROUP_MAGNITUDES.map((magnitude) => (
        <AvatarGroup key={magnitude}>
          <Avatar magnitude={magnitude} role="img" aria-label="Ada">
            <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
          </Avatar>
          <Avatar magnitude={magnitude} role="img" aria-label="Grace">
            <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
          </Avatar>
          <Avatar magnitude={magnitude} role="img" aria-label="Linus">
            <AvatarFallback tone="emerald">LT</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      ))}
    </div>
  ),
};

/** Overflow pattern: a few member images, then a final avatar whose initials show a "+N" count. */
export const OverflowCount: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" role="img" aria-label="Ada Lovelace">
        <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Grace Hopper">
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Linus Torvalds">
        <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="" />
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="4 more members">
        <AvatarFallback tone="purple">+4</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

/**
 * CSS canary for the group's own compiled styling: `-space-x-1.5` puts a -6px `margin-inline-end`
 * (the Figma overlap) on every avatar but the last. Initials-only avatars keep it network-free.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const CssCheck: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <AvatarGroup>
      <Avatar magnitude="sm" role="img" aria-label="Ada">
        <AvatarFallback tone="orange">AL</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Grace">
        <AvatarFallback tone="indigo">GH</AvatarFallback>
      </Avatar>
      <Avatar magnitude="sm" role="img" aria-label="Linus">
        <AvatarFallback tone="emerald">LT</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
  play: async ({ canvas }) => {
    const avatars = canvas.getAllByRole("img");
    // Non-last members overlap the next by 6px; the last one carries no overlap margin.
    await expect(avatars[0]).toHaveStyle({ marginRight: "-6px" });
    await expect(avatars[1]).toHaveStyle({ marginRight: "-6px" });
    await expect(avatars[2]).toHaveStyle({ marginRight: "0px" });
  },
};
