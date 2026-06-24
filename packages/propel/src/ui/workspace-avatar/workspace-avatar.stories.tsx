import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { AVATAR_TONES } from "../avatar/index";
import {
  WorkspaceAvatar,
  WorkspaceAvatarFallback,
  WorkspaceAvatarImage,
  type WorkspaceAvatarMagnitude,
} from "./index";

const MAGNITUDES: WorkspaceAvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

// UI-tier story: composes the ATOMIC workspace-avatar parts — `WorkspaceAvatar` (root)
// holding a `WorkspaceAvatarImage` and/or `WorkspaceAvatarFallback`. The components-tier
// story uses the ready-made avatar (`src` → initials), which assembles these parts.
const meta = {
  title: "UI/WorkspaceAvatar",
  component: WorkspaceAvatar,
  // `magnitude` is required; the iterating stories override it per element.
  args: { magnitude: "md" },
  subcomponents: { WorkspaceAvatarImage, WorkspaceAvatarFallback },
} satisfies Meta<typeof WorkspaceAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding a logo, with initials as the fallback while the logo loads/fails. */
export const Default: Story = {
  render: (args) => (
    <WorkspaceAvatar {...args} role="img" aria-label="Plane workspace">
      <WorkspaceAvatarImage src="https://avatars.githubusercontent.com/u/73642778?s=128" alt="" />
      <WorkspaceAvatarFallback tone="orange">PV</WorkspaceAvatarFallback>
    </WorkspaceAvatar>
  ),
};

/** Every workspace-avatar size (Figma 2xs 16px → 3xl 64px). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <WorkspaceAvatar key={magnitude} magnitude={magnitude} role="img" aria-label={magnitude}>
          <WorkspaceAvatarFallback tone="indigo">PV</WorkspaceAvatarFallback>
        </WorkspaceAvatar>
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
        <WorkspaceAvatar key={tone} magnitude="lg" role="img" aria-label={tone}>
          <WorkspaceAvatarFallback tone={tone}>{tone[0]?.toUpperCase()}</WorkspaceAvatarFallback>
        </WorkspaceAvatar>
      ))}
    </div>
  ),
};

/** The two states side by side: logo and the initial fallback. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <WorkspaceAvatar magnitude="lg" role="img" aria-label="Logo">
        <WorkspaceAvatarImage src="https://avatars.githubusercontent.com/u/73642778?s=128" alt="" />
        <WorkspaceAvatarFallback tone="orange">PV</WorkspaceAvatarFallback>
      </WorkspaceAvatar>
      <WorkspaceAvatar magnitude="lg" role="img" aria-label="Initials">
        <WorkspaceAvatarFallback tone="emerald">PV</WorkspaceAvatarFallback>
      </WorkspaceAvatar>
    </div>
  ),
};

/**
 * The single project-wide CSS check: an `md` workspace avatar is `size-7` (28px) and the tone
 * utility resolves to a real color. Tagged out of the sidebar/docs/manifest but still runs under
 * `test`.
 */
export const CssCheck: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <WorkspaceAvatar magnitude="md" role="img" aria-label="Plane workspace">
      <WorkspaceAvatarFallback tone="indigo">PV</WorkspaceAvatarFallback>
    </WorkspaceAvatar>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Plane workspace" })).toHaveStyle({
      width: "28px",
    });
    const initials = canvas.getByText("PV");
    await expect(getComputedStyle(initials).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
