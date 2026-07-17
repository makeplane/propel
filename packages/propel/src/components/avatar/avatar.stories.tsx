import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, waitFor } from "storybook/test";

import { type AvatarMagnitude, Avatar } from "./index";

const MAGNITUDES: AvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

// An inline-SVG "photo" so the delayed-fallback demo loads deterministically with no network.
const PHOTO_SRC = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#7dd3fc"/><circle cx="44" cy="18" r="8" fill="#fde047"/><path d="M0 64 24 34l14 16 10-10 16 24Z" fill="#16a34a"/></svg>',
)}`;

// A `src` that is present but undecodable — the browser still attempts to load it and fires a
// genuine `error` event, unlike an absent `src` (which Base UI never attempts to load at all).
// Malformed inline data needs no network, so the failure is deterministic in any environment.
const BROKEN_SRC = "data:image/png;base64,not-a-real-image";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: {
    magnitude: "md",
    alt: "Ada Lovelace",
    fallback: "AL",
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
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Magnitudes: Story = {
  // Iterates `magnitude`; disable just that control so the rest stay live and
  // update every avatar at once.
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <>
      {MAGNITUDES.map((magnitude) => (
        <Avatar key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </>
  ),
};

// Initials-only avatars with NO `alt`, each with different initials. Every one seeds its tone from
// its own initials, so they spread across the palette instead of collapsing onto one color — the
// bug when the seed was `alt ?? ""` (empty string → always the first tone). Same initials would
// still yield the same color: the assignment stays stable, it's just no longer name-dependent.
const NO_ALT_INITIALS = ["NN", "AD", "MK", "AR", "JD", "AB"];

/**
 * With no `alt`, tone is derived from each avatar's initials — so a row of unnamed avatars still
 * gets a varied palette rather than all sharing one color.
 */
export const NoAltDistinctTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      {NO_ALT_INITIALS.map((initials) => (
        <Avatar key={initials} magnitude="lg" fallback={initials} />
      ))}
    </>
  ),
};

/**
 * Behavior twin of `NoAltDistinctTones`: none of the avatars has an `alt`, yet their initials
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
    // Every color is a real compiled tone (not transparent)…
    for (const color of colors) {
      await expect(color).not.toBe("rgba(0, 0, 0, 0)");
    }
    // …and they are not all the same — the seedless-collapse regression is gone.
    await expect(new Set(colors).size).toBeGreaterThan(1);
  },
};

/** The three states side by side: image, initials, and the anonymous person icon. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <>
      <Avatar {...args} magnitude="lg" src="https://i.pravatar.cc/128?img=47" />
      <Avatar {...args} magnitude="lg" src={undefined} />
      <Avatar {...args} magnitude="lg" src={undefined} fallback={undefined} />
    </>
  ),
};

/**
 * `delay` (here 300ms) keeps initials from flashing on fast connections: nothing renders during the
 * delay, the initials appear only while the image is still missing past it, and the photo takes
 * over once it loads (the slow connection is simulated at 900ms).
 */
export const DelayedFallback: Story = {
  // The demo owns `src` (it arrives late) and `delay`; disable just those two controls so the
  // rest stay live.
  argTypes: { src: { control: false }, delay: { control: false } },
  render: function Render(args) {
    const [src, setSrc] = React.useState<string>();
    React.useEffect(() => {
      const timer = window.setTimeout(() => setSrc(PHOTO_SRC), 900);
      return () => window.clearTimeout(timer);
    }, []);
    return <Avatar {...args} src={src} delay={300} />;
  },
};

/**
 * Interaction twin for `DelayedFallback`: no initials inside the delay window, initials once the
 * delay elapses with the image still missing, and the loaded photo replaces them. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DelayedFallbackInteraction: Story = {
  ...DelayedFallback,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, canvasElement }) => {
    // Inside the 300ms delay window the fallback must not render — no initials flash.
    await expect(canvas.queryByText("AL")).not.toBeInTheDocument();
    // Past the delay, with the image still missing, the initials appear…
    await waitFor(() => expect(canvas.getByText("AL")).toBeInTheDocument());
    // …until the photo loads (simulated at 900ms) and replaces them. The `<img>` is decorative
    // (`alt=""`, the root owns the accessible name), so query the element directly.
    await waitFor(() => expect(canvasElement.querySelector("img")).toBeInTheDocument());
    await expect(canvas.queryByText("AL")).not.toBeInTheDocument();
  },
};

/**
 * A `src` that fails to load — distinct from an absent `src` (the `States`/`Tones` stories above),
 * which never attempts to load an image at all. The initials fallback takes over once the load
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
    await waitFor(() => expect(canvas.getByText("AL")).toBeInTheDocument());
    await waitFor(() => expect(canvasElement.querySelector("img")).not.toBeInTheDocument());
  },
};

/**
 * The single project-wide CSS check: an `md` avatar is `size-7` (28px) and the tone utility
 * resolves to a real color. Concrete computed values prove the shared preview actually compiled
 * Tailwind + propel's tokens — a plain render would pass even with no styles loaded. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it's hidden from the sidebar, the docs page, and the AI/MCP
 * manifest — it's a test canary, not a designer- or agent-facing example — but still runs via the
 * default `test` tag.
 */
export const CssCheck: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", src: undefined },
  play: async ({ canvas }) => {
    // Query by role (typed `HTMLElement`, no cast) and assert the computed size.
    await expect(canvas.getByRole("img", { name: "Ada Lovelace" })).toHaveStyle({ width: "28px" });
    // And that the `bg-label-*-bg-strong` tone utility compiled to a real color.
    const initials = canvas.getByText("AL");
    await expect(getComputedStyle(initials).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
