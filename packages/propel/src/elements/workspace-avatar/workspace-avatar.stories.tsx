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

// An inline-SVG "logo" so the image state renders deterministically with no network.
const LOGO_SRC = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#4338ca"/><path d="M22 48V16h14a11 11 0 0 1 0 22h-7v10Z" fill="#fff"/></svg>',
)}`;

// elements-tier story (rule 2b): a pure UI-configuration showcase — the styled parts render
// DIRECTLY, with no Base UI grafts. The workspace-avatar cvas key off no `data-*`/aria state, so
// each visual state is simply which child renders (logo image / initials fallback). Image-load
// fallback behavior is demonstrated in Components/WorkspaceAvatar. `meta.component` is the
// no-variant `WorkspaceAvatarImage` so no props are forced into story args.
const meta = {
  title: "Elements/WorkspaceAvatar",
  component: WorkspaceAvatarImage,
  subcomponents: { WorkspaceAvatar, WorkspaceAvatarFallback },
} satisfies Meta<typeof WorkspaceAvatarImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root holding a loaded logo. `role="img"` + `aria-label` give the avatar its accessible name. */
export const Default: Story = {
  render: () => (
    <WorkspaceAvatar magnitude="md" role="img" aria-label="Plane workspace">
      <WorkspaceAvatarImage src={LOGO_SRC} alt="" />
    </WorkspaceAvatar>
  ),
};

/** Every workspace-avatar size (Figma 2xs 16px → 3xl 64px). */
export const Magnitudes: Story = {
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

/** The two content states side by side: the logo image and the initials fallback. */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <WorkspaceAvatar magnitude="lg" role="img" aria-label="Logo">
        <WorkspaceAvatarImage src={LOGO_SRC} alt="" />
      </WorkspaceAvatar>
      <WorkspaceAvatar magnitude="lg" role="img" aria-label="Initials">
        <WorkspaceAvatarFallback tone="emerald">PV</WorkspaceAvatarFallback>
      </WorkspaceAvatar>
    </div>
  ),
};

/**
 * The single project-wide CSS check (the allowed rule-2b canary): an `md` workspace avatar is
 * `size-7` (28px) and the tone utility resolves to a real color. Tagged out of the sidebar/docs/
 * manifest but still runs under `test`.
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
