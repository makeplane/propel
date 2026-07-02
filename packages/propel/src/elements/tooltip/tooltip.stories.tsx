import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { TooltipArrow, TooltipPopup, TooltipShortcut } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// tooltip behavior grafts them via `render`. The Root, Trigger, Portal, Positioner, and Provider
// are behavior-only (they live in `components`), so this in-tier story wires them straight from
// `@base-ui/react`. The components-tier `Tooltip` ready-made wraps all of this and takes
// `content` / `shortcut` props.
const meta = {
  title: "Elements/Tooltip",
  component: TooltipPopup,
  subcomponents: {
    TooltipArrow,
    TooltipShortcut,
  },
} satisfies Meta<typeof TooltipPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy wired by hand: a focusable trigger opens a positioned popup that holds the
 * label, an optional `TooltipShortcut` hint, and the arrow.
 */
export const Anatomy: Story = {
  render: () => (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger
        delay={0}
        render={
          <button
            type="button"
            className="inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none"
          />
        }
      >
        Hover or focus me
      </BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side="top" sideOffset={8}>
          <BaseTooltip.Popup role="tooltip" render={<TooltipPopup />}>
            Saves automatically
            <TooltipShortcut>⌘ S</TooltipShortcut>
            <BaseTooltip.Arrow render={<TooltipArrow />} />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
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
 * `Tooltip.Provider` shares one open/close delay across the tooltips beneath it, so moving between
 * adjacent triggers shows the next tooltip immediately.
 */
export const SharedProvider: Story = {
  render: () => (
    <BaseTooltip.Provider delay={0} closeDelay={0}>
      <div className="flex gap-2">
        {["Cut", "Copy", "Paste"].map((label) => (
          <BaseTooltip.Root key={label}>
            <BaseTooltip.Trigger
              render={
                <button
                  type="button"
                  className="inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none"
                />
              }
            >
              {label}
            </BaseTooltip.Trigger>
            <BaseTooltip.Portal>
              <BaseTooltip.Positioner side="top" sideOffset={8}>
                <BaseTooltip.Popup role="tooltip" render={<TooltipPopup />}>
                  {label} the selection
                </BaseTooltip.Popup>
              </BaseTooltip.Positioner>
            </BaseTooltip.Portal>
          </BaseTooltip.Root>
        ))}
      </div>
    </BaseTooltip.Provider>
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
