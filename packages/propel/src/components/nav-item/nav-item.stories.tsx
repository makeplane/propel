import { DirectionProvider } from "@base-ui/react/direction-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Inbox } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";
import { iconControl } from "../../storybook/icon-control";
import { NavItem, NavItemChevron, NavItemCount, type NavItemMagnitude } from "./index";

const MAGNITUDES: NavItemMagnitude[] = ["lg", "md"];

const meta = {
  title: "Components/NavItem",
  component: NavItem,
  subcomponents: { NavItemCount, NavItemChevron },
  // Icon picker control for the leading icon.
  argTypes: { leadingIcon: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1329-396",
    },
  },
  args: {
    children: "Inbox",
    magnitude: "lg",
    leadingIcon: <Inbox />,
  },
  // The row stretches to its container; constrain it to a sidebar-like width.
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

export const Default: Story = {};

/** A row with a trailing count chip and a disclosure chevron, like a collapsible group. */
export const WithTrailing: Story = {
  args: {
    trailing: (
      <>
        <NavItemCount>6</NavItemCount>
        <NavItemChevron icon={<ChevronDown />} />
      </>
    ),
  },
};

/** The current page: filled surface, primary-tone label, and `aria-current="page"`. */
export const Active: Story = {
  args: { active: true },
  play: async ({ canvasElement }) => {
    const item = within(canvasElement).getByRole("button", { name: "Inbox" });
    await expect(item).toHaveAttribute("aria-current", "page");
  },
};

/** Rendered as a link via `render`, while keeping the selected semantics. */
export const AsLink: Story = {
  args: {
    active: true,
    render: <a href="#inbox" />,
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Inbox" });
    await expect(link).toHaveAttribute("href", "#inbox");
    await expect(link).toHaveAttribute("aria-current", "page");
  },
};

/**
 * Keyboard ARIA pattern: NavItem renders a native `<button>`, so Tab moves focus to
 * the row and both **Enter** and **Space** activate it (fire its click handler). The
 * active row also exposes `aria-current="page"`. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardActivation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { active: true, onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const item = within(canvasElement).getByRole("button", { name: "Inbox" });

    // The selected row exposes aria-current for assistive tech.
    await expect(item).toHaveAttribute("aria-current", "page");

    // Tab moves focus onto the row.
    await userEvent.tab();
    await expect(item).toHaveFocus();

    // Enter activates the row (native button behavior).
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Space activates it too.
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/**
 * The prop-driven states side by side at both magnitudes. Hover and pressed are
 * CSS-driven (`hover:` / `active:`) — interact with the rows above to see them.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {MAGNITUDES.map((magnitude) => (
        <div key={magnitude} className="flex flex-col gap-1">
          <p className="text-11 uppercase text-tertiary">{magnitude}</p>
          <NavItem {...args} magnitude={magnitude} trailing={<NavItemCount>6</NavItemCount>}>
            Default
          </NavItem>
          <NavItem {...args} magnitude={magnitude} active trailing={<NavItemCount>6</NavItemCount>}>
            Selected
          </NavItem>
          <NavItem {...args} magnitude={magnitude} disabled>
            Disabled
          </NavItem>
        </div>
      ))}
    </div>
  ),
};

/** The Figma `Level` axis: each step indents the row 8px further from the inline-start. */
export const Levels: Story = {
  argTypes: { level: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex flex-col gap-1">
      {([1, 2, 3, 4, 5] as const).map((level) => (
        <NavItem key={level} {...args} level={level}>
          {`Level ${level}`}
        </NavItem>
      ))}
    </div>
  ),
};

/**
 * RTL: the leading icon moves to the inline-start (visually the right edge) and the
 * disclosure chevron mirrors. Wrapped in Base UI's `DirectionProvider`.
 */
export const RightToLeft: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex flex-col gap-1">
        <NavItem
          {...args}
          trailing={
            <>
              <NavItemCount>6</NavItemCount>
              <NavItemChevron icon={<ChevronDown />} />
            </>
          }
        >
          الوارد
        </NavItem>
        <NavItem {...args} level={2}>
          مستوى ٢
        </NavItem>
      </div>
    </DirectionProvider>
  ),
};
