import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Tooltip } from "./index";

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
  tags: ["!autodocs", "!manifest"],
  parameters: {
    controls: { disable: true },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/?node-id=1162-346",
    },
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, max-content)",
        columnGap: "12rem",
        rowGap: "8rem",
        padding: "8rem 14rem",
        placeItems: "center",
      }}
    >
      {(["top", "bottom", "left", "right", "inline-start", "inline-end"] as const).map((side) => (
        <Tooltip key={side} side={side} content={side} delay={0} open>
          <button type="button">{side}</button>
        </Tooltip>
      ))}
    </div>
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
    await expect(screen.queryByRole("tooltip")).toBeNull();

    // Focusing the trigger opens the tooltip with the label text.
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await waitFor(async () => {
      await expect(await screen.findByRole("tooltip")).toHaveTextContent("Tooltip text");
    });

    // Blurring the trigger hides the tooltip again.
    await userEvent.tab();
    await waitFor(async () => {
      await expect(screen.queryByRole("tooltip")).toBeNull();
    });
  },
};
