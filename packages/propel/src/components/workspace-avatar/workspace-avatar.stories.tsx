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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=40-46",
    },
  },
} satisfies Meta<typeof WorkspaceAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
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
  argTypes: { tone: { control: false }, fallback: { control: false } },
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
