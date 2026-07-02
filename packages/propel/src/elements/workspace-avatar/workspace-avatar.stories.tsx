import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
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

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// `Avatar` behavior grafts them via `render` (behavior part outer, styled part as the render
// target). The components-tier story uses the ready-made avatar (`src` → initials), which
// assembles these parts. `meta.component` is `WorkspaceAvatarImage` — the only part with no
// required variant props.
const meta = {
  title: "Elements/WorkspaceAvatar",
  component: WorkspaceAvatarImage,
  subcomponents: { WorkspaceAvatar, WorkspaceAvatarFallback },
} satisfies Meta<typeof WorkspaceAvatarImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding a logo, with initials as the fallback while the logo loads/fails. */
export const Default: Story = {
  render: () => (
    <BaseAvatar.Root
      render={<WorkspaceAvatar magnitude="md" />}
      role="img"
      aria-label="Plane workspace"
    >
      <BaseAvatar.Image
        render={<WorkspaceAvatarImage />}
        src="https://avatars.githubusercontent.com/u/73642778?s=128"
        alt=""
      />
      <BaseAvatar.Fallback render={<WorkspaceAvatarFallback tone="orange" />}>
        PV
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  ),
};

/** Every workspace-avatar size (Figma 2xs 16px → 3xl 64px). */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <BaseAvatar.Root
          key={magnitude}
          render={<WorkspaceAvatar magnitude={magnitude} />}
          role="img"
          aria-label={magnitude}
        >
          <BaseAvatar.Fallback render={<WorkspaceAvatarFallback tone="indigo" />}>
            PV
          </BaseAvatar.Fallback>
        </BaseAvatar.Root>
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
        <BaseAvatar.Root
          key={tone}
          render={<WorkspaceAvatar magnitude="lg" />}
          role="img"
          aria-label={tone}
        >
          <BaseAvatar.Fallback render={<WorkspaceAvatarFallback tone={tone} />}>
            {tone[0]?.toUpperCase()}
          </BaseAvatar.Fallback>
        </BaseAvatar.Root>
      ))}
    </div>
  ),
};

/** The two states side by side: logo and the initial fallback. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <BaseAvatar.Root render={<WorkspaceAvatar magnitude="lg" />} role="img" aria-label="Logo">
        <BaseAvatar.Image
          render={<WorkspaceAvatarImage />}
          src="https://avatars.githubusercontent.com/u/73642778?s=128"
          alt=""
        />
        <BaseAvatar.Fallback render={<WorkspaceAvatarFallback tone="orange" />}>
          PV
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
      <BaseAvatar.Root render={<WorkspaceAvatar magnitude="lg" />} role="img" aria-label="Initials">
        <BaseAvatar.Fallback render={<WorkspaceAvatarFallback tone="emerald" />}>
          PV
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
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
    <BaseAvatar.Root
      render={<WorkspaceAvatar magnitude="md" />}
      role="img"
      aria-label="Plane workspace"
    >
      <BaseAvatar.Fallback render={<WorkspaceAvatarFallback tone="indigo" />}>
        PV
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Plane workspace" })).toHaveStyle({
      width: "28px",
    });
    const initials = canvas.getByText("PV");
    await expect(getComputedStyle(initials).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
