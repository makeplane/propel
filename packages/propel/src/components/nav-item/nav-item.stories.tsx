import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Inbox, LayoutGrid } from "lucide-react";
import { expect } from "storybook/test";

import {
  NavItem,
  NavItemChevron,
  NavItemCount,
  NavItemGroup,
  NavItemHeader,
  NavItemPanel,
} from "./index";

// Components-tier story: the ready-made NavItem part set assembled into a sidebar nav tree.
const meta = {
  title: "Components/NavItem",
  component: NavItem,
  subcomponents: { NavItemGroup, NavItemHeader, NavItemPanel, NavItemCount, NavItemChevron },
  args: { children: "Inbox", magnitude: "lg" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1329-396",
    },
  },
  // The rows stretch to their container; constrain to a sidebar-like width.
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A small sidebar: a flat row, the active row, and a collapsible section of child rows. */
export const Default: Story = {
  render: () => (
    <nav className="flex flex-col gap-1">
      <NavItem
        magnitude="lg"
        inlineStartNode={<Inbox />}
        inlineEndNode={<NavItemCount>6</NavItemCount>}
      >
        Inbox
      </NavItem>
      <NavItem magnitude="lg" active inlineStartNode={<LayoutGrid />}>
        Projects
      </NavItem>
      <NavItemGroup>
        <NavItemHeader chevron={<ChevronDown />}>Your teams</NavItemHeader>
        <NavItemPanel>
          <NavItem magnitude="lg" level={2}>
            Design
          </NavItem>
          <NavItem magnitude="lg" level={2}>
            Engineering
          </NavItem>
        </NavItemPanel>
      </NavItemGroup>
    </nav>
  ),
};

/** Behavior test: the section header toggles `aria-expanded` and shows/hides its child rows. */
export const ToggleSection: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <NavItemGroup>
      <NavItemHeader chevron={<ChevronDown />}>Your teams</NavItemHeader>
      <NavItemPanel>
        <NavItem magnitude="lg" level={2}>
          Design
        </NavItem>
      </NavItemPanel>
    </NavItemGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const header = canvas.getByRole("button", { name: "Your teams" });
    const child = canvas.getByRole("button", { name: "Design" });

    // Sections start expanded by default.
    await expect(header).toHaveAttribute("aria-expanded", "true");
    await expect(child).toBeVisible();

    await userEvent.click(header);
    await expect(header).toHaveAttribute("aria-expanded", "false");
    await expect(child).not.toBeVisible();
  },
};

/** The current page exposes `aria-current="page"`. */
export const Active: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <NavItem magnitude="lg" active inlineStartNode={<Inbox />}>
      Inbox
    </NavItem>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Inbox" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};
