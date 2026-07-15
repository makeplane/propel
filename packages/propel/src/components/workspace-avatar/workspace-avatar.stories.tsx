import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { WorkspaceAvatar, type WorkspaceAvatarMagnitude } from "./index";

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
  // Every story is one or more avatars in a row; a single avatar just centers trivially inside it,
  // so one decorator covers every story in this file instead of each `render` repeating the div.
  decorators: [
    (Story) => (
      <div className="flex items-center gap-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkspaceAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <>
      {MAGNITUDES.map((magnitude) => (
        <WorkspaceAvatar key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </>
  ),
};

// Initials-only workspace avatars with NO `alt`, each with different initials. Every one seeds its
// tone from its own initials, so they spread across the palette instead of collapsing onto one
// color — the bug when the seed was `alt ?? ""` (empty string → always the first tone). Same
// initials would still yield the same color: stable, just no longer name-dependent.
const NO_ALT_INITIALS = ["NN", "AD", "MK", "AR", "JD", "AB"];

/**
 * With no `alt`, tone is derived from each workspace's initials — so a row of unnamed workspaces
 * still gets a varied palette rather than all sharing one color.
 */
export const NoAltDistinctTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      {NO_ALT_INITIALS.map((initials) => (
        <WorkspaceAvatar key={initials} magnitude="lg" fallback={initials} />
      ))}
    </>
  ),
};

/**
 * Behavior twin of `NoAltDistinctTones`: none of the workspaces has an `alt`, yet their initials
 * surfaces resolve to more than one color. Before the fix every seedless avatar hashed `""` to the
 * same tone, so this set would have collapsed to size 1. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const NoAltDistinctTonesInteraction: Story = {
  ...NoAltDistinctTones,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const colors = NO_ALT_INITIALS.map(
      (initials) => getComputedStyle(canvas.getByText(initials)).backgroundColor,
    );
    for (const color of colors) {
      await expect(color).not.toBe("rgba(0, 0, 0, 0)");
    }
    await expect(new Set(colors).size).toBeGreaterThan(1);
  },
};

/** The three states side by side: logo, the initial fallback, and the anonymous workspace icon. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <>
      <WorkspaceAvatar
        {...args}
        magnitude="lg"
        src="https://avatars.githubusercontent.com/u/73642778?s=128"
      />
      <WorkspaceAvatar {...args} magnitude="lg" src={undefined} />
      <WorkspaceAvatar {...args} magnitude="lg" src={undefined} fallback={undefined} />
    </>
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
