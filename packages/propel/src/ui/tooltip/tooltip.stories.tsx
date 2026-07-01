import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipShortcut,
  TooltipTrigger,
} from "./index";

// UI-tier story: assembles the ATOMIC tooltip parts by hand (Root › Trigger ›
// Portal › Positioner › Popup › Arrow), optionally grouped under a Provider that
// shares open/close timing. The components-tier `Tooltip` ready-made wraps all of
// this and takes `content` / `shortcut` props.

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  subcomponents: {
    TooltipProvider,
    TooltipTrigger,
    TooltipPortal,
    TooltipPositioner,
    TooltipPopup,
    TooltipArrow,
    TooltipShortcut,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy wired by hand: a focusable trigger opens a positioned popup that holds the
 * label, an optional `TooltipShortcut` hint, and the arrow.
 */
export const Anatomy: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger
        delay={0}
        render={
          <button
            type="button"
            className="inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none"
          />
        }
      >
        Hover or focus me
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner side="top" sideOffset={8}>
          <TooltipPopup role="tooltip">
            Saves automatically
            <TooltipShortcut>⌘ S</TooltipShortcut>
            <TooltipArrow />
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  ),
};

export const AnatomyInteraction: Story = {
  ...Anatomy,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Hover or focus me" })).toHaveFocus();
    const tooltip = await within(document.body).findByRole("tooltip");
    await expect(tooltip).toHaveTextContent("Saves automatically");
    await expect(tooltip).toHaveTextContent("⌘ S");
  },
};

/**
 * `TooltipProvider` shares one open/close delay across the tooltips beneath it, so moving between
 * adjacent triggers shows the next tooltip immediately.
 */
export const SharedProvider: Story = {
  render: () => (
    <TooltipProvider delay={0} closeDelay={0}>
      <div className="flex gap-2">
        {["Cut", "Copy", "Paste"].map((label) => (
          <Tooltip key={label}>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  className="inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none"
                />
              }
            >
              {label}
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner side="top" sideOffset={8}>
                <TooltipPopup role="tooltip">{label} the selection</TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};

export const SharedProviderInteraction: Story = {
  ...SharedProvider,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Cut" })).toHaveFocus();
    await waitFor(() =>
      expect(within(document.body).getByRole("tooltip")).toHaveTextContent("Cut the selection"),
    );
  },
};
