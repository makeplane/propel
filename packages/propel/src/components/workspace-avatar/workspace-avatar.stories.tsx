import type { Meta, StoryObj } from "@storybook/react-vite";
import { AVATAR_TONES } from "../avatar/index";
import { WorkspaceAvatar, type WorkspaceAvatarMagnitude } from "./index";

const MAGNITUDES: WorkspaceAvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Components/WorkspaceAvatar",
  component: WorkspaceAvatar,
  tags: ["ai-generated"],
  args: {
    magnitude: "md",
    alt: "Plane workspace",
    fallback: "PV",
  },
} satisfies Meta<typeof WorkspaceAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Magnitudes: Story = {
  // A fixed showcase of every size — controls would be inert, so hide the panel.
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <WorkspaceAvatar key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </div>
  ),
};

/** Initials use the same tone palette as Avatar (auto-derived from `alt`). */
export const Tones: Story = {
  args: { src: undefined },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {AVATAR_TONES.map((tone) => (
        <WorkspaceAvatar
          key={tone}
          {...args}
          tone={tone}
          magnitude="lg"
          fallback={tone[0]?.toUpperCase()}
        />
      ))}
    </div>
  ),
};

/** The two states side by side: logo and the initial fallback. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <WorkspaceAvatar
        {...args}
        magnitude="lg"
        src="https://avatars.githubusercontent.com/u/73642778?s=128"
      />
      <WorkspaceAvatar {...args} magnitude="lg" src={undefined} />
    </div>
  ),
};
