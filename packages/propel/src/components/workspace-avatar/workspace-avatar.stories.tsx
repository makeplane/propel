import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { AVATAR_TONES, WorkspaceAvatar, type WorkspaceAvatarMagnitude } from "./index";

const MAGNITUDES: WorkspaceAvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

// A `src` that is present but undecodable — the browser still attempts to load it and fires a
// genuine `error` event, unlike an absent `src` (which Base UI never attempts to load at all).
// Malformed inline data needs no network, so the failure is deterministic in any environment.
const BROKEN_SRC = "data:image/png;base64,not-a-real-image";

// Components-tier story: the ready-made `WorkspaceAvatar` single component.
const meta = {
  title: "Components/WorkspaceAvatar",
  component: WorkspaceAvatar,
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

/** The three states side by side: logo, the initial fallback, and the anonymous workspace icon. */
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
      <WorkspaceAvatar {...args} magnitude="lg" src={undefined} fallback={undefined} />
    </div>
  ),
};

/**
 * With neither `src` nor `fallback`, the anonymous workspace icon shows over the neutral backdrop —
 * the same default-state contract `Avatar` has with its person icon.
 */
export const NoFallback: Story = {
  args: { src: undefined, fallback: undefined },
};

/**
 * Behavior twin of `NoFallback`: no `<img>`, no initials text — just the icon slot rendering the
 * anonymous glyph. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const NoFallbackInteraction: Story = {
  ...NoFallback,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, canvasElement }) => {
    const avatar = await canvas.findByRole("img", { name: "Plane workspace" });
    await expect(canvasElement.querySelector("img")).not.toBeInTheDocument();
    await expect(canvas.queryByText("PV")).not.toBeInTheDocument();
    // The icon slot's `aria-hidden` svg is the only content — the root still carries the a11y name.
    await expect(avatar.querySelector("svg")).toBeInTheDocument();
  },
};

/**
 * A `src` that fails to load — distinct from an absent `src` (the `States`/`Tones` stories above),
 * which never attempts to load a logo at all. The initials fallback takes over once the load
 * errors.
 */
export const BrokenImage: Story = {
  args: { src: BROKEN_SRC },
};

/**
 * Behavior twin of `BrokenImage`: the failed load never leaves an `<img>` in the DOM, and the
 * initials fallback renders in its place. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const BrokenImageInteraction: Story = {
  ...BrokenImage,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, canvasElement }) => {
    await waitFor(() => expect(canvas.getByText("PV")).toBeInTheDocument());
    await waitFor(() => expect(canvasElement.querySelector("img")).not.toBeInTheDocument());
  },
};
