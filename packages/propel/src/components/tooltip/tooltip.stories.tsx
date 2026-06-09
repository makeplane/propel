import { DirectionProvider } from "@base-ui/react/direction-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Tooltip } from "./index";

const sidesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, max-content)",
  columnGap: "12rem",
  rowGap: "8rem",
  padding: "8rem 14rem",
  placeItems: "center",
} as const;

const ALL_SIDES = ["top", "bottom", "left", "right", "inline-start", "inline-end"] as const;

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["ai-generated"],
  args: {
    content: "Tooltip text",
    children: <button type="button">Hover or focus me</button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * The arrow on every side. Base UI's Positioner accepts both physical
 * (`top`/`bottom`/`left`/`right`) and logical (`inline-start`/`inline-end`) sides, and
 * emits the chosen value as `data-side` on the arrow. This story renders one tooltip
 * per side so the arrow's clip-path and edge offset can be reviewed for each — in
 * particular the logical `inline-start`/`inline-end` sides, which previously had no
 * per-side rule and rendered as a full rotated square offset away from the popup.
 *
 * Tooltips open instantly (`delay: 0`) and stay open (`open`) so all arrows are
 * visible at once; controls are disabled because the per-side args are fixed.
 */
export const Sides: Story = {
  tags: ["!autodocs", "!manifest", "!test"],
  parameters: {
    controls: { disable: true },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/?node-id=1162-346",
    },
  },
  render: () => (
    <div style={sidesGridStyle}>
      {ALL_SIDES.map((side) => (
        <Tooltip key={side} side={side} content={side} delay={0} open>
          <button type="button">{side}</button>
        </Tooltip>
      ))}
    </div>
  ),
};

/**
 * The same matrix in right-to-left. Plane runs both LTR and RTL, so the logical
 * sides must flip with writing direction. Wrapped in Base UI's `DirectionProvider`
 * (which the Positioner reads to resolve `inline-start`/`inline-end` to a physical
 * edge) and `dir="rtl"` (which the arrow's logical insets + `rtl:` clip-path variant
 * react to). In RTL, `inline-start` sits to the *right* of its trigger with the arrow
 * pointing left, and `inline-end` mirrors it — both still pointing back at the trigger.
 * The physical `left`/`right`/`top`/`bottom` sides are direction-independent and
 * render the same as LTR.
 */
export const SidesRtl: Story = {
  name: "Sides (RTL)",
  tags: ["!autodocs", "!manifest", "!test"],
  parameters: {
    controls: { disable: true },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/?node-id=1162-346",
    },
  },
  // The popup portals to <body>, so the arrow's logical insets + `rtl:` clip only
  // flip when `dir="rtl"` lives on a portal ancestor (`<html>`) — a nested wrapper
  // wouldn't reach it. Mirror a real RTL app: set it on the root, restore on unmount.
  // `DirectionProvider` (below) is what tells Base UI's Positioner to resolve the
  // logical sides; it crosses the portal via React context.
  decorators: [
    (Story) => {
      useLayoutEffect(() => {
        const html = document.documentElement;
        const prev = html.getAttribute("dir");
        html.setAttribute("dir", "rtl");
        return () => {
          if (prev) html.setAttribute("dir", prev);
          else html.removeAttribute("dir");
        };
      }, []);
      return <Story />;
    },
  ],
  render: () => (
    <DirectionProvider direction="rtl">
      <div style={sidesGridStyle}>
        {ALL_SIDES.map((side) => (
          <Tooltip key={side} side={side} content={side} delay={0} open>
            <button type="button">{side}</button>
          </Tooltip>
        ))}
      </div>
    </DirectionProvider>
  ),
};

/**
 * A keyboard-shortcut hint sits to the right of the label, dimmed at the smaller
 * caption scale — the Figma "Cmd + K" slot. Pass any node to `shortcut`.
 */
export const WithShortcut: Story = {
  args: {
    content: "Open command menu",
    shortcut: "⌘ K",
  },
};

/**
 * Focusing the trigger opens the tooltip (a `role="tooltip"` popup with the label
 * appears); blurring it closes the tooltip again. Focus is used instead of hover so
 * the open/close is deterministic regardless of Base UI's hover delays. Tagged so it
 * stays out of the sidebar, docs, and AI manifest — it's a behavior test, not an
 * example — but still runs under the default `test` tag.
 */
export const ShowsOnFocus: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  // A 0ms hover delay keeps this behavior test deterministic; focus opens instantly
  // regardless, but scoping the override here (not on meta) lets docs/examples use
  // the real 600ms default.
  args: { content: "Tooltip text", delay: 0 },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Hover or focus me" });
    // The popup renders in a Portal outside the story canvas, so query the document.
    const screen = within(document.body);

    // Nothing is shown until the trigger is interacted with.
    await expect(screen.queryByText("Tooltip text")).toBeNull();

    // Focusing the trigger opens the tooltip with the label text.
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    // `findByText` already retries until the portaled tooltip appears.
    await expect(await screen.findByText("Tooltip text")).toBeInTheDocument();

    // Blurring the trigger hides the tooltip again (it leaves asynchronously, so
    // retry until it's gone). The callback returns the expectation rather than
    // `await`-ing it in an async body — satisfies no-floating-promises lint.
    await userEvent.tab();
    await waitFor(() => expect(screen.queryByText("Tooltip text")).toBeNull());
  },
};
