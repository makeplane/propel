import { DirectionProvider } from "@base-ui/react/direction-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import * as React from "react";
import { expect, fn, userEvent } from "storybook/test";

import { IconButton } from "../icon-button/index";
import { NavItem, NavItemGroup, NavItemHeader, NavItemPanel } from "./index";

// The Figma header uses a filled caret-down (a solid triangle), not a stroked chevron.
// lucide ships outline glyphs only, so the consumer supplies this small filled caret to
// match the design. It sizes to the slot via 100% width/height and rotates with the
// header's expanded state.
function CaretDown() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden focusable="false">
      <path d="M4.5 6.5h7L8 10.5z" />
    </svg>
  );
}

function DemoPanel() {
  return (
    <NavItemPanel>
      <NavItem magnitude="lg" level={2}>
        Unread
      </NavItem>
      <NavItem magnitude="lg" level={2}>
        Snoozed
      </NavItem>
    </NavItemPanel>
  );
}

const meta = {
  title: "UI/NavItemHeader",
  component: NavItemHeader,
  subcomponents: { NavItemGroup, NavItemPanel },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2487-3139",
    },
  },
  args: {
    children: "Inbox",
    chevron: <CaretDown />,
  },
  // The header stretches to its container; constrain it to a sidebar-like width.
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <NavItemGroup>
      <NavItemHeader {...args} />
      <DemoPanel />
    </NavItemGroup>
  ),
} satisfies Meta<typeof NavItemHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * With an inline-end action: an "add" `IconButton` sits at the inline-end via `inlineEndNode`. The
 * action is a sibling of the toggle button, so clicking it does not toggle the section (and there
 * is no nested-interactive a11y violation).
 */
export const WithAction: Story = {
  render: (args) => {
    const onOpenChange = fn();
    return (
      <NavItemGroup onOpenChange={onOpenChange}>
        <NavItemHeader
          {...args}
          inlineEndNode={
            <IconButton variant="tertiary" tone="neutral" magnitude="sm" aria-label="Add to Inbox">
              <Plus />
            </IconButton>
          }
        />
        <DemoPanel />
      </NavItemGroup>
    );
  },
  play: async ({ canvas }) => {
    const header = canvas.getByRole("button", { name: "Inbox" });
    const add = canvas.getByRole("button", { name: "Add to Inbox" });

    // The add button is a separate control, not nested inside the toggle.
    await expect(header).not.toContainElement(add);

    // Clicking the action does not toggle the section.
    await userEvent.click(add);
    await expect(header).toHaveAttribute("aria-expanded", "true");

    // Clicking the header still toggles.
    await userEvent.click(header);
    await expect(header).toHaveAttribute("aria-expanded", "false");
  },
};

/** Uncontrolled: clicking toggles `aria-expanded` and rotates the chevron. */
export const Uncontrolled: Story = {
  args: { onClick: fn() },
  play: async ({ canvas }) => {
    const header = canvas.getByRole("button", { name: "Inbox" });

    // Sections start expanded by default.
    await expect(header).toHaveAttribute("aria-expanded", "true");

    // Clicking collapses it.
    await userEvent.click(header);
    await expect(header).toHaveAttribute("aria-expanded", "false");

    // Clicking again re-expands.
    await userEvent.click(header);
    await expect(header).toHaveAttribute("aria-expanded", "true");
  },
};

/** A header that actually collapses the group of nav items beneath it. */
export const Collapsible: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <NavItemGroup open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <NavItemHeader {...args}>Inbox</NavItemHeader>
        <DemoPanel />
      </NavItemGroup>
    );
  },
};

/**
 * Base UI Collapsible hides the panel when the trigger collapses it and exposes the trigger state
 * with `aria-expanded`. Tagged out of sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const CollapsiblePanelVisibility: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: (args) => (
    <NavItemGroup>
      <NavItemHeader {...args}>Inbox</NavItemHeader>
      <NavItemPanel>
        <NavItem magnitude="lg" level={2}>
          Unread
        </NavItem>
      </NavItemPanel>
    </NavItemGroup>
  ),
  play: async ({ canvas }) => {
    const header = canvas.getByRole("button", { name: "Inbox" });
    const unread = canvas.getByRole("button", { name: "Unread" });

    await expect(header).toHaveAttribute("aria-expanded", "true");
    await expect(unread).toBeVisible();

    await userEvent.click(header);
    await expect(header).toHaveAttribute("aria-expanded", "false");
    await expect(unread).not.toBeVisible();
  },
};

/**
 * Controlled state: the root owns `open` and `onOpenChange`, while the header remains only the
 * trigger row.
 */
export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <NavItemGroup open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <NavItemHeader {...args}>{open ? "Collapse inbox" : "Expand inbox"}</NavItemHeader>
        <DemoPanel />
      </NavItemGroup>
    );
  },
};

/**
 * Keyboard ARIA pattern: the header is a native `<button>`, so Tab focuses it and both Enter and
 * Space toggle `aria-expanded`. Tagged out of sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const KeyboardActivation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: (args) => (
    <NavItemGroup onOpenChange={fn()}>
      <NavItemHeader {...args} />
      <DemoPanel />
    </NavItemGroup>
  ),
  play: async ({ canvas }) => {
    const header = canvas.getByRole("button", { name: "Inbox" });

    await userEvent.tab();
    await expect(header).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(header).toHaveAttribute("aria-expanded", "false");

    await userEvent.keyboard(" ");
    await expect(header).toHaveAttribute("aria-expanded", "true");
  },
};

/** RTL: the chevron moves to the inline-start edge and mirrors. */
export const RightToLeft: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <NavItemGroup>
          <NavItemHeader
            {...args}
            inlineEndNode={
              <IconButton variant="tertiary" tone="neutral" magnitude="sm" aria-label="إضافة">
                <Plus />
              </IconButton>
            }
          >
            الوارد
          </NavItemHeader>
          <DemoPanel />
        </NavItemGroup>
      </div>
    </DirectionProvider>
  ),
};
