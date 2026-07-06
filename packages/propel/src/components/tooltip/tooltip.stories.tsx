import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect, useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { DirectionProvider } from "../direction-provider";
import { Tooltip, TooltipProvider } from "./index";

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
  subcomponents: { TooltipProvider },
  args: {
    label: "Tooltip text",
    children: <button type="button">Hover or focus me</button>,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1162-346",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * The arrow on every side. Base UI's Positioner accepts both physical
 * (`top`/`bottom`/`left`/`right`) and logical (`inline-start`/`inline-end`) sides, and emits the
 * chosen value as `data-side` on the arrow. This story renders one tooltip per side so the arrow's
 * clip-path and edge offset can be reviewed for each — in particular the logical
 * `inline-start`/`inline-end` sides, which previously had no per-side rule and rendered as a full
 * rotated square offset away from the popup.
 *
 * Tooltips open instantly (`delay: 0`) and stay open (`open`) so all arrows are visible at once;
 * controls are disabled because the per-side args are fixed.
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
        <Tooltip key={side} side={side} label={side} delay={0} open>
          <button type="button">{side}</button>
        </Tooltip>
      ))}
    </div>
  ),
};

/**
 * The same matrix in right-to-left. Plane runs both LTR and RTL, so the logical sides must flip
 * with writing direction. Wrapped in Base UI's `DirectionProvider` (which the Positioner reads to
 * resolve `inline-start`/`inline-end` to a physical edge) and `dir="rtl"` (which the arrow's
 * logical insets + `rtl:` clip-path variant react to). In RTL, `inline-start` sits to the _right_
 * of its trigger with the arrow pointing left, and `inline-end` mirrors it — both still pointing
 * back at the trigger. The physical `left`/`right`/`top`/`bottom` sides are direction-independent
 * and render the same as LTR.
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
  // Decorators are components too, so the hooks rule (2c) applies: a named function, not an
  // arrow, carries the `useLayoutEffect`.
  decorators: [
    function RtlDocumentDir(Story) {
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
          <Tooltip key={side} side={side} label={side} delay={0} open>
            <button type="button">{side}</button>
          </Tooltip>
        ))}
      </div>
    </DirectionProvider>
  ),
};

/**
 * A keyboard-shortcut hint sits to the right of the label, dimmed at the smaller caption scale —
 * the Figma "Cmd + K" slot. Pass any node to `shortcut`.
 */
export const WithShortcut: Story = {
  args: {
    label: "Open command menu",
    shortcut: "⌘ K",
  },
};

/**
 * `TooltipProvider` groups the tooltips beneath it, so a row of adjacent triggers feels like one
 * surface: once any tooltip in the group is open, moving to a neighboring trigger shows its tooltip
 * immediately instead of restarting the hover delay, and the shared `closeDelay` keeps the swap
 * smooth. This mirrors the classic formatting-toolbar hint pattern.
 */
export const WithProvider: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <TooltipProvider closeDelay={100}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Tooltip label="Bold the selection">
          <button type="button">Bold</button>
        </Tooltip>
        <Tooltip label="Italicize the selection">
          <button type="button">Italic</button>
        </Tooltip>
        <Tooltip label="Underline the selection">
          <button type="button">Underline</button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * The open state can be owned externally: `open` and `onOpenChange` pass through to Base UI's root,
 * so product code can point the tooltip at its own UI programmatically — here the "Show hint"
 * button opens it — while hover, focus, blur, and **Escape** still request state changes through
 * `onOpenChange`, so the tooltip never gets stuck open.
 */
export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Tooltip label="Copies the invite link" open={open} onOpenChange={setOpen}>
          <button type="button">Copy link</button>
        </Tooltip>
        <button type="button" onClick={() => setOpen(true)}>
          Show hint
        </button>
      </div>
    );
  },
};

/**
 * Focusing the trigger opens the tooltip (a `role="tooltip"` popup with the label appears);
 * blurring it closes the tooltip again. Focus is used instead of hover so the open/close is
 * deterministic regardless of Base UI's hover delays. Tagged so it stays out of the sidebar, docs,
 * and AI manifest — it's a behavior test, not an example — but still runs under the default `test`
 * tag.
 */
export const ShowsOnFocus: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  // A 0ms hover delay keeps this behavior test deterministic; focus opens instantly
  // regardless, but scoping the override here (not on meta) lets docs/examples use
  // the real 600ms default.
  args: { label: "Tooltip text", delay: 0 },
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

/**
 * Keyboard ARIA pattern (WAI-ARIA tooltip): once a focused trigger has opened the tooltip,
 * **Escape** dismisses it while focus stays on the trigger. Focus (not hover) keeps the open/close
 * deterministic regardless of Base UI's hover delays. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const EscapeCloses: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { label: "Tooltip text", delay: 0 },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Hover or focus me" });
    const screen = within(document.body);

    // Focusing the trigger opens the tooltip.
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await expect(await screen.findByText("Tooltip text")).toBeInTheDocument();

    // Escape closes the tooltip but leaves focus on the trigger.
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByText("Tooltip text")).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

/**
 * Hidden behavior twin of `WithProvider`: the provider shares open/close timing across the group,
 * so moving from one trigger to the next swaps the visible tooltip. Focus (not hover) keeps the
 * open/close deterministic regardless of Base UI's hover delays, and the accessibility assertion
 * stays on the real portaled `role="tooltip"` popup.
 */
export const WithProviderInteraction: Story = {
  ...WithProvider,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const body = within(document.body);

    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveFocus();
    const firstTooltip = await body.findByRole("tooltip");
    await expect(firstTooltip).toHaveTextContent("Bold the selection");

    // Moving focus to the next trigger swaps to its tooltip. The first one may
    // linger for the provider's shared closeDelay, so retry until exactly one
    // tooltip remains and it carries the new label.
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Italic" })).toHaveFocus();
    await waitFor(() =>
      expect(body.getByRole("tooltip")).toHaveTextContent("Italicize the selection"),
    );
  },
};

/**
 * Hidden behavior twin of `WithShortcut` (relocated from the old elements-tier story, rule 2b): the
 * open tooltip is one `role="tooltip"` popup carrying both the label and the `shortcut` hint, so
 * assistive tech announces them together. Focus (not hover) keeps the open deterministic regardless
 * of Base UI's hover delays.
 */
export const WithShortcutInteraction: Story = {
  ...WithShortcut,
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { ...WithShortcut.args, delay: 0 },
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Hover or focus me" })).toHaveFocus();
    const tooltip = await within(document.body).findByRole("tooltip");
    await expect(tooltip).toHaveTextContent("Open command menu");
    await expect(tooltip).toHaveTextContent("⌘ K");
  },
};

/**
 * Hidden behavior twin of `Controlled`: the external "Show hint" button opens the tooltip through
 * state (`open`), and **Escape** routes a close request back through `onOpenChange`, proving the
 * controlled loop is wired both ways. Escape is asserted with focus still on the external button —
 * Base UI listens at the document level while the tooltip is open.
 */
export const ControlledInteraction: Story = {
  ...Controlled,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const screen = within(document.body);

    // Closed until opened programmatically.
    await expect(screen.queryByRole("tooltip")).toBeNull();

    // The external button opens the tooltip via state.
    await userEvent.click(canvas.getByRole("button", { name: "Show hint" }));
    await expect(await screen.findByRole("tooltip")).toHaveTextContent("Copies the invite link");

    // Escape requests a close through `onOpenChange`, which updates the
    // controlled state and dismisses the tooltip (it leaves asynchronously).
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  },
};
