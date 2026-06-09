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
