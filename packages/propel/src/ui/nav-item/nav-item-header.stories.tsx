import { DirectionProvider } from "@base-ui/react/direction-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Plus } from "lucide-react";
import * as React from "react";
import { expect, fn, userEvent } from "storybook/test";

import { IconButton } from "../../components/icon-button/index";
import {
  NavItem,
  NavItemGroup,
  NavItemHeader,
  NavItemHeaderAction,
  NavItemHeaderIndicator,
  NavItemHeaderLabel,
  NavItemHeaderToggle,
  NavItemLabel,
  NavItemPanel,
} from "./index";

function DemoPanel() {
  return (
    <NavItemPanel>
      <NavItem magnitude="lg" level={2}>
        <NavItemLabel>Unread</NavItemLabel>
      </NavItem>
      <NavItem magnitude="lg" level={2}>
        <NavItemLabel>Snoozed</NavItemLabel>
      </NavItem>
    </NavItemPanel>
  );
}

// UI-tier story: composes the ATOMIC header parts (each renders a single element) — the toggle, its
// label and disclosure indicator, and the inline-end action are their own parts, so the header
// holds no raw layout.
const meta = {
  title: "UI/NavItemHeader",
  component: NavItemHeader,
  subcomponents: {
    NavItemGroup,
    NavItemHeaderToggle,
    NavItemHeaderLabel,
    NavItemHeaderIndicator,
    NavItemHeaderAction,
    NavItemPanel,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2487-3139",
    },
  },
  // The header stretches to its container; constrain it to a sidebar-like width.
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <NavItemGroup>
      <NavItemHeader>
        <NavItemHeaderToggle>
          <NavItemHeaderLabel>Inbox</NavItemHeaderLabel>
          <NavItemHeaderIndicator>
            <ChevronDown />
          </NavItemHeaderIndicator>
        </NavItemHeaderToggle>
      </NavItemHeader>
      <DemoPanel />
    </NavItemGroup>
  ),
} satisfies Meta<typeof NavItemHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * With an inline-end action: an "add" `IconButton` sits at the inline-end via
 * `NavItemHeaderAction`. The action is a sibling of the toggle button, so clicking it does not
 * toggle the section (and there is no nested-interactive a11y violation).
 */
export const WithAction: Story = {
  render: () => {
    const onOpenChange = fn();
    return (
      <NavItemGroup onOpenChange={onOpenChange}>
        <NavItemHeader>
          <NavItemHeaderToggle>
            <NavItemHeaderLabel>Inbox</NavItemHeaderLabel>
            <NavItemHeaderIndicator>
              <ChevronDown />
            </NavItemHeaderIndicator>
          </NavItemHeaderToggle>
          <NavItemHeaderAction>
            <IconButton
              prominence="tertiary"
              tone="neutral"
              magnitude="sm"
              aria-label="Add to Inbox"
            >
              <Plus />
            </IconButton>
          </NavItemHeaderAction>
        </NavItemHeader>
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
  render: () => (
    <NavItemGroup>
      <NavItemHeader>
        <NavItemHeaderToggle onClick={fn()}>
          <NavItemHeaderLabel>Inbox</NavItemHeaderLabel>
          <NavItemHeaderIndicator>
            <ChevronDown />
          </NavItemHeaderIndicator>
        </NavItemHeaderToggle>
      </NavItemHeader>
      <DemoPanel />
    </NavItemGroup>
  ),
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
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <NavItemGroup open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <NavItemHeader>
          <NavItemHeaderToggle>
            <NavItemHeaderLabel>Inbox</NavItemHeaderLabel>
            <NavItemHeaderIndicator>
              <ChevronDown />
            </NavItemHeaderIndicator>
          </NavItemHeaderToggle>
        </NavItemHeader>
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
  render: () => (
    <NavItemGroup>
      <NavItemHeader>
        <NavItemHeaderToggle>
          <NavItemHeaderLabel>Inbox</NavItemHeaderLabel>
          <NavItemHeaderIndicator>
            <ChevronDown />
          </NavItemHeaderIndicator>
        </NavItemHeaderToggle>
      </NavItemHeader>
      <NavItemPanel>
        <NavItem magnitude="lg" level={2}>
          <NavItemLabel>Unread</NavItemLabel>
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
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <NavItemGroup open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <NavItemHeader>
          <NavItemHeaderToggle>
            <NavItemHeaderLabel>{open ? "Collapse inbox" : "Expand inbox"}</NavItemHeaderLabel>
            <NavItemHeaderIndicator>
              <ChevronDown />
            </NavItemHeaderIndicator>
          </NavItemHeaderToggle>
        </NavItemHeader>
        <DemoPanel />
      </NavItemGroup>
    );
  },
};

/**
 * Keyboard ARIA pattern: the header toggle is a native `<button>`, so Tab focuses it and both Enter
 * and Space toggle `aria-expanded`. Tagged out of sidebar/docs/manifest while still running under
 * the default `test` tag.
 */
export const KeyboardActivation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <NavItemGroup onOpenChange={fn()}>
      <NavItemHeader>
        <NavItemHeaderToggle>
          <NavItemHeaderLabel>Inbox</NavItemHeaderLabel>
          <NavItemHeaderIndicator>
            <ChevronDown />
          </NavItemHeaderIndicator>
        </NavItemHeaderToggle>
      </NavItemHeader>
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
  render: () => (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <NavItemGroup>
          <NavItemHeader>
            <NavItemHeaderToggle>
              <NavItemHeaderLabel>الوارد</NavItemHeaderLabel>
              <NavItemHeaderIndicator>
                <ChevronDown />
              </NavItemHeaderIndicator>
            </NavItemHeaderToggle>
            <NavItemHeaderAction>
              <IconButton prominence="tertiary" tone="neutral" magnitude="sm" aria-label="إضافة">
                <Plus />
              </IconButton>
            </NavItemHeaderAction>
          </NavItemHeader>
          <DemoPanel />
        </NavItemGroup>
      </div>
    </DirectionProvider>
  ),
};
