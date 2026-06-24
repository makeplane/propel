import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Inbox, LayoutGrid } from "lucide-react";
import { expect } from "storybook/test";

import {
  NavItem,
  NavItemCount,
  NavItemGroup,
  NavItemHeader,
  NavItemHeaderIndicator,
  NavItemHeaderLabel,
  NavItemHeaderToggle,
  NavItemIcon,
  NavItemLabel,
  NavItemPanel,
  NavItemTrailing,
} from "./index";

// Components-tier story: the nav-item part set assembled into a sidebar nav tree.
const meta = {
  title: "Components/NavItem",
  component: NavItem,
  subcomponents: {
    NavItemIcon,
    NavItemLabel,
    NavItemTrailing,
    NavItemCount,
    NavItemGroup,
    NavItemHeader,
    NavItemHeaderToggle,
    NavItemHeaderLabel,
    NavItemHeaderIndicator,
    NavItemPanel,
  },
  args: { magnitude: "lg" },
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
      <NavItem magnitude="lg">
        <NavItemIcon>
          <Inbox />
        </NavItemIcon>
        <NavItemLabel>Inbox</NavItemLabel>
        <NavItemTrailing>
          <NavItemCount>6</NavItemCount>
        </NavItemTrailing>
      </NavItem>
      <NavItem magnitude="lg" active>
        <NavItemIcon>
          <LayoutGrid />
        </NavItemIcon>
        <NavItemLabel>Projects</NavItemLabel>
      </NavItem>
      <NavItemGroup>
        <NavItemHeader>
          <NavItemHeaderToggle>
            <NavItemHeaderLabel>Your teams</NavItemHeaderLabel>
            <NavItemHeaderIndicator>
              <ChevronDown />
            </NavItemHeaderIndicator>
          </NavItemHeaderToggle>
        </NavItemHeader>
        <NavItemPanel>
          <NavItem magnitude="lg" level={2}>
            <NavItemLabel>Design</NavItemLabel>
          </NavItem>
          <NavItem magnitude="lg" level={2}>
            <NavItemLabel>Engineering</NavItemLabel>
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
      <NavItemHeader>
        <NavItemHeaderToggle>
          <NavItemHeaderLabel>Your teams</NavItemHeaderLabel>
          <NavItemHeaderIndicator>
            <ChevronDown />
          </NavItemHeaderIndicator>
        </NavItemHeaderToggle>
      </NavItemHeader>
      <NavItemPanel>
        <NavItem magnitude="lg" level={2}>
          <NavItemLabel>Design</NavItemLabel>
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
    <NavItem magnitude="lg" active>
      <NavItemIcon>
        <Inbox />
      </NavItemIcon>
      <NavItemLabel>Inbox</NavItemLabel>
    </NavItem>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Inbox" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};
