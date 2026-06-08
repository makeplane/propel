import type { Meta, StoryObj } from "@storybook/react-vite";
import { WorkspaceAvatar, type WorkspaceAvatarMagnitude } from "./index";

const MAGNITUDES: WorkspaceAvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Components/WorkspaceAvatar",
  component: WorkspaceAvatar,
  tags: ["ai-generated"],
  args: {
    alt: "Plane workspace",
    fallback: "P",
  },
  argTypes: {
    magnitude: { control: "select", options: MAGNITUDES },
    src: { control: "text" },
  },
} satisfies Meta<typeof WorkspaceAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLogo: Story = {
  args: { src: "https://avatars.githubusercontent.com/u/73642778?s=128" },
};

export const Magnitudes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <WorkspaceAvatar key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </div>
  ),
};

/** The two states side by side: logo and the initial fallback. */
export const States: Story = {
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
